import { AgCharts } from 'ag-charts-react';


export default function SimpleHistogram({data}){
    // Chart Options: Control & configure the chart
    const chartOptions = {
        data : data.data,
        footnote: {
          text: data.title
        },
        series: [{
            fill: data?.fillColor,
            type: "bar",
            xKey: "title",
            yKey: "Average",
            label: {},
            tooltip: {
              renderer: ({ datum, yKey }) => {
                return { title: datum?.name != undefined ? datum?.name + '' + datum?.lastName : datum?.title , content: datum[yKey] };
              },
            },
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              text: "Class",
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              text: "Total Mark",
            },
          }
        ],
    };

    return (
        <AgCharts options={chartOptions} style={{direction: 'ltr'}}/>
    );
};
