import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";
import Researchers from "@/features/researchers/ui/ResearchersPage";
import Researches from "@/features/researches/ui/ResearchesPage";
import Analyzer from "@/features/analyzer/ui/AnalyzerPage";
import { LoadingComponent } from "@/shared/components";

interface PageData {
  name: string;
  link: string;
  icon: React.ComponentType;
  component: React.ComponentType;
}

export const pages: PageData[] = [
  {
    name: "Исследования",
    link: "researches",
    icon: Assignment,
    component: Researches,
  },
  {
    name: "Исследователи",
    link: "researchers",
    icon: PeopleAlt,
    component: Researchers,
  },
  {
    name: "Растения",
    link: "plants",
    icon: Grass,
    component: LoadingComponent,
  },
  {
    name: "Анализатор",
    link: "analyzer",
    icon: ImageSearch,
    component: Analyzer,
  },
  {
    name: "Локации",
    link: "locations",
    icon: LocationOn,
    component: LoadingComponent,
  },
  {
    name: "Лаборатории",
    link: "laboratories",
    icon: Biotech,
    component: LoadingComponent,
  },
];
