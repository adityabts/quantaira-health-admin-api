import { Context } from "@azure/functions";

export interface Response {
  _200: (response: string | object) => void;
  _404: (response: string) => void;
  _401: (response: string) => void;
}

export const Respond = (context: Context) => {
  return new Response(context);
};

export class Response {
  context: Context = undefined;
  constructor(context: Context) {
    this.context = context;
  }
  _200 = (response: string | object) => {
    this.context.res = {
      status: 200,
      body: typeof response === "object" ? JSON.stringify(response) : response,
      message: "Ok",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _201 = (response: string | object) => {
    this.context.res = {
      status: 201,
      body: typeof response === "object" ? JSON.stringify(response) : response,
      message: "Ok",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _204 = () => {
    this.context.res = {
      status: 204,
      message: "Ok",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _404 = (response: string) => {
    this.context.res = {
      status: 404,
      body: response,
      message: "Not found",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _401 = (response: string) => {
    this.context.res = {
      status: 401,
      body: {
        error: true,
        response,
        message: "Incorrect credentials",
      },
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _400 = (response: string) => {
    this.context.res = {
      status: 400,
      body: {
        error: true,
        response,
        message: "Bad Request",
      },
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    };
  };

  _500 = (response: string, errorMessage?: string) => {
    this.context.res = {
      status: 500,
      body: {
        error: true,
        response,
        message: errorMessage != undefined ? errorMessage : "Internal Server Error",
      },
    };
  };
}
