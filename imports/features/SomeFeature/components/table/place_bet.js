import React, { Component } from 'react';

export default class PlaceBet extends Component {
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
    alert(`A bet was submitted: ${this.state.bet}`);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your bet:
            <input type="text" value={this.state.bet} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Place bet" />
        </form>
      </div>
    );
  }
}
