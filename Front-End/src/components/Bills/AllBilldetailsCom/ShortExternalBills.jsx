import { useEffect, useState } from "react";
import { ShowBillCard } from "../ExternalPaysCom/ShowBillExternalDetails";
import DataServices from "../../../Data/dynamic/DataServices";
import { useNavigate } from "react-router-dom";


export default function ShortExternalBill() {

    const [testData,setTestData] = useState([]) 
    const gotoPreviousPage = useNavigate() 
    useEffect(() => {
        DataServices.ShowLasteExternalBill(6,'external').then( Bills => {
            setTestData(Bills)
        })
    },[])
    return (
        <div style={{marginBottom: '20px'}}>
            <h1 style={{fontSize: '20px'}}>Lastest <span style={{color: '#066599'}}>External</span> bills </h1>
            <div style={{borderRadius: '5px',backgroundColor: '#ddd' , overflow: 'hidden'}}>
                <div style={{padding: '10px', gap: '10px',display: 'grid' , gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))' }}>
                    {
                        testData.map( (bill,i) => {
                            if( i > 5 )return
                            return <ShowBillCard type={'show'} bill={bill}  />
                        })
                    }
                </div>
                <button onClick={()=> gotoPreviousPage('/ExternalPays')} style={{width: '100%' , border: 'none' , padding: '10px' , backgroundColor: '#066599' ,fontWeight: '400', color: 'white' , fontSize: '1.2em' , cursor: 'pointer'}}>show more</button>
            </div>
        </div>
    )
}