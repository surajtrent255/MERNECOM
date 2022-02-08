import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/authConstants';

const UpdatePassword = () => {

  const [ oldPassword, setOldPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector(state => state.user)

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(isUpdated){
        alert.success("Password updated successfully")
        navigate("/me")
        dispatch({
          type: UPDATE_PASSWORD_RESET
        })
    }
  }, [dispatch, alert, error, isUpdated, navigate])

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);

    dispatch(updatePassword(formData))

  }


  return <Fragment>
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler} >
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}

            />
          </div>

          <button type="submit" disabled={loading ? true: false } className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
        </form>
      </div>
    </div>


  </Fragment>;
};

export default UpdatePassword;
