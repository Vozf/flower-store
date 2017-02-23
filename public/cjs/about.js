

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null

    };
  }
  componentDidMount() {
    authAPI().then(data => {
      this.setState(data);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Menu, { isAuthenticated: this.state.isAuthenticated }),
      React.createElement(About, null),
      React.createElement(Footer, null)
    );
  }

}
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { style: { "fontSize": "120%", padding: "0 20px" } },
      React.createElement(
        "h2",
        { style: { "textAlign": "center" } },
        "About"
      ),
      React.createElement(
        "p",
        null,
        "This site have been created in educational purposes and is not a real shop."
      ),
      React.createElement(
        "p",
        null,
        "Most of pictures have been taken from ",
        React.createElement(
          "a",
          { href: "https://www.ftd.com/" },
          "https://www.ftd.com/"
        ),
        "."
      ),
      React.createElement(
        "p",
        null,
        "Back-end is biult using Node.js, Express, Passport,MongoDB(Mongoose) and ClementineJS boilerplate. Front-end is built using React(Babel,ES6) and Bootstrap."
      ),
      React.createElement(
        "p",
        null,
        "Created by Alexander Yaroshevich in 2017."
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));