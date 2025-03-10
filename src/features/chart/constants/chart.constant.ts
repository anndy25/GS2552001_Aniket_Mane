import {
  AgBarSeriesOptions,
  AgCartesianAxisOptions,
  AgCartesianSeriesOptions,
  AgLineSeriesOptions,
} from "ag-charts-community";

const GMDollar: AgBarSeriesOptions = {
  type: "bar",
  xKey: "week",
  yKey: "gmDollars",
  yName: "GM Dollars",
};

const GMPercentage: AgLineSeriesOptions = {
  type: "line",
  xKey: "week",
  yKey: "gmPercent",
  yName: "GM%",
};

export const GM_BAR_AND_LINE: AgCartesianSeriesOptions[] = [
  GMDollar,
  GMPercentage,
];

export const CHART_GM_AXES = [
  {
    type: "category",
    position: "bottom",
  },
  {
    // primary y axis
    type: "number",
    position: "left",
    keys: ["gmDollars"],
    title: {
      text: "GM Dollars",
    },
    label: {
      formatter: (params) => `$${Number(params.value.toFixed(2))}`,
    },
  },
  {
    type: "number",
    position: "right",
    keys: ["gmPercent"],
    title: {
      text: "GM Percentage",
    },
    label: {
      formatter: (params) => `${Number(params.value.toFixed(2))}%`,
    },
  },
] as AgCartesianAxisOptions[];
