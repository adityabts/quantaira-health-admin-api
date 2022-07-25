import { Device } from "../Types/Device.type";
import { DeviceFirmware } from "../Types/DeviceFirmware.type";
import { DeviceModel } from "../Types/DeviceModel.type";
import { DeviceType } from "../Types/DeviceType.type";
import { Manufacturer } from "../Types/Manufacturer.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request, context) => {
  try {
    const rows = await runProcedure(Procedure._LIST_DEVICES);
    const devices: Array<Device> = rows.map((row: any) => {
      console.log("Row", row);
      const type: DeviceType = {
        id: row.deviceTypeId,
        code: row.deviceTypeCode,
        description: row.deviceTypeDescription,
      };
      const firmware: DeviceFirmware = {
        id: row.deviceFirmwareId,
        description: row.deviceFirmwareDescription,
        version: row.deviceFirmwareVersion,
        date: row.deviceFirmwareDate,
      };
      const manufacturer: Manufacturer = {
        id: row.deviceManufacturerId,
        name: row.deviceManufacturerName,
        code: row.deviceManufacturerCode,
        address1: row.devcieManufacturerAddress1,
        address2: row.devcieManufacturerAddress2,
      };
      const model: DeviceModel = {
        id: row.deviceModelId,
        code: row.deviceModelCode,
        name: row.deviceModelName,
        number: row.deviceModelNumber,
        color: row.deviceModelColor,
      };
      const device: Device = {
        id: row.deviceId,
        name: row.deviceName,
        gatewayId: "",
        configuration: row.deviceConfiguration,
        serialNumber: row.serialNumber,
        type,
        firmware,
        manufacturer,
        model,
      };
      return device;
    });
    Respond(context)._200({ devices });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
