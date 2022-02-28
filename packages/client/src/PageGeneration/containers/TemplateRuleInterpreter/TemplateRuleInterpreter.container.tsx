import { useEffect, useRef, useState } from "react";
import { InterpreterTools } from "src/PageGeneration/components/InterpreterTools/InterpreterTools.component";
import { InterpreterHeader } from "src/PageGeneration/components/InterpreterHeader/InterpreterHeader.component";
import { useDispatch, useSelector } from "react-redux";
import { MetaElement, StoreState } from "src/model";
import { setSelectedZoneAction } from "src/PageGeneration/store/shared.epic";
import { docToStr, transformTemplate } from "./utils";
import { getInterpreterRouteParams } from "../../shared/helper";

declare let window: any;

function listZonesToDic(zones: Array<MetaElement>): Record<string, MetaElement> {
  if(Array.isArray(zones)) {
    return zones.reduce((acc, curr) => ({ ...acc, [curr.zone_id]: curr }), {});
  }

  return {};
}

async function getTemplate(url) {
  return fetch(url).then(res => res.text());
}

interface TemplateRuleInterpreterProps {
  pathModel: string;
}

export default function TemplateRuleInterpreter(_props: TemplateRuleInterpreterProps) {
  const [templateDoc, setTemplateDoc] = useState("");
  const isTemplateSet = useRef(false);

  const [optType, setOptType] = useState<[] | [string, string]>([]);

  const dispatch = useDispatch();

  const { zones, url }: { zones: Array<MetaElement>, url: string } = useSelector(
    (state: StoreState) => state.ruleDetail.templateDetail
  );

  const parentURL = window.parent.location.origin;

  const iframeInstance = useRef(null);

  const {
    templateId
  } = getInterpreterRouteParams(window.location.pathname);

  useEffect(() => {
    function isEmptyObject(obj) {
      for(const name in obj) {
        if(obj.hasOwnProperty(name)) {
          return false;
        }
      }
      return true;
    }

    const _zoneDict: any = listZonesToDic(zones);

    if(!isEmptyObject(_zoneDict) && !isTemplateSet.current) {
      // really ugly.attach meta to parent window so that child frame access it
      window.__naister_template_meta = _zoneDict;
      (async function parseDoc() {
        const doc = await getTemplate(url);
        const amended = transformTemplate(doc, _zoneDict);
        setTemplateDoc(docToStr(amended));
        isTemplateSet.current = true;
      }());
    }

    function handleChildAction(ev) {
      const key = ev.message ? "message" : "data";
      const { id } = ev[key];

      if(id) {
        const selectedZone = zones.find(z => z.zone_id === id);

        if(selectedZone) {
          const { type } = selectedZone;
          dispatch(setSelectedZoneAction(selectedZone));

          setOptType(["areas", type]);

          return;
        }
        setOptType(["fallback", ""]);
        dispatch(setSelectedZoneAction(null));
      }
    }

    window.addEventListener("message", handleChildAction, false);

    return () => {
      isTemplateSet.current = false;
      window.removeEventListener("message", handleChildAction);
    };
  }, [parentURL, zones, url, dispatch, templateId]);

  function parentAction(payload) {
    if(iframeInstance.current) {
      (iframeInstance.current as any).contentWindow.postMessage(payload, parentURL);
    }
  }

  function handleAction(act: string[]) {
    if(!act.length) {
      setOptType([]);
      return;
    }

    const [keyValue] = act;
    if(keyValue !== "areas") {
      setOptType([keyValue, ""]);
    }

    parentAction(keyValue);
  }

  return (
    <section
      style={{
        height: "100%",
        width: "100%",
        position: "relative"
      }}
    >
      <InterpreterHeader />

      <InterpreterTools
        onAction={handleAction}
        modalSelection={optType}
      />

      <iframe
        id="template-content"
        sandbox="allow-same-origin allow-scripts"
        name="naister_template"
        title="template"
        style={{
          width: "100%",
          height: "calc(100vh - 123px)",
          border: "none"
        }}
        srcDoc={templateDoc}
        ref={iframeInstance}
      />
    </section>
  );
}
