import StudentForm from "./StudentForm";

export default function NewStudent() {
  const studentInfo = {
    name: "",
    lastName: "",
    fatherName: "",
    phone: "",
    billRequired: 0,
    missedDays: 0,
    class: {
      grade : '',
      gender: '',
      classId: '',
      title: ''
    }
  };
  return <StudentForm title={window.location.pathname} requestType={"POST"} studentInformation={studentInfo} />;
}
