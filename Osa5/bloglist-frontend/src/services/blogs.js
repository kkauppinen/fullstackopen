import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.log('error in blog fetch', error);
    });
};

const create = (blog) => {
  return axios
    .post(baseUrl, blog, {
      headers: { Authorization: token },
    })
    .then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create };
