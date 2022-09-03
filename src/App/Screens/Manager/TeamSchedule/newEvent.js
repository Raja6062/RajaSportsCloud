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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { Network } from '../../../Services/Api';
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import TeamList from "../../../images/team-list.png"
import CalenderIcon from "../../../images/calenderIcon.png"
import SideMenuComponents from "../../../Components/SideMenu"
import flag from "../../../images/flag.png"
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import UserProfile from "../../../images/user-profile.png"
import BigUserProfile from "../../../images/big-user-profile.png"





const NewEvent = () => {

    const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/"

    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState('');
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [flag, setFlag] = useState([])
    const [name, setName] = useState()
    const [lebel, setLebel] = useState()
    // const [date, setDate] = useState()
    const [time, setTime] = useState('');
    // const [time, setTime] = useState()
    const [oponent, setOponent] = useState()
    const [location, setLocation] = useState()
    const [locationDetails, setLocationDetails] = useState()
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [arrivalTime, setArrivalTime] = useState("")
    const [note, setNote] = useState()
    const [availability, setAvalability] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [teamId, setTeamId] = useState()
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState('')
    const [ownDropdown, setOwnDropDown] = useState("")
    const [opnentDropdown, setOponentDropDown] = useState("")
    const [check, setCheck] = useState("false")
    const [flagId, setFlagId] = useState("")
    const { state } = useLocation()
    const [schedule, setSchedule] = useState([])
    const [nameError, setNameError] = useState("")
    const [starDateError, setStartDError] = useState("")
    const [teamError, setTeamError] = useState("")

    const [OpError, setOponetError] = useState("")
    const [LError, setLabelError] = useState("")
    const [stateError, setStateError] = useState("")
    const [locaDError, setLocationDError] = useState("")

    const [LocError, setLocationError] = useState("")
    const [uniError, setUniformError] = useState("")
    const [arrivError, setArrivalTimeError] = useState("")
    const [noteError, setNoteError] = useState("")
    const [assignError, setAssingmentError] = useState("")
    const [flagError, setFlagError] = useState("")
    const [stiemError, setStartDateError] = useState("")
    const [etimeError, setEndTimeError] = useState("")
    const [timeError, setTimeError] = useState("")
    const[ownError,setOwnError] =useState("")
    const [loader, setLoader] = useState(false)
    const [profilePic, setProfilePic] = useState([])













    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        flagList()
        dropdownMenu()
        updateProfile()



    }, []);
    const pic = 'https://nodeserver.mydevfactory.com:1447/'



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
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



    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }


            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setFlag(res.response_data)


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





    const eventCreate = () => {
        if (CheckValidatiion()) {
            const user = JSON.parse(localStorage.getItem('user'));
            const eventType = localStorage.getItem("eventType")
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.authtoken
                },
                body: JSON.stringify({
                    'name': name,
                    'date': startDate,
                    'team_id': ownDropdown,
                    'short_label': lebel,
                    "opponent": opnentDropdown,
                    "manager_id": user._id,
                    "event_type": state,
                    "location_details": locationDetails,
                    "location": location,
                    "uniform": uniform,
                    "arrival_time": arrivalTime,
                    "notes": note,
                    "assignment": assignment,
                    "notify_team": check,
                    "display_icon": flagId,
                    "home_or_away": "HOME",
                    "time": {
                        "startTime": startTime,
                        "endTime": endTime
                    },
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/add-game-event', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("event Data", res)
                    console.log("eventType", eventType)
                    if (res.response_code == 2000) {
                        console.log("success new game event", res)
                        history.push("/Teamschdule")
                    }
                    else{
                        toast.error(res.response_message)

                    }
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                })
        }


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


    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }

    const changeTeam = (event) => {
        setOwnDropDown(event.target.value)
    }

    const changeOponent = (event) => {
        setOponentDropDown(event.target.value)
    }

    const selectFlag = (event) => {
        setFlagId(event.target.value)
    }




    const CheckValidatiion = () => {
        let isValid = true
        if (name == null) {
            isValid = false
            setNameError("Please Provide  Name")
        }
        else {
            setNameError("")
        }
        if (!startDate) {
            isValid = false
            setStartDError("Please Provide Start Date")
        }
        else {
            setStartDError("")
        }
        if (!time ) {
            isValid = false
            setTimeError("Please Provide Time")
        }
        else {
            setTimeError("")
        }
        
        if (lebel == null) {
            isValid = false
            setLabelError("Please Fill the Label")

        }
        else {
            setLabelError("")
        }
        if (!ownDropdown) {
            isValid = false
            setOwnError("Please Select Oponent Team")

        }
        else {
            setOwnError("")
        }
        if (!opnentDropdown) {
            isValid = false
            setOponetError("Please Select Oponent Team")

        }
        else {
            setOponetError("")
        }
        if (state == null) {
            isValid = false
            setStateError("Please Provide State")

        }
        else {
            setStateError("")
        }
        if (locationDetails == null) {
            isValid = false
            setLocationDError("Please Select Location Details")

        }
        else {
            setLocationDError("")
        }
        if (location == null) {
            isValid = false
            setLocationError("Please Select Location")

        }
        else {
            setLocationError("")
        }
        if (uniform == null) {
            isValid = false
            setUniformError("Please Select Uniform")
        }
        else {
            setUniformError("")
        }
        if (!arrivalTime) {
            isValid = false
            setArrivalTimeError("Please Provide Arrival Time")

        }
        else {
            setArrivalTimeError("")
        }
        if (note == null) {
            isValid = false
            setNoteError("Please Provide  Note")

        }
        else {
            setNoteError("")
        }
        if (assignment == null) {
            isValid = false
            setAssingmentError("Please Provide Assignment")

        }
        else {
            setAssingmentError("")
        }
        if (!flagId) {
            isValid = false
            setFlagError("Please Select Your Flag")

        }
        else {
            setFlagError("")
        }
        if (!startTime ) {
            isValid = false
            setStartDateError("Please Provide Starting Time")

        }
        else {
            setStartDateError("")
        }
        if (!endTime) {
            isValid = false
            setEndTimeError("Please Provide End Time")

        }
        else {
            setEndTimeError("")
        }


        return isValid



    }

