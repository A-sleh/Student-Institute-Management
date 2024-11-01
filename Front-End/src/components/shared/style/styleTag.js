
import styled from "styled-components"

// form tages style 

export const SubmitBtnStyle = styled.button`
    padding: 5px 35px;
    background-color: #066599;
    border: none;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 3px;
    margin-top: 10px;
    font-weight: bold;
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
    display: flex;
    flex-direction: column;
    height: 78px;
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

export const InputStyle = styled.input.attrs( ({type}) => ({
    type : type
}))`
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



 