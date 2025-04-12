/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Teacherinfo from "./TeacherInfo";
import Notification from "../../Global/Notification";
import Loader from "../../Modal/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ManageTeachersTEXT } from "../../../Data/static/teachers/ManageTeacher/ManageTeachersTEXT";
import { useNavigate ,ScrollRestoration } from "react-router-dom";
import SearchSubHeader from "../../shared/SearchSubHeader";
import useGetTeacherByName from "../../../hooks/teacher_hooks/useGetTeacherByName";
import { ALL_TEACHER, CHANGE_CURRENT_PAGE, SEARCH_INPUT_TEACHER, SEARCHING_TEACHER, TEACHER_SECTION, TEACHER_SOURCE, TEACHERS, TOTAL_PAGES } from "../../../Redux/actions/type";
import useScroolingTo from "../../../hooks/shared/useScroolingTo";

export default function ManageTeacher() {

    const limmitNumber = 1
    // page lang content
    const {currentLange} = useSelector( state => state.language)
    const {currentPage,teachers,totalPages,offSetTeacher,dataFrom,searchInput} = useSelector( state => state.pageCounter)
    const {isAdmin} = useSelector( state => state.admin)
    const changeCurrentPage = useDispatch()
    const goTo = useNavigate()
    
    const {successDeleteTeacherMES,notFoundMES} = ManageTeachersTEXT[currentLange]
    const [loading,setLoading] = useState(false)
    const [sendRequest,setSendRequest] = useState(false)
    const [teachersInfo,notFoundMes,setNotFoundMes] = useGetTeacherByName(searchInput,sendRequest) 
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    // infinite scroll states
    const [fetchingData,setFetchingData] = useState(false)
    const observer = useRef();
    const gotoSec = useRef(null)

    function dispatchTeacherInfo(teachers,teachersNumber,mode) {
        changeCurrentPage({
            type: TOTAL_PAGES , 
            payload: teachersNumber
        })
        changeCurrentPage({
            type: TEACHERS , 
            payload: teachers
        })
        changeCurrentPage({
            type: TEACHER_SOURCE , 
            payload: mode
        })
        changeCurrentPage({
            type: TEACHER_SECTION , 
            payload: ''
        })
    }
    
    useEffect(() => {
        if(!isAdmin) {
            goTo('/TeachersDetails')
        }
    },[isAdmin])
    
    useEffect(() => {
        // for the first state and if the user delete any teacher 
        if( currentPage == 1 ) {
            DataServices.TeacherInformaion('',limmitNumber,currentPage).then( teachers => { 
                dispatchTeacherInfo(teachers.teachers,teachers.totalPages,ALL_TEACHER)
            })
        }
    } ,[currentPage])
    
    useEffect(() => {
        if( currentPage > totalPages ) return
        // this case to avoid reapation data
        if(teachers.length == currentPage  ) {
            return 
        }     
        const loadMoreTeachers = async () => {
            setFetchingData(true);
            const newTeachers = await fetch(`https://localhost:7279/Teacher?listSize=${limmitNumber}&page=${currentPage}`);
            const data = await newTeachers.json();
            changeCurrentPage({
                type: TEACHERS , 
                payload: [...teachers,...data.teachers]
            })
            setFetchingData(false);
        };
        loadMoreTeachers()
    } , [currentPage,totalPages]); 
    
    useEffect(() => {
        // to advoid set undefine teachers when the user return from searching and the search input not empyt
        if(teachers?.length != 0 && searchInput != '' && teachersInfo == null ) {
            return 
        }
        if(searchInput != '' && teachersInfo?.length != 0 ) {
            dispatchTeacherInfo(teachersInfo,teachersInfo?.length,SEARCHING_TEACHER)
            return 
        }
        if(dataFrom == SEARCHING_TEACHER && searchInput == '' ) {
            dispatchTeacherInfo([],0,ALL_TEACHER )
            changeCurrentPage({
                type: CHANGE_CURRENT_PAGE ,
                payload: 1
            })
        }
    },[searchInput,teachersInfo]) 

    useScroolingTo(gotoSec,setLoading)

    const lastTeacherElementRef = useCallback(  
        (node) => {
          if (fetchingData || (teachersInfo?.length != 0 && searchInput != '')){
              return;
          } 
          if (observer.current) observer.current.disconnect();
        
          observer.current = new IntersectionObserver((entries) => {
            
            if (entries[0].isIntersecting) {
                changeCurrentPage({
                    type: CHANGE_CURRENT_PAGE ,
                    payload: currentPage + 1 
                }); // trigger loading of new posts by chaging page no
            }
          });
    
          if (node) observer.current.observe(node);
        },
        [fetchingData,teachersInfo]
    );

    function handleSearchClicked() {
        setSendRequest(true)
        setTimeout(()=> setSendRequest(false),200)
    }

    function handleSearchInput(value) {
        changeCurrentPage({
            type: SEARCH_INPUT_TEACHER ,
            payload: value
        })
    }
    
    return(
        <>
            <ScrollRestoration />
            <Notification title={successDeleteTeacherMES} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />  
            <Notification title={notFoundMES} type={'error'} state ={notFoundMes} setState={setNotFoundMes} />  
            <Title title={window.location.pathname}/> 

            <SearchSubHeader filter={searchInput} setFilter={handleSearchInput} handleSearchClicked={handleSearchClicked}/>

            {(fetchingData || loading) && <Loader />}
            {
                teachers.map( (teacher,index) => {
                    
                    const {teacherId} = teacher ; 
                    return  <div id={`teacher_${teacherId}`} ref={ offSetTeacher == `teacher_${teacherId}` ? gotoSec : null } key={index}>
                                <Teacherinfo  teacherId={teacherId}  setSuccessDeleteTeacher={setSuccessDeleteTeacher} refProp={teachers.length === index + 1 ? lastTeacherElementRef : null}/>
                            </div>
                })
            }
        </>
    )
}

