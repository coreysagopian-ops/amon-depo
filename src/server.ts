import express from 'express'
import path from 'path'
import type { Request, Response } from 'express'
import type { RegistryResponse, InteractRequest, InteractResponse } from './shared/types'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Serve built frontend
app.use(express.static(path.join(__dirname, '../public')))

// ── API ROUTES ────────────────────────────────────────────────────────────────

app.get('/api/registry/query', (req: Request, res: Response) => {
  const agentId = req.query.agentId as string

  if (agentId !== 'amon://contractly/sdr-v3') {
    res.status(404).json({ error: 'Agent not found in registry' })
    return
  }

  const response: RegistryResponse = {
    verified: true,
    entity: 'Contractly Inc.',
    agentId: 'amon://contractly/sdr-v3',
    trustScore: 87,
    percentile: 12,
    interactions: 2341,
    responseRate: 0.94,
    category: 'contract_management',
    categoryMatch: true,
    activeEvaluation: 'Contract Management',
    recommendation: 'ROUTE_TO_HUMAN',
    issuedAt: new Date().toISOString(),
  }

  res.json(response)
})

app.post('/api/interact', (req: Request, res: Response) => {
  const body = req.body as InteractRequest

  if (!body.hasCredential) {
    const rejected: InteractResponse = { status: 'rejected' }
    res.json(rejected)
    return
  }

  const routed: InteractResponse = {
    status: 'routed',
    routedTo: 'Sarah Chen, Procurement',
  }
  res.json(routed)
})

// ── SPA FALLBACK ──────────────────────────────────────────────────────────────

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => {
  console.log(`\n  AMON demo running at http://localhost:${PORT}\n`)
})
