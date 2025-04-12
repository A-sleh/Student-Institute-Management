
import { useLayoutEffect } from "react"

export default function useScroolingTo(section,setLoader) {
    
    useLayoutEffect(() => {
        setLoader(true)
        setTimeout(() =>{
            setLoader(false)
            window.scrollTo({
                behavior: 'smooth',
                top: section.current?.offsetTop - 100 
            })
        }, 1500)
    },[section])

}