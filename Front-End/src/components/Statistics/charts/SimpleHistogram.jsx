import { AgCharts } from 'ag-charts-react';
import { useSelector } from 'react-redux';
import { ARABIC } from '../../../Redux/actions/type';


export default function SimpleHistogram({data}){
  
    const {currentLange} = useSelector( state => state.language)

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
                return { title: datum?.name != undefined ? datum?.name + ' ' + datum?.lastName : datum?.title , content: datum[yKey] };
              },
            },
          },
        ],
        axes: [
          {
            type: "category",
            position: "bottom",
            title: {
              text: currentLange == ARABIC ? "الصفوف": "Class",
            },
          },
          {
            type: "number",
            position: "left",
            title: {
              text: currentLange == ARABIC ? "العلامه الإجماليه": "Total mark",
            },
          }
        ],
    };

    return (
        <AgCharts options={chartOptions} style={{direction: 'ltr'}}/>
    );
};
