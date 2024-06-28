import { useRef, useState } from 'react'


export default function CanvasPage() {
    const [image, setImage] = useState(null);
    const imageURLRef = useRef(null);

    const uploadImage = (evt) => {
        const addedImage = evt.target.files[0];
        const imageURL = URL.createObjectURL(addedImage)
        imageURLRef.current = imageURL;
    }

    const handleButtonClick = () => {
        const imageURL = imageURLRef.current;
        if (imageURL) {
            setImage(imageURL);
        }
    };

    return (
        <>
        <input type="file" onChange={uploadImage}/>
        <button onClick={handleButtonClick}>TestButton</button>
        <img src={image}></img>

        </>
    )
}
