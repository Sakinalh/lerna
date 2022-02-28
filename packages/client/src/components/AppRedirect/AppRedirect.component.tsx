import { useSelector } from "react-redux";
import { StoreState } from "src/model";
import { useRedirect } from "../../hooks/useRedirect";

const NOT_FOUND = "/not-found";

interface AppRedirectProps {
    to?: string;
    getPersistedToken: Function;
}

const PUBLIC_PATH = "login";

export function AppRedirect(props: AppRedirectProps): null {
  const { getPersistedToken, to = NOT_FOUND } = props;
  const user = useSelector((state: StoreState) => state.app.user);

  // in case of refresh, user is null so try to get for persisted stores
  const hasToken = !!user.access_token.length || !!getPersistedToken();

  useRedirect(hasToken, PUBLIC_PATH, to);
  return null;
}
