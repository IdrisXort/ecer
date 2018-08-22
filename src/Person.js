import React from "react";

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ishidden: false
    };
  }
  componentDidMount() {
    // this.setState({malo:this.props.renderingList});
  }
  Dismiss() {
    this.setState({ ishidden: true });
  }
  render() {
    return (
      <div>
        {!this.state.ishidden && (
          <div className="row">
            <div className="col text-truncate text-left ">
              {this.props.author}{" "}
            </div>
            <div className="col text-truncate text-left">
              {this.props.title}{" "}
            </div>
            <div className="col text-truncate text-left"> {this.props.url}</div>
            <div className="col text-truncate text-left">
              {this.props.points}{" "}
            </div>
            <div className="col text-truncate text-left">
              <button onClick={this.Dismiss.bind(this)}>Dismiss </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Person;
