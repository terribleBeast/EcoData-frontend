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

/** Form shape — extends the full research DTO with researcher_ids used by the multiselect. */
type ResearchFormData = IResearchDataFull & { researcher_ids?: string[] };

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
  } = useForm<ResearchFormData>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      status: ResearchStatus.ACTIVE,
    },
  });
  const commonFieldProps: ICommonFieldProps<ResearchFormData> = {
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
        <FormTextField<ResearchFormData>
          {...commonFieldProps}
          name="title"
          label="Название"
          rules={{ required: "Название обязательно" }}
        />

        <FormTextField<ResearchFormData>
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
          error={!!formErrors.start_date}
          helperText={formErrors.start_date?.message as string | undefined}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("start_date", {
            required: "Дата начала обязательна",
          })}
        />

        <TextField
          label="Дата окончания"
          type="date"
          fullWidth
          disabled={endpointState.isLoading}
          error={!!formErrors.end_date}
          helperText={formErrors.end_date?.message as string | undefined}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("end_date", {
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

        <ResearcherMultiSelect<ResearchFormData>
          name="researcher_ids"
          control={control}
          researchers={researchers}
          isLoading={endpointState.isLoading}
        />
      </EntityForm>
    </FormPage>
  );
};
