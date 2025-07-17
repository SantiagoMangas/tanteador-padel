import { useEffect } from 'react';
import fondo from '../assets/fondo-presione.jpg'

interface InitialScreenProps {
  onStart: () => void
}

export function InitialScreen({ onStart }: InitialScreenProps) {
  // Ejecutar onStart al presionar tecla
  useEffect(() => {
    const handleKeyDown = () => {
      onStart();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onStart]);
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col p-6"
      style={{ backgroundImage: `url(${fondo})` }}
      onClick={onStart} // Ejecutar onStart al hacer clic en pantalla
    >
      <div className="flex-grow" />

      <div className="flex items-center justify-center bg-white/70 p-6 mb-8 min-h-[120px] max-h-[300px]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black text-center leading-tight">
          PRESIONE CUALQUIER<br />PULSADOR
        </h1>
      </div>

      <div className="flex-grow" />

      <div className="grid grid-cols-2 gap-2 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        <div className="bg-green-600 p-4 flex items-center justify-center text-center">
          <span>FERNANDO POTRO</span>
        </div>
        <div className="bg-red-600 p-4 flex items-center justify-center text-center">
          <span>ADRIAN LIMON</span>
        </div>

        <div className="bg-green-600 p-4 flex items-center justify-center text-center">
          <span>MARTIN PEREZOSO</span>
        </div>
        <div className="bg-red-600 p-4 flex items-center justify-center text-center">
          <span>CACO PANCHO</span>
        </div>
      </div>
    </div>
  )
}
