import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.fgempreendimentos.com.br:2341/api/buildings',
  timeout: 10000,
});