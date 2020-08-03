import React, { useState } from 'react';
import { TextField, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import Colors from "../../../static/_colors"
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const ZTextField = ({
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
    placeholder,
    required,

}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    return (
        <div key={name} className={className}>
            {!!label && label.length && (
                <div
                    // className={classes.labelContainer}
                    >
                    <InputLabel
                        htmlFor={id}
                        className={classes.textFieldLabel}
                    >
                    {label}
                    {!!required && (
                    <span className={classes.asteric}>
                        *
                    </span>
                    )}
                    </InputLabel>
                </div>
            )}
       
            <Controller
                key={name}
                as={
                    <TextField
                        className={classes.greyInput}
                        error={error}
                        helperText={helperText}
                        multiline={type ? false : true}
                        rows={type ? undefined : rows}
                        // type={type}
                        type={type === "password" ? showPassword ? "text" : "password" : type}
                        placeholder={placeholder}
                        InputProps={(type === "password") ? { // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }: {}}
                    />
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

            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
	greyInput: {
        borderRadius: 8,
		background: Colors.inputBg,
    },
    asteric : {
        color: Colors.red,
        marginLeft : 5,
    },
    textFieldLabel : {
        color: Colors.black,
    },
}))

ZTextField.defaultProps = {};

export default ZTextField;
