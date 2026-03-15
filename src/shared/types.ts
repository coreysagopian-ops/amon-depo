export interface DemoEvent {
  delay: number
  side: 'left' | 'right' | 'center'
  type: 'log' | 'gap' | 'passport-card' | 'registry-card'
  content?: string
  cls?: 'dim' | 'normal' | 'bright' | 'fail' | 'success' | 'warn'
}

export interface RegistryResponse {
  verified: boolean
  entity: string
  agentId: string
  trustScore: number
  percentile: number
  interactions: number
  responseRate: number
  category: string
  categoryMatch: boolean
  activeEvaluation: string
  recommendation: string
  issuedAt: string
}

export interface InteractRequest {
  agentId: string
  target: string
  hasCredential: boolean
}

export interface InteractResponse {
  status: 'rejected' | 'routed'
  routedTo?: string
}
