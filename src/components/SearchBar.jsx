export default function SearchBar({ changeSearch }) {
    return (
        <form
            onSubmit={(e) => {
                // prevent the form from refreshing the page
                e.preventDefault();
                // trigger search on enter
                changeSearch(e.target.search.value);
            }}
        >
            <label htmlFor="search">Search Issues</label>
            <input 
                type="search" placeholder="Search" name="search" 
                onChange={(e) => {
                    // also trigger search on clear input
                    if (e.target.value.length === 0) 
                        changeSearch("")
                    }
                }
            />
        </form>
    )
}