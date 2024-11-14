
import styled from 'styled-components'

export const TableContainerStyle = styled.div`
    background-color: #f3f1f1d7;
    padding: 20px 10px 20px 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    overflow-x: auto;
    position: relative;
    flex: 1;

    @media (max-width: 767px ) {
        
        
    }
`

export const TableStyle = styled.table`

    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    text-align: center !important;

    thead {
        position: relative;
        top: -10px;

        th {
            background-color: white;
            border: none;
            text-transform: uppercase;
            color: rgb(6, 101, 153);
            font-weight: bold;
            text-wrap: nowrap;
            padding: ${ ({styleObj}) => styleObj.padding };
            font-size: ${ ({styleObj}) => styleObj.fontSize };

            span {
                margin-left: 5px
            }
        }
    }

    tbody {
        tr {

            border-bottom: 1px solid #f3f1f1d7;
            &:nth-child(odd) {
                background-color: ${ ({styleObj}) => styleObj.sameColor  ? 'white': '#f3f1f1d7'} ;
            }
            &:nth-child(even) {
                background-color: white ;
            }

            td {
                padding: ${ ({styleObj}) => styleObj.padding };
                font-size: ${ ({styleObj}) => styleObj.fontSize };
                margin: 5px 0px;
                text-align: center;
                border: none;
                padding-left: 10px;
                text-wrap: nowrap;
            }

            &:hover {
                background-color: #ddd;
            }
        }
    }
    
`

export const TableHeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;


    form {
        padding: 10px 0px;
        border-radius: 5px;
        background-color: rgb(221, 221, 221);
        display: flex;
        align-items: center;
        color: gray;
        width: ${({fullWidth}) => fullWidth ? '100%' : 'fit-content' };

        i {
            margin: 0px 10px;
            font-weight: bold;
        }

        input {
            background-color: transparent;
            border: none;
            outline: none   ;
            font-weight: 500;
            width: ${({fullWidth}) => fullWidth ? '100%' : 'fit-content' };
        }

        span {
            padding: 3px 20px;
            border: none;
            color: white;
            background-color: rgb(6, 101, 153);
            border-radius: 2.4px;
            margin-left: auto;
            margin-right: 6px;
        }
    }

    @media (max-width : 767px ) {
        & {
            flex-direction: column-reverse;
            gap: 10px ;
            width: 100% ;
            text-align: center;

            form {
                width: 100%;

                span {
                    margin-left: auto
                }
            }
        }
    }
`

export const SubHeaderTableStyle = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-right: 10px;

    span {
        font-weight: 500;
        font-size: 20px;
    }
`

export const TableControalSectionStyle = styled.div`
    width: 100%;
    margin: 20px 0;
    padding: 10px ;
    display: flex;
    justify-content: center;

    button {
        cursor: pointer;
        padding: 2px 20px;
        border: none;
        background-color: #2677a3;
        color: white;
        font-weight: 400;
        border-radius: 2px;
        margin: 0 10px;
    }

    div {
        padding: 2px 6px;
        margin: 0 5px;
        font-size: 18px;
        cursor: pointer;
    }

    span {
        font-weight: 600;
        margin: 0 5px;
    }
`