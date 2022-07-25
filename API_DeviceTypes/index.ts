import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidToken } from "../Utils/UserInput";
import listDeviceTypes from "./function_listDeviceTypes";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await listDeviceTypes(req, context);
  }
};

export default httpTrigger;
