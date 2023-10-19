import { Hourglass } from "react-loader-spinner";
import "../assets/styles/loading.scss";
import { CSSProperties } from "react";

const Loading = (props:{ style?: CSSProperties, size?:string}) =>{
    const size = props.size || "50px";

    return (
        <div className="loading" style={props.style}>
            <Hourglass visible={true} height={size} width={size} ariaLabel="hourglass-loading" wrapperStyle={{}} wrapperClass="" colors={['#306cce', '#72a1ed']} />
        </div>
    );
}

export default Loading;