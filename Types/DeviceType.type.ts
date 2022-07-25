import { QuantairaDataItem } from "./Core.type";

export interface DeviceType extends QuantairaDataItem {
  id: string;
  code: string;
  description: string;
}
