
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs






var itemsAPI = function() {
  return new Promise((resolve, reject) => {
    let str="Best Sellers";
    let query=encodeURI(str); 

    ajaxFunctions.ajaxRequest('GET', "/api/items?q="+query, function (data) {
      var userObject = JSON.parse(data);
      resolve(userObject);
    })
  })
}
var sideCategoriesAPI = function() {
  return new Promise((resolve, reject) => {
     ajaxFunctions.ajaxRequest('GET', "/api/sideCategories", function (data) {
      var userObject = JSON.parse(data);
      resolve({sideCategories:userObject});
    })
  })
}
var slideShowAPI = function() {
  return new Promise((resolve, reject) => {
     ajaxFunctions.ajaxRequest('GET', "/api/slideShow", function (data) {
      var userObject = JSON.parse(data);
      resolve({slideShow:userObject});
    })
  })
}


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
    return (
      <div className="container">
        <Menu isAuthenticated={this.state.isAuthenticated}/>
        <Topblock sideCategories={this.state.sideCategories} slideShow={this.state.slideShow}/>
        <Contents items={this.state.items}/>

  <Footer/>
      </div>
    )
  }

}
class Topblock extends React.Component {
  constructor(props) {
    super(props);
    this.slideIndex=1;
  }
  


 currentSlide=(n) =>{
  this.showSlides(this.slideIndex = n);
};

 showSlides=(n)=> {
  var i;
  var slides = document.getElementsByClassName("mySlides");
   if(slides.length==0)return;
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    this.slideIndex = 1
  }
  if (n < 1) {
    this.slideIndex = slides.length
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
  plusSlides=(n)=>{
    this.showSlides(this.slideIndex += n);
  };
  componentDidUpdate(){
    this.slideIndex=1;
    this.showSlides(this.slideIndex);

    
  }
  render() {
    let items;
  
    if(this.props.sideCategories)
       items = this.props.sideCategories.map((obj, i) => {
		  return <li key={i}><a href={obj.href}  key={i}>{obj.text}</a></li>
       })
    else
      items=null;
    
    let slideShow;
    
	  if(this.props.slideShow)
       slideShow = this.props.slideShow.map((obj, i) => {
		  return <div className="mySlides myFade" key={i}><a href={obj.href}  key={i}><img src={obj.img} key={i}></img></a></div>
       })
    else
      slideShow=<Loader/>;
    
    let dots=[];
    for(let i=0;slideShow.length!==null&&i<slideShow.length;i++){
      dots.push(<span className="dot" onClick={()=>{this.currentSlide(i+1)}} key={i}/>)
    }
    
    return (
      <div className="topblock">
        <div className="categories">
          <ul>
            {items}
          </ul>
         </div>
         <div className="slideshow">
          <div className="slideshow-container">
            {slideShow}
             <a className="prev" onClick={()=>this.plusSlides(-1)}>❮</a>
             <a className="next" onClick={()=>this.plusSlides(1)}>❯</a>
          </div>
           <br/>
            <div className="dotsContainer">
              {dots}
           </div>
        </div>
      </div>
    )
  }
}
class Contents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
     let items;
   // console.log(this.items);
    if(this.props.items.arr)
       items = this.props.items.arr.map((obj, i) => {
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
    else
      items=<Loader/>;
    return (
      <div className="contents">
        <p>{this.props.items.query}</p>
        <div className="grid">{items}</div>
      </div>
    )
  }
}




ReactDOM.render(<App/>, document.getElementById('con'))