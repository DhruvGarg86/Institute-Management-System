import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MyPieChart = ({ data: rawData }) => {
  // Transform inside the chart
  const data = [
    {
      id: 'Present',
      label: 'Present',
      value: rawData.presentDays,
      color: '#4CAF50',
    },
    {
      id: 'Absent',
      label: 'Absent',
      value: rawData.absentDays,
      color: '#F44336',
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ResponsivePie
        data={data}
        innerRadius={0}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={10}
        colors={{ datum: 'data.color' }}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabel="value"
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        tooltip={({ datum }) => (
          <div style={{ padding: 5, background: '#fff', border: '1px solid #ccc' }}>
            <strong>{datum.id}</strong>: {datum.value} days
          </div>
        )}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 40,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 10,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default MyPieChart;
