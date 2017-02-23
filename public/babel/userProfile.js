
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var accAPI = function() {
  return new Promise((resolve, reject) => {

    ajaxFunctions.ajaxRequest('GET', "/api/profile", function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
  })
}



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
        <Profile/>
        <Footer/>
      </div>
    )
  }

}
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      form:{
        username:"",
        password:"",
        confirmPassword:"",
        name:"",
        phone:""
      },
      account:null,
      answer:{
        message:null,
        success:null
      },
      counter:0
    }
  }
    componentDidMount(){


    accAPI().then(data => {
      console.log(data);
      this.setState(data);
      let form=Object.assign(this.state.form);
      form.username=data.account.username;
      form.name=data.account.name;
      form.phone=data.account.phone;
      console.log(form);
      this.setState({form});
    });
    


  }
  handleSubmit=(e)=>{
 
     e.preventDefault();

    this.handlePOST(this.state.form,"/profile").then((data)=>{

      
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
      //console.log(xhr.response);
      resolve(xhr.response);
      
    });
    //console.log(formData)
    xhr.send(formData);
     })
 }
  render() {
    let account=this.state.account;
    

    if(account){
      //console.log(account);
      let items;
     if(account.purchases.length==0)
        items= <div><p style={{"textAlign":"center"}}>Nothing Found</p></div>;
      else
       items = account.purchases.map((obj, i) => {
         obj.date=new Date(obj.date);
		  return (
        <li key={i} >
          <a href={obj.item.href}  key={i}>         
           <p key={i} >
             {obj.item.name} on {obj.date.getDate() + '-' +(obj.date.getMonth() + 1) + "-" + obj.date.getFullYear()}
             <span className={obj.finished?"true":"false"}/>
            </p>
          </a>
        </li>)
       })
      
      
      
      return (
      <div className="profile">
          
          <h2>Profile</h2>
          <div className="wrap">
            <div className="left">
              <h4>Your last purchases:</h4>
              <ul>{items}</ul>
            </div>
            <div className="right">
              <h4>Update your info:</h4>
              <p style={{color:"gray","fontSize":"90%"}}>Leave a field blank if you don't want to change it</p>
                                  <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500} transitionLeaveTimeout={0}
        >
        <p className={this.state.answer.success?'':'err'} key={this.state.counter} id="answer">
               {this.state.answer.message}
        </p>
        </ReactCSSTransitionGroup>
              <form onSubmit={this.handleSubmit} action="/profile" method="post">
				<div>
					<label>Email/Username:</label>
					<input value={this.state.form.username} onChange={this.handleChangeObj} type="email" className="form-control" name="username" />
				</div>
				<div>
					<label>New Password:</label>
					<input value={this.state.form.password} onChange={this.handleChangeObj} type="password" className="form-control" name="password" />
				</div>
        
				<div>
					<label>First Name:</label>
					<input value={this.state.form.name} onChange={this.handleChangeObj} type="text" className="form-control"  name="name" />
				</div>
				<div>
					<label>Phone Nubmer:</label>
					<input value={this.state.form.phone} onChange={this.handleChangeObj} type="tel" className="form-control" pattern="[+]?[0-9]{12}" placeholder="+375291234567"  name="phone" />
				</div>
				<div>
          <div>
					<label>Confirm Current Password:</label>
					<input value={this.state.form.confirmPassword} onChange={this.handleChangeObj} type="password" className="form-control" required name="confirmPassword"/>
				</div>
					<input className="btn btn-primary" type="submit" value="Update" />
				</div>
			</form>
            </div>
          </div>
      </div>
        )
    }
    else
      return <Loader/>;

    
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))