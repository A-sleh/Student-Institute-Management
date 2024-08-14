import "./studentStyle.css";

export default function StudentCard(props) {
  const { studentDetails } = props;
  return (
    <div className="student-card">
      <i className="bi bi-person-circle icon"></i>
      <main>
        <h3>Name : <span> {studentDetails.name} {studentDetails.lastName}</span> </h3>
        <h3>Father :  <span> {studentDetails.fatherName} </span></h3>
        <h3>Birth Date : <span> {studentDetails.birthdate} </span></h3>
        <h3>phone : <span> {studentDetails.phone} </span></h3>
        <h3>Bill Required : <span> {studentDetails.billRequired} </span></h3>
        <h3>Missed Days : <span> {studentDetails.missedDays} </span></h3>
        <h3>Class Id : <span> {studentDetails.classId} </span></h3>
      </main>
    </div>
  );
}
