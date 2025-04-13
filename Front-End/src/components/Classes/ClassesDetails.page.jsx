
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useRef, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import ClassInfo from "./classDetails/ClassInfo";
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import SearchSubHeader from "../shared/SearchSubHeader";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CLASS_PAGE, CLASS_SECTION, SEARCH_INPUT_CLASS, SHOW_CLASS_PAGE } from "../../Redux/actions/type";
import Loader from "../Modal/Loader";
import useScroolingTo from "../../hooks/shared/useScroolingTo";


export default function ClassesDetails() {

  const {grade : selectedGrade} = useSelector(state => state.grade)
  const {searchField ,page ,lastClassClicked} = useSelector(state => state.classRd)
  const [classesDetails,setClassesDetails] = useState([]) ;
  const [loading,setLoading] = useState(false)
  const goToSection = useRef(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(page != SHOW_CLASS_PAGE) {
      setSearchField('')
      dispatch({
        payload: '' ,
        type: CLASS_SECTION
      })
    }
  },[])

  function setSearchField(value) {
    dispatch({
      payload: value ,
      type: SEARCH_INPUT_CLASS
    })
    dispatch({
      payload: SHOW_CLASS_PAGE ,
      type: CHANGE_CLASS_PAGE
    })
  }

  useEffect(() => {
    DataServices.showCalsses().then( response => {
      setClassesDetails(response)
    });
  },[]);
  
  const showAllCalsses = classesDetails?.map( (Class,index) => {
    const { title ,grade , classId} = Class 
    
    if( grade?.toLowerCase() != selectedGrade?.grade?.toLowerCase()) return
    if( !title?.toLowerCase().includes(searchField?.toLowerCase()) ) return
    return <div ref={classId == lastClassClicked ? goToSection : null}>
      <ClassInfo id={classId} classDetails={Class} key={index}  />
    </div>
  })

  useScroolingTo(goToSection,setLoading)
  
  return (
    <>
      <Title title={window.location.pathname}/>
      { loading && <Loader />}
      <div style={{display: 'flex' , alignItems: 'center',justifyContent: 'space-between'}}>
        <SubHeaderFilterClassByGrade />
        <SearchSubHeader filter={searchField} setFilter={setSearchField}/>
      </div>
      {showAllCalsses}
    </>
  );
}
