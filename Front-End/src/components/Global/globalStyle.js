import { ARABIC } from "../../Redux/actions/type";

export const theadThStyle = {
    color : '#2677a3' , backgroundColor: 'white' , fontSize : '14px' , position: 'relative' , top: '-5px', fontWeight : '600', padding: '5px 0'
}

export default function addSpaceBetweenDigit(number,language) {
    const convertNumberToSting = `${number}` ; 
    const numberLength = convertNumberToSting?.length
    let newNumber = ''

    for( let i = numberLength -  1  , threeSteps = 0 ; i >= 0 ; -- i  , threeSteps ++ ) {
        if( threeSteps == 3 ) {
            newNumber = ' ' + newNumber;
            threeSteps = 0 ;
        }
        newNumber = convertNumberToSting[i] + newNumber
    }

    if(language == ARABIC) {
        newNumber = newNumber.split(' ').reverse().join(' ');
    }
    return newNumber
}

export const DropDownSearch = {
    flexDirection: 'column' ,
    position: 'absolute',
    display: 'flex',
    top: 'calc(100% + 5px)',
    borderRadius: '10px',
    width: '100%',
    transformOrigin: 'top',
    transition: '.3s',
}