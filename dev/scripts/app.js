import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
    render() {
      return (
        
        <div>
          <HomePage />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
