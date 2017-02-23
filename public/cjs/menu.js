
var authAPI = function () {
  return new Promise((resolve, reject) => {

    ajaxFunctions.ajaxRequest('GET', "/api/auth", function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    });
    // setTimeout(() => {
    //   let isAuthenticated=false;
    //   resolve({isAuthenticated})
    // }, 500);  
  });
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { className: "menu" },
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "logo", href: "/" },
            "Flower Store"
          )
        ),
        React.createElement(
          "li",
          { className: "drop" },
          React.createElement(
            "a",
            { href: "#", className: "dropbtn" },
            "Categories"
          ),
          React.createElement(
            "div",
            { className: "dropdown-content" },
            React.createElement(
              "a",
              { href: "/search?q=flowers" },
              "Flowers"
            ),
            React.createElement(
              "a",
              { href: "/search?q=plants" },
              "Plants"
            ),
            React.createElement(
              "a",
              { href: "/search?q=gifts" },
              "Gifts"
            ),
            React.createElement(
              "a",
              { href: "/search" },
              "Search"
            )
          )
        ),
        React.createElement(
          "li",
          { className: "drop" },
          React.createElement(
            "a",
            { href: "#", className: "dropbtn" },
            "About"
          ),
          React.createElement(
            "div",
            { className: "dropdown-content" },
            React.createElement(
              "a",
              { href: "/shipping" },
              "Shipping"
            ),
            React.createElement(
              "a",
              { href: "/customers" },
              "Customer Service"
            ),
            React.createElement(
              "a",
              { href: "/about" },
              "About us"
            ),
            React.createElement(
              "a",
              { href: "/howto" },
              "How to"
            )
          )
        ),
        this.props.isAuthenticated === true ? React.createElement(
          "span",
          null,
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "/profile" },
              "Profile"
            )
          ),
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "/logout" },
              "Log out"
            )
          )
        ) : this.props.isAuthenticated === false ? React.createElement(
          "span",
          null,
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "/signin" },
              "Sign in"
            )
          ),
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "/signup" },
              "Sign up"
            )
          )
        ) : null,
        React.createElement(
          "li",
          { className: "sign search" },
          React.createElement(
            "form",
            { type: "get", action: "/search" },
            React.createElement("input", { type: "search", name: "q", placeholder: "" })
          )
        )
      )
    );
  }
}