import createUser from "./function_createUser";
import editUser from "./function_editUser";
import listUser from "./function_listUsers";
import getUserDetails from "./function_getUserDetails";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
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
};

export default httpTrigger;
