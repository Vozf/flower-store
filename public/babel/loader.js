class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { className: "loader" },
      React.createElement(
        "div",
        { className: "uil-ellipsis-css" },
        React.createElement(
          "div",
          { className: "ib" },
          React.createElement(
            "div",
            { className: "circle" },
            React.createElement("div", null)
          ),
          React.createElement(
            "div",
            { className: "circle" },
            React.createElement("div", null)
          ),
          React.createElement(
            "div",
            { className: "circle" },
            React.createElement("div", null)
          ),
          React.createElement(
            "div",
            { className: "circle" },
            React.createElement("div", null)
          )
        )
      )
    );
  }
}