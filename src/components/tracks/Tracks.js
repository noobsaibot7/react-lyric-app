import React, { Component, Fragment } from 'react'
import { Consumer } from '../../context';
import Spinner from './../layout/Spinner';
import EachTracks from './EachTrack';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {
          value => {
            const { track_list, heading } = value;
            if (track_list === undefined || track_list.length === 0) {
              return <Spinner />
            } else {
              return (
                <Fragment>
                  <h3>{heading}</h3>
                  <div className="row">
                    {track_list.map(track => (<EachTracks key={track.track.track_id} track={track.track} />))}

                  </div>
                </Fragment>

              )
            }
          }
        }
      </Consumer>
    )
  }
}

export default Tracks;
