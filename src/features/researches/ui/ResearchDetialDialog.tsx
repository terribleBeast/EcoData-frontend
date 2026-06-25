import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { ResearchFullInfo } from "../components/ResearchFullInfo";
import { ResearchForm } from "./ResearchForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { useResearchDetail } from "../hooks/useResearchDetial";
import type { IResearchDataFull } from "@/shared/types/research";
import {
  useInviteResearchersMutation,
  useSeparateResearchersMutation,
} from "@/api/endpoints";
import { useSelector } from "react-redux";
import { selectResearcher } from "@/features/user/authSlice";

const ResearchDetailDialog = () => {
  const { handleCreateResearch, handleEditResearch, researchers, state } =
    useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { researchQuery, researchersByIdsQuery, predictionQuery } =
    useResearchDetail(id ?? "");

  const currentResearcher = useSelector(selectResearcher);
  const [invite] = useInviteResearchersMutation();
  const [separate] = useSeparateResearchersMutation();

  const handleJoin = async () => {
    if (!id || !currentResearcher) return;
    await invite({
      research_id: id,
      body: { researcher_ids: [currentResearcher.researcher_id] },
    });
    researchQuery.refetch();
  };

  const handleLeave = async () => {
    if (!id || !currentResearcher) return;
    await separate({
      research_id: id,
      body: { researcher_ids: [currentResearcher.researcher_id] },
    });
    researchQuery.refetch();
  };

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
          onJoinResearch={handleJoin}
          onLeaveResearch={handleLeave}
          research={research}
          researchersQuery={researchersByIdsQuery}
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
