

export default function TeacherCard(props) {
  const { teacherDetails } = props;
  
  return (
    <div className="student-card">
      <i className="bi bi-person-circle icon"></i>
      <main>
        <h3>First Name : <span> {teacherDetails.name}</span> </h3>
        <h3>Last Name  :  <span> {teacherDetails.lastName} </span></h3>
        <h3>phone : <span> {teacherDetails.phone} </span></h3>
      </main>
    </div>
  );
}
