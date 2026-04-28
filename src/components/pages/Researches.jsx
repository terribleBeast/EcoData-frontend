import {
  Typography,
  Box,
  Dialog,
  ListItemButton,
  List,
  Link,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useState, useEffect } from "react";
import { getResearchPrediction } from "../../api/api";
import { getMockResearchers, getMockResearches } from "../../mock_data";
import { ChapterInfoTemplate, DialogChapters, PageChapter } from "../Templates";
import { DialogPanel } from "../DialogPanel";
import { LoadingPage } from "./InformationPages";

const ResearchFullInfo = ({ research }) => {
  const researchers = getMockResearchers();
  const activeResearchers = research.researchers_id.map(
    (id) => researchers[id],
  );

  const ResultTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrediction = async () => {
        try {
          const response = await getResearchPrediction(1);
          console.log(response);
          setRows((prevRows) => [...prevRows, ...response]);
          // Or if you want to replace the initial "asd":
          // setRows(response);
        } catch (error) {
          console.error("Error fetching prediction:", error);
        } finally {
          setLoading(false);
        }
      };
      // TODO: set delay
      setTimeout(2000000);
      getPrediction();
    }, []);
    if (loading) return <LoadingPage />;

    const header = rows[0];
    // rows.map((item) => console.log(item));
    // for (let i = 0; i < 10; i++) {
    //   // console.log("Pred_0", getProdiction());
    //   const predictions = getPrediction().then((data) => data);
    //   // console.log("Pred", predictions);
    //   // rows.push([i, `Изображение ${i}`, ...predictions]);
    // }
    return (
      <Table>
        <TableHead>
          <TableRow>
            {header.map((name, index) => (
              <TableCell key={index}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(1).map((row, index) => (
            <TableRow key={index}>
              {row.map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const chaptersInfo = [
    {
      title: "Общая информация",
      fields: [
        { name: "Название", value: research.title },
        { name: "Цель", value: research.goal },
        { name: "Статус", value: research.status },
      ],
    },
    {
      title: "Участники",
      fields: (
        <Box style={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {activeResearchers.map((researcher, index) => (
              <ListItemButton
                key={index}
                to={`/researchers?researcher_id=${researcher.id}`}
              >
                {index + 1}.&nbsp;
                <Link>
                  {researcher.surname} {researcher.name[0]}.{" "}
                  {researcher.patronymic[0]}.
                </Link>
              </ListItemButton>
            ))}{" "}
          </List>
        </Box>
      ),
    },
  ];

  return (
    <DialogPanel>
      <DialogChapters title="Таблица результатов">
        <Card
          style={{ overflowY: "auto", overflowX: "auto", maxHeight: "60vh" }}
        >
          <ResultTable />
        </Card>
      </DialogChapters>
      <DialogChapters title="Данные об исследовании">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogChapters>
    </DialogPanel>
  );
};

const ResearchesTable = ({ setSelectedResearch }) => {
  const [data, setData] = useState(getMockResearches());
  const [researchersData, setResearchersData] = useState(getMockResearchers());
  const columns = [
    {
      accessorKey: "id",
      header: "№",
      accessorFn: (dataRow) => dataRow.id + 1,
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "title",
      header: "Название",
      Cell: ({ row }) => (
        <Typography
          onClick={() => setSelectedResearch(row.original)}
          style={{ cursor: "pointer" }}
        >
          {row.original.title}
        </Typography>
      ),
    },
    {
      accessorKey: "goal",
      header: "Цель",
    },
    {
      accessorKey: "startDate",
      header: "Дата начала",
      Cell: ({ row }) => row.original.startDate.toString(),
    },
    {
      accessorKey: "endDate",
      header: "Дата окончания",
      Cell: ({ row }) => row.original.endDate.toString(),
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    {
      accessorKey: "researchers_id",
      header: "Исследователи",
      Cell: ({ row }) => (
        <Box style={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {row.original.researchers_id.map((item, index) => (
              <ListItemButton
                key={index}
                to={`/researchers?researcher_id=${researchersData[item].id}`}
              >
                {index + 1}.&nbsp;
                <Link>
                  {researchersData[item].surname}{" "}
                  {researchersData[item].name[0]}.{" "}
                  {researchersData[item].patronymic[0]}.
                </Link>
              </ListItemButton>
            ))}
          </List>
        </Box>
      ),
    },
  ];
  const table = useMaterialReactTable({
    columns: columns,
    data: data,
  });
  return <MaterialReactTable table={table} />;
};

const Researches = () => {
  const [selectedResearch, setSelectedResearch] = useState(null);
  // TODO: set name of chapter
  return (
    <>
      <Dialog
        open={selectedResearch !== null}
        onClose={() => {
          setSelectedResearch(null);
        }}
        fullWidth={true}
        maxWidth="xl"
      >
        {selectedResearch !== null && (
          <ResearchFullInfo research={selectedResearch} />
        )}
      </Dialog>

      <PageChapter title="Таблица исследований">
        <ResearchesTable setSelectedResearch={setSelectedResearch} />
      </PageChapter>
    </>
  );
};

export default Researches;
