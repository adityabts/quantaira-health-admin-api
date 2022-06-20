import { QuantairaDataItem } from "./Core.type";
import { Room } from "./Room.type";

export interface Bed extends QuantairaDataItem {
  id: string;
  room?: Room;
  number: string | number;
}
