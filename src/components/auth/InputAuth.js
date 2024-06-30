function InputAuth({ title, type, className, placehoder, value, onChange }) {
    return (
        <>
            <label>{title}</label>
            <input
                type={type}
                className={className}
                placeholder={placehoder}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default InputAuth;
