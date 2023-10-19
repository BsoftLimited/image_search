import { PropsWithChildren } from "react";
import "../assets/styles/image-download.scss";
import axios from "axios";

interface ImageDownloadProps extends PropsWithChildren{
    src: string;
}

const ImageDownload: React.FC<ImageDownloadProps> = (props: ImageDownloadProps) => {
    const handleDownload = () => {
        axios({ url: props.src, method: 'GET', responseType: 'blob', headers: { 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/x-www-form-urlencoded' 
        }}).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'image.jpg');
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
        }).catch((error) => {
            console.error('Error downloading image:', error);
        });
    };
    
    return (<a href={props.src} className="download-button" download>{props.children}</a>);
};

export default ImageDownload;