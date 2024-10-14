import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import { tBStyle, thStyle } from "../../Teachers/teacherInformation/TeacherSubjects";
import { format } from "date-fns"
import DataServices from "../../../Data/dynamic/DataServices";
import { ShowBillCard } from "../ExternalPaysCom/ShowBillExternalDetails";
import { useNavigate } from "react-router-dom";

export default function ShortStudentsBills() {
    
    const [testData,setTestData] = useState([]) 
    const gotoPreviousPage = useNavigate()
    useEffect(() => {
        DataServices.ShowLasteStudentsBill(6,'student').then( Bills => {
            setTestData(Bills)
        })
    },[])


    return (
        <div style={{marginBottom: '20px'}}>
            <h1 style={{fontSize: '20px'}}>Lastest <span style={{color: '#066599'}}>students</span> bills </h1>
            <div style={{borderRadius: '5px',backgroundColor: '#ddd' , overflow: 'hidden'}}>
                <div style={{padding: '10px', gap: '10px',display: 'grid' , gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
                    {
                        testData.map( (bill,i) => {
                            if( i > 5 )return
                            return <ShowBillCard type={'show'} bill={bill}  />
                        })
                    }
                </div>
                <button onClick={() => gotoPreviousPage('/StudentsPays')} style={{width: '100%' , border: 'none' , padding: '10px' , backgroundColor: '#066599' ,fontWeight: '400', color: 'white' , fontSize: '1.2em' , cursor: 'pointer'}}>show more</button>
            </div>
        </div>
    )
}


{/*
    <table>
    <thead  style={{position: 'relative' , top: '-5px'  }}>                    
        <tr>
            <th style={{...thStyle,backgroundColor: '#066599',color: 'white',fontWeight: '500',border: 'none' , padding: '15px' }}>Count</th>
            <th style={{...thStyle,backgroundColor: '#066599',color: 'white',fontWeight: '500',border: 'none' , padding: '15px' }}>Bill Number </th>
            <th style={{...thStyle,backgroundColor: '#066599',color: 'white',fontWeight: '500',border: 'none' , padding: '15px' }}>Amount</th>
            <th style={{...thStyle,backgroundColor: '#066599',color: 'white',fontWeight: '500',border: 'none' , padding: '15px' }}>Date</th>
            <th style={{...thStyle,backgroundColor: '#066599',color: 'white',fontWeight: '500',border: 'none' , padding: '15px' }}>Note</th>
        </tr>
    </thead>
    <tbody >
        <tr style={{backgroundColor: 'white'}}>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{1}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>123kkasf</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{ addSpaceBetweenDigit ('123234123')}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{format(new Date('2023/03/1') ,'yyyy / MM / dd')}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>for test</td>
        </tr>
        <tr style={{backgroundColor: '#dddddd71'}}>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{1}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>123kkasf</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{ addSpaceBetweenDigit ('123234123')}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{format(new Date('2023/03/1') ,'yyyy / MM / dd')}</td>
            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>for test</td>
        </tr>
    </tbody>
</table>
*/}