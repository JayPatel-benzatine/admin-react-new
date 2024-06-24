import React from "react"
import { Controller } from "react-hook-form"
import PhoneInput from "react-phone-number-input"
import { isValidPhoneNumber } from "react-phone-number-input"

function PhoneNumberInputBox(props) {
    const { label, name, control, rules, className, ...rest } = props
    return (
        <div className="form-group">
            <label className="text-capitalize lable-wrap">
                {label}{" "}
                {rules?.required && (
                    <span className="text-danger font-16">*</span>
                )}
            </label>
            <Controller
                name={name}
                control={control}
                rules={{
                    rules,
                    validate: (value) => {
                        return isValidPhoneNumber(value)
                    },
                }}
                render={({ field }) => (
                    <PhoneInput
                        international
                        defaultCountry="IN"
                        numberInputProps={{
                            className: `form-control ${className}`,
                        }}
                        {...field}
                        {...rest}
                    />
                )}
            />
        </div>
    )
}

export default PhoneNumberInputBox
