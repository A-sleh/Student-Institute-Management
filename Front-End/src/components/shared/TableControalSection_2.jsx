import { TableControalSectionStyle } from "./style/tableTagsStyle";

export default function TableControalSection2(props) {
    const { totalPages, nextPage, previousPage, pageIndex  } = props
    

    return (
        <div style={{display: 'flex' , margin: '5px 0' ,position: 'absolute' , bottom: '0' , left: '50%' , transform: 'translateX(-50%)'}}>
            <button onClick={()=>previousPage()} style={{fontSize: '18px', border: 'none' , cursor: 'pointer' , color: '#066599', backgroundColor: 'transparent'}}>
                <i className="bi bi-caret-left-fill"></i>
            </button>
            <span style={{fontSize: '1em' , fontWeight: 'bold'}}>{pageIndex + 1} of {totalPages}</span>
            <button onClick={()=>{nextPage()}} style={{ fontSize: '18px',border: 'none' , cursor: 'pointer' , color: '#066599' , backgroundColor: 'transparent'}}>
                <i className="bi bi-caret-right-fill"></i>
            </button>
        </div>
    );
}
