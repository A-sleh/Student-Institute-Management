/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { useState } from "react"
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic"
import { TEACHERSUBJECTCOLUMN } from "../TableTools/TeacherSubjectColumn"
import { ButtonsContainerStyle, FormStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag"
import { NavigateSubHeaderStyle } from "../../Tests/style/styleTage"
import { useNavigate, useParams } from "react-router-dom"
import DataServices from "../../../Data/dynamic/DataServices"
import Title from "../../Global/Title"
import Notification from "../../Global/Notification"
import Table from "../../shared/Table"
import useClass from "../../../hooks/useClass"
import useClassTeachersSubjectSalrays from "../../../hooks/class_hooks/useClassTeachersSubjectSalrays"

export default function RemoveTeachersFromClass() {

    const gotoPage = useNavigate()
    const classId = useParams().classId
    const [currentClass] = useClass(classId)
    const [wornning,setWornning] = useState(false)
    const [teachersSelectedId,setTeachersSelectedId] = useState({})
    const [successRemoveTeachers,setSuccessRemoveTeachers] = useState(false)
    const [teachers] = useClassTeachersSubjectSalrays(classId,successRemoveTeachers)

    function handleTeacherRowClicked(teahcerSubjectId) {
        let teachersSubjectsID = new Map() ;
        teachersSubjectsID = {...teachersSelectedId} ;

        // To remove teacher subject id if the user was selected before ,else added it on the state
        if( teachersSubjectsID[teahcerSubjectId] ) {
            delete teachersSubjectsID[teahcerSubjectId] 
        }else teachersSubjectsID[teahcerSubjectId] = true

        setTeachersSelectedId(teachersSubjectsID)
    }

    async function RemoveTeachersFromClass(teachersSubjectIDs) {
        new Promise( resolve => {
            teachersSubjectIDs.map((teacherSubjectId,index) => {
                DataServices.DeleteTeacherFromClass(teacherSubjectId,classId) 
                if( index == teachersSubjectIDs?.length - 1 ) {
                    resolve('done')
                }
            })
        })
    }

    function handleRemoveClicked() {
        let teachersSubjectIDs = Object.keys(teachersSelectedId)
        
        if(teachersSubjectIDs?.length == 0 ) {
            errorActionLogic(setWornning)
            return 
        }
        RemoveTeachersFromClass(teachersSubjectIDs).then( _ => {
            successActionLogic(setSuccessRemoveTeachers)
        })
    }

    return (
        <>
            <Notification title={'select one teacher at least'} type={'error'} state ={wornning} setState={setWornning} />
            <Notification title={'remove teachers'} type={'success'} state ={successRemoveTeachers} setState={setSuccessRemoveTeachers} />
            <Title title={window.location.pathname}/>

            <NavigateSubHeaderStyle>
                <span style={{textAlign: 'left'}}>{currentClass.title} / {currentClass.grade}</span>
                <span style={{float: 'right'}}>Teacher Number : {teachers?.length || 0}</span>
            </NavigateSubHeaderStyle>

            <h3 >Teachers</h3>                
            <Table column={TEACHERSUBJECTCOLUMN} data={teachers} showMainHeader={false} unableId={true} selectionRows={teachersSelectedId} idKeyParams={'teacherSubjectId'} rowClickedFn={handleTeacherRowClicked} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}}/>
            
            <ButtonsContainerStyle handleRemoveClicked={handleRemoveClicked}>
                <SubmitBtnStyle onClick={()=>handleRemoveClicked()} >Remove</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1,{replace: true})}} >Go Back</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
        
    )
}
