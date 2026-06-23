import type { IPlantDataFull } from "@/shared/types/plant";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import type { ICommonFieldProps, IFormProps } from "@/shared/types/form";
import type { IGenus, ILeafType, ILifeForm } from "@/shared/types/plant";
import { EntityForm } from "@/shared/ui/EntityForm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetSpeciesQuery } from "@/api/endpoints";
import { useState } from "react";

interface IPlantFormProps extends IFormProps<IPlantDataFull> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  genera: IGenus[];
  leafTypes: ILeafType[];
  lifeForms: ILifeForm[];
  initialData?: IPlantDataFull;
}

interface IPlantDescriptionFormFields {
  genus_id: number;
  species_id: number;
  leaf_type_id: number;
  life_form_id: number;
  description: string;
}

export const PlantForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  genera,
  leafTypes,
  lifeForms,
}: IPlantFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IPlantDataFull & IPlantDescriptionFormFields>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      additional_info: "",
    },
  });
  const [selectedGenusId, setSelectedGenusId] = useState<number | null>(null);
  const { data: species = [] } = useGetSpeciesQuery(selectedGenusId ?? 0, {
    skip: selectedGenusId === null,
  });

  const commonFormProps: ICommonFieldProps<
    IPlantDataFull & IPlantDescriptionFormFields
  > = {
    isLoading: endpointState.isLoading,
    errors: formErrors,
    register: register,
  };
  return (
    <FormPage>
      <EntityForm
        title={title}
        submitLabel={submitLabel}
        submitLoadingLabel={submitLoadingLabel}
        endpointState={endpointState}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="genus_id"
          rules={{ required: "Род обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Род</InputLabel>
              <Select
                {...field}
                label="Род"
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedGenusId(Number(e.target.value));
                }}
              >
                {genera.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="species_id"
          rules={{ required: "Вид обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Вид</InputLabel>
              <Select {...field} label="Вид">
                {species.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="leaf_type_id"
          rules={{ required: "Тип листа обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Тип листа</InputLabel>
              <Select {...field} label="Тип листа">
                {leafTypes.map((lt) => (
                  <MenuItem key={lt.id} value={lt.id}>
                    {lt.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="life_form_id"
          rules={{ required: "Жизненная форма обязательна" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Жизненная форма</InputLabel>
              <Select {...field} label="Жизненная форма">
                {lifeForms.map((lf) => (
                  <MenuItem key={lf.id} value={lf.id}>
                    {lf.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <FormTextField<IPlantDataFull & IPlantDescriptionFormFields>
          {...commonFormProps}
          name="description"
          label="Описание"
        />

        <FormTextField<IPlantDataFull & IPlantDescriptionFormFields>
          {...commonFormProps}
          name="additional_info"
          label="Дополнительная информация"
        />
      </EntityForm>
    </FormPage>
  );
};
