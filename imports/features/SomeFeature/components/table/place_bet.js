import React, { Component } from 'react';

class PlaceBet extends Component {
  constructor(props) {
    super(props);
    this.state = { bet: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ bet: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.bet);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your bet: {this.state.bet}
            <input
              type="range"
              min="0"
              max={this.props.stack}
              step="1"
              value={this.state.bet}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Place bet" />
        </form>
      </div>
    );
  }
}

PlaceBet.propTypes = {
  stack: React.PropTypes.number, // to determine max bet
  handleSubmit: React.PropTypes.func, // callback to method
};

export default PlaceBet;
