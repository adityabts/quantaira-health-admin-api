import { QuantairaDataItem } from "./Core.type";
import { Floor } from "./Floor.type";

export interface Room extends QuantairaDataItem {
  number: number | string;
  floor?: Floor;
}
