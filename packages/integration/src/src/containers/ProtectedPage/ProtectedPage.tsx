import { useNavigate } from "react-router-dom";
import { PageTheme } from "src/containers/PageTheme/PageTheme.container";
import { LazyExoticComponent, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { useQuery } from "react-query";
import { getCustomerId } from "src/api/react-query/user.store";

const PUBLIC_PATH: string = "/login/";

interface ProtectedCustomPage {
  component: LazyExoticComponent<any>;
  getPersistedToken: Function;
  routeProps?: Object;
  exact?: boolean;
  logout: Function;
}

// look if token is persisted locally/state (should be)
// the validity of toke is handled by axios interceptorp

export default function ProtectedPage({ component: Component, ...rest }: ProtectedCustomPage): JSX.Element {
  const [token, setToken] = useState(null);

  const { getPersistedToken, logout } = rest;
  const user = useSelector((state: StoreState) => state.app.user);
  const {data: customerId} = useQuery(["getCustomerId", user], getCustomerId(user?.user_id), {
    enabled: !!(user?.user_id)
  });

  useEffect(() => {
    window.localStorage.setItem("naister_user_customer_id", customerId);
  }, [customerId]);

  const navigate = useNavigate();

  const hasToken = user.access_token || getPersistedToken();

  useEffect(() => {
    if(!hasToken) {
      navigate(PUBLIC_PATH, { replace: true });
    }
  });

  useEffect(() => {
    getPersistedToken().then((token) => {
      setToken(token);
      if(!token || typeof token !== "string") {
        navigate(PUBLIC_PATH, { replace: true });
      }
    });
  }, [token, navigate]);

  return (
    <PageTheme>
      <Component logout={logout} />
    </PageTheme>
  );
}
