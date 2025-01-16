import { useState, useEffect } from "react";

const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com";

export function useCatImage({ fact }) {
  const [image, setImage] = useState();

  useEffect(() => {
    if (!fact) return;

    // Obtener las 3 primeras palabras del fact
    const firstWord = fact.split(" ").slice(0, 3).join(" ");
    console.log(firstWord);

    fetch(`${CAT_ENDPOINT_IMAGE_URL}/cat/says/${firstWord}?size=50&color=blue`)
      .then((response) => {
        if (response.ok) {
          setImage(response.url); // Actualiza la URL de la imagen
        } else {
          console.error("Error fetching image");
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, [fact]); // Agrega fact como dependencia

  // Devuelve la URL de la imagen
  return { image };
}
