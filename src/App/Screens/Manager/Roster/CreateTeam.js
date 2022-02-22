import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
    useParams,
    useLocation
} from "react-router-dom";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import Delect from "../../../images/delect.png"
import SideMenuComponents from "../../../Components/SideMenu"
import UserProfile from "../../../images/user-profile.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import BigUserProfile from "../../../images/big-user-profile.png"

const CreateTeam = (props) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [zip, setZip] = useState()
    const [language, setLanguage] = useState()
    const [teamName, setTeamName] = useState()
    const [sport, setSport] = useState()
    const [timeZone, setTimeZone] = useState()
    const [country, setCountry] = useState()
    const [parentName, setParentName] = useState()
    const [profilePic, setProfilePic] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")
    const pic = 'https://nodeserver.mydevfactory.com:1447/'

    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        createTeamData()
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

    const createTeamData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "team_name": teamName,
                "team_manager_id": user._id,
                "sports": sport,
                "time_zone": timeZone,
                "country": country,
                "zip": zip,
                "language": language,
                "parentName": parentName
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/create-team', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("create team data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
            })

    }


    const CheckValidatiion = () => {

        if (teamName && sport && timeZone && country && zip && language && parentName) {
            createTeamData()

            return
        }
        else {
            toast.error("Please Provide All Field")

        }





    }







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
                        <div class="prefarance-box player-info" style={{ padding: "10px" }}>
                            <div class="prefarance-form playerinfo-form">

                                <div class="row">
                                    <div class="col-md-6" >
                                        <div class="prefarance-form-list" style={{ color: "white" }}>
                                            <h1 style={{ color: "white", fontSize: "35px", padding: "10px" }}>Create a  New Team</h1>
                                            <h3 style={{ color: "white", fontSize: "25px", padding: "10px" }}>Let's get started</h3>
                                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}> We'll create your team on the Free plan, which includes all of our

                                                core features:</p>
                                            <ul style={{ color: "white", fontSize: "20px" }}>
                                                <li>Schedule games, practices and events</li>
                                                <li>Instantly connect with everyone via chat
                                                </li>
                                                <li>Get paid for team expenses</li>
                                            </ul>
                                            <p style={{ color: "white", fontSize: "20px", padding: "10px" }}>Ready to take your team to the next level?</p>
                                            <p style={{ color: "red", fontSize: "20px", padding: "10px" }}>Explore our paid plans</p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label>Language</label>
                                                <select class="input-select" onChange={(e) => setLanguage(e.target.value)}>
                                                    <option>Select Language</option>
                                                    <option>ENGLISH</option>
                                                    <option>HINDI</option>
                                                    <option>BENGALI</option>
                                                    <option>SPANISH</option>
                                                    <option>ARABIC</option>
                                                    <option>PORTUGUESE</option>
                                                    <option>RUSSIAN</option>
                                                    <option>JAPANESE</option>
                                                    <option>LAHNDA</option>
                                                    <option>GERMAN</option>
                                                    <option>KOREAN</option>
                                                    <option>FRENCH</option>
                                                    <option>TELUGU</option>
                                                </select>
                                                <label>Team Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setTeamName(e.target.value)} />
                                                <label>Player Parent Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setParentName(e.target.value)} />
                                                <label>Sport</label>
                                                <select class="input-select" onChange={(e) => setSport(e.target.value)}>
                                                    <option>Football</option>
                                                    <option>Cricket</option>
                                                    <option>Badminton</option>
                                                </select>
                                                {/* <input type="text" class="input-select" onChange={(e) => setSport(e.target.value)}/> */}

                                                <label>Country</label>
                                                <select class="input-select" onChange={(e) => setCountry(e.target.value)}>
                                                    <option>India</option>
                                                    <option>America</option>
                                                    <option>South Africa</option>
                                                </select>
                                                <div>
                                                    <GooglePlacesAutocomplete
                                                        apiKey="AIzaSyB_Ve5EsMrUcHRCZHxkZeSdz24emqo4X6Y"
                                                    />
                                                </div>
                                                <label>Time Zone</label>
                                                <select class="input-select" onChange={(e) => setTimeZone(e.target.value)}>
                                                    <option>Time Zone1</option>
                                                    <option>Time Zone2</option>
                                                    <option>Time Zone3</option>
                                                </select>

                                                <label>Zip Code</label>
                                                <input type="text" class="input-select" onChange={(e) => setZip(e.target.value)} />

                                                {/* <input type="text" class="input-select" onChange={(e) => setTimeZone(e.target.value)}/> */}
                                            </div>
                                        </div>

                                        <div class="col-md-12" style={{ display: "flex", flexDirection: "row" }}>
                                            <div class="col-md-6">
                                                <div class="prefarance-form-list">
                                                    <button class="add-links">CANCEL</button>

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="prefarance-form-list">
                                                    <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "5px" }} onClick={CheckValidatiion} >SAVE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam;