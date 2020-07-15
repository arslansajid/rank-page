import * as React from 'react';
import { TextField, InputLabel } from '@material-ui/core';
import { Controller } from 'react-hook-form';


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
    placeholder
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
                    <TextField
                        error={error}
                        helperText={helperText}
                        multiline={type ? false : true}
                        rows={type ? undefined : rows}
                        type={type}
                        placeholder={placeholder}
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
                // InputProps={{
                //     style: {
                //         height : "50px",
                //         backgroundColor : '#fff',
                //     }
                // }}
            />
        </div>
    );
};

ZTextField.defaultProps = {};

export default ZTextField;
