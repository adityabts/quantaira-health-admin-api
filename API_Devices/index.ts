import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidToken } from "../Utils/UserInput";
import getDeviceDetails from "./function_getDeviceDetails";
import listDevices from "./function_listDevices";
import createDevice from "./function_createDevice";
import editDevice from "./function_editDevice";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    if (req.params && req.params.deviceId !== undefined) {
      await getDeviceDetails(req, context);
    } else {
      await listDevices(req, context);
    }
  } else if (req.method == "POST") {
    await createDevice(req, context);
  } else if (req.method == "PATCH") {
    await editDevice(req, context);
  }
};

export default httpTrigger;
