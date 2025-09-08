"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-guard"
import { Navigation } from "@/components/navigation"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your HR Assistant. I can help you with employee information, policies, benefits, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Role-based responses
    if (user?.role === "manager" && (lowerMessage.includes("team") || lowerMessage.includes("report"))) {
      return "As a manager, you have access to team reports in the manager dashboard. You can view team performance metrics, approve leave requests, and access employee development plans. Would you like me to guide you through any specific management tasks?"
    }

    if (user?.role === "admin" && (lowerMessage.includes("system") || lowerMessage.includes("database"))) {
      return "As an administrator, you have full system access. You can manage users, update the knowledge base, and configure system settings through the admin panel. Is there a specific administrative task you need help with?"
    }

    // Mock responses based on common HR queries
    if (lowerMessage.includes("leave") || lowerMessage.includes("vacation")) {
      return "You have 15 vacation days remaining this year. To request leave, please submit a request through the employee portal at least 2 weeks in advance. Sick leave is separate and doesn't count against your vacation days."
    }

    if (lowerMessage.includes("benefits") || lowerMessage.includes("insurance")) {
      return "Our benefits package includes: Health insurance (80% company coverage), Dental and Vision coverage, 401(k) with 4% company match, Life insurance, and Flexible Spending Account. Open enrollment is in November each year."
    }

    if (lowerMessage.includes("salary") || lowerMessage.includes("pay") || lowerMessage.includes("payroll")) {
      return "Payroll is processed bi-weekly on Fridays. Your next pay date is visible in the employee portal. For salary discussions or questions about your compensation, please schedule a meeting with your manager or HR representative."
    }

    if (lowerMessage.includes("policy") || lowerMessage.includes("handbook")) {
      return "The employee handbook is available in the company portal under 'Resources'. It covers all company policies including code of conduct, remote work guidelines, and disciplinary procedures. Please review it regularly as policies may be updated."
    }

    if (lowerMessage.includes("training") || lowerMessage.includes("development")) {
      return "We offer various professional development opportunities including online courses through LinkedIn Learning, conference attendance budget ($1,500/year), and internal mentorship programs. Speak with your manager about creating a development plan."
    }

    if (lowerMessage.includes("contact") || lowerMessage.includes("hr")) {
      return "You can reach HR at hr@company.com or extension 1234. Office hours are Monday-Friday, 9 AM - 5 PM. For urgent matters outside business hours, use the emergency contact line at (555) 123-4567."
    }

    // Default response
    return (
      "I understand you're asking about: " +
      userMessage +
      ". For specific information not covered in my knowledge base, please contact HR directly at hr@company.com or schedule a meeting through the employee portal."
    )
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card text-card-foreground border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about HR policies, benefits, leave, or any employee-related questions..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
