import { TestCardBody } from "../EmentsStyle";

export default function TestCard({form}) {
    const {date,testType,subject} = form
    return (
        <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , borderRadius: '5px' }}>
            <i className="bi bi-info-circle icon"></i>
            <TestCardBody>
                <h3 style={{color: '#066599' , fontSize: '18px'}}>Grade : <span style={{color: 'gray' , fontWeight: '500' , fontSize: '16px'}}>{subject.grade}</span> </h3>
                <h3 style={{color: '#066599' , fontSize: '18px'}}>Subject : <span style={{color: 'gray' , fontWeight: '500' , fontSize: '16px'}}>{subject.subject}</span> </h3>
                <h3 style={{color: '#066599' , fontSize: '18px'}}>Test Type : <span style={{color: 'gray' , fontWeight: '500' , fontSize: '16px'}}>{testType}</span> </h3>
                <h3 style={{color: '#066599' , fontSize: '18px'}}>Date : <span style={{color: 'gray' , fontWeight: '500' , fontSize: '16px'}}>{date}</span> </h3>
            </TestCardBody> 
        </div>
    )
}