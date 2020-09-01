import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Todo() {
  const [data, setData] = useState();
  const [usuario, setUsuario] = useState("");

  const SearchBar = () => {
    function handleSubmit({ usuario }) {
      Promise.resolve(fetch(`https://api.github.com/users/${usuario}`)).then(
        async (response) => {
          const userResponse = response;
          console.log(userResponse);

          if (userResponse.status === 404) {
            setData({ error: "User not found!" });
            return;
          }

          const user = await userResponse.json();

          setData({
            user,
          });
        }
      );
    }

    const initialValues = { usuario: "" };

    return (
      <div>
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          <Form>
            <div>
              <Field
                name="usuario"
                data-testid="inputNomeUsuario"
                type="text"
                placeholder="nome do usuário no github"
              />
              <Field
                data-testid="searchButton"
                type="submit"
                value="pesquisar"
              />
            </div>
            <div>
              <ErrorMessage component="span" name="usuario" />
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  const Profile = () => {
    return (
      <h2 data-testid="messageInitial">Pesquise por algum usuário GitHub</h2>
    );
  };

  return (
    <>
      <Profile />
      <SearchBar />
      <h1 data-testid="userData">
        {data && data.user.login} - {data && data.user.name}
      </h1>
    </>
  );
}

export default Todo;
