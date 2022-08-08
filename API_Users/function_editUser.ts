import { uuid } from "uuidv4";
import { TYPES } from "tedious";
import { Respond } from "../Utils/HttpUtils";
import { parseBody } from "../Utils/UserInput";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure } from "../Utils/DatabaseConnection";

export default async (request, context) => {
  try {
    const orgId = "69674F3B-7652-4CDC-9592-E127FFC5ADBF";
    const hospitalId = "19E254EC-D65D-43EF-91E0-FE66D5B36878";
    const authorId = "4AA38157-9B07-4102-846E-C2F04E6B6924";
    const params: { userId; name; email; role; permissions; beds } = parseBody(request.body, [
      "userId",
      "name",
      "email",
      "role",
      "permissions",
      "beds",
    ]);
    const { userId, name, email, role, permissions, beds } = params;
    const permissions_csv = permissions.toString();
    const beds_csv = beds.toString();
    // const password = "NewPassword@1234";
    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];

    parameters.push({ name: "author_id", value: authorId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "user_id", value: userId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "user_name", value: name, type: TYPES.NVarChar });
    parameters.push({ name: "email", value: email, type: TYPES.NVarChar });
    parameters.push({ name: "typeofuser", value: role, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "org_id", value: orgId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "hospital_id", value: hospitalId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "permission_ids", value: permissions.length > 0 ? permissions_csv : null, type: TYPES.NVarChar });
    parameters.push({ name: "bed_ids", value: beds.length > 0 ? beds_csv : null, type: TYPES.NVarChar });

    const response = await runProcedure(Procedure._UPDATE_USER, parameters);
    console.log("Response from Database", response);

    Respond(context)._201("User updated successfully");
  } catch (error) {
    context.log.error("################### ERROR IN API_EDIT_USER ################");
    context.log.error(error);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem with this service execution", error.message);
  }
};
