import type { ILabDataFull } from "@/shared/types/lab";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormTextField } from "@/shared/components/formFields";
import FormPage from "@/shared/components/FormPage";
import type { ICommonFieldProps, IEndpointState } from "@/shared/types/form";
import { EntityForm } from "@/shared/ui/EntityForm";

type LabFormValues = ILabDataFull;

interface ILabFormProps {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
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
}: ILabFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LabFormValues>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues: initialData ?? { name: "" },
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
      </EntityForm>
    </FormPage>
  );
};
