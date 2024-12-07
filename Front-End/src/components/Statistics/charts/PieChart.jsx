import { AgCharts } from 'ag-charts-react';


export default function PieChart({data}){
    // Chart Options: Control & configure the chart
    const chartOptions = {
        data : data?.data,
        footnote: {
            text: data.title
        },
        series: [{ 
            type: 'pie' ,
            angleKey: data.angleKey,
            calloutLabelKey: data.calloutLabelKey,
            sectorLabelKey: data.sectorLabelKey,
            sectorLabel: {
                color: "white",
                fontWeight: "500",
            },

        }],
    };

    return (
        <AgCharts options={chartOptions} />
    );
};
