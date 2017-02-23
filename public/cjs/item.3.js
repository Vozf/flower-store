

var itemAPI = function () {
  return new Promise((resolve, reject) => {
    let id = window.location.pathname.slice("/item/".length);
    let query = encodeURI(id);

    ajaxFunctions.ajaxRequest('GET', "/api/items/id/?id=" + query, function (data) {
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
      item: null
    };
  }
  componentDidMount() {
    authAPI().then(data => {
      this.setState(data);
    });

    itemAPI().then(data => {
      this.setState(data);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Menu, { isAuthenticated: this.state.isAuthenticated }),
      React.createElement(Item, { isAuthenticated: this.state.isAuthenticated, item: this.state.item }),
      React.createElement(Footer, null)
    );
  }

}
class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    let obj = this.props.item;
    if (obj == null) {
      return React.createElement(
        "div",
        null,
        React.createElement(Loader, null)
      );
    } else if (obj == "Not Found") return React.createElement(
      "div",
      null,
      React.createElement(
        "h2",
        { style: { "text-align": "center" } },
        "Sorry Item can't be found"
      )
    );else {
      let but = this.props.isAuthenticated ? React.createElement(
        "form",
        { method: "post", action: "/api/addOrder/" + obj._id },
        React.createElement("input", { className: "btn btn-primary", type: "submit", value: obj.isAvailiable ? "Order on this account" : "Sorry item is not availiable", disabled: !obj.isAvailiable })
      ) : React.createElement(
        "form",
        { method: "post" },
        React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Sign in" })
      );
      let right;
      right = React.createElement(
        "div",
        null,
        but,
        React.createElement(
          "div",
          { className: "separator" },
          React.createElement(
            "span",
            null,
            "Or"
          )
        ),
        React.createElement(
          "form",
          { method: "post", action: "/api/addOrder/" + obj._id },
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              null,
              "First Name:"
            ),
            React.createElement("input", { type: "text", className: "form-control", name: "name" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              null,
              "Telephone Nubmer:"
            ),
            React.createElement("input", { type: "tel", className: "form-control", pattern: "[+]?[0-9]{12}", placeholder: "+375291234567", required: true, name: "phone" })
          ),
          React.createElement(
            "div",
            null,
            React.createElement("input", { className: "btn btn-primary", type: "submit", value: obj.isAvailiable ? "Order" : "Sorry item is not availiable", disabled: !obj.isAvailiable })
          )
        )
      );

      return React.createElement(
        "div",
        { className: "itemP" },
        React.createElement(
          "h2",
          null,
          obj.name
        ),
        React.createElement(
          "div",
          { className: "wrap" },
          React.createElement(
            "div",
            { className: "left" },
            React.createElement(
              "div",
              { className: "grid-item" },
              React.createElement(
                "a",
                { href: obj.href },
                React.createElement("img", { src: obj.img })
              ),
              React.createElement(
                "p",
                { className: "type" },
                obj.name
              ),
              React.createElement(
                "p",
                { className: "priceContainer" },
                obj.oldPrice ? React.createElement(
                  "span",
                  { className: "oldPrice" },
                  obj.oldPrice
                ) : null,
                React.createElement(
                  "b",
                  { className: obj.oldPrice ? "newPrice" : "price" },
                  obj.price
                )
              ),
              React.createElement(
                "h4",
                null,
                "Description:"
              ),
              React.createElement(
                "p",
                null,
                obj.description
              )
            )
          ),
          React.createElement(
            "div",
            { className: "right" },
            right
          )
        )
      );
    }
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));