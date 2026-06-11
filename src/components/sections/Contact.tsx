"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"
import { SiInstagram } from "react-icons/si"
import { FiMail, FiSend } from "react-icons/fi"
import { contactConfig } from "@/lib/data"
import SectionWrapper from "@/components/ui/SectionWrapper"
import SectionAccent from "@/components/ui/SectionAccent"
import TextReveal from "@/components/ui/TextReveal"
import MagneticButton from "@/components/ui/MagneticButton"

interface FormData {
  name: string
  business: string
  email: string
  requirement: string
}

const initialForm: FormData = {
  name: "",
  business: "",
  email: "",
  requirement: "",
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [showEmailFallback, setShowEmailFallback] = useState(false)

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function buildWhatsAppMessage(data: FormData): string {
    return (
      `Hello Parth,%0A%0A` +
      `My Name: ${data.name}%0A` +
      `Business Name: ${data.business}%0A` +
      `Email: ${data.email}%0A%0A` +
      `Project Requirement:%0A${data.requirement}%0A%0A` +
      `I would like to discuss a website project.`
    )
  }

  function buildMailTo(data: FormData): string {
    const subject = encodeURIComponent("Website Project Inquiry")
    const body = encodeURIComponent(
      `Hello Parth,\n\n` +
        `My Name: ${data.name}\n` +
        `Business Name: ${data.business}\n` +
        `Email: ${data.email}\n\n` +
        `Project Requirement:\n${data.requirement}\n\n` +
        `I would like to discuss a website project.`
    )
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const url = `https://wa.me/${contactConfig.whatsappNumber}?text=${buildWhatsAppMessage(form)}`
    setSubmitted(true)

    // Try WhatsApp, show email fallback after timeout
    window.open(url, "_blank")

    setTimeout(() => {
      setShowEmailFallback(true)
    }, 2000)
  }

  function handleEmailRedirect() {
    window.location.href = buildMailTo(form)
  }

  return (
    <SectionWrapper id="contact" className="min-h-screen flex items-center">
      <SectionAccent position="top-right" color="bg-primary/10" size="w-80 h-80" />
      <SectionAccent position="bottom-left" color="bg-accent/8" size="w-96 h-96" />
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <TextReveal
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Let&apos;s Build Something
          </TextReveal>
          <TextReveal
            delay={0.2}
            className="text-lg text-muted"
          >
            Have a project in mind? Reach out and let&apos;s make it happen.
          </TextReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-lg mx-auto"
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="relative p-8 rounded-2xl border border-primary/20 bg-surface/60 backdrop-blur-xl shadow-xl shadow-primary/10"
            >
              {/* Form fields */}
              {(
                [
                  { key: "name", label: "Your Name", type: "text" },
                  { key: "business", label: "Business Name", type: "text" },
                  { key: "email", label: "Email Address", type: "email" },
                ] as const
              ).map(({ key, label, type }) => (
                <div key={key} className="relative mb-6 group">
                  <input
                    type={type}
                    id={key}
                    required
                    value={form[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-transparent border-b border-border focus:border-primary outline-none text-foreground transition-colors duration-300"
                    placeholder=" "
                  />
                  <label
                    htmlFor={key}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                  >
                    {label}
                  </label>
                </div>
              ))}

              {/* Requirement textarea */}
              <div className="relative mb-8 group">
                <textarea
                  id="requirement"
                  required
                  rows={4}
                  value={form.requirement}
                  onChange={(e) => updateField("requirement", e.target.value)}
                  className="peer w-full px-4 pt-6 pb-2 bg-transparent border-b border-border focus:border-primary outline-none text-foreground transition-colors duration-300 resize-none"
                  placeholder=" "
                />
                <label
                  htmlFor="requirement"
                  className="absolute left-4 top-4 text-muted text-sm transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                >
                  Project Requirement
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full bg-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary-light transition-colors duration-300 shadow-lg shadow-primary/25"
              >
                <FiSend className="w-4 h-4" />
                Send Message
              </button>

              <p className="text-xs text-muted text-center mt-4">
                You&apos;ll be redirected to WhatsApp to complete your inquiry.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl border border-primary/20 bg-surface/60 backdrop-blur-xl text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <FaWhatsapp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Check Your WhatsApp
              </h3>
              <p className="text-muted text-sm mb-6">
                Your message has been prepared. If WhatsApp didn&apos;t open
                automatically, use the options below.
              </p>
              {showEmailFallback && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleEmailRedirect}
                    className="py-3 px-6 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiMail className="w-4 h-4" />
                    Send via Email
                  </button>
                  <MagneticButton
                    href={contactConfig.instagramDm}
                    variant="ghost"
                  >
                    <SiInstagram className="w-4 h-4" />
                    DM on Instagram
                  </MagneticButton>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
