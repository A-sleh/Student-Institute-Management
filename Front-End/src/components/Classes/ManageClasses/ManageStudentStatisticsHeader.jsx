/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
export default function ManageStudentStatisticsHeader(props) {

    const { capacity, selectedFlatRows, currentStudents, allStudentsWithSelected, } = props

    return (
        <h3 style={{display: "flex",flexWrap: 'wrap', justifyContent: "space-around",alignItems: "center",margin: "20px 0",backgroundColor: '#066599',borderRadius: "5px",position: 'relative',padding: '20px 10px 5px 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.2em',fontWeight: '400'}}>
            <span> Class Capacity : <b>{capacity}</b> </span>
            <span> You Can Select <b>{allStudentsWithSelected}</b> Students Just </span>
            <span> Number Of Seleted Student <b>{selectedFlatRows.length}</b> </span>
            <span> Number Of Students In a Class <b>{currentStudents}</b> </span>
        </h3>
    );
}



