/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useEffect, useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS";
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills";
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName";
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance";
import TablePaginated from "../../shared/TablePaginated";
import { useDispatch, useSelector } from "react-redux";
import { ManageStudentBillsTEXT } from "../../../Data/static/Bills/StudentsPaysCom/ManageStudentBillsTEXT";
import useGetStudentBillsByName from "../../../hooks/student_hooks/useGetStudentBillsByName";
import Notification from "../../Global/Notification";
import { ALL_STUDENTS_BILLS, S_BILL_CURRENT_PAGE, S_BILL_TOTAL_PAGES, S_DATA_ORIGIN, S_FILTER_STUDENTS_BY_CLASS, S_SEARCH_FILED, S_STUDENT_BILLS_BALANCE, SEARCHING_STUDENTS_BILLS } from "../../../Redux/actions/type";

export default function ShowBillStudentDetails() {

    
    const limitNumber = 12
    const chanegTheSelectedClass = useDispatch()
    const [sendRequest,setSendRequest] = useState(false)
    const {currentLange} = useSelector( state => state.language)
    const {notFoundMES} = ManageStudentBillsTEXT[currentLange]
    const {filterField ,studentsBills,searchField , currentPage , totalPage ,dataOrigin} = useSelector( state => state.showStudentBills )
    const [studentBills,notFoundMes,setNotFoundMes] = useGetStudentBillsByName(searchField,sendRequest)
    const {students : studentsBillsFiltered ,totalPages} = useGetStudentBills(filterField,limitNumber,currentPage,setCurrentPage)

    function changeCurrentState(studnetsBill,totalPages,dataOrigin) {
        chanegTheSelectedClass({
            payload: studnetsBill ,
            type: S_STUDENT_BILLS_BALANCE
        })
        chanegTheSelectedClass({
            payload: totalPages ,
            type: S_BILL_TOTAL_PAGES
        })
        chanegTheSelectedClass({
            payload: dataOrigin ,
            type: S_DATA_ORIGIN
        })
    }
    
    function setFileterByClass(value) {
        chanegTheSelectedClass({
            payload: value ,
            type: S_FILTER_STUDENTS_BY_CLASS
        })
    }

    function setCurrentPage(value) {
        chanegTheSelectedClass({
            payload: value ,
            type: S_BILL_CURRENT_PAGE
        })
    }

    function setSearchField(value) {
        chanegTheSelectedClass({
            type: S_SEARCH_FILED ,
            payload: value
        })
    }

    function handleSearchClicked() {
        setSendRequest(true)
        setTimeout(()=> setSendRequest(false),200)
    }

    useEffect(() => {

        if(studentsBillsFiltered?.length == 0 || studentsBillsFiltered == undefined ) return 

        if(studentsBills?.length == 0 ) {
            changeCurrentState(studentsBillsFiltered,totalPages,ALL_STUDENTS_BILLS)
            setCurrentPage(1)
            return 
        }

        if(dataOrigin == ALL_STUDENTS_BILLS && studentsBills.length != 0 ) {
            changeCurrentState(studentsBillsFiltered,totalPages,ALL_STUDENTS_BILLS)
            return 
        }
    
    },[currentPage,studentsBillsFiltered]) 

    useEffect(() => {
        // to advoid set undefine teachers when the user return from searching and the search input not empyt
        if(studentsBills?.length != 0 && searchField != '' && studentBills == null ) {
            return 
        }
        if(searchField != '' && studentBills?.length != 0 ) {
            changeCurrentState(studentBills,1,SEARCHING_STUDENTS_BILLS)
            setCurrentPage(1)
            return 
        }
        if(dataOrigin == SEARCHING_STUDENTS_BILLS && searchField == '' ) {
            changeCurrentState(studentsBillsFiltered,totalPages,ALL_STUDENTS_BILLS)
            setCurrentPage(1)
            return 
        }
    },[studentsBillsFiltered,searchField,studentBills]) 

    
    return (<>
            <Notification  title={notFoundMES} type={'error'} state ={notFoundMes} setState={setNotFoundMes} />
            <TablePaginated data={studentsBills || []} column={COLUMNS} search={{searchField,setSearchField,handleSearchClicked}} rowNumber={filterField != 'All' ? studentsBills?.length : limitNumber} setNextPageState={setCurrentPage} totalPages={totalPage} currPage={currentPage}  idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`} >
                {   
                    searchField === '' ? <>
                        <SubeHeaderFilterByClassName fileterByClass={filterField} setFileterByClass={setFileterByClass}/>
                        <SubHeaderClassBalance classId={filterField} />
                    </> : null 
                }
            </TablePaginated>
        </>
    )
}




