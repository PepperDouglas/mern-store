

const SearchComponent = ({value, handleChange, updateSearched}) => {


    return(
        <>
            <input value={value} onChange={handleChange} placeholder="Search"></input>
            <button onClick={() => updateSearched()}>Search</button>
        </>
    );
}

export default SearchComponent;