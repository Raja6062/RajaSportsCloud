import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import UserProfile from "../../../images/user-profile.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import PlayerInfoNav from "./PlayerInfoNav"
import DatePicker from "react-datepicker";
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"
import { useDispatch } from 'react-redux';
import { Network } from '../../../Services/Api';
import { ToastContainer, toast } from 'react-toastify';


const PlayerInfo = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [listValue, setList] = useState({
        email: false,
        alert: false,
        post: false
    })
    const [startDate, setStartDate] = useState(new Date());
    const [teamDropdown, setTeamDropDown] = useState("")
    const [dropdown, setDropdown] = useState([])

    const [loader, setLoader] = useState(false)
    const [profilePic, setProfilePic] = useState([])
    const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/"


    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        updateProfile()
        dropdownMenu()


    }, []);
    const handleLogout = () => {
        console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };

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
                    setLoader(true)

                })
        }

    }


    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);







                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)

    }


    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div class="dashboard-main-content">
                <div class="dashboard-head">
                    <div class="teams-select">
                        <button class="create-new-team" onClick={() => {
                            history.push("/CreateTeam")
                        }}>Create New Teams</button>
                        <select onChange={change}>
                            {dropdown.map((dropdown) => {
                                return (
                                    <option value={dropdown._id}>{dropdown.team_name}</option>
                                )
                            })}
                        </select>
                        <div className="dropBtn">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#2C2C2C", border: "none" }}>
                                ACCOUNT
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ backgroundColor: "#484848", listStyle: "none", margin: "14px" }}>
                                <li><a class="dropdown-item" href="#">Jayanta Karmakar</a></li>
                                <Link to={{ pathname: "/MyAccount" }} >
                                    <li><a class="dropdown-item" href="#">My Account</a></li>
                                </Link>
                                <Link to={{ pathname: "/Credit" }} >
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
                        {loader ?
                            <div class="profile-head-name">{profilePic.fname + " " + profilePic.lname}</div> :
                            <div class="profile-head-name">Loading...</div>}

                        <div class="profile-head-img">
                            {profilePic.profile_image == null ?
                                <img src={BigUserProfile} alt="" /> :
                                <img src={`${pic1}${profilePic.profile_image}`} alt="" />
                            }

                        </div>
                    </div>
                    <div class="login-account"><ul><li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li></ul></div>

                </div>
                
                <div class="prefarance-box player-info" style={{ padding: "10px" }}>
                <PlayerInfoNav />
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="prefarance-tab-content">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="prefarance-form-list">
                                            <h1 style={{ color: "white", fontWeight: "bolder" }}>Player</h1>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="prefarance-form-list">
                                            <button class="add-links" style={{ backgroundColor: "#181717", marginRight: "5px" }} onClick={() => history.push('./AddPlayer')}>Edit</button>
                                            <button class="add-links" style={{ width: "220px" }} onClick={() => history.push('./AddPlayer')}>Add New Family Member</button>

                                        </div>
                                    </div>
                                </div>

                                <div class="prefarance-form playerinfo-form">

                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="prefarance-form-list">
                                                <img src={UserProfile} alt="" style={{ height: "83px", width: "111px" }} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="prefarance-form-list">
                                                <div className="EditPhoto">Edit Photo</div>

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label> First Name</label>
                                                <input type="text" class="input-select" />
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Last Name</label>
                                                <input type="text" class="input-select" />

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Email</label>
                                                <input type="text" class="input-select" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Who's this</label>
                                                <input type="text" class="input-select" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Phone Number</label>
                                                <input type="text" class="input-select" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Label</label>
                                                <input type="text" class="input-select" />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Links</label>
                                                <button class="add-links">Add Links</button>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Files</label>
                                                <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} >Add Files</button>

                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="prefarance-form-list">
                                                <label style={{ paddingTop: "25px" }}>Player Status</label>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="prefarance-form-list">
                                                <div className="EditPhoto">Disable</div>

                                            </div>
                                        </div>












                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div >

    )
}

export default PlayerInfo;