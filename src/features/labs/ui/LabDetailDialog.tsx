import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { LabFullInfo } from "../components/LabFullInfo";
import { LabForm } from "./LabForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { useLabDetail } from "../hooks/useLabDetail";
import type { ILabDataFull } from "@/shared/types/lab";

const LabDetailDialog = () => {
  const { handleCreateLab, handleEditLab, organizationTypes, mutationsState } =
    useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { labQuery } = useLabDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<ILabDataFull>
      mode={dialogType}
      data={labQuery.data}
      maxWidth="sm"
      state={{
        isLoading: labQuery.isLoading,
        isError: labQuery.isError,
        error: labQuery.error,
      }}
      renderRead={(lab) => <LabFullInfo lab={lab} />}
      renderCreate={() => (
        <LabForm
          onSubmit={handleCreateLab}
          endpointState={{
            ...mutationsState.create,
            successMsg: "Лаборатория создана",
          }}
          organizationTypes={organizationTypes}
          title="Создание лаборатории"
          submitLabel="Создать"
          submitLoadingLabel="Создание..."
        />
      )}
      renderEdit={(detail) => (
        <LabForm
          onSubmit={handleEditLab}
          organizationTypes={organizationTypes}
          endpointState={{
            ...mutationsState.update,
            successMsg: "Данные изменены",
          }}
          title="Редактирование лаборатории"
          submitLabel="Изменить"
          submitLoadingLabel="Изменение..."
          initialData={detail}
        />
      )}
    />
  );
};
export default LabDetailDialog;
