import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';

class App extends React.Component {
  render() {
    return (
      <div>
        <HomePage />
      </div>
    )
  }
}

//Having a really strange issue with Jest in that the only way my test cases pass is if I remove this. The error points specifically to this and I tried correcting the issue which is explained in index.js, but to no avail. To run test cases I have to comment this out. 

ReactDOM.render(<App />, document.getElementById('app'));