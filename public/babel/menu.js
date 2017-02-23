
var authAPI = function() {
  return new Promise((resolve, reject) => {
    
    ajaxFunctions.ajaxRequest('GET', "/api/auth",function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
    // setTimeout(() => {
    //   let isAuthenticated=false;
    //   resolve({isAuthenticated})
    // }, 500);  
  })
}


class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="menu">
        <ul>
      <li><a className="logo" href="/">Flower Store</a></li>
      <li className="drop">
        <a href="#" className="dropbtn">Categories</a>
        <div className="dropdown-content">
          <a href="/search?q=flowers">Flowers</a>
          <a href="/search?q=plants">Plants</a>
          <a href="/search?q=gifts">Gifts</a>
          <a href="/search">Search</a>
        </div>
      </li>
      <li className="drop">
        <a href="#" className="dropbtn">About</a>
        <div className="dropdown-content">
          <a href="/shipping">Shipping</a>
          <a href="/customers">Customer Service</a>
          <a href="/about">About us</a>
          <a href="/howto">How to</a>
        </div>
      </li>
      
       {this.props.isAuthenticated===true?
            (<span><li className="sign"><a href="/profile">Profile</a></li>
      <li className="sign"><a href="/logout">Log out</a></li></span>)
            :(this.props.isAuthenticated===false?
            (<span><li className="sign"><a href="/signin">Sign in</a></li>
      <li className="sign"><a href="/signup">Sign up</a></li></span>)
            :null)}   

      <li className="sign search">
        <form type="get" action="/search">
          <input  type="search" name="q" placeholder=""/>
        </form>
      </li>
    </ul>
      </div>
    )
  }
}