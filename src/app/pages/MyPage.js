import React from "react";
import {useSubheader} from "../../_metronic/layout";
import { useIntl } from "react-intl";

export const MyPage = () => {
  const intl = useIntl();
  const pageName = intl.formatMessage({ id: "ASIDE_MENU.MY_PAGE" });
  const subHeader = useSubheader();
  subHeader.setTitle(pageName);

  return <h1>Hello!</h1>;
};
