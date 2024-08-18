
import { useSearchParams } from "react-router-dom";
import StudentForm from "./StudentForm";
import { format } from "date-fns";

export default function UpdateStudent() {
    const [SearchParams,setSearchParams] = useSearchParams() ;
    const encodeData = SearchParams.get('data') ;
    const jsonString = decodeURIComponent(encodeData) ;
    const studentInfo = JSON.parse(jsonString) ; 
    const mapingStudentInfo = {...studentInfo ,birthdate : format(new Date(studentInfo.birthdate),'yyyy/MM/dd') , phone : studentInfo.phone.trim()}
    
  return (
    <>
      <StudentForm title={'Student : ' +  studentInfo.name + ' ' + studentInfo.lastName} requestType={'PUT'} studentInformation={mapingStudentInfo} />
    </>
  );
}