console.log("starDateError",starDateError)

    return (
        <div class="prefarance-box player-info" style={{ height: "100%", marginTop: "0px", borderRadius: "0px" }}>
            <SideMenuComponents manger="manger" />
            <div class="dashboard-main-content">
            <div class="dashboard-head">
                    <div class="teams-select">
                        <button class="create-new-team" onClick={() => {
                            history.push("/CreateTeam")
                        }}>Create New Teams</button>
                        <select onChange={change} >

                            {dropdown == null ? <option> Team1</option> :
                                dropdown.map((team) => {
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
                <div class="prefarance-box" style={{ overflow: "auto" }} >
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "35px" }}>New {state}</h1> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">{state} Details</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Optional {state} Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Assignment</a>
                        </li>

                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="prefarance-tab-content">

                                <div class="prefarance-form playerinfo-form">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label> Name of {state}</label>
                                                <input type="text" class="input-select" onChange={(e) => setName(e.target.value)} />
                                                <span style={{ color: "red" }}>{nameError}</span>
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Short Lebel</label>
                                                <input type="text" class="input-select" onChange={(e) => setLebel(e.target.value)} />
                                                <span style={{ color: "red" }}>{LError}</span>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Date</label>
                                                <input type="date" onChange={(e) => setStartDate(e.target.value)} class="input-select" />
                                                <span style={{ color: "red" }}>{starDateError}</span>
                                            </div>


                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Time <span style={{ color: "gray" }}>(Leave Blank for "TBD")</span></label>
                                                <input type="time" onChange={(e) => setTime(e.target.value)} class="input-select" />
                                                <p style={{ color: "gray" }}>Pacific Time (US & Canada)<span style={{ color: "red" }}>Change</span></p>
                                            </div>
                                            <span style={{ color: "red" }}>{timeError}</span>

                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Team</label>
                                                {/* <input type="text" class="input-select" onChange={(e) => setOponent(e.target.value)} /> */}
                                                <select class="input-select" onChange={(e)=>setOwnDropDown(e.target.value)}>
                                                    <option value="">Select A Team </option>
                                                    {dropdown.map((dropdown) => {
                                                        return (


                                                            <option value={dropdown._id}>{dropdown.team_name}</option>

                                                        )
                                                    })}
                                                </select>
                                                <span style={{ color: "red" }}>{ownError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Oponent</label>
                                                {/* <input type="text" class="input-select" onChange={(e) => setOponent(e.target.value)} /> */}
                                                <select class="input-select" onChange={(e)=>setOponentDropDown(e.target.value)} >
                                                    <option value="">Select Oponent Team </option>
                                                    {dropdown.map((dropdown) => {
                                                        return (

                                                            <option value={dropdown._id}>{dropdown.team_name}</option>


                                                        )
                                                    })}
                                                </select>
                                                <span style={{ color: "red" }}>{OpError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Location</label>
                                                <input type="text" class="input-select" onChange={(e) => setLocation(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{LocError}</span>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Location Details</label>
                                                <input type="text" class="input-select" onChange={(e) => setLocationDetails(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{locaDError}</span>
                                        </div>

                                        <div class="col-md-3">
                                            <div class="prefarance-form-list">
                                                <label>Start Time</label>
                                                <input type="time" class="input-select" onChange={(e) => setStartTime(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{stiemError}</span>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="prefarance-form-list">
                                                <label >End Time</label>
                                                <input type="time" class="input-select" onChange={(e) => setEndTime(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{etimeError}</span>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Arrival Time</label>
                                                <input type="time" class="input-select" onChange={(e) => setArrivalTime(e.target.value)} />
                                                <p style={{ color: "gray" }}> minutes befor the starting  time</p>
                                            </div>
                                            <span style={{ color: "red" }}>{arrivError}</span>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Display Icon</label>

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <div style={{ display: "flex" }}>
                                                    {flag.map((flag) => {
                                                        return (

                                                            <div style={{ margin: "10px" }}><img src={`${pic}${flag.image}`} alt="" style={{ height: "30px", width: "30px" }} /><br></br>
                                                                <input type="radio" name="radio" style={{ height: "30px", margin: "5px" }} onClick={selectFlag} value={flag._id} /></div>
                                                        )
                                                    })}




                                                </div>
                                                <span style={{ color: "red" }}>{flagError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label >Notes</label>
                                                <input type="text" class="input-select" style={{ height: "150px" }} onChange={(e) => setNote(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{noteError}</span>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label >Availability</label>
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onChange={(e) => setAvalability(e.target.value)} />
                                                <span style={{ color: "white" }}>Track availability on the Availability tab</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Assignment</label>
                                                <input type="text" class="input-select" onChange={(e) => setAssingment(e.target.value)} />
                                            </div>
                                            <span style={{ color: "red" }}>{assignError}</span>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Uniform</label>
                                                <input type="text" class="input-select" onChange={(e) => setUniform(e.target.value)} />
                                                <p style={{ color: "red", fontSize: "15px", float: "right" }}>+Add Another</p>
                                            </div>
                                            <span style={{ color: "red" }}>{uniError}</span>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={() => setCheck(check == "true" ? "false" : "true")} />
                                                <span style={{ color: "white" }}> Notify Your Team?</span>
                                                <button class="add-links" style={{ margin: "10px" }}>Cancel</button>
                                                <button class="add-links" style={{ margin: "10px", backgroundColor: "#1d1b1b" }} onClick={eventCreate}>Save</button>
                                                <button style={{ backgroundColor: "#1d1b1b", padding: "13px", borderRadius: "30px", margin: "10px", color: "white" }}>+Save and Create Another</button>
                                            </div>
                                        </div>
                                        {/* <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Links</label>
                                                            <button class="add-links">Add Links</button>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="prefarance-form-list">
                                                            <label>Files</label>
                                                            <button class="add-links">Add Files</button>
                                                        </div>
                                                    </div> */}
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

export default NewEvent;