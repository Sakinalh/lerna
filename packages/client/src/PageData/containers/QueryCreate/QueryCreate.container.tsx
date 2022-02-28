import { StoreState } from "src/model";
import { useDispatch, useSelector } from "react-redux";
import { QueryItemForm } from "src/PageData/components/QueryItemForm/QueryItemForm.component";
import { useEffect } from "react";
import { clearQuerySharedStateAction } from "../../store/queryEpic$";

interface QueryCreatePageProps {

}

export default function QueryCreatePage(_props: QueryCreatePageProps) {
  const datum = useSelector((state: StoreState) => state.analyticsQuery.detail);
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(clearQuerySharedStateAction());
  }, [dispatch]);

  return (
    <QueryItemForm datum={datum}/>
  );
}
