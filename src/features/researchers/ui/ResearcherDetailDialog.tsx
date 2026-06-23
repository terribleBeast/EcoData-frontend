import { GenericEntityDetailDialog } from "@/shared/ui/GenericEntityDetailDialog";
import { ResearcherFullInfo } from "../components/ResearcherFullInfo";
import { ResearcherForm } from "./ResearcherForm";
import { useDetailDialog } from "../hooks/useDetailDialog";
import { type DetailDialogModeType, getDialogType } from "@/shared/utils";
import { useLocation, useParams } from "react-router";
import { useResearcherDetail } from "../hooks/useResearcherDetail";
import type { IResearcherDataFull } from "@/shared/types/researcher";

const ResearcherDetailDialog = () => {
  const {
    handleCreateResearcher,
    handleEditResearcher,
    researches,
    mutationsState,
  } = useDetailDialog();

  const { pathname } = useLocation();
  const { id } = useParams<{ id: string }>();

  const dialogType: DetailDialogModeType = getDialogType(pathname);
  const { researcherQuery, researchesQuery } = useResearcherDetail(
    id ? Number(id) : -1,
  );

  return (
    <GenericEntityDetailDialog<IResearcherDataFull>
      mode={dialogType}
      data={researcherQuery.data}
      state={{
        isLoading: researcherQuery.isLoading,
        isError: researcherQuery.isError,
        error: researcherQuery.error,
      }}
      renderRead={(researcher) => (
        <ResearcherFullInfo
          researcher={researcher}
          researchesQuery={researchesQuery}
        />
      )}
      renderCreate={() => (
        <ResearcherForm
          onSubmit={handleCreateResearcher}
          endpointState={{
            ...mutationsState.create,
            successMsg: "Пользователь создан",
          }}
          researches={researches}
          title={"Создание пользователя"}
          submitLabel={"Создать"}
          submitLoadingLabel={"Создание..."}
        />
      )}
      renderEdit={(data) => (
        <ResearcherForm
          onSubmit={handleEditResearcher}
          researches={researches}
          endpointState={{
            ...mutationsState.update,
            successMsg: "Данные изменины",
          }}
          title={"Редактирование данных пользователя"}
          submitLabel={"Изменить"}
          submitLoadingLabel={"Изменение..."}
          initialData={data}
        />
      )}
    />
  );
};

export default ResearcherDetailDialog;
