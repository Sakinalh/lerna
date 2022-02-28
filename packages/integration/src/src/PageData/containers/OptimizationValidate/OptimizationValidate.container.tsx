import { Outlet } from "react-router-dom";
import { AppLink } from "../../../components/AppLink/AppLink";

interface OptimizationValidateProps {}

export default function OptimizationValidate(_props: OptimizationValidateProps) {
  return <section>
    <p>Optimization stepper last </p>

    <ul>

      <li>
        <AppLink path="/data/optimization/meta/"
          label="previous"
        />
      </li>
      <li>

        end of stepper

      </li>

    </ul>
    <Outlet/>

  </section>;
}
