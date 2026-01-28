import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'success' | 'error'
  title: string
  message: string
  closeText: string
}

export function FormModal({ isOpen, onClose, type, title, message, closeText }: FormModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isSuccess = type === 'success'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
          aria-label="Close"
        >
          <X size={18} className="md:w-5 md:h-5" />
        </button>

        {/* Modal content */}
        <div className="p-6 md:p-8">
          {/* Icon */}
          <div className="flex justify-center mb-4 md:mb-5">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                isSuccess ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
              ) : (
                <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-3">
            {title}
          </h3>

          {/* Message */}
          <p className="text-sm md:text-base text-gray-700 text-center mb-6 leading-relaxed">
            {message}
          </p>

          {/* Close button */}
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className={`px-6 py-2.5 md:py-3 rounded-md font-medium transition-colors text-sm md:text-base ${
                isSuccess
                  ? 'bg-white border-2 border-yellow-400 text-gray-900 hover:bg-yellow-50 active:bg-yellow-100'
                  : 'bg-white border-2 border-red-400 text-gray-900 hover:bg-red-50 active:bg-red-100'
              }`}
            >
              {closeText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
