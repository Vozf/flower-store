

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
      React.createElement(SignUp, null),
      React.createElement(Footer, null)
    );
  }

}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }
  handleChange(e) {
    document.getElementById('confirmpass').pattern = e.target.value;
    //form.confirmpass.pattern = e.target.value;
  }
  render() {
    return React.createElement(
      "div",
      { className: "signR" },
      React.createElement(
        "h2",
        null,
        "Sign Up"
      ),
      React.createElement(
        "form",
        { action: "/register", method: "post" },
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
          React.createElement("input", { type: "password", className: "form-control", required: true, name: "password", onChange: this.handleChange })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Confirm Password:"
          ),
          React.createElement("input", { type: "password", id: "confirmpass", className: "form-control", required: true, name: "password" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Sing Up" })
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));