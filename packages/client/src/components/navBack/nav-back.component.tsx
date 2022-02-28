import { useNavigate, useLocation } from "react-router-dom";

export interface NavBackProps {}

export function Navback(props: NavBackProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const hasPreviousState = location.key !== "default";
  const goBack = () => {
    hasPreviousState && navigate(-1);
  };
  return <button onClick={goBack}>back</button>;
}
