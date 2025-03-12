
import styled from 'styled-components'

export const SideBarContainerStyle = styled.div`
    min-height: 100vh;
    background: #056699;
    padding-left: 5px;
    overflow: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    position: sticky;
    top: 0;

    > i {
        color: white ;
        float: ${({$lang}) => $lang == 'arabic' ? 'left': 'right'};
        margin:  10px;
    }
    @media (max-width: 767px ) {
        > i {
            display: none;
        }

        & {
            overflow: visible;
            overflow-x: visible;
        }
    }
`

export const SideBarListStyle = styled.ul`
    position: absolute;
    list-style: none;
    margin-left: ${ ({$language}) => $language == 'arabic' ? '0px' : '0px'};
    margin-right: ${ ({$language}) => $language == 'arabic' ? '8px' : '0'};
    top: 10%;
    width: 99%;
    

    & .list , & .main-list , & .list a {
        position: relative;
        padding: 9px 0px;
        display: flex;
        border-radius:  ${ ({$language}) => $language == 'arabic' ? '0px 30px 30px 0px' : '30px 0px 0px 30px'};
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
            border-bottom-right-radius:  ${ ({$language}) => $language != 'arabic' ? '25px' : '0'};
            border-bottom-left-radius:  ${ ({$language}) => $language == 'arabic' ? '25px' : '0'};
            margin-right:  ${ ({$language}) => $language == 'arabic' ? '-5px' : '0'};
            background-color: #056699;
        }

        & b:nth-child(2)::before {
            content: '';
            position: absolute;
            width: 100%;
            bottom: -20%;
            height: 12px;
            border-top-right-radius:  ${ ({$language}) => $language != 'arabic' ? '25px' : '0'};
            border-top-left-radius:  ${ ({$language}) => $language == 'arabic' ? '25px' : '0'};
            margin-right:  ${ ({$language}) => $language == 'arabic' ? '-5px' : '0'};
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
                border-bottom-left-radius:  ${ ({$language}) => $language == 'arabic' ? '25px' : '0'};
                border-bottom-right-radius:  ${ ({$language}) => $language != 'arabic' ? '25px' : '0'};
                margin-right:  ${ ({$language}) => $language == 'arabic' ? '-5px' : '0px'};
                background-color: #056699;
            }
            & b:nth-child(2)::before {
                content: '';
                position: absolute;
                width: 100%;
                bottom: -20%;
                height: 12px;
                border-top-left-radius:  ${ ({$language}) => $language == 'arabic' ? '25px' : '0'};
                border-top-right-radius:  ${ ({$language}) => $language != 'arabic' ? '25px' : '0'};
                margin-right:  ${ ({$language}) => $language == 'arabic' ? '-5px' : '0'};
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
    margin-left: ${ ({$language}) => $language == 'arabic' ? '0px' : '8px'};
    margin-right: ${ ({$language}) => $language == 'arabic' ? '8px' : '0'};
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
    width: ${ ({$opensidebare}) => $opensidebare == 'true' ? "250px" : "54px"};
    transition: 0.5s ;
    z-index: 90000;
    

    & .fa-xmark {
        width: 30px ;
        height: 30px; 
        font-size: 18px;
        padding-top: 5px;
        padding-right: ${({$lang}) => $lang == 'arabic' ? '5px' : 'none' } ;;
        padding-left: ${({$lang}) => $lang != 'arabic' ? '5px' : 'none' } ;;
        position: absolute;
        z-index: 1000;
        top: 1.5em;
        left: ${({$lang}) => $lang == 'arabic' ? '-40px' : 'none' } ;
        right: ${({$lang}) => $lang != 'arabic' ? '-40px' : 'none' } ;
        border-radius: ${({$lang}) => $lang == 'arabic' ? "8px 0 0 8px" : "0 8px 8px 0" };
        cursor: pointer;
        background-color: #056699;
        display: none;
    }

    @media (max-width : 767px ) {
        position: fixed;
        width: 250px; 
        height: 100vh !important;
        transform: ${ ({$opensidebare}) => $opensidebare == 'true' ?' translateX(0)': ({$lang}) => $lang == 'arabic' ? 'translateX(100%)' : 'translateX(-100%)'};

        & .fa-xmark {
            display: flex;
        }
    }


`