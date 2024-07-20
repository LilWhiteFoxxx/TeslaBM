import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchBtn } from "../../Assets/images/search.svg";
import { StyledSearchBar } from "./NavStyledComponents";
// import styled from "styled-components";

export default function SearchBar({ initialActive }) {
  const searchInput = useRef();
  const [searchActive, setSearchActive] = useState(
    initialActive ? initialActive : false
  );
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchActive(true);
    searchInput.current.focus();
  };
  const handleInputBlur = () => {
    setSearchActive(false);
  };
  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      navigate(`search/${inputValue}`);
      setSearchActive(false);
      setInputValue("");
      document.activeElement.blur();
    }
  };
  return (
    <StyledSearchBar active={searchActive}>
      <input
        type='text'
        ref={searchInput}
        onBlur={handleInputBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => handleSubmit(e)}
      ></input>
      <button>
        <SearchBtn onClick={handleSearchClick} />
      </button>
    </StyledSearchBar>
  );
}
