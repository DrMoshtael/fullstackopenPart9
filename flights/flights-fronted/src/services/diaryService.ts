import axios from 'axios';
const baseUrl = 'http://localhost:3000';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../types';

const getAll = async () => {
    const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}/api/diaries`);
    return data;
}

const postEntry = async (entry: NewDiaryEntry) => {
    const res = await axios.post<DiaryEntry>(`${baseUrl}/api/diaries`,entry);
    return res.data;
}

export default {
    getAll,
    postEntry
}