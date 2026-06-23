/**
 * Generates db.json for json-server.
 * Uses @faker-js/faker to produce realistic seed data that matches
 * the API response shapes expected by RTK Query endpoints.
 *
 * Usage:  npx tsx scripts/generateMockDb.ts
 * Output: src/test/db.json (gitignored)
 *
 * Keep domain shapes in sync with src/shared/types/*.
 */

import { Faker, ru } from "@faker-js/faker";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// ---------------------------------------------------------------------------
// Domain types — mirrors src/shared/types/*
// ---------------------------------------------------------------------------

const ruFaker = new Faker({ locale: ru });

interface Researcher {
  id: number;
  name: string;
  patronymic: string;
  surname: string;
  email: string;
  password_hash: string;
  role: string;
  job: string;
  phone: string;
  researches_id: number[];
}

interface Research {
  id: number;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  researchers_id: number[];
  status: "Активно" | "Прекращено";
}

interface PredictionRow {
  headers: string[];
  rows: number[][];
}

interface Plant {
  id: number;
  address_id: number;
  plant_description_id: number;
  additional_info: string;
  plant_description?: PlantDescription;
}

interface PlantDescription {
  id: number;
  life_form_id: number;
  leaf_type_id: number;
  genus_id: number;
  species_id: number;
  description: string;
  genus?: Genus;
  species?: Species;
  leaf_type?: LeafType;
  life_form?: LifeForm;
}

interface Genus {
  id: number;
  name: string;
}
interface Species {
  id: number;
  name: string;
  genusId: number;
}
interface LeafType {
  id: number;
  name: string;
}
interface LifeForm {
  id: number;
  name: string;
}

interface Lab {
  id: number;
  address_id: number;
  organization_details_id: number;
  organization_type_id: number;
  organization_details?: OrganizationDetails;
  organization_type?: OrganizationType;
}

interface OrganizationDetails {
  id: number;
  name: string;
  email: string;
  phone: string;
}
interface OrganizationType {
  id: number;
  name: string;
}

