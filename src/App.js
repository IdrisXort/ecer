import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import Person from "./Person";
import Filter from "./Filter";
var route = "http://hn.algolia.com/api/v1/search?query=stephen&tags=story";
var val = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      show: [],
      isGodConn: true
    };
  }

  componentWillMount() {
    fetch(route)
      .then(response => {
        return response.json();
      })
      .then(result =>
        this.setState({
          // people: [...this.state.people].concat(result.hits),
          people: result.hits.map(hit => {
            const author = hit.author;
            const title = hit.title;
            const url = hit.url;
            const points = hit.points;
           
            return { author, title, url, points };
          }),
          show: result.hits.map(hit => {
            const author = hit.author;
            const title = hit.title;
            const url = hit.url;
            const points = hit.points;
           
            return { author, title, url, points };
          })
          
        })
        
      )
      .catch(() =>
        this.setState({ isGodConn: false }, console.error("something is wrong"))
      );
     
  }

  mijnFilter(event) {
    const show = [...this.state.people].filter(item =>
      item.author.toUpperCase().includes(event.target.value.toUpperCase())
    );
    console.log(show);
    this.setState({
      show
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">List of People</h1>

            <Filter filter={this.mijnFilter.bind(this)} />
            {this.state.show.map((subject, key) => {
              return (
                <div id={key}>
                  <Person
                    author={subject.author.toUpperCase()}
                    title={subject.title.toUpperCase()}
                    points={subject.points}
                    url={subject.url.toUpperCase()}
                  />
                </div>
              );
            })}
          </div>
          {!this.state.isGodConn && <div> something is wrong</div>}
        </div>
      </div>
    );
  }
}

export default App;
