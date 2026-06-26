import { useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useGetSpeciesQuery } from "@/api/endpoints";
import FormPage from "@/shared/components/FormPage";
import { EntityForm } from "@/shared/ui/EntityForm";
import type { IFormProps } from "@/shared/types/form";
import type {
  IGenus,
  ILeafType,
  ILifeForm,
  ILocation,
  IPlantDataFull,
  IPlantFormData,
  ISpecies,
  UUID,
} from "@/shared/types/plant";

interface IPlantFormProps extends Omit<
  IFormProps<IPlantFormData>,
  "initialData"
> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  genera: IGenus[];
  leafTypes: ILeafType[];
  lifeForms: ILifeForm[];
  locations?: ILocation[];
  initialData?: IPlantDataFull;
}

const taxonLabel = (item: IGenus | ISpecies): string =>
  item.russian_name
    ? `${item.latin_name} (${item.russian_name})`
    : item.latin_name;

const locationLabel = (location: ILocation): string =>
  location.description ||
  [location.latitude, location.longitude].filter(Boolean).join(", ") ||
  location.id;

const sortByLabel = <T extends { name?: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "", "ru"));

const sortTaxa = <T extends IGenus | ISpecies>(items: T[]): T[] =>
  [...items].sort((a, b) => taxonLabel(a).localeCompare(taxonLabel(b), "ru"));

const emptyToNull = (value: UUID | "" | null | undefined): UUID | null =>
  value ? value : null;

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
  locations = [],
}: IPlantFormProps) => {
  const defaultValues = useMemo<IPlantFormData>(() => {
    const plantDescription = initialData?.plant_description;
    const species = plantDescription?.species;

    return {
      id: initialData?.id,
      location_id: initialData?.location_id ?? initialData?.location?.id ?? "",
      plant_description_id:
        initialData?.plant_description_id ?? plantDescription?.id ?? null,
      genus_id:
        plantDescription?.genus?.id ??
        species?.genus?.id ??
        species?.genus_id ??
        "",
      species_id: plantDescription?.species_id ?? species?.id ?? "",
      leaf_blade_type_id:
        plantDescription?.leaf_blade_type_id ??
        plantDescription?.leaf_blade_type?.id ??
        "",
      plant_life_form_id:
        plantDescription?.plant_life_form_id ??
        plantDescription?.plant_life_form?.id ??
        "",
      plant_description_text: plantDescription?.description ?? "",
      description: initialData?.description ?? "",
    };
  }, [initialData]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPlantFormData>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const selectedGenusId = watch("genus_id");

  const { data: species = [], isLoading: isSpeciesLoading } =
    useGetSpeciesQuery(selectedGenusId || skipToken);

  const sortedGenera = useMemo(() => sortTaxa(genera), [genera]);
  const sortedSpecies = useMemo(() => sortTaxa(species), [species]);
  const sortedLeafTypes = useMemo(() => sortByLabel(leafTypes), [leafTypes]);
  const sortedLifeForms = useMemo(() => sortByLabel(lifeForms), [lifeForms]);
  const sortedLocations = useMemo(
    () =>
      [...locations].sort((a, b) =>
        locationLabel(a).localeCompare(locationLabel(b), "ru"),
      ),
    [locations],
  );

  const isLoading = endpointState.isLoading;

  const submitHandler = handleSubmit((data) =>
    onSubmit({
      ...data,
      location_id: emptyToNull(data.location_id),
      plant_description_text: data.plant_description_text?.trim() || null,
      description: data.description?.trim() || null,
    }),
  );

  return (
    <FormPage>
      <EntityForm
        title={title}
        onSubmit={submitHandler}
        endpointState={endpointState}
        submitLabel={submitLabel}
        submitLoadingLabel={submitLoadingLabel}
      >
        <Controller
          name="genus_id"
          control={control}
          rules={{ required: "Выберите род" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              disabled={isLoading}
              error={!!errors.genus_id}
            >
              <InputLabel id="plant-genus-label">Род</InputLabel>
              <Select
                {...field}
                labelId="plant-genus-label"
                label="Род"
                value={field.value ?? ""}
                onChange={(event) => {
                  field.onChange(event.target.value);
                  setValue("species_id", "", { shouldValidate: true });
                }}
              >
                {sortedGenera.map((genus) => (
                  <MenuItem key={genus.id} value={genus.id}>
                    {taxonLabel(genus)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.genus_id?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="species_id"
          control={control}
          rules={{ required: "Выберите вид" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              disabled={isLoading || !selectedGenusId || isSpeciesLoading}
              error={!!errors.species_id}
            >
              <InputLabel id="plant-species-label">Вид</InputLabel>
              <Select
                {...field}
                labelId="plant-species-label"
                label="Вид"
                value={field.value ?? ""}
              >
                {sortedSpecies.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {taxonLabel(item)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.species_id?.message ||
                  (!selectedGenusId ? "Сначала выберите род" : undefined)}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="location_id"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              disabled={isLoading}
              error={!!errors.location_id}
            >
              <InputLabel id="plant-location-label">Локация</InputLabel>
              <Select
                {...field}
                labelId="plant-location-label"
                label="Локация"
                value={field.value ?? ""}
              >
                <MenuItem value="">Без локации</MenuItem>
                {sortedLocations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {locationLabel(location)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.location_id?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="leaf_blade_type_id"
          control={control}
          rules={{ required: "Выберите тип листовой пластинки" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              disabled={isLoading}
              error={!!errors.leaf_blade_type_id}
            >
              <InputLabel id="plant-leaf-blade-type-label">
                Тип листовой пластинки
              </InputLabel>
              <Select
                {...field}
                labelId="plant-leaf-blade-type-label"
                label="Тип листовой пластинки"
                value={field.value ?? ""}
              >
                {sortedLeafTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.leaf_blade_type_id?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="plant_life_form_id"
          control={control}
          rules={{ required: "Выберите жизненную форму" }}
          render={({ field }) => (
            <FormControl
              fullWidth
              disabled={isLoading}
              error={!!errors.plant_life_form_id}
            >
              <InputLabel id="plant-life-form-label">
                Жизненная форма
              </InputLabel>
              <Select
                {...field}
                labelId="plant-life-form-label"
                label="Жизненная форма"
                value={field.value ?? ""}
              >
                {sortedLifeForms.map((form) => (
                  <MenuItem key={form.id} value={form.id}>
                    {form.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.plant_life_form_id?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="plant_description_text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              minRows={3}
              disabled={isLoading}
              label="Описание растения"
              error={!!errors.plant_description_text}
              helperText={errors.plant_description_text?.message}
              value={field.value ?? ""}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              minRows={3}
              disabled={isLoading}
              label="Дополнительная информация"
              error={!!errors.description}
              helperText={errors.description?.message}
              value={field.value ?? ""}
            />
          )}
        />
      </EntityForm>
    </FormPage>
  );
};
