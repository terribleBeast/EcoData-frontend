import type { ILabDataFull, IOrganizationType } from "@/shared/types/lab";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormTextField, EmailField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import type { ICommonFieldProps, IEndpointState } from "@/shared/types/form";
import { EntityForm } from "@/shared/ui/EntityForm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PhoneNumberField } from "@/shared/components/formFields/PhoneNumberField";

type LabFormValues = ILabDataFull & {
  name: string;
  email: string;
  phone: string;
};

interface ILabFormProps {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  organizationTypes: IOrganizationType[];
  initialData?: ILabDataFull;
  onSubmit: SubmitHandler<LabFormValues>;
  endpointState: IEndpointState;
}

export const LabForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  organizationTypes,
}: ILabFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LabFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData
      ? {
          ...initialData,
          name: initialData.organization_details?.name ?? "",
          email: initialData.organization_details?.email ?? "",
          phone: initialData.organization_details?.phone ?? "",
        }
      : {
          organization_details_id: 0,
          organization_type_id: 0,
          address_id: 0,
        },
  });

  const commonFieldProps: ICommonFieldProps<LabFormValues> = {
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
        <FormTextField<LabFormValues>
          {...commonFieldProps}
          name="name"
          label="Название"
          rules={{ required: "Название обязательно" }}
        />

        <EmailField<LabFormValues>
          {...commonFieldProps}
          name="email"
          label="Email"
        />

        <PhoneNumberField<LabFormValues> name="phone" control={control} />

        <Controller
          control={control}
          name="organization_type_id"
          rules={{ required: "Тип организации обязателен" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>Тип организации</InputLabel>
              <Select {...field} label="Тип организации">
                {organizationTypes.map((ot) => (
                  <MenuItem key={ot.id} value={ot.id}>
                    {ot.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </EntityForm>
    </FormPage>
  );
};
