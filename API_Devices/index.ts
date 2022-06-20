import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidToken } from "../Utils/UserInput";
import listDevices from "./function_listDevices";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await listDevices(req, context);
  }
};

export default httpTrigger;
