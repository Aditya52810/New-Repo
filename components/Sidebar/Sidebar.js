import React from "react";
import { NavLink } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import { Nav } from "reactstrap";
import { useLocation } from 'react-router-dom';
var ps;
//var currentLocation = window.location;
const IsActiveRoute =(route) =>{
  var location = useLocation().pathname;
  return location.indexOf(route) > -1 ? "active" : "";
}
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    const val = IsActiveRoute(routeName)
    //return location.indexOf(routeName) > -1 ? "active" : "";
    return  val;
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
     
        logoImg = (
          
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          
        );
        logoText = (
          <a
          href = '/'
            className="simple-text logo-normal"            
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      
    }
    //data={'blue'}
    return (
      <div className="sidebar" data={'blue'}  style ={{ marginLeft :'-20px',  marginTop:'100px', textAlign:'left', paddingLeft:'10px',position:'fixed'}}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo" style={{marginLeft :'10px'}} >

              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    //IsActiveRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    //to={prop.layout + prop.path}
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                   
                <p>{<FontAwesomeIcon icon={prop.icon}/>}  &nbsp; &nbsp; &nbsp;  { prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
           
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "blue",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
