import React from "react";
import { CountryRegionData  } from "react-country-region-selector";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField, InputLabel } from "@material-ui/core";
import { Controller } from 'react-hook-form';
import Colors from "../../../static/_colors"
import { makeStyles } from '@material-ui/core/styles';

const getRegions = country => {
    if (!country) {
        return [];
    }
    return country[2].split("|").map(regionPair => {
        let [regionName, regionShortCode = null] = regionPair.split("~");
        return regionName;
    });
};

function CountryRegionMUISelectors(props) {
    const {
        id,
        label,
        defaultValue,
        className,
        control,
        error,
        name,
        helperText,
        rules,
        rows,
        type,
        placeholder
    } = props;
    const classes = useStyles();


    return (
        <>
            {!!label && label.length && (
                <div
                // className={classes.labelContainer}
                >
                    <InputLabel
                        htmlFor={id}
                    // className={classes.textFieldLabel}
                    >
                        {label}
                    </InputLabel>
                </div>
            )}
            <Controller
                key={name}
                as={
                  <TextField
                  id="region"
                  label="Region"
                  value={props.region}
                  select
                  onChange={(value) => props.handleChange(value)}
                >
                  {getRegions(props.country).map(
                    (option, index) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
                </TextField>
                }
                rules={rules}
                autoComplete='false'
                // label={label}
                margin='dense'
                variant='outlined'
                fullWidth
                name={name}
                control={control}
                defaultValue={defaultValue}
                onChange={([selected]) => {
                    // React Select return object instead of value for selection
					      return selected;
				  }}
            />
            {/* <br />
      <TextField
        id="region"
        label="Region"
        value={props.region}
        select
        onChange={props.handleChange("region")}
      >
        {getRegions(props.country).map(
          (option, index) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        )}
      </TextField> */}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
	greyInput: {
        borderRadius: 8,
		background: Colors.inputBg,
    }
}))

export default CountryRegionMUISelectors;