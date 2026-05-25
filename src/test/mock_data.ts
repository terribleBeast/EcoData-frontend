import { Faker, ru } from "@faker-js/faker";
import {
  type IResearchDataFull,
  ResearchStatus,
} from "../shared/types/research";
import type { IResearcherDataFull } from "../shared/types/researcher";
import { type ImageStatusType, type IImageData } from "@/shared/types/image";

const customFaker = new Faker({ locale: [ru] });
const researchers: IResearcherDataFull[] = [];
const researches: IResearchDataFull[] = [];
let isActiveDB = false;

export function generateMockDB(
  researchersNumber = 20,
  researchesNumber = 20,
  minResearchesNumber = 1,
  maxResearchesNumber = 8,
) {
  if (isActiveDB) return;
  generateMockResearchers(researchersNumber);
  generateMockResearches(
    researchesNumber,
    minResearchesNumber,
    maxResearchesNumber,
  );
  console.log(researches);
  console.log(researchers);
  for (let i = 0; i < researches.length; i++) {
    researches[i].researchers_id.map((researcher_id: number) =>
      researchers[researcher_id].researches_id.push(researches[i].id),
    );
  }
  isActiveDB = true;
}
function generateMockResearches(
  researchesNumber: number,
  minResearchesNumber: number,
  maxResearchesNumber: number,
) {
  for (let i = 0; i < researchesNumber; i++) {
    const researchers_id = [];
    const researchersNumber = customFaker.number.int({
      min: minResearchesNumber,
      max: maxResearchesNumber,
    });
    for (let j = 0; j < researchersNumber; j++)
      researchers_id.push(
        customFaker.number.int({ min: 1, max: researchers.length - 1 }),
      );
    console.log(researchers_id);

    const startDate = customFaker.date.anytime();
    researches.push({
      id: i,
      title: customFaker.lorem.sentence({ min: 2, max: 5 }),
      goal: customFaker.lorem.sentence({ min: 2, max: 5 }),
      startDate: startDate.toDateString(),
      endDate: customFaker.date.future({ refDate: startDate }).toDateString(),
      status: ResearchStatus.STOP,
      researchers_id: researchers_id,
    });
  }
}

function generateMockResearchers(researchersNumber: number) {
  for (let i = 0; i < researchersNumber; i++) {
    const sex = customFaker.person.sexType();
    const firstName = customFaker.person.firstName(sex);
    const lastName = customFaker.person.lastName(sex);
    const researches_id: number[] = [];

    researchers.push({
      id: i,
      name: firstName,
      surname: lastName,
      patronymic: customFaker.person.middleName(sex),
      role: "ученый",
      email: customFaker.internet.email({
        firstName: firstName,
        lastName: lastName,
      }),
      phone: customFaker.phone.number(),
      job: customFaker.person.jobType(),
      researches_id: researches_id,
      password_hash: "123",
    });
  }
}

export function getMockResearches() {
  return researches;
}

export function getMockResearchers() {
  return researchers;
}

export function getMockImages(
  defaultStatus: ImageStatusType,
  imagesNumber: number,
) {
  const images = [
    "test_images/Image_1002 (1).jpg",
    "test_images/Image_1002.jpg",
    "test_images/beast.jpg",
    "",
  ];
  const imagesObjects: IImageData[] = [];
  for (let i = 0; i < imagesNumber; i++) {
    images.forEach((image) => {
      imagesObjects.push({
        id: 2,
        src: image,
        name: image,
        file: new File(["foo"], "undefined"), // TODO: mock
        key: image + i.toString(),
        predictions: undefined,
        status: defaultStatus,
        classifier: "Яблоня",
      });
    });
  }
  return imagesObjects;
}
export function getMockImageStatus() {
  const statuses = {
    uploaded: "Загружен",
    processing: "В обработке",
    processed: "Обработан",
    error: "Ошибка",
  };

  const values = Object.values(statuses);
  const status: string = values[Math.floor(Math.random() * values.length)];
  return status;
}

// export async function getMockPrediction(image: ImageData) {
//   let result = null;
//   const values = Object.values(ImageStatusType);
//   const status: ImageStatusType =
//     values[Math.floor(Math.random() * values.length)];
//   // image.status = status;
//   if (image.status === status) {
//     // Predictions for apple tries
//     const predictions = [
//       "Феникс Уральское",
//       "Уральское наливное",
//       "Сувенир Алтая",
//       "Подарок садоводам",
//       "Заветное",
//       "Жебровское",
//       "Жар-птица",
//       "Алтайское румяное",
//       "Алтайское зимнее",
//       "Алтайская красавица",
//     ];
//     result = predictions.map((prediction) => ({
//       classifier: prediction,
//       probability: Math.random() * 100,
//     }));
//   }

//   await new Promise((result) => setTimeout(result, 200));
//   return Promise.resolve(result);
// }
