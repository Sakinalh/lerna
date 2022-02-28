import { Route } from "react-router-dom";
import { Fragment, lazy } from "react";
import { AppRedirect } from "../components/AppRedirect/AppRedirect.component";
import { TabsListWrapper } from "./containers/ListPageWrapper/ListPageWrapper.container";

const TemplateListPage = lazy(
  () => import("src/PageGeneration/containers/TemplateList/TemplateList.container")
);

const TemplateRuleStepperPage = lazy(
  () => import(
    "src/PageGeneration/containers/TemplateRuleStepper/TemplateRuleStepper.container"
  )
);

const TemplateRuleInterpreterPage = lazy(
  () => import(
    "src/PageGeneration/containers/TemplateRuleInterpreter/TemplateRuleInterpreter.container"
  )
);

const TemplateRuleKeywordsPage = lazy(
  () => import(
    "src/PageGeneration/containers/TemplateRuleKeywords/TemplateRuleKeywords.container"
  )
);

const TemplateRuleRecapPage = lazy(
  () => import(
    "src/PageGeneration/containers/TemplateRuleRecap/TemplateRuleRecap.container"
  )
);

const QueuePage = lazy(
  () => import("src/PageGeneration/containers/Queue/Queue.container")
);

const KeywordsPage = lazy(
  () => import("src/PageGeneration/containers/Keywords/Keywords.container")
);

const PreviewPage = lazy(
  () => import("src/PageGeneration/containers/Preview/Preview.container")
);

const GeneratedPage = lazy(
  () => import("src/PageGeneration/containers/Generated/Generated.container")
);

const EditPage = lazy(
  () => import("src/PageGeneration/PageEdit/PageEdit.container")
);

export function routingGeneration(getPersistedToken: Function) {
  return (
    <>
      <Route path="/" element={(<AppRedirect to="generation/template/list/" getPersistedToken={getPersistedToken} />)} />

      <Route key="previewPage" path="previewPage/" element={<PreviewPage />} />
      <Route key="generation" path="generation/">
        <Route key="campain" path="campaign/" element={<KeywordsPage />} />
        <Route key="template" path="template/" element={<TabsListWrapper />}>
          <Route key="list" path="list/" element={<TemplateListPage />} />
          <Route key="queue" path="queue/" element={<QueuePage />} />
        </Route>
        <Route key="editPage" path="editPage/" element={<EditPage />} />

        {/*
                careful with the templateRule paths
                TemplateRuleStepperPage will try to match template id/rule id
                then call api.

            */}
        <Route key="templateRule" path="template/:templateId/rule/" element={<TemplateRuleStepperPage />}>
          <Route key="interpreter" path="create/" element={<TemplateRuleInterpreterPage pathModel="generation/template/:templateId/rule/create/" />} />
          <Route key="interpreter" path=":ruleId/edit/" element={<TemplateRuleInterpreterPage pathModel="generation/template/:templateId/rule/:ruleId/edit/" />} />
          <Route key="keywords" path=":ruleId/keywords/" element={<TemplateRuleKeywordsPage pathModel="generation/template/:templateId/rule/:ruleId/keywords/" />} />
          <Route key="recap" path=":ruleId/recap/" element={<TemplateRuleRecapPage pathModel="generation/template/:templateId/rule/:ruleId/recap/" />} />
        </Route>
        <Route path="*" element={(<AppRedirect to="template/list/" getPersistedToken={getPersistedToken} />)}
        />
      </Route>
    </>
  );
}
