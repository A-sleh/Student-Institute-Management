import { AgCharts } from 'ag-charts-react';
import { format } from 'date-fns';


export default function SimpleHorizontalBar({data}){
    // Chart Options: Control & configure the chart
    const chartOptions = {
        data : data.data,
        footnote: {
            text: data.title
        },
        series: [{
            fill : data?.color ,
            type: "bar",
            direction: "horizontal",
            xKey: "type",
            yKey: "value",
            label:{}
          },
        ],
        axes: [
          {
            type: "category",
            position: data?.direction || "left",
          },
          {
            type: "number",
            position: "bottom",
          }],
    };
      
    return (
        <AgCharts options={chartOptions} style={{direction: 'ltr'}}/>
    );
};
