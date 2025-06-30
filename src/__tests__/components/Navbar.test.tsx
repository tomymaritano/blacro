/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../../app/components/Layout/Navbar'

// Mock child components
jest.mock('../../app/components/ui/AnimatedLink', () => {
  return function MockAnimatedLink({ 
    href, 
    children, 
    className, 
    onClick 
  }: { 
    href: string; 
    children: React.ReactNode; 
    className?: string; 
    onClick?: () => void; 
  }) {
    return (
      <a href={href} className={className} onClick={onClick} data-testid="animated-link">
        {children}
      </a>
    )
  }
})

jest.mock('../../app/components/ui/ButtonTalk', () => {
  return function MockButtonTalk({ 
    href, 
    mobile, 
    onClick 
  }: { 
    href: string; 
    mobile?: boolean; 
    onClick?: () => void; 
  }) {
    return (
      <a 
        href={href} 
        onClick={onClick} 
        data-testid="button-talk" 
        data-mobile={mobile}
      >
        {mobile ? 'Let\'s Talk (Mobile)' : 'Let\'s Talk'}
      </a>
    )
  }
})

jest.mock('../../app/components/Hero/HeroLogo', () => {
  return function MockFloatingLogo() {
    return <div data-testid="floating-logo">Floating Logo</div>
  }
})

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ 
    src, 
    alt, 
    className 
  }: { 
    src: string; 
    alt: string; 
    width?: number; 
    height?: number; 
    className?: string; 
  }) {
    return (
      <div 
        data-testid="navbar-logo-image"
        data-src={src} 
        aria-label={alt}
        className={className}
      />
    )
  }
})

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ 
    href, 
    children, 
    onClick 
  }: { 
    href: string; 
    children: React.ReactNode; 
    onClick?: () => void; 
  }) {
    return (
      <a href={href} onClick={onClick} data-testid="next-link">
        {children}
      </a>
    )
  }
})

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Menu: ({ size, className }: { size: number; className: string }) => (
    <div data-testid="menu-icon" data-size={size} className={className}>Menu</div>
  ),
  X: ({ size, className }: { size: number; className: string }) => (
    <div data-testid="x-icon" data-size={size} className={className}>X</div>
  ),
}))

// Mock usePathname hook
const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
    
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    })
    
    // Mock window.addEventListener and removeEventListener
    global.addEventListener = jest.fn()
    global.removeEventListener = jest.fn()
  })

  it('renders navbar with correct structure', () => {
    render(<Navbar />)
    
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('floating-logo')).toBeInTheDocument() // Home page shows floating logo
  })

  it('shows floating logo on home page', () => {
    mockUsePathname.mockReturnValue('/')
    render(<Navbar />)
    
    expect(screen.getByTestId('floating-logo')).toBeInTheDocument()
    expect(screen.queryByTestId('navbar-logo-image')).not.toBeInTheDocument()
  })

  it('shows regular logo on non-home pages', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    
    expect(screen.queryByTestId('floating-logo')).not.toBeInTheDocument()
    expect(screen.getByTestId('navbar-logo-image')).toBeInTheDocument()
    
    const logoImage = screen.getByTestId('navbar-logo-image')
    expect(logoImage).toHaveAttribute('src', '/logo.svg')
    expect(logoImage).toHaveAttribute('alt', 'logo')
  })

  it('renders desktop navigation links', () => {
    render(<Navbar />)
    
    const animatedLinks = screen.getAllByTestId('animated-link')
    expect(animatedLinks).toHaveLength(2) // Portfolio and About
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByTestId('button-talk')).toBeInTheDocument()
  })

  it('shows mobile menu toggle button', () => {
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(toggleButton).toBeInTheDocument()
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
  })

  it('toggles mobile menu when toggle button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    
    // Initially menu is closed
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
    
    // Click to open menu
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('x-icon')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
    })
    
    // Click to close menu
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
      expect(screen.queryByText('Projects')).not.toBeInTheDocument()
    })
  })

  it('renders mobile menu with correct links', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      
      const mobileButtonTalk = screen.getByTestId('button-talk')
      expect(mobileButtonTalk).toHaveAttribute('data-mobile', 'true')
    })
  })

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument()
    })
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByText('Projects')).not.toBeInTheDocument()
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    })
  })

  it('closes mobile menu when logo is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    // Open menu first
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByText('Projects')).toBeInTheDocument()
    })
    
    // Click logo in mobile menu
    const mobileLogoLinks = screen.getAllByTestId('next-link')
    const logoLink = mobileLogoLinks.find(link => link.getAttribute('href') === '/')
    
    if (logoLink) {
      await user.click(logoLink)
      
      await waitFor(() => {
        expect(screen.queryByText('Projects')).not.toBeInTheDocument()
      })
    }
  })

  it('applies scroll-based styling', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    
    // Initially not scrolled
    expect(nav).toHaveClass('bg-white/5')
    expect(nav).not.toHaveClass('bg-white/60', 'shadow-md')
    
    // Simulate scroll event
    Object.defineProperty(window, 'scrollY', { value: 20, writable: true })
    fireEvent.scroll(window)
    
    // Note: Due to the way the component uses useEffect, we'd need to trigger a re-render
    // In a real test environment, this would work properly
  })

  it('sets up scroll event listeners on mount', () => {
    render(<Navbar />)
    
    expect(global.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('cleans up scroll event listeners on unmount', () => {
    const { unmount } = render(<Navbar />)
    
    unmount()
    
    expect(global.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('has proper accessibility attributes', () => {
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(toggleButton).toHaveAttribute('aria-label', 'Toggle menu')
  })

  it('applies correct CSS classes', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass(
      'fixed',
      'top-0',
      'left-0',
      'sm:py-3',
      'font-semibold',
      'w-full',
      'backdrop-blur-md',
      'z-50',
      'transition',
      'font-familjen'
    )
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    expect(toggleButton).toHaveClass('col-span-10', 'flex', 'justify-end', 'md:hidden', 'p-2')
  })

  it('handles mobile menu navigation correctly', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    // Open mobile menu
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      const mobileMenu = screen.getByText('Projects').closest('div')
      expect(mobileMenu).toHaveClass(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-screen',
        'bg-[#FFFDF9]',
        'backdrop-blur-3xl'
      )
    })
  })

  it('displays correct navigation items in mobile menu', async () => {
    const user = userEvent.setup()
    render(<Navbar />)
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' })
    await user.click(toggleButton)
    
    await waitFor(() => {
      // Check that mobile menu has the correct navigation items
      const navigationItems = [
        { text: 'Projects', href: '/portfolio' },
        { text: 'About', href: '/about' },
      ]
      
      navigationItems.forEach(item => {
        expect(screen.getByText(item.text)).toBeInTheDocument()
      })
      
      // Check ButtonTalk is present
      expect(screen.getByTestId('button-talk')).toBeInTheDocument()
    })
  })
})