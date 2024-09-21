import { useEffect, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";
import Notification from "../../Global/Notification";

export default function ManageTeacher() {

    const [teachersDetails,setTeachersDetails] = useState([]) ;
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    useEffect(() => {
        DataServices.TeacherInformaion().then( teachers => { // this work
            setTeachersDetails(teachers)
        })
    } ,[successDeleteTeacher])

    return(
        <>
            <Notification  title={'Delete Theacer'} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />  
            <Title title={window.location.pathname}/> 
            {
                teachersDetails.map( (teacher,index) => {
                    const {teacherId} = teacher ; 
                    return <Teacherinfo teacherId={teacherId} key={index}  setSuccessDeleteTeacher={setSuccessDeleteTeacher}/>
                })
            }
        </>
    )
}