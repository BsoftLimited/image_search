import { useCallback, useEffect, useState } from "react";
import Loading from "../components/loading";
import "../assets/styles/results.scss";
import { useLocation } from "react-router-dom";
import { BiSearch, BiSolidHome} from "react-icons/bi";
import { searchPhoto } from "../utils";
import Preview from "../components/preview";

const Results = () =>{
    const searchParams = new URLSearchParams(useLocation().search);

    const  originalQuery = searchParams.get("q") as string;

    const [query, setQuery] = useState(originalQuery);
    const [state, setState] = useState<{page: number, loading: boolean, error?:  string, image?: any, preview: boolean}>({ page: 1, loading: false, preview: false });

    const [data, setData] = useState<{images: Map<number, any[]>, totalPages: number, total: number}>({images: new Map(), totalPages: 0, total: 0});

    const fetchImages = useCallback(() => {
        setState((init) => { return {...init, loading: true, error: undefined}});
        searchPhoto(query, state.page).then((response)=>{
            console.log('data', response.data);
            setData((init)=>{
                let images = init.images;
                images.set(state.page, response.data.results);

                return { images, totalPages: response.data.total_pages, total: response.data.total };
            });
            setState((init) => { return {...init, loading: false, error: undefined}});
        }).catch((error)=>{
            console.log(error);
            setState((init) => { return {...init, loading: false, error: 'Error fetching images. Try again later.'}});
        });
    }, [state.page]);

    useEffect(()=> fetchImages(), [fetchImages]);


    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        let element = event.currentTarget;
        setQuery(element.value);
    }

    const onScrollChange = (event: React.UIEvent<HTMLDivElement>) =>{
        let element = event.currentTarget;
        if ((element.scrollHeight - element.scrollTop - 30) <= element.clientHeight) {
            if(state.page < data.totalPages){
                setState((init) => { return {...init, page: init.page + 1}});
                fetchImages();
            }
        }
    }   
    
    const onImageClick = (image: any) => setState((init) => { return {...init, preview: true, image} });
    const onPreviewCLose = () => setState((init) => { return {...init, preview: false }});

    let init: any[] = [];
    data.images.forEach((value)=>{
        value.forEach((image)=> init.push(image))
    });

    return (
        <div onScroll={onScrollChange} style={{ maxHeight:"100dvh", overflowY: "auto"}}>
            <div className="header">
                <div className="title-container">
                    <BiSolidHome color="#4967ff" size={30}/>
                    <h4 className="header-title">Image Search</h4>
                </div>
                <div className="tools-container" >
                    <div className="header-search-input-container">
                        <div style={{ paddingLeft:"5px" }}><BiSearch size={20} color="gray"/></div>
                        <form target="get">
                            <input type='search' name="q" onChange={onQueryChange} value={query!} placeholder="Type something to search..." className='header-search-input' />
                        </form>
                    </div>
                </div>
            </div>
            { (init.length > 0 || !state.loading) && (
                <div className="results-container">
                    <h4 className="results-header">{ data.total } results for found for {originalQuery}</h4>
                    <div className='images'>
                        {init.map((image) => (<div className="image-container"><img key={image.id} src={ image.urls.small} onClick={()=> onImageClick(image)} alt={image.alt_description} className="image" /></div>) )}
                    </div>
                    { state.page < data.totalPages && <div style={{ maxHeight:"80px"}}>
                        { state.loading && <Loading style={{ position:"relative" }} size="36px"/> }
                    </div>}
                    { state.preview && <Preview image={state.image} onClose={onPreviewCLose} /> }
                </div>) }
            { (init.length === 0 && state.loading) && <Loading /> }
        </div>
    );
}

export default Results;