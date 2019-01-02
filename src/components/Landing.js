import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => (
    <section className="landing" className="bg-dark text-white">
        <h1 className="jumbotron text-center">Turn the music up!</h1>

        <section className="selling-points" className="row">
            <div className="point" className="col-sm-4">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to msuic that someone else chose?</p>
            </div>
            <div className="point" className="col-sm-4">
                <h2 className="point-title">Unlimited streaming, ad-free</h2>
                <p className="point-description">No arbitrary limits. No distraction.</p>
            </div>
            <div className="point" className="col-sm-4">
                <h2 className="point-title">Mobile enabled</h2>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
        </section>
    </section>
);

export default Landing;