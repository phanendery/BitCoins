import React, { Component } from "react";
import Toggle from "./toggle";

export default class query extends Component {
  constructor(props) {
    super(props);
    this.volumeRef = React.createRef();
    this.priceRef = React.createRef();
    this.marketRef = React.createRef();
    this.exchangeRef = React.createRef();
    this.state = {
      coins: props.coins,
      updatePage: props.updateList
    };

    this.volumeFilter = this.volumeFilter.bind(this);
    this.priceFilter = this.priceFilter.bind(this);
    this.marketFilter = this.marketFilter.bind(this);
    this.exchangeFilter = this.exchangeFilter.bind(this);
  }

  volumeFilter() {
    let arr = this.state.coins;
    let filtered = arr.sort((a, b) => {
      return this.volumeRef.current.state.toggle
        ? a.volume - b.volume
        : b.volume - a.volume; //least to greatest
    });
    let coinArray = filtered.map(res => ({
      coinId: res.id,
      coinName: res.name,
      coinUrl: res.iconUrl
    }));
    this.state.updatePage(coinArray);
  }

  priceFilter() {
    let arr = this.state.coins;
    let filtered = arr.sort((a, b) => {
      return this.priceRef.current.state.toggle
        ? a.price - b.price
        : b.price - a.price; //least to greatest
    });
    let coinArray = filtered.map(res => ({
      coinId: res.id,
      coinName: res.name,
      coinUrl: res.iconUrl
    }));
    this.state.updatePage(coinArray);
  }

  marketFilter() {
    let arr = this.state.coins;
    let filtered = arr.sort((a, b) => {
      return this.marketRef.current.state.toggle
        ? a.numberOfMarkets - b.numberOfMarkets
        : b.numberOfMarkets - a.numberOfMarkets; //least to greatest
    });
    let coinArray = filtered.map(res => ({
      coinId: res.id,
      coinName: res.name,
      coinUrl: res.iconUrl
    }));
    this.state.updatePage(coinArray);
  }

  exchangeFilter() {
    let arr = this.state.coins;
    let filtered = arr.sort((a, b) => {
      return this.exchangeRef.current.state.toggle
        ? a.numberOfExchanges - b.numberOfExchanges
        : b.numberOfExchanges - a.numberOfExchanges; //least to greatest
    });
    let coinArray = filtered.map(res => ({
      coinId: res.id,
      coinName: res.name,
      coinUrl: res.iconUrl
    }));
    this.state.updatePage(coinArray);
  }

  render() {
    return (
      <div className="buttonsHolder">
        <h2>Filter by: </h2>
        <Toggle
          ref={this.volumeRef}
          name="Volume"
          filter={this.volumeFilter.bind(this)}
        ></Toggle>
        <Toggle
          ref={this.priceRef}
          name="Price"
          filter={this.priceFilter.bind(this)}
        ></Toggle>
        <Toggle
          ref={this.marketRef}
          name="Number of Markets"
          filter={this.marketFilter.bind(this)}
        ></Toggle>
        <Toggle
          ref={this.exchangeRef}
          name="Number of Exchanges"
          filter={this.exchangeFilter.bind(this)}
        ></Toggle>
      </div>
    );
  }
}
