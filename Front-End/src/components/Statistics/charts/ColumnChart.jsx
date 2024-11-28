import CanvasJSReact from '@canvasjs/react-charts';
import { HiddenCopyRightLinkStyle } from '../services/style';

const  CanvasJS = CanvasJSReact.CanvasJS;
const  CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export default function SimpleChar ({data}) {
    
    

    const options = {
        animationEnabled: true,
        exportEnabled: false,
        theme: "light1", //"light1", "dark1", "dark2"
        title:{
            text: data?.title
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: data?.chartType || "pie", //change type to bar, line, area, pie, etc
            // indexLabel: data?.columnTitle , //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: data?.points ||  [
                { x: 10, y: 71 },
                { x: 20, y: 55 },
                { x: 30, y: 50 },
                { x: 40, y: 65 },
                { x: 50, y: 71 },
                { x: 60, y: 68 },
                { x: 70, y: 38 },
                { x: 80, y: 92, indexLabel: "Highest" },
                { x: 90, y: 54 },
                { x: 100, y: 60 },
                { x: 110, y: 21 },
                { x: 120, y: 49 },
                { x: 130, y: 36 },
            ]
        }]
    }
		
    return (
        <HiddenCopyRightLinkStyle >
            <CanvasJSChart options = {options} containerProps={{ width: '100%', height: '300px' }} />    
        </HiddenCopyRightLinkStyle>
    );
	
}
 
