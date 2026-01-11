import api from './axios';

const getToken = () => {
  // pegar do localStorage, Context ou Redux
  return localStorage.getItem('token');
};

export const MarcaService = {
  save: async (payload) => {
    const token = getToken();
    const response = await api.post('/marcas', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data.data };
  },

  update: async ({ id, ...payload }) => {
    const token = getToken();
    const response = await api.put(`/marcas/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data.data };
  },

  getAll: async () => {
    const token = getToken();
    const response = await api.get('/marcas', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data.data };
  },

  getById: async (id) => {
    const token = getToken();
    const response = await api.get(`/marcas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data: response.data.data };
  },

  delete: async (id) => {
    const token = getToken();
    const response = await api.delete(`/marcas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  },
};
