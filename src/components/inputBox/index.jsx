import React from 'react'
import { Controller } from 'react-hook-form'
import "./inputBox.css"

function InputBox(props) {
    const { label, type, name, control, placeholder, rules, className } = props
    
    return (
        <div className="form-group">
            <label className='text-capitalize lable-wrap'>{label} {rules?.required && <span className='text-danger font-16'>*</span>}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <input
                        type={type}
                        {...field}
                        className={`form-control ${className ? className : ""}`}
                        placeholder={placeholder}
                    />
                )}
            />
        </div>
    )
}

export default InputBox