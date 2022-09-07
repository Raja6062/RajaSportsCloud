import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";

import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"





function Subscribe(props) {

    const history = useHistory();
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false)
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [profilePic, setProfilePic] = useState([])
    const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/"




    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        updateProfile()

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
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

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }





    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



                })
        }
    }


    const deleteScheduleData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/delete-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("delete assignment data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
                teamSchedule()



            })

    }


    //     const EventSet=(setEvent)=>{
    //         // setEventType(e.target.value)
    //         localStorage.setItem("eventType",setEvent)
    //         console.log("eventtype------>",setEvent)
    //    }




    return (

        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
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

                        <div class="prefarance-page">
                            <div class="page-header">
                                <h2 class="page-title">Export Schedule</h2>

                            </div>

                            <div class="prefarance-box" style={{ overflowX: "hidden" }}>
                                <div class="team-payment team-assesment" >
                                    <div class="prefarance-form playerinfo-form">
                                        <span style={{paddingLeft:"21px"}}>TeamSnap offers several ways to access or export your schedule data:</span>

                                        <div class="row" style={{ padding: "21px" }}>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <h1 style={{color:"white"}}>iCal</h1>
                                                    <p style={{ color: "gray",paddingTop:"15px",paddingBottom:"15px" }}>If you use Apple iCal, Microsoft Outlook 2007+ or any iCal-compatible desktop calendar application you can "subscribe"

                                                        to your TeamSanp Schedule and have your full schedule of games and events show up automatically in your calendar. Just click this button:</p>
                                                    <button class="add-links" style={{width:"276px",marginRight:"10px"}}>Subscribe to full Calender</button>
                                                    <button class="add-links" style={{width:"276px",marginRight:"10px"}}>Subscribe to Games only</button>
                                                    <p style={{ color: "gray",paddingTop:"15px" }}>If you use Google Calendar, another web-based calendar, or just want to do things manually, you can also copy and paste the link directly into your calendar program (normally in the "Subscribe By URL" area):</p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label> Full Calender</label>
                                                    <input type="text" class="input-select" />

                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label> Games Only</label>
                                                    <input type="text" class="input-select" />

                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="prefarance-form-list">
                                                    <label> CSV Export</label>
                                                    <span>You can export your schedule as a comma-separated (CSV) text file for use in a spreadsheet or word processing program. The file will begin downloading after you click the button below.</span>
                                                </div>
                                            </div>
                                            <div class="col-md-16">
                                                <div class="prefarance-form-list" style={{ marginLeft: "10px" }}>
                                                    <button class="add-links">Export Text File</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscribe;

