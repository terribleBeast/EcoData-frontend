export interface IChapterField {
  name: string;
  value: string | React.ReactElement;
}

export interface IChapterData {
  title: string;
  fields: IChapterField[] | React.ReactNode;
}
