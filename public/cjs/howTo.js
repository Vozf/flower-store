

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
      React.createElement(HowTo, null),
      React.createElement(Footer, null)
    );
  }

}
class HowTo extends React.Component {
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
        "How to"
      ),
      React.createElement(
        "p",
        null,
        "You can use theese accounts for testing purposes:"
      ),
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          "admin@site.com:admin"
        ),
        React.createElement(
          "li",
          null,
          "user@site.com:user"
        )
      ),
      React.createElement(
        "p",
        null,
        "Or feel free to create your own.Don't forget to check out admin's dashboard in it profile section."
      ),
      React.createElement(
        "p",
        null,
        "You can also search for \"sale\" for all discounts and \"all\" for all items as well as use tags as \"Birthday\" \"best seller\" \"gift\" and others"
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));