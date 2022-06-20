import { Bed } from "../Types/Bed.type";
import { Procedure } from "../Types/Procedure.type";
import { runProcedure, runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";

export default async (request, context) => {
  try {
    const rows = await runProcedure(Procedure._LIST_BEDS);
    const beds: Array<Bed> = rows.map((row: any) => {
      const bed: Bed = {
        id: row.bed_guid,
        number: row.bed_number,
      };
      return bed;
    });
    Respond(context)._200({ beds });
  } catch (error) {
    context.log.error("################ ERROR IN API [GET] > Beds ##############");
    context.log.error(error);
    context.log.error("##########################################################");
    Respond(context)._500("There was a problem while serving your request. PLease try again after sometime!");
  }
};
