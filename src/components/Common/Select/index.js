import * as React from 'react';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import Colors from "../../../static/_colors"
import { makeStyles } from '@material-ui/core/styles';

const SelectField = ({
    id,
    label,
    defaultValue,
    className,
    control,
    error,
    name,
    helperText,
    rules,
    placeholder,
    items,
    required,
}) => {
    const classes = useStyles();

    return (
        <div key={name} className={className}>
            {!!label && label.length && (
                <div
                    // className={classes.labelContainer}
                    >
                    <InputLabel
                        htmlFor={id}
                        className={classes.selectLabel}
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
                    <Select
                        className={classes.greyInput}
                        error={error}
                        placeholder={placeholder}
                    >
                        {
                            items.map((item, index) => {
                                return (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                )
                            })
                        }
                    </Select>
                }
                rules={rules}
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
        // borderRadius: 8,
		background: Colors.inputBg,
    },
    asteric : {
        color: Colors.red,
        marginLeft : 5,
    },
    selectLabel : {
        marginBottom : 7,
        color : Colors.black,
    },
}))

SelectField.defaultProps = {};

export default SelectField;
