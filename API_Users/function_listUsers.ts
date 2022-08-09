import { Context } from "@azure/functions";
import { User } from "../Types/User.type";
import { runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { rowsToJson } from "../Utils/JsonUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request: any, context: Context) => {
  try {
    const response = await runQuery(Queries.listUsers);
    context.log("User Response", response);
    const users: User = rowsToJson(response);
    context.log("Users", users);
    Respond(context)._200(users);
  } catch (e) {
    const message = e.message;
    context.log.error("################### ERROR IN API_LIST_USERS ################");
    context.log.error("Error message from database: ", message);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem while serving your request. PLease try again after sometime!");
  }
};
