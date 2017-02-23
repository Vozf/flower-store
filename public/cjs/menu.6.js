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
            { className: "logo", href: "#home" },
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
              { href: "#" },
              "Flowers"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "Plants"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "Gifts"
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
              { href: "#" },
              "Shipping"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "Customer Service"
            ),
            React.createElement(
              "a",
              { href: "#" },
              "About us"
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
              { href: "#profile" },
              "Profile"
            )
          ),
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "#logout" },
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
              { href: "#login" },
              "Sign in"
            )
          ),
          React.createElement(
            "li",
            { className: "sign" },
            React.createElement(
              "a",
              { href: "#signup" },
              "Sign up"
            )
          )
        ) : null,
        React.createElement(
          "li",
          { className: "sign search" },
          React.createElement(
            "form",
            null,
            React.createElement("input", { type: "search", placeholder: "Search" })
          )
        )
      )
    );
  }
}