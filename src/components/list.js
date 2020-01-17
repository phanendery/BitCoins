import React, { Component } from "react";
import Info from "./info";
import "../stylesheets/list.scss";

export default class list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.coins
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      filtered: nextProps.coins
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = this.props.coins;
      newList = currentList.filter(coin => {
        let name = coin.coinName;
        const lc = name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.coins;
    }

    this.setState({
      filtered: newList
    });
  }

  render() {
    let coins = this.state.filtered.map(coin => {
      return (
        <div key={coin.coinId} className="mainCoins">
          <Info
            key={coin.coinId}
            coinName={coin.coinName}
            coinId={coin.coinId}
            coinUrl={coin.coinUrl}
          ></Info>
        </div>
      );
    });

    return (
      <div>
        <div>
          <div className="search">
            <div>
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="       Search Coins . . ."
                required
              ></input>
            </div>
          </div>
        </div>
        <div className="allCoins">{coins}</div>
      </div>
    );
  }
}
