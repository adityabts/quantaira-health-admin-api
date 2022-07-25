import { QuantairaDataItem } from "./Core.type";

export interface DeviceFirmware extends QuantairaDataItem {
  id: string;
  description: string;
  version: string;
  date: Date;
}
