import { useState, useEffect } from "react"
import diaryService from "./services/diaryService"
import Diary from "./components/Diary"
import { NonSensitiveDiaryEntry } from "./types"
import EntryForm from './components/EntryForm'

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const diary = await diaryService.getAll();
      setEntries(diary);
    };
    fetchEntries();
  },[entries])

  return (
    <div>
      <EntryForm />
      <Diary entries={entries} />
    </div>
  )
}

export default App