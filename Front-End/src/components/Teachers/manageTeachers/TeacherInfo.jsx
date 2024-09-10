import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import '../teacher.css'
import ShowClassDetails from "../../Classes/ShowClassDetails";
import TeacherSubjectsTable from "./TeacherSubjectsTable";
import TeacherClassesTable from "./TeacherClassesTable";
import Notification from "../../Global/Notification";


export default function Teacherinfo({teacherId}) {

    const [teacherInfo,setTeacherInfo] = useState({})
    const [teacherClasses,setTeacherClasses] = useState([])
    const [successDeleteFromClass,setSuccessDeleteFromClass] = useState(false)

    useEffect(() => {
        DataServices.TeacherInformaion(teacherId).then( teacherDetails => {
          console.log(teacherDetails)
            setTeacherInfo(teacherDetails)
        })
        DataServices.ShowTeacherClass(teacherId).then( classes => {
            let classesNumber = 0 ;
            classes.map( Class => {
              classesNumber += Class.classes.length - ( Class.classes[0] == null )
            })
            setTeacherClasses(classesNumber)
        })
    } ,[])


    const { name , lastName , phone , teacherSubjects } = teacherInfo
    
    // console.log(teacherInfo)

    return(
      <>
        <Notification title={'Delete Teacher From Class'} type={'success'} state ={successDeleteFromClass} setState={setSuccessDeleteFromClass}/>
        <div style={{ padding : '10px 20px' , margin: '2em 0' , backgroundColor: '#ffffff' , boxShadow: '0 0 11px -5px gray' , borderRadius: '5px'}}>
            <div className="header" style={{display: 'flex' , justifyContent: 'space-between' , alignItems : 'center' , padding : '0 5px'}}>
                <h1 style={{fontWeight: '500' , fontSize: '20px' , margin: '5px 0' , textTransform: 'uppercase'}}>{name} {lastName}</h1>
                <div className="btns-controle">
                    <button style={{padding: '1px 15px' , color: 'white' , marginRight: '5px', fontSize: '12px' , cursor: 'pointer' , border: 'none' , outline: 'none' , borderRadius: '3px' , backgroundColor: '#066599'}}>Update</button>
                    <button style={{padding: '1px 15px' , color: 'white' , fontSize: '12px' , cursor: 'pointer' , border: 'none' , outline: 'none' , borderRadius: '3px' , backgroundColor: 'red'}}>Delete</button>
                </div>
            </div>
            <div className="header-teacher-info">
                <h3>Teacher Information</h3>
                <div className="teachers-info-native">
                    <ShowClassDetails
                        title={"Phone"}
                        value={phone}
                        color={"#ffbc00"}
                        icon={"bi bi-telephone-fill"}
                    />
                    <ShowClassDetails
                        title={"Subjects Number"}
                        value={teacherSubjects?.length || 0}
                        color={"#229edb"}
                        icon={"bi bi-list-ol"}
                    />
                    <ShowClassDetails
                        title={"Classes Number"}
                        value={teacherClasses}
                        color={"#60ff00"}
                        icon={"bi bi-building-fill-exclamation"}
                    />
                </div>
            </div>
            <div className="teacher-subject">
              <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , margin: '10px 0' }}>
                <h3 className="sub-title-subject">Subjects</h3>
                <button style={{display: 'flex' , alignItems: 'center' , gap: '4px', backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer' , fontSize: '12px' , color: 'white' , fontWeight: '500' , padding: '6px 10px' , border: 'none' }}>
                    <i className="bi bi-plus-lg" ></i>
                    <span>Add New Subject</span>
                </button>
              </div>
              <div className="teacher-name">
                {
                    teacherSubjects?.length ==0 ?
                  <p
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    There are no teachers yet ...
                  </p>: 
                  <TeacherSubjectsTable teacherId={teacherId}/>
                }
              </div>
            </div>
            <div className="teacher-subject">
              <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , margin: '10px 0' }}>
                <h3 className="sub-title-subject">Classes</h3>
                <button style={{display: 'flex' , alignItems: 'center' , gap: '4px', backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer' , fontSize: '12px' , color: 'white' , fontWeight: '500' , padding: '6px 10px' , border: 'none' }}>
                    <i className="bi bi-plus-lg" ></i>
                    <span>Add New Class</span>
                </button>
              </div>
              <div className="teacher-name">
                {
                  teacherClasses == 0  ?
                  <p
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    There are no classes yet ...
                  </p>: 
                  <TeacherClassesTable teacherId={teacherId} setSuccessDeleteFromClass={setSuccessDeleteFromClass}/>
                }
              </div>
            </div>

        </div>
      </>
    )

}

