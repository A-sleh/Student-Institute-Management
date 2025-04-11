
import styled from 'styled-components'

export const TableContainerStyle = styled.div`
    background-color: #f3f1f1d7;
    padding: 20px 10px 20px 10px;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 15px;
    overflow-x: auto;
    position: relative;
    flex: 1;
`

export const TableStyle = styled.table`

    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    width: 100%;
    direction : ${ ({$language}) => $language == 'arabic' ? 'rtl': 'ltr'} ;
    text-align: center !important;
    &.class-full input[type='checkBox']:not(:checked) {
        pointer-events: none;
    }

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
            padding: ${ ({$styleObj}) => $styleObj.padding };
            font-size: ${ ({$styleObj}) => $styleObj.fontSize };

            span {
                margin-left: 5px
            }
        }
    }

    tbody {
        tr {
            cursor: pointer;
            border-bottom: 1px solid #f3f1f1d7;
            &:nth-child(odd) {
                background-color: ${ ({$styleObj}) => $styleObj.sameColor  ? 'white': '#f3f1f1d7'} ;
            }
            &:nth-child(even) {
                background-color: white ;
            }

            td {
                padding: ${ ({$styleObj}) => $styleObj.padding };
                font-size: ${ ({$styleObj}) => $styleObj.fontSize };
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

        i {
            margin: 0px 10px;
            font-weight: bold;
        }

        input {
            background-color: transparent;
            border: none;
            outline: none;
            font-weight: 500;
        }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
            display: none;
        }
        
        span {
            padding: 3px 20px;
            border: none;
            color: white;
            margin-right: 10px;
            background-color: rgb(6, 101, 153);
            border-radius: 2.4px;
            margin-left: 5px;
            
        }
        .delete-btn {
            padding: 4px 7px;
            background-color: red ;
            margin-right: 0px;
            font-size: 13px;
            line-height: 10px;
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