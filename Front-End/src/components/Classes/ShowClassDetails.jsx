

export default function ShowClassDetails(props) {
    const {color , title , value ,icon } = props ;
  return (
    <div className="info-container" >
      <span
        className="border-left"
        style={{ backgroundColor: color }}
      ></span>
      <i
        className={icon}
        style={{ color: color}}
      ></i>
      <div>
        <h4>{title}</h4>
        <span>{value}</span>
      </div>
    </div>
  );
}
