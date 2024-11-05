
import styled, { keyframes } from "styled-components"

// form tages style 

export const SubmitBtnStyle = styled.button`
    padding: 4px 25px;
    background-color: #066599;
    border: none;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    font-weight: 500;
    color: white;
    transition: .4s;

    &:hover {
        background-color: white;
        color: #066599;
        box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.438);
    }
`

export const GoBackBtnStyle = styled(SubmitBtnStyle)`
    background-color: red;

    &:hover {
        color: red;
    }
`

export const FormMainContainer = styled.section`
    display: flex;
    justify-content: space-around;
    gap: 10px;
    margin-top: 30px;

    @media (max-width: 767px ) {
        flex-direction: column;
    }
`

export const FormRowStyle = styled.div`
    display: flex;
    gap: 10px ;
    margin-bottom: 6px;

    @media (max-width: 767px ) {
        flex-direction: column;
    }
`

export const FormSubRowStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${({width}) => width || '50%' };

    @media (max-width: 767px ) {
        width: 100%;
    }
`

export const LabelStyle = styled.label`
    font-weight: 600;
    color: ${({color}) => color};
`

export const FormStyle = styled.form`
    flex: 1;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f3f1f1d7;

    h3 {
        margin-bottom: 10px;
        color: #0e0b0b;
        font-size: 1.3em;
    }

`

export const TextAreaInputStyle = styled.textarea`
    padding: 8px 15px;
    width: 100%;
    border: none;
    border-bottom: 1px solid transparent;
    background-color: #dddddd85;
    box-shadow: 0 0 10px -5px gray inset;
    outline: none;
    resize: none;
`

export const ErrorMessageStyle = styled.span`
    margin-top: 4px;
    font-size: 11px;
    color: red;
`

export const FormSelectdStyle = styled.select`
    padding: 8px 15px;
    border: none;
    border-bottom: 1px solid transparent;
    background-color: #dddddd85;
    box-shadow: 0 0 10px -5px gray inset;
    outline: none;

    &.error {
        border-bottom: 1px solid red;
    }
`
export const FormCheckBoxContainerStyle = styled.div`
    display: flex;
    gap: 2em;

    section {
        display: flex;
        flex-direction: column;

        label { 
            margin-left: 5px;
        }

        input , label {
            cursor: pointer;
        }

        div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 5px 0;

            & div:last-child {
                margin-left: 10px;
            }
        }
    }
`
export const FormRadioContainerStyle = styled.div`
    display: flex;
    align-items: flex-end;
    padding: 10px 0;
    
    input [type="radio"] {
        cursor: pointer;
        line-height: 1;
    }

    label {
        line-height: 0.8;
        cursor: pointer;
        margin-left: 5px;
        margin-right: 10px;
    }
`

export const ButtonsContainerStyle = styled.div`
    display: flex;
    gap: 5px;

`

// show input card style

export const ShowCardContainerStyle = styled.div`
    border-radius: 5px;
    padding: 20px 15px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    min-width: 280px;
    background-color: #f3f1f1d7;

    i {
        font-size: 200px;
        color: rgba(128, 128, 128, 0.623);
        line-height: 150px;
        margin-bottom: 20px;
        align-self: center;
    }
    main {
        padding: 15px;
        padding-right: 0;
        overflow: hidden;
        border-radius: 10px;
        text-wrap: nowrap;
        background-color: white;
    

        h3 {
            color: #066599;
            margin-bottom: 5px;
            width: 100%;

            span {
                margin-bottom: 5px;
                text-transform: capitalize;
                color: black;
                font-weight: 600;
                font-size: 16px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
        }
    }

    @media (max-width: 767px ) {
        & {
            display: none;
        }
    }
`

// SearchBodyList

export const SearchBodyListStyle = styled.div`
    padding: 10px 5px;
    background-color: white !important;
    margin-top: 2px;
    border-radius: 2px;
    flex-direction: column;
    position: absolute;
    display: flex;
    top: calc(100% + 5px);
    border-radius: 10px;
    width: 100%;
    transform-origin: top;
    transition: .3s;
    z-index: 100;
    transform: ${({transformValue}) => transformValue };

    span {
        font-weight: 500;
        font-size: 16px;
        padding: 8px;
        cursor: pointer;

        &:nth-child(even) {
            background-color: #eee;
        }
    }
`

// Sub NavBar Section 

const MoveCircleToRight = keyframes`
    100% {
        right: 10px;
        background-color: white;
    }
`
const MoveCircleToLeft = keyframes`
    100% {
        left: 10px;
        background-color: white;
    }
`
const fullWidth = keyframes`
    100% {
        width: 100%;
        height: fit-content;
    }
`
const ShowText = keyframes`
    100% {
        opacity: 1;
    }
`

export const HeaderNavStyle = styled.ul`
    display: flex;
    position: relative;
    gap: 30px;
    list-style: none;
    align-items: center;
    justify-content: center;
    background-color: rgb(6, 101, 153);
    padding: 5px 10px;
    border-radius: 2px;
    transition: all .4s;
    width: 0;
    margin: auto;
    margin-bottom: 10px;
    animation: ${fullWidth} 2s  ease-in-out  ;
    animation-fill-mode: forwards;
    height: 35px;
    
    ol {
        display: flex ;
        gap: 30px ;
        list-style: none ;
        justify-content: center;
    }


    & li  {
        opacity: 0;
        animation:  ${ShowText} 1s 1s ease-in-out ;
        animation-fill-mode: forwards;
    }

    span:last-of-type {
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgb(6, 101, 153);
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        left: -18px;
        animation: ${MoveCircleToLeft} 1s 1.4s ease-in-out ;
        animation-fill-mode: forwards;
    }
    span:first-of-type {  
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgb(6, 101, 153);
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        right: -18px;
        animation: ${MoveCircleToRight} 1s 1.4s ease-in-out ;
        animation-fill-mode: forwards;
    }

    @media (max-width : 500px ) {
        ol {
            flex-direction: column;
            gap: 0px;
            text-align: center;
        }
    }

`

export const InputStyle = styled.input.attrs( ({type}) => ({
    type : type
}))`
    padding: 8px 15px;
    border: none;
    border-bottom: 1px solid transparent;
    background-color: #dddddd85;
    min-width: 250px;
    box-shadow: 0 0 10px -5px gray inset;
    outline: none;
    &.error {
        border-bottom: 1px solid red;
    }

    @media (max-width : 767px ) {
        & {
            width: 100%;
        }
    }
`



 