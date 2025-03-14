const baseUrl = "http://localhost:3000";

export const authUrls = {
  register: `${baseUrl}/register`,
  login: `${baseUrl}/login`,
  user: `${baseUrl}/user`,
};

export const identify = `${baseUrl}/user/plant-identification`;

export const pcs = {
  create: `${baseUrl}/user/pcs`,
  get: `${baseUrl}/user/pcs`,
};
