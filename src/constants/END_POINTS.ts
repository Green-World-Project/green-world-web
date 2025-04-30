const baseUrl = "http://localhost:3000";

export const authUrls = {
  register: `${baseUrl}/register`,
  login: `${baseUrl}/login`,
  user: `${baseUrl}/user`,
  editUser: `${baseUrl}/user/edit`,
};

export const identify = `${baseUrl}/user/plant-identification`;

export const history = {
  get: `${baseUrl}/user/history`,
  delete: (id: string) => `${baseUrl}/user/history/${id}`,
};

export const pcs = {
  create: `${baseUrl}/user/plant-care`,
  get: `${baseUrl}/user/plant-care`,
  delete: (id: string) => `${baseUrl}/user/plant-care/${id}`,
};
