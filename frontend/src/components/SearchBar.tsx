import React from "react";
import { Box, Autocomplete, TextField, InputAdornment, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  availableTags: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  availableTags,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "3rem",
        paddingTop: "1rem"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#1976d2",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Discover Your Favorite Blogs
      </Typography>

      <Autocomplete
        freeSolo
        options={availableTags}
        value={searchQuery}
        onInputChange={(e, newValue) => setSearchQuery(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search blogs by title or tags..."
            variant="outlined"
            aria-label="Search box"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "30px",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
              },
            }}
          />
        )}
        sx={{
          width: "100%",
          maxWidth: "600px",
        }}
      />
    </Box>
  );
};

export default SearchBar;
