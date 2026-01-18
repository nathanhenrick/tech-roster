import api from "./axios";

interface DevelopersData {
  nome: string;
  nivel_id: number;
  sexo: string;
  data_nascimento: string;
  hobby: string;
}

export const save = async (payload: DevelopersData) => {
  const response = await api.post("/desenvolvedores", payload);
  return response.data;
};

export const update = async (id: number, payload: DevelopersData) => {
  const response = await api.put(`/desenvolvedores/${id}`, payload);
  return response.data;
};

export const getAll = async (page?: number) => {
  const response = await api.get(`/desenvolvedores?page=${page}`);
  return { data: response.data.data, meta: response.data.meta };
};

export const getAllPaginations = async (per_page?: number) => {
  const response = await api.get(`/desenvolvedores?per_page=${per_page}`);
  return { data: response.data.data, meta: response.data.meta };
};

export const getById = async (id: number) => {
  const response = await api.put(`/desenvolvedores/${id}`);
  return response.data;
};

export const remove = async (id: number) => {
  const response = await api.delete(`/desenvolvedores/${id}`);
  return response.data;
};
