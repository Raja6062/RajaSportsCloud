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
import validator from 'validator'


const AddPlayer = () => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [fname, setFName] = useState()
    const [lname, setLName] = useState()
    const [label, setLabel] = useState()
    const [birthday, setBirthday] = useState();
    const [email, setEmail] = useState()
    const [who, setWho] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [gender, setGender] = useState()
    const [jursey, setJursey] = useState()
    const [position, setPosition] = useState()
    const [assignment, setAssingment] = useState()
    const [uniform, setUniform] = useState()
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()
    const [profilePic, setProfilePic] = useState([])
    const [team, setTeam] = useState([])
    const [loader, setLoader] = useState(false)
    const [playerType, setPlayerType] = useState(false)
    const[birthError,setBirthError] =useState("")
    const[stateError,setStateError] =useState("")
    const[phoneError,setPhoneError] =useState("")
    const[jurseyError,setJurseyError] =useState("")
    const[possitionError,setPossitionError] =useState("")
    const[emailError,setEmailError] =useState("")
    const[fnameError,setFnameError] =useState("")
    const[genderError,setGenderError] =useState("")
    const[lanmeError,setLnameError] =useState("")
    const[cityError,setCityError] =useState("")
    const[zipErroe,setZipError] =useState("")



    useEffect(() => {

        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        dropdownMenu();
        updateProfile()


    }, []);
    const pic1 = "https://nodeserver.mydevfactory.com:1447/profilepic/"

    const updateProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            console.log('user', user)

            Network('api/get-user-details', 'GET', header)
                .then(async (res) => {
                    console.log("new Profile Pic----", res)

                    setProfilePic(res.response_data)
                    setLoader(true)


                })
        }

    }


    const playerData = () => {
        if(CheckValidatiion()){
            const user = JSON.parse(localStorage.getItem('user'));
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.authtoken
                },
                body: JSON.stringify({
                    "email": email,
                    "fname": fname,
                    "lname": lname,
                    "team_id": teamDropdown,
                    "gender": gender,
                    "city": city,
                    "zip": zip,
                    "dob": birthday,
                    "state": state,
                    "address": address,
                    "phone": phone,
                    "member_type": playerType ? "PLAYER" : "NON-PLAYER",
                    "jersey_number": jursey,
                    "position": position,
                    "family_member": [{ "name": "Krishna Das", "email": "angelinaKoli@gmail.com", "phone": 123453, "relation": "DAD" }]
                })
    
    
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/add-player-roster', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("player data", res)
                     if(res.response_code==2000){
                        history.push("./ManagerRoster")
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



    const CheckValidatiion = () => {
        let isValid = true
        if (email == null) {
            isValid = false
            setEmailError("Please Provide  Email")

        }
        else {
            setEmailError("")
        }
        if (email) {
            if (validator.isEmail(email)) {
                console.log(email)
            }
            else {
                setEmailError("Please Provide Valid Email")
            }

        }



        if (fname == null) {
            isValid = false
            setFnameError("Please Provide First Name")
        }
        else {
            setFnameError("")
        }
        if (lname == null) {
            isValid = false
            setLnameError("Please Provide Last Name")

        }
        else {
            setLnameError("")
        }
        if (gender == null) {
            isValid = false
            setGenderError("Please Select Your Gender")
        }
        else {
            setGenderError("")
        }
        if (city == null) {
            isValid = false
            setCityError("Please Select City Name")

        }
        else {
            setCityError("")
        }
        if (zip == null) {
            isValid = false
            setZipError("Please Provide Zip Code")

        }
        else {
            setZipError("")
        }
        if (birthday == null) {
            isValid = false
            setBirthError("Please Select Birthday")
        }
        else {
            setBirthError("")
        }
        if (state == null) {
            isValid = false
            setStateError("Please Select State")
        }
        else {
            setStateError("")
        }
        if (phone == null) {
            isValid = false
            setPhoneError("Please Select Phone Number")

        }
        else {
            setPhoneError("")
        }
        if (jursey == null) {
            isValid = false
            setJurseyError("Please Provide Jursey Number")
        }
        else {
            setJurseyError("")
        }
        if (position == null) {
            isValid = false
            setPossitionError("Please Provide  Position")
        }
        else {
            setPossitionError("")
        }




        return isValid



    }



    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        history.push("/")
    };






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




    const deletePlayerData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const a = window.confirm('Are you sure you wish to delete this Data?')
        console.log("delete click")
        if (a == true) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': user.authtoken
                },
                body: JSON.stringify({
                    "id": id
                })
            };
            fetch('https://nodeserver.mydevfactory.com:1447/api/delete-game-event', requestOptions)
                .then(response => response.json())
                .then((res) => {
                    console.log("delete Schedule  data", res)
                    if (res.response_code == 2000) {
                        console.log("deleted data", res)
                    }
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }


                    teamSchedule()

                })
        }

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
                    <ul class="nav nav-tabs" role="tablist" >
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"><h1 style={{ color: "white", fontSize: "29px" }}>New Member</h1> </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Member Info</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Contact Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Optional PLayer Details</a>
                        </li>
                        <li class="nav-item" href="#tabs-4" role="tab">
                            <div style={{ backgroundColor: "gray", borderRadius: "10px" }}>
                                <h3 style={{ color: "white", padding: "10px" }}> Reordering People</h3>
                                <p style={{ color: "white", padding: "10px" }}>In short, don't! Everyone receives the same information, regardless of their order in the list. Changing an email to another person's email address does not give them access. To invite some-one new, use the "Add New Family Member" button. <span style={{ color: "red" }}>Learn more</span> in our help center.</p>
                            </div>
                        </li>

                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="prefarance-tab-content">

                                <div class="prefarance-form playerinfo-form">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label> First Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setFName(e.target.value)} />
                                                <span style={{color:"red"}}> {fnameError}</span>
                                            </div>
                                        </div>


                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Last Name</label>
                                                <input type="text" class="input-select" onChange={(e) => setLName(e.target.value)} />
                                                <span style={{color:"red"}}> {lanmeError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list">
                                                <label>Non Player</label>
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} onClick={() => setPlayerType(!playerType)} />
                                                <span style={{ color: "white" }}>This person is a non playing player of the team </span>

                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Email</label>
                                                <input type="text" class="input-select" onChange={(e) => setEmail(e.target.value)} />
                                                <span style={{color:"red"}}> {emailError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Whoe's This? </label>
                                                <input type="text" class="input-select" onChange={(e) => setWho(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Email</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Phone Number</label>
                                                <input type="text" class="input-select" onChange={(e) => setPhone(e.target.value)} />
                                                <span style={{color:"red"}}> {phoneError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Label</label>
                                                <input type="text" class="input-select" onChange={(e) => setLabel(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <button data-toggle="modal" data-target="#assignmentdelect" style={{ borderRadius: "12px", backgroundColor: "red", }}><img src={Delect} /></button>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="prefarance-form-list" style={{ justifyContent: "flex-end", display: "flex" }}>
                                                <p style={{ color: "white" }}> +Add Another Phone Number</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Address</label>
                                                <input type="text" class="input-select" onChange={(e) => setAddress(e.target.value)} />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>City</label>
                                                <input type="text" class="input-select" onChange={(e) => setCity(e.target.value)} />
                                                <span style={{color:"red"}}> {cityError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >State/Province</label>
                                                <input type="text" class="input-select" onChange={(e) => setState(e.target.value)} />
                                                <span style={{color:"red"}}> {stateError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Zip/Postal Code</label>
                                                <input type="text" class="input-select" onChange={(e) => setZip(e.target.value)} />
                                                <span style={{color:"red"}}> {zipErroe}</span>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Gender</label>
                                                <select onChange={(e) => setGender(e.target.value)} class="input-select">
                                                    <option>SELECT</option>
                                                    <option>MALE</option>
                                                    <option>FEMALE</option>
                                                </select>
                                                <span style={{color:"red"}}> {genderError}</span>

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Birthday</label>
                                                <div class="input-select" >
                                                    <input type="date" class="input-select" onChange={(e) => setBirthday(e.target.value)} style={{ border: "none" }} />                                                
                                                <span style={{color:"red"}}> {birthError}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >Jursey Number</label>
                                                <input type="text" class="input-select" onChange={(e) => setJursey(e.target.value)} />
                                                <span style={{color:"red"}}> {jurseyError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label >Position</label>
                                                <input type="text" class="input-select" onChange={(e) => setPosition(e.target.value)} />
                                                <span style={{color:"red"}}> {possitionError}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Assignment</label>
                                                <input type="text" class="input-select" onChange={(e) => setAssingment(e.target.value)} />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <label>Uniform</label>
                                                <input type="text" class="input-select" onChange={(e) => setUniform(e.target.value)} />

                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="prefarance-form-list">
                                                <input type="checkbox" style={{ height: "15px", width: "17px" }} />
                                                <span style={{ color: "white" }}>Invite to join </span>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="prefarance-form-list" style={{ paddingBottom: "13px" }}>
                                                <button class="add-links">CANCEL</button>
                                                <button class="add-links" style={{ backgroundColor: "#181717", marginLeft: "4px" }} onClick={playerData}>SAVE</button>
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

export default AddPlayer;