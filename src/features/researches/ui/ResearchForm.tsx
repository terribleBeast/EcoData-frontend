import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { FormTextField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import type { ICommonFieldProps, IFormProps } from "@/shared/types/form";
import type { IResearcherData } from "@/shared/types/researcher";
import {
  ResearchStatus,
  type IResearchDataFull,
} from "@/shared/types/research";
import { EntityForm } from "@/shared/ui/EntityForm";
import { ResearcherMultiSelect } from "../components";

type UUID = string;

type ResearcherIdLike =
  | UUID
  | {
      id?: UUID;
      researcher_id?: UUID;
    }
  | null
  | undefined;

type ResearchFormData = Omit<IResearchDataFull, "researcher_ids"> & {
  researcher_ids?: UUID[];
};

interface IResearchFormProps extends Omit<
  IFormProps<ResearchFormData>,
  "initialData"
> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  researchers: IResearcherData[];
  initialData?: IResearchDataFull;
}
const getResearcherId = (value: ResearcherIdLike): UUID | null => {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  return value.id ?? value.researcher_id ?? null;
};

const normalizeDateValue = (value?: string | null): string => {
  if (!value) return "";

  return value.slice(0, 10);
};

const buildDefaultValues = (
  initialData?: IResearchDataFull,
): Partial<ResearchFormData> => {
  const researcherIds = (initialData?.researcher_ids ?? [])
    .map(getResearcherId)
    .filter((item): item is UUID => Boolean(item));

  return {
    ...initialData,

    title: initialData?.title ?? "",
    goal: initialData?.goal ?? "",
    description: initialData?.description ?? "",

    start_date: normalizeDateValue(initialData?.start_date),
    end_date: normalizeDateValue(initialData?.end_date),

    status: initialData?.status ?? ResearchStatus.ACTIVE,
    researcher_ids: researcherIds,
  };
};

export const ResearchForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  researchers,
}: IResearchFormProps) => {
  const defaultValues = useMemo(
    () => buildDefaultValues(initialData),
    [initialData],
  );

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors: formErrors },
  } = useForm<ResearchFormData>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues,
  });

  const commonFieldProps: ICommonFieldProps<ResearchFormData> = {
    isLoading: endpointState.isLoading,
    errors: formErrors,
    register,
  };

  const handleFormSubmit = (data: ResearchFormData) => {
    onSubmit({
      ...data,
      title: data.title?.trim(),
      goal: data.goal?.trim() || null,
      description: data.description?.trim() || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      status: data.status ?? ResearchStatus.ACTIVE,
      researcher_ids: data.researcher_ids ?? [],
    });
  };

  return (
    <FormPage>
      <EntityForm
        title={title}
        submitLabel={submitLabel}
        submitLoadingLabel={submitLoadingLabel}
        endpointState={endpointState}
        onSubmit={handleSubmit(handleFormSubmit)}
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

        <FormTextField<ResearchFormData>
          {...commonFieldProps}
          name="description"
          label="Описание"
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
            validate: (endDate) => {
              const startDate = getValues("start_date");

              if (!startDate || !endDate) return true;

              return (
                startDate <= endDate ||
                "Дата окончания не может быть раньше даты начала"
              );
            },
          })}
        />

        <Controller
          control={control}
          name="status"
          rules={{ required: "Статус обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl
              fullWidth
              error={!!error}
              disabled={endpointState.isLoading}
            >
              <InputLabel>Статус</InputLabel>
              <Select
                {...field}
                value={field.value ?? ResearchStatus.ACTIVE}
                label="Статус"
              >
                {Object.values(ResearchStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>

              {error?.message && (
                <FormHelperText>{error.message}</FormHelperText>
              )}
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
