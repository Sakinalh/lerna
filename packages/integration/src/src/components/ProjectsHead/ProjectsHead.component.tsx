import * as React from "react";
import { AppBarLogo } from "src/components/AppTopBar/AppBarLogo/AppBarLogo.component";

export interface ProjectsHeadProps {
    customclass?: any;
}

export function ProjectsHead(props: ProjectsHeadProps): JSX.Element {
  return (
    <div className={props.customclass}>
      <AppBarLogo/>
    </div>
  );
}
