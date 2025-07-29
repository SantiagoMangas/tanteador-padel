import { useEffect } from 'react';
import fondo from '../assets/fondo-presione.jpg'

interface InitialScreenProps {
  onStart: () => void
}

export function InitialScreen({ onStart }: InitialScreenProps) {
<<<<<<< HEAD
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden cursor-pointer" onClick={onStart}>
      <img src = "../assets/fondo-precione.jpg" alt="Fondo" className="absolute inset-0 w-full h-full object-cover" />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/95 text-black w-full px-16 py-12 text-center rounded-2xl">
            <h2 className="text-7xl font-black -skew-x-6 mb-4">PRESIONE CUALQUIER</h2>
            <h2 className="text-7xl font-black -skew-x-6">PULSADOR</h2>
          </div>
=======
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
>>>>>>> d340090d49f91b01944b43dcdcd9b8bb9c14269b
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
