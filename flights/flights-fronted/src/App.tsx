import { useState, useEffect } from "react"
import diaryService from "./services/diaryService"
import Diary from "./components/Diary"
import { NonSensitiveDiaryEntry } from "./types"
import EntryForm from './components/EntryForm'
import Notify from "./components/Notify"

const App = () => {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([])
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fetchEntries = async () => {
      const diary = await diaryService.getAll();
      setEntries(diary);
    };
    fetchEntries();
  },[entries])

  return (
    <div>
      <Notify notification={notification} />
      <EntryForm setNotification={setNotification}/>
      <Diary entries={entries} />
    </div>
  )
}

export default App