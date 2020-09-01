import React from "react";
import nock from "nock";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act,
  waitForDomChange,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "./index";

nock("https://api.github.com").persist().get("/users/gab618").reply(
  200,
  {
    login: "gab618",
    name: "Gabriel",
  },
  { "Access-Control-Allow-Origin": "*" }
);

afterEach(function () {
  nock.cleanAll();
  cleanup();
});

it("should be in screen an initial message and an input with placeholder", async () => {
  const container = render(<Todo />);

  const msgInitial = await waitForElement(() =>
    container.getByText("Pesquise por algum usuário GitHub")
  );

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton"),
  ]);
});

it("should submit username and show user data", async () => {
  const container = render(<Todo />);

  const [inputNomeUsuario, searchButton] = await waitForElement(() => [
    container.getByPlaceholderText("nome do usuário no github"),
    container.getByTestId("searchButton"),
  ]);

  act(() => {
    fireEvent.input(inputNomeUsuario, {
      target: { value: "gab618" },
    });

    fireEvent.click(searchButton);
  });

  waitForDomChange(container).then(() => {
    const userData = container.getByTestId("userData");
    expect(userData.innerHTML).toEqual("gab618 - Gabriel");
  });
});
