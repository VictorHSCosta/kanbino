/**
 * TypeScript types for landing page components
 */

export interface FeatureProps {
  icon: string
  title: string
  description: string
}

export interface TechStackProps {
  name: string
  version: string
  category: 'backend' | 'frontend' | 'testing' | 'tools'
  color: string
}

export interface NavLinkProps {
  label: string
  href: string
}

export interface NavigationProps {
  onNavigate?: (section: string) => void
}
