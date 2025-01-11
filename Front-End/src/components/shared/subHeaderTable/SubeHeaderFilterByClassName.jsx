/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useState } from "react";
import { HeaderFilterByClassStyle } from "../../Bills/style/styleComponents";
import DataServices from "../../../Data/dynamic/DataServices";
import { useSelector } from "react-redux";
import { SubeHeaderFilterByClassNameTEXT } from "../../../Data/static/subHeaderTable/subHeaderTableTEXT";

export default function SubeHeaderFilterByClassName({setFileterByClass,fileterByClass}) {

    const {currentLange} = useSelector( state => state.language)
    const {filterByClassTitle ,allType} = SubeHeaderFilterByClassNameTEXT[currentLange]
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
            <h3>{filterByClassTitle}</h3>
            <select value={fileterByClass} onChange={(value) => setFileterByClass(value.target.value)}>
                <option value={'All'} >{allType}</option>
                {allClasses.map((Class, index) => (
                    <option value={Class.classId} key={index} >
                    {Class.title}
                    </option>
                ))}
            </select>
        </HeaderFilterByClassStyle >
    )
}
