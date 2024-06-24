import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import "./datePicker.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker(props) {
    const { label, name, placeholder, rules, className, ...rest } = props
    const { control } = useFormContext()
    return (
        <div className="form-group">
            <label className='text-capitalize lable-wrap'>{label} {rules?.required && <span className='text-danger font-16'>*</span>}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        placeholderText={placeholder}
                        className={`form-control ${className}`}
                        popperPlacement="bottom"
                        popperModifiers={{
                            offset: {
                                enabled: true,
                                offset: '0, 15px',
                            },
                            flip: {
                                enabled: false,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'viewport',
                            },
                        }}
                        dateFormat={'dd/MM/yyyy'}
                        // showYearDropdown
                        // showMonthDropdown
                        {...rest}
                    />
                )}
            />
        </div>
    )
}

export default CustomDatePicker