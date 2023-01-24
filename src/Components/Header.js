import PropTypes from 'prop-types'
import Button from './Button'
import GradesFilter from '../GradesFilter'

const Header = ({title, loadKanji}) => {

  return (
    <header className='header'>
      <h1>{title}</h1>
  
      <Button 
        color={'black'} 
        text={'Get New Kanji'} 
        onClick={loadKanji}
      />
    <GradesFilter />
    </header>
  )
}

Header.defaultProps = {
    title: 'Random Kanji',
  }
  
Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header