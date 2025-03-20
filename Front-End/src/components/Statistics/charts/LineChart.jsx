import { AgCharts } from 'ag-charts-react';
import { useSelector } from 'react-redux';
import { ARABIC } from '../../../Redux/actions/type';


export default function LineChart({data}){

    const {currentLange} = useSelector( state => state.language)
    const dateFormatter = new Intl.DateTimeFormat("en-US");
    const tooltip = {
    renderer: ({ datum, xKey, yKey }) => ({
        content: `${dateFormatter.format(datum[xKey])}: ${datum[yKey]}`,
    }),
    };
    const chartOptions = {
        data : data.data,
        footnote: {
          text: data.title
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
                text: currentLange == ARABIC ? "التاريخ": "Date",
              },
              label: {
                format: "%b",
              },
            },
            {
              position: "left",
              type: "number",
              title: {
                text: currentLange == ARABIC ? "أعظم معدل": "Max Average",
              },
            },
        ],
    };

    return (
        <AgCharts options={chartOptions} style={{direction: 'ltr'}}/>
    );
};
