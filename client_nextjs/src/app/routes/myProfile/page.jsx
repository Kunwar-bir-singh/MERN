import React from "react";
import "./myProfile.css";

const Page = () => {
  return (
    <div className="myProfile_body">
      <div className="myProfile_container">
        <div className="profile_user_img">
            <div class="user-avatar">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Maxwell Admin"
              />
          </div>
          <div className="user_deatils_view">
            <h5 class="user-name">Yuki Hayashi</h5>
            <h6 class="user-email">yuki@Maxwell.com</h6>
          </div>
        </div>
        <div className="profile_user_details">
          <form action="#">
            <div className="form-row">
              <div className="input-data">
                <input type="text" required />
                <div className="underline"></div>
                <label htmlFor="">Username</label>
              </div>
              <div className="input-data">
                <input type="text" required />
                <div className="underline"></div>
                <label htmlFor="">Fullname</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input type="number" required />
                <div className="underline"></div>
                <label htmlFor="">Phone Number</label>
              </div>
              <div className="input-data">
                <input type="text" required />
                <div className="underline"></div>
                <label htmlFor="">E-Mail</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea rows="8" cols="80" required></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="">Address</label>
                <br />
                {/* <div className="form-row submit-btn">
               <div className="input-data">
                  <div className="inner"></div>
                  <input type="submit" value="submit"/>
               </div>
            </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
