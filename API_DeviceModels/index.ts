import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidToken } from "../Utils/UserInput";
import listDeviceModels from "./function_listDeviceModels";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await listDeviceModels(req, context);
  }
};

export default httpTrigger;
