import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { USER_POST } from "../../Hooks/api";
import UseFetch from "../../Hooks/UseFetch";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();
  const navigate = useNavigate();

  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = UseFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
      navigate("/login");
    }
  }
  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          autoComplete="on"
          {...username}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="on"
          {...email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="on"
          {...password}
        />

        {loading ? (
          <Button disabled> Cadastrando...</Button>
        ) : (
          <Button> Criar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
