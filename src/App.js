import { useState, useEffect } from "react"
//import KanjiDisplay from "./Components/KanjiDisplay"
import { FaThumbtack, FaTimes } from 'react-icons/fa'
import GradesFilter from "./GradesFilter"
import SavedKanji from "./SavedKanji"

const App = (props) => {
  const [data2, setKanji] = useState([])
  const [currentKanji, setCurrentKanji] = useState(data2)
  const [savedKanji, setSavedKanji] = useState([])
  const [grade, setGrade] = useState('random')

  useEffect(() => {
    loadKanji()
  }, [])

  const loadKanji = () => {
    getKanji(grade)
  }

  const getKanji = async () => {
    const kanjiFromServer = await fetchRandomKanji(grade)
    setCurrentKanji(kanjiFromServer)    
    setKanji(kanjiFromServer)

  }

  // Fetch Random (or Specified level) Kanji
  const fetchRandomKanji = async (grade) => {
    var levelNumber = (Math.floor(Math.random() * 8) + 1)
    levelNumber = levelNumber === 7 ? 8 : levelNumber; // there is no level 7
    if (grade && grade !== 'random') {
      levelNumber = grade
    } else {
      levelNumber = levelNumber
    }
    const res = await fetch(`https://kanjiapi.dev/v1/kanji/grade-${levelNumber}`)
    const data = await res.json()
    const randomNumber = Math.floor(Math.random() * data.length)
    var firstKanji = data[randomNumber]
    const res2 = await fetch(`https://kanjiapi.dev/v1/kanji/${firstKanji}`)
    const data2 = await res2.json()

    return data2
    
  }

  const pinKanjiHandler = () => {
    if (savedKanji.length < 3) {
      setSavedKanji([...savedKanji, currentKanji]);
    }
    
  }

  const deleteSavedKanjiHandler = (id) => {
    setSavedKanji(savedKanji.filter((savedKanji) => savedKanji.kanji != id))
  }


  
  // handle the grade filter change
  const filterChangeHander = selectedGrade => {
    setGrade(selectedGrade);
  }

  return (
    <div className="container">
      <h1>Random Kanji</h1>
      <div className="flex-container">
        <button className="btn" onClick={loadKanji}>Load New Kanji</button>
        <GradesFilter onChangeFilter={filterChangeHander}/>
      </div>
      <div className='kanji'>
        <h1> {data2.kanji}</h1>
        <h3>Grade: {data2.grade}</h3>
        <h3>Kun Readings: {data2.kun_readings ? data2.kun_readings.join(', ') : ''}</h3>
        <h3>On Readings: {data2.on_readings ? data2.on_readings.join(', ') : ''}</h3>
        <h3>Definitions: {data2.meanings ? data2.meanings.join(', ') : ''}</h3>
        {savedKanji.length < 3 && (
        <div className="thumbtack">
            <FaThumbtack 
              style={{color: 'blue', cursor: 'pointer'}} 
              onClick={() =>pinKanjiHandler(data2.kanji)} /> Pin to board
        </div>
        )}
           
      </div>      

        <SavedKanji />
        {savedKanji.map(savedKanji1 => (
          <div className="saved-kanji-entry">
            <div key="{savedKanji1.kanji}"><h3>{savedKanji1.kanji}<FaTimes 
                style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => deleteSavedKanjiHandler(savedKanji1.kanji)} /></h3>
              <div>Kun: {savedKanji1.kun_readings.join(', ')} On: {savedKanji1.on_readings.join(', ')}</div>
              <div>{savedKanji1.meanings.join(', ')}</div>
              
            </div>
          </div>
        ))}

    </div>
  );
}



export default App;
