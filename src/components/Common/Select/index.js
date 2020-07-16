import * as React from 'react';
import { Select, InputLabel, MenuItem } from '@material-ui/core';
import { Controller } from 'react-hook-form';


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
    items
}) => {
    return (
        <div key={name} className={className}>
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
                    <Select
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

SelectField.defaultProps = {};

export default SelectField;
