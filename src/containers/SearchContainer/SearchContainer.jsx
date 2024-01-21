import { useState, useContext } from 'react';
import { StoreContext } from '../../contexts/ContextProvider';
import SearchComponent from '../../components/SearchComponent/SearchComponent';


const SearchContainer = () => {

    const [inputValue, setInputValue] = useState('');
    const { searchedValue, setSearchedValue } = useContext(StoreContext);

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue(value);
        //alert(searchValue);
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