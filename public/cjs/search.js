
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs


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
      'div',
      { className: 'container' },
      React.createElement(Menu, { isAuthenticated: this.state.isAuthenticated }),
      React.createElement(Search, null),
      React.createElement(Footer, null)
    );
  }

}
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.tryQuery = () => {
      var search = location.search.substring(1);
      try {
        return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/, " ") + '"}').q;
      } catch (e) {
        return "";
      }
    };

    this.handleClick = () => {
      this.setState({ items: { isWait: true } });
      this.itemsAPI().then(data => {
        this.setState(data);

        //this.setState({items:{isWait:false}})
      });
      return false;
    };

    this.itemsAPI = () => {
      return new Promise((resolve, reject) => {
        let str = this.state.userInput;
        let query = encodeURI(str);

        ajaxFunctions.ajaxRequest('GET', "/api/items?q=" + query, function (data) {
          var userObject = JSON.parse(data);
          resolve(userObject);
        });
      });
    };

    let userInput = this.tryQuery();

    this.state = {
      items: { query: null, arr: null, isWait: false },
      userInput
    };
    if (userInput.length > 0) this.handleClick();
  }
  // handleChange=(e)=>{
  //   this.setState({userInput:e.target.value})
  // };

  render() {
    let head;
    let items;
    if (!this.state.items.isWait) {
      if (this.state.items.query != null) {
        head = React.createElement(
          'p',
          { className: 'query' },
          this.state.items.query
        );
        if (this.state.items.arr == "Not Found") items = React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            { style: { "text-align": "center" } },
            'Sorry Items \'',
            this.state.items.query,
            '\' can\'t be found'
          )
        );else items = this.state.items.arr.map((obj, i) => {
          return React.createElement(
            'div',
            { key: i, className: 'grid-item' },
            React.createElement(
              'a',
              { href: obj.href, key: i },
              React.createElement('img', { src: obj.img, key: i })
            ),
            React.createElement(
              'p',
              { className: 'type' },
              obj.name
            ),
            React.createElement(
              'p',
              { className: 'priceContainer' },
              obj.oldPrice ? React.createElement(
                'span',
                { className: 'oldPrice' },
                obj.oldPrice
              ) : null,
              React.createElement(
                'b',
                { className: obj.oldPrice ? "newPrice" : "price" },
                obj.price
              )
            )
          );
        });
      }
    } else items = React.createElement(Loader, null);
    return React.createElement(
      'div',
      { className: 'contents search' },
      React.createElement(
        'form',
        { type: 'get' },
        React.createElement(
          'div',
          null,
          React.createElement(
            'label',
            null,
            'Search:'
          ),
          React.createElement('input', { type: 'text', className: 'form-control', defaultValue: this.state.userInput, onChange: this.handleChange, name: 'q' }),
          React.createElement('input', { id: 'btnSearch', className: 'btn btn-primary', type: 'submit', defaultValue: 'Search' })
        )
      ),
      head,
      React.createElement(
        'div',
        { className: 'grid' },
        items
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));