import React, { Component } from "react";
import Switch from "react-switch";
import { FaTelegram } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";

class Hodlinfo extends Component {
  state = {
    companiesList: [],
    loading: true,
    checked: true,
    timer: 5,
  };

  containerRef = React.createRef();

  componentDidMount() {
    this.startTimer();
    setTimeout(() => {
      this.getCompaniesList();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  startTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer <= 0) {
          clearInterval(this.timerInterval);
          return { timer: 0 };
        } else {
          return { timer: prevState.timer - 1 };
        }
      });
    }, 1000);
  };

  handleChange = (checked) => {
    this.setState({ checked });
    const container = this.containerRef.current;
    if (container) {
      container.classList.toggle("background-active", checked);
      container.classList.toggle("background-inactive", !checked);
    }
  };

  handleTelegramClick = () => {
    alert("Moving to Telegram...");
  };

  installApp = () => {
    alert("Installing app...");
  }

  buyBtc = () => {
    alert("Buying BTC...");
  }

  getCompaniesList = async () => {
    try {
      const response = await fetch("/api/tickers");
      const data = await response.json();
      const tickers = Object.values(data)
        .slice(0, 10)
        .sort((a, b) => parseFloat(b.last) - parseFloat(a.last));
      this.setState({ companiesList: tickers, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };


  render() {
    const { companiesList, loading, checked, timer } = this.state;

    return (
      <div className="app-container" ref={this.containerRef}>
        <div className="header-container">
          <div className="logo">
            <img
              src="https://hodlinfo.com/static/media/HODLINFO.8f78fc06.png"
              className="logo"
              alt="logo"
            />
          </div>
          <div className="buttons-container">
            <select className="select-elements">
              <option value="INR">INR</option>
            </select>
            <select className="select-elements">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
              <option value="XRP">XRP</option>
              <option value="TRX">TRX</option>
              <option value="DASH">DASH</option>
              <option value="ZEC">ZEC</option>
              <option value="XEM">XEM</option>
              <option value="IOST">IOST</option>
              <option value="WIN">WIN</option>
              <option value="BTT">BTT</option>
              <option value="WRX">WRX</option>
            </select>
            <button type="button" className="select-elements buy-btc" onClick={this.buyBtc}>
              BUY BTC
            </button>
          </div>
          <div className="buttons-container">
            <div className="timer-container">
              <div className="timer-container-card">
                <p id="timer-text" className="timer">
                  {timer}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="telegram-button"
              onClick={this.handleTelegramClick}
            >
              <FaTelegram className="telegram-icon" />
              Connect to Telegram
            </button>
            <Switch onChange={this.handleChange} checked={checked} />
          </div>
        </div>
        {loading ? (
          <div className="spinner-container">
            <Oval
              height={60}
              width={60}
              color="cyan"
              ariaLabel="loading"
              secondaryColor="white"
              strokeWidth={8}
            />
          </div>
        ) : (
          <div className="companies-list">
            <div className="content-container">
              <div className="content">
                <h1 className="content-heading">0.1%</h1>
                <p className="content-para">5 Mins</p>
              </div>
              <div className="content">
                <h1 className="content-heading">0.96%</h1>
                <p className="content-para">1 Hour</p>
              </div>
              <div className="content">
                <p className="content-para top">Best Price To Trade</p>
                <h1 className="heading-content">
                  <FaIndianRupeeSign /> 26,46,110
                </h1>
                <p className="content-para below">
                  Average BTC/INR net price including commission
                </p>
              </div>
              <div className="content">
                <h1 className="content-heading">2.73%</h1>
                <p className="content-para">1 Day</p>
              </div>
              <div className="content">
                <h1 className="content-heading">7.51%</h1>
                <p className="content-para">7 Days</p>
              </div>
            </div>
            <div className="crypto-prices">
              <table className="company-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Platform Name</th>
                    <th>Last Trade Price</th>
                    <th>Buy Price</th>
                    <th>Sell Price</th>
                    <th>Difference</th>
                    <th>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {companiesList.map((company, index) => {
                    const { name, last, buy, sell } = company;
                    const difference = (
                      parseFloat(last) - parseFloat(buy)
                    ).toFixed(2);
                    const savings = (
                      ((parseFloat(last) - parseFloat(sell)) /
                        parseFloat(sell)) *
                      100
                    ).toFixed(2);

                    return (
                      <tr key={index}>
                        <td data-label="#"> {index + 1}</td>
                        <td data-label="Platform Name">{name}</td>
                        <td data-label="Last Trade Price">
                          <FaIndianRupeeSign /> {last}
                        </td>
                        <td data-label="Buy Price">
                          <FaIndianRupeeSign /> {buy}
                        </td>
                        <td data-label="Sell Price">
                          <FaIndianRupeeSign /> {sell}
                        </td>
                        <td data-label="Difference">
                          <FaIndianRupeeSign /> {difference}
                        </td>
                        <td data-label="Savings">
                          {savings}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <footer className="footer">
          <p>© 2024 Hodlinfo. All Rights Reserved.</p>
          <p>Support</p>
        </footer>
        <div className="add-home-screen-button">
          <button type="button" className="button-screen" onClick={this.installApp}>
            Add Hodlinfo to Homescreen
          </button>
        </div>
      </div>
    );
  }
}

export default Hodlinfo;
