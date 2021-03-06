// @flow

import React from 'react';
// import Chart from 'react-d3-core';
import { LineChart } from 'react-easy-chart';
import { arrayOf, shape, string, number } from 'prop-types';

type FlowChartData = {
  data: ?({ x: string, y: number }[])
};

/*
 * AreaPriceChart component:
 * Shows average pricing information over the last five years for selected area
*/
class AreaPriceChart extends React.Component {
  constructor(props: FlowChartData) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  state: FlowChartData;

  // This is to update the results if search string changes during a rerendering
  componentDidUpdate() {
    this.setDataState(this.props.data);
  }

  setDataState(data: ?({ x: string, y: number }[])) {
    this.setState({ data });
  }

  render() {
    const width = 700;
    const height = 300;
    const chartData = [this.state.data];

    return (
      <div>
        <h2 className="subtitle">Average property price over last 5 years</h2>
        <LineChart
          xType={'text'}
          axisLabels={{ x: 'Last 5 years', y: 'Average property price' }}
          axes
          dataPoints
          width={width}
          height={height}
          interpolate={'cardinal'}
          data={chartData}
        />
      </div>
    );
  }
}

AreaPriceChart.propTypes = {
  data: arrayOf(
    shape({
      x: string,
      y: number
    })
  ).isRequired
};

export default AreaPriceChart;
