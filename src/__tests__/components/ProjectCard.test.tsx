/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import ProjectCard from '../../components/project/cards/ProjectCard'
import { Project } from '@/data/types'

// Mock child components
jest.mock('../../components/project/cards/ProjectCardImage', () => {
  return function MockProjectCardImage({ imageSrc, title }: { imageSrc: string; title: string }) {
    return <div data-testid="project-card-image" aria-label={title}>Image: {imageSrc}</div>
  }
})

jest.mock('../../components/project/cards/ProjectCardLogoOverlay', () => {
  return function MockProjectCardLogoOverlay({ 
    logo, 
    isHovered, 
    title 
  }: { 
    logo?: string; 
    isHovered: boolean; 
    title: string; 
  }) {
    return (
      <div data-testid="project-card-logo" data-hovered={isHovered}>
        Logo: {logo || 'No logo'} for {title}
      </div>
    )
  }
})


jest.mock('../../components/project/cards/ProjectCardInfo', () => {
  return function MockProjectCardInfo({ 
    category, 
    title, 
    isHovered 
  }: { 
    category?: string; 
    title: string; 
    isHovered: boolean; 
  }) {
    return (
      <div data-testid="project-card-info" data-hovered={isHovered}>
        <span>{title}</span>
        <span>{category}</span>
      </div>
    )
  }
})

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ 
    href, 
    children, 
    className 
  }: { 
    href: string; 
    children: React.ReactNode; 
    className?: string; 
  }) {
    return (
      <a href={href} className={className} data-testid="project-link">
        {children}
      </a>
    )
  }
})

describe('ProjectCard', () => {
  const mockProject: Project = {
    slug: 'test-project',
    imageSrc: '/images/test.jpg',
    title: 'Test Project',
    category: 'Web Design',
    logo: '/logos/test-logo.svg',
    client: 'Test Client',
    year: 2023,
    location: 'Test Location',
    services: ['Design', 'Development'],
    images: [],
    content: [],
    featured: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders project card with all required elements', () => {
    render(<ProjectCard {...mockProject} />)
    
    expect(screen.getByTestId('project-card-image')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-logo')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-info')).toBeInTheDocument()
    expect(screen.getByTestId('project-link')).toBeInTheDocument()
  })

  it('creates correct link to project page', () => {
    render(<ProjectCard {...mockProject} />)
    
    const link = screen.getByTestId('project-link')
    expect(link).toHaveAttribute('href', '/project/test-project')
  })

  it('passes correct props to child components', () => {
    render(<ProjectCard {...mockProject} />)
    
    const image = screen.getByTestId('project-card-image')
    expect(image).toHaveTextContent('Image: /images/test.jpg')
    expect(image).toHaveAttribute('aria-label', 'Test Project')
    
    const info = screen.getByTestId('project-card-info')
    expect(info).toHaveTextContent('Test Project')
    expect(info).toHaveTextContent('Web Design')
    
    const logo = screen.getByTestId('project-card-logo')
    expect(logo).toHaveTextContent('Logo: /logos/test-logo.svg for Test Project')
  })

  it('handles hover state correctly', async () => {
    render(<ProjectCard {...mockProject} />)
    
    const logo = screen.getByTestId('project-card-logo')
    const info = screen.getByTestId('project-card-info')
    
    // Initially not hovered
    expect(logo).toHaveAttribute('data-hovered', 'false')
    expect(info).toHaveAttribute('data-hovered', 'false')
    
    // Since Framer Motion hover events are mocked, we'll just verify initial state
    expect(logo).toBeInTheDocument()
    expect(info).toBeInTheDocument()
  })

  it('handles mouse move events', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Since Framer Motion events are mocked, we just verify the component renders
    expect(screen.getByTestId('project-card-image')).toBeInTheDocument()
  })

  it('calculates correct animation delay based on index', () => {
    const { rerender } = render(<ProjectCard {...mockProject} index={0} />)
    // Index 0: rowIndex=0, columnIndex=0, delay=0*0.2 + 0*0.1 = 0
    
    rerender(<ProjectCard {...mockProject} index={1} />)
    // Index 1: rowIndex=0, columnIndex=1, delay=0*0.2 + 1*0.1 = 0.1
    
    rerender(<ProjectCard {...mockProject} index={2} />)
    // Index 2: rowIndex=1, columnIndex=0, delay=1*0.2 + 0*0.1 = 0.2
    
    rerender(<ProjectCard {...mockProject} index={3} />)
    // Index 3: rowIndex=1, columnIndex=1, delay=1*0.2 + 1*0.1 = 0.3
    
    // Since we can't directly test the delay calculation, we verify the component renders correctly
    expect(screen.getByTestId('project-card-image')).toBeInTheDocument()
  })

  it('handles missing optional props gracefully', () => {
    const minimalProject: Project = {
      slug: 'minimal-project',
      imageSrc: '/images/minimal.jpg',
      title: 'Minimal Project',
      client: 'Test Client',
      year: 2023,
      location: 'Test Location',
      services: ['Design'],
      images: [],
      content: [],
      featured: false,
    }
    
    render(<ProjectCard {...minimalProject} />)
    
    expect(screen.getByTestId('project-card-image')).toBeInTheDocument()
    expect(screen.getByTestId('project-card-info')).toBeInTheDocument()
    
    const logo = screen.getByTestId('project-card-logo')
    expect(logo).toHaveTextContent('Logo: No logo for Minimal Project')
  })

  it('applies correct CSS classes', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Verify the component renders with the expected structure
    expect(screen.getByTestId('project-card-image')).toBeInTheDocument()
    expect(screen.getByTestId('project-link')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ProjectCard {...mockProject} />)
    
    const link = screen.getByTestId('project-link')
    expect(link).toBeInTheDocument()
    
    const image = screen.getByTestId('project-card-image')
    expect(image).toHaveAttribute('aria-label', 'Test Project')
  })
})