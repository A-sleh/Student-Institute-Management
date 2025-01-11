import { useDispatch, useSelector } from "react-redux"
import { ARABIC, FULLSCREEN, UNFULLSCREEN } from "../../Redux/actions/type"
import { useState } from "react"

export default function FullScreen() {

    const {currentLange} = useSelector( state => state.language)
    const {isFull} = useSelector( state => state.fullScreen)
    const changeFullScreenState = useDispatch()

    function open(elem) {
        if (document.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function close() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    function handlFullScreenClicked() {

        changeFullScreenState({
              payload: isFull ? false : true , 
              type: isFull? UNFULLSCREEN  : FULLSCREEN
        })
        
        const elem = document.getElementsByTagName('body')[0]

        if( isFull ) open(elem)
        else close()
    }

    return(
        <>
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{currentLange == ARABIC ? ' عرض بملئ الشاشة : ': " Full Screen : "}</h3>
            <button onClick={() => handlFullScreenClicked()} style={{padding: '10px 25px',fontSize: '18px', borderRadius: '5px' , color: 'white' ,fontWeight: '900' , outline: 'none' , width: '100%',cursor: 'pointer', border: 'none' , backgroundColor: !isFull ? '#ff3b3b' : '#2ccf2c' }}>{currentLange == ARABIC ? !isFull ? 'إيقاف' : "تشغيل" : !isFull ? 'OFF' : "ON"}</button>
        </>
    )
}