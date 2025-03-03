import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/business"
            element={
              <News
                key="business"
                pageSize={5}
                country="US"
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                pageSize={5}
                country="US"
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                key="general"
                pageSize={5}
                country="US"
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News key="health" pageSize={5} country="US" category="health" />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                pageSize={5}
                country="US"
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News key="sports" pageSize={5} country="US" category="sports" />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                pageSize={5}
                country="US"
                category="technology"
              />
            }
          />
          <Route
            path="/"
            element={
              <News key="home" pageSize={5} country="US" category="general" />
            }
          />
        </Routes>
      </Router>
    );
  }
}
