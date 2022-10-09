import axios from "axios";

const baseUrl = "/api/persons";

export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((res) => res.data);
};

export const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export const update = (contact) => {
  return axios.put(`${baseUrl}/${contact.id}`, contact).then((res) => res.data);
}
