
import styled from 'styled-components'

export const SelectorStyle = styled.select`
    border: none ;
    outline: none ;
    font-weight: 600 ;
    padding: 8px ;
    border-radius: 5px ;
    width: 100%;
    display: block;
    margin-bottom: 10px;
    margin-left: auto;
    color: white ; 
    background-color: #056699 ;
    cursor: pointer;
`

export const InputStatisticsStyle  = styled.input.attrs( ({type}) => ({
    type : type
}))`
    border: none ;
    outline: none ;
    font-weight: 600 ;
    padding: 8px ;
    border-radius: 5px ;
    width: 100%;
    display: block;
    margin-bottom: 10px;
    margin-left: auto;
    color: white ; 
    background-color: #056699 ;
    cursor: pointer;
    flex: 1
`

export const BackgroundLayoutStyle = styled.div`
    border-radius: 8px;
    background-color: white;
`

export const HiddenCopyRightLinkStyle = styled.div`
    a {
        display: none !important;
    }
`