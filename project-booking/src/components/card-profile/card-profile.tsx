import { useParams } from "react-router-dom";
import "./card-profile.css";
import { useEffect, useState } from "react";
import UserService from "../../services/user-service";
const ProfileUser = () => {
  const getSes = JSON.parse(localStorage.getItem("tokenId") as string);
  const [getDataByUserSerVices, setGetDataByUserSerVices] = useState<any>();
  useEffect(() => {
    const getDataUserSerVices = new UserService();
    const getUserById = async () => {
      try {
        const dataUser = await getDataUserSerVices.getInformation(getSes);
        setGetDataByUserSerVices(dataUser.data);
      } catch (error) {
        throw error;
      }
    };
    getUserById();
  }, []);
  console.log(getDataByUserSerVices);

  return (
    <>
      {/* Hello world */}
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={
                  getDataByUserSerVices?.avatar[
                    getDataByUserSerVices?.avatar.length - 1
                  ]
                }
              />
              <span className="font-weight-bold">
                {getDataByUserSerVices?.firstNameUserOrder}{" "}
                {getDataByUserSerVices?.lastNameUserOrder}
              </span>
              <span className="text-black-50">
                {getDataByUserSerVices?.email}
              </span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    defaultValue={getDataByUserSerVices?.firstNameUserOrder}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={getDataByUserSerVices?.lastNameUserOrder}
                    placeholder="surname"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    defaultValue={getDataByUserSerVices?.phoneUserOrder}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    defaultValue="dang nang"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue="50000"
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="viet nam"
                    defaultValue={getDataByUserSerVices?.email}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue=" da nang viet nam"
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus" />
                  &nbsp;Experience
                </span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Experience in Designing</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  defaultValue=""
                />
              </div>{" "}
              <br />
              <div className="col-md-12">
                <label className="labels">Additional Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="additional details"
                  defaultValue=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileUser;
