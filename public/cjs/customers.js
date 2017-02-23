

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
      React.createElement(Customers, null),
      React.createElement(Footer, null)
    );
  }

}
class Customers extends React.Component {
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
        "Customer service"
      ),
      React.createElement(
        "p",
        null,
        "Our customer representatives can help you track and manage your recent purchases or help with missing, damaged or incorrect orders. Please have your Order Number available."
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));