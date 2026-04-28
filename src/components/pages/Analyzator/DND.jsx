import { useState, useCallback } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
} from "@mui/material";
import { Delete, InsertDriveFile, CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { Droppable, Draggable } from "react-beautiful-dnd";

const FileDragAndDrop = ({
  updateImages,
  defaultState,
  selectedClassifier,
}) => {
  const [processing, setProcessing] = useState(false);

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        src: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        name: file.name,
        file: file,
        key: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        predictions: null,
        status: defaultState,
        selectedClassifier: selectedClassifier,
      }));
      // setFiles((prev) => [...prev, ...newFiles]);

      updateImages(newFiles);
    },
    [selectedClassifier],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const list =
        source.droppableId === "files" ? [...files] : [...uploadedFiles];
      const [removed] = list.splice(source.index, 1);
      list.splice(destination.index, 0, removed);

      source.droppableId === "files" ? setFiles(list) : setUploadedFiles(list);
    } else {
      const sourceList =
        source.droppableId === "files" ? [...files] : [...uploadedFiles];
      const destList =
        destination.droppableId === "files" ? [...files] : [...uploadedFiles];
      const [removed] = sourceList.splice(source.index, 1);
      destList.splice(destination.index, 0, removed);

      setFiles(source.droppableId === "files" ? sourceList : destList);
      setUploadedFiles(
        destination.droppableId === "uploaded" ? destList : sourceList,
      );
    }
  };

  const removeFile = (list, id) => {
    if (list === "files") {
      setFiles(files.filter((file) => file.id !== id));
    } else {
      setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
    }
  };

  const processFiles = async (filesToProcess) => {
    setProcessing(true);

    try {
      const processedFiles = await Promise.all(
        filesToProcess.map(async (fileItem) => {
          try {
            // Здесь ваша логика обработки
            const formData = new FormData();
            formData.append("file", fileItem.file);

            // Пример API-запроса (замените на ваш эндпоинт)
            const response = await fetch("https://your-api-endpoint/process", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();

            return {
              ...fileItem,
              status: "processed",
              result,
            };
          } catch (error) {
            console.error(
              `Error processing file ${fileItem.file.name}:`,
              error,
            );
            return {
              ...fileItem,
              status: "error",
              result: error.message,
            };
          }
        }),
      );

      setUploadedFiles(processedFiles);
    } finally {
      setProcessing(false);
    }
  };

  const renderFileList = (items, droppableId) => (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            minHeight: "200px",
            bgcolor: "background.paper",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 1,
            p: 1,
          }}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <ListItem
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    mb: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemIcon>
                    {item.preview ? (
                      <Avatar
                        src={item.preview}
                        variant="rounded"
                        sx={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <InsertDriveFile color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.file.name}
                    secondary={`${(item.file.size / 1024).toFixed(2)} KB`}
                  />
                  <IconButton
                    edge="end"
                    onClick={() => removeFile(droppableId, item.id)}
                  >
                    <Delete color="error" />
                  </IconButton>
                </ListItem>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "divider",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          mb: 3,
          cursor: "pointer",
          bgcolor: isDragActive ? "action.hover" : "background.paper",
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload
          fontSize="large"
          color={isDragActive ? "primary" : "action"}
        />
        <Typography>
          {isDragActive
            ? "Отпустите файлы здесь"
            : "Перетащите файлы сюда или кликните для выбора"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Поддерживаются изображения
        </Typography>
      </Box>

      {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Paper sx={{ p: 2, width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Загруженные файлы ({files.length})
            </Typography>
            {renderFileList(files, "files")}
          </Paper>

          <Paper sx={{ p: 2, width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Обработанные файлы ({uploadedFiles.length})
            </Typography>
            {renderFileList(uploadedFiles, "uploaded")}
          </Paper>
        </Box>
      </DragDropContext>*/}
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => processFiles(files)}
          disabled={files.length === 0 || processing}
        >
          {processing ? 'Обработка...' : 'Начать обработку'}
        </Button>
      </Box>*/}
    </Box>
  );
};

export default FileDragAndDrop;
