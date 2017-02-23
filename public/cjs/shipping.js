

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
      React.createElement(Shipping, null),
      React.createElement(Footer, null)
    );
  }

}
class Shipping extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { style: { "fontSize": "120%", padding: "0 20px" } },
      React.createElement(
        "h2",
        { style: { "textAlign": "center" } },
        "Delivery, Service, and Shipping Policy"
      ),
      React.createElement(
        "h3",
        { style: { "textAlign": "center" } },
        "Florist Delivered - Fresh Flowers and Plants"
      ),
      React.createElement(
        "p",
        null,
        "We can deliver flowers, plants, and specialty gifts to almost 100% of the United States and Canada. We can also deliver flowers, worldwide, to more than 150 countries across the globe. To place an international order, or for more specific information on the 150 countries we serve, please visit our International Shop."
      ),
      React.createElement(
        "p",
        null,
        "Unfortunately, we cannot guarantee delivery at a specific time of day. Substitution may be necessary to ensure your gift is delivered on the day you requested. Taxes are based on prevailing rates in the delivery area."
      ),
      React.createElement(
        "p",
        null,
        "In most areas of the United States and Canada, orders placed as late as 2p.m. in the recipient's time zone can be delivered that day (earlier times may apply to some areas and during holidays). Saturday and Sunday deliveries are available in some areas for orders placed by 1p.m. in the recipient's time zone."
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));