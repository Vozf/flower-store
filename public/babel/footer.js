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
   
        <li><a href="/">Home</a></li>
        <li><a href="/profile">My account</a></li>
        <li><a href="/customers">Customer Service</a></li>
        <li><a href="/shipping">Service/Shipping Fees</a></li>
        <li><a href="/shipping">Shipping</a></li>
        <li><a href="/about">Contact Us</a></li>


      </ul>
          
        <ul className="social">
        <b>Stay connected:</b>
   
        <li ><a className="fb" href="https://www.facebook.com/profile.php?id=100001748540592"></a></li>
        <li ><a className="vk" href="https://www.vk.com/vozman"></a></li>
        <li ><a className="tw" href="#"></a></li>


      </ul>
          <h5>Created by Alexander Yaroshevich</h5>
  </div>
    )
  }
}