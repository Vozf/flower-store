

var authAPI = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isAuthenticated = false;
      resolve({ isAuthenticated });
    }, 500);
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      items: { query: null, arr: null },
      sideCategories: null,
      slideShow: null
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
      React.createElement(LogIn, null),
      React.createElement(Footer, null)
    );
  }

}

class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { className: "signR" },
      React.createElement(
        "h2",
        null,
        "Log in"
      ),
      React.createElement(
        "form",
        { action: "/login", method: "post" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Email/Username:"
          ),
          React.createElement("input", { type: "email", className: "form-control", required: true, name: "username" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Password:"
          ),
          React.createElement("input", { type: "password", className: "form-control", required: true, name: "password" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Log In" })
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));