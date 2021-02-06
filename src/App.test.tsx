import React from "react";
import { mount } from "enzyme";
import App from "./App";

test("App mounts", () => {
  expect(() => {
    mount(<App />);
  }).not.toThrow();
});
