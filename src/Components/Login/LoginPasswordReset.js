import React from "react";
import { useState, useEffect } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/UseFetch";
import { PASSWORD_RESET } from "../../Hooks/api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router";
import Head from "../Helper/Head";

function LoginPasswordReset() {
  const [key, setKey] = useState("");
  const [login, setLogin] = useState("");
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(key);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
}

export default LoginPasswordReset;
