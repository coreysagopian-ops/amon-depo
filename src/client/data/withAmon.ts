import type { DemoEvent } from '../../shared/types'

// Total runtime: ~13s from start, end screen at 13.2s
// Cards get space before and after — the contrast is emotional

export const withAmonEvents: DemoEvent[] = [
  // 0.3s — same opening
  { delay: 300,  side: 'left',  type: 'log', content: '▶ Initiating outbound to target account...', cls: 'bright' },
  { delay: 300,  side: 'right', type: 'log', content: '◀ Inbound agent interaction received',       cls: 'bright' },

  // 1.1s
  { delay: 1100, side: 'left',  type: 'log', content: '▶ Sending: company name, product category,', cls: 'normal' },
  { delay: 1100, side: 'left',  type: 'log', content: '   meeting request',                          cls: 'normal' },
  { delay: 1100, side: 'right', type: 'log', content: '◀ Checking identity...',                      cls: 'normal' },

  // 2.1s — buyer finds unknown, but something is different this time
  { delay: 2100, side: 'right', type: 'log', content: '   → Unknown',                                cls: 'dim'    },

  // 3.0s — credential attaches
  { delay: 3000, side: 'left',  type: 'log', content: '▶ Attaching: Amon Trust Credential',          cls: 'success' },

  // 3.9s — buyer detects it
  { delay: 3900, side: 'right', type: 'log', content: '◀ Amon credential detected',                  cls: 'success' },

  // 5.0s — passport card slides in (1.1s pause after credential detected)
  { delay: 5000, side: 'left',  type: 'passport-card' },

  // 6.4s — buyer queries while passport sits on screen
  { delay: 6400, side: 'right', type: 'log', content: '◀ Querying Amon Registry...',                 cls: 'warn'   },

  // 7.6s — registry card appears (1.2s after query)
  { delay: 7600, side: 'right', type: 'registry-card' },

  // 9.4s — both cards breathe on screen together, then gap
  { delay: 9400, side: 'left',  type: 'gap' },
  { delay: 9400, side: 'right', type: 'gap' },

  // 10.2s — submission, evaluation
  { delay: 10200, side: 'left',  type: 'log', content: '⏳ Credential submitted. Awaiting evaluation...', cls: 'warn'    },
  { delay: 10200, side: 'right', type: 'log', content: '✅ Trust threshold met',                           cls: 'success' },

  // 11.8s — routing confirmation
  { delay: 11800, side: 'left',  type: 'log', content: '✅ Routed to procurement team',               cls: 'success' },
  { delay: 11800, side: 'right', type: 'log', content: '✅ Routing to Sarah Chen, Procurement',       cls: 'success' },
]

export const ACT2_API_QUERY_DELAY  = 6800   // when to fire /api/registry/query
export const ACT2_API_INTERACT_DELAY = 11000  // when to fire /api/interact
export const ACT2_END_DELAY = 13200           // when end screen fades in
