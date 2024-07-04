import React from 'react';

const InputForm = ({ title, id, name, type, onChange, value, className, placeholder }) => {
    return (
        <div className="input-form flex flex-col">
            <label htmlFor={id} className='text-[12px] font-bold'>{title}</label>
            <input
                id={id}
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                className={className}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputForm;
