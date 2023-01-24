import './GradesFilter.css';

const GradesFilter = (props) => {
    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value)
    }

    return (
        <div className='grades-filter'>
            <div className='grades-filter__control'>
            <label>from Grade</label>
            <select onChange={dropdownChangeHandler}>
                <option value='random'>random</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='8'>8</option>
            </select>
            </div>
        </div>
        );
    };

export default GradesFilter;