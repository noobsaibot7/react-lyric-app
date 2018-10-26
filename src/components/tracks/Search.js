import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {

  state = {
    title: '',
    errorMessage: '',
    error: false
  };

  onChange = e => {
    const { name, value } = e.target;
    // making use of computed property
    // e.target.name equal to name attribute on input tag
    this.setState({ [name]: value });
  };

  async onSubmitTrack(dispatch, e) {
    e.preventDefault();
    const val = this.state.title.trim();
    if (val !== '' && !this.state.error) {
      const trackSearch = await axios.get(
        `http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
        this.state.title
        }&page_size=10&page=1&s_track_rating=desc&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc`
      );
      // http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${
       // this.state.title
      //}&page_size=10&page=1&s_track_rating=desc&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc


      dispatch({
        type: 'SEARCHED_TRACK',
        payload: trackSearch.data.message.body.track_list
      });
      this.setState({
        title: '',
        errorMessage: '',
        error: false
      })
    } else {
      this.setState({
        errorMessage: 'Input cannot be empty',
        error: true
      })
    }

  }

  render() {
    const { title, error, errorMessage } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search for a Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>

              <form onSubmit={this.onSubmitTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Enter a song title"
                    value={title}
                    onChange={this.onChange}
                  />
                </div>
                {error && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button className="btn btn-danger btn-lg btn-block mb-5">
                  Submit
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;

// connect to a consumer store, we use a consumer
