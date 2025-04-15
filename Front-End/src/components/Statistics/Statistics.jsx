import { useSelector } from "react-redux";
import Title from "../Global/Title";
import BalanceEachMonth from "./Bills/BalanceEachMonth";
import IncomeOutComeBalanceInRangedMonth from "./Bills/IncomeOutComeBalanceInRangedMonth";
import LatestBills from "./Bills/LatestBills";
import TotalInstituteBalance from "./Bills/TotalInstituteBalance";
import ClassAvgInCurrentReport from "./class/ClassAvgInCurrentReport";
import ClassesStudentsTeachersCount from "./Grade/ClassesStudentsTeachersCount";
import GradeCounter from "./Grade/GradeCounter";
import FirstStudentInCurrentReport from "./Students/FirstStudentInCurrentReport";
import StudentReportsAvg from "./Students/StudentReportsAvg";
import TeachersRate from "./teachers/TeachersRate";


export default function Statistics() {

  const { isAdmin } = useSelector( state => state.admin)

  return (
      <>
        <Title title={window.location.pathname} />        
          { isAdmin && <TotalInstituteBalance />}

          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            { isAdmin ? <IncomeOutComeBalanceInRangedMonth /> : <GradeCounter /> }
            <FirstStudentInCurrentReport />
          </div>
          <LatestBills />
          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            <ClassesStudentsTeachersCount />    
            {isAdmin && <GradeCounter />}
            <TeachersRate />
          </div>    
          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            <StudentReportsAvg />
            <ClassAvgInCurrentReport />
          </div>

      </>
  );
}
