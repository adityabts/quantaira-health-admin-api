import { Procedure } from "../Types/Procedure.type";
import { User } from "../Types/User.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { TYPES } from "tedious";
import { Role } from "../Types/Role.type";

export default async (request, context) => {
  try {
    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];
    const userId = request.params.userId;

    parameters.push({ name: "user_id", value: userId, type: TYPES.UniqueIdentifier });

    const rows = await runProcedure(Procedure._GET_USER, parameters);

    const users: Array<User> = rows.map((row: any) => {
      context.log("DB_USERS", rows);
      const role: Role = {
        id: row.typeofuser,
        name: row.role_name,
      };
      const user: User = {
        id: row.user_guid,
        name: row.name,
        email: row.email,
        role,
        permissions: row.permission_ids != null ? row.permission_ids.split(",") : [],
        beds: row.bed_ids != null ? row.bed_ids.split(",") : [],
        isActive: row.isactive,
        createdBy: { id: row.createdby, timeStamp: row.createddate },
        modifiedBy: { id: row.modifiedby, timeStamp: row.modifieddate },
      };
      return user;
    });
    const user = users[0];

    Respond(context)._200({ user });
  } catch (e) {
    const message = e.message;
    context.log.error("################### ERROR IN API_USER_DETAILS ################");
    context.log.error("Error message from database: ", message);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem while serving your request. PLease try again after sometime!");
  }
};
