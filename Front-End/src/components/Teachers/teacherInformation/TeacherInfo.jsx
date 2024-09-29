import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices";

export default function TeacherInfo({teacherId}) {

    const [teacherDetails,setTeacherDetails] = useState({}) ;
    const [totalAmount,setTotalAmount] = useState(0)
    const [paidAmout,setPaidAmout] = useState(0) ;
    const [remainingAmout,setRemainingAmout] = useState(0)
    
    function handlePaidAndRemainingAmount(totalAmount) {

        const remaining = totalAmount - paidAmout ; 
        addSpacesBetweenDigits(remaining,setRemainingAmout)
    }

    useEffect(()=> {
        DataServices.TeacherInformaion().then( teachers => {
            const currentTeacher = teachers.filter(teahcer => {
                return teahcer.teacherId == teacherId
            })[0]
            setTeacherDetails(currentTeacher) ; 
        })
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            let amount = 0 ;
            [...subjects].forEach((subject) => {
                amount +=  subject.salary
            })

            handlePaidAndRemainingAmount(amount)
            addSpacesBetweenDigits(amount,setTotalAmount)
        })

    } , [])


    const { name , lastName , phone } = teacherDetails ;

    return(
        <div style={{width: '50%' , display: 'flex' , flexDirection: 'column' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Teacher Information</span>
            <div style={{ padding: '15px 8px' , borderRadius: ' 0 0 5px 5px' , background: '#f3f1f1d7' , flex: '1' }}>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '1.3em' , backgroundColor: 'white' , padding: '4px 8px'}}>
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Name :   <span style={{fontSize: '0.8em' , color: 'black' , marginLeft: '1px'}}>{name} {lastName}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Phone Number :  <span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{phone}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Toatal Amount :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{totalAmount}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Remaining :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{remainingAmout}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Paid :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{paidAmout}</span></h4>
                </div>
            </div>    
        </div>
    )
}

export function addSpacesBetweenDigits(totalAmount,setNumber) {
    const convertNumberToSting = `${totalAmount}` ; 
    const numberLength = convertNumberToSting?.length
    let newNumber = ''

    for( let i = numberLength -  1  , threeSteps = 0 ; i >= 0 ; -- i  , threeSteps ++ ) {
        if( threeSteps == 3 ) {
            newNumber = ' ' + newNumber;
            threeSteps = 0 ;
        }
        newNumber = convertNumberToSting[i] + newNumber
    }

    setNumber(newNumber)
}