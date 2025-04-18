/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useEffect, useRef, useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS" 
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills"
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName"
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance"
import TablePaginated from "../../shared/TablePaginated"
import { useDispatch, useSelector } from "react-redux"
import { ALL_STUDENTS_BILLS, M_BILL_CURRENT_PAGE, M_BILL_TOTAL_PAGES, M_DATA_ORIGIN, M_FILTER_STUDENTS_BY_CLASS, M_SEARCH_FILED, M_STUDENT_BILLS_BALANCE, SEARCHING_STUDENTS_BILLS } from "../../../Redux/actions/type"
import useGetStudentBillsByName from "../../../hooks/student_hooks/useGetStudentBillsByName"
import Notification from "../../Global/Notification"
import { ManageStudentBillsTEXT } from "../../../Data/static/Bills/StudentsPaysCom/ManageStudentBillsTEXT"
import useSyncDataLogin from "../../../hooks/shared/useSyncDataLogin"
import useSyncSearchingData from "../../../hooks/shared/useSyncSearchingData"


export default function ManagStudentBill() {

    const limitNumber = 12
    const chanegTheSelectedClass = useDispatch()
    const [sendRequest,setSendRequest] = useState(false)
    const {currentLange} = useSelector( state => state.language)
    const {notFoundMES} = ManageStudentBillsTEXT[currentLange]
    const {filterField ,studentsBills,searchField , currentPage , totalPage ,dataOrigin} = useSelector( state => state.studentsBill )
    const [studentBills,notFoundMes,setNotFoundMes] = useGetStudentBillsByName(searchField,sendRequest)
    const {students : studentsBillsFiltered ,totalPages} = useGetStudentBills(filterField,limitNumber,currentPage,setCurrentPage)

    function changeCurrentState(studnetsBill,totalPages,dataOrigin) {
        chanegTheSelectedClass({
            payload: studnetsBill ,
            type: M_STUDENT_BILLS_BALANCE
        })
        chanegTheSelectedClass({
            payload: totalPages ,
            type: M_BILL_TOTAL_PAGES
        })
        chanegTheSelectedClass({
            payload: dataOrigin ,
            type: M_DATA_ORIGIN
        })
    }
    
    function setFileterByClass(value) {
        chanegTheSelectedClass({
            payload: value ,
            type: M_FILTER_STUDENTS_BY_CLASS
        })
    }

    function setCurrentPage(value) {
        chanegTheSelectedClass({
            payload: value ,
            type: M_BILL_CURRENT_PAGE
        })
    }

    function setSearchField(value) {
        chanegTheSelectedClass({
            type: M_SEARCH_FILED ,
            payload: value
        })
    }

    function handleSearchClicked() {
        setSendRequest(true)
        setTimeout(()=> setSendRequest(false),200)
    }


    useSyncDataLogin(studentsBillsFiltered,studentsBills,totalPages,currentPage,setCurrentPage,changeCurrentState,{dataOrigin:dataOrigin,oringinAction:ALL_STUDENTS_BILLS})
    useSyncSearchingData(studentsBillsFiltered,studentBills,studentsBills,totalPages,searchField,setCurrentPage,changeCurrentState,{
        dataOrigin: dataOrigin , originAll: ALL_STUDENTS_BILLS , oringinSearch: SEARCHING_STUDENTS_BILLS
    })
    
    return (
        <>
            <Notification  title={notFoundMES} type={'error'} state ={notFoundMes} setState={setNotFoundMes} />
            <TablePaginated data={studentsBills || []} column={COLUMNS} search={{searchField,setSearchField,handleSearchClicked}}rowNumber={filterField != 'All' ? studentsBills?.length : limitNumber} setNextPageState={setCurrentPage} totalPages={totalPage} currPage={currentPage}  idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`} specialState='manage'>
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
