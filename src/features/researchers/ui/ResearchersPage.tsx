import { Dialog } from "@mui/material";
import { PageChapter } from "@/shared/components/Templates";
import { ResearcherFullInfo, ResearchersTable } from "../components";
import { useResearchersPage } from "../hooks/useResearchersPage";

const ResearchersPage = () => {
  const {
    researchers,
    isLoadingResearchers,
    selectedResearcher,
    handleSelectResearcher,
    closeDetail,
  } = useResearchersPage();

  return (
    <>
      <Dialog
        open={selectedResearcher !== null}
        onClose={closeDetail}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearcher !== null && (
          <ResearcherFullInfo researcher={selectedResearcher} />
        )}
      </Dialog>
      <PageChapter title="Таблица исследователей">
        <ResearchersTable
          data={researchers}
          handleSelectResearcher={handleSelectResearcher}
          isLoading={isLoadingResearchers}
        />
      </PageChapter>
    </>
  );
};

export default ResearchersPage;
