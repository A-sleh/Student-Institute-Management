import StudentForm from "./StudentForm";

export default function NewStudent() {
  const studentInfo = {
    name: "",
    lastName: "",
    fatherName: "",
    birthdate: "",
    phone: "",
    missedDays: 0,
    billRequired: 0,
    class: {},
  };
  return <StudentForm title={window.location.pathname} requestType={"POST"} studentInformation={studentInfo} />;
}
