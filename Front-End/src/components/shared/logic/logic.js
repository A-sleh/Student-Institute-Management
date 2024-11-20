
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

export function separateTesetsAccordingToType(tests,quizAvg,examAvg) {

    const res = Object.groupBy(tests,({testType}) => {
        return testType.toLowerCase() != 'quiz' ? 'exam' : 'quiz'
    })
    const quizRes = {Avg:quizAvg , tests: res.quiz}
    const examRes = {Avg:examAvg , tests: res.exam}

    return [quizRes,examRes]
}