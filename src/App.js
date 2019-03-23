import React, { Component } from 'react';
import err from './weatherIcons/error.svg';
import rain from './weatherIcons/rain.svg';
import clear_sky from './weatherIcons/clear_sky.svg';
import broken_clouds from './weatherIcons/broken_clouds.svg';
import few_clouds from './weatherIcons/few_clouds.svg';
import mist from './weatherIcons/mist.svg';
import scattered_clouds from './weatherIcons/scattered_clouds.svg';
import shower_rain from './weatherIcons/shower_rain.svg';
import snow from './weatherIcons/snow.svg';
import thunderstorm from './weatherIcons/thunderstorm.svg';
import './App.css';

const api = 'http://api.openweathermap.org/data/2.5/weather';
const appid = '166d00e26d3ff2c6149e89feccc5c59a';
const defaultCity = 'Copenhagen';
const defaultsearchContry = 'dk';
const defaultLanguage = 'da';
const defaultUnits = 'metric';
const defaultParams = `,${defaultsearchContry}&appid=${appid}&units=${defaultUnits}&lang=${defaultLanguage}`;
const defaultHttp = `${api}?q=`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getCity = this.getCity.bind(this);
    this.handleErrors = this.handleErrors.bind(this);

    this.state = {
      data: null,
      city: '',
      error: '',
      params: null
    };

  }

  componentWillMount() {
    console.log('Component will mount');
    this.setState({ params: this.getSearchParameters() });
  }

  componentDidMount() {
    console.log('Component did mount');
    if (this.state.params) {
      if (this.state.params.city) {
        const cit = this.state.params.city;
        console.log(cit);
        this.setState({ city: cit });
        this.getData(cit);

      } else {
        const obj = `${defaultHttp}${defaultCity}${defaultParams}`;
        console.log(obj);
        fetch(obj)
          .then(response => response.json())
          .then(data => this.setState({ data }));
      }
    } else {
      const obj = `${defaultHttp}${defaultCity}${defaultParams}`;
      console.log(obj);
      fetch(obj)
        .then(response => response.json())
        .then(data => this.setState({ data }));
    }
  }

  componentDidUpdate = (prevProps) => {
    console.log('Component did update');
    const { data, city } = this.state;

    if (data) {
      console.log(data);
    }

    if (city) {
      console.log(city);
    }

  }

  getSearchParameters() {
    const prmstr = window.location.search.substr(1);
    return prmstr !== null && prmstr !== "" ? this.transformToAssocArray(prmstr) : {};
  }

  transformToAssocArray(prmstr) {
    const params = {};
    const prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  }

  handleChange(city) {
    this.setState({ city: city.target.value });
  }

  handleErrors(response) {
    if (!response.ok) {
      console.log(response.statusText);
      throw Error(response.statusText);
    }
    return response;
  }

  getCity(value) {
    const { city } = this.state;
    this.setState({ error: '' });

    value.preventDefault();

    this.getData(city);
  }

  getData(city) {
    if (city !== undefined) {
      console.log(city);

      let thisCity = city;
      let newCity1 = '';
      let newCity2 = '';
      let newCity = '';
      let index;

      const aa = city.toLocaleLowerCase().includes('å');
      if (aa) {
        index = city.toLocaleLowerCase().indexOf('å');
        newCity1 = city.slice(0, index);
        newCity2 = city.slice(index + 1);
        newCity = `${newCity1}aa${newCity2}`;
      }

      /*
      const oe = city.toLocaleLowerCase().includes('ø');
      if(oe){
        index = city.toLocaleLowerCase().indexOf('ø');
        newCity1 = city.slice(0,index);
        newCity2 = city.slice(index+1);
        newCity = `${newCity1}oe${newCity2}`;
      }
      */

      if (newCity) {
        thisCity = newCity;
      }

      const obj = `${defaultHttp}${thisCity}${defaultParams}`;

      fetch(obj)
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => this.setState({ data }))
        .catch((error) => {
          console.log(error);
          this.setState({ error: 'byen blev ikke fundet' });
        });
    } else {
      this.setState({ error: 'byen blev ikke fundet' });
    }
  }

  renderLogo(condition) {
    /*
      Her hentes beskrivelse https://openweathermap.org/weather-conditions
    */

    console.log(condition);

    if (condition === 804) {
      return broken_clouds
    } else if (condition === 803) {
      return broken_clouds;
    } else if (condition === 802) {
      return scattered_clouds;
    } else if (condition === 801) {
      return few_clouds;
    } else if (condition === 800) {
      return clear_sky;
    } else if (condition >= 701) {
      return mist;
    } else if (condition >= 600) {
      return snow;
    } else if (condition >= 521) {
      return shower_rain;
    } else if (condition >= 500) {
      return rain;
    } else if (condition >= 200) {
      return thunderstorm;
    } else {
      return clear_sky;
    }
  }


  renderSwitchGrade(grade) {
    /*
      Her er vindretninger fundet: http://snowfence.umn.edu/Components/winddirectionanddegreeswithouttable3.htm
    */
    if (grade >= 348.75) {
      return 'Nord';
    } else if (grade >= 326.25) {
      return 'Nord nordvest';
    } else if (grade >= 303.75) {
      return 'Nordvest';
    } else if (grade >= 281.25) {
      return 'Vest nordvest';
    } else if (grade >= 258.75) {
      return 'Vest';
    } else if (grade >= 236.25) {
      return 'Vest sydvest'
    } else if (grade >= 213.75) {
      return 'Sydvest';
    } else if (grade >= 191.25) {
      return 'Syd sydvest';
    } else if (grade >= 168.75) {
      return 'Syd';
    } else if (grade >= 146.25) {
      return 'Syd sydøst';
    } else if (grade >= 101.25) {
      return 'Øst sydøst';
    } else if (grade >= 78.75) {
      return 'Øst';
    } else if (grade >= 56.25) {
      return 'Øst nordøst';
    } else if (grade >= 33.75) {
      return 'Nordøst';
    } else if (grade >= 11.25) {
      return 'Nord nordøst';
    } else {
      return 'Nord';
    }
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return (
        <div className="App">
          <div className="panel panel-info">
            <div className="panel-heading">Vejret i <b>{data.name}</b></div>
            <ul className="list-group">
              <img src={err} className="NoMove" alt="logo" />
              <li className="Error">Fejl: <b>{error}</b></li>
              <li className="list-group-item">
                <form className="form-inline">
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" placeholder="By" onChange={this.handleChange} />
                  </div>
                  <button type="submit" onClick={this.getCity.bind(this)} className="btn btn-default weatherSearch">Søg igen</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      );
    } else if (data) {
      if (data.weather[0].id === 800) {
        // Solen skiner, så lad solen dreje rundt
        const winddirection = this.renderSwitchGrade(data.wind.deg);
        return (
          <div className="App">
            <div className="panel panel-info">
              <div className="panel-heading">Vejret i <b>{data.name}</b></div>
              <ul className="list-group">
                <img src={this.renderLogo(data.weather[0].id)} className="Move" alt="logo" />
                <li className="list-group-item">Temperatur: <b>{`${data.main.temp.toFixed(0)} °C`}</b></li>
                <li className="list-group-item">Luftfugtighed: <b>{data.main.humidity.toFixed(0)}</b></li>
                <li className="list-group-item">Vind: <b>{`${data.wind.speed.toFixed(0)} m/s ${winddirection}`}</b></li>
                <li className="list-group-item">
                  <form className="form-inline">
                    <div className="form-group">
                      <input type="text" className="form-control" id="city" placeholder="By" onChange={this.handleChange} />
                    </div>
                    <button type="submit" onClick={this.getCity.bind(this)} className="btn btn-default weatherSearch">Søg</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        );
      } else {
        const logo = this.renderLogo(data.weather[0].id);
        const winddirection = this.renderSwitchGrade(data.wind.deg);
        return (
          <div className="App">
            <div className="panel panel-info">
              <div className="panel-heading">Vejret i <b>{data.name}</b></div>
              <ul className="list-group">
                <img src={logo} className="NoMove" alt="logo" />
                <li className="list-group-item">Temperatur: <b>{`${data.main.temp.toFixed(0)} °C`}</b></li>
                <li className="list-group-item">Luftfugtighed: <b>{`${data.main.humidity.toFixed(0)} %`}</b></li>
                <li className="list-group-item">Vind: <b>{`${data.wind.speed.toFixed(0)} m/s ${winddirection}`}</b></li>
                <li className="list-group-item">
                  <form className="form-inline">
                    <div className="form-group">
                      <input type="text" className="form-control" id="city" placeholder="By" onChange={this.handleChange} />
                    </div>
                    <button type="submit" onClick={this.getCity.bind(this)} className="btn btn-default weatherSearch">Søg</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="App">
          <div className="panel panel-info">
            <div className="panel-heading">Vejrudsigten</div>
            <ul className="list-group">
              <img src={err} className="NoMove" alt="logo" />
              <li className="Error">Ingen data</li>
              <li className="list-group-item">
                <form className="form-inline">
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" placeholder="By" onChange={this.handleChange} />
                  </div>
                  <button type="submit" onClick={this.getCity.bind(this)} className="btn btn-default weatherSearch">Søg igen</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }
}

export default App;

