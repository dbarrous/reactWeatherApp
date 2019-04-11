import React from "react";

export default class App extends React.Component {
  state = {
    lat: null,
    lon: null,
    city: null,
    weath: null,
    weather: null,
    image: null,
    err: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      err => {
        this.setState({
          err: err.message
        });
      }
    );
  }

  componentDidUpdate() {
    this.request();
  }

  async request() {
    const response = await fetch(
      `http://api.apixu.com/v1/current.json?key=072558e531cf4787a10182944191004&q=${
        this.state.lat
      },${this.state.lon}`
    );
    const json = await response.json();
    this.setState({
      city: `${json.location.name}, ${json.location.region}`,
      weath: `It is currently ${json.current.temp_f} °F in ${
        json.location.name
      }`,
      weather: json.current.condition.text,
      image: json.current.condition.icon
    });
  }

  render() {
    if (this.state.err !== null) {
      return (
        <div className="inner">
          <h1>Error User Location Unavailable</h1>
        </div>
      );
    } else if (this.state.lat !== null) {
      return (
        <div className="inner">
          <h1 className="weather">Weather App:</h1>
          <h1>Latitude: {this.state.lat}</h1>
          <h1>Longitude: {this.state.lon}</h1>
          <br />
          <h1 className="weather">
            {this.state.city && this.state.lat ? this.state.city : null}
          </h1>
          <h1 className="weather">{this.state.weath}</h1>
          <br />
          <div className="innest">
            <h1>
              <span className="weather">Current Weather in location: </span>
              {this.state.weather}{" "}
            </h1>
            <img src={this.state.image} alt={this.state.weather} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="inner">
          <h1>Loading Data...</h1>
        </div>
      );
    }
  }
}
