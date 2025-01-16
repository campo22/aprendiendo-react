import './App.css';
import { useCatImage } from "./hooks/usecatImage";
import { useCatFact } from "./hooks/useCatFact";

export default function App() {
    const { fact, getRandomFactAndUpdateState } = useCatFact()
    const { image } = useCatImage({ fact })


    const handleClick = async () => {
        getRandomFactAndUpdateState()
    }

    return (
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new fact</button>
            {fact && <p>{fact}</p>}
            {image && <img src={image} alt={`Imagen de un gato que dice: ${fact}`} />}
        </main>
    );
}
