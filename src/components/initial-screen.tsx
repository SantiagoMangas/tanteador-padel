interface InitialScreenProps {
  onStart: () => void
}

export function InitialScreen({ onStart }: InitialScreenProps) {
  return (
    <div className="w-full h-screen bg-black text-white relative overflow-hidden cursor-pointer" onClick={onStart}>
      {/* Imagen de fondo simulada */}
      <img src = "../assets/fondo-precione.jpg" alt="Fondo" className="absolute inset-0 w-full h-full object-cover" />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenido principal */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Banner principal */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/95 text-black w-full px-16 py-12 text-center rounded-2xl">
            <h2 className="text-7xl font-black -skew-x-6 mb-4">PRESIONE CUALQUIER</h2>
            <h2 className="text-7xl font-black -skew-x-6">PULSADOR</h2>
          </div>
        </div>

        {/* Bandas de jugadores */}
        <div className="flex h-32">
          <div className="flex-1 bg-green-600 flex flex-col items-center justify-center border-r-4 border-black">
            <div className="">
              <span className="text-white text-3xl font-bold">FERNANDO POTRO</span>
            </div>
            <div className="">
              <span className="text-white text-3xl font-bold">MARTIN PEREZOSO</span>
            </div>
          </div>
          
          <div className="flex-1 bg-red-600 flex flex-col items-center justify-center">
            <span className="text-white text-3xl font-bold">ADRIAN LIMON</span>
            <span className="text-white text-3xl font-bold">CACO PANCHO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
