import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

export const Filter = ({ onFilterChange, filterKey }) => {
  return (
    <StyledTextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      label=" Filter shown with:"
      id="filter-input"
      size="small"
      value={filterKey}
      onChange={onFilterChange}
    />
  );
};

const StyledTextField = styled(TextField)`
  background-color: #f6fcff;
  border: none;
  border-radius: 0.8rem;
  & icon {
    color: #f6fcff;
  }
`;
