/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useSearchParams } from "react-router-dom";
import StudentForm from "./StudentForm";

export default function UpdateStudent() {
    const [SearchParams,setSearchParams] = useSearchParams() ;
    const encodeData = SearchParams.get('data') ;
    const jsonString = decodeURIComponent(encodeData) ;
    const studentInfo = JSON.parse(jsonString) ; 
    const mapingStudentInfo = {...studentInfo , phone : studentInfo.phone.trim()}
  
  return (
    <>
      <StudentForm title={'Student : ' +  studentInfo.name + ' ' + studentInfo.lastName} requestType={'PUT'} studentInformation={mapingStudentInfo} />
    </>
  );
}
