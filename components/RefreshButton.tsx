'use client'

interface RefreshButtonProps {
  onClick: () => void
  isLoading: boolean
}

export default function RefreshButton({ onClick, isLoading }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="group relative flex items-center justify-center w-14 h-14 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      aria-label="Refresh quote"
    >
      <svg
        className={`w-6 h-6 transition-transform duration-500 ${
          isLoading ? 'animate-spin' : 'group-hover:rotate-180'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  )
}
