/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import React, { useState } from 'react';
import { CLASSCOLUMNS } from '../columnsTools/CLASSCOLUMNS.JS';
import SubHeaderFilterClassByGrade from '../../../shared/subHeaderTable/SubHeaderFilterClassByGrade';
import useClasses from '../../../../hooks/class_hooks/useClasses';
import Table from '../../../shared/Table';
import { useSelector } from 'react-redux';
import { PrintReportTEXT } from '../../../../Data/static/test/CreateReportTools/PrintReportTEXT';


export default function PrintReport() {

    const {currentLange} = useSelector( state => state.language)
    const {grade : selectedGrade} = useSelector(state => state.grade)
    const {printingReportTitle} = PrintReportTEXT[currentLange]    
    const [classes] = useClasses(selectedGrade?.grade)


    return (
        <Table data={classes || []} column={CLASSCOLUMNS}  url={'/CreateReport/ClassReportPrint'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade />
            <h3 style={{color: '#056699' }}>{printingReportTitle}</h3>
        </Table>
    )


}