/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import React, { useState } from 'react';
import { CLASSCOLUMNS } from '../columnsTools/CLASSCOLUMNS.JS';
import SubHeaderFilterClassByGrade from '../../../shared/subHeaderTable/SubHeaderFilterClassByGrade';
import useClasses from '../../../../hooks/useClasses';
import Table from '../../../shared/Table';


export default function PrintReport() {

    const [selectedGrade,setSelectedGrade] = useState('bachelor')
    const [classes] = useClasses(selectedGrade)


    return (
        <Table data={classes || []} column={CLASSCOLUMNS}  url={'/CreateReport/ClassReportPrint'} idKeyParams={'classId'}>
            <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade} />
            <h3 style={{color: '#056699' }}>Printing Report</h3>
        </Table>
    )


}