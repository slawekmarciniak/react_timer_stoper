class Clock extends React.Component {
  state = {
    time: this.getTime(),
  };

  getTime() {
    const time = new Date();
    return {
      seconds: time.getSeconds(),
      minutes: time.getMinutes(),
      hours: time.getHours(),
    };
  }

  changeTime = () => {
    this.setState({
      time: this.getTime(),
    });
  };

  componentDidMount = () => {
    this.interval = setInterval(this.changeTime, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { minutes, seconds, hours } = this.state.time;
    return (
      <p>
        {hours > 9 ? hours : `0${hours}`} :{" "}
        {minutes > 9 ? minutes : `0${minutes}`} :{" "}
        {seconds > 9 ? seconds : `0${seconds}`}
      </p>
    );
  }
}

class Stoper extends React.Component {
  state = {
    seconds: 0,
    intervalOn: false,
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  start = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1,
      });
    }, 1000);
    this.setState({
      intervalOn: true,
    });
  };

  pause = () => {
    clearInterval(this.interval);
  };

  reset = () => {
    clearInterval(this.interval);
    this.setState({
      seconds: 0,
    });
  };

  render() {
    return (
      <>
        <p className="stoperDigits">{this.state.seconds}</p>
        <div className="sectionButtons">
          <button onClick={this.start}>start</button>
          <button onClick={this.pause}>pause</button>
          <button onClick={this.reset}>reset</button>
        </div>
      </>
    );
  }
}

class Timer extends React.Component {
  state = {
    minutes: 0,
    seconds: 0,
  };

  handleMinutes = (e) => {
    if (e.target.value < 0) {
      alert("please dont use negative numbers");
    }
    this.setState({
      minutes: e.target.value,
    });
  };

  handleSeconds = (e) => {
    if (e.target.value < 0) {
      alert("please dont use negative numbers ");
    }

    this.setState({
      seconds: e.target.value,
    });
  };

  handleStart = () => {
    if (this.state.minutes > 0 || this.state.seconds > 0) {
      this.interval = setInterval(() => {
        console.log("start timer interval");
        this.setState({
          seconds: this.state.seconds - 1,
        });
      }, 1000);
    }
  };

  handlePause = () => {
    clearInterval(this.interval);
  };

  handleReset = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      minutes: 0,
      seconds: 0,
    });
  };

  componentDidUpdate = () => {
    if (this.state.minutes < 0) {
      this.setState({
        minutes: 0,
      });
    }

    if (this.state.seconds < 0) {
      this.setState({
        seconds: 0,
      });
    }

    if (this.state.minutes === 0 && this.state.seconds === 0 && this.interval) {
      clearInterval(this.interval);
    } else if (
      this.state.seconds === 0 &&
      this.state.minutes > 0 &&
      this.interval
    ) {
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 60,
      });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return (
      <>
        <p>minutes</p>
        <input
          onChange={this.handleMinutes}
          type="number"
          value={this.state.minutes}
        />
        <p>seconds</p>
        <input
          onChange={this.handleSeconds}
          type="number"
          value={this.state.seconds}
        />{" "}
        <br />
        <div className="sectionButtons">
          <button onClick={this.handleStart}>start</button>
          <button onClick={this.handlePause}>pause</button>
          <button onClick={this.handleReset}>reset</button>
        </div>
      </>
    );
  }
}

class App extends React.Component {
  state = {
    type: "",
  };

  changeType = (type) => {
    this.setState({
      type,
    });
  };
  render() {
    return (
      <>
        <div className="mainButtons">
          <button onClick={() => this.changeType("clock")}>clock</button>
          <button onClick={() => this.changeType("stoper")}>stoper</button>
          <button onClick={() => this.changeType("timer")}>timer</button>
        </div>
        <br />
        {this.state.type === "clock" ? <Clock /> : null}
        {this.state.type === "stoper" ? <Stoper /> : null}
        {this.state.type === "timer" ? <Timer /> : null}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
