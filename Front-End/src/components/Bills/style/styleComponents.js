
import {SubmitBtnStyle} from '../../shared/style/styleTag'
import styled from 'styled-components'

export const SearchButtonStyle = styled(SubmitBtnStyle)`
    padding: 3px 20px ;
    border-radius: 2.4px;
    display: block;
    margin-bottom: 10px;
    margin-left: auto;
    font-weight: 400;
`
export const CloseButtonStyle = styled(SearchButtonStyle)`
    background-color: red;

    &:hover {
        color: red ;
    }
`

export const HeaderFilterByClassStyle = styled.div`
    position: relative ; 
    width: 300px;

    h3 {
        position: absolute;
        color: black;
        font-weight: 500 ;
        top : -16px;
        right: 15px ;
        font-size: 15px ;
        background-color: white ;
        padding: 0  8px 3px 8px ;
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
        direction: ltr;

        span:first-child {
            position: absolute;
            color: #066599 ;
            right: 0;
            bottom: 60% ;
            font-weight: 600 ;
            background-color: white ;
            padding: 0px 3px 0 3px ;
            font-size: 14px;
            border-radius: 5px;
        }
        
        p {
            font-size: 14px;
            font-weight: bold;
            text-align: left;
        }
    }

    @media (max-width: 767px ) {
        & {
            width: 100%;
            margin-top: 10px;
        }
    }
`

export const BillsContainerStyle = styled.div`
    margin-bottom: 20px; 
    display: flex; 
    flex-direction: column ; 
    
    .bill-body {
        background-color: rgba(243,241, 241, 0.843);
        padding: 20px 10px 10px;
        border-radius: 10px;
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 10px;        
    }
`   

export const BillCardStyle = styled.section`
    display: flex ;
    flex-direction: column ;
    gap: 20px ;
    background-color: white !important;
    padding: 10px ;
    border-radius: 5px ;

    section {
        display: flex ;
        justify-content: space-between;
        align-items: center;
    }

    footer {
        background-color: #f3f1f1d7 ;
        padding: 10px ;
        border-radius: 5px ;
        font-weight: 500
    }
    

`

export const BillStatisticesContainerStyle = styled.div`

    h1 {
        margin: 0 ; 
        font-size : 20px ;
    }

    .bills {
        display: flex ;
        flex-direction: column ;
        gap: 5px ;
        overflow: hidden ;
        background-color: #ddd ;
        padding: 5px;
        width: 300px;
    }

    @media (max-width : 767px ) {
        & .bills {
            width: 100%;
        }
    }
`

export const LatestBillsContainerStyle = styled.div`
    margin-bottom: 20px ;

    h1 {
        font-size: 20px;

        span {
            color: #056699 ;
        }
    }

    main {
        border-radius: 5px;
        background-color: #ddd ;
        overflow: hidden;

        div.bill-container-cards {
            padding: 10px;
            gap: 10px;            
            display: grid ;
            grid-template-columns: repeat(auto-fill,minmax(300px,1fr)) 
        }

        button {
            width: 100% ;
            border: none ;
            padding: 10px ;
            background-color: #066599 ;
            font-weight: 400;
            color: white ;
            font-size: 1.2em ;
            cursor: pointer
        }
    }
`

export const AllBillDetailsStyle = styled.div`
    display: flex;
    gap: 10px;
    position: relative;

    @media (max-width : 767px ) {
        & {
            flex-direction: column-reverse;
        }
    }

`