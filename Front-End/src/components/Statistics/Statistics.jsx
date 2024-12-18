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

  return (
      <>
        <Title title={window.location.pathname} />        
          <TotalInstituteBalance />
          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            <IncomeOutComeBalanceInRangedMonth />
            <BalanceEachMonth />
          </div>
          <LatestBills />
          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            <FirstStudentInCurrentReport />
            <GradeCounter />
            <TeachersRate />
          </div>    
          <div style={{display: 'flex', gap: '10px' , flexWrap: 'wrap'}}> 
            <ClassesStudentsTeachersCount />    
            <StudentReportsAvg />
            <ClassAvgInCurrentReport />
          </div>

      </>
  );
}
