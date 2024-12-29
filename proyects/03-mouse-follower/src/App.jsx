import { useEffect, useState } from "react";

function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('efecto', { enable });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      console.log('handle ', { clientX, clientY });
    }
    if (enable) {
      window.addEventListener('mousemove', handleMove);
    }



  }, [enable]);
  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: enable ? 1 : 0,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: 'translate(var(--x), var(--y))'
      }} />

      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Desactivar' : 'Activar'} Activar seguir puntero
      </button >
    </main>

  );
}
export default App;