import * as React from "react";
import { useState } from "react";
import clsx from "clsx";
import { MoreHoriz, ViewQuilt } from "@mui/icons-material";
import { AppText } from "src/components/AppText/AppText.component";
import { MenuBusinesses } from "src/PageBusinesses/components/MenuBusinesses/MenuBusinesses.component";
import { UserProfile } from "./UserProfile/UserProfile.component";
import { AppNav } from "./AppNav/AppNav.component";
import { NavHead } from "./NavHead/NavHead.component";
import { AppBtn } from "../AppBtn/AppBtn.component";
import { useStyles } from "./AppSideNav.style";

export interface AppSideNavProps {}

export function AppSideNav(_props: AppSideNavProps): JSX.Element {
  const classes = useStyles();
  const [useIsToggled, setUseIsToggled] = useState(true);
  const [useIsToggledIcon, setUseIsToggledIcon] = useState(false);
  const appSideNavContainer = React.useRef(null);
  function onToggleNav(b: boolean): void {
    !useIsToggledIcon && setUseIsToggled(b);
  }

  function onToggleNavIcon(b: boolean): void {
    setUseIsToggledIcon(b);
  }

  return (
    <aside className={clsx(classes.root, "appSideNav")}>
      <div
        ref={appSideNavContainer}
        className={clsx("appSideNav__container", { isExpanded: useIsToggled })}
        onMouseEnter={() => {
          onToggleNav(true);
        }}
        onMouseLeave={() => {
          onToggleNav(false);
        }}
      >
        <NavHead isExpanded={useIsToggled} />
        <div className={"appSideNav__navContent"}>
          <div>
            <UserProfile isExpanded={useIsToggled} />
            <MenuBusinesses isExpanded={useIsToggled} />
            <AppNav isExpanded={useIsToggled} />
          </div>

          <div className={"appSideNav__bottomAction"}>
            <AppBtn
              disabled
              color="inherit"
              customclass={"appSideNav__linkBottom"}
            >
              <MoreHoriz
                classes={{
                  root: "appSideNav__linkBottom--icon iconCorrection"
                }}
              />

              <AppText
                themeColor="neutralColor"
                text="Settings"
                capitalize="first"
                props={{
                  classes: {
                    root: "appSideNav__linkBottom--label"
                  }
                }}
              />
            </AppBtn>

            <AppBtn
              color="inherit"
              customclass={clsx("appSideNav__linkBottom", {
                isExpanded: useIsToggledIcon
              })}
              data-testid="toggle-nav-btn"
              onClick={() => onToggleNavIcon(!useIsToggledIcon)}
              // {"isExpanded": useIsToggled }
            >
              <ViewQuilt classes={{ root: "appSideNav__linkBottom--icon" }} />

              <AppText
                themeColor="neutralColor"
                text="toggle sidebar"
                capitalize="first"
                props={{
                  classes: {
                    root: "appSideNav__linkBottom--label"
                  }
                }}
              />
            </AppBtn>
          </div>
        </div>
      </div>
    </aside>
  );
}
