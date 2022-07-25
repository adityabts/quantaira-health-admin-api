import { Procedure } from "../Types/Procedure.type";
import { User } from "../Types/User.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { TYPES } from "tedious";

export default async (request, context) => {
  try {
    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];
    const userId = request.params.userId;

    parameters.push({ name: "user_id", value: userId, type: TYPES.UniqueIdentifier });

    const rows = await runProcedure(Procedure._GET_USER, parameters);

    const users: Array<User> = rows.map((row: any) => {
      const user: User = {
        id: row.user_guid,
        name: row.name,
        email: row.email,
        role: row.typeofuser,
        permissions: row.permission_ids.split(","),
        beds: row.bed_ids.split(","),
        isActive: row.isactive,
        createdBy: { id: row.createdby, timeStamp: row.createddate },
        modifiedBy: { id: row.modifiedby, timeStamp: row.modifieddate },
      };
      return user;
    });
    const user = users[0];

    Respond(context)._200({ user });
  } catch (e) {
    Respond(context)._500("There was a problem while serving your request. PLease try again after sometime!");
  }
};
