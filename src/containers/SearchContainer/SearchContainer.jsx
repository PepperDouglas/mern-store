import { useState, useContext } from 'react';
import { StoreContext } from '../../contexts/ContextProvider';
import SearchComponent from '../../components/SearchComponent/SearchComponent';


const SearchContainer = () => {

    const [inputValue, setInputValue] = useState('');
    const { setSearchedValue } = useContext(StoreContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
    }

    const updateSearchedValue = () => {
        setSearchedValue(inputValue);

    }

    return(
        <>
            <SearchComponent value={inputValue} handleChange={handleChange} updateSearched={updateSearchedValue}></SearchComponent>
        </>
    );
}

export default SearchContainer;