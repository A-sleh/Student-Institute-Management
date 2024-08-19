
import './class.css'


export default function ClassCard(props) {

  const { classDetails } = props;

  return (
    <div className="class-card">
      <i className="bi bi-info-circle icon"></i>
      <main>
        <h3>Class Title : <span> {classDetails.title} </span> </h3>
        <h3>Grade : <span> {classDetails.grade} </span></h3>
        <h3>Gender : <span> {classDetails.gender} </span></h3>
        <h3>Class Capacity :  <span> {classDetails.capacity} </span></h3>
      </main>
    </div>
  );
}
