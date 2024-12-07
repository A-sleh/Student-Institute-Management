import { AgCharts } from 'ag-charts-react';


export default function LineChart({data}){

    const dateFormatter = new Intl.DateTimeFormat("en-US");
    const tooltip = {
    renderer: ({ datum, xKey, yKey }) => ({
        content: `${dateFormatter.format(datum[xKey])}: ${datum[yKey]}`,
    }),
    };
    const chartOptions = {
        data : data,
        footnote: {
          text: 'students average reports'
        },
        series: [
            {
                type: "line",
                xKey: "date",
                yKey: "avg",
                tooltip,
            },
        ],
        axes: [
            {
              position: "bottom",
              type: "time",
              title: {
                text: "Date",
              },
              label: {
                format: "%b",
              },
            },
            {
              position: "left",
              type: "number",
              title: {
                text: "Max Average",
              },
            },
        ],
    };

    return (
        <AgCharts options={chartOptions} />
    );
};
