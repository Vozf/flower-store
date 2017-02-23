
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var accAPI = function () {
  return new Promise((resolve, reject) => {

    ajaxFunctions.ajaxRequest('GET', "/api/profile", function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    });
  });
};

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
      React.createElement(Profile, null),
      React.createElement(Footer, null)
    );
  }

}
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = e => {

      e.preventDefault();

      this.handlePOST(this.state.form, "/profile").then(data => {

        this.setState({ answer: data, counter: this.state.counter + 1 });
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
        password: "",
        confirmPassword: "",
        name: "",
        phone: ""
      },
      account: null,
      answer: {
        message: null,
        success: null
      },
      counter: 0
    };
  }
  componentDidMount() {

    accAPI().then(data => {
      console.log(data);
      this.setState(data);
      let form = Object.assign(this.state.form);
      form.username = data.account.username;
      form.name = data.account.name;
      form.phone = data.account.phone;
      console.log(form);
      this.setState({ form });
    });
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
        //console.log(xhr.response);
        resolve(xhr.response);
      });
      //console.log(formData)
      xhr.send(formData);
    });
  }
  render() {
    let account = this.state.account;

    if (account) {
      //console.log(account);
      let items;
      if (account.purchases.length == 0) items = React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          { style: { "textAlign": "center" } },
          "Nothing Found"
        )
      );else items = account.purchases.map((obj, i) => {
        obj.date = new Date(obj.date);
        return React.createElement(
          "li",
          { key: i },
          React.createElement(
            "a",
            { href: obj.item.href, key: i },
            React.createElement(
              "p",
              { key: i },
              obj.item.name,
              " on ",
              obj.date.getDate() + '-' + (obj.date.getMonth() + 1) + "-" + obj.date.getFullYear(),
              React.createElement("span", { className: obj.finished ? "true" : "false" })
            )
          )
        );
      });

      return React.createElement(
        "div",
        { className: "profile" },
        React.createElement(
          "h2",
          null,
          "Profile"
        ),
        React.createElement(
          "div",
          { className: "wrap" },
          React.createElement(
            "div",
            { className: "left" },
            React.createElement(
              "h4",
              null,
              "Your last purchases:"
            ),
            React.createElement(
              "ul",
              null,
              items
            )
          ),
          React.createElement(
            "div",
            { className: "right" },
            React.createElement(
              "h4",
              null,
              "Update your info:"
            ),
            React.createElement(
              "p",
              { style: { color: "gray", "fontSize": "90%" } },
              "Leave a field blank if you don't want to change it"
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
              { onSubmit: this.handleSubmit, action: "/profile", method: "post" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "Email/Username:"
                ),
                React.createElement("input", { value: this.state.form.username, onChange: this.handleChangeObj, type: "email", className: "form-control", name: "username" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "New Password:"
                ),
                React.createElement("input", { value: this.state.form.password, onChange: this.handleChangeObj, type: "password", className: "form-control", name: "password" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "First Name:"
                ),
                React.createElement("input", { value: this.state.form.name, onChange: this.handleChangeObj, type: "text", className: "form-control", name: "name" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "Phone Nubmer:"
                ),
                React.createElement("input", { value: this.state.form.phone, onChange: this.handleChangeObj, type: "tel", className: "form-control", pattern: "[+]?[0-9]{12}", placeholder: "+375291234567", name: "phone" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "label",
                    null,
                    "Confirm Current Password:"
                  ),
                  React.createElement("input", { value: this.state.form.confirmPassword, onChange: this.handleChangeObj, type: "password", className: "form-control", required: true, name: "confirmPassword" })
                ),
                React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Update" })
              )
            )
          )
        )
      );
    } else return React.createElement(Loader, null);
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));