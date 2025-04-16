
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"
import { ALL_TEACHER, SEARCHING_TEACHER } from "../../Redux/actions/type"

export default function useGetTeachersBills(props,limit,page,setPage,searchKey,pass) {
    
    const [teachers,setTeachers] = useState([]) 
    const [resSet,setReset] = useState(-100000)
    const [teachersBills,setTeachersBills] = useState(props.teachersBills || [] )
    const skipFirstState = useRef(-2)

    async function getAllTeachersBills(teachers) {
        let teachersDetails = []
        if(teachers == undefined) return teachersDetails
        if(teachers.length == 0  ) return teachersDetails
        return new Promise(resolve => {
                    teachers.map( async (teacher) => {

                    const teacherBills = await DataServices.ShowTeacherBillBalanc(teacher.teacherId)
                    teachersDetails.push({...teacher ,...teacherBills})

                    if(teachersDetails.length == teachers.length ) {
                        resolve(teachersDetails)
                    }
                })
        })
    }

    useEffect(() => {
        
        if(searchKey != '' && props.dataOrigin != ALL_TEACHER ) return 
        if(props.dataOrigin != ALL_TEACHER ) props.setDataOrigin(ALL_TEACHER)
        DataServices.TeacherInformaion('',limit,page).then( teachers  => {
            setTeachers({...teachers,teachers:teachers.teachers.map( teacher => {
                return {
                    teacherId : teacher.teacherId , 
                    name : teacher.name , 
                    lastName : teacher.lastName, 
                }
            })})
        })
    }, [page,resSet])

     useEffect( () => {
    
        if(searchKey == '' || searchKey == undefined  || !pass || (skipFirstState.current++ < 0) ) return 
        if(props.dataOrigin != SEARCHING_TEACHER ) props.setDataOrigin(SEARCHING_TEACHER)
        DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  { 
            setTeachers({teachers:teachers,currPage:1,totalPages:1})
        }) 
    },[searchKey,pass]);

    useEffect( () => {
        if(skipFirstState.current++ < 0) return 
        // reset teacher array when the search field is empty
        if(searchKey == '' ) {
            setReset(last => last + 1)
            setPage(1)
        }
    },[searchKey]);

    useEffect(() => {

        if(skipFirstState.current++ < 0) return 

        getAllTeachersBills(teachers.teachers).then( result => {
            setTeachersBills({...teachers,teachers: result})
        })
    },[teachers])    

    return teachersBills
}