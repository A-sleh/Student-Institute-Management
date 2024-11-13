import { HeaderInformationStyle } from "./style/styleTag"

export default function HeaderInformation({data,title}) {

    const Color = ["#ffbc00","#229edb","#60ff00","ff0000","#0035ff"]

    return (
        <HeaderInformationStyle columnNumber={data.length}>
            <h3>{title}</h3>
            <section className="student-info-header" >
                {
                    data.map( (row,index) => {
                        const { title , icon , value } = row
                        return <InfoCard title={title} value={value} color={Color[index]} icon={icon}/>
                    })
                }
            </section>
        </HeaderInformationStyle>

    )
}


function InfoCard(props) {
    const {color , title , value ,icon } = props ;
    return (
        <div className="info-container" >
            <span className="border-left" style={{ backgroundColor: color }}></span>
            <i className={icon} style={{ color: color}} ></i>
            <main>
                <h4>{title}</h4>
                <span>{value}</span>
            </main>
        </div>
    );
}
