

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
      React.createElement(SignIn, null),
      React.createElement(Footer, null)
    );
  }

}

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = e => {

      e.preventDefault();

      this.handlePOST(this.state.form, "/signin").then(data => {
        if (data.success) {
          window.location.href = data.redirect;
        } else this.setState({ answer: data, counter: this.state.counter + 1 });
      });
    };

    this.handleChangeObj = e => {
      let form = Object.assign({}, this.state.form);
      form[e.target.name] = e.target.value;
      this.setState({
        form
      });
    };

    this.state = {
      form: {
        username: "",
        password: ""
      },
      answer: {
        message: null,
        success: null
      },
      counter: 0
    };
  }

  serialize(obj) {
    var str = [];
    for (var p in obj) if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
  }
  handlePOST(obj, where) {
    return new Promise((resolve, reject) => {

      let formData = this.serialize(obj);

      const xhr = new XMLHttpRequest();
      xhr.open('post', where);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        console.log(xhr.response);
        resolve(xhr.response);
      });
      console.log(formData);
      xhr.send(formData);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "signR" },
      React.createElement(
        "h2",
        null,
        "Sign In"
      ),
      React.createElement(
        ReactCSSTransitionGroup,
        {
          transitionName: "fadeIn",
          transitionEnterTimeout: 500, transitionLeaveTimeout: 0
        },
        React.createElement(
          "p",
          { className: this.state.answer.success ? '' : 'err', key: this.state.counter, id: "answer" },
          this.state.answer.message
        )
      ),
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit, method: "post" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Email/Username:"
          ),
          React.createElement("input", { type: "email", className: "form-control", required: true, name: "username", value: this.state.form.username, onChange: this.handleChangeObj })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Password:"
          ),
          React.createElement("input", { type: "password", className: "form-control", required: true, name: "password", value: this.state.form.password, onChange: this.handleChangeObj })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Sign In" })
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));