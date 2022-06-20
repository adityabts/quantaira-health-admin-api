/* eslint-disable no-prototype-builtins */
import httpTrigger from "./index";
import { Context } from "@azure/functions";
import { isJSON } from "../Utils/JsonUtils";

const validUsername = "tejasdadhe";
const validPassword = "password";

describe("Test for Demo Function", () => {
  let context: Context;

  beforeEach(() => {
    context = {
      log: (function () {
        const main = <any>jest.fn((message) => message);
        const error = jest.fn((message) => message);
        main.error = error;
        return main;
      })(),
    } as unknown as Context;
  });

  // it("Should should throw error", async () => {
  //   // Arrange
  //   const request = {
  //     query: {},
  //     body: {},
  //   };

  //   // Action

  //   // Assertion
  //   expect(async () => {
  //     await httpTrigger(context, request);
  //   }).toThrowError(TypeError);
  // });

  it("Should give an error on empty request body", async () => {
    // Arrange
    const request = {
      query: {},
      body: {},
    };

    // Action
    await httpTrigger(context, request);

    // Assertion
    expect(context.log.error).toBeCalledTimes(0);
    expect(context.res.status).toEqual(401);
    expect(context.res.body.response).toEqual(
      "The username or password is incorrect!"
    );
  });

  it("Should give an error on empty password", async () => {
    // Arrange
    const request = {
      query: {},
      body: { username: validUsername },
    };

    // Action
    await httpTrigger(context, request);

    // Assertion
    expect(context.log.error).toBeCalledTimes(0);
    expect(context.res.status).toEqual(401);
    expect(context.res.body.response).toEqual(
      "The username or password is incorrect!"
    );
  });

  it("Should give an error on empty username", async () => {
    // Arrange
    const request = {
      query: {},
      body: { password: validPassword },
    };

    // Action
    await httpTrigger(context, request);

    // Assertion
    expect(context.log.error).toBeCalledTimes(0);
    expect(context.res.status).toEqual(401);
    expect(context.res.body.response).toEqual(
      "The username or password is incorrect!"
    );
  });

  it("Should give a successful response on valid username and password", async () => {
    // Arrange
    const request = {
      query: {},
      body: { username: validUsername, password: validPassword },
    };

    // Action
    await httpTrigger(context, request);

    // Assertion
    expect(context.log.error).toBeCalledTimes(0);
    expect(context.res.status).toEqual(200);
    expect(isJSON(context.res.body)).toBe(true);
    expect(typeof context.res.body).toEqual("string");
    expect(JSON.parse(context.res.body).hasOwnProperty("user")).toBe(true);
    expect(JSON.parse(context.res.body).hasOwnProperty("token")).toBe(true);
  });
});
