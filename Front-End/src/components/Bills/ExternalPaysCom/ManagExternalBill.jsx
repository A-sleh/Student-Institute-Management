import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices";
import { format } from "date-fns";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import DeleteModal from "../../Modal/DeleteModal"; 
import Notification from "../../Global/Notification";
import { ShowBillCard } from "./ShowBillExternalDetails";
import { SeacherInputHeader } from "../StudentsPaysCom/StudentBillDetails";

export default function ManagExternalBill() {

    const [inComeBills,setInComeBills] = useState([]) ; 
    const [outComeBills,setOutComeBills] = useState([]) ;
    const [successDelete,setSuccessDelete] = useState(false);
    const [openSearch,setOpenSearch] = useState(false)
    const [searchFiled,setSearchFiled] = useState('');
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })

    useEffect(() => {
        DataServices.ShowInComeBills().then( Bills => {
            if(inComeBills.length != Bills.length )
            setInComeBills(Bills)
        })
        DataServices.ShowOutComeBills().then( Bills => {
            if(outComeBills.length != Bills.length )
            setOutComeBills(Bills);
        })
    } , [successDelete])

    return (
        <>
            <Notification  title={'Bill Delelte'} type={'success'} state ={successDelete} setState={setSuccessDelete}/>
            {
                !openSearch ? <button onClick={()=>setOpenSearch(true)} style={{cursor:'pointer', padding: "3px 20px",margin: "0px 10px",border: "none",color: "white",
                    backgroundColor: "#066599",borderRadius: "2.4px",display: 'block',marginLeft: 'auto'}}
                >
                Search
                </button>
                 : <SeacherInputHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled}>
                    <button style={{cursor:'pointer', padding: "3px 20px",margin: "0px 10px",border: "none",color: "white",
                    backgroundColor: "red",borderRadius: "2.4px",display: 'block',marginLeft: 'auto'}} onClick={()=>{setOpenSearch(false);setSearchFiled('')}}
                    >
                        Close
                    </button>
                </SeacherInputHeader>

            }
            <div style={{marginBottom: '20px'}}> 
                <h3>In Come Bills</h3>
                <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px' , display: 'flex' , flexWrap: 'wrap' , gap: '10px'}}>
                    {
                        inComeBills.map( bill => {
                            return <ShowBillCard type={'manage'} bill={bill} setSuccessDelete={setSuccessDelete} />
                        })
                    }
                </div>
            </div>
            <div>
                <h3>Out Come Bills</h3>
                <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px' , display: 'flex' , flexWrap: 'wrap' , gap: '10px'}}>
                    {
                        outComeBills.map( bill => {
                            return <ShowBillCard type={'manage'} bill={bill}  setSuccessDelete={setSuccessDelete}/>
                        })
                    }
                </div>
            </div>
        </>
    )
}