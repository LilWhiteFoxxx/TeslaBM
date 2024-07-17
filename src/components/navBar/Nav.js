// import styled from "styled-components";
import React, { createRef, useRef, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
    getAllCategory,
    getAllCategoryOfAccessories,
} from '../../apis/category';
import TeslaLogo from '../../Assets/images/TeslaLogo';
import DropDown from './DropDown';
import { Indicator, StyledNav } from './NavStyledComponents';
import { navList } from './navData';
import SearchBar from './SearchBar';
import CartBtn from './CartBtn';
import NavSideMenu from './navSideMenu/NavSideMenu';
// import { useSelector } from 'react-redux';

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // const { user } = useSelector((state) => state.auth);

    //Refs for link locations and sizes
    const navRefs = useRef(navList.map(() => createRef()));
    //this is cool way to make a list of refs rather than making each one by one
    const menuRef = useRef();
    const shopRef = useRef();

    //holds the information we need to position the indicator
    const [indicator, setIndicator] = useState({});
    //holds the information needed for the drop down menu pulled from the navData
    const [dropDown, setDropDown] = useState({});
    //tracks the initial hover to indicate when transition should be active
    const [initialHover, setInitialHover] = useState(false);
    //track open state of side menu
    const [showSideMenu, setShowSideMenu] = useState(false);

    const [solidNav, setSolidNav] = useState(false);

    const [subCate, setSubCate] = useState([]);
    const [subCateAccessories, setSubCateAccessories] = useState([]);

    const handleEnter = (ref, item) => {
        //this will take the ref info break it into a more manageable object
        //then set the indicator to its new position as well as update dropDown
        //information if needed
        if (initialHover) {
            setIndicator({
                height: ref.offsetHeight,
                width: ref.offsetWidth,
                posY: ref.offsetTop,
                posX: ref.offsetLeft - 4,
                initial: true,
            });
            if (item) {
                setDropDown(item);
            } else {
                setDropDown({});
            }
        } else {
            setIndicator({
                height: ref.offsetHeight,
                width: ref.offsetWidth,
                posY: ref.offsetTop,
                posX: ref.offsetLeft - 4,
                initial: false,
            });
            setInitialHover(true);
            if (item) {
                setDropDown(item);
            } else {
                setDropDown({});
            }
        }
    };
    const handleLeave = () => {
        setIndicator({
            height: 0,
            width: 0,
            posY: 0,
            posX: 0,
            initial: false,
        });
        setInitialHover(false);
        setDropDown({});
    };
    const handleLeaveNav = () => {
        //this will make the indicator disappear when the mouse exits the nav otherwise it might persist
        if (!dropDown.category) {
            setIndicator({
                height: 0,
                width: 0,
                posY: 0,
                posX: 0,
                initial: false,
            });
            setInitialHover(false);
        }
    };
    const handleSearchHover = () => {
        setIndicator({
            height: 0,
            width: 0,
            posY: 0,
            posX: 0,
            initial: false,
        });
        setInitialHover(false);
        setDropDown({});
    };

    //detect scroll position on main shop page
    useEffect(() => {
        setSolidNav(false);
    
        const fixedPaths = [
            '/groupproject/cart',
            '/groupproject/checkout',
            '/groupproject/checkout/confirm',
        ];
    
        const isFixedPath = fixedPaths.includes(location.pathname);
        const isSlugPath = /^\/groupproject\/product\/[^/]+$/.test(location.pathname);
    
        if (isFixedPath) {
            setSolidNav(true);
        } else if (isSlugPath) {
            window.onscroll = () => {
                if (window.pageYOffset > 200) {
                    setSolidNav(true);
                } else {
                    setSolidNav(false);
                }
            };
            return () => {
                window.onscroll = null;
            };
        } else if (Object.entries(params).length <= 0) {
            window.onscroll = () => {
                if (window.pageYOffset > 200) {
                    setSolidNav(true);
                } else {
                    setSolidNav(false);
                }
            };
            return () => {
                window.onscroll = null;
            };
        } else {
            setSolidNav(true);
        }
    }, [location.pathname, params]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, accessoriesRes] = await Promise.all([
                    getAllCategory(),
                    getAllCategoryOfAccessories(),
                ]);

                console.log(categoriesRes.metadata);
                setSubCate(categoriesRes.metadata);

                console.log(accessoriesRes.metadata);
                setSubCateAccessories(accessoriesRes.metadata);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    const categoryList = [
        {
            category: 'Motors',
            subCategories: subCate,
            promo: {
                title: 'Motor',
                image: 'https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2017/04/BMW-HP4-Race-18-scaled.jpg?fit=2560%2C1707&ssl=1',
            },
        },
        {
            category: 'Accessories',
            subCategories: subCateAccessories,
            promo: {
                title: 'Accessories',
                image: 'https://rparts-sites.s3.amazonaws.com/23908d49235005b9c1c9e417b84fee8e/design/main-slider/f900gs.webp',
            },
        },
    ];
    //create a list of the nav links needed from the navData list
    //assigns each link its subcategory and option data
    const mainNavLinks = categoryList.map((listItem, i) => (
        <li
            key={i}
            ref={navRefs.current[i]}
            onClick={() =>
                navigate(
                    `category/${listItem.category
                        .toLocaleLowerCase()
                        .replace(/\s/g, '-')}`
                )
            }
            onMouseEnter={() =>
                handleEnter(navRefs.current[i].current, listItem)
            }
        >
            {listItem.category}
        </li>
    ));

    return (
        <>
            <NavSideMenu
                showSideMenu={showSideMenu}
                setShowSideMenu={setShowSideMenu}
                navList={navList}
            />
            <DropDown dropDown={dropDown} handleLeave={handleLeave} />
            <StyledNav
                persist={dropDown.category ? true : false}
                onMouseLeave={handleLeaveNav}
                solidNav={solidNav}
            >
                <Indicator setting={indicator} />
                <ul className="navLeft">
                    <div className="navLogo">
                        <TeslaLogo onClick={() => navigate('/groupproject')} />
                    </div>
                    <hr />
                    <li
                        ref={shopRef}
                        className="navHoverEffect"
                        onClick={() => navigate('/groupproject')}
                        onMouseEnter={() => handleEnter(shopRef.current)}
                    >
                        Shop
                    </li>
                </ul>
                <ul className="navCenter">
                    {mainNavLinks}
                    {/* <li
                        onClick={() =>
                            navigate(
                                `category/charging`
                            )
                        }
                        // onMouseEnter={() =>
                        //     handleEnter(navRefs.current[i].current, listItem)
                        // }
                    >
                        Motor
                    </li>
                    <li
                        onClick={() =>
                            navigate(
                                `category/charging`
                            )
                        }
                        // onMouseEnter={() =>
                        //     handleEnter(navRefs.current[i].current, listItem)
                        // }
                    >
                        Accessories
                    </li> */}
                </ul>
                <ul className="navRight">
                    <li
                        className="navSearchBarLi"
                        onMouseEnter={handleSearchHover}
                    >
                        <SearchBar />
                    </li>
                    <li onClick={() => navigate('cart')}>
                        <CartBtn />
                    </li>
                    <li
                        ref={menuRef}
                        className="navHoverEffect"
                        onMouseEnter={() => handleEnter(menuRef.current)}
                        onClick={() => setShowSideMenu(!showSideMenu)}
                    >
                        Menu
                    </li>
                </ul>
            </StyledNav>
        </>
    );
}
