
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeachersBills(limit,page,setPage,searchKey,pass) {
    
    const [teachers,setTeachers] = useState([]) 
    const [resSet,setReset] = useState(-100000)
    const [teachersBills,setTeachersBills] = useState([])

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
    
        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  {    
            setTeachers({teachers:teachers,currPage:1,totalPages:1})
        }) 
    },[searchKey,pass]);

    useEffect( () => {
        // reset teacher array when the search field is empty
        if(searchKey == '' ) {
            setReset(last => last + 1)
            setPage(1)
        }
    },[searchKey]);

    useEffect(() => {
        getAllTeachersBills(teachers.teachers).then( result => {
            setTeachersBills({...teachers,teachers: result})
        })
    },[teachers])    

    return teachersBills
}