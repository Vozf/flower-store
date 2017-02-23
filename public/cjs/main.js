
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs


var authAPI = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isAuthenticated = false;
      resolve({ isAuthenticated });
    }, 500);
  });
};

var itemsAPI = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let arr = [{ href: "#", img: "https://www.ftdimg.com/pics/products/17-V2_200x225.jpg", name: "Roses", price: 15 }, { href: "#", img: "https://www.ftdimg.com/pics/products/SMRB_200x225.jpg", name: "Roses", price: 15 }, { href: "#", img: "https://www.ftdimg.com/pics/products/17-V4_200x225.jpg", name: "Roses", price: 15, oldPrice: 25 }, { href: "#", img: "https://www.ftdimg.com/pics/products/C15-4790_200x225.jpg", name: "Roses", price: 15 }, { href: "#", img: "https://www.ftdimg.com/pics/products/FXVP_200x225.jpg", name: "Roses", price: 15 }, { href: "#", img: "https://www.ftdimg.com/pics/products/FRR4_200x225.jpg", name: "Roses", price: 15 }, { href: "#", img: "https://www.ftdimg.com/pics/products/C9-5162_200x225.jpg", name: "Roses", price: 15 }];
      let query = "Best Sellers";
      let items = { items: { arr, query } };

      resolve(items);
    }, 500);
  });
};
var sideCategoriesAPI = function () {
  return new Promise((resolve, reject) => {
    let sideCategories = [{ href: "#", text: "Birtday" }, { href: "#", text: "Valentine's Day Flowers" }, { href: "#", text: "Valentine's Day Plants" }, { href: "#", text: "Valentine's Day Best Sellers" }, { href: "#", text: "Valentine's Day Gifts" }];
    setTimeout(() => {
      resolve({ sideCategories });
    }, 500);
  });
};
var slideShowAPI = function () {
  return new Promise((resolve, reject) => {
    let slideShow = [{ href: "#", img: "https://www.ftdimg.com/pics/products/vday17_hpslide_studio_np.jpg" }, { href: "#", img: "https://www.ftdimg.com/pics/products/vday17_hpslide_plants_np.jpg" }, { href: "#", img: "https://www.ftdimg.com/pics/products/vday17_hpslide_gifts_np.jpg" }, { href: "#", img: "https://www.ftdimg.com/pics/products/vday17_hpslide_weekendsale_50_alt3.jpg" }];
    setTimeout(() => {
      resolve({ slideShow });
    }, 500);
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
      React.createElement(LogIn, null),
      React.createElement(SignUp, null),
      React.createElement(Footer, null)
    );
  }

}
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
            { href: "#" },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
            "My account"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
            "Customer Service"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
            "Service/Shipping Fees"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
            "Shipping"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "#" },
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
          React.createElement("a", { className: "fb", href: "#" })
        ),
        React.createElement(
          "li",
          null,
          React.createElement("a", { className: "vk", href: "#" })
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
class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(
      "div",
      { className: "signR" },
      React.createElement(
        "h2",
        null,
        "Log in"
      ),
      React.createElement(
        "form",
        { action: "/login", method: "post" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Email/Username:"
          ),
          React.createElement("input", { type: "email", className: "form-control", required: true, name: "username" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Password:"
          ),
          React.createElement("input", { type: "password", className: "form-control", required: true, name: "password" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Log In" })
        )
      )
    );
  }
}
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ""
    };
  }
  handleChange(e) {
    document.getElementById('confirmpass').pattern = e.target.value;
    //form.confirmpass.pattern = e.target.value;
  }
  render() {
    return React.createElement(
      "div",
      { className: "signR" },
      React.createElement(
        "h2",
        null,
        "Sign Up"
      ),
      React.createElement(
        "form",
        { action: "/register", method: "post" },
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Email/Username:"
          ),
          React.createElement("input", { type: "email", className: "form-control", required: true, name: "username" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Password:"
          ),
          React.createElement("input", { type: "password", className: "form-control", required: true, name: "password", onChange: this.handleChange })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "label",
            null,
            "Confirm Password:"
          ),
          React.createElement("input", { type: "password", id: "confirmpass", className: "form-control", required: true, name: "password" })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", { className: "btn btn-primary", type: "submit", value: "Sing Up" })
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('con'));