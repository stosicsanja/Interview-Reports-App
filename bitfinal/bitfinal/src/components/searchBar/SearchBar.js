import {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar({onSearch}) {

  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  }
    return ( 
        <div className={styles.searchDiv}>
             <input className={styles.searchInput}
              type="text"
               placeholder='Search'
               value={query}
            onChange={handleQueryChange} />
        </div>
     );
}

export default SearchBar;