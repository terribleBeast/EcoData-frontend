import type { IResearchDataFull } from "@/shared/types/research";
import { useForm, Controller } from "react-hook-form";
import { FormTextField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import type { ICommonFieldProps, IFormProps } from "@/shared/types/form";
import type { IResearcherData } from "@/shared/types/researcher";
import { EntityForm } from "@/shared/ui/EntityForm";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ResearchStatus } from "@/shared/types/research";
import { ResearcherMultiSelect } from "../components";

interface IResearchFormProps extends IFormProps<IResearchDataFull> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  researchers: IResearcherData[];
  initialData?: IResearchDataFull;
}

export const ResearchForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  researchers,
}: IResearchFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IResearchDataFull>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      status: ResearchStatus.ACTIVE,
      researchers_id: [],
    },
  });
  const commonFieldProps: ICommonFieldProps<IResearchDataFull> = {
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
        <FormTextField<IResearchDataFull>
          {...commonFieldProps}
          name="title"
          label="Название"
          rules={{ required: "Название обязательно" }}
        />

        <FormTextField<IResearchDataFull>
          {...commonFieldProps}
          name="goal"
          label="Цель"
          rules={{ required: "Цель обязательна" }}
        />

        <TextField
          label="Дата начала"
          type="date"
          fullWidth
          disabled={endpointState.isLoading}
          error={!!formErrors.startDate}
          helperText={formErrors.startDate?.message as string | undefined}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("startDate", {
            required: "Дата начала обязательна",
          })}
        />

        <TextField
          label="Дата окончания"
          type="date"
          fullWidth
          disabled={endpointState.isLoading}
          error={!!formErrors.endDate}
          helperText={formErrors.endDate?.message as string | undefined}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("endDate", {
            required: "Дата окончания обязательна",
          })}
        />

        <Controller
          control={control}
          name="status"
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Статус</InputLabel>
              <Select {...field} label="Статус">
                {Object.values(ResearchStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <ResearcherMultiSelect<IResearchDataFull>
          name="researchers_id"
          control={control}
          researchers={researchers}
          isLoading={endpointState.isLoading}
        />
      </EntityForm>
    </FormPage>
  );
};
