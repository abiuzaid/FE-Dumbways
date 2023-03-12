import React from 'react'
import ImgProfile from '../assets/image/myProfile.png'

function Profile() {
    const getUser = JSON.parse(localStorage.getItem("loginUser"));

  return (
    <div>
        <h3 className="fw-bold" style={{color: "#613D2B", marginBottom: 26}}>My Profile</h3>
        <div className="d-flex">
            <div className="img-wrapper"  style={{width: 180, height: 221}}>
                <img src={ImgProfile} style={{width: "100%"}} alt="profile" />
            </div>
            <div style={{marginLeft: 28}}>
                <div className="name">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Full Name</p>
                    <p className="fs-5 m-0" >{getUser.name}</p>
                </div>
                
                <div className="email mt-3">
                    <p className="fs-4 m-0 fw-bolder" style={{color: "#613D2B"}}>Email</p>
                    <p className="fs-5 m-0" >{getUser.email}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
