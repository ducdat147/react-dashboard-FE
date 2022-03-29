/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import * as auth from "../Auth";

function AccountInformation(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  useEffect(() => {}, [user]);

  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    const updatedUser = Object.assign(user, {
      username: values.username,
      email: values.email,
    });
    // user for update preparation
    dispatch(props.setUser(updatedUser));
    setTimeout(() => {
      setloading(false);
      setSubmitting(false);
      // Do request to your server for user update, we just imitate user update there, For example:
      // update(updatedUser)
      //  .then(()) => {
      //    setloading(false);
      //  })
      //  .catch((error) => {
      //    setloading(false);
      //    setSubmitting(false);
      //    setStatus(error);
      // });
    }, 1000);
  };
  // UI Helpers
  const initialValues = {
    username: user.username,
    email: user.email,
  };
  console.log(initialValues)
  const Schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Account Information
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            Change your account settings
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            Save Changes
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/personal-information"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          {/* begin::Heading */}
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">Account:</h5>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Username</label>
            <div className="col-lg-9 col-xl-6">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "username"
                  )}`}
                  name="username"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="invalid-feedback">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email Address
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}
export default connect(null, auth.actions)(AccountInformation);
