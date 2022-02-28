import { useEffect } from "react";

export function useScrollTop(id: string, nextDataQuery: string | null) {
  const el = document.getElementById(id);
  useEffect(() => {
    if(el) {
      el.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [nextDataQuery, el]);
}
