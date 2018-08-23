import React from 'react';
// import Chart from 'react-d3-core';
import { LineChart } from 'react-easy-chart';
import { arrayOf, shape, string, number } from 'prop-types';

class AreaPriceChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    const width = 700;
    const height = 300;
    // const margins = { left: 100, right: 100, top: 50, bottom: 50 };
    const chartData = [this.state.data];

    // const title = 'Property price in the area over last 5 years';
    return (
      <div>
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
