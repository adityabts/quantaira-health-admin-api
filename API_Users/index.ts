import createUser from "./function_createUser";
import editUser from "./function_editUser";
import listUser from "./function_listUsers";
import getUserDetails from "./function_getUserDetails";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { validateToken } from "../Utils/Authentication";
import { Respond } from "../Utils/HttpUtils";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const authObject = await validateToken(context, req.headers.authorization);
    req.headers.userId = authObject.userId;
    if (req.method == "GET") {
      if (req.params && req.params.userId !== undefined) {
        await getUserDetails(req, context);
      } else {
        await listUser(req, context);
      }
    } else if (req.method == "POST") {
      await createUser(req, context);
    } else if (req.method == "PATCH") {
      await editUser(req, context);
    }
  } catch {
    Respond(context)._401("Invalid token");
  }
};

export default httpTrigger;
