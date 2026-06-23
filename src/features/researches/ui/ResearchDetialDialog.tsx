import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { ResearchFullInfo } from "../components/ResearchFullInfo";
import { ResearchForm } from "./ResearchForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { useResearchDetail } from "../hooks/useResearchDetial";
import type { IResearchDataFull } from "@/shared/types/research";

const ResearchDetailDialog = () => {
  const { handleCreateResearch, handleEditResearch, researchers, state } =
    useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { researchQuery, researchersQuery, predictionQuery } =
    useResearchDetail(id ? Number(id) : -1);

  return (
    <GenericEntityDetailDialog<IResearchDataFull>
      mode={dialogType}
      data={researchQuery.data}
      state={{
        isLoading: researchQuery.isLoading,
        isError: researchQuery.isError,
        error: researchQuery.error,
      }}
      renderRead={(research) => (
        <ResearchFullInfo
          predictionQuery={predictionQuery}
          handleAddUserToResearch={handleEditResearch}
          research={research}
          researchersQuery={researchersQuery}
        />
      )}
      renderCreate={() => (
        <ResearchForm
          onSubmit={handleCreateResearch}
          endpointState={{
            ...state.create,
            successMsg: "Исследование создано",
          }}
          researchers={researchers}
          title="Создание исследования"
          submitLabel="Создать"
          submitLoadingLabel="Создание..."
        />
      )}
      renderEdit={(detail) => (
        <ResearchForm
          onSubmit={handleEditResearch}
          researchers={researchers}
          endpointState={{
            ...state.update,
            successMsg: "Данные изменены",
          }}
          title="Редактирование исследования"
          submitLabel="Изменить"
          submitLoadingLabel="Изменение..."
          initialData={detail}
        />
      )}
    />
  );
};

export default ResearchDetailDialog;
