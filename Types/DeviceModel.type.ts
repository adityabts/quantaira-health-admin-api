import { QuantairaDataItem } from "./Core.type";

export interface DeviceModel extends QuantairaDataItem {
  id: string;
  code: string;
  name: string;
  number: string;
  color: string;
}
