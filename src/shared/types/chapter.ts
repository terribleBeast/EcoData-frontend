export interface IChapterField {
  name: string;
  value: string;
}

export interface IChapterData {
  title: string;
  fields: IChapterField[] | React.ReactNode;
}
