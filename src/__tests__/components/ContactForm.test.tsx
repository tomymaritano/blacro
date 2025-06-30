/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../../app/contact/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  it('renders all form fields and labels correctly', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('has correct placeholder texts', () => {
    render(<ContactForm />)
    
    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell us about your project or idea...')).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Your name is too short')).toBeInTheDocument()
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      expect(screen.getByText('Your message is too short')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('shows validation error for short name', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    await user.type(nameInput, 'A')
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Your name is too short')).toBeInTheDocument()
    })
  })

  it('shows validation error for short message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText('Your Message')
    await user.type(messageInput, 'Short')
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Your message is too short')).toBeInTheDocument()
    })
  })

  it('applies error styling to invalid fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    await user.click(submitButton)
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText('Name')
      const emailInput = screen.getByLabelText('Email')
      const messageInput = screen.getByLabelText('Your Message')
      
      expect(nameInput).toHaveClass('border-red-500')
      expect(emailInput).toHaveClass('border-red-500')
      expect(messageInput).toHaveClass('border-red-500')
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message for the contact form.',
      }),
    })
    
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
    })
  })

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    
    // Mock fetch to return a pending promise
    let resolvePromise: (value: any) => void
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    ;(fetch as jest.Mock).mockReturnValueOnce(pendingPromise)
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    // Check loading state
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    await waitFor(() => {
      expect(screen.getByText('Send')).toBeInTheDocument()
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('handles API error response correctly', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Rate limit exceeded' }),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument()
    })
  })

  it('handles API error without error message', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error sending the message.')).toBeInTheDocument()
    })
  })

  it('handles network error correctly', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error sending the message.')).toBeInTheDocument()
    })
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const messageInput = screen.getByLabelText('Your Message') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: 'Send' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message for the contact form.')
    
    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(messageInput.value).toBe('This is a test message for the contact form.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Your Message')
    
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(messageInput).toHaveAttribute('id', 'message')
    
    expect(screen.getByText('Name')).toHaveAttribute('for', 'name')
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email')
    expect(screen.getByText('Your Message')).toHaveAttribute('for', 'message')
  })

  it('applies correct CSS classes', () => {
    render(<ContactForm />)
    
    const form = screen.getByRole('form')
    expect(form).toHaveClass('space-y-4', 'w-full', 'max-w-sm', 'sm:max-w-full', 'md:max-w-full', 'lg:max-w-xl', 'text-black/80', 'pr-2')
    
    const submitButton = screen.getByRole('button', { name: 'Send' })
    expect(submitButton).toHaveClass('w-full', 'flex', 'items-center', 'justify-center', 'px-6', 'py-3', 'bg-black', 'text-white', 'font-medium', 'rounded-full', 'transition-colors')
  })
})