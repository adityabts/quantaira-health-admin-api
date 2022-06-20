import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import listBeds from "./function_listBeds";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  if (req.method == "GET") {
    await listBeds(req, context);
  }
};

export default httpTrigger;
