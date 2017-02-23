


var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isAuthenticated: null,
      items: {query:null,arr:null},
      sideCategories:null,
      slideShow:null
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
        <SignIn/>

  <Footer/>
      </div>
    )
  }

}


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      form:{
        username:"",
        password:""
      },
      answer:{
        message:null,
        success:null
      },
      counter:0
    }
  }
  handleSubmit=(e)=>{

     e.preventDefault();

    this.handlePOST(this.state.form,"/signin").then((data)=>{
      if(data.success){
        window.location.href=data.redirect;
      }
      else
      this.setState({answer:data,counter:this.state.counter+1})
      
    });
  };
  handleChangeObj=(e)=>{
      let form = Object.assign({}, this.state.form)
      form[e.target.name] = e.target.value;
      this.setState({
        form
      });
  };
  serialize(obj) {
    var str = [];
    for(var p in obj)
     if (obj.hasOwnProperty(p)) {
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   return str.join("&");
  }
  handlePOST(obj,where){
    return new Promise((resolve,reject)=>{
      
        let formData=this.serialize(obj)
    
    const xhr = new XMLHttpRequest();
    xhr.open('post', where);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      resolve(xhr.response);
      
    });
    console.log(formData)
    xhr.send(formData);
     })
 }
  render() {
    return (
<div className="signR">
  <h2>Sign In</h2>
                    <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500} transitionLeaveTimeout={0}
        >
        <p className={this.state.answer.success?'':'err'} key={this.state.counter} id="answer">
               {this.state.answer.message}
        </p>
        </ReactCSSTransitionGroup>
  			<form onSubmit={this.handleSubmit}  method="post">
				<div>
					<label>Email/Username:</label>
					<input type="email" className="form-control" required  name="username" value={this.state.form.username} onChange={this.handleChangeObj} />
				</div>
				<div>
					<label>Password:</label>
					<input type="password" className="form-control" required name="password" value={this.state.form.password} onChange={this.handleChangeObj} />
				</div>
				<div>
					<input className="btn btn-primary" type="submit" value="Sign In" />
				</div>
			</form>
</div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('con'))