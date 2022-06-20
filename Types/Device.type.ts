import { QuantairaDataItem } from "./Core.type";
import { Room } from "./Room.type";

export interface Device extends QuantairaDataItem {
  id: string;
  name: string;
  ipAddress: string;
  macAddress: string;
  deviceType: string;
  port: string;
  gatewayId: string;
}
