import { useEffect, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";

export default function ManageTeacher() {

    const [teachersDetails,setTeachersDetails] = useState([]) ;
    useEffect(() => {
        DataServices.TeacherInformaion().then( teachers => { // this work
            setTeachersDetails(teachers)
        })
    } ,[])

    return(
        <>
            <Title title={window.location.pathname}/> 
            {
                teachersDetails.map( (teacher,index) => {
                    const {teacherId} = teacher ; 
                    return <Teacherinfo teacherId={teacherId} key={index} />
                })
            }
        </>
    )
}