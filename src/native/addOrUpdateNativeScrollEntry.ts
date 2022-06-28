import { parseRootMargin } from "../shared/unitParser";
import { ScrollEntry } from "./types";

export default function addOrUpdateNativeScrollEntry (
       index: number,
       scrollEntries: ScrollEntry[],
       entry: ScrollEntry) {
           
       let targetEntry = scrollEntries[index];
       if(!targetEntry) {
              scrollEntries[index] = entry;
       }
       else {
              targetEntry.fn = entry.fn;
              targetEntry.options = entry.options;
       }

}