import React from 'react';
import { TextField, IconButton,Box } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box sx={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
    <TextField
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      label="Search by title or tags..."
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <IconButton>
            <Search />
          </IconButton>
        ),
      }}
      sx={{
        maxWidth: "600px",
      }}
    />
    </Box>
  );
};

export default SearchBar;
