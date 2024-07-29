import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1 className="heading text-xxl-bold">
              Live Match Scores, Anytime, Anywhere
            </h1>
            <p className="description text-md">
              Stay updated with live scores and never miss a moment of the
              action! Our Virtual Scoreboard provides real-time updates,
              allowing spectators to track every play and stay connected to the
              excitement of the match.{" "}
            </p>
          </div>
          <div className="navigation-btns">
            <Link to="/matches" className="btn text-md-bold">Search matches</Link>
            <Link to="/signup" className="btn text-md-bold">Create an account</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
