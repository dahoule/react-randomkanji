import { FaThumbtack } from 'react-icons/fa'

const KanjiDisplay = (props) => {
  //console.log(kanji)
  return (
    <div className='task'>

      <h1> {kanji.kanji}</h1>
      <h3>Grade: {kanji.grade}</h3>
      <h3>Kun Readings: {kanji.kun_readings ? kanji.kun_readings.join(', ') : ''}</h3>
      <h3>On Readings: {kanji.on_readings ? kanji.on_readings.join(', ') : ''}</h3>
      <h3>Meanings: {kanji.meanings ? kanji.meanings.join(', ') : ''}</h3>
      <FaThumbtack style={{color: 'blue', cursor: 'pointer'}} onClick={pinKanji} /> Pin to board  
    </div>
  )
}

export default KanjiDisplay

