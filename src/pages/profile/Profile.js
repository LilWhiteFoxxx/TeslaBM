import React, { useState } from 'react';
import './profile.scss'

// Giả sử có một đối tượng người dùng mẫu
const user = {
    avatar: 'https://t4.ftcdn.net/jpg/05/62/02/41/360_F_562024161_tGM4lFlnO0OczLYHFFuNNdMUTG9ekHxb.jpg', // Link đến avatar
    username: 'john_doe',
    firstname: 'John',
    lastname: 'Doe',
    birthday: '1990-01-01',
    address: '123 Main St, Anytown, USA',
};

const ProfilePage = () => {
    // Tạo trạng thái để theo dõi chế độ chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);

    // Xử lý sự kiện khi nhấn nút chỉnh sửa
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Xử lý sự kiện khi nhấn nút lưu thay đổi
    const handleSaveClick = () => {
        setIsEditing(false);
        // Xử lý logic lưu thông tin ở đây
    };

    // Xử lý sự kiện khi nhấn nút hủy
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <h2>{user.firstname} {user.lastname}</h2>
                <p>@{user.username}</p>
            </div>

            {isEditing ? (
                <div className="profile-edit">
                    <label>
                        First Name:
                        <input type="text" defaultValue={user.firstname} />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" defaultValue={user.lastname} />
                    </label>
                    <label>
                        Birthday:
                        <input type="date" defaultValue={user.birthday} />
                    </label>
                    <label>
                        Address:
                        <input type="text" defaultValue={user.address} />
                    </label>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <div className="profile-info">
                    <p>Birthday: {user.birthday}</p>
                    <p>Address: {user.address}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
