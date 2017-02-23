




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
        <About/>
        <Footer/>
      </div>
    )
  }

}
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div style={{"fontSize":"120%",padding:"0 20px"}}>
      <h2 style={{"textAlign":"center"}}>About</h2>
      <p>
      This site have been created in educational purposes and is not a real shop.
      </p>
            <p>Most of pictures have been taken from <a href="https://www.ftd.com/">https://www.ftd.com/</a>.
            </p>
      <p>
      Back-end is biult using Node.js, Express, Passport,MongoDB(Mongoose) and ClementineJS boilerplate. Front-end is built using React(Babel,ES6) and Bootstrap.
      </p>
      <p>Created by Alexander Yaroshevich in 2017.
      </p>
      </div>
      );
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))