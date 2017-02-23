


var purAPI = function() {
  return new Promise((resolve, reject) => {

    ajaxFunctions.ajaxRequest('GET', "/api/allpurchases", function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
  })
}

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       isAuthenticated: null,
      purchases: null,
    }

  }
  componentDidMount(){
    authAPI().then(data => {
      this.setState(data);
    });

    purAPI().then(data => {
      this.setState(data);
    });
    


  }
  render() {
    return (
      <div className="container">
        <Menu isAuthenticated={this.state.isAuthenticated}/>
        <AdmProfile purchases={this.state.purchases}/>
        <Footer/>
      </div>
    )
  }

}
class AdmProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  clickHandler=(id,e)=>{
    // console.log(id,e.target.tagName);
    if(e.target.tagName!="SPAN")    //not link
    {
    // console.log("in")
      ajaxFunctions.ajaxRequest('GET', "/api/togglefinished/?id="+id, function (data) {
        data=JSON.parse(data);
        
        if(data.finished==true){
          document.getElementById(id).classList.add("finished");
        }
          else{
          document.getElementById(id).classList.remove("finished");
          }
      
    })
    }
    else
    return true;
  };
  render() {
    let purchases=this.props.purchases;
    console.log(purchases)
    
    if(purchases){
      let items;
      let table;
     if(purchases.length==0)
        table= <div><p style={{"textAlign":"center"}}>Nothing Found</p></div>;
      else{
        
       items = purchases.map((obj, i) => {
         if(!obj.item)
          obj.item={name:"Deleted"};
         obj.date=new Date(obj.date);
         
         if(!obj.user){
           obj.user={
             username:"Anonymous"
           }
         }
		  return (
        <tr key={i} id={obj._id} onClick={(e)=>{this.clickHandler(obj._id,e);}} className={obj.finished?"finished":""} >
          <td key={5*i}>
          <a href={obj.item.href} key={i}>{obj.item.name} </a>
          </td>
          <td key={5*i+1}>{obj.user.username}</td>
          <td key={5*i+2}>{obj.info.name}</td>
          <td key={5*i+3}>{obj.date.getDate() + '-' +(obj.date.getMonth() + 1) + "-" + obj.date.getFullYear()+" "+obj.date.getHours()+":"+obj.date.getMinutes()}</td>
          <td key={5*i+4}>{obj.info.phone}</td>
         

        </tr>)
       })
       table=(          <table className="table table-hover table-bordered" >
            
    <thead>
  <tr>
     <th>Item</th>
     <th>Email</th>
    <th>First Name</th> 
     <th>Date</th>
    <th>Phone</th>
    
      
      </tr>
    </thead>
            
 
            <tbody>
  {items}
            </tbody>
</table>);
      }
      
      
      
      return (
      <div className="admProfile table-responsive">
          
          <h2>Admin Dashboard</h2>
          <Update/>
          <h4>Last Purchases:</h4>

      {table}
      </div>
        )
    }
    else
      return <Loader/>;

    
  }
}
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      isLoading:false,
      userInputId: "",
      command: 0,
      item: null,
      answer: {
        message: null,
        success: null
      },
      counter:0
    }
  }
  singleItemAPI = (id) => {
  return new Promise((resolve, reject) => {
    
    ajaxFunctions.ajaxRequest('GET', "/api/items/id/?id="+id, function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
  })
};
  add = () => {
    this.setState({answer:{message:null,success:null}});
    if(this.state.command!=1){
      let item = {
        href: "",
        img: "",
        name: "",
        price: "",
        oldPrice:"",
        isAvailiable: true,
        tags: [],
        description: ""
      };
      this.setState({
        command: 1,
        item
      })
    }
    else{
        this.setState({
        command: 0,
        item:null
      })
    }
  };
  update = () => {
    this.setState({isLoading:true,answer:{message:null,success:null}});
    if(!this.state.userInputId.match(/^\w{24}$/))
      {
        this.setState({isLoading:false,answer:{message:"Wrong Id length",success:false},counter:this.state.counter+1});
        return;
      }
    this.singleItemAPI(this.state.userInputId).then(data => {
      if(data.item=="Not Found"){
        this.setState({
        command: 0,
        isLoading:false,
        item:null,
        answer:{message:"Not Found",success:false},
        counter:this.state.counter+1
      });
      }
      else{
      this.setState(data);
      this.setState({
        command: 2,
        isLoading:false,
        counter:this.state.counter+1
      });
      }
    });

  };
  remove = () => {
    this.setState({isLoading:true,answer:{message:null,success:null}});
    if(!this.state.userInputId.match(/^\w{24}$/))
      {
        this.setState({isLoading:false,answer:{message:"Wrong Id",success:false},counter:this.state.counter+1});
        return;
      }
    
  this.handlePOST({_id:this.state.userInputId},"/api/removeItem").then((data)=>this.setState(Object.assign({answer:data},{isLoading:false,counter:this.state.counter+1})));
  };
  handleIdChange = (e) => {
    console.log(e.target.value)
    this.setState({
      userInputId: e.target.value
    })
  };
  handleChangeObj = (e) => {

    if (e.target.getAttribute("type") == "checkbox") {
      let item = Object.assign({}, this.state.item)
      item[e.target.name] = e.target.checked;
      this.setState({
        item
      });
    } else {

      let item = Object.assign({}, this.state.item)
      item[e.target.name] = e.target.value;
      this.setState({
        item
      });

    }
    console.log(this.state.item)
  };
  handleSubmit=(e)=>{
    this.setState({isLoading:true,answer:{message:null,success:null}});
     e.preventDefault();
    let where;
    if(this.state.item._id)
      where="/api/updateItem";
    else
      where="/api/addItem";
    this.handlePOST(this.state.item,where).then((data)=>{
      this.setState(Object.assign({answer:data},{isLoading:false,counter:this.state.counter+1}));
      if(this.state.item._id)
        this.update();
      
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
      console.log(xhr);
      resolve(xhr.response);
      //resolve({answer:{message:"Not Ok",type:false}})
    });
    xhr.send(formData);
     })
 }
  render() {
    let command;

    if(this.state.isLoading)
      command=<Loader/>;
    else{
    switch (this.state.command) {
      case 0:
        break;
      case 1:
        command = (
          <div>
          <form onSubmit={this.handleSubmit}>
        <div>
					<label>Name:</label>
					<input type="text" className="form-control" name="name" value={this.state.item.name} onChange={this.handleChangeObj} required />
				</div>
				<div>
					<label>Image Link:</label>
					<input type="url" className="form-control"  name="img" value={this.state.item.img} onChange={this.handleChangeObj} required />
				</div>

				<div>
					<label>Price:</label>
					<input type="number" className="form-control" name="price" value={this.state.item.price} onChange={this.handleChangeObj}  required/>
				</div>
				<div>
          <label>Old Price:</label>
          <p>For discount only.Leave blank otherwise</p>
					<input type="number" className="form-control" name="oldPrice" value={this.state.item.oldPrice} onChange={this.handleChangeObj}/>
				</div>
       	<div>
          <label>Tags:</label>
          <p>Separated with comma</p>
					<input type="text" className="form-control" name="tags" value={this.state.item.tags} onChange={this.handleChangeObj}/>
				</div>
       	<div>
          <label>Description:</label>
					<textarea type="text" className="form-control" name="description"rows="5" value={this.state.item.description} onChange={this.handleChangeObj}/>
				</div>
        <div>
          <label>Availiable: </label>
					<input type="checkbox" className="checkbox-inline" name="isAvailiable" checked={this.state.item.isAvailiable}  onChange={this.handleChangeObj}/>
				</div>
				<div>
					<input className="btn btn-primary" type="submit" value="Add" />
				</div>
            </form>
            </div>
        )
        break;
      case 2:

        let item = this.state.item;
        console.log(item);
        command = (
          <div>
    
          <form onSubmit={this.handleSubmit}>
        <div>
					<label>id:</label>
					<input type="text" className="form-control" value={item._id} disabled required />
				</div>
        <div>
					<label>Name:</label>
					<input type="text" className="form-control" name="name" value={item.name}  onChange={this.handleChangeObj} required />
				</div>
				<div>
					<label>Image Link:</label>
					<input type="url" className="form-control"  name="img"  value={item.img} onChange={this.handleChangeObj} required />
				</div>

				<div>
					<label>Price:</label>
					<input type="number" className="form-control" name="price"  value={item.price} onChange={this.handleChangeObj}  required/>
				</div>
				<div>
          <label>Old Price:</label>
          <p>For discount only.Leave blank otherwise</p>
					<input type="number" className="form-control" name="oldPrice"  value={item.oldPrice} onChange={this.handleChangeObj}/>
				</div>
       	<div>
          <label>Tags:</label>
          <p>Separated with comma</p>
					<input type="text" className="form-control" name="tags"  value={item.tags} onChange={this.handleChangeObj}/>
				</div>
       	<div>
          <label>Description:</label>
					<textarea type="text" className="form-control" name="description" rows="5" value={item.description} onChange={this.handleChangeObj}/>
				</div>
        <div>
          <label>Availiable: </label>
					<input type="checkbox" className="checkbox-inline" name="isAvailiable" checked={item.isAvailiable}  onChange={this.handleChangeObj}/>
				</div>
				<div>
					<input className="btn btn-info" type="submit" value="Update" />
				</div>
          </form>
           </div>
        )
        break;
    }
    }
    return (
      <div className="upd">
                  <ReactCSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500} transitionLeaveTimeout={0}
        >
        <p className={this.state.answer.success?'':'err'} key={this.state.counter} id="answer">
               {this.state.answer.message}
        </p>
        </ReactCSSTransitionGroup>
          <div>
            <a className="btn btn-primary" href="#" onClick={this.add}>Add item</a>
          </div>
          <div>
            <input type="text" className="form-control" placeholder="id" value={this.state.userInputId} onChange={this.handleIdChange}/><input type="button" className="btn btn-info" value="Update item" onClick={this.update}></input><input type="button" className="btn btn-danger" value="Remove item" onClick={this.remove}></input>
          </div>
         {command}
        </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('con'))

