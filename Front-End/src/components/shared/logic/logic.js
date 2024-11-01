
export const successActionLogic = (setAction) => {
    setAction(true) 
    setTimeout(() => {
        setAction(false)
    } ,2000 )
}

export const errorActionLogic = (setAction) => {
    setAction(true) 
    setTimeout(() => {
        setAction(false)
    } , 3000 )
}