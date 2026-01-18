import api from "./axios";

export interface LevelPayload {
  nivel: string;
  description?: string;
}

export interface Level {
  id: number;
  nivel: string;
  description?: string;
  developer_count: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

export const save = async (payload: LevelPayload) => {
  const response = await api.post("/niveis", payload);
  return response.data;
};

export const update = async (id: number, payload: LevelPayload) => {
  const response = await api.put(`/niveis/${id}`, payload);
  return response.data;
};

export const getAll = async (page?:number): Promise<PaginatedResponse<Level>> => {
  const response = await api.get(`/niveis?page=${page}`);
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getAllPaginations = async (per_page?:number): Promise<PaginatedResponse<Level>> => {
  const response = await api.get(`/niveis?per_page=${per_page}`);
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export const getById = async (id: number) => {
  const response = await api.put(`/niveis/${id}`);
  return response.data;
};

export const remove = async (id: number): Promise<void> => {
  const response = await api.delete(`/niveis/${id}`);
  return response.data;
};
