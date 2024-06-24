import React from 'react'
import { DebounceInput } from 'react-debounce-input'

function DebounceInputBox({ placeholder, onSearch, showIcon, icon, className, value }) {
    return (
        <div className="form-group">
            <div className="input-group">
                {showIcon && <div className="input-group-prepend">
                    <div className="input-group-text">
                        {icon}
                    </div>
                </div>}
                <DebounceInput
                    value={value}
                    type="text"
                    className={`form-control currency ${className}`}
                    placeholder={placeholder}
                    debounceTimeout={300}
                    onChange={(e) => onSearch(e.target.value)}
                    minLength={2}
                />
            </div>
        </div>
    )
}

export default DebounceInputBox