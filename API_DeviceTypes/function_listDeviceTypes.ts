import { Device } from "../Types/Device.type";
import { DeviceType } from "../Types/DeviceType.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request, context) => {
  try {
    const rows = await runQuery(Queries.listDeviceTypes);
    const deviceTypes: Array<DeviceType> = rows.map((row: any) => {
      const device: DeviceType = {
        id: row.device_type_guid,
        code: row.device_type_Code,
        description: row.device_description,
      };
      return device;
    });
    Respond(context)._200({ deviceTypes });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
