import { QRCodeSVG } from 'qrcode.react'

/**
 * QRCodeCard — printable business card / flyer QR code component.
 *
 * Usage:
 *   import QRCodeCard from './components/QRCode'
 *   <QRCodeCard />
 *
 * To print: wrap in a page and use window.print(), or open the route
 * that renders only this component and use the browser's print dialog.
 * The component is sized for a business card (3.5" × 2") at 96 dpi.
 */
export default function QRCodeCard() {
  const siteUrl = 'https://arifkhan.dev'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 print:min-h-0 print:bg-transparent">
      <div
        className="
          bg-white border border-gray-200 rounded-lg
          flex flex-col items-center
          px-8 py-7 w-72
          print:border print:border-gray-300 print:rounded-none print:shadow-none
          print:w-[3.5in] print:px-6 print:py-5
        "
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* QR Code */}
        <QRCodeSVG
          value={siteUrl}
          size={180}
          level="H"
          includeMargin={false}
          fgColor="#0f172a"
          bgColor="#ffffff"
        />

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-5"></div>

        {/* Name & Title */}
        <div className="text-center">
          <p className="text-slate-900 font-bold text-sm tracking-tight">
            Mohammad Arif Khan
          </p>
          <p className="text-gray-500 text-xs mt-1 leading-snug">
            IT Support Analyst &amp; M365 Administrator
          </p>
          <p className="text-gray-400 text-xs mt-0.5">Toronto, ON</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-4"></div>

        {/* Scan instructions */}
        <p className="text-gray-400 text-xs text-center leading-relaxed">
          Scan to view my IT profile &amp; resume
        </p>

        {/* URL hint */}
        <p className="text-blue-500 text-xs mt-1.5 font-medium">{siteUrl}</p>
      </div>
    </div>
  )
}
