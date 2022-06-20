import { Device } from "../Types/Device.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const rows = await runProcedure(Procedure._LIST_DEVICES);
    const devices: Array<Device> = rows.map((row: any) => {
      const device: Device = {
        id: row.device_guid,
        name: row.device_name,
        ipAddress: row.Ipadd,
        macAddress: row.LocalMacid,
        deviceType: "",
        port: "",
        gatewayId: "",
      };
      return device;
    });
    Respond(context)._200({ devices });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
