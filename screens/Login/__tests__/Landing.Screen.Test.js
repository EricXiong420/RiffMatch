import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Landing from "../Landing";
import { NavigationContainer } from "@react-navigation/native";

describe("Testing landing page navigation", () => {
  test("landing page shows sign in and register buttons", async () => {
    const component = (
      <NavigationContainer>
        <Landing></Landing>
      </NavigationContainer>
    );
    render(component);

    const loginButton = await screen.findByText("Sign In");
    const registerButton = await screen.findByText("Register");

    expect(loginButton).toBeOnTheScreen();
    expect(registerButton).toBeOnTheScreen();
  });
});
