import * as React from "react";
import ErrorBoundary from "src/components/ErrorBoundary/ErrorBoundary";
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";
import { UserResponse } from "src/model/user";
import { AppBarAvatar } from "src/components/AppTopBar/AppBarAvatar/AppBarAvatar";
import { useRedirect } from "../../hooks/useRedirect";

const PUBLIC_PATH: string = "/login";

interface ProtectedPage<T extends UserResponse | null> {
    user: T;
    component: React.LazyExoticComponent<any>;
    routeProps?: Object;
    exact?: boolean;
    getPersistedToken: Function;
    logout: Function;
}

// look if token is persited locally/state (should be)
// the validity of toke is handled by axios interceptorp
/**/
export default function ProtectedAppContainer({
  component: Component,
  ...rest
}: ProtectedPage<UserResponse | null>): JSX.Element | null {
  const { user, getPersistedToken, logout } = rest;
  const hasToken = !!(user && user.hasOwnProperty("access_token.length")) || !!getPersistedToken();

  useRedirect(hasToken, PUBLIC_PATH, null);
  /*
        <ErrorNotification/>
    */

  return (
    <ErrorBoundary>
      <PageTheme>
        <div style={{ width: "100%" }}>
          <div style={{ position: "absolute", right: "30px" }}>
            <AppBarAvatar logout={logout}/>
          </div>
          <Component/>
        </div>
      </PageTheme>
    </ErrorBoundary>
  );
}
