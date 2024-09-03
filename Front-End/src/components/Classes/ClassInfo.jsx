
import { useNavigate } from "react-router-dom";
import StudentInfo from "../Modal/StudentInfo";
import ShowClassDetails from "./ShowClassDetails";
import { useState } from "react";

export default function ClassInfo({ classDetails }) {

  const { title, capacity, gender, grade, students } = classDetails;
  const gotoStudentDetails = useNavigate() ;

  const totalStudentsNumber =
    students?.length - (students != undefined && students[0] == null); // if the class don't contain any studnet will return an array with length one so we remove it useing this condition

  function handleStudentCicked(student) {
    gotoStudentDetails(`/StudentInformation/${student.studentId}`)
  }
  return (
    <>
      <div className="class">
        <h1 className="class-title">{title}</h1>
        <div className="class-header-info">
          <h3>Class Information</h3>
          <div className="class-info">
            <ShowClassDetails
              title={"Students"}
              value={totalStudentsNumber}
              color={"#ffbc00"}
              icon={"fa-solid fa-user-group"}
            />
            <ShowClassDetails
              title={"Teachers"}
              value={0}
              color={"#229edb"}
              icon={"fa-solid fa-person-chalkboard"}
            />
            <ShowClassDetails
              title={"Grade"}
              value={grade}
              color={"#60ff00"}
              icon={"fa-solid fa-graduation-cap"}
            />
            <ShowClassDetails
              title={"Gender"}
              value={gender}
              color={"#ff0000"}
              icon={"bi bi-person-fill-exclamation"}
            />
          </div>
        </div>
        <div className="class-body-info">
          <div className="teachers-info">
            <h3>Teachers</h3>
            <div className="teacher-name">
              {/* needed to build soon */}
              {
                <p
                  style={{ color: "red", fontWeight: "400", fontSize: "16px" }}
                >
                  There are no teachers yet ...
                </p>
              }
            </div>
          </div>
          <div className="students-info">
            <h3>Students</h3>
            <div className="students-name">
              {students.map((student) => {
                if (student == null) return; // if there are no stuent
                const { id, name, lastName } = student;
                return (
                  <span
                    key={id}
                    className="studnet-tage"
                    onClick={() => {
                      handleStudentCicked(student);
                    }}
                  >
                    {name} {lastName}
                  </span>
                );
              })}
              {totalStudentsNumber == 0 && (
                <p
                  style={{ color: "red", fontWeight: "400", fontSize: "16px" }}
                >
                  There are no students yet ...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
