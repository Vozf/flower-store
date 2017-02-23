




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
        <Customers/>
        <Footer/>
      </div>
    )
  }

}
class Customers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div style={{"fontSize":"120%",padding:"0 20px"}}>
      <h2 style={{"textAlign":"center"}}>Customer service</h2>
   
      <p>Our customer representatives can help you track and manage your recent purchases or 
      help with missing, damaged or incorrect orders. Please have your Order Number available.</p>
      
      </div>
      );
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))