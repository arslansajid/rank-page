import React from "react";
import {InputAdornment, TextField, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from "react-router-dom"

const SearchInput = (props) => {
    const classes = useStyles();
    const { handleSearch, onFocusRoute } = props;
    console.log(props)
    return (
        <TextField
            className={classes.container}
            margin='dense'
            variant='outlined'
            placeholder="Search Rankpage ..."
            fullWidth
            onFocus={() => !!onFocusRoute && window.location.replace(onFocusRoute)}
            onKeyPress={(event) => {
                if(event.key === 'Enter') {
                    handleSearch(event.target.value);
                }
              }}
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