const BASE_URL = 'http://localhost:8000';

const authLogin = async ({ body }: any) => {
  const response = await fetch(`${BASE_URL}/login`, {
    body: JSON.stringify(body),
    // ...
  });
  return response;
};

const authRegister = async ({ body }: any) => {
  const response = await fetch(`${BASE_URL}/register`, {
    body: JSON.stringify({ username: 'example' }),
    // ...
  });
  return response;
};

export { authLogin, authRegister };
