
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import ClassInfo from "./classDetails/ClassInfo";


export default function ClassesDetails() {

  const [classesDetails,setClassesDetails] = useState([]) ;
  const [search,setSearch] = useState('')

  useEffect(() => {
    DataServices.showCalsses().then( response => {
      setClassesDetails(response)
    });
  },[]);
  
  const showAllCalsses = classesDetails?.map( (Class,index) => {
    const { title } = Class ;
    if( !title.toLowerCase().includes(search.toLocaleLowerCase())) return
    return <ClassInfo classDetails={Class} key={index}/>
  })
  
  return (
    <>
      <Title title={window.location.pathname}/>
      {showAllCalsses}
    </>
  );
}