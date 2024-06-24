import React from 'react'
import Select from 'react-select';
import './selectBox.css'

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        textTransform: "capitalize",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#80bdff' : provided.backgroundColor,
        color: state.isSelected ? 'white' : provided.color,
        textTransform: "capitalize",
    }),
    groupHeading: (provided) => ({
        ...provided,
        color: '#000',
        backgroundColor: "#80808038",
        padding: "10px",
        textTransform: "capitalize",
    }),
    group: (provided) => ({
        ...provided,
        padding: 0
    }),
};


function CustomSelectBox(props) {
    const { options, label, className,required, ...rest } = props
    return (
        <div className="form-group">
            <label className='text-capitalize lable-wrap '>{label} {required && <span className='text-danger font-16'>*</span>}</label>
            <Select
                options={options}
                styles={customStyles}
                className={className}
                {...rest}
            />
        </div>
    )
}

export default CustomSelectBox