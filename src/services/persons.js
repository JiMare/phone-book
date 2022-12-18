import axios from "axios";
const baseUrl = "/api/persons";

export const getPersons = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const savePerson = async (person) => {
  const request = axios.post(baseUrl, person);
  return request.then((response) => response.data);
};

export const deletePerson = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export const updatePerson = async (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request.then((response) => response.data);
};
