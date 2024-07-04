const ItemMenu = ({ title, onClick, icon, className }) => {
    return (
        <li onClick={onClick} className={className}>
            {icon}
            {title}
        </li>
    );
};

export default ItemMenu;
