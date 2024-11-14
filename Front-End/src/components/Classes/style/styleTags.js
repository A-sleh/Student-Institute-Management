import styled from 'styled-components'

export const TeacherTagsContainer = styled.div`
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 5px;
    font-weight: 400;
    cursor: pointer;
    background-color: #ffffff;
    transition: .3s;

    & span:first-child {
        font-weight: 600 ; 
        color: #066599;
        transition: .3s;
    }

    &:hover {
        background-color: #066599;
        color: white;
    }
    
    &:hover span:first-child {
        color: white;
    }

`