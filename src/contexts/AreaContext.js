import React from 'react';
import axios from 'axios';

export const AreaContext = React.createContext();

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export class AreaProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      districts: []
    }
    this.handleCityClick = this.handleCityClick.bind(this);
  }

  componentDidMount() {
    axios.get('https://dvbt-areas.herokuapp.com/cities', { cancelToken: source.token })
         .then(res => {
           this.setState({
             cities: res.data
           })
         })
         .catch(err => {
           console.log(err);
         })
  }

  componentWillUnmount() {
    source.cancel();
  }

  handleCityClick(event) {
    event.preventDefault();
    axios.get(`https://dvbt-areas.herokuapp.com/districts?city=${event.target.value}`)
         .then(res => {
           this.setState({
             districts: res.data
           })
         })
  }

  render() {
    const { cities, districts } = this.state;
    return(
      <AreaContext.Provider value={{
        cities: cities,
        districts: districts,
        handleCityClick: this.handleCityClick
      }}>
        {this.props.children}
      </AreaContext.Provider>
    );
  }
}