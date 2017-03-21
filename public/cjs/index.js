
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs


var itemsAPI = function () {
  return new Promise((resolve, reject) => {
    let str = "Best Sellers";
    let query = encodeURI(str);

    ajaxFunctions.ajaxRequest('GET', "/api/items?q=" + query, function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    });
  });
};
var sideCategoriesAPI = function () {
  return new Promise((resolve, reject) => {
    ajaxFunctions.ajaxRequest('GET', "/api/sideCategories", function (data) {
      var userObject = JSON.parse(data);
      resolve({ sideCategories: userObject });
    });
  });
};
var slideShowAPI = function () {
  return new Promise((resolve, reject) => {
    ajaxFunctions.ajaxRequest('GET', "/api/slideShow", function (data) {
      var userObject = JSON.parse(data);
      resolve({ slideShow: userObject });
    });
  });
};

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

    itemsAPI().then(data => {
      this.setState(data);
    });

    sideCategoriesAPI().then(data => {
      this.setState(data);
    });
    slideShowAPI().then(data => {
      this.setState(data);
    });
  }
  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(Menu, { isAuthenticated: this.state.isAuthenticated }),
      React.createElement(Topblock, { sideCategories: this.state.sideCategories, slideShow: this.state.slideShow }),
      React.createElement(Contents, { items: this.state.items }),
      React.createElement(Footer, null)
    );
  }

}
class Topblock extends React.Component {
  constructor(props) {
    super(props);

    this.currentSlide = n => {
      this.showSlides(this.slideIndex = n);
    };

    this.showSlides = n => {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      if (slides.length == 0) return;
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
    };

    this.plusSlides = n => {
      this.showSlides(this.slideIndex += n);
    };

    this.slideIndex = 1;
  }

  componentDidUpdate() {
    this.slideIndex = 1;
    this.showSlides(this.slideIndex);
  }
  render() {
    let items;

    if (this.props.sideCategories) items = this.props.sideCategories.map((obj, i) => {
      return React.createElement(
        "li",
        { key: i },
        React.createElement(
          "a",
          { href: obj.href, key: i },
          obj.text
        )
      );
    });else items = null;

    let slideShow;

    if (this.props.slideShow) slideShow = this.props.slideShow.map((obj, i) => {
      return React.createElement(
        "div",
        { className: "mySlides myFade", key: i },
        React.createElement(
          "a",
          { href: obj.href, key: i },
          React.createElement("img", { src: obj.img, key: i })
        )
      );
    });else slideShow = React.createElement(Loader, null);

    let dots = [];
    for (let i = 0; slideShow.length !== null && i < slideShow.length; i++) {
      dots.push(React.createElement("span", { className: "dot", onClick: () => {
          this.currentSlide(i + 1);
        }, key: i }));
    }

    return React.createElement(
      "div",
      { className: "topblock" },
      React.createElement(
        "div",
        { className: "categories" },
        React.createElement(
          "ul",
          null,
          items
        )
      ),
      React.createElement(
        "div",
        { className: "slideshow" },
        React.createElement(
          "div",
          { className: "slideshow-container" },
          slideShow,
          React.createElement(
            "a",
            { className: "prev", onClick: () => this.plusSlides(-1) },
            "\u276E"
          ),
          React.createElement(
            "a",
            { className: "next", onClick: () => this.plusSlides(1) },
            "\u276F"
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "div",
          { className: "dotsContainer" },
          dots
        )
      )
    );
  }
}
class Contents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let items;

    // console.log(this.items);
    if (this.props.items.arr) items = this.props.items.arr.map((obj, i) => {
      return React.createElement(
        "div",
        { key: i, className: "grid-item" },
        React.createElement(
          "a",
          { href: obj.href, key: i },
          React.createElement("img", { src: obj.img, key: i })
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
        )
      );
    });else items = React.createElement(Loader, null);
    return React.createElement(
      "div",
      { className: "contents" },
      React.createElement(
        "p",
        null,
        this.props.items.query
      ),
      React.createElement(
        "div",
        { className: "grid" },
        items
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));