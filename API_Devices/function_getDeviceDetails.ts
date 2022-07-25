import { Permission } from "../Types/Permission.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { TYPES } from "tedious";
import { Device } from "../Types/Device.type";
import { DeviceFirmware } from "../Types/DeviceFirmware.type";
import { DeviceModel } from "../Types/DeviceModel.type";
import { DeviceType } from "../Types/DeviceType.type";
import { Manufacturer } from "../Types/Manufacturer.type";

export default async (request, context) => {
  try {
    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];
    const deviceId = request.params.deviceId;

    console.log("Received Device Id", deviceId);

    parameters.push({ name: "device_id", value: deviceId, type: TYPES.UniqueIdentifier });

    const rows = await runProcedure(Procedure._GET_DEVICE, parameters);

    console.log("Device Row", rows);

    const devices: Array<Device> = rows.map((row: any) => {
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
    const device = devices[0];

    Respond(context)._200({ device });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
