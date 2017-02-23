
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs









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
        
        <Search/>

  <Footer/>
      </div>
    )
  }

}
class Search extends React.Component {
  constructor(props) {
    super(props);
    
    let userInput=this.tryQuery();
  
    this.state={
      items: {query:null,arr:null,isWait:false},
      userInput
    }
    if(userInput.length>0)
      this.handleClick();
  }
  tryQuery=()=>{
    var search = location.search.substring(1);
    try{
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\+/," ") + '"}').q;
    }
    catch(e){
      return "";
    }
  };
  // handleChange=(e)=>{
  //   this.setState({userInput:e.target.value})
  // };
  handleClick=()=>{
    this.setState({items:{isWait:true}})
    this.itemsAPI().then(data => {
      this.setState(data);

      //this.setState({items:{isWait:false}})
    });
    return false;
  };
  itemsAPI=()=> {
  return new Promise((resolve, reject) => {
    let str=this.state.userInput;
    let query=encodeURI(str); 

    ajaxFunctions.ajaxRequest('GET', "/api/items?q="+query, function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
  })
};
  render() {
    let head;
     let items;
    if(!this.state.items.isWait){
      if(this.state.items.query!=null){
        head=<p className="query">{this.state.items.query}</p>;
          if(this.state.items.arr=="Not Found")
            items= <div><h2 style={{"text-align":"center"}}>Sorry Items '{this.state.items.query}' can't be found</h2></div>;
          else
           items = this.state.items.arr.map((obj, i) => {
		  return (
        <div key={i} className="grid-item">
          <a href={obj.href}  key={i}>
            <img src={obj.img} key={i}/>
          </a>
           <p className="type">{obj.name}</p>
          <p className="priceContainer">
            {obj.oldPrice?<span className="oldPrice">{obj.oldPrice}</span>:null}
            <b className={obj.oldPrice?"newPrice":"price"}>{obj.price}</b>
          </p>
        </div>)
       })
      }
    
    }
    else
      items=<Loader/>;
    return (
      <div className="contents search">
      <form type="get">
				<div>
					<label>Search:</label>
					<input type="text" className="form-control" defaultValue={this.state.userInput}  onChange={this.handleChange} name="q"  />
					<input id="btnSearch" className="btn btn-primary"   type="submit" defaultValue="Search" />
				</div>
</form>
        {head}
        <div className="grid">{items}</div>
      </div>
    )
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))