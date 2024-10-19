import { useState } from "react"
import ShowAllReport from "./ShowAllReports"

export default function LinkTestWithReport() {

    const [selectedReport,setSelectedReport] = useState({})
    

    return (
        <>
            <ShowAllReport selectedReport={selectedReport} setSelectedReport={setSelectedReport}/>
        </>
    )
}