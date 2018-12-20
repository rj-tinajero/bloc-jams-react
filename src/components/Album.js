import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);
        const album = albumData.find(album => {
            return album.slug === this.props.match.params.slug
        });
        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 50,
            isPlaying: false,
            overSong: null
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause() {
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({currentTime: this.audioElement.currentTime});
            },
            durationchange: e => {
                this.setState({duration: this.audioElement.duration});
            },
            volumechange: e => {
                this.setState({volume: this.audioElement.volume})
            }
        
            
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song});
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) {this.setSong(song);}
            this.play();
        }
    }

    handleOver(index) {
        console.log(index);
        this.setState({
        overSong: index
        })
    }

    handleGone() {
        this.setState({
        overSong: null
        })

    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(4, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({currentTime: newTime});
    }

    handleSetVolume(e) {
        this.audioElement.volume = e.target.value;
        this.setState({volume: e.target.value});
    }

    render() {
        return (
            <section className="album">
                <section id="ablum-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    {this.state.album.songs.map((song, index) =>
                        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleOver(index)} onMouseLeave={() => this.handleGone()}>      
                            {this.state.overSong === index ? (() => {
                                if (this.state.isPlaying === true && this.state.currentSong === song) {
                                    return <i class="icon ion-md-pause"></i>;
                                } else {
                                    return <i class="icon ion-md-play"></i>;}
                                })()
                                : <span>{index +1} </span> 
                            } {this.state.album.songs[index].title} {this.state.album.songs[index].duration} seconds 
                                   
                        </tr> )}
                        
                </table>
              <PlayerBar 
                isPlaying={this.state.isPlaying} 
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                duration={this.audioElement.duration}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleSetVolume={(e) => this.handleSetVolume(e)}
              />
            </section>
        );   
    }
}
   

export default Album;