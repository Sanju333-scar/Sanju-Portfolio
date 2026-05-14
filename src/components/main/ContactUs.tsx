'use client'

import { Variants, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegCopy,
  FaSpinner,
  FaUser,
} from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('Failed to send message. Please try again.')
      }
    } catch {
      setStatus('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`)
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  }

  const inputVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  }

  return (
    <section id="contact" className="py-20 bg-background text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl mx-auto bg-muted/50 backdrop-blur-lg rounded-none p-8 sm:p-10 shadow-2xl border border-border"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <h2 className="text-4xl font-extrabold mb-4">Connect With Me</h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Have a project in mind or a question? Reach out and let&apos;s turn your ideas into reality.
          </p>

          <div className="space-y-5 text-foreground">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-lg" />
              <span className="text-sm font-medium select-text">sanjusebastian.2005@gmail.com</span>
              <button
                onClick={() => copyToClipboard('sanjusebastian.2005@gmail.com', 'Email')}
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Copy email"
              >
                <FaRegCopy />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <FaSquarePhone className="text-primary text-lg" />
              <span className="text-sm font-medium select-text">+91 9567406763</span>
              <button
                onClick={() => copyToClipboard('+91 9567406763', 'Phone number')}
                className="text-muted-foreground hover:text-primary transition"
                aria-label="Copy phone number"
              >
                <FaRegCopy />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary text-lg" />
              <span className="text-sm font-medium select-text">Kerala, India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs
