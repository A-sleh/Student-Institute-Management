import { useSelector } from "react-redux";
import { InsertNewStudentTEXT } from "../../../Data/static/classes/ManageClass/InsertNewStudentTEXT";

/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
export default function ManageStudentStatisticsHeader(props) {

    const {currentLange} = useSelector( state => state.language)
    const {classCapacity , numberOfSelectedStudentTEXT ,numberOfStudentsInAClassTEXT ,selectionStudent} = InsertNewStudentTEXT[currentLange]
    const { capacity, selectedFlatRows, currentStudents, allStudentsWithSelected, } = props

    return (
        <h3 style={{display: "flex",flexWrap: 'wrap', justifyContent: "space-around",alignItems: "center",margin: "20px 0",backgroundColor: '#066599',borderRadius: "5px",position: 'relative',padding: '20px 10px 5px 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.2em',fontWeight: '400'}}>
            <span> {classCapacity} : <b> {capacity}</b> </span>
            <span> {selectionStudent.sub1} <b>{allStudentsWithSelected}</b> {selectionStudent.sub2} </span>
            <span> {numberOfSelectedStudentTEXT} <b> {selectedFlatRows.length}</b> </span>
            <span>{numberOfStudentsInAClassTEXT} <b> {currentStudents}</b> </span>
        </h3>
    );
}



