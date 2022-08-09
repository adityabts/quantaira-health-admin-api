import { TYPES } from "tedious";
import { Respond } from "../Utils/HttpUtils";
import { parseBody } from "../Utils/UserInput";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";

export default async (request, context) => {
  try {
    const authorId = request.headers.userId;

    const params: {
      serialNumber;
      deviceName;
      fdaId;
      deviceTypeId;
      manufacturerId;
      modelNumber;
      firmwareId;
      gatewayId;
      configuration;
      ipAddress;
      macAddress;
    } = parseBody(request.body, [
      "serialNumber",
      "deviceName",
      "fdaId",
      "deviceTypeId",
      "manufacturerId",
      "modelNumber",
      "firmwareId",
      "gatewayId",
      "configuration",
      "ipAddress",
      "macAddress",
    ]);

    const {
      serialNumber,
      deviceName,
      fdaId,
      deviceTypeId,
      manufacturerId,
      modelNumber,
      firmwareId,
      gatewayId,
      configuration,
      ipAddress,
      macAddress,
    } = params;

    let configurationString;
    try {
      const configurationObject = JSON.parse(configuration);
      configurationObject.ipAddress = ipAddress;
      configurationObject.macAddress = macAddress;
      configurationString = JSON.stringify(configurationObject);
    } catch (e) {
      const message = "'configuration' is not a valid JSON";
      throw new Error(message);
    }

    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];

    parameters.push({ name: "device_serial_no", value: serialNumber, type: TYPES.NVarChar });
    parameters.push({ name: "device_name", value: deviceName, type: TYPES.NVarChar });
    parameters.push({ name: "fda_device_id", value: fdaId, type: TYPES.NVarChar });
    parameters.push({ name: "device_type_id", value: deviceTypeId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "manufacturer_id", value: manufacturerId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "model_no", value: modelNumber, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "firmware_id", value: firmwareId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "gateway_main_guid", value: gatewayId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "value", value: configurationString, type: TYPES.NVarChar });
    parameters.push({ name: "configuration_type_id", value: "1", type: TYPES.Int });

    context.log("### ADD AUTHOR ID TO SP ####");
    context.log("AUTHOR ID", authorId);
    context.log("### ADD AUTHOR ID TO SP ####");

    const response = await runProcedure(Procedure._CREATE_DEVICE, parameters);

    console.log("Response from Database", response);
    Respond(context)._201("Device created successfully");
  } catch (error) {
    const message = error.message;
    context.log.error("################### ERROR IN API_NEW_DEVICE ################");
    context.log.error("Error message from database: ", message);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem with this service execution", message);
  }
};
