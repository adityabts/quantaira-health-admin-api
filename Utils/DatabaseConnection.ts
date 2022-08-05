import { Connection, Request, TYPES } from "tedious";
import { Procedure } from "../Types/Procedure.type";

const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
    trustServerCertificate: true,
    rowCollectionOnRequestCompletion: true,
    connectTimeout: 3000,
    requestTimeout: 5000,
    port: 1433,
  },
};

export const generateConnection = async () => {
  return new Promise((resolve, reject) => {
    const dbInstance = new Connection(config);
    dbInstance.connect((error) => {
      if (error) {
        console.log("Connection Failed!", error);
        reject({
          error: true,
          data: error,
          message: "Database connection error",
        });
      } else {
        resolve(dbInstance);
      }
    });
  });
};

export const runProcedure = async (procedure: Procedure, parameters?: Array<{ name: string; value: string; type: TYPES }>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    generateConnection()
      .then((connection: Connection) => {
        const request = new Request(procedure, function (error: Error, rowCount: number, rows: Array<unknown>) {
          if (error) {
            console.error(error);
            reject(
              new Error(
                // "There was a problem while serving your request. Please try again after sometime!"
                error.message
              )
            );
          } else {
            resolve(
              rows.map((item: Array<any>) => {
                return item.reduce((column, item) => {
                  const name = item.metadata.colName;
                  const value = item.value;
                  const newColumn = { ...column };
                  newColumn[name] = value;
                  return newColumn;
                }, {});
              })
            );
          }
        });

        for (const i in parameters) {
          const item = parameters[i];
          request.addParameter(item.name, item.type, item.value);
        }
        connection.callProcedure(request);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const runQuery = async (query: string, parameters?: Array<{ name: string; value: string; type: TYPES }>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    generateConnection()
      .then((connection: Connection) => {
        const request = new Request(query, function (error: Error, rowCount: number, rows: Array<unknown>) {
          if (error) {
            console.error(error);
            reject(new Error("There was a problem while serving your request. Please try again after sometime!"));
          } else {
            resolve(
              rows.map((item: Array<any>) => {
                return item.reduce((column, item) => {
                  const name = item.metadata.colName;
                  const value = item.value;
                  const newColumn = { ...column };
                  newColumn[name] = value;
                  return newColumn;
                }, {});
              })
            );
          }
        });

        for (const i in parameters) {
          const item = parameters[i];
          request.addParameter(item.name, item.type, item.value);
        }
        connection.execSql(request);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
