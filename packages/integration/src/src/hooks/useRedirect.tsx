import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * handle redirection logic
 * on invalid token,-> token
 * if a successful path is provided, navigate
 * the effect is used by ProtectedApp ( simple token check before mounting component)
 * AppRedirect provide a fallback route when path is invalid
 * @param hasToken
 * @param fallbackPath
 * @param successPath
 */
export function useRedirect(hasToken: boolean, fallbackPath: string, successPath: string | null): void {
  const navigate = useNavigate();

  useEffect(() => {
    if(!hasToken) {
      // navigate(fallbackPath);
    }

    if(successPath) {
      navigate(successPath);
    }
  }, [hasToken, navigate, fallbackPath, successPath]);
}
