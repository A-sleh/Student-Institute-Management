
import styled, { keyframes } from "styled-components"

// form tages style 

export const SubmitBtnStyle = styled.button`
    padding: 4px 25px;
    background-color: #066599;
    width: fit-content;
    border: none;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 15px; // arabic
    border-radius: 3px;
    margin-top: 10px;
    font-weight: 600;
    letter-spacing: 1px; // arabic
    color: white;
    transition: .4s;

    &:hover {
        background-color: white;
        color: #066599;
        box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.438);
    }
`

export const SmallButtonStyle = styled.button`
    padding: 2px 6px;
    font-size: 15px; // arabic
    outline: none;
    border: none;
    color: white;
    background-color: ${ ({$color}) => $color };
    border-radius: 2px;
    margin-left: 5px;
    cursor: pointer;
`

export const GoBackBtnStyle = styled.span`

    font-size: 15px !important; // arabic
    padding: 4px 25px;
    width: fit-content;
    line-height: 1em; // arabic
    border: none;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    font-weight: 500;
    color: white;
    transition: .4s;
    background-color: red;

    &:hover {
        background-color: white;
        box-shadow: 0 0 6px -1px rgba(0, 0, 0, 0.438);
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
    margin-bottom: 8px;

    @media (max-width: 767px ) {
        flex-direction: column;
    }
`

export const FormSubRowStyle = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 4px;
    flex-direction: column;
    width: ${({width}) => width || '50%' };

    @media (max-width: 767px ) {
        width: 100%;
    }
`

export const LabelStyle = styled.label`
    font-weight: 600;
    margin-bottom: 8px; // for arabic
    color: ${({color}) => color};
`

export const FormStyle = styled.form`
    flex: 1;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #f3f1f1d7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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
    background-color: ${({color}) => color};
    padding: 4px;
    flex: 1;

    section {
        display: flex;
        flex-direction: column;

        label { 
            margin-left: 5px;
        }

        input , label {
            cursor: pointer;
            color: #056699;
            font-weight: 600;
        }

        div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;


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
    width: 300px;
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
        padding-right: 10px;
        overflow: hidden;
        border-radius: 10px;
        background-color: white;
        
        h3 {
            color: #066599;
            margin-bottom: 5px;
            width: 100%;
            /* text-wrap: nowrap; */

            span {
                margin-bottom: 5px;
                text-transform: capitalize;
                color: black;
                font-weight: 600;
                font-size: 16px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-wrap: wrap;
                word-wrap: break-word;
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
    transform: ${({$transformValue}) => $transformValue };

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
const fullWidthFrame = keyframes`
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
    animation: ${fullWidthFrame} 2s  ease-in-out  ;
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

export const HeaderInformationStyle = styled.div`
    background-color : #f3f1f1d7 ;
    border-radius: 5px ;
    padding: 10px ;
    margin: 10px 0;
    
    section {
        direction: ltr;
        display: grid;
        grid-template-columns: ${ ({$columnNumber}) => `repeat(${$columnNumber},auto)` };
        gap: 10px;
        padding: 10px 8px;
        border-radius: 5px;

        .info-container {
            justify-content: space-between;
            position: relative;
            border-color: transparent;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            border-radius: 10px;
            overflow: hidden;
            background-color: #ffffff;
            text-align: center;

            i {
                font-size: 2em;
            }

            .border-left {
                position: absolute;
                width: 7px;
                height: 100%;
                left: 0;
                top: 0;
            }
            main {
                text-align: center;

                h4 {
                    font-size: 15px;
                    color: rgb(160, 159, 159);
                    font-weight: 400;
                    margin-bottom: 5px;
                }

                span {
                    font-size: 1em;
                    font-weight: 500;
                }
            }
        }
    }

    @media (max-width : 991px) {
        & section {
            grid-template-columns: auto auto;
        }
    }

    @media (max-width : 767px) {
        & section {
            grid-template-columns: auto;
        }
    }

`

// global style 

export const FlexSpaceBetweenContainerStyle = styled.div`
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    display: flex;
    position: relative;

    h3 {
        color: #056699 ;
        font-weight: 600;
    }
`

export const FlexContainerStyle = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 30px;

    @media (max-width: 767px ) {
        & {
            flex-direction: column;
        }
    }
`
export const InformationsCardStyle = styled.div`
    padding: 15px 8px;
    border-radius: 0px 0px 5px 5px;
    gap: 4px;
    background: rgba(243, 241, 241, 0.843);

    & div {
        display: flex;
        align-items: center;
        gap: 1.3em;
        background-color: white;
        padding: 4px 8px;

        h4 {
            color: rgb(6, 101, 153);
            font-size: 1em;

            span {
                font-size: 0.8em;
                color: black;
                margin-left: 1px;
            }
        }
    }

    @media (max-width : 540px ) {
        & div h4 { 
            display: grid;
        }
    }

    @media (max-width : 767px ) {
        & {
            display: grid ;
            grid-template-columns: auto auto;
        }
    }

`

// FilterGradeHeader 
export const FilterGradeHeaderStyle = styled.div`
    width: 100%;
    padding: 6px 15px;
    color: white;
    background-color: rgb(6, 101, 153);
    border-radius: 5px 5px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`

export const HeaderFilterTestsStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 10px;
    background-color: rgb(221, 221, 221);
    padding: 4px 10px;
    border-radius: 4px;
    margin-bottom: 10px;

    h1 {
        text-wrap: nowrap;
    }

    @media (max-width: 767px ) {
        & {
            grid-template-columns: repeat(1,1fr);
        }
    }

    @media (max-width: 1021px ) {
        & {
            grid-template-columns: repeat(2,1fr);
        }
    }
`

// More information page animation 

const ChangeHeight = keyframes`
    100%{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
`

export const HeightContainerAnimation = styled.div`

    display: grid;
    grid-template-columns: 0fr;
    grid-template-rows: 0fr;
    transition: .3s;
    animation: ${ChangeHeight} .6s ${({$delay}) => $delay} ease-in-out ;
    animation-fill-mode: forwards;
    
    & > div {
        overflow: hidden !important;
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



 