import { TYPES } from "tedious";
import { Respond } from "../Utils/HttpUtils";
import { parseBody } from "../Utils/UserInput";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { generatePasswordHash } from "../Utils/Encryption";

export default async (request, context) => {
  try {
    const orgId = "69674F3B-7652-4CDC-9592-E127FFC5ADBF";
    const hospitalId = "19E254EC-D65D-43EF-91E0-FE66D5B36878";
    const authorId = "4AA38157-9B07-4102-846E-C2F04E6B6924";
    const password = "NewPassword@123";

    const params: { name; email; role; permissions; beds } = parseBody(request.body, ["name", "email", "role", "permissions", "beds"]);
    const { name, email, role, permissions, beds } = params;
    const permissions_csv = permissions.toString();
    const beds_csv = beds.toString();
    const passHash = await generatePasswordHash(password);

    const parameters: Array<{ name: string; value: string; type: TYPES }> = [];

    parameters.push({ name: "author_id", value: authorId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "user_name", value: name, type: TYPES.NVarChar });
    parameters.push({ name: "email", value: email, type: TYPES.NVarChar });
    parameters.push({ name: "password", value: passHash, type: TYPES.NVarChar });
    parameters.push({ name: "typeofuser", value: role, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "org_id", value: orgId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "hospital_id", value: hospitalId, type: TYPES.UniqueIdentifier });
    parameters.push({ name: "permission_id", value: permissions_csv, type: TYPES.NVarChar });
    parameters.push({ name: "bed_id", value: beds_csv, type: TYPES.NVarChar });

    const response = await runProcedure(Procedure._CREATE_USER, parameters);
    console.log("Response from Database", response);

    Respond(context)._201("User created successfully");
  } catch (error) {
    context.log.error("################### ERROR IN API_NEW_USER ################");
    const message = error.message;
    context.log.error("Error message from database: ", message);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem with this service execution", message);
  }
};
