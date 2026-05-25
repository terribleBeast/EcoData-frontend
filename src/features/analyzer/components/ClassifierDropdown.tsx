import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { classifiers } from "@/shared/types";

interface ClassifierDropdownProps {
  onSelect: (index: number) => void;
  defaultValue?: string;
}

export const ClassifierDropdown = ({
  onSelect,
  defaultValue = "Яблоня",
}: ClassifierDropdownProps) => {
  return (
    <FormControl sx={{ minWidth: "15%" }}>
      <InputLabel>Род растения</InputLabel>
      <Select defaultValue={defaultValue}>
        {classifiers.map((item, index) => (
          <MenuItem
            key={index}
            value={item.plant}
            onClick={() => onSelect(index)}
          >
            {item.plant}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
