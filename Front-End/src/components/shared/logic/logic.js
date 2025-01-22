
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

export const openAsFullScreen = () => {

    const elem = document.getElementsByTagName('body')[0]

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

export const openAsNormalScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

export function separateTesetsAccordingToType(tests,quizAvg,examAvg) {

    const res = Object.groupBy(tests,({testType}) => {
        return testType?.toLowerCase() != 'quiz' ? 'exam' : 'quiz'
    })
    const quizRes = {Avg:quizAvg , tests: res.quiz}
    const examRes = {Avg:examAvg , tests: res.exam}

    return [quizRes,examRes]
}


export function getShortNumberFormat(number) {

    const numberFormat = { number : 0 , unit: ''}
    const digits = Math.ceil(Math.log10(( number < 0 ? -1 : +1 ) * number)) - 3 // remover the first digits
    const convertingNumber = number.toString()
    const Units = ['' , 'K' , 'M']

    for(let i = 0 ; i < 6 ; ++ i ) {            
        numberFormat.number = numberFormat.number + Math.pow(10, 5 - i ) * (+convertingNumber[i] || 0)
    }

    const currentUnit = Math.ceil(digits / 3)
    numberFormat.unit = Units[currentUnit]
    const dividedBy = 3 + (digits % 3 == 1 ? 2 : digits % 3 == 2 ? 1 : 0)
    numberFormat.number = (number < 0 ? -1 : +1 ) * (Number(`${numberFormat.number}1`) / Math.pow(10 , dividedBy + 1 )).toFixed(3) 
    
    return numberFormat 
}
