import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Background from '../src/components/blurred_backgrounds/blur_bg_3.jpg';

class App extends Component {
  render() {
    return (
      <div className="App" style={{backgroundImage: `url(${Background})`} } >
        <header>
          <nav className="float">
            <Link to='/' style={{padding: 10}} className="text-white">Home</Link>
            <Link to='/library' className="text-white">Library</Link>
          </nav>
          <h1 className="text-white">Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/Library" component={Library} />
          <Route path="/albums/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
