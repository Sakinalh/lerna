import React from "react";
import { safeGetFallback } from "src/shared/utils";
import { format } from "date-fns";
import clsx from "clsx";
import { AppText } from "src/components/AppText/AppText.component";

interface ListCellDateProps<T> {
    datum: T;
    path: string[];
    overrideStyle?: Object;
}

export function ListCellDate<T>(props: ListCellDateProps<T>) {
  const { path, datum, overrideStyle = {} } = props;
  const _date = safeGetFallback(datum, "", ...path);

  const formattedDate = _date ? format(new Date(_date), "dd MMM yyyy p") : _date;

  return (
    <AppText text={formattedDate} props={{ classes: { root: clsx(overrideStyle) } }}/>
  );
}
