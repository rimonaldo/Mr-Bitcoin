import React from "react"
export class Countdown extends React.Component {
  state = {

  }

  intervalId
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setTargetTime()
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.targetTimeStr !== this.props.targetTimeStr) {
      this.setState({ targetTime: this.props.targetTime })
    }
    if (prevProps.targetDateStr !== this.props.targetDateStr) {
      this.setState({ targetTime: this.props.targetTime })
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  setTargetTime() {
    let targetTime = this.props.targetDateStr + ' ' + this.props.targetTimeStr +':00'
    const countDownDate = new Date(targetTime).getTime()
    const now = new Date().getTime()
    const timeleft = countDownDate - now
    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000)
    this.setState({ days, hours, minutes, seconds })
  }

  render() {
    return (
      <section className="count-down cmp">
        <h4>COUNTDOWN</h4>
        <div className="timer">
          <div>d:{this.state.days}</div>
          <div>h:{this.state.hours}</div>
          <div>m:{this.state.minutes}</div>
          <div>s:{this.state.seconds}</div>
        </div>
      </section>
    )
  }
}
