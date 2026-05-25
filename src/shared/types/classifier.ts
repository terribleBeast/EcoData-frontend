export interface IClassifier {
  plant: string;
  varieties: string[];
}

export const classifiers: IClassifier[] = [
  {
    plant: "Яблоня",
    varieties: [
      "Феникс Уральское",
      // "Уральское наливное",
      "Сувенир Алтая",
      "Подарок садоводам",
      "Заветное",
      // "Жебровское",
      // "Жар-птица",
      // "Алтайское румяное",
      // "Алтайское зимнее",
      // "Алтайская красавица",
    ],
  },
  {
    plant: "Томаты",
    varieties: ["Бычье сердце"],
  },
];
