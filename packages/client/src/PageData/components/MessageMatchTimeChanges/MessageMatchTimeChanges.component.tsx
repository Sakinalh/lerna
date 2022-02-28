import { Fragment } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "src/deps";
import clsx from "clsx";
import { AppText } from "../../../components/AppText/AppText.component";
import { TimelineItemView } from "../../../model";
import {useStyles} from "./MessageMatchTimeChanges.style";
interface MessageMatchTimeChangesProps {
    modifications: TimelineItemView[];
}

export function MessageMatchTimeChanges({ modifications }: MessageMatchTimeChangesProps) {
  const classes = useStyles();

  return (
    <Fragment>
      {
        modifications.map(mod => (<div className={clsx(classes.root, "messageMatchchanges")}>
          <Accordion classes={{ root: "accordion" }}
              key={`${mod.formattedDate}__block`}>
            <AccordionSummary
                aria-controls="time-changes"
                id={`${mod.formattedDate}__summary`}
              >
              <AppText themeColor="actionColor"
                  text={`show change log on ${mod.formattedDate}`}/>

              <span className="accordion__triangle"></span>

            </AccordionSummary>
            <AccordionDetails>
              <ul className="list">

                {
                    mod.changes.map((chg, index) => (
                      <li key={`${chg.value}__chg__${index}`}>

                        <div className={"list__nameRow"}>
                          <span className={"list__point"} />
                          <AppText bold="bold"
                              text={chg.name}
                              props={{
                                variant: "h3",
                                classes: { root: "list__name" }
                              }}/>

                        </div>
                        <AppText text={chg.value} props={{ classes: { root: "list__value" } }}/>
                      </li>
                    ))
                  }
              </ul>
            </AccordionDetails>

          </Accordion>
        </div>
        ))
      }

    </Fragment>

  );
}
