import { useLocation } from "react-router-dom";
import Results from "./pages/results";
import Home from "./pages/home";

const App = () =>{
    const query = new URLSearchParams(useLocation().search).get('q');

    return (
        <div style={{ overflowY:"hidden"}}>
            { !query && <Home /> }
            { query && <Results /> }
        </div>
    );
}

export default App;