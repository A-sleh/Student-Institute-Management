import { AgCharts } from 'ag-charts-react';


export default function SimpleFunnel({data}){
    
    const chartOptions = {
        data : [
            { group: "Leads Generated", value: 10000 },
            { group: "Contacted", value: 8000 },
            { group: "Qualified Leads", value: 6000 },
            { group: "Proposal Sent", value: 4500 },
            { group: "Negotiation", value: 3000 },
            { group: "Closed Won", value: 1500 },
        ],
        footnote: {
            text: data.title
        },
        series: [{
            type: "funnel",
            stageKey: "group",
            valueKey: "value",
            spacingRatio: 0.3,
            stageLabel: {
              enabled: false,
            },
            label: {
              formatter({ value }) {
                return value.toLocaleString();
              },
            },
        }]
    };

    return (
        <AgCharts options={chartOptions} />
    );
};
