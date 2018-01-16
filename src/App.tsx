import * as React from 'react';
import './App.css';
import MicroRings from './micro-ring-samples';
import './toggle.css';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Micro-Ring in React Sample</h2>
        </div>

          <MicroRings className="kpi-dark" title="Dark" />
          <MicroRings className="kpi-light" title="Light" />
          <MicroRings className="kpi-dark kpi-thin" title="Dark with Thin Lines" />

      </div>
    );
  }
}

export default App;
