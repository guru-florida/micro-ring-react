import * as React from 'react';
import Toggle from 'react-toggle';
import MicroKPI from './kpi/micro-ring';
import './kpi/kpi.css';

class State {
    running: boolean;
    count: number;
    sine: number;
}

class Props {
    title?: string;
    className?: string;
}

export default class MicroRingSamples extends React.Component<Props, State> {

    componentWillMount() {
        this.onToggleRun = this.onToggleRun.bind(this);
        this.setState({
            count: 0,
            sine: Math.round(Math.sin(28 / 10) * 50 + 50)
        });
        setInterval( () => { if(this.state.running) this.setState({
            count: this.state.count + 1,
            sine: Math.round(Math.sin(this.state.count / 10) * 50 + 50)
        }); }, 500);
    }

    protected onToggleRun(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ running: event.target.checked });
    }

    render() {
        return (<div className={`kpi-panel ${this.props.className}`}>
            <div className="run-toggle">
                <span>Animate</span>
                <Toggle icons={false} defaultChecked={this.state && this.state.running} onChange={this.onToggleRun} />
            </div>

            <h1>{this.props.title}</h1>
            <div className="kpi-row">
                <label>Small</label>
                <div>
                    <MicroKPI title="events" discreteLimit={10} limit={50} value={(this.state.count+2)} />
                    <h5>Auto Mode</h5>
                    <h6>Indicates small values with segments, large values with laps.</h6>
                </div>
                <MicroKPI title="alarm" color="red" limit={100} value={(42 + this.state.count * 2.3) % 100} />
                <MicroKPI title="outage" color="yellow" limit={100} value={(27 + this.state.count / 0.77) % 100} />
                <MicroKPI title="available" unit="%" value={this.state.sine} />
            </div>
            <div className="kpi-row kpi-medium">
                <label>Medium</label>
                <div>
                    <MicroKPI title="events" color="yellow" discreteLimit={10} limit={50} value={(this.state.count+2)} />
                    <h5>Auto Mode</h5>
                </div>
                <MicroKPI title="events" color="CornflowerBlue" limit={100} value={(21 + this.state.count * 1.75) % 100} />
                <MicroKPI title="outage" color="Fuchsia" limit={100} value={(12 + this.state.count * 0.91) % 100} />
                <MicroKPI title="available" color="cyan" unit="%" value={this.state.sine * 0.5 + 50} />
            </div>
            <div className="kpi-row kpi-medium">
                <label>Discrete</label>
                <div>
                    <MicroKPI title="alarm" color="red" discrete={true} limit={10} value={(4 + this.state.count) % 11} />
                    <h5>segmented values</h5>
                    <h6>Value is integral and within set limit of 10</h6>
                </div>
                <div>
                    <MicroKPI title="outage" color="Green" discrete={true} limit={10} value={36} />
                    <h5>with laps</h5>
                    <h6>3 times over limit of 10 with a remainder of 3</h6>
                </div>
                <div>
                    <MicroKPI title="outside" discrete={true} unit="°C" limit={10} value={this.state.count + 55} />
                    <h5>with laps</h5>
                    <h6>{Math.floor((this.state.count + 55) / 10)} times over limit of 10 with a remainder of {(this.state.count + 55) % 10}</h6>
                </div>
                <div>
                    <MicroKPI title="outage" color="OrangeRed" unit="eps" unitPlacement='bottom' discrete={true} limit={10} value={2361} />
                    <h5>high capacity</h5>
                    <h6>laps up the ying yang, with units on the bottom (events per second)</h6>
                </div>
            </div>
        </div>);
    }
}
