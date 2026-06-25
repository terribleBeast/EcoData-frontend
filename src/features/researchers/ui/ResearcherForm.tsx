import type { ResearcherCreate } from "@/shared/types/researcher";
import { useForm } from "react-hook-form";
import { FormTextField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import { PhoneNumberField } from "@/shared/components/formFields/PhoneNumberField";
import type { ICommonFieldProps, IFormProps } from "@/shared/types/form";
import { EntityForm } from "@/shared/ui/EntityForm";

interface IResearcherFormProps extends IFormProps<ResearcherCreate> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
}

export const ResearcherForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
}: IResearcherFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ResearcherCreate>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      first_name: "",
      last_name: "",
    },
  });
  const commonFieldProps: ICommonFieldProps<ResearcherCreate> = {
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
        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="last_name"
          label="Фамилия"
          autoComplete="family-name"
          rules={{ required: "Фамилия обязательна" }}
        />

        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="first_name"
          label="Имя"
          autoComplete="given-name"
          rules={{ required: "Имя обязательно" }}
        />

        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="patronymic"
          label="Отчество"
          autoComplete="additional-name"
        />

        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="job_id"
          label="Работа"
        />

        <PhoneNumberField<ResearcherCreate> name="phone" control={control} />

        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="organization_id"
          label="Организация"
        />

        <FormTextField<ResearcherCreate>
          {...commonFieldProps}
          name="orcid_link"
          label="ORCID"
        />
      </EntityForm>
    </FormPage>
  );
};
