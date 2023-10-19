import { Link } from "react-router-dom"
import { BiSearch } from "react-icons/bi";
import "../assets/styles/home.scss";

const Home = () =>{
    return (
        <div className='center'>
            <h1 className='title'>Image Search</h1>
            <div className='search-section'>
                <BiSearch size={24} color="grey" />
                <form target="get" style={{ width:"100%"}}>
                    <input type='search' name="q" placeholder='Type something to search...' className='search-input' />
                </form>
            </div>
            <div className='filters'>
                <Link to={{ pathname: '/', search: '?q=nature' }}>Nature</Link>
                <Link to={{ pathname: '/', search: '?q=birds' }}>Birds</Link>
                <Link to={{ pathname: '/', search: '?q=cats' }}>Cats</Link>
                <Link to={{ pathname: '/', search: '?q=shoes' }}>Shoes</Link>
            </div>
    </div>);
}

export default Home;