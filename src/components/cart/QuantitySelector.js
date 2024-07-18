import React, { useEffect, useState } from "react";
import arrow from "../../Assets/images/arrow.svg";
import checkMark from "../../Assets/images/checkMark.svg";
import { StyledOption, StyledSelector } from "./CartStyledComponents";

const QuantitySelector = ({ handleSelect, itemQty }) => {
  const [dropDown, setDropDown] = useState(false);
  const maxQty = 20;

  let options = [...Array(maxQty)].map((el, index) => (
    <StyledOption
      key={index}
      selected={index + 1 === itemQty}
      onClick={() => {
        handleSelect(index + 1);
        setDropDown(false);
      }}
    >
      {index + 1} <img src={checkMark} alt='' />
    </StyledOption>
  ));

  useEffect(() => {
    if (dropDown) {
      window.addEventListener("mouseup", () => setDropDown(false));
    } else {
      window.removeEventListener("mouseup", () => setDropDown(false));
    }
  }, [dropDown]);

  return (
    <StyledSelector maxQty={maxQty} dropDown={dropDown}>
      <button
        onClick={() => setDropDown(!dropDown)}
        onBlur={() => setDropDown(false)}
      >
        <p>{itemQty}</p>
        <img src={arrow} alt='' />
      </button>
      <ol
        className={
          dropDown
            ? `selector-drop-down selector-drop-down-reveal`
            : `selector-drop-down`
        }
      >
        {options}
      </ol>
    </StyledSelector>
  );
};

export default QuantitySelector;
