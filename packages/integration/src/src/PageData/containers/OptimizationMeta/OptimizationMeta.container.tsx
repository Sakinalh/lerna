import { Outlet } from "react-router-dom";
import { AppLink } from "../../../components/AppLink/AppLink";

interface OptimizationMetaProps {}

export default function OptimizationMeta(_props: OptimizationMetaProps) {
  return <section>
    <p>Optimization stepper 2</p>

    <ul>
      <li>
        <AppLink path="/data/optimization/page/"
          label="previous"
        />

      </li>
      <li>
        <AppLink path="/data/optimization/validate/"
          label="next"
        />

      </li>

    </ul>
    <Outlet/>

  </section>;
}
