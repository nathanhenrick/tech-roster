import api from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthResponse>("/login", payload);
  return { data: response.data, token: response.data.token };
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post<AuthResponse>("/registrar", payload);
  return { data: response.data };
};

export const logout = async () => {
  return api.post("/logout");
};
