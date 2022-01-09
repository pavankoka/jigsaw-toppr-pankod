import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
    background: #1d1d1d;
    color: #f6f4f1;
    position: relative;
    width: 100%;
    min-width: 300px;
    border: none;
    padding: 12px 20px;
    border-radius: 5px;

    &:focus {
        outline: none;
        border: none;
    }
`;

const PlaceHolderWrapper = styled.p`
    position: absolute;
    font-size: 16px;
    width: fit-content;
    color: ${props => (props.isFocus ? "#1d1d1d" : "#f6f4f1")};
    left: ${props => (props.isFocus ? "0" : "20px")};
    top: ${props => (props.isFocus ? "-5px" : "50%")};
    transform: translate(${props => (props.isFocus ? "0, -100%" : "0, -50%")});
    transition: all 250ms ease-in;
`;

function Input(props) {
    const {
        isEditable = true,
        focus,
        type = "text",
        className,
        value,
        styles,
        inputStyles = {},
        placeholderStyles = {},
        placeholder,
        onChange,
        onEnter,
    } = props;
    const [isFocus, setIsFocus] = useState(focus);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        window.addEventListener("click", handleClick);

        return () => window.removeEventListener("click", handleClick);
    }, []);

    function handleClick(e) {
        if (wrapperRef && wrapperRef.current && e.target) {
            const isClickedInside = wrapperRef.current.contains(e.target);

            setIsFocus(isClickedInside);
            if (isClickedInside) {
                inputRef.current.focus();
            }
        }
    }

    return (
        <div
            className={className}
            style={{ position: "relative", height: "48px", ...styles }}
            ref={wrapperRef}
        >
            <InputWrapper
                ref={inputRef}
                type={type}
                value={value}
                className={`bg-f2f2f2 ${!isEditable ? "button--disabled" : ""}`}
                style={{
                    caretColor: !isEditable ? "transparent" : "",
                    ...inputStyles,
                }}
                onChange={e =>
                    isEditable &&
                    onChange &&
                    onChange({ value: e.target.value })
                }
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        onEnter && onEnter();
                    }
                }}
            />
            <PlaceHolderWrapper
                isFocus={value || isFocus}
                placeholderStyles={placeholderStyles}
            >
                {placeholder}
            </PlaceHolderWrapper>
        </div>
    );
}

export default Input;
