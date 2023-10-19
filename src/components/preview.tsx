import { useEffect, useRef, useState } from "react";
import "../assets/styles/preview.scss";
import { BiDownload, BiSolidInfoCircle, BiSolidXCircle } from "react-icons/bi";
import ImageDownload from "./image-download";

const Preview = (props: { image: any, onClose: CallableFunction}) =>{
    const imageRef = useRef<HTMLImageElement>(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(()=>{
        if(imageRef.current){
            document.documentElement.style.setProperty('--image-width', `${imageRef.current.offsetWidth}px`);
            document.documentElement.style.setProperty('--image-height', `${imageRef.current?.offsetHeight}px`);
            imageRef.current.onload = () =>{
                document.documentElement.style.setProperty('--image-width', `${imageRef.current?.offsetWidth}px`);
                document.documentElement.style.setProperty('--image-height', `${imageRef.current?.offsetHeight}px`);
            }

            imageRef.current.onresize = () =>{
                document.documentElement.style.setProperty('--image-width', `${imageRef.current?.offsetWidth}px`);
                document.documentElement.style.setProperty('--image-height', `${imageRef.current?.offsetHeight}px`);
            }
        }
    }, [props.image, imageRef]);

    const toggleDetails = () => setShowDetails((init) => !init);

    return (
        <div className="preview">
            <div className="preview-layout">
                <img ref={imageRef} className="preview-image" src={props.image.urls.regular} />
                <div className="preview-description" style={{ width: `${imageRef.current?.offsetWidth}px` }}>
                    <div className="preview-options">
                        <div style={{ cursor:"pointer" }} onClick={toggleDetails}>
                            <BiSolidInfoCircle size={30} color="white"/>
                        </div>
                        <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
                            <ImageDownload src={props.image.links?.download as string}><BiDownload size={24}/> Download</ImageDownload>
                            <div style={{ cursor:"pointer" }} onClick={()=> props.onClose() }>
                                <BiSolidXCircle size={30} color="white"/>
                            </div>
                        </div>
                    </div>
                    { showDetails && <div className="preview-details">
                        <div><span style={{ fontWeight:"bolder" }}>Uploaded:</span> {new Date(props.image.created_at).toDateString()}</div>
                        <div><span style={{ fontWeight:"bolder" }}>Resolution:</span> {props.image.width}x{props.image.height}</div>
                    </div> }
                </div>
            </div>
        </div>
    );
}

export default Preview;