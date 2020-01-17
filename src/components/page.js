import React, { Component } from "react";
import axios from "axios";
import List from "./list";
import Query from "./query";
import "../stylesheets/page.scss";

export default class page extends Component {
  constructor(props) {
    super(props);
    this.queryRef = React.createRef();

    this.state = {
      coinData: {},
      coinArray: []
    };
  }

  componentDidMount() {
    axios.get("https://api.coinranking.com/v1/public/coins").then(res => {
      this.setState({ coinData: res.data });
      let arr = this.state.coinData.data.coins;
      this.queryRef.current.setState({ coins: arr });
      let result = [];
      arr.forEach(res => {
        result.push({
          coinId: res.id,
          coinName: res.name,
          coinUrl: res.iconUrl
        });
      });
      this.setState({ coinArray: result });
    });
  }

  updateList(arr) {
    this.setState({ coinArray: arr });
  }

  render() {
    return (
      <div>
        <h1 className="title"> Crypto</h1>
        <Query
          ref={this.queryRef}
          coins={this.state.coinData}
          updateList={this.updateList.bind(this)}
        ></Query>
        <List coins={this.state.coinArray}></List>
        <div className="queryButtons"></div>
      </div>
    );
  }
}
