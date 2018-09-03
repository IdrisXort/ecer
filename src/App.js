import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import Person from "./Person";
import Filter from "./Filter";
let counter = 20;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      show: [],
      isGodConn: true,
      search: "STEPHEN",
      data: [],
      hitsPerPage: 20
    };
  }

  getData = a => {
    fetch(a)
      .then(response => {
        return response.json();
      })
      .then(result => {
        localStorage.setItem(
          this.state.search.toUpperCase(),
          JSON.stringify(
            result.hits.map(a => {
              return {
                author: a.author.toUpperCase() || {},
                title: a.title.toUpperCase() || {},
                url: a.url.toUpperCase() || {},
                points: a.points || {}
              };
            })
          )
        );

        this.setState({
          people: result.hits.map(hit => {
            const author = hit.author.toUpperCase();
            const title = hit.title.toUpperCase();
            const url = hit.url.toUpperCase();
            const points = hit.points;

            return { author, title, url, points };
          }),
          show: result.hits.map(hit => {
            const author = hit.author.toUpperCase();
            const title = hit.title.toUpperCase();
            const url = hit.url.toUpperCase();
            const points = hit.points;

            return { author, title, url, points };
          })
        });
      })
      .catch(() =>
        this.setState({ isGodConn: false }, console.error("something is wrong"))
      );
  };
  getMore = event => {
    event.preventDefault();
    var hitsPerPage = this.state.hitsPerPage;
    hitsPerPage += 20;

    this.getData(
      "http://hn.algolia.com/api/v1/search?query=" +
        this.state.search +
        "&tags=story&hitsPerPage=" +
        hitsPerPage.toString()
    );
    this.setState({});
  };
  setSearch = e => {
    e.preventDefault();

    this.setState({ search: e.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (!localStorage.getItem(this.state.search)) {
      this.getData(
        "http://hn.algolia.com/api/v1/search?query=" +
          this.state.search +
          "&tags=story&hitsPerPage=" +
          this.state.hitsPerPage.toString()
      );
    } else {
      var data = JSON.parse(
        localStorage.getItem(this.state.search.toUpperCase())
      );
      this.setState({ people: data, show: data });
    }
  };
  componentDidMount() {
    this.getData(
      "http://hn.algolia.com/api/v1/search?query=" +
        this.state.search +
        "&tags=story&hitsPerPage=" +
        counter.toString()
    );
  }

  mijnFilter(event) {
    const show = [...this.state.people].filter(item =>
      item.author.toUpperCase().includes(event.target.value.toUpperCase())
    );

    this.setState({
      show
    });
  }

  render() {
    {
      this.state.people.map(a => {});
    }
    return (
      <div className="App">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">List of People</h1>
            <form onSubmit={this.handleSubmit}>
              <input type="text" onChange={this.setSearch} className="text" />
              <input type="submit" className="submit" />
            </form>

            <Filter filter={this.mijnFilter.bind(this)} />
            {this.state.show.map((subject, key) => {
              return (
                <div id={key}>
                  <Person
                    author={subject.author}
                    title={subject.title}
                    points={subject.points}
                    url={subject.url}
                  />
                </div>
              );
            })}
            <input
              type="button"
              value="More"
              onClick={this.getMore}
              className="button "
            />
          </div>
          {!this.state.isGodConn && <div> something is wrong</div>}
        </div>
      </div>
    );
  }
}

export default App;
