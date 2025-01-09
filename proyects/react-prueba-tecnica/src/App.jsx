import { useEffect, useState } from "react";
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com';

export default function App() {
    const [fact, setFact] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(response => response.json())
            .then(data => {
                const { fact } = data;
                setFact(fact);
            })
            .catch(error => console.error('Error fetching cat fact:', error));
    }, []);

    useEffect(() => {
        if (!fact) return;

        const firstWord = fact.split(" ").slice(0, 3).join(" ");
        console.log(firstWord);

        fetch(`${CAT_ENDPOINT_IMAGE_URL}/cat/says/${firstWord}?size=50&color=blue`)
            .then(response => {
                if (response.ok) {
                    setImage(response.url); // Usa directamente response.url
                } else {
                    console.error('Error fetching image');
                }
            })
            .catch(error => console.error('Error fetching image:', error));
    }, [fact]); // Corrección de dependencia

    return (
        <main>
            <h1>App de gatos</h1>
            {fact && <p>{fact}</p>}
            {image && <img src={image} alt={`Imagen de un gato que dice: ${fact}`} />}
        </main>
    );
}
