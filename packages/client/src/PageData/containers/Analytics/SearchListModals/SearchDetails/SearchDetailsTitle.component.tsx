import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { FavFiltersResponse } from "src/api/react-query/analytics/hooks/analytics.store";
import CloseIcon from "@mui/icons-material/Close";

interface SearchDetailsTitleProps {
    search: FavFiltersResponse;
    onClose: () => void;
}

export const SearchDetailsTitle: React.FC<SearchDetailsTitleProps> = ({search, onClose}) => {
  const theme = useTheme();

  return (
    <>
      <CloseIcon onClick={() => onClose()} fontSize="medium" sx={{cursor: "pointer", color: theme.palette.grey.middle1, position: "absolute", right: "30px"}} />
      <Typography variant="h2">{search?.name?.capitalizeFirstLetter()}</Typography>
      <Typography variant="caption">{` ${dayjs(search?.creation_date).format("MMMM DD, YYYY")}`}</Typography>
    </>
  );
};