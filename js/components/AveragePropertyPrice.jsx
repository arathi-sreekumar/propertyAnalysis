import React from 'react';

class AveragePropertyPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://api.zoopla.co.uk/api/v1/property_listings.js?area=Oxford&api_key=nnkuseks2pp3ut5je382p2r3")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, result } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      {result}
    );
  }
}

export  default AveragePropertyPrice;