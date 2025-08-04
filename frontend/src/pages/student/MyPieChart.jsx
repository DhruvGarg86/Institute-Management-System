import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MyPieChart = ({ data }) => (
  // The parent div is important for the ResponsivePie component to work.
  // It needs a defined width and height to calculate its size.
    <div style={{ height: '100%', width: '100'}}>
      <ResponsivePie
        data={data}
        startAngle={0}
        endAngle={360}
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
        innerRadius={0}
        padAngle={0.8}
        cornerRadius={3}
        activeOuterRadiusOffset={9}
        borderWidth={3}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        colors={{datum: 'data.color'}}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        
        
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 20,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
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

  export default MyPieChart;