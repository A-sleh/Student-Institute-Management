import { useDispatch, useSelector } from "react-redux"
import { ARABIC, FULLSCREEN, UNFULLSCREEN } from "../../Redux/actions/type"
import DataServices from "../../Data/dynamic/DataServices"
import { openAsFullScreen, openAsNormalScreen } from "../shared/logic/logic"


export default function FullScreen() {

    const {currentLange} = useSelector( state => state.language)
    const {isFull} = useSelector( state => state.fullScreen)
    const changeFullScreenState = useDispatch()

    function handlFullScreenClicked() {

        DataServices.ChangeTheScreenStatus({fullScreen: !isFull ? 'no' : 'yes' })

        changeFullScreenState({
              payload: isFull ? false : true , 
              type: isFull ? UNFULLSCREEN  : FULLSCREEN
        })
        
        if( isFull ) openAsFullScreen()
        else openAsNormalScreen()
    }

    return(
        <>
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{currentLange == ARABIC ? ' عرض بملئ الشاشة : ': " Full Screen : "}</h3>
            <button onClick={() => handlFullScreenClicked()} style={{padding: '10px 25px',fontSize: '18px', borderRadius: '5px' , color: 'white' ,fontWeight: '900' , outline: 'none' , width: '100%',cursor: 'pointer', border: 'none' , backgroundColor: !isFull ? '#ff3b3b' : '#2ccf2c' }}>{currentLange == ARABIC ? !isFull ? 'إيقاف' : "تشغيل" : !isFull ? 'OFF' : "ON"}</button>
        </>
    )
}