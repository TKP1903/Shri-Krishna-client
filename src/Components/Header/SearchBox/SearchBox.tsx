import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

import { Button } from "@mui/material";
import {
  SearchContextProvider,
  useSearchContext,
} from "../../../helpers/SearchContext/SearchContextProvider";

import { useContext } from "react";

export default function SearchBox() {
  const { search, setSearch } = useSearchContext();
  return (
    <SearchContextProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "97%",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%" }}
        />
        <Button
          variant="contained"
          style={{
            marginBottom: "2px",
          }}
        >
          <SearchIcon
            style={{
              fontSize: "2rem",
            }}
          />
        </Button>
        {/* <IconButton></IconButton> */}
      </div>
    </SearchContextProvider>
  );
}
