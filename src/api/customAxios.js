import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const FRUITS = '/fruits';

export const customAxios = axios.create({
	baseURL,
});
