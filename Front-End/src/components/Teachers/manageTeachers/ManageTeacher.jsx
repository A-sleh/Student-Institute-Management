import { useEffect, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";
import Notification from "../../Global/Notification";
import { HeaderControal } from "../../Bills/TeacherPaysCom/ShowBillTeacherDetails";

export default function ManageTeacher() {

    const [teachersDetails,setTeachersDetails] = useState([]) ;
    const [search,setSearch] = useState('')
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
            <HeaderControal searcByName={search} setSearcByName={setSearch} />
            {
                teachersDetails.map( (teacher,index) => {
                    const {teacherId} = teacher ; 
                    const fullName = teacher.name.toLowerCase() + ' ' + teacher.lastName.toLowerCase() ; 
                    if( !fullName.includes(search.toLocaleLowerCase()) ) return ;
                    return <Teacherinfo teacherId={teacherId} key={index}  setSuccessDeleteTeacher={setSuccessDeleteTeacher}/>
                })
            }
        </>
    )
}