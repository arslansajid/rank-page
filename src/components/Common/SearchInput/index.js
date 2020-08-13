import React, {useState, useEffect} from "react";
import {InputAdornment, TextField, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from "react-router-dom"

const SearchInput = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState('')
    const { handleSearch, onFocusRoute, whiteInput } = props;

    useEffect(() => {
        console.log("FORECE RE_RENDER", props.value)
        setValue(props.value ? props.value : '')
    }, [props.value])
    return (
        <TextField
            className={whiteInput ? classes.whiteInput : classes.container}
            margin='dense'
            variant='outlined'
            placeholder="Search Rankpage ..."
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
        whiteInput: {
            borderRadius: 8,
            background: Colors.white,
            height: 40,
        },
        searchIcon: {
            padding: '12px 12px 12px 0px'
        }
    })
)


export default SearchInput;