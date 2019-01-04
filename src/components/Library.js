import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import albumData from './../data/albums'; 


class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {albums: albumData};
    }

    render() {
        return (
            <div className="container">
            <section className="library row">
                {
                    this.state.albums.map( (album, index) => 
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <Link to={`/albums/${album.slug}`} key={index} className="card">
                        <img src={album.albumCover} alt={album.title} className="card-img-top" />
                        <div className="card-body">
                            <div className="card-title text-dark">{album.title}</div>
                            <div className="text-dark">{album.artist}</div>
                            <div className="text-dark">{album.songs.length} Songs</div>
                            
                        </div>
                    </Link>
                    </div>
                  )
                }
            </section>
            </div>
        );
    }
}

export default Library;