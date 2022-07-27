export const config = {
  server: "192.168.1.34",
  authentication: {
    type: "default",
    options: {
      userName: "quantdev", // update me
      password: "Qu@ntd3v1", // update me
    },
  },
  options: {
    database: "Quantaira_Device_LocalDB",
    encrypt: true,
    trustServerCertificate: true,
    rowCollectionOnRequestCompletion: true,
    connectTimeout: 3000,
    requestTimeout: 5000,
    port: 1433,
  },
};
