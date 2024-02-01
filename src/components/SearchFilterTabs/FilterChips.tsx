import { Chip, SxProps } from "@mui/material";

const styles: Record<string, SxProps> = {
  chipStyle: {
    padding: "0.3rem",
    fontWeight: "600",
  },
};

interface IFilterChipProps {
  label?: string;
  variant?: "outlined" | "filled";
  styleString?: string;
  onClick: () => void;
}

export const FilterChip = ({
  label,
  variant = "outlined",
  onClick,
  styleString = "",
}: IFilterChipProps) => {
  return (
    <Chip
      label={`${label}`}
      sx={styles.chipStyle}
      className={styleString}
      variant={variant}
      onClick={() => onClick()}
    />
  );
};

type IClearFilterChipProps = Omit<IFilterChipProps, "onClick"> & {
  onDelete: () => void;
};

export const ClearFilterChip = ({
  label = "",
  variant = "outlined",
  onDelete,
  styleString = "",
}: IClearFilterChipProps) => {
  return (
    <Chip
      label={`${label}`}
      sx={styles.chipStyle}
      variant={variant}
      className={styleString}
      onDelete={() => {
        onDelete();
      }}
    />
  );
};
