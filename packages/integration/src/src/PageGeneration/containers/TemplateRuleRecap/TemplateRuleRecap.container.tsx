import { Fragment } from "react";
import { AppSearch } from "src/components/AppSearch/AppSearch.component";
import { TemplateRuleRecap } from "../../components/TemplateRuleRecap/TemplateRuleRecap.component";

interface RecapContainerProps {
    pathModel: string;
}

export default function TemplateRuleRecapContainer(_props: RecapContainerProps): JSX.Element {
  return (
    <Fragment>
      <AppSearch/>
      <TemplateRuleRecap/>
    </Fragment>
  );
}
