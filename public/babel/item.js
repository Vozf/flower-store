


var itemAPI = function() {
  return new Promise((resolve, reject) => {
    let id=window.location.pathname.slice(("/item/").length);
    let query=encodeURI(id); 

    ajaxFunctions.ajaxRequest('GET', "/api/items/id/?id="+query, function (data) {
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
      item: null,
    }

  }
  componentDidMount(){
    authAPI().then(data => {
      this.setState(data);
    });

    itemAPI().then(data => {
      this.setState(data);
    });
    


  }
  render() {
    return (
      <div className="container">
        <Menu isAuthenticated={this.state.isAuthenticated}/>
        <Item isAuthenticated={this.state.isAuthenticated} item={this.state.item}/>
        <Footer/>
      </div>
    )
  }

}
class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
  


    let obj=this.props.item;
    if (obj==null){
      return <div><Loader/></div>;
    }
    else if(obj=="Not Found")
    return <div><h2 style={{"text-align":"center"}}>Sorry Item can't be found</h2></div>;
    else{
      let but=(this.props.isAuthenticated)?
      (<form method="post" action={"/api/addOrder/"+obj._id} ><input className="btn btn-primary" type="submit" value={obj.isAvailiable?"Order on this account":"Sorry item is not availiable"} disabled={!obj.isAvailiable} /></form>)
      :
      (<form method="post">
          <input className="btn btn-primary" type="submit" value="Sign in" />
        
        </form>);
      let right;
       right=(<div>
 
           {but}
          
          <div className="separator">
      <span>
        Or 
      </span>
    </div>
          <form method="post" action={"/api/addOrder/"+obj._id} >
				<div>
					<label>First Name:</label>
					<input type="text" className="form-control"   name="name" />
				</div>
				<div>
					<label>Telephone Nubmer:</label>
					<input type="tel" className="form-control" pattern="[+]?[0-9]{12}" placeholder="+375291234567"  required name="phone" />
				</div>
				<div>
					<input className="btn btn-primary" type="submit" value={obj.isAvailiable?"Order":"Sorry item is not availiable"} disabled={!obj.isAvailiable} />
				</div>
			</form>
          </div>)
    
    return (
<div className="itemP">
  <h2>{obj.name}</h2>
  <div className="wrap">
  <div className="left">
        <div className="grid-item">
          <a href={obj.href}  >
            <img src={obj.img}/>
          </a>
           <p className="type">{obj.name}</p>
          <p className="priceContainer">
            {obj.oldPrice?<span className="oldPrice">{obj.oldPrice}</span>:null}
            <b className={obj.oldPrice?"newPrice":"price"}>{obj.price}</b>
          </p>
              <h4>Description:</h4>   
    
    <p>{obj.description}</p>
        </div>

  </div>
    <div className="right">
  			{right}
  </div>
  </div>
</div>
    )
    }
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))