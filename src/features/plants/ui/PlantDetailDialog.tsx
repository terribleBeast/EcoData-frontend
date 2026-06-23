import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { PlantFullInfo } from "../components/PlantFullInfo";
import { PlantForm } from "./PlantForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { usePlantDetail } from "../hooks/usePlantDetail";
import type { IPlantDataFull } from "@/shared/types/plant";

const PlantDetailDialog = () => {
  const {
    handleCreatePlant,
    handleEditPlant,
    genera,
    leafTypes,
    lifeForms,
    mutationsState,
  } = useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { plantQuery, descriptionQuery } = usePlantDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<IPlantDataFull>
      mode={dialogType}
      data={plantQuery.data}
      maxWidth="sm"
      state={{
        isLoading: plantQuery.isLoading,
        isError: plantQuery.isError,
        error: plantQuery.error,
      }}
      renderRead={(plant) => (
        <PlantFullInfo plant={plant} descriptionQuery={descriptionQuery} />
      )}
      renderCreate={() => (
        <PlantForm
          onSubmit={handleCreatePlant}
          endpointState={{
            ...mutationsState.create,
            successMsg: "Растение создано",
          }}
          genera={genera}
          leafTypes={leafTypes}
          lifeForms={lifeForms}
          title="Создание растения"
          submitLabel="Создать"
          submitLoadingLabel="Создание..."
        />
      )}
      renderEdit={(detail) => (
        <PlantForm
          onSubmit={handleEditPlant}
          genera={genera}
          leafTypes={leafTypes}
          lifeForms={lifeForms}
          endpointState={{
            ...mutationsState.update,
            successMsg: "Данные изменены",
          }}
          title="Редактирование растения"
          submitLabel="Изменить"
          submitLoadingLabel="Изменение..."
          initialData={detail}
        />
      )}
    />
  );
};
export default PlantDetailDialog;
