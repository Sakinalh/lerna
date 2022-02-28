import * as LocalizedFormat from "dayjs/plugin/localizedFormat";
import * as dayjs from "dayjs";
import DayJsUtils from "@date-io/dayjs";

dayjs.extend(LocalizedFormat);

class LocalizedUtils extends DayJsUtils {
  // getDatePickerHeaderText(date) {
  //   return '';
  // }
}

export default LocalizedUtils;