import React from "react";
class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
     
        search: ""
      
    };
  }

  onChange = event => {
    event.preventDefault();
    this.props.filter(event);
  };

  render() {
    return (
      <div className="row">
        <div className="col text-truncate text-left">
          <input
            type="text"
            name="author"
            onChange={this.onChange}
            autoCapitalize={true}
            id="author"
            placeholder="Search for Id`s.."
            title="Type in an id"
          />
        </div>
      </div>
    );
  }
}
export default Filter;
