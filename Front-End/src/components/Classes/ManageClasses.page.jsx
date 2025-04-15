/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import React, { useEffect, useRef, useState} from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ClassSetting from "./ManageClasses/ClassSetting";
import Notification from "../Global/Notification";
import Title from "../Global/Title";
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import SearchSubHeader from "../shared/SearchSubHeader";
import { useDispatch, useSelector } from "react-redux";
import { ManageClassesTEXT } from "../../Data/static/classes/ManageClass/ManageClassesTEXT";
import { CHANGE_CLASS_PAGE, CLASS_SECTION, MANAGE_CLASS_PAGE, SEARCH_INPUT_CLASS } from "../../Redux/actions/type";
import useScroolingTo from "../../hooks/shared/useScroolingTo";
import Loader from "../Modal/Loader";

export default function ManageClasses() {

  const {currentLange} = useSelector( state => state.language)
  const {grade : selectedGrade} = useSelector(state => state.grade)
  const {searchField , page ,lastClassClicked } = useSelector(state => state.classRd)
  const {successDeleteClassMES} = ManageClassesTEXT[currentLange]
  const [classes, setClasses] = useState([]);
  const [deleteClass, setDeleteClass] = useState(false);

  const [loading,setLoading] = useState(false)
  const goToSection = useRef(null)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(page != MANAGE_CLASS_PAGE ) {
      setSearchField('')
      dispatch({
        payload: '' ,
        type: CLASS_SECTION
      })
    }
  },[])

  function setSearchField(value) {
    dispatch({
      payload: value ,
      type: SEARCH_INPUT_CLASS
    })
    dispatch({
      payload: MANAGE_CLASS_PAGE ,
      type: CHANGE_CLASS_PAGE
    })
  }
  
  useEffect(() => {
    DataServices.showCalsses().then((classes) => {
      setClasses(classes)
    });
  }, [deleteClass])

  useScroolingTo(goToSection,setLoading)

  return (
    <>
      <Title title={window.location.pathname} />
      { loading && <Loader />}
      <Notification title={successDeleteClassMES} type={"success"} state={deleteClass} setState={setDeleteClass} />
      <div style={{display: 'flex' , alignItems: 'center',justifyContent: 'space-between'}}>
        <SubHeaderFilterClassByGrade />
        <SearchSubHeader filter={searchField} setFilter={setSearchField}/>
      </div>
      {
        classes.map((Class, index) => {
          return <div ref={Class?.classId == lastClassClicked ? goToSection : null }> 
            <ClassSettingMemo Class={Class} searchField={searchField} setDeleteClass={setDeleteClass} key={index} selectedGrade={selectedGrade} />
          </div> 
        })
      }
    </>
  );
}

const ClassSettingMemo = React.memo(({ Class,searchField, setDeleteClass , selectedGrade }) => {
  if( Class.grade?.toLowerCase() != selectedGrade?.grade?.toLowerCase()) return
  if( !Class.title?.toLowerCase().includes(searchField?.toLowerCase())) return
  return <ClassSetting ClassId={Class.classId} classTitle={Class.title} setDeleteClass={setDeleteClass} />;
});
