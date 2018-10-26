import React, { Component, createContext } from 'react'
import axios from 'axios';

const Context = createContext();
const Reducer = (state, action)=>{
  switch (action.type) {
    case 'SEARCHED_TRACK':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Searched result'
      }
    default:
      return state;
  }
}

export class Provider extends Component {

  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(prevState =>Reducer(prevState, action))
  }

  async componentDidMount() {
    try {
      const topTrack = await axios.get(`http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=ng&f_has_lyrics=1&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc`)

      // cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=ng&f_has_lyrics=1&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc

   // console.log(topTrack.data);
    this.setState({track_list: topTrack.data.message.body.track_list})
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;


//we create a provider then a consumer that consums it. the consumer function is similar to connect to redux which gives us the return data 