/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import Title from '../Global/Title'
import { Outlet } from 'react-router-dom'
import SubNavBar from '../shared/SubNavBar'

const urlList = [
    {
        title:{
            arabic: 'أختبار جديد' ,
            english:  'New Test'
        } ,
        isAdmin: true,
        path: 'NewTest',
    },
    {
        title: {
            arabic: 'عرض جميع التقارير' ,
            english: 'Show All Tests'
        } ,
        isAdmin: true,
        path : 'ShowAllTest',
    },
    {
        title: {
            arabic: 'إدخال علامات اختبار' ,
            english: 'Reciving Marks'
        } ,
        isAdmin: true,
        path : 'RecivingMarks',
    }
]


export default function Test() {

    return(
        <>
            <Title title={window.location.pathname}/> 
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}