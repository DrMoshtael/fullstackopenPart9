import { useState, useEffect } from "react"
import diaryService from "./services/diaryService"
import Diary from "./components/Diary"
import { NonSensitiveDiaryEntry } from "./types"

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await diaryService.getAll();
      setEntries(entries);
    };
    fetchEntries();
  },[])

  return (
    <div>
      <Diary entries={entries} />
    </div>
  )
}

export default App