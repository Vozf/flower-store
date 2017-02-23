
// babel  --presets=react,stage-0  public/babel --out-dir public/cjs




var authAPI = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let isAuthenticated=false;
      resolve({isAuthenticated})
    }, 500);  
  })
}

var itemsAPI = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          let arr=[{href:"#",img:"https://www.ftdimg.com/pics/products/17-V2_200x225.jpg",name:"Roses",price:15},{href:"#",img:"https://www.ftdimg.com/pics/products/SMRB_200x225.jpg",name:"Roses",price:15},{href:"#",img:"https://www.ftdimg.com/pics/products/17-V4_200x225.jpg",name:"Roses",price:15,oldPrice:25},{href:"#",img:"https://www.ftdimg.com/pics/products/C15-4790_200x225.jpg",name:"Roses",price:15},{href:"#",img:"https://www.ftdimg.com/pics/products/FXVP_200x225.jpg",name:"Roses",price:15}, {href:"#",img:"https://www.ftdimg.com/pics/products/FRR4_200x225.jpg",name:"Roses",price:15}, {href:"#",img:"https://www.ftdimg.com/pics/products/C9-5162_200x225.jpg",name:"Roses",price:15}];
      let query="Best Sellers";
      let items={items:{arr,query}}
    
      resolve(items)
    }, 500);  
  })
}
var sideCategoriesAPI = function() {
  return new Promise((resolve, reject) => {
    let sideCategories=[{href:"#",text:"Birtday"}, {href:"#",text:"Valentine's Day Flowers"}, {href:"#",text:"Valentine's Day Plants"}, {href:"#",text:"Valentine's Day Best Sellers"}, {href:"#",text:"Valentine's Day Gifts"} ]
    setTimeout(() => {      
      resolve({sideCategories})
    }, 500);  
  })
}
var slideShowAPI = function() {
  return new Promise((resolve, reject) => {
    let slideShow=[{href:"#",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_studio_np.jpg"}, {href:"#",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_plants_np.jpg"}, {href:"#",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_gifts_np.jpg"}, {href:"#",img:"https://www.ftdimg.com/pics/products/vday17_hpslide_weekendsale_50_alt3.jpg"}]
    setTimeout(() => {      
      resolve({slideShow})
    }, 500);  
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
              <LogIn/>
        <SignUp/>
  <Footer/>
      </div>
    )
  }

}
class Menu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="menu">
        <ul>
      <li><a className="logo" href="#home">Flower Store</a></li>
      <li className="drop">
        <a href="#" className="dropbtn">Categories</a>
        <div className="dropdown-content">
          <a href="#">Flowers</a>
          <a href="#">Plants</a>
          <a href="#">Gifts</a>
        </div>
      </li>
      <li className="drop">
        <a href="#" className="dropbtn">About</a>
        <div className="dropdown-content">
          <a href="#">Shipping</a>
          <a href="#">Customer Service</a>
          <a href="#">About us</a>
        </div>
      </li>
      
       {this.props.isAuthenticated===true?
            (<span><li className="sign"><a href="#profile">Profile</a></li>
      <li className="sign"><a href="#logout">Log out</a></li></span>)
            :(this.props.isAuthenticated===false?
            (<span><li className="sign"><a href="#login">Sign in</a></li>
      <li className="sign"><a href="#signup">Sign up</a></li></span>)
            :null)}   

      <li className="sign search">
        <form>
          <input type="search" placeholder="Search"/>
        </form>
      </li>
    </ul>
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
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
    <b>To order by phone, call 1-800-SEND-FTD (1-800-736-3383)</b>
    <br/>
    
      <ul className="map">
        <b>Site:</b>
   
        <li><a href="#">Home</a></li>
        <li><a href="#">My account</a></li>
        <li><a href="#">Customer Service</a></li>
        <li><a href="#">Service/Shipping Fees</a></li>
        <li><a href="#">Shipping</a></li>
        <li><a href="#">Contact Us</a></li>


      </ul>
          
        <ul className="social">
        <b>Stay connected:</b>
   
        <li ><a className="fb" href="#"></a></li>
        <li ><a className="vk" href="#"></a></li>
        <li ><a className="tw" href="#"></a></li>


      </ul>
          <h5>Created by Alexander Yaroshevich</h5>
  </div>
    )
  }
}
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div  className="loader">
<div className='uil-ellipsis-css' ><div className="ib"><div className="circle"><div></div></div><div className="circle"><div></div></div><div className="circle"><div></div></div><div className="circle"><div></div></div></div></div>
        </div>
    )
  }
}
class LogIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
<div className="signR">
  <h2>Log in</h2>
  			<form action="/login" method="post">
				<div>
					<label>Email/Username:</label>
					<input type="email" className="form-control" required  name="username" />
				</div>
				<div>
					<label>Password:</label>
					<input type="password" className="form-control" required name="password" />
				</div>
				<div>
					<input className="btn btn-primary" type="submit" value="Log In" />
				</div>
			</form>
</div>
    )
  }
}
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      userInput:""
    }
  }
  	handleChange(e) {
      document.getElementById('confirmpass').pattern= e.target.value;
		//form.confirmpass.pattern = e.target.value;
	}
  render() {
    return (
<div className="signR">
  <h2>Sign Up</h2>
  			<form action="/register" method="post">
				<div>
					<label>Email/Username:</label>
					<input type="email" className="form-control" required name="username" />
				</div>
				<div>
					<label>Password:</label>
					<input type="password" className="form-control" required name="password" onChange={this.handleChange} />
				</div>
         <div>
					<label>Confirm Password:</label>
					<input type="password" id="confirmpass" className="form-control" required name="password" />
				</div>
				<div>
					<input className="btn btn-primary" type="submit" value="Sing Up" />
				</div>
			</form>
</div>
    )
  }
}



ReactDOM.render(<App/>, document.getElementById('con'))