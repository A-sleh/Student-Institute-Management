
import styled from 'styled-components'

export const AdminLoginStyle = styled.form`

    display: flex;
    flex-direction: column;
    gap: 10px ;

    section {
        display: flex;
        gap: 10px
    }

    section div {
        display: flex;
        flex-direction: column;
        width: 100%;

        label {
            font-weight: 600;
            margin-bottom: 5px;
            color: #056699;
        }

        input {
            padding : 10px; 
            font-size: 17px;
            outline: none;
            border: none;
            background-color: #ddd;
            border-radius: 5px;
        }
    }
    
    input[type='submit'] {
        border-radius: 5px;
        font-size: 17px;
        padding : 10px; 
        font-weight: 600;
        background-color: #056699 ;
        color: white;
        outline: none;
        border: none;
        cursor: pointer;
        transition: .4s
    }

    input[type='submit']:hover {
        color: #056699;
        background-color:rgba(105, 136, 153, 0.29);
    } 

    input[type='submit'].logout {
        background-color: red
    }
    input[type='submit'].logout:hover {
        background-color:rgba(165, 39, 39, 0.29);
        color: red
    }

`