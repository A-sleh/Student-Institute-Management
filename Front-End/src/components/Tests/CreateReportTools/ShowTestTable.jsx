import { format } from "date-fns"
import { thStyle } from "../../Teachers/teacherInformation/TeacherSubjects"

export default function ShowTestTable({title,tests}) {

    return (
        <div style={{flex: '1'}}>
            <div style={{padding: '8px', paddingBottom: '0px' , backgroundColor: '#056699' , color: 'white',display: 'flex' , justifyContent: 'space-between'}}>
                {title}
                <span style={{float: 'right'}}>Count : {tests?.length || 0}</span>
            </div>
            <table>
                <thead  style={{position: 'relative' }}>                    
                    <tr>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Subject </th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Mark</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Maximum Mark</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Test Details</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tests.map( (testMark,index) => {           
                                const {mark,test} = testMark
                                const {correctionDate,subject,title,date} = test
                                return <tr style={{ textAlign: 'center' ,backgroundColor: index % 2 ? 'white' : 'trasnparetn',borderBottom: '2px solid #f3f1f1d7' ,transition: '.3s'}} className="hovering-row" key={index} >
                                            <td style={{padding: '10px' , margin: '5px 0' ,color: '#034568', border: 'none' , backgroundColor: '#05659945',fontWeight: 'bold' }}>{index + 1}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{subject.subject}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{mark || 'not correction yet'}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{subject.maximumMark}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{title || 'there are no notes'}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{format(new Date(date), "yyyy / MM / dd")}</td>
                                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}