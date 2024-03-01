import axios from 'axios';
const baseUrl = 'http://localhost:3000';
import { NonSensitiveDiaryEntry } from '../types';

const getAll = async () => {
    const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}/api/diaries`);
    return data;
}

export default {
    getAll
}