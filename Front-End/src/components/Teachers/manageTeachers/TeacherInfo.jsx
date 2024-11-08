import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import '../teacher.css'
import ShowClassDetails from "../../Classes/ShowClassDetails";
import TeacherSubjectsTable from "./TeacherSubjectsTable";
import TeacherClassesTable from "./TeacherClassesTable";
import Notification from "../../Global/Notification";
import TeacherForm from "../newTeacher/TeacherForm";
import DeleteModal from "../../Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { addSpacesBetweenDigits } from "../teacherInformation/TeacherInfo";
// import { HeaderControal } from "../../Bills/TeacherPaysCom/ShowBillTeacherDetails";
import addSpaceBetweenDigit from "../../Global/globalStyle";


export default function Teacherinfo({teacherId,setSuccessDeleteTeacher}) {

    const changePageTo = useNavigate() ;
    const [totalSalary,setTotalSalary] = useState(0)
    const [successUpdataTeacher,setSuccessUpdataTeacher] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false);
    const [teacherInfo,setTeacherInfo] = useState({})
    const [teacherClasses,setTeacherClasses] = useState([])
    const [successDeleteFromSubject,setSuccessDeleteFromSubject] = useState(false)
    const [successDeleteFromClass,setSuccessDeleteFromClass] = useState(false)
    const [updataButtonClicked ,setUpdataButtonClicked] = useState(false)
    const [NotDeletTeacher, setNotDeleteTeacher] = useState(false);
    const [currentTeacherInfo, setCurrentTeacherInfo] = useState({
      id: null,
      name: "",
  });

    useEffect(() => {
        DataServices.TeacherInformaion(teacherId).then( teacherDetails => {
            setTeacherInfo(teacherDetails)
        })
        DataServices.ShowTeacherClass(teacherId).then( classes => {
            let classesNumber = 0 ;
            classes.map( Class => {
              classesNumber += Class.classes.length - ( Class.classes[0] == null )
            })
            setTeacherClasses(classesNumber)
        })
        DataServices.ShowTeacherBillBalanc(teacherId).then( salary => {
          setTotalSalary(salary)
        })

    } ,[successDeleteFromSubject,successDeleteFromClass,successUpdataTeacher])



    const { name , lastName , phone , teacherSubjects } = teacherInfo
    
    function handleUpdataButtonClicked() {
      setUpdataButtonClicked(true)
    }

    function handleDeleteClicked() {
      setCurrentTeacherInfo({
        name: `${teacherInfo.name} ${teacherInfo.lastName}`,
        id: teacherInfo.teacherId,
      });
      setDeleteModal(true);
    }

    return(
      <>
        <Notification title={'Delete Teacher From Class'} type={'success'} state ={successDeleteFromClass} setState={setSuccessDeleteFromClass}/>
        <Notification title={'Delete Teacher Subject'} type={'success'} state ={successDeleteFromSubject} setState={setSuccessDeleteFromSubject}/>
        <Notification title={'Updata Teacher Details'} type={'success'} state ={successUpdataTeacher} setState={setSuccessUpdataTeacher}/>
        <Notification  title={'Teacher is teaching in one of the classes.'} type={'error'} state ={NotDeletTeacher} setState={setNotDeleteTeacher} />
        {deleteModal && (
                <DeleteModal
                element={currentTeacherInfo.name}
                type={"Teacher"}
                id={currentTeacherInfo.id}
                setDeleteModal={setDeleteModal}
                setSuccessDelete={setSuccessDeleteTeacher}
                setUnSuccessDelete={setNotDeleteTeacher}
                />
            )}
        {   
          updataButtonClicked  ? <TeacherForm initialSatate={teacherInfo} type={'PUT'} setSuccessAction={setSuccessUpdataTeacher} setUpdataBtnClicked={setUpdataButtonClicked} />
          : 
          <div style={{ padding : '10px 20px' , margin: '2em 0' , backgroundColor: '#ffffff' , boxShadow: '0 0 11px -5px gray' , borderRadius: '5px'}}>
            <div className="header" style={{display: 'flex' , justifyContent: 'space-between' , alignItems : 'center' , padding : '0 5px' , marginBottom: '15px'}}>
                <h1 style={{fontWeight: '500' , fontSize: '20px' , margin: '5px 0' , textTransform: 'uppercase'}}>{name} {lastName}</h1>
                <div className="btns-controle">
                    <button onClick={()=>{handleUpdataButtonClicked()}}style={{padding: '3px 15px' , color: 'white' , marginRight: '5px', fontSize: '12px' , cursor: 'pointer' , border: 'none' , outline: 'none' , borderRadius: '3px' , backgroundColor: '#066599'}}>Update</button>
                    <button onClick={()=>{handleDeleteClicked()}} style={{padding: '3px 15px' , color: 'white' , fontSize: '12px' , cursor: 'pointer' , border: 'none' , outline: 'none' , borderRadius: '3px' , backgroundColor: 'red'}}>Delete</button>
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
                    <ShowClassDetails
                        title={"Total Salary"}
                        value={addSpaceBetweenDigit(totalSalary.total)}
                        color={"#ff0000"}
                        icon={"bi bi-cash-coin"}
                    />
                    <ShowClassDetails
                        title={"Remaining Salary"}
                        value={addSpaceBetweenDigit(totalSalary.required) }
                        color={"#0035ff"}
                        icon={"bi bi-coin"}
                    />
                </div>
            </div>
            <div className="teacher-subject">
              <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , margin: '10px 0' }}>
                <h3 className="sub-title-subject">Subjects</h3>
                <button style={{display: 'flex' , alignItems: 'center' , gap: '4px', backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer' , fontSize: '12px' , color: 'white' , fontWeight: '500' , padding: '6px 10px' , border: 'none' }}>
                    <i className="bi bi-plus-lg" ></i>
                    <span onClick={()=>{changePageTo(`TeacherNewSubject/` + teacherId )}}>Add New Subject</span>
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
                    There are no subjects yet ...
                  </p>: 
                  <TeacherSubjectsTable teacherId={teacherId} setSuccessDeleteFromSubject={setSuccessDeleteFromSubject} successDeleteFromSubject={successDeleteFromSubject}/>
                }
              </div>
            </div>
            <div className="teacher-subject">
              <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , margin: '10px 0' }}>
                <h3 className="sub-title-subject">Classes</h3>
                <button style={{display: 'flex' , alignItems: 'center' , gap: '4px', backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer' , fontSize: '12px' , color: 'white' , fontWeight: '500' , padding: '6px 10px' , border: 'none' }}>
                    <i className="bi bi-plus-lg" ></i>
                    <span onClick={()=>{changePageTo(`TeacherNewClass/` + teacherId )}}>Add New Class</span>
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
                  <TeacherClassesTable teacherId={teacherId} successDeleteFromClass={successDeleteFromClass}setSuccessDeleteFromClass={setSuccessDeleteFromClass}/>
                }
              </div>
            </div>

          </div>
        }
      </>
    )
}


