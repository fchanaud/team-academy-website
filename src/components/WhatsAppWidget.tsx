import { MessageCircle } from 'lucide-react'

export function WhatsAppWidget() {
  const phoneNumber = '00212653890162'
  const message = encodeURIComponent('Hello, I would like to know more about Tennis Academy Marrakech.')
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-secondary hover:bg-secondary/90 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  )
}
