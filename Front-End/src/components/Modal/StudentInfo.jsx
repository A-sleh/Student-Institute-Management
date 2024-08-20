import { format } from "date-fns";

export default function StudentInfo({ student, setRendarModal }) {
  const {
    name,
    lastName,
    fatherName,
    missedDays,
    phone,
    birthdate,
    billRequired,
  } = student;

  return (
    <div className="modal">
      <div className="student-container">
        <div style={{ position : 'relative' , minHeight: '130px'}}>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                position: 'absolute' ,
                top: '10%'
              }}
            >
              <h3>
                First Name : <span>{name} </span>
              </h3>
              <h3>
                Last Name : <span>{lastName}</span>
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "15px",
                position: 'absolute' ,
                bottom: '15%'
              }}
            >
              <h3>
                Father Name : <span>{fatherName}</span>
              </h3>
              <h3>
                Phone : <span>{phone}</span>
              </h3>
            </div>
          </div>
          <i
            className="bi bi-person-circle icon"
            style={{ fontSize: "8em" , position: 'absolute' , right: '5%' }}
          ></i>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            marginTop: '10px'
          }}
        >
          <h3>
            Birth Date :{" "}
            <span>{format(new Date(birthdate), "yyyy / MM / dd")} </span>
          </h3>
          <h3>
            Missed Days : <span>{missedDays}</span>
          </h3>
          <h3>
            Bill Required : <span>{billRequired} </span>
          </h3>
        </div>

        <button
          onClick={() => {
            setRendarModal({
              run: false,
              data: {},
            });
          }}
          className="student-info-btn"
        >
          Back
        </button>
      </div>
    </div>
  );
}
