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
        configuration: JSON.parse(row.deviceConfiguration),
        serialNumber: row.serialNumber,
        type,
        firmware,
        manufacturer,
        model,
        fdaDeviceId: row.fdaDeviceId,
      };
      return device;
    });
    Respond(context)._200({ devices });
  } catch (error) {
    context.log.error("################### ERROR IN API_LIST_DEVICE ################");
    const message = error.message;
    context.log.error("Error message: ", message);
    context.log.error("##########################################################");
    Respond(context)._500(error.message);
  }
};
