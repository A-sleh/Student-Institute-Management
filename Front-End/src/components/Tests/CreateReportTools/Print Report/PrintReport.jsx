
import React, { useEffect, useRef, useState } from 'react';
import ShowAllClasses from '../ManageReport/ShowAllClasses';
import { HeaderControal } from '../../../Bills/TeacherPaysCom/ShowBillTeacherDetails';
import DataServices from '../../../../Data/dynamic/DataServices';
import { PDFViewer, render } from '@react-pdf/renderer';
import PrintingPage from './PrintingPage';
import StudentsPDF from './StudentsPDF';

export default function PrintReport() {

    const [classesGrade,setClassesGrade] = useState([]) ; 
    const [selectedGrade,setSelectedGrade] = useState('bachelor')
    const [search,setSearch] = useState('')
    
    // useEffect(() => {
    //     DataServices.ShowAllSubject().then( subjects => {
    //         let gradesObj = new Set() , gradeArray = [] ;

    //         subjects.map( subjects => {
    //             gradesObj.add(subjects.grade)
    //         })
    //         gradesObj.forEach(itemt => {
    //             gradeArray.push(itemt)
    //         })
    //         setClassesGrade(gradeArray)
    //     })
    // })
    const data = {
        month: 'Octobar' ,
        grade : 'Ninth',
        data : [        
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'ali shabo' ,
                mark: 1850 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            },
            {
                name : 'ziad jalo' ,
                mark: 1650 ,
                totalMark : 2300
            },
            {
                name : 'abdulfatah fares' ,
                mark: 1600 ,
                totalMark : 2300
            },
            {
                name : 'muslam' ,
                mark: 1500 ,
                totalMark : 2300
            },
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'ali shabo' ,
                mark: 1850 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            },
            {
                name : 'ziad jalo' ,
                mark: 1650 ,
                totalMark : 2300
            },
            {
                name : 'abdulfatah fares' ,
                mark: 1600 ,
                totalMark : 2300
            },
            {
                name : 'muslam' ,
                mark: 1500 ,
                totalMark : 2300
            },
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            }
        ]
    }
    
    return (
        <>
            <div style={{display: 'flex' , flexDirection: 'column'}}>
                <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                    <select onChange={(e)=>setSelectedGrade(e.target.value)} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '30%' , outline: 'none',cursor: 'pointer' , fontSize: '1em'}}>
                        {
                            classesGrade.map( grade => {
                                return <option value={grade} >{grade}</option>
                            })
                        }
                    </select>
                    <h3 style={{color: '#056699' }}>Print Report</h3>
                    <div style={{width: '30%'}}>
                        <HeaderControal searcByName={search} setSearcByName={setSearch} />
                    </div>
                </div>
                <ShowAllClasses selectedGrade={selectedGrade} search={search} url={'/CreateReport/ClassReportPrint'} type={'classes'}/> 
            </div>
        </>
    )


}