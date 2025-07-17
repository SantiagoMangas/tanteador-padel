interface LEDNumberProps {
  value: string | number
  size?: "small" | "medium" | "large"
  color?: "green" | "red" | "yellow"
}

export function LEDNumber({ value, size = "large", color = "green" }: LEDNumberProps) {
  const sizeClasses = {
    small: "text-4xl px-4 py-2",
    medium: "text-6xl px-6 py-4",
    large: "text-8xl px-8 py-6",
  }

  const colorClasses = {
    green: "bg-green-600 text-green-100 border-green-400 shadow-green-500/50",
    red: "bg-red-600 text-red-100 border-red-400 shadow-red-500/50",
    yellow: "bg-yellow-500 text-yellow-900 border-yellow-300 shadow-yellow-400/50",
  }

  return (
    <div
      className={`
      ${sizeClasses[size]} 
      ${colorClasses[color]}
      font-mono font-bold text-center
      border-2 rounded-lg
      shadow-lg shadow-inner
      bg-gradient-to-b from-opacity-20 to-opacity-40
      flex items-center justify-center
      min-w-[120px]
    `}
    >
      {value}
    </div>
  )
}
