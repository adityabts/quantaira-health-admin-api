import { QuantairaDataItem } from "./Core.type";
import { DeviceFirmware } from "./DeviceFirmware.type";
import { DeviceModel } from "./DeviceModel.type";
import { DeviceType } from "./DeviceType.type";
import { Manufacturer } from "./Manufacturer.type";
import { Room } from "./Room.type";

export interface Device extends QuantairaDataItem {
  id: string;
  name: string;
  type: DeviceType;
  gatewayId: string;
  configuration: string;
  firmware: DeviceFirmware;
  manufacturer: Manufacturer;
  serialNumber: string;
  model: DeviceModel;
}
