




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isAuthenticated: null,
      
    }

  }
  componentDidMount(){
    authAPI().then(data => {
      this.setState(data);
    });

    


  }
  render() {
    return (
      <div className="container">
        <Menu isAuthenticated={this.state.isAuthenticated}/>
        <HowTo/>
        <Footer/>
      </div>
    )
  }

}
class HowTo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div style={{"fontSize":"120%",padding:"0 20px"}}>
      <h2 style={{"textAlign":"center"}}>How to</h2>
      <p>
      You can use theese accounts for testing purposes:
      </p>
      <ul>
      <li>admin@site.com:admin</li>
      <li>user@site.com:user</li>
      </ul>
            <p>Or feel free to create your own.Don't forget to check out admin's dashboard in it profile section.
            </p>
            <p>You can also search for "sale" for all discounts and "all" for all items as well as use tags as "Birthday" "best seller" "gift" and others</p>

      </div>
      );
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))