import { Building } from "./Building.type";
import { QuantairaDataItem } from "./Core.type";

export interface Floor extends QuantairaDataItem {
  name: string;
  building?: Building;
}