interface Country {
  id: number;
  name: string;
}
interface Region {
  id: number;
  name: string;
  country_id: number;
}
interface District {
  id: number;
  name: string;
  region_id: number;
}
interface SettlementType {
  id: number;
  name: string;
}
interface Settlement {
  id: number;
  name: string;
  district_id: number;
  settlement_type_id: number;
}
interface Street {
  id: number;
  name: string;
}
interface HouseNumber {
  id: number;
  number: string;
}
interface Address {
  id: number;
  house_number_id: number;
  street_settlement_association_id: number;
  house_number?: HouseNumber;
  street?: Street;
  settlement?: Settlement & {
    district?: District & { region?: Region & { country?: Country } };
    settlement_type?: SettlementType;
  };
}
interface Classfier {
  id: number;
  species_id: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RESEARCHER_COUNT = 15;
const RESEARCH_COUNT = 12;
const PLANT_COUNT = 10;
const LAB_COUNT = 6;
const ADDRESS_COUNT = 12;
const CLASSIFIERS_COUNT = 5;

const JOBS = [
  "Ботаник",
  "Эколог",
  "Агроном",
  "Селекционер",
  "Фитопатолог",
  "Биохимик",
  "Генетик",
  "Почвовед",
] as const;

const GOALS = [
  "Изучение устойчивости сортов к заморозкам",
  "Анализ урожайности при разных режимах полива",
  "Селекция сортов с повышенной сахаристостью",
  "Оценка влияния удобрений на рост",
  "Мониторинг фитопатогенов в регионе",
  "Сравнительный анализ сортов по лежкости плодов",
  "Изучение адаптации к засушливому климату",
  "Генетический анализ популяций дикорастущих видов",
] as const;

const PREDICTION_CLASSIFIERS = [
  "Феникс Уральское",
  "Сувенир Алтая",
  "Подарок садоводам",
  "Заветное",
  "Бычье сердце",
];

const GENERA = [
  "Яблоня",
  "Томат",
  "Берёза",
  "Сосна",
  "Дуб",
  "Клён",
  "Смородина",
  "Малина",
] as const;
type GenusName = (typeof GENERA)[number];

const SPECIES: Record<string, string[]> = {
  Яблоня: [
    "Феникс Уральское",
    "Сувенир Алтая",
    "Подарок садоводам",
    "Заветное",
  ],
  Томат: ["Бычье сердце", "Черри", "Сливка"],
  Берёза: ["Повислая", "Пушистая"],
  Сосна: ["Обыкновенная", "Сибирская", "Горная"],
  Дуб: ["Черешчатый", "Красный"],
  Клён: ["Остролистный", "Татарский", "Ясенелистный"],
  Смородина: ["Чёрная", "Красная", "Белая"],
  Малина: ["Обыкновенная", "Ремонтантная"],
};

const LEAF_TYPES = [
  "Простой",
  "Сложный",
  "Игольчатый",
  "Чешуйчатый",
  "Лопастной",
] as const;

const LIFE_FORMS = [
  "Дерево",
  "Кустарник",
  "Травянистое",
  "Лиана",
  "Полукустарник",
] as const;

const ORG_TYPES = [
  "НИИ",
  "Университет",
  "Агрохолдинг",
  "Ботанический сад",
  "Лаборатория",
] as const;

const COUNTRIES = ["Россия", "Казахстан", "Беларусь", "Узбекистан"] as const;

const REGIONS: Record<string, string[]> = {
  Россия: [
    "Московская область",
    "Ленинградская область",
    "Краснодарский край",
    "Алтайский край",
    "Республика Татарстан",
    "Свердловская область",
  ],
  Казахстан: ["Алматинская область", "Акмолинская область"],
  Беларусь: ["Минская область", "Брестская область"],
  Узбекистан: ["Ташкентская область", "Самаркандская область"],
};

const SETTLEMENT_TYPES = [
  "Город",
  "Посёлок",
  "Село",
  "Деревня",
  "Посёлок городского типа",
] as const;

const STREET_NAMES = [
  "Ленина",
  "Мира",
  "Садовая",
  "Лесная",
  "Центральная",
  "Молодёжная",
  "Советская",
  "Полевая",
  "Зелёная",
  "Набережная",
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function pickRandom<T>(arr: readonly T[]): T {
  return arr[ruFaker.number.int({ min: 0, max: arr.length - 1 })];
}

function pickSubset<T>(arr: readonly T[], min: number, max: number): T[] {
  const count = ruFaker.number.int({ min, max: Math.min(max, arr.length) });
  return ruFaker.helpers.shuffle([...arr]).slice(0, count);
}

function getSpeciesForGenus(
  genusId: number,
  speciesList: Species[],
): Species[] {
  return speciesList.filter((s) => s.genusId === genusId);
}
// ---------------------------------------------------------------------------
// Generators — Researchers & Researches (existing)
// ---------------------------------------------------------------------------

function generateResearcher(id: number, researchIds: number[]): Researcher {
  const name = ruFaker.person.firstName("male");
  const surname = ruFaker.person.lastName("male");
  return {
    id,
    name,
    patronymic: ruFaker.person.middleName("male"),
    surname,
    email: ruFaker.internet.email({ firstName: name, lastName: surname }),
    password_hash: ruFaker.internet.password({ length: 16 }),
    role: ruFaker.helpers.arrayElement(["admin", "user"]),
    job: pickRandom(JOBS),
    phone: ruFaker.phone.number({ style: "international" }),
    researches_id: pickSubset(researchIds, 1, 4),
  };
}

function generateResearch(id: number, researcherIds: number[]): Research {
  const start = ruFaker.date.between({ from: "2023-01-01", to: "2026-05-01" });
  const end = new Date(start);
  end.setMonth(end.getMonth() + ruFaker.number.int({ min: 1, max: 12 }));

  return {
    id,
    title: `${pickRandom(GOALS)}`,
    goal: pickRandom(GOALS),
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
    researchers_id: pickSubset(researcherIds, 8, 10),
    status: ruFaker.helpers.arrayElement(["Активно", "Прекращено"]),
  };
}

function generatePredictions(
  researchIds: number[],
): Record<number, PredictionRow> {
  const result: Record<number, PredictionRow> = {};
  for (const id of researchIds) {
    const rowCount = ruFaker.number.int({ min: 5, max: 20 });
    const rows: number[][] = Array.from({ length: rowCount }, () =>
      PREDICTION_CLASSIFIERS.map(() =>
        ruFaker.number.float({ min: 0, max: 1, fractionDigits: 4 }),
      ),
    );
    result[id] = { headers: PREDICTION_CLASSIFIERS, rows };
  }
  return result;
}

// ---------------------------------------------------------------------------
// Generators — Plants
// ---------------------------------------------------------------------------

function generatePlantDescription(
  id: number,
  species: Species[],
  genusName: GenusName,
): PlantDescription {
  // const genusName = pickRandom(GENERA);
  // const speciesNames = SPECIES[genusName];
  const plantSpecies = pickRandom(species);

  return {
    id,
    life_form_id: ruFaker.number.int({ min: 1, max: LIFE_FORMS.length }),
    leaf_type_id: ruFaker.number.int({ min: 1, max: LEAF_TYPES.length }),
    genus_id: GENERA.indexOf(genusName) + 1,
    species_id: plantSpecies.id,
    description: ruFaker.lorem.sentence({ min: 5, max: 15 }),
    genus: { id: GENERA.indexOf(genusName) + 1, name: genusName },
    species: plantSpecies,
    leaf_type: {
      id: ruFaker.number.int({ min: 1, max: LEAF_TYPES.length }),
      name: pickRandom(LEAF_TYPES),
    },
    life_form: {
      id: ruFaker.number.int({ min: 1, max: LIFE_FORMS.length }),
      name: pickRandom(LIFE_FORMS),
    },
  };
}

function generatePlant(
  id: number,
  addressIds: number[],
  descriptionId: number,
  description: PlantDescription,
): Plant {
  return {
    id,
    address_id: pickRandom(addressIds),
    plant_description_id: descriptionId,
    additional_info: ruFaker.lorem.sentence({ min: 3, max: 8 }),
    plant_description: description,
  };
}

// ---------------------------------------------------------------------------
// Generators — Labs
// ---------------------------------------------------------------------------

function generateOrganizationDetails(id: number): OrganizationDetails {
  return {
    id,
    name: ruFaker.company.name(),
    email: ruFaker.internet.email(),
    phone: ruFaker.phone.number({ style: "international" }),
  };
}

function generateLab(
  id: number,
  addressIds: number[],
  detailsId: number,
  details: OrganizationDetails,
  type: OrganizationType,
): Lab {
  return {
    id,
    address_id: pickRandom(addressIds),
    organization_details_id: detailsId,
    organization_type_id: type.id,
    organization_details: details,
    organization_type: type,
  };
}

// ---------------------------------------------------------------------------
// Generators — Locations
// ---------------------------------------------------------------------------

function generateCountries(): Country[] {
  return COUNTRIES.map((name, i) => ({ id: i + 1, name }));
}

function generateRegions(countries: Country[]): Region[] {
  let id = 1;
  const result: Region[] = [];
  for (const country of countries) {
    const names = REGIONS[country.name] ?? [];
    for (const name of names) {
      result.push({ id: id++, name, country_id: country.id });
    }
  }
  return result;
}

function generateDistricts(regions: Region[]): District[] {
  const names = [
    "Центральный",
    "Северный",
    "Южный",
    "Западный",
    "Восточный",
    "Прибрежный",
    "Горный",
    "Степной",
  ];
  let id = 1;
  const result: District[] = [];
  for (const region of regions) {
    const count = ruFaker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < count; i++) {
      result.push({
        id: id++,
        name: pickRandom(names),
        region_id: region.id,
      });
    }
  }
  return result;
}

function generateSettlementTypes(): SettlementType[] {
  return SETTLEMENT_TYPES.map((name, i) => ({ id: i + 1, name }));
}

function generateSettlements(districts: District[]): Settlement[] {
  let id = 1;
  const result: Settlement[] = [];
  for (const district of districts) {
    const count = ruFaker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < count; i++) {
      result.push({
        id: id++,
        name: ruFaker.location.city(),
        district_id: district.id,
        settlement_type_id: ruFaker.number.int({
          min: 1,
          max: SETTLEMENT_TYPES.length,
        }),
      });
    }
  }
  return result;
}

