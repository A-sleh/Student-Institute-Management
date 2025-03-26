/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";
import Notification from "../../Global/Notification";
import Loader from "../../Modal/Loader";
import { useSelector } from "react-redux";
import { ManageTeachersTEXT } from "../../../Data/static/teachers/ManageTeacher/ManageTeachersTEXT";
import { useNavigate } from "react-router-dom";
import SearchSubHeader from "../../shared/SearchSubHeader";
import useGetTeacherByName from "../../../hooks/teacher_hooks/useGetTeacherByName";

export default function ManageTeacher() {

    const limmitNumber = 1
    // page lang content
    const {currentLange} = useSelector( state => state.language)
    const {isAdmin} = useSelector( state => state.admin)
    const goTo = useNavigate()
    const {successDeleteTeacherMES,notFoundMES} = ManageTeachersTEXT[currentLange]
    const [search,setSearch] = useState('') // need to build
    const [sendRequest,setSendRequest] = useState(false)
    const [teachersInfo,notFoundMes,setNotFoundMes] = useGetTeacherByName(search,sendRequest)
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    // infinite scroll states
    const [teachersDetails,setTeachersDetails] = useState([]) 
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [fetchingData,setFetchingData] = useState(false)
    const observer = useRef();
    
    useEffect(() => {
        if(!isAdmin) {
            goTo('/TeachersDetails')
        }
    },[isAdmin])
    
    useEffect(() => {
        // for the first state and if the user delete any teacher 
        if( currentPage == 1 ) {
            DataServices.TeacherInformaion('',limmitNumber,currentPage).then( teachers => { 
                setTotalPages(teachers.totalPages)
                setTeachersDetails(teachers.teachers)
            })
        }
    } ,[currentPage])
    
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

    function handleSearchClicked() {
        setSendRequest(true)
        setTimeout(()=> setSendRequest(false),200)
    }

    function specifyWhichTeachersWillDisplay() {
        if(search != '' && teachersInfo.length != 0 ) {
            return teachersInfo
        }
        return teachersDetails
    }

    return(
        <>
            <Notification title={successDeleteTeacherMES} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />  
            <Notification title={notFoundMES} type={'error'} state ={notFoundMes} setState={setNotFoundMes} />  
            <Title title={window.location.pathname}/> 

            <SearchSubHeader filter={search} setFilter={setSearch} handleSearchClicked={handleSearchClicked}/>

            {fetchingData && <Loader />}
            {
                specifyWhichTeachersWillDisplay().map( (teacher,index) => {
                    
                    const {teacherId} = teacher ; 
                    console.log(teacherId)
                    const fullName = teacher.name?.toLowerCase() + ' ' + teacher.lastName?.toLowerCase() ; 
                    return <Teacherinfo teacherId={teacherId} key={index} setTeachersDetails={setTeachersDetails} setCurrentPage={setCurrentPage} setSuccessDeleteTeacher={setSuccessDeleteTeacher} refProp={teachersDetails.length === index + 1 ? lastTeacherElementRef : null}/>
                })
            }
        </>
    )
}

const TeacherInfoMemo =  React.memo(
    ({teacherId,setTeachersDetails,setCurrentPage,setSuccessDeleteTeacher,refProp}) => {
    const TeacherinfoMemo = useMemo(()=>(
        <Teacherinfo teacherId={teacherId} setTeachersDetails={setTeachersDetails} setCurrentPage={setCurrentPage} setSuccessDeleteTeacher={setSuccessDeleteTeacher} refProp={refProp}/>
    ),[])
    return TeacherinfoMemo
})