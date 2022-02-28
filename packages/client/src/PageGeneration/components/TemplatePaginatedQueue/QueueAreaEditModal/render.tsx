import { ZoneDataType } from "src/PageGeneration/model";
import { QueueZoneProductEdit } from "./QueueZoneProductEdit/QueueZoneProductEdit.component";
import { QueueZoneTextEdit } from "./QueueZoneTextEdit/QueueZoneTextEdit.component";
import { QueueZoneImgEdit } from "./QueueZoneImgtEdit/QueueZoneImgtEdit.component";
import { AppText } from "../../../../components/AppText/AppText.component";

// in a separate file to avoid circular deps
/**
 * the zone to edit could be either text/url (image) But could be root element or a child (subzone)
 * Zone "simple"
 *      text A
 * or Zone "complex"
 *          sub_zone:->  zone text A
 *
 * parentZoneId is a workaround to know if handling a root element or not
 * on complex data type, the form display text && img el
 *
 * @param ids
 * @param zoneData
 * @param onClose
 * @param keywordId
 */
export function renderModalContent(
  ids: {
                                       rowId: number,
                                       pageId: string;
                                       zoneId: string;
                                       parentZoneId: string | null;
                                   },
  zoneData: ZoneDataType,
  onClose: (e ?: any) => void,
  keywordId: number
) {
  const { parentZoneId, ...rest } = ids;

  if(typeof parentZoneId === "string") {
    return <QueueZoneProductEdit ids={{
      ...rest,
      zoneId: parentZoneId as string
    }}
    onClose={onClose}
    keywordId={keywordId}
    />;
  }
  if(zoneData === "text") {
    return <QueueZoneTextEdit ids={rest}
      onClose={onClose}
      keywordId={keywordId}
    />;
  }
  if(zoneData === "image") {
    return <QueueZoneImgEdit ids={rest}
      onClose={onClose}
      keywordId={keywordId}
    />;
  }
  console.warn(zoneData, " is not a handled zone data type");

  return <AppText themeColor="dangerColor" text="failed to display area"/>;
}
