import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './../layout/Spinner';
import Moment from 'react-moment';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }
  async componentDidMount() {
    try {
      const lyrics = await axios.get(`http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc`)

      //console.log(lyrics.data);
      
      this.setState({ lyrics: lyrics.data.message.body.lyrics });

      const lyricsById = await axios.get(`http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc`);

      //http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc
//http://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=a0edb32ae45bc77dfa0a2f3be3c21ddc
  // 
     this.setState({ track: lyricsById.data.message.body.track });

    //console.log(lyricsById.data)


      // return lyricsById

    } catch (e) {
      console.log(e)
    }
  }



  render() {
    const { track, lyrics } = this.state;
   // console.log(lyrics)
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0
      || Object.keys(lyrics).length === 0
    ) {
      return <Spinner />
    }
      return (
        <Fragment>
          <Link to='/' className='btn btn-dark btn-sm mb-4'>Go back</Link>
          <div className='card'>
            <h5 className='card-header'>
              {track.track_name } by 
               <span className='text-secondary'>{  track.artist_name}</span>
            </h5>
            <div className='card-body'>
              <p className='card-text'>{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className='list-group mt-3'>
            <li className='list-group-item'>
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className='list-group-item'>
              <strong>Song Genre</strong>: {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
            </li>
            <li className='list-group-item'>
              <strong>Explici words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
            </li>

            <li className='list-group-item'>
              <strong>Release Date</strong>: <Moment format="DD/MM/YY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </Fragment>
        )
    
  }
}

export default Lyrics;
