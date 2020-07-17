import React from "react";
import {InputAdornment, TextField, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';

const SearchInput = () => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.container}
            margin='dense'
            variant='outlined'
            placeholder="Search Rankpage ..."
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment>
                    <IconButton disabled className={classes.searchIcon}>
                        <SearchIcon />
                    </IconButton>
                    </InputAdornment>
                )
            }}
      />
    )

}

const useStyles = makeStyles((theme) => ({
        container: {
            borderRadius: 8,
            background: Colors.inputBg,
            height: 40,
            // border: '1px solid rgba(38, 38, 38, 0.12)',
        },
        searchIcon: {
            padding: '12px 12px 12px 0px'
        }
    })
)


export default SearchInput;