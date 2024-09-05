import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import Title from "../../Global/Title";
import { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./teacherTable/Columns";
import DataServices from "../../../Data/dynamic/DataServices";
import { Link } from "react-router-dom";
import TableControalSection from "./teacherTable/TableControalSection";
import Notification from "../../Global/Notification";
import DeleteModal from "../../Modal/DeleteModal";
import TableHeader from "../../Students/TableStructuer/TableHeader";

export default function TeachersDetails() {

    
    
    const [teacherSubjects,setTeacherSubjects] = useState(new Map()) ;
    
    const [teachersDetails,setTeachersDetails] = useState([]) ;
    const [deleteModal, setDeleteModal] = useState(false);
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    const [currentStudentInfo, setCurrentStudentInfo] = useState({
        id: null,
        name: "",
    });

    useEffect(() => {
        DataServices.TeacherInformaion().then( teacherDetails => {
            setTeachersDetails(teacherDetails)
            getSubjectsNumber(teacherDetails).then( res => {
              console.log(res)
               setTeacherSubjects( res )
            }) ;
        })
    },[successDeleteTeacher])


    function getSubjectsNumber(teacherDetails) {
      return new Promise((resolve) => {

        let teacherSubjects = '' ;
        teacherDetails.map( (teacher) => {
          const teacherID = teacher.teacherId
          DataServices.ShowAllTeacherSubjects(teacherID).then( subjects => {
            teacherSubjects = teacherSubjects +  `${teacherID} :${subjects.length || 0} ,`
          })
          
        })
        resolve(teacherSubjects)
      })
    }

   // console.log(teacherSubjects.get(1))

    const column = useMemo(() => [
        ...COLUMNS ,
        {
            Header: 'Classes' ,
            accessor: '' ,
            Cell : () => {
              return 'hellos'
            }
        },
        {
            Header: 'Subjects' ,
            accessor: ''
        },
        {
            id: "selection",
            Header: "Action",
            Cell: ({ row }) => (
              <div
                style={{
                  justifyContent: "space-evenly",
                  display: "flex",
                  fontSize: "20px",
                  alignItems: "center",

                }}
              >
                <Link
                  to={`/TeacherInformation/${row.original.teacherId}`}
                  style={{ color: "gray", cursor: "pointer" }}
                >
                  <i className="bi bi-person-lines-fill"></i>
                </Link>
                <Link
                  to={`/UpdateTeacher/${row.original.id}?data=${encodeURIComponent(
                    JSON.stringify(row.original)
                  )}`}
                  style={{ color: "rgb(0 76 255 / 85%)", cursor: "pointer" }}
                >
                  <i className="bi bi-person-gear"></i>
                </Link>
                <Link
                  onClick={() => {
                    handleDleteClicked(row.original);
                  }}
                  style={{ color: "#ff0000d9", cursor: "pointer" }}
                >
                  <i className="bi bi-person-dash"></i>
                </Link>
              </div>
            ),
        },
    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        page,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        pageCount,
    } = useTable(
    {
        data: teachersDetails,
        columns: column,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
    );

    function handleDleteClicked(teacher) {
        setCurrentStudentInfo({
          name: `${teacher.name} ${teacher.lastName}`,
          id: teacher.teacherId,
        });
        setDeleteModal(true);
    }




    function subjectsNumber(teacher) {
      return new Promise( async (resolve) => {
        const teacherId = teacher.teacherId
        const data = await DataServices.ShowAllTeacherSubjects(teacherId) ; 
        resolve(data.length )
      })
    }

    const { globalFilter, pageIndex } = state;

    return(
        <>
            <Notification  title={'Delete Theacer'} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />
            {deleteModal && (
                <DeleteModal
                element={currentStudentInfo.name}
                type={"Teacher"}
                id={currentStudentInfo.id}
                setDeleteModal={setDeleteModal}
                setSuccessDelete={setSuccessDeleteTeacher}
                />
            )}
            <Title title={window.location.pathname} /> 
            <TableHeader  filter={globalFilter} setFilter={setGlobalFilter} teachersNumber={teachersDetails?.length}/>
            <table {...getTableProps()}>
                <thead >
                    {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            key={index}
                        >
                            {column.isSorted ? (
                            <span style={{ fontSize: "12px" }}>
                                {" "}
                                {!column.isSortedDesc ? (
                                <i className="bi bi-arrow-up"></i>
                                ) : (
                                <i className="bi bi-arrow-down"></i>
                                )}{" "}
                            </span>
                            ) : (
                            <i
                                className="bi bi-arrow-up"
                                style={{ opacity: "0" }}
                            ></i>
                            )}
                            <span style={{ marginLeft: "5px" }}>
                            {column.render("Header")}
                            </span>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => (
                            <td {...cell.getCellProps()} key={index}>
                            {cell.render("Cell")}
                            </td>
                        ))}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
            <TableControalSection  pageCount={pageCount} nextPage={nextPage} previousPage={previousPage} canNextPage={canNextPage}
                canPreviousPage={canPreviousPage} pageIndex={pageIndex} gotoPage={gotoPage} 
            />
        </>
    )
}