function generateStreets(): Street[] {
  return STREET_NAMES.map((name, i) => ({ id: i + 1, name }));
}

function generateHouseNumbers(): HouseNumber[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    number: `${ruFaker.number.int({ min: 1, max: 200 })}${ruFaker.helpers.arrayElement(["", "А", "Б", "В", "к1", "к2"])}`,
  }));
}

function generateAddresses(
  count: number,
  settlements: Settlement[],
  streets: Street[],
  houseNumbers: HouseNumber[],
): Address[] {
  return Array.from({ length: count }, (_, i) => {
    const street = pickRandom(streets);
    const settlement = pickRandom(settlements);
    return {
      id: i + 1,
      house_number_id: pickRandom(houseNumbers).id,
      street_settlement_association_id: i + 1,
      house_number: pickRandom(houseNumbers),
      street,
      settlement: {
        ...settlement,
        district: {
          id: settlement.district_id,
          name: ruFaker.helpers.arrayElement([
            "Центральный",
            "Северный",
            "Южный",
          ]),
          region_id: 1,
          region: {
            id: 1,
            name: pickRandom(REGIONS["Россия"]),
            country_id: 1,
            country: { id: 1, name: "Россия" },
          },
        },
        settlement_type: {
          id: ruFaker.number.int({ min: 1, max: SETTLEMENT_TYPES.length }),
          name: pickRandom(SETTLEMENT_TYPES),
        },
      },
    };
  });
}
function generateClassifiers(id: number, species: Species): Classfier {
  return {
    id: id,
    species_id: species.id,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  // --- Lookup endpoints ---
  const genera = GENERA.map((name, i) => ({ id: i + 1, name }));
  const species: Species[] = genera.flatMap((genus) =>
    SPECIES[genus.name].map((name, index) => ({
      id: genus.id * 100 + index + 1,
      name,
      genusId: genus.id,
    })),
  );

  const leafTypes = LEAF_TYPES.map((name, i) => ({ id: i + 1, name }));
  const lifeForms = LIFE_FORMS.map((name, i) => ({ id: i + 1, name }));
  // --- Researchers & Researches (existing) ---
  const researchIds = Array.from({ length: RESEARCH_COUNT }, (_, i) => i + 1);
  const researcherIds = Array.from(
    { length: RESEARCHER_COUNT },
    (_, i) => i + 1,
  );

  const researchers = researcherIds.map((id) =>
    generateResearcher(id, researchIds),
  );
  const researches = researchIds.map((id) =>
    generateResearch(id, researcherIds),
  );
  const predictions = generatePredictions(researchIds);

  // --- Location hierarchy ---
  const countries = generateCountries();
  const regions = generateRegions(countries);
  const districts = generateDistricts(regions);
  const settlementTypes = generateSettlementTypes();
  const settlements = generateSettlements(districts);
  const streets = generateStreets();
  const houseNumbers = generateHouseNumbers();
  const locations = generateAddresses(
    ADDRESS_COUNT,
    settlements,
    streets,
    houseNumbers,
  );
  const addressIds = locations.map((a) => a.id);

  // --- Plants ---
  const plantDescriptions = Array.from({ length: PLANT_COUNT }, (_, i) =>
    generatePlantDescription(i + 1, species, pickRandom(genera).name),
  );
  const plants = Array.from({ length: PLANT_COUNT }, (_, i) =>
    generatePlant(i + 1, addressIds, i + 1, plantDescriptions[i]),
  );

  // --- Labs ---
  const orgTypes: OrganizationType[] = ORG_TYPES.map((name, i) => ({
    id: i + 1,
    name,
  }));
  const orgDetails = Array.from({ length: LAB_COUNT }, (_, i) =>
    generateOrganizationDetails(i + 1),
  );
  const labs: Lab[] = Array.from({ length: LAB_COUNT }, (_, i) =>
    generateLab(i + 1, addressIds, i + 1, orgDetails[i], pickRandom(orgTypes)),
  );
  // --- Classifiers ---
  const classifiers = Array.from({ length: CLASSIFIERS_COUNT }, (_, i) =>
    generateClassifiers(i + 1, pickRandom(species)),
  );

  const db = {
    researchers,
    researches,
    predictions,
    plants,
    plantDescriptions,
    genera,
    species,
    leafTypes,
    lifeForms,
    laboratories: labs,
    organizationTypes: orgTypes,
    locations,
    countries,
    regions,
    districts,
    settlements,
    settlementTypes,
    streets,
    houseNumbers,
    classifiers,
  };

  const outPath = resolve("D:/projects/EcoData/frontend/src/test", "db.json");
  writeFileSync(outPath, JSON.stringify(db, null, 2), "utf-8");

  console.log(
    `✅ db.json written\n` +
      `   ${researchers.length} researchers\n` +
      `   ${researches.length} researches\n` +
      `   ${Object.keys(predictions).length} prediction sets\n` +
      `   ${plants.length} plants\n` +
      `   ${labs.length} labs\n` +
      `   ${locations.length} addresses\n` +
      `   ${countries.length} countries, ${regions.length} regions, ${districts.length} districts`,
  );
}

main();
