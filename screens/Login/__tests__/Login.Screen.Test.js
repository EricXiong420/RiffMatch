import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import LoginPortal from "../LoginPortal";

describe("Testing login page inputs", () => {
  test("login button disabled when email / password not filled", async () => {
    const component = (
      <NavigationContainer>
        <LoginPortal></LoginPortal>
      </NavigationContainer>
    );

    const { getByTestId } = render(component);
    const loginButton = getByTestId("loginButton");

    expect(loginButton).toBeDisabled();
  });

  test("login button disabled when email not filled", async () => {
    const component = (
      <NavigationContainer>
        <LoginPortal></LoginPortal>
      </NavigationContainer>
    );

    const { getByTestId } = render(component);
    const loginButton = getByTestId("loginButton");
    const emailInput = getByTestId("loginEmailInput");
    fireEvent.changeText(emailInput, "123@gmail.com");

    expect(loginButton).toBeDisabled();
  });

  test("login button disabled when password not filled", async () => {
    const component = (
      <NavigationContainer>
        <LoginPortal></LoginPortal>
      </NavigationContainer>
    );

    const { getByTestId } = render(component);
    const loginButton = getByTestId("loginButton");
    const passwordInput = getByTestId("loginPasswordInput");
    fireEvent.changeText(passwordInput, "password");

    expect(loginButton).toBeDisabled();
  });

  test("login button works when both email / password filled", async () => {
    const component = (
      <NavigationContainer>
        <LoginPortal></LoginPortal>
      </NavigationContainer>
    );

    const { getByTestId } = render(component);
    const loginButton = getByTestId("loginButton");
    const passwordInput = getByTestId("loginPasswordInput");
    fireEvent.changeText(passwordInput, "password");
    const emailInput = getByTestId("loginEmailInput");
    fireEvent.changeText(emailInput, "123@gmail.com");

    expect(loginButton).not.toBeDisabled();
  });

});
