/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { useCallback, useEffect, useRef, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";
import Notification from "../../Global/Notification";
import Loader from "../../Modal/Loader";

export default function ManageTeacher() {

    const limmitNumber = 1
    // infinite scroll states
    const [teachersDetails,setTeachersDetails] = useState([]) 
    const [currentPage,setCurrentPage] = useState(1)
    const [fetchingData,setFetchingData] = useState(false)
    const observer = useRef();
    
    const [search,setSearch] = useState('')
    const [totalPages,setTotalPages] = useState(1)
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    
    useEffect(() => {
        DataServices.TeacherInformaion('',limmitNumber,currentPage).then( teachers => { 
            setTotalPages(teachers.totalPages)
            setTeachersDetails(teachers.teachers)
        })
    } ,[successDeleteTeacher])
    
    useEffect(() => {

        if( currentPage > totalPages ) return

        // this case to avoid reapation data
        if(setTeachersDetails.length == 1 && currentPage == 1 ) {
            return 
        }
        const loadMoreTeachers = async () => {
            setFetchingData(true);
            const newTeachers = await fetch(`https://localhost:7279/Teacher?listSize=${limmitNumber}&page=${currentPage}`);
            const data = await newTeachers.json();
            setTeachersDetails((prevPosts) => [...prevPosts, ...data.teachers]);
            setFetchingData(false);
        };
        loadMoreTeachers()
    } , [currentPage]);

    const lastTeacherElementRef = useCallback(
        (node) => {
          if (fetchingData) return;
          if (observer.current) observer.current.disconnect();
        
          observer.current = new IntersectionObserver((entries) => {
            
            if (entries[0].isIntersecting) {
                setCurrentPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
            }
          });
    
          if (node) observer.current.observe(node);
        },
        [fetchingData]
      );

    return(
        <>
            <Notification title={'Delete Theacer'} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />  
            
            <Title title={window.location.pathname}/> 
            {fetchingData && <Loader />}
            {
                teachersDetails.map( (teacher,index) => {
                    const {teacherId} = teacher ; 
                    const fullName = teacher.name?.toLowerCase() + ' ' + teacher.lastName?.toLowerCase() ; 
                    if( !fullName.includes(search.toLowerCase()) ) return ;
                    return <Teacherinfo teacherId={teacherId} key={index}  setSuccessDeleteTeacher={setSuccessDeleteTeacher} refProp={teachersDetails.length === index + 1 ? lastTeacherElementRef : null}/>
                })
            }
        </>
    )
}