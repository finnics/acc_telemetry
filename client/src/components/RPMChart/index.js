import React from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

const speedAccessor = {
  yAccessor: (d) => d.rpm,
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["rpm"],
  range: ["green"],
};

const tickValues = generateRangeArr(0, 10000, 2000);

const RPMChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={250}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 10000] }}
      >
        <rect x={0} y={0} width={"100%"} height={300} fill={"black"} />
        <Grid
          rows={true}
          columns={false}
          numTicks={tickValues.length}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
        />
        <Axis
          orientation="left"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={"white"} opacity={0.5}>
                {`${parseInt(formattedValue)}k`}
              </text>
            </g>
          )}
        ></Axis>
        <Axis
          orientation="right"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={"white"} opacity={0.5}>
                {`${parseInt(formattedValue)}k`}
              </text>
            </g>
          )}
        ></Axis>

        <LineSeries
          dataKey="rpm"
          stroke="green"
          data={data}
          {...speedAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default RPMChart;
