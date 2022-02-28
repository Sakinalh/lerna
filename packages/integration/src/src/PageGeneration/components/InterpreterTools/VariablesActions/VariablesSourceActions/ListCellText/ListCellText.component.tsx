import React from "react";
import { safeGetFallback } from "src/shared/utils";
import clsx from "clsx";
import { AppText } from "../../../../../../components/AppText/AppText.component";

interface ListCellTextProps<T> {
    datum: T;
    path: string[];
    type?: string;
    overrideStyle?: Object;

}

export function ListCellText<T>(props: ListCellTextProps<T>) {
  const { path, datum, overrideStyle = {} } = props;

  const viewValue = safeGetFallback(datum, "", ...path);
  return (
    <AppText text={viewValue} props={{ classes: { root: clsx(overrideStyle) } }}/>
  );
}
