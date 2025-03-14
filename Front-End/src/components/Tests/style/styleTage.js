
import styled from 'styled-components'

export const ReportsContainerStyle = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: auto auto;
    background-color: white;
    padding: 10px;

    @media (max-width : 767px ) {
        grid-template-columns: auto ;
    }

`

export const TestHeaderSelectionStyle = styled.div`
    
    padding: 8px 10px 6px 10px;
    font-weight: 300;
    background-color: #056699 ;
    color: white;
    direction: ltr;
    width: 100%;

    section {
        float: right; 
        display: flex;
        justify-content: space-between;
        cursor: pointer;

        & span:last-child {
            margin-left: 10px;
        }
    }
`
export const QuizExamContainerStyle = styled.div`
    display: flex;
    gap: 10px;
    background-color: rgba(243, 241, 241, 0.843);
    border-radius: 10px;
    margin-top: 10px;
    

    @media (max-width : 1167px ) {
        flex-direction: column;
        padding: 0;
    }

`

export const NavigateSubHeaderStyle = styled.div`
    background-color: rgb(6, 101, 153);
    padding: 15px 10px 5px;
    text-align: left;
    line-height: 1.7em; // arabic
    color: white;
    font-size: 1.5em; // arbic
    margin-bottom: 10px;
`

export const ReportTestsContainerStyle = styled.div`
    display: flex;
    border-radius: 3px;
    gap: 10px;

    section {
        border-radius: 3px;
        padding: 10px;
        background-color: rgba(243, 241, 241, 0.843);
        flex: 1 1 0%;

        main {
            display: grid;
            grid-template-columns: repeat(2, auto);
            gap: 10px;
        }
    }

    @media (max-width : 767px ) {
        & {
            flex-direction: column;
        }
        & section main {
            grid-template-columns: auto;
        }
    }
`
export const StudentTestsContainerStyle = styled.div`
    display: flex;
    gap: 10px;
    background-color: rgba(243, 241, 241, 0.843);
    padding: 20px 10px 10px;
    border-radius: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
    div {
        flex : 1
    }
`