/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import {FormattedMessage} from "react-intl";

export function UserProfileDropdown() {
  const { user } = useSelector((state) => state.auth);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
          }
        >
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            <FormattedMessage id="TRANSLATOR.HI"/>,
          </span>{" "}
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            {user.firstname} {user.lastname}
          </span>
          <span className="symbol symbol-35 symbol-light-success">
            <span className="symbol-label font-size-h5 font-weight-bold">
              {user.firstname[0]}
            </span>
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <>
          {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          {layoutProps.light && (
            <>
              <div className="d-flex align-items-center p-8 rounded-top">
                <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                  <img src={toAbsoluteUrl("/media/users/300_21.jpg")} alt="" />
                </div>
                <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                  {user.firstname} {user.lastname}
                </div>
                {/*
                <span className="label label-light-success label-lg font-weight-bold label-inline">
                  3 messages
                </span>
                */}
              </div>
              <div className="separator separator-solid"></div>
            </>
          )}

          {!layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                  "/media/misc/bg-1.jpg"
                )})`,
              }}
            >
              <div className="symbol bg-white-o-15 mr-3">
                <span className="symbol-label text-success font-weight-bold font-size-h4">
                  {user.firstname[0]}
                </span>
                {/*<img alt="Pic" className="hidden" src={user.pic} />*/}
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                {user.firstname} {user.lastname}
              </div>
              {/*
              <span className="label label-success label-lg font-weight-bold label-inline">
                3 messages
              </span>
              */}
            </div>
          )}
        </>

        <div className="navi navi-spacer-x-0 pt-5">
          <Link to="/user-profile" className="navi-item px-8 cursor-pointer">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="fas fa-address-card text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold cursor-pointer">
                  <FormattedMessage id="TRANSLATOR.PROFILE.TITLE"/>
                </div>
                <div className="text-muted">
                  <FormattedMessage id="TRANSLATOR.PROFILE.LABEL"/>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/user-change-password" className="navi-item px-8 cursor-pointer">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="fas fa-lock text-danger" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold cursor-pointer">
                  <FormattedMessage id="TRANSLATOR.CHANGE_PASSWORD.TITLE"/>
                </div>
                <div className="text-muted">
                  <FormattedMessage id="TRANSLATOR.CHANGE_PASSWORD.LABEL"/>
                </div>
              </div>
            </div>
          </Link>

          <div className="navi-separator mt-3"></div>

          <div className="navi-footer px-8 py-5">
            <Link
              to="/logout"
              className="btn btn-light-primary font-weight-bold"
            >
              <FormattedMessage id="AUTH.SIGN_OUT"/>
            </Link>
            {/*
            <a href="#" className="btn btn-clean font-weight-bold">
              Upgrade Plan
            </a>
            */}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
