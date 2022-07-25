import { Device } from "../Types/Device.type";
import { DeviceModel } from "../Types/DeviceModel.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request, context) => {
  try {
    const rows = await runQuery(Queries.listDeviceModels);
    const deviceModels: Array<DeviceModel> = rows.map((row: any) => {
      const deviceModel: DeviceModel = {
        id: row.device_model_guid,
        code: row.model_code,
        name: row.model_name,
        number: row.model_number,
        color: row.model_color,
      };
      return deviceModel;
    });
    Respond(context)._200({ deviceModels });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
