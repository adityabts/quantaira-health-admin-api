import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Respond } from "../Utils/HttpUtils";
import { isValidToken } from "../Utils/UserInput";
import getchAnalyticsDetails from "./function_fetchAnalyticsDetails";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await getchAnalyticsDetails(req, context);
  }
};

export default httpTrigger;
