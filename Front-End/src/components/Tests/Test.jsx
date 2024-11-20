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
        title: 'New Test',
        path: 'NewTest',
    },
    {
        title: 'Show All Tests',
        path : 'ShowAllTest',
    },
    {
        title: 'Reciving Marks',
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