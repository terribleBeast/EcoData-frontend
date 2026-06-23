import React from "react";
import {
  Biotech,
  PeopleAlt,
  Grass,
  LocationOn,
  Assignment,
  ImageSearch,
} from "@mui/icons-material";

export const entityPaths = {
  PLANTS: "plants",
  LABS: "laboratories",
  RESEARCHERS: "researchers",
  RESEARCHES: "researches",
  LOCATIONS: "locations",
  ANALYZER: "analyzer",
} as const;

export type EntityPathType = (typeof entityPaths)[keyof typeof entityPaths];

export const entityNames = {
  PLANTS: "Растения",
  LABS: "Лаборатории",
  RESEARCHERS: "Исследователи",
  RESEARCHES: "Исследования",
  LOCATIONS: "Локации",
  ANALYZER: "Анализатор",
} as const;

export type EntityNameType = (typeof entityNames)[keyof typeof entityNames];

export interface MenuItemData {
  title: EntityNameType;
  path: EntityPathType;
  icon: React.ComponentType;
}

export const menuItems: MenuItemData[] = [
  {
    title: entityNames.RESEARCHES,
    path: entityPaths.RESEARCHES,
    icon: Assignment,
  },
  {
    title: entityNames.RESEARCHERS,
    path: entityPaths.RESEARCHERS,
    icon: PeopleAlt,
  },
  {
    title: entityNames.PLANTS,
    path: entityPaths.PLANTS,
    icon: Grass,
  },
  {
    title: entityNames.ANALYZER,
    path: entityPaths.ANALYZER,
    icon: ImageSearch,
  },
  {
    title: entityNames.LOCATIONS,
    path: entityPaths.LOCATIONS,
    icon: LocationOn,
  },
  {
    title: entityNames.LABS,
    path: entityPaths.LABS,
    icon: Biotech,
  },
];

type LazyImport = () => Promise<{
  default: React.ComponentType;
}>;

export interface EntityRouteConfig {
  title: string;
  path: EntityPathType;
  pageComponent: LazyImport;
  detailComponent?: LazyImport;
}

export const entityRoutes: EntityRouteConfig[] = [
  {
    title: entityNames.RESEARCHERS,
    path: entityPaths.RESEARCHERS,
    pageComponent: () => import("@/features/researchers/ui/ResearchersPage"),
    detailComponent: () =>
      import("@/features/researchers/ui/ResearcherDetailDialog"),
  },
  {
    title: entityNames.RESEARCHES,
    path: entityPaths.RESEARCHES,
    pageComponent: () => import("@/features/researches/ui/ResearchesPage"),
    detailComponent: () =>
      import("@/features/researches/ui/ResearchDetialDialog"),
  },
  {
    title: entityNames.PLANTS,
    path: entityPaths.PLANTS,
    pageComponent: () => import("@/features/plants/ui/PlantsPage"),
    detailComponent: () => import("@/features/plants/ui/PlantDetailDialog"),
  },
  {
    title: entityNames.LABS,
    path: entityPaths.LABS,
    pageComponent: () => import("@/features/labs/ui/LabsPage"),
    detailComponent: () => import("@/features/labs/ui/LabDetailDialog"),
  },
  {
    title: entityNames.LOCATIONS,
    path: entityPaths.LOCATIONS,
    pageComponent: () => import("@/features/locations/ui/LocationsPage"),
    detailComponent: () =>
      import("@/features/locations/ui/LocationDetailDialog"),
  },
];

export const standaloneRoutes: EntityRouteConfig[] = [
  {
    title: entityNames.ANALYZER,
    path: entityPaths.ANALYZER,
    pageComponent: () => import("@/features/analyzer/ui/AnalyzerPage"),
  },
];
