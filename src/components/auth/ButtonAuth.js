function ButtonAuth({ title, type, className, onClick}) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default ButtonAuth;
