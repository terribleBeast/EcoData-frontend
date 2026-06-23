import { Autocomplete, TextField } from "@mui/material";
import { type IGenus } from "@/shared/types";

interface ClassifierDropdownProps {
  onSelect: (item: IGenus) => void;
  selectedGenus: IGenus | undefined;
  genera: IGenus[];
}

export const ClassifierDropdown = ({
  onSelect,
  genera,
  selectedGenus,
}: ClassifierDropdownProps) => {
  return (
    <Autocomplete
      options={genera}
      value={selectedGenus || null}
      onChange={(_, value) => {
        if (value) onSelect(value);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(o, v) => o.id === v.id}
      renderInput={(params) => <TextField {...params} fullWidth />}
      noOptionsText="Нет доступных вариантов"
      // renderOption={(props, option) => (
      //   <Box
      //     component="li"
      //     {...props}
      //     display="flex"
      //     alignItems="center"
      //     gap={1}
      //   >
      //     <AppleIcon
      //       color="success"
      //       fontSize="small"
      //     />

      //     <Typography>
      //       {option.name}
      //     </Typography>
      //   </Box>
      // )}
    />

    // renderOption={(props, option) => (
    //   <Box component="li" {...props}>
    //     <Box>
    //       <Typography sx={{ fontWeight: 800, fontSize: "3rem" }}>
    //         {option}
    //       </Typography>

    //       {/*<Typography variant="caption" color="text.secondary">
    //         {option.imagesCount} изображений
    //       </Typography>*/}
    //     </Box>
    //   </Box>
    // )}
  );
};
