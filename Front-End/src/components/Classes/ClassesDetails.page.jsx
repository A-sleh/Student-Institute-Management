
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


export default function ClassesDetails() {

  const [classesDetails,setClassesDetails] = useState([]) ;
  const [selectedGrade,setSelectedGrade] = useState('')
  const [search,setSearch] = useState('')

  useEffect(() => {
    DataServices.showCalsses().then( response => {
      setClassesDetails(response)
    });
  },[]);
  
  const showAllCalsses = classesDetails?.map( (Class,index) => {
    const { title ,grade } = Class 
    
    if( grade.toLocaleLowerCase() != selectedGrade.toLocaleLowerCase()) return
    if( !title.toLowerCase().includes(search.toLocaleLowerCase()) ) return
    return <ClassInfo classDetails={Class} key={index}/>
  })
  
  return (
    <>
      <Title title={window.location.pathname}/>
      <div style={{display: 'flex' , alignItems: 'center',justifyContent: 'space-between'}}>
        <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade}/>
        <SearchSubHeader filter={search} setFilter={setSearch}/>
      </div>
      {showAllCalsses}
    </>
  );
}
