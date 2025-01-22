import { AgCharts } from 'ag-charts-react';


export default function SimpleDonut({data}){
    // Chart Options: Control & configure the chart
    const numFormatter = new Intl.NumberFormat("en-US");
    
    const chartOptions = {
        data : data.data,
        // footnote: {
        //     text: data.title
        // },
        series: [ 
          {
            type: "donut",
            calloutLabelKey: "type",
            angleKey: "count",
            sectorLabelKey: "count",
            calloutLabel: {
              enabled: false,
            },
            sectorLabel: {
              formatter: ({ datum, sectorLabelKey }) => {
                const value = datum[sectorLabelKey];
                return numFormatter.format(value);
              },
            },
            title: {
              text: "Annual Count",
            },
            innerRadiusRatio: 0.7,
            innerLabels: [
              {
                text: (data.balance) + data.unit,
                fontSize: 24,
              },
              {
                text: "Balance",
                fontSize: 16,
                spacing: 10,
              },
            ],
            tooltip: {
              renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
                return {
                  title,
                  content: `${datum[calloutLabelKey]}: ${numFormatter.format(datum[sectorLabelKey])}`,
                };
              },
            },
            sectorSpacing: 3,
          }],
    };

    return (
        <AgCharts options={chartOptions} style={{direction: 'ltr'}}/>
    );
};
