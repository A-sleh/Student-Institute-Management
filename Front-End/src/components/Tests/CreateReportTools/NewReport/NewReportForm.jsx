import {useState} from 'react'
import { FormInputContainerStyle, FormInputFieldStyle, FormRowStyle, LabelInputStyle, TextAreaInput } from '../../CreateTestTools/EmentsStyle'
import DataServices from '../../../../Data/dynamic/DataServices'
import Notification from '../../../Global/Notification'


export default function NewReportForm() {

    const initailState =   {
        reportTitle: '',
        startDate: '',
        finishDate: null,
    }
    const [validation,setValidation] = useState({
        reportTitle: false,
        startDate: false,
    })
    const [reportForm,setReportForm] = useState(initailState)
    const [successCreateReport,setSuccessCreateReport] = useState(false)


    function validInputs() {
        const { reportTitle , startDate } = reportForm

        setValidation({
            reportTitle: reportTitle == '',
            startDate: startDate == '',
        })
        return (startDate == '' || reportTitle == '')
    }
    
    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validInputs()) {
            alert('here')
            DataServices.CreateNewReport(reportForm).then( _ => {
                setReportForm(initailState)
                setSuccessCreateReport(true)
                setTimeout(() => {
                    setSuccessCreateReport(false)
                } , 2000 )
            })
        }
    }

    return (
        <>
            <Notification title={'create report'} type={'success'} state ={successCreateReport} setState={setSuccessCreateReport}/>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , borderRadius: '5px', flex: '1'}}>
            <h3 style={{fontSize: '1.3em' , color: '#0e0b0b' , marginBottom: '10px'}}>Report Information</h3>
                <form style={{display: 'flex' , flexDirection: 'column'}} onSubmit={(e)=>{handleSubmitClicked(e)}}>
                    <FormRowStyle>
                        <FormInputContainerStyle >
                            <LabelInputStyle>Report Title</LabelInputStyle>
                            <TextAreaInput className={validation.reportTitle ? 'error': ''} value={reportForm.reportTitle} onChange={(e)=>setReportForm({...reportForm,reportTitle: e.target.value})}  />
                            { validation.reportTitle && <span style={{marginTop: '4px' , fontSize: '13px' , color: 'red' , transition: '.3s'}}>Please enter the report title</span>}
                        </FormInputContainerStyle>
                    </FormRowStyle>
                    <FormRowStyle>
                        <FormInputContainerStyle>
                            <LabelInputStyle>Start Date</LabelInputStyle>
                            <FormInputFieldStyle type="date" className={validation.startDate ? 'error': ''} value={reportForm.startDate} onChange={(e) => setReportForm({...reportForm,startDate: e.target.value})}/>
                            { validation.startDate && <span style={{marginTop: '4px' , fontSize: '13px' , color: 'red' , transition: '.3s'}}>You must determain the report date</span>}
                        </FormInputContainerStyle>
                    </FormRowStyle>
                    <input type="submit" value="Create" style={{width: 'fit-content' , margin: '10px 0'}}/>
                </form>
            </div>

        </>
    )
}