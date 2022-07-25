import { DeviceFirmware } from "../Types/DeviceFirmware.type";
import { runQuery } from "../Utils/DatabaseConnection";

import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request, context) => {
  try {
    const rows = await runQuery(Queries.listDeviceFirmware);
    const deviceFirmwares: Array<DeviceFirmware> = rows.map((row: any) => {
      const deviceFirmware: DeviceFirmware = {
        id: row.device_firmware_guid,
        description: row.description,
        version: row.version,
        date: new Date(row.version_update_date),
      };
      return deviceFirmware;
    });
    Respond(context)._200({ deviceFirmwares });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
