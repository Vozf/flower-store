

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
      isAuthenticated: null,
      account: null
    };
  }
  componentDidMount() {
    authAPI().then(data => {
      this.setState(data);
    });

    accAPI().then(data => {
      this.setState(data);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Menu, { isAuthenticated: this.state.isAuthenticated }),
      React.createElement(Profile, { account: this.state.account }),
      React.createElement(Footer, null)
    );
  }

}
class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let account = this.props.account;

    if (account) {
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
        return React.createElement(
          "li",
          { key: i },
          React.createElement(
            "a",
            { href: obj.href, key: i },
            React.createElement(
              "p",
              { key: i },
              obj.name,
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
              "form",
              { action: "/profile", method: "post" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "Email/Username:"
                ),
                React.createElement("input", { defaultValue: account.username, type: "email", className: "form-control", name: "username" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "New Password:"
                ),
                React.createElement("input", { type: "password", className: "form-control", required: true, name: "password" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "First Name:"
                ),
                React.createElement("input", { defaultValue: account.name, type: "text", className: "form-control", name: "name" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  null,
                  "Phone Nubmer:"
                ),
                React.createElement("input", { defaultValue: account.phone, type: "tel", className: "form-control", pattern: "[+]?[0-9]{12}", placeholder: "+375291234567", name: "phone" })
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
                  React.createElement("input", { type: "password", className: "form-control", required: true, name: "password" })
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