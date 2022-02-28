import * as React from "react";
import { BaseActionsModalProps } from "src/PageGeneration/model";
import * as TRANSLATE from "src/shared/translation/en.json";
import { UtmActionForm } from "./UtmActionForm/UtmActionForm.component";
import { ModalActions } from "../../shared/ModalActions/ModalActions.component";

interface UtmActionsProps extends BaseActionsModalProps {}

export function UtmActions(props: UtmActionsProps) {
  const { onClose } = props;

  return (
    <ModalActions title={TRANSLATE.modal.utmSettings} onClose={onClose}>
      <div><UtmActionForm onClose={onClose}/></div>
    </ModalActions>
  );
}
