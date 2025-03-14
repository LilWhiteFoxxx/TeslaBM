import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { ReactComponent as SearchBtn } from '../../../Assets/images/search.svg';
import xButton from '../../../Assets/images/x-button.svg';
import globe from '../../../Assets/images/globe.svg';
import { logout } from '../../../app/features/authSlice';
import { toast } from 'react-toastify';

const StyledSideMenu = styled.div`
    * {
        margin: 0;
        padding: 0;
        line-height: auto;
    }
    position: fixed;
    z-index: 3;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    top: 0;
    bottom: 0;
    pointer-events: ${({ showSideMenu }) => (showSideMenu ? 'auto' : 'none')};
    .sideMenuModalBackdrop {
        height: 100vh;
        width: 100vw;
        display: ${({ showSideMenu }) => (showSideMenu ? 'block' : 'none')};
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        position: fixed;
        top: 0;
    }
    .sideBarMenu {
        background-color: white;
        max-width: 400px;
        width: 90vw;
        height: 100vh;
        position: absolute;
        right: 0;
        transition: all 0.3s;
        padding: 40px;
        padding-top: 100px;
        transform: ${({ showSideMenu }) =>
            showSideMenu ? 'translateX(0%)' : 'translateX(100%)'};
        overflow-y: scroll;

        .exitSideMenuBtn {
            position: absolute;
            right: 16px;
            top: 16px;
            padding: 12px;
            border-radius: 50%;
            border: none;
            background: none;
            display: grid;
            place-items: center;
            &:hover {
                background-color: rgb(237, 237, 237);
            }
        }
        .primarySideMenuNav {
            margin-bottom: 20px;
            @media (min-width: 1200px) {
                display: none;
            }
            .sideMenuSearchWrapper {
                background-color: rgb(245, 245, 245);
                display: flex;
                padding: 0px 16px;
                border-radius: 32px;
                align-items: center;
                margin-bottom: 20px;
                color: rgb(57, 60, 65);
                button {
                    background: none;
                    border: none;
                    margin-right: 8px;
                }
                input {
                    font-family: 'Gotham-Medium', sans-serif;
                    font-size: 1em;
                    padding: 12px;
                    flex-grow: 1;
                    background: none;
                    border: none;
                    outline: none;
                }
            }
            ul {
                list-style-type: none;
                display: flex;
                flex-direction: column;
                gap: 20px;
                li {
                    font-family: 'Gotham-Medium', sans-serif;
                    text-align: left;
                    padding: 16px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    img {
                        margin-left: auto;
                        height: 100%;
                        transform: rotate(-90deg);
                    }
                    &:hover {
                        background-color: rgb(237, 237, 237);
                    }
                }
            }
        }
        .secondarySideMenuNav {
            ul {
                list-style-type: none;
                li {
                    text-align: left;
                    padding: 8px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    &:hover {
                        background-color: rgb(237, 237, 237);
                        cursor: pointer;
                    }
                }
                .languageSelector {
                    display: flex;
                    align-items: flex-start;
                    img {
                        margin-right: 16px;
                    }
                }
            }
        }
    }
    .sideMenuSubCategoryList {
        list-style-type: none;
        h1 {
            text-align: left;
            margin-bottom: 20px;
        }
        li {
            margin-bottom: 20px;
            cursor: pointer;
        }

        img {
            width: 100%;
            /* height: 50vw; */
            max-height: 168px;
            object-fit: cover;
            border-radius: 20px;
            margin-bottom: 16px;
            background-color: rgb(237, 237, 237);
        }
    }
    .sideMenuBackBtn {
        display: flex;
        position: absolute;
        padding: 16px 0px;
        background: none;
        border: none;
        font-family: 'Gotham-Medium', sans-serif;
        left: 40px;
        top: 16px;
        img {
            margin-right: 12px;
            transform: rotate(90deg);
        }
    }
    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .user-avatar {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin-right: 10px;
        object-fit: cover;
    }

    .user-welcome {
        font-size: 18px;
        font-weight: bold;
    }
`;

export default function NavSideMenu({
    showSideMenu,
    setShowSideMenu,
    navList,
}) {
    const navigate = useNavigate();
    const searchRef = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [inputValue, setInputValue] = useState('');
    // const [showSubCategories, setShowSubCategories] = useState(false);
    // const [subCategories, setSubCategories] = useState([]);
    

    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            navigate(`search/${inputValue}`);
            setInputValue('');
            setShowSideMenu(false);
        }
    };
    const handleCategorySelect = (listItem) => {
        console.log(listItem);
        // setSubCategories(listItem);
        // setShowSubCategories(true);
        navigate(
          `category/${listItem.category.toLocaleLowerCase().replace(/\s/g, "-")}`
        );
    };

    const handleClose = () => {
        setShowSideMenu(false);
        // setShowSubCategories(false);
    };

    const mainNavLinks = navList.map((listItem, i) => (
        <li key={i} onClick={() => handleCategorySelect(listItem)}>
            {listItem.category}
            {/* <img src={arrow} alt="" /> */}
        </li>
    ));

    const handleLogOut = () => {
        dispatch(logout());
        toast.success('Logout success!');
    };

    return (
        <StyledSideMenu showSideMenu={showSideMenu}>
            <div className="sideMenuModalBackdrop" onClick={handleClose}></div>
            <div className="sideBarMenu">
                <button className="exitSideMenuBtn" onClick={handleClose}>
                    <img src={xButton} alt="" />
                </button>

                <div className="primarySideMenuNav">
                    <div className="sideMenuSearchWrapper">
                        <button onClick={() => searchRef.current.focus()}>
                            <SearchBtn fill="black" />
                        </button>
                        <input
                            placeholder="Search"
                            ref={searchRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyUp={(e) => handleSubmit(e)}
                        />
                    </div>
                    <ul> {mainNavLinks}</ul>
                </div>
                <div className="secondarySideMenuNav">
                    {user && (
                        <div className="user-info">
                            <img
                                className="user-avatar"
                                src={
                                    user.avatar ||
                                    'https://i.pinimg.com/originals/6a/2c/fd/6a2cfda10fb8e3167ebaf6d63279864c.png'
                                }
                                alt={`${user.username}'s avatar`}
                            />
                            <div className="user-welcome">{user.email}</div>
                        </div>
                    )}
                    <ul>
                        <li>Shop FAQ</li>
                        <li>Contact US</li>
                        {user ? (
                            <>
                                <li onClick={() => navigate('profile')}>
                                    Profile Info
                                </li>
                                <li onClick={handleLogOut}>Log Out</li>
                            </>
                        ) : (
                            <li onClick={() => navigate('login')}>Sign In</li>
                        )}
                        <li className="languageSelector">
                            <img src={globe} alt="" />
                            <div>
                                <b>United States</b>
                                <p>English</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </StyledSideMenu>
    );
}
