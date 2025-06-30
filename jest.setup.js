import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, {
    get: (target, prop) => {
      return React.forwardRef((props, ref) => {
        const { children, ...otherProps } = props;
        // Filter out framer motion specific props
        const cleanProps = Object.keys(otherProps).reduce((acc, key) => {
          if (![
            'initial', 'animate', 'exit', 'transition', 'variants',
            'whileHover', 'whileTap', 'whileInView', 'viewport',
            'onHoverStart', 'onHoverEnd', 'onMouseMove', 'layout'
          ].includes(key)) {
            acc[key] = otherProps[key];
          }
          return acc;
        }, {});
        
        return React.createElement(prop, { ...cleanProps, ref }, children);
      });
    }
  }),
  AnimatePresence: ({ children }) => children,
  useMotionValue: () => ({ set: jest.fn(), get: jest.fn() }),
  useTransform: () => 0,
  useScroll: () => ({ scrollY: { set: jest.fn(), get: jest.fn() } }),
}))

// Mock intersection observer
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock resize observer
global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})