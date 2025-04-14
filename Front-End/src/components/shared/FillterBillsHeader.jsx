import { useSelector } from "react-redux";
import { ARABIC } from "../../Redux/actions/type";

export function FillterBillsHeader({radioState,setRadioState,searchFiled,setSearchFiled,children}) {

    const {currentLange} = useSelector( state => state.language)
    
    function handleRadioClicked(value) {
        const current = value.innerHTML ;
        setRadioState({
            billNo: current == 'Bill Number' || current ==  "رقم الفاتوره" , 
            date: current == 'Bill Date' || current ==  "تاريخ الفاتوره",
            note : current == 'Bill Note' || current ==  "ملاحظه الفاتوره"
        })
    }

    function handlePlaceHolder() {
        if(radioState.billNo) {
            return currentLange == ARABIC ? "رقم الفاتوره": 'bill number ...'
        }else if(radioState.date) {
            return currentLange == ARABIC ? "تاريخ الفاتوره": 'date ...'
        }else {
            return currentLange == ARABIC ? 'ملاحظه الفاتوره': 'note ...'
        }
    }
    
    return (
        <div style={{marginBottom: '20px' , backgroundColor:'white' , padding: '10px 0' , direction: currentLange == ARABIC ? 'rtl': 'ltr'}}>
            <div style={{display: 'flex' ,justifyContent: 'space-between' , alignItems: 'center'}}>
                <h4 style={{marginBottom: '5px'}}>{currentLange == ARABIC ? 'بحث على حسب': 'Seacher by'}</h4>
                <div>{children}</div>
            </div>
            <form >
                <div style={{display: 'flex' , gap: '10px' , alignItems: 'center' , fontWeight: '600' , marginBottom: '6px'}}>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'billNo'} style={{borderRadius : '5px',backgroundColor: radioState.billNo ? '#056699' : 'transparent' , color: radioState.billNo ? 'white' : 'black' ,  fontWeight : '400' , padding: '5px 10px', cursor: 'pointer' , fontSize: '14px'}}>
                        { currentLange == ARABIC ? "رقم الفاتوره": 'Bill Number'}    
                    </label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'note'} style={{borderRadius : '5px',backgroundColor: radioState.note ? '#056699' : 'transparent' , color: radioState.note ? 'white' : 'black' ,  fontWeight : '400', padding: '5px 10px' , cursor: 'pointer' , fontSize: '14px'}}>
                        { currentLange == ARABIC ? "ملاحظه الفاتوره": 'Bill Note'}    
                    </label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} valuse={'date'} style={{borderRadius : '5px',backgroundColor: radioState.date ? '#056699' : 'transparent' , color: radioState.date ? 'white' : 'black' , fontWeight : '400', padding: '5px 10px' , cursor: 'pointer' , fontSize: '14px'}}>
                        { currentLange == ARABIC ? "تاريخ الفاتوره": 'Bill Date'} 
                    </label>
                </div>
                <input
                    type={radioState.date ? 'date': 'search'}
                    style={{ backgroundColor: "#ddd", fontWeight: "500", color: "gray", padding: '10px', width:'100%', outline: 'none' , border: 'none'}}
                    placeholder={ (currentLange == ARABIC ? "بحث حسب ": 'search ')  + handlePlaceHolder() }
                    value={searchFiled || ''}
                    onChange={(e) => {setSearchFiled(e.target.value)}}
                />
            </form>
        </div>
    )
}