
import styled, { keyframes }  from 'styled-components'

const titleFrame = keyframes`
    0% {
        opacity: 0.7;
        transform: translateY(5px);
    }
    100% {
        opacity: 1;
        transform: none;
    }
`
const titleLineFrame = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 4.2em;
    }
`
const titleCirclFrame = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

export const TitleStyle = styled.h2`
    position: relative;
    margin: 10px 0 18px 0 ;
    font-size: ${ ({language}) => language == 'arabic' ? '20px': '25px'};
    padding-bottom: ${ ({language}) => language == 'arabic' ? '6px': '3px'};
    animation: ${titleFrame} .5s ease-in;

    &::before {
        background-color:  #066599;
        content: '';
        position: absolute;
        height: 3px;
        width: 0;
        bottom: -5px;
        margin-bottom: 5px 0;
        border-radius: 5px;
        animation: ${titleLineFrame} .5s ease-in;
        animation-delay: .6s;
        animation-fill-mode: forwards;
    }
    &::after {
        content: '';
        position: absolute;
        width: 12px ; 
        height: 12px ;
        background-color: white;
        border-radius: 50% ;
        border: 2px solid #066599;
        bottom: -11px;
        right: ${({language}) => language == 'arabic' ? '-3px': '0'} ;
        left: ${({language}) => language != 'arabic' ? '-3px': '0'} ;
        animation: ${titleCirclFrame} .1s ease-in;
        animation-delay: .5s;
        animation-fill-mode: forwards;
        opacity: 0;
    }
`

export const NotificationStyle = styled.div`
    & {
        position: fixed;
        z-index: 30000;
        bottom: 20px;
        right: ${({language}) => language != 'arabic' ? '20px': 'none'} ;
        left: ${({language}) => language == 'arabic' ? '20px': 'none'} ;
        font-weight: 300  ;
        padding: 4px 10px ;
        color: white ;
        border-radius: 3px ;
        transform: scaleX(0);
        transform-origin: left ;
        transition: .4s;
    }

    &.success {
        background-color: #0ee90e3a;
        color:#0ee90e ;
    }
    &.error {
        background-color: rgba(233, 14, 14, 0.4);
        color: rgb(238, 20, 20);
    }
`
