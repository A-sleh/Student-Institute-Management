
export function FillterBillsHeader({radioState,setRadioState,searchFiled,setSearchFiled,children}) {
    
    function handleRadioClicked(value) {
        const current = value.innerHTML ;
        setRadioState({
            billNo: current == 'Bill Number' , 
            date: current == 'Date',
            note : current == 'Note'
        })
    }

    function handlePlaceHolder() {
        if(radioState.billNo) {
            return 'bill number ...'
        }else if(radioState.date) {
            return 'date ...'
        }else {
            return 'note ...'
        }
    }
    
    return (
        <div style={{marginBottom: '20px' , backgroundColor:'white' , padding: '10px 0'}}>
            <div style={{display: 'flex' ,justifyContent: 'space-between' , alignItems: 'center'}}>
                <h4 style={{marginBottom: '5px'}}>Seacher by</h4>
                {children}
            </div>
            <form >
                <div style={{display: 'flex' , gap: '10px' , alignItems: 'center' , fontWeight: '600' }}>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'billNo'} style={{fontWeight : radioState.billNo ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Bill Number</label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'note'} style={{fontWeight : radioState.note ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Note</label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} valuse={'date'} style={{fontWeight : radioState.date ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Date</label>
                </div>
                
                <input
                    type="search"
                    style={{ backgroundColor: "#ddd", fontWeight: "500", color: "gray", padding: '10px', width:'100%', outline: 'none' , border: 'none'}}
                    placeholder={'Search ' + handlePlaceHolder() }
                    value={searchFiled || ''}
                    onChange={(e) => {setSearchFiled(e.target.value)}}
                />
            </form>
        </div>
    )
}