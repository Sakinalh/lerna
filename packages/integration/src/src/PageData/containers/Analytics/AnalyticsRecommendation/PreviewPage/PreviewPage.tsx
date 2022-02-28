import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function PreviewPage() {
  const location = useLocation();
  const urlPage = (queryString.parse(location.search)).pageUrl;

  return (
    <div>
      <iframe title="previewIframe" style={{height: "calc(100vh - 52px)", width: "100%"}} src={urlPage}></iframe>
    </div>
  );
}