
import styled from 'styled-components'

export const HeaderFilterByClassStyle = styled.div`
    position: relative ; 
    width: 300px;

    h3 {
        position: absolute;
        color: black;
        font-weight: 500 ;
        top : -15px;
        left: 8px ;
        font-size: 15px ;
        background-color: white ;
        padding: 0px 5px ;
        border-radius: 5px
    }

    select {
        padding: 10px;
        border-radius: 5px;
        background-color: #ddd ;
        border: none ;
        outline: none;
        color: #066599;
        font-weight: 400 ;
        min-width: 100%;

        option {
            padding: 20px;
            color: black ;
        }
    }

    @media (max-width: 767px) {
        & {
            width: 100%;
            margin-top: 20px;
        }
    }
`

export const ShowClassBalanceHeaderStyle = styled.div`
    padding: 12px 5px 5px 5px ;
    position: relative ;
    background-color: #ddd ;
    border-radius: 5px ;
    padding-bottom: 5px;
    display: grid ;
    gap: 10px ;
    grid-template-columns: auto auto auto ;

    div {
        position: relative ;
        padding: 5px ;
        border-radius: 3px ;
        background-color: white ;
        min-width: 10em ;

        span {
            position: absolute;
            color: #066599 ;
            right: 0;
            bottom: 50% ;
            font-weight: 600 ;
            background-color: white ;
            padding: 0px 3px 0 3px ;
            border-radius: 5px;
        }
        
        p {
            font-size: 14px;
            font-weight: bold;
        }
    }

    @media (max-width: 767px ) {
        & {
            width: 100%;
            margin-top: 10px;
        }
    }
`