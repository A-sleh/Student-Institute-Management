import styled , {keyframes} from 'styled-components'

export const FormRowStyle = styled.div`
    display: flex;
    margin-bottom: 6px;
    width: 100%;
`
export const FormInputContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const TextAreaInput = styled.textarea`
    padding: 8px 15px;
    width: 100%;
    border: none;
    border-bottom: 1px solid transparent;
    background-color: #dddddd85;
    box-shadow: 0 0 10px -5px gray inset;
    outline: none;
    resize: none;
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

export const LabelInputStyle = styled.label`
    font-weight: 600;
    color: #066599;
`
export const TestCardBody = styled.main`
    padding: 15px;
    padding-right: 0;
    overflow: hidden;
    max-width: 240px;
    border-radius: 10px;
    text-wrap: nowrap;
    margin-top: 10px;
    background-color: #dddddd85;
`

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
    height: 35px;
    gap: 30px;
    list-style: none;
    align-items: center;
    justify-content: center;
    background-color: rgb(6, 101, 153);
    padding: 10px;
    border-radius: 2px;
    transition: all .4s;
    width: 0;
    margin: auto;
    margin-bottom: 10px;
    animation: ${fullWidth} 2s  ease-in-out  ;
    animation-fill-mode: forwards;
    
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

`



export const FormInputFieldStyle = styled.input.attrs( ({type}) =>({
    type 
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





