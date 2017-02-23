class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { className: "footer" },
      React.createElement(
        "b",
        null,
        "To order by phone, call 1-800-SEND-FTD (1-800-736-3383)"
      ),
      React.createElement("br", null),
      React.createElement(
        "ul",
        { className: "map" },
        React.createElement(
          "b",
          null,
          "Site:"
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/" },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/profile" },
            "My account"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/customers" },
            "Customer Service"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/shipping" },
            "Service/Shipping Fees"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/shipping" },
            "Shipping"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "/about" },
            "Contact Us"
          )
        )
      ),
      React.createElement(
        "ul",
        { className: "social" },
        React.createElement(
          "b",
          null,
          "Stay connected:"
        ),
        React.createElement(
          "li",
          null,
          React.createElement("a", { className: "fb", href: "https://www.facebook.com/profile.php?id=100001748540592" })
        ),
        React.createElement(
          "li",
          null,
          React.createElement("a", { className: "vk", href: "https://www.vk.com/vozman" })
        ),
        React.createElement(
          "li",
          null,
          React.createElement("a", { className: "tw", href: "#" })
        )
      ),
      React.createElement(
        "h5",
        null,
        "Created by Alexander Yaroshevich"
      )
    );
  }
}