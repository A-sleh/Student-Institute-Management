
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import ClassInfo from "./classDetails/ClassInfo";
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import SearchSubHeader from "../shared/SearchSubHeader";
import { useSelector } from "react-redux";


export default function ClassesDetails() {

  const {grade : selectedGrade} = useSelector(state => state.grade)
  const [classesDetails,setClassesDetails] = useState([]) ;
  const [search,setSearch] = useState('')

  useEffect(() => {
    DataServices.showCalsses().then( response => {
      setClassesDetails(response)
    });
  },[]);
  
  const showAllCalsses = classesDetails?.map( (Class,index) => {
    const { title ,grade } = Class 
    
    if( grade?.toLowerCase() != selectedGrade?.grade?.toLowerCase()) return
    if( !title?.toLowerCase().includes(search?.toLowerCase()) ) return
    return <ClassInfo classDetails={Class} key={index}/>
  })
  
  return (
    <>
      <Title title={window.location.pathname}/>
      <div style={{display: 'flex' , alignItems: 'center',justifyContent: 'space-between'}}>
        <SubHeaderFilterClassByGrade />
        <SearchSubHeader filter={search} setFilter={setSearch}/>
      </div>
      {showAllCalsses}
    </>
  );
}
