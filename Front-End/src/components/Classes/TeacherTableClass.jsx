import { useTable , useRowSelect} from "react-table/dist/react-table.development";

export default function TeacherTableClass() {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
      } = useTable(
        {
          columns: columns,
          data: studentDetails,
        },
        useRowSelect
      );
    

    function removeStudentsFromClass() {
        return new Promise((resolve) => {
          selectedFlatRows.map((studentInfo, index) => {
            const student = studentInfo.original;
    
            const removeClassId = {
              ...student,
              class: null,
            };
            DataServices.UpdateStudent(removeClassId)
            if (index == selectedFlatRows.length - 1) {
              resolve();
            }
          });
        });
    }
    
    function handleRemoveClicked() {
        if (!SelectedRows()) {
          setChangeStudent(true);
          setTimeout(() => {
            setChangeStudent(false);
          }, 3000);
          return;
        }
    
        removeStudentsFromClass().then(() => {
          setSuccessRemoveStudent(true);
          setTimeout(() => {
            setSuccessRemoveStudent(false);
          }, 2000);
        });
    };

    return(
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{ padding: "10px", width: "100%" }}
        >
          <table {...getTableProps()}>
              <thead className="thead">
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                        className="thead-row"
                        >
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps()} key={index} style={theadThStyle}>
                            <span
                                style={{ marginLeft: "5px" }}
                                className="thead-cell"
                            >
                                {column.render("Header")}
                            </span>
                            </th>
                        ))}
                        </tr>
                    ))}
              </thead>
            <tbody {...getTableBodyProps()} style={{ backgroundColor: "white"}}>
              {rows.map((row, index) => {
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
        </div>
        <div className="btns-control">
          <button onClick={handleRemoveClicked}>Remove</button>
        </div>
      </div>
    )
}