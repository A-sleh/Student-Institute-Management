import "./Global.css";

export default function Notification({ title, type, state , setState}) {
  const lable =
    type == "error" ? (
      <>
      <i className="bi bi-exclamation-triangle-fill" style={{color: 'red' , fontSize: '18px' , lineHeight: '30px'}}></i> 
      <span style={{fontWeight: 'bold', color: 'red' }} >Error!</span>
      </>
    ) : (
      <>
      <i className="bi bi-check-circle-fill" style={{color: '#0ee90ecc' , fontSize: '18px' , lineHeight: '30px'}}></i>
      <span style={{fontWeight: 'bold' , color: '#0ee90ecc'}}>Success!</span>
      </>
    );
  return (
    <div
      className={"notification " + type}
      style={{
        transform: state ? "scaleX(1)" : `scaleX(0) `,
        transformOrigin: state ? "left" : "right",
        width: '25em' ,
        display: 'flex',
        justifyContent: 'space-between' ,
        alignItems: 'center'
      }}
    >
      <div style={{display: 'flex' , alignItems: 'center' , gap: '5px'}}>
      {lable}<span style={{fontWeight: '600' , fontSize: '14px' , alignSelf: 'top'}}>{title}</span>
      </div>
      <i className="bi bi-x" style={{fontWeight: 'bold' ,fontSize: '20px' , cursor: 'pointer'}} onClick={() =>{setState(false)}}></i>
    </div>
  );
}
