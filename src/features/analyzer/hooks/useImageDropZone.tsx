import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFilesAdded: (files: File[]) => void;
};

export const useImageDropzone = ({ onFilesAdded }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded],
  );

  return useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    multiple: true,
  });
};
