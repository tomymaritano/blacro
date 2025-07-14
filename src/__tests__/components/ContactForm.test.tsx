/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../../components/forms/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockClear()
  })

  it('renders all form fields and labels correctly', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText('NOMBRE *')).toBeInTheDocument()
    expect(screen.getByLabelText('EMAIL *')).toBeInTheDocument()
    expect(screen.getByLabelText('COMPAÑÍA *')).toBeInTheDocument()
    expect(screen.getByLabelText('WEBSITE - SOCIAL MEDIA')).toBeInTheDocument()
    expect(screen.getByLabelText('TELÉFONO *')).toBeInTheDocument()
    expect(screen.getByLabelText('PAÍS *')).toBeInTheDocument()
    expect(screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Enviar Mensaje' })).toBeInTheDocument()
  })

  it('has correct placeholder texts', () => {
    render(<ContactForm />)
    
    expect(screen.getByPlaceholderText('Tu nombre completo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('tu@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Nombre de tu compañía')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('https://tusitio.com o @tuusuario')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('+54 (11) 1234-5678')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Describe tu proyecto, objetivos, cronograma y cualquier requerimiento específico...')).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    await user.click(submitButton)
    
    // Wait for validation errors to appear
    await waitFor(() => {
      // Check for specific validation error messages
      expect(screen.getByText('Tu nombre es muy corto')).toBeInTheDocument()
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
      expect(screen.getByText('El nombre de la compañía es muy corto')).toBeInTheDocument()
      expect(screen.getByText('El teléfono es requerido')).toBeInTheDocument()
      expect(screen.getByText('El país es requerido')).toBeInTheDocument()
      expect(screen.getByText('La descripción del proyecto es muy corta')).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText('EMAIL *')
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
    })
  })

  it('shows validation error for short name', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    await user.type(nameInput, 'A')
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Tu nombre es muy corto')).toBeInTheDocument()
    })
  })

  it('shows validation error for short project description', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    await user.type(messageInput, 'Short')
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('La descripción del proyecto es muy corta')).toBeInTheDocument()
    })
  })

  it('applies error styling to invalid fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    await user.click(submitButton)
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText('NOMBRE *')
      const emailInput = screen.getByLabelText('EMAIL *')
      const companyInput = screen.getByLabelText('COMPAÑÍA *')
      
      expect(nameInput).toHaveClass('border-red-500')
      expect(emailInput).toHaveClass('border-red-500')
      expect(companyInput).toHaveClass('border-red-500')
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
    await user.click(submitButton)
    
    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        company: 'Mi Empresa',
        websiteSocial: '',
        phone: '+54 11 1234-5678',
        country: 'AR',
        projectDescription: 'Este es un mensaje de prueba para el formulario de contacto.',
      }),
    })
    
    await waitFor(() => {
      expect(screen.getByText('¡Mensaje enviado exitosamente!')).toBeInTheDocument()
    })
  })

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    
    // Mock fetch to return a pending promise
    let resolvePromise: (value: Response) => void
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve
    })
    
    ;(fetch as jest.Mock).mockReturnValueOnce(pendingPromise)
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
    await user.click(submitButton)
    
    // Check loading state
    expect(screen.getByText('Enviando...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveClass('opacity-50', 'cursor-not-allowed')
    
    // Resolve the promise
    resolvePromise!({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)
    
    await waitFor(() => {
      expect(screen.getByText('Enviar Mensaje')).toBeInTheDocument()
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
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
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
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error al enviar el mensaje.')).toBeInTheDocument()
    })
  })

  it('handles network error correctly', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Error al enviar el mensaje.')).toBeInTheDocument()
    })
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *') as HTMLInputElement
    const emailInput = screen.getByLabelText('EMAIL *') as HTMLInputElement
    const companyInput = screen.getByLabelText('COMPAÑÍA *') as HTMLInputElement
    const phoneInput = screen.getByLabelText('TELÉFONO *') as HTMLInputElement
    const countryInput = screen.getByLabelText('PAÍS *') as HTMLSelectElement
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *') as HTMLTextAreaElement
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    
    await user.type(nameInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(companyInput, 'Mi Empresa')
    await user.type(phoneInput, '+54 11 1234-5678')
    await user.selectOptions(countryInput, 'AR')
    await user.type(messageInput, 'Este es un mensaje de prueba para el formulario de contacto.')
    
    expect(nameInput.value).toBe('Juan Pérez')
    expect(emailInput.value).toBe('juan@example.com')
    expect(companyInput.value).toBe('Mi Empresa')
    expect(phoneInput.value).toBe('+54 11 1234-5678')
    expect(countryInput.value).toBe('AR')
    expect(messageInput.value).toBe('Este es un mensaje de prueba para el formulario de contacto.')
    
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('¡Mensaje enviado exitosamente!')).toBeInTheDocument()
      expect(nameInput.value).toBe('')
      expect(emailInput.value).toBe('')
      expect(companyInput.value).toBe('')
      expect(phoneInput.value).toBe('')
      expect(countryInput.value).toBe('')
      expect(messageInput.value).toBe('')
    })
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText('NOMBRE *')
    const emailInput = screen.getByLabelText('EMAIL *')
    const companyInput = screen.getByLabelText('COMPAÑÍA *')
    const phoneInput = screen.getByLabelText('TELÉFONO *')
    const countryInput = screen.getByLabelText('PAÍS *')
    const messageInput = screen.getByLabelText('CONTANOS SOBRE TU PROYECTO *')
    
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(companyInput).toHaveAttribute('id', 'company')
    expect(phoneInput).toHaveAttribute('id', 'phone')
    expect(countryInput).toHaveAttribute('id', 'country')
    expect(messageInput).toHaveAttribute('id', 'projectDescription')
    
    expect(screen.getByText('NOMBRE *')).toHaveAttribute('for', 'name')
    expect(screen.getByText('EMAIL *')).toHaveAttribute('for', 'email')
    expect(screen.getByText('COMPAÑÍA *')).toHaveAttribute('for', 'company')
  })

  it('applies correct CSS classes', () => {
    render(<ContactForm />)
    
    const form = document.querySelector('form')
    expect(form).toHaveClass('space-y-6', 'w-full', 'text-black/80', 'pr-2')
    
    const submitButton = screen.getByRole('button', { name: 'Enviar Mensaje' })
    expect(submitButton).toHaveClass('w-full', 'flex', 'items-center', 'justify-center', 'px-6', 'py-4', 'bg-black', 'text-white')
  })
})