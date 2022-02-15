import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import '../../Utils/css/style.css';
import '../../Utils/css/responsive.css';
import "../../Utils/css/bootstrap.min.css"
import "../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../images/user-profile.png"
import BigUserProfile from "../../images/big-user-profile.png"
import { logoutUser } from "../../Redux/Actions/auth";

import teamList from "../../images/team-list.png"


import { useDispatch } from 'react-redux';
import { Network } from '../../Services/Api';

import 'react-calendar/dist/Calendar.css';
import { ToastContainer, toast } from 'react-toastify';



const Header=(props)=>{

    const history = useHistory();
    const dispatch = useDispatch()
  
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [image, Profile] = useState(BigUserProfile)
    const [picture, setPicture] = useState(teamList)
    const [degree, setDegree] = useState([])
    const [team, setTeam] = useState([])
    const [profilePic, setProfilePic] = useState([])
    const [teamId, setTeamId] = useState("")

    const pic = 'https://nodeserver.mydevfactory.com:1447/'

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
        teamSelect()
        changeImage()
        updateProfile()
    
      }, []);

    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        dispatch(logoutUser(null))
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
      };


      const changeImage = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          let header = {
            'authToken': user.authtoken
          }
          Network('api/player-joined-team-list?player_id=' + user._id, 'GET', header)
            // api/player-list-by-team-id?team_id=60aca35ff6cd6923adf9634a
            .then(async (res) => {
              console.log("picture----", res)
              if (res.response_code == 2000) {
    
              } else if (res.response_code == 4000) {
                toast.error(res.response_message)
              }
            })
            .catch((error) => {
              console.log("error===>", error)
            });
        }
      }
      
  const updateProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken

      }
      console.log('user', user)

      Network('api/get-user-details?user_id=' + user._id, 'GET', header)
        .then(async (res) => {
          console.log("new Profile Pic----", res)
          setProfilePic(res.response_data)

        })
    }

  }
  const change = (event) => {
    console.log("event", event.target.value)
    setTeamId(event.target.value)

  }


  const teamSelect = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      let header = {
        'authToken': user.authtoken

      }
      console.log('user', user)

      Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
        .then(async (res) => {
          console.log("teanSelect----", res)
          if (res.response_code == 4000) {
            dispatch(logoutUser(null))
            localStorage.removeItem("user");
            history.push("/")
            toast.error(res.response_message)
          }
          setTeam(res.response_data)



        })
    }
  }

    return(
        <>
         <div class="dashboard-head">
              <div class="teams-select">
                <button class="create-new-team" onClick={() => {
                  history.push("/CreateTeam")
                }}>Create New Teams</button>
                <select onChange={change} >

                  {team == null ? <option> Team1</option> :
                    team.map((team) => {
                      return (
                        <option key={team.id}>{team.team_name}</option>
                      )
                    })}
                </select>
                <div className="dropBtn">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                    ACCOUNT
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                      <li><a class="dropdown-item" href="#">Jayanta Karmakar</a></li>
                    <Link to={{ pathname: "/MyAccount"}} >
                      <li><a class="dropdown-item" href="#">My Account</a></li>
                    </Link>
                    <Link to={{ pathname: "/Credit"}} >
                      <li><a class="dropdown-item" href="#">Credits</a></li>
                    </Link>
                    <Link to={{ pathname: "/Household" }} >
                      <li><a class="dropdown-item" href="#">My HouseHold</a></li>
                    </Link>
                    <Link to={{ pathname: "/ManageTeam" }} >
                      <li><a class="dropdown-item" href="#">Manage My Team</a></li>
                    </Link>
                    <Link to={{ pathname: "/Biling" }} >
                      <li><a class="dropdown-item" href="#">Biling & Plans</a></li>
                    </Link>
                    <Link to={{ pathname: "/CreateTeam" }} >
                      <li><a class="dropdown-item" href="#">Create New Team</a></li>
                    </Link>
                    <Link to={{ pathname: "/SignOut" }} >
                      <li><a class="dropdown-item active" href="#">Sign Out</a></li>
                    </Link>

                  </ul>
                </div>
              </div>
              <div class="profile-head">
                <div class="profile-head-name">{profilePic.fname + " " + profilePic.lname}</div>
                <div class="profile-head-img">
                  {profilePic.profile_image == null ?
                    <img src={BigUserProfile} alt="" /> :
                    <img src={`${pic}${profilePic.profile_image}`} alt="" />
                  }

                </div>
              </div>
              <div class="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

            </div>
        </>

    )
}
export default Header