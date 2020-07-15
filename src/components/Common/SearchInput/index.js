import React from "react";
import {InputAdornment, TextField, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchInput = () => {
    return (
        <TextField
            margin='dense'
            variant='outlined'
            placeholder="Search ..."
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                    <IconButton disabled>
                        <SearchIcon />
                    </IconButton>
                    </InputAdornment>
                )
            }}
      />
    )

}

export default SearchInput;