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

nock("https://api.github.com")
  .get("/users/gab618")
  .delay(2000)
  .reply(200, {
    login: "jvvoliveira",
    name: "Gabriel",
    avatar_url: "https://avatars2.githubusercontent.com/u/24815192?v=4",
    location: "São Paulo - Brazil",
    bio: "prendendo a desenvolver coisas legais com javascript :D",
    public_repos: 41,
    followers: 7,
    created_at: "2016-12-28T19:27:11Z",
  })
  .get("/users/gab618/repos?per_page=8&page=1")
  .delay(2000)
  .reply(500, {
    message: "error",
    status: 500,
  });

afterEach(function () {
  nock.cleanAll();
  cleanup();
});

const container = render(<Todo />);

const msgInitial = await waitForElement(() =>
  container.getByText("Pesquise por algum usuário GitHub")
);

const [inputNomeUsuario, searchButton] = await waitForElement(() => [
  container.getByPlaceholderText("nome do usuário no github"),
  container.getByTestId("searchButton"),
]);
