import { AgCharts } from 'ag-charts-react';


export default function GroupedHorizontalBar({data}){
    // Chart Options: Control & configure the chart
    const chartOptions = {
        data : data.data,
        footnote : {
          text: data.title
        },
        series: [{
            type: "bar",
            direction: "horizontal",
            xKey: "month",
            yKey: "balance",
            yName: "Balance",
            cornerRadius: 20,
            
            label: {
              formatter: (data) => `${parseFloat(data.datum['balance']) + data.datum['unit']}`,
              padding: 100000,
            },
          },
          {
            type: "bar",
            direction: "horizontal",
            xKey: "month",
            yKey: "percent",
            yName: "Percent",
            cornerRadius: 20,
            label: {
              formatter: (data) => {
                return parseFloat(data.datum['balance'])
              }
              ,
            },
          },
        ],
        axes: [
          {
            type: "category",
            position: "left",
            line: {
              enabled: false,
            },
            label: {
              enabled: false,
            },
            
            paddingInner: 0.1,
            crossLines: [
              {
                type: "line",
                value: "Jan",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "→ JAN",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "Feb",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "→ FEB",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "Mar",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "→ MAR",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "Apr",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "→ APR",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "May",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "MAY ←",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "Jun",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "JUN ←",
                  position: "insideRight",
                },
              },
              {
                type: "line",
                value: "Jul",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "JUL ←",
                  position: "insideLeft",
                },
              },
              {
                type: "line",
                value: "Aug",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "AUG ←",
                  position: "insideLeft",
                },
              },
              {
                type: "line",
                value: "Sep",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "SEP ←",
                  position: "insideLeft",
                },
              },
              {
                type: "line",
                value: "Oct",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "OCT ←",
                  position: "insideLeft",
                },
              },
              {
                type: "line",
                value: "Nov",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "NOV ←",
                  position: "insideLeft",
                },
              },
              {
                type: "line",
                value: "Dec",
                strokeWidth: 0,
                fillOpacity: 0,
                label: {
                  text: "DEC ←",
                  position: "insideLeft",
                },
              }
            ],
          },
          {
            type: "number",
            position: "bottom",
            nice: false,
            min: -300,
            max: 500,
            label: {
              enabled: false,
            },
          },
        ],
    };

    return (
        <AgCharts options={chartOptions} />
    );
};
