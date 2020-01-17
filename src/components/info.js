import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Line } from "react-chartjs-2";
import {
  faCoins,
  faMoneyBillAlt,
  faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "./modal";
import "../stylesheets/coins.css";

export default class info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinInfo: {},
      showModal: false,
      loaded: false,
      priceHistory: {}
    };

    this.reqData = this.reqData.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  hideModal(e) {
    e.stopPropagation();
    this.setState({ showModal: false });
  }

  reqData(coinId) {
    axios
      .get(`https://api.coinranking.com/v1/public/coin/${coinId}`)
      .then(res => {
        let info = res.data.data;
        this.setState({ coinInfo: info, loaded: true });
      });
    axios
      .get(`https://api.coinranking.com/v1/public/coin/${coinId}/history/30d`)
      .then(res => {
        const every_nth = (arr, nth) => {
          return arr.filter((e, i) => i % nth === nth - 1);
        };
        let percentChange = res.data.data.change;
        // console.log(res.data.data.change);
        let arr = res.data.data.history;
        let history = every_nth(arr, 24);
        this.setState({ priceHistory: { percentChange, history } });
      });
  }

  handleAction() {
    this.reqData(this.props.coinId);
    this.showModal();
  }

  render() {
    return (
      <div className="coinHolder">
        <li
          onClick={() => {
            this.handleAction();
          }}
          className="coinList"
        >
          <div className="nameAndPic">
            <p className="coinNameText">{this.props.coinName}</p>
            <img src={`${this.props.coinUrl}`} className="coinSymbol"></img>
          </div>
        </li>
        {this.state.showModal ? (
          <Modal show={this.state.showModal} handleClose={this.hideModal}>
            {this.state.loaded ? (
              <div className="coinInfoContainer">
                <div className="nameAndIcon">
                  {" "}
                  <h1>{this.state.coinInfo.coin.name}</h1>
                  <a
                    href={`${this.state.coinInfo.coin.websiteUrl}`}
                    target="_blank"
                  >
                    <img
                      src={`${this.state.coinInfo.coin.iconUrl}`}
                      className="coinSymbol"
                    ></img>
                  </a>
                </div>
                <div className="description">
                  <h3>{this.state.coinInfo.coin.description}</h3>
                </div>
                <div className="iconAndGraph">
                  <div className="iconHolders">
                    <div className="currentPrice">
                      <div className="iconDisplay">
                        <FontAwesomeIcon
                          icon={faMoneyBillWave}
                          size="4x"
                          style={{ color: "#85bb65" }}
                        />
                      </div>
                      <div className="priceInfo">
                        <p>Current Price:</p>
                        <p className="infoTxt">
                          ${" "}
                          {parseFloat(this.state.coinInfo.coin.price).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="highestPrice">
                      <div className="iconDisplay">
                        <FontAwesomeIcon
                          icon={faMoneyBillAlt}
                          size="4x"
                          style={{ color: "#85bb65" }}
                        />
                      </div>
                      <div className="priceInfo">
                        <p> Highest Price: </p>
                        <p className="infoTxt">
                          ${" "}
                          {parseFloat(
                            this.state.coinInfo.coin.allTimeHigh.price
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="break"></div>
                    <div className="circulatingSupply">
                      <div className="iconDisplay">
                        <FontAwesomeIcon
                          icon={faCoins}
                          size="4x"
                          style={{ color: "#D4AF37" }}
                        />
                      </div>
                      <div className="priceInfo">
                        <p>Circulating Supply:</p>
                        <p className="infoTxt">
                          {" "}
                          {this.state.coinInfo.coin.circulatingSupply.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="totalSupply">
                      <div className="iconDisplay">
                        <FontAwesomeIcon
                          icon={faCoins}
                          size="4x"
                          style={{ color: "#D4AF37" }}
                        />
                      </div>
                      <div className="priceInfo">
                        <p>Total Supply:</p>
                        <p className="infoTxt">
                          {" "}
                          {this.state.coinInfo.coin.totalSupply.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="graphHolder">
                    <LineGraph
                      priceHistory={this.state.priceHistory}
                      options={{ maintainAspectRatio: false }}
                    ></LineGraph>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </Modal>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const LineGraph = props => {
  let hold = [];
  let prices = [];
  if (Object.keys(props.priceHistory) != 0) {
    hold = props.priceHistory.history;
    for (let i in hold) {
      prices.push(hold[i].price);
    }
  }
  let labels = Array(30).fill("Day");
  labels.forEach((el, idx, labels) => {
    let num = (idx + 1).toString();
    labels[idx] += ` ${num}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Price (Last 30 Days)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: prices
      }
    ]
  };
  return <Line data={data}></Line>;
};
