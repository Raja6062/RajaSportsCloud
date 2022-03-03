import React, { useEffect, useState } from 'react';
import {
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import Logo from "../../images/logo.png";
import "../../Utils/css/bootstrap-datepicker.css";
import "../../Utils/css/bootstrap.min.css";
import '../../Utils/css/responsive.css';
import '../../Utils/css/style.css';



function SideMenuComponents(props) {
  console.log("props-----",props.manger)
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});
  const location = useLocation()
  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal)
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };


  return (
    <div class="dashboard-side-bar">
      <div class="logo">
        <a href="#"><img src={Logo} alt="" /></a>
      </div>
      <div class="left-menu-section">
        <div class="nav-header">
          <button id="openMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="menulist">
          {
            props.manger == "manger" ?
            <ul>
            <Link to="/">
              <li><a href="javascript:void(0)" class={(location.pathname == '/')? 'menu1 active' : 'menu1'}>Team Home</a></li>
            </Link>
            <Link to="/ManagerRoster">
              <li><a href="javascript:void(0)" class={(location.pathname == '/ManagerRoster')? 'menu2 active' : 'menu2'}>Team Roster</a></li>
            </Link>
            <Link to="/Teamschdule">
            <li><a href="javascript:void(0)" class={(location.pathname == '/Teamschdule')? 'menu3 active' : 'menu3'}>Team Schedule</a></li>
            </Link>
            <Link to="/ManagerTeamAvailability">
            <li><a href="javascript:void(0)" class={(location.pathname == '/ManagerTeamAvailability')? 'menu4 active' : 'menu4'}>Team Availability</a></li>
            </Link>
            <Link to="/ManagerTeamShop">
              <li><a href="javascript:void(0)" class={(location.pathname == '/ManagerTeamShop')? 'menu5 active' : 'menu5'}>Team Store</a></li>
            </Link>
            <Link to="/ScoreKeeper">
            <li><a href="javascript:void(0)" class={(location.pathname == '/ScoreKeeper')? 'menu6 active' : 'menu6'}>Score Keeper</a></li>
            </Link>
            <Link to="/TeamAssignments">
              <li><a href="javascript:void(0)" class={(location.pathname == '/TeamAssignments')? 'menu7 active' : 'menu7'}>Team Assignment</a></li>
            </Link>
            <Link to="/TeamMedia">
            <li><a href="javascript:void(0)" class={(location.pathname == '/TeamMedia')? 'menu8 active' : 'menu8'}>Team Media</a></li>
            </Link>
            <Link to="/TeamMassage">
            <li><a href="javascript:void(0)" class={(location.pathname == '/TeamMassage')? 'menu9 active' : 'menu9'}>Team Messages</a></li>
            </Link>
            <Link to="/preferance">
              <li><a href="javascript:void(0)" class={(location.pathname == '/preferance')? 'menu10 active' : 'menu10'}>Team Preferences</a></li>
            </Link>
            <Link to='/TeamSettingHome'>
            <li><a href="javascript:void(0)" class={(location.pathname == '/TeamSettingHome')? 'menu11 active' : 'menu11'}>Team Settings</a></li>
            </Link>
            <Link to='/TeamStatistics'>
            <li><a href="javascript:void(0)" class={(location.pathname == '/TeamStatistics')? 'menu11 active' : 'menu11'}>Team Statistics</a></li>
            </Link>
            <Link to='/TeamOrganizer'>
            <li><a href="javascript:void(0)" class={(location.pathname == '/TeamOrganizer')? 'menu12 active' : 'menu12'}>Tournament Organizer</a></li>
            </Link>
            <Link to = "/TeamLiabilityWaiver">
          <li><a href="javascript:void(0)" class={(location.pathname == '/TeamLiabilityWaiver')? 'menu11 active' : 'menu11'}>Liability Waiver</a></li>
          </Link>
            <Link to="/TeamPayment">
              <li><a href="javascript:void(0)" class={(location.pathname == '/TeamPayment')? 'menu12 active' : 'menu12'}>Team Payment</a></li>
            </Link>
           
            {/* <li><a href="#" class="menu13">Team Store</a></li>
            <li><a href="#" class="menu14">Website Adminis tration</a></li>
            <li><a href="#" class="menu15">player Liability Waiver</a></li>
            <li><a href="#" class="menu16" >Invoicing</a></li> */}
          </ul>
          :
          
          <ul>
          <Link to="/">
            <li><a href="javascript:void(0)" class={(location.pathname == '/')? 'menu1 active' : 'menu1'}>Team Home</a></li>
          </Link>
          <Link to="/teamroster">
            <li><a href="javascript:void(0)" class="menu2">Team Roster</a></li>
          </Link>
          <Link to="/playerschdule">
          <li><a href="javascript:void(0)" class="menu3">Team Schedule</a></li>
          </Link>
          <Link to="/TeamAvailability">
          <li><a href="javascript:void(0)" class="menu4">Player Availability</a></li>
          </Link>
          <Link to="/teamshop">
            <li><a href="javascript:void(0)" class="menu5">Team Shop</a></li>
          </Link>
          <Link to="/ScoreKeeper">
            <li><a href="javascript:void(0)" class="menu6">Score Keeper</a></li>
            </Link>
          <Link to="/playerassignments">
            <li><a href="javascript:void(0)" class="menu7">Player Assignment</a></li>
          </Link>
          <Link to="/playermedia">
          <li><a href="javascript:void(0)" class="menu8">Player Media</a></li>
          </Link>
          <li><a href="javascript:void(0)" class="menu9">Player Messages</a></li>
          <Link to="/preferance">
            <li><a href="javascript:void(0)" class={(location.pathname == '/preferance')? 'menu10 active' : 'menu10'}>Player Preferences</a></li>
          </Link>
          <Link to = "liabilitywaiver">
          <li><a href="javascript:void(0)" class={(location.pathname == '/liabilitywaiver')? 'menu11 active' : 'menu11'}>Liability Waiver</a></li>
          </Link>
          <Link to="/payment">
          <li><a href="javascript:void(0)" class={(location.pathname == '/payment')? 'menu12 active' : 'menu12'} >Team Payments</a></li>
          </Link>
          
        </ul>
          }
          
        </div>
      </div>
    </div>
  );
}

export default SideMenuComponents;
