/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import { HeaderFilterByClassStyle } from "../../Bills/style/styleComponents";
import DataServices from "../../../Data/dynamic/DataServices";

export default function SubeHeaderFilterByClassName({setFileterByClass,fileterByClass}) {

    const [allClasses,setAllClasses] = useState([]);
    
    useEffect(() => {
        DataServices.showCalsses().then( Classes => {
            setAllClasses(Classes.map( Class => {
                return {
                    classId : Class.classId ,
                    title : Class.title
                }
            }))
        })
    },[fileterByClass])

    return (            
        <HeaderFilterByClassStyle>
            <h3>Filter by class </h3>
            <select value={fileterByClass} onChange={(value) => setFileterByClass(value.target.value)}>
                <option value={'All'} >All</option>
                {allClasses.map((Class, index) => (
                    <option value={Class.classId} key={index} >
                    {Class.title}
                    </option>
                ))}
            </select>
        </HeaderFilterByClassStyle >
    )
}
