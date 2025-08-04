import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
  // Ensure the data has a color property for each subject

  return (
    // The parent div is crucial for a responsive chart.
    // It must have a defined height and width.
    // This allows the ResponsiveBar component to fill the available space.
    <div style={{ height: 300, width: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["marks"]} // The key in each data object that holds the numerical value
        indexBy="subject" // The key in each data object that holds the category name
        margin={{ top: 10, right: 20, bottom: 40, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{scheme: "paired"}} // Use the 'color' property from the data object
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Subject",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Marks",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in subject: " + e.index
        }
      />
    </div>
  );
};

export default BarChart;
