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
  get: `${baseUrl}/user/plant-care`,
  create: `${baseUrl}/user/plant-care`,
  delete: (id: string) => `${baseUrl}/user/plant-care/${id}`,
  getPlantsOptions: `${baseUrl}/api/plants/options`,
};
