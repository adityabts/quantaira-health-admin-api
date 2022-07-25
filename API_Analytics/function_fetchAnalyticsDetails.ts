import { runQuery } from "../Utils/DatabaseConnection";
import { Respond } from "../Utils/HttpUtils";
import { Queries } from "../Utils/TempQueries";

export default async (request, context) => {
  try {
    const rows = await runQuery(Queries.analyticsCounts);
    const analytics = {
      devices: rows[0].devicesCount,
      users: rows[0].usersCount,
      patients: rows[0].patientsCount,
      medications: rows[0].medicationsCount,
    };
    Respond(context)._200({ analytics });
  } catch (e) {
    Respond(context)._500(e.message);
  }
};
