import { AgCharts } from 'ag-charts-react';


export default function SimpleHorizontalBar({data}){
    // Chart Options: Control & configure the chart
    const chartOptions = {
        data : data.data,
        footnote: {
            text: data.title
        },
        fill : data?.color ,
        series: [{
            type: "bar",
            direction: "horizontal",
            xKey: "type",
            yKey: "value",
            cornerRadius: 4,
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
        <AgCharts options={chartOptions} />
    );
};
