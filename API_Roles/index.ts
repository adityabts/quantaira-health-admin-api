import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import listRoles from "./function_listRoles";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await listRoles(req, context);
  }
};

export default httpTrigger;
