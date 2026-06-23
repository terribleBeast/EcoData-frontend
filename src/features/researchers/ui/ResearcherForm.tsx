import type { IResearcherDataFull } from "@/shared/types/researcher";
import { useForm } from "react-hook-form";
import {
  EmailField,
  FormTextField,
  ResearchMultiSelect,
} from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import { PhoneNumberField } from "@/shared/components/formFields/PhoneNumberField";
import { RoleField } from "@/shared/components/formFields/RoleField";
import type { ICommonFieldProps, IFormProps } from "@/shared/types/form";
import type { IResearchData } from "@/shared/types/research";
import { EntityForm } from "@/shared/ui/EntityForm";

interface IResearcherFormProps extends IFormProps<IResearcherDataFull> {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  researches: IResearchData[];
  initialData?: IResearcherDataFull;
}

export const ResearcherForm = ({
  initialData,
  submitLabel,
  submitLoadingLabel,
  title,
  onSubmit,
  endpointState,
  researches,
}: IResearcherFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IResearcherDataFull>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? {
      role: "user",
      researches_id: [],
    },
  });
  const commonFieldProps: ICommonFieldProps<IResearcherDataFull> = {
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
        <FormTextField<IResearcherDataFull>
          {...commonFieldProps}
          name="surname"
          label="Фамилия"
          autoComplete="family-name"
          rules={{ required: "Фамилия обязательна" }}
        />

        <FormTextField<IResearcherDataFull>
          {...commonFieldProps}
          name="name"
          label="Имя"
          autoComplete="given-name"
          rules={{ required: "Имя обязательно" }}
        />

        <FormTextField<IResearcherDataFull>
          {...commonFieldProps}
          name="patronymic"
          label="Отчество"
          autoComplete="additional-name"
          rules={{ required: "Отчество обязательно" }}
        />

        <FormTextField<IResearcherDataFull>
          {...commonFieldProps}
          name="job"
          label="Работа"
        />

        <PhoneNumberField<IResearcherDataFull>
          name="phoneNumber"
          control={control}
        />

        <RoleField<IResearcherDataFull> name="role" control={control} />
        <ResearchMultiSelect<IResearcherDataFull>
          name="researches_id"
          control={control}
          researches={researches}
          isLoading={endpointState.isLoading}
        />

        <EmailField<IResearcherDataFull> {...commonFieldProps} name="email" />
      </EntityForm>
    </FormPage>
  );
};
