
import styled from 'styled-components'

export const SideBarContainerStyle = styled.div`
    min-height: 100vh;
    position: relative;
    background: #056699;
    overflow: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    position: sticky;
    top: 0;
`

export const SideBarListStyle = styled.ul`
    position: absolute;
    list-style: none;
    padding-left: 8px;
    top: 10%;
    width: 100%;

    & .list , & .main-list , & .list a {
        position: relative;
        padding: 9px 0px;
        display: flex;
        border-radius: 30px 0px 0px 30px;
        font-weight: 400;
        color: white;
        cursor: pointer;
        text-decoration: none;
        width: 100%;
    }

    & i {
        position: relative;
        font-size: 14px;
        line-height: 25px;
        margin: 0 15px;
        pointer-events: none;
    }

    & li.list i {
        font-size: 16px !important;
    }

    & .linkTitle {
        position: relative;
        font-size: 14px;
        line-height: 25px;
        text-decoration: none;
        letter-spacing: 0.5px;
        color: white;
        pointer-events: none;
        text-wrap: nowrap;
        margin-left: 5px;
    }



    & .list a.active {
        font-weight: 600;
        background-color: white;
        color: black; 

        & .linkTitle {
            color: black;
        }

        & b:nth-child(1)::before {
            content: '';
            position: absolute;
            width: 100%;
            top: -20%;
            height: 12px;
            border-bottom-right-radius: 25px;
            background-color: #056699;
        }

        & b:nth-child(2)::before {
            content: '';
            position: absolute;
            width: 100%;
            bottom: -20%;
            height: 12px;
            border-top-right-radius: 25px;
            background-color: #056699;
        }

        & b:nth-child(1) {
            background-color: rgb(255, 255, 255);
            position: absolute;
            width: 100%;
            top: -20%;
            height: 10px;
        }
        & b:nth-child(2) {
            background-color: rgb(255, 255, 255);
            position: absolute;
            width: 100%;
            bottom: -20%;
            height: 10px;
            transition: 0;
        }
        & .down-arrow {
            color: white;
        }
    }

    .main-list {

         .down-arrow  {
            color: white;
        }

        &.active , & + ul .list.active , &:has(+ ul .list.active )   {
            font-weight: 600;
            background-color: white ;
            color: black;

            & .linkTitle {
                color: black;
            }

            & b:nth-child(1) {
                background-color: rgb(255, 255, 255);
                position: absolute;
                width: 100%;
                top: -20%;
                height: 10px;
            }

            & b:nth-child(2) {
                background-color: rgb(255, 255, 255);
                position: absolute;
                width: 100%;
                bottom: -20%;
                height: 10px;
                transition: 0;
            }
            & b:nth-child(1)::before {
                content: '';
                position: absolute;
                width: 100%;
                top: -20%;
                height: 12px;
                border-bottom-right-radius: 25px;
                background-color: #056699;
            }
            & b:nth-child(2)::before {
                content: '';
                position: absolute;
                width: 100%;
                bottom: -20%;
                height: 12px;
                border-top-right-radius: 25px;
                background-color: #056699;

            }
        }

        &.active + ul , &:has(+ ul .list.active ) + ul {
            height: 100%;
            margin-top: 12px;
        }
    }
`

export const LinkContainerStyle = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-right: 10px;
`

export const SideBarSubListStyle = styled.ul`
    position: relative;
    margin-left: 8px;
    overflow: hidden;
    margin-top: 0px;
    margin-bottom: 10px;
    transform-origin: top;
    height: 0;
`

export const CloseBtnForMobileScreen = styled.i`
    font-size: 24px;
    color: white ;
    margin: 20px;
    cursor: pointer;
`

export const SideBarStyle = styled.aside`
    width: ${ ({opensidebare}) => opensidebare == 'true' ? "250px" : "56px"};
    transition: 0.5s ;
    z-index: 90000;

    & .fa-xmark {
        display: none ;
    }

    @media (max-width : 767px ) {
        position: absolute;
        width: 250px; 
        height: 100vh !important;
        transform: ${ ({opensidebare}) => !opensidebare == 'true' ?' translateX(0)': 'translateX(-100%)' };

        & .fa-xmark {
            display: ${ ({opensidebare}) => opensidebare == 'true' ? "none" : "flex"};
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 10000%;
            height: 100%;
            background-color: #0000008a;
            transform: ${ ({openSideBare}) => !openSideBare ?' translateX(0)': 'translateX(-10000%)' };
            transition: 0.5s ;
        }
    }


`