import type { DemoEvent } from '../../shared/types'

// Total runtime: ~15 seconds
// Each empty check hangs before the "None found" — cold and flat

export const withoutAmonEvents: DemoEvent[] = [
  // 0.3s — both agents wake
  { delay: 300,  side: 'left',  type: 'log', content: '▶ Initiating outbound to target account...', cls: 'bright' },
  { delay: 300,  side: 'right', type: 'log', content: '◀ Inbound agent interaction received',       cls: 'bright' },

  // 1.1s — seller sends payload, buyer starts checking
  { delay: 1100, side: 'left',  type: 'log', content: '▶ Sending: company name, product category,', cls: 'normal' },
  { delay: 1100, side: 'left',  type: 'log', content: '   meeting request',                          cls: 'normal' },
  { delay: 1100, side: 'right', type: 'log', content: '◀ Checking identity...',                      cls: 'normal' },

  // 2.0s — identity check lands empty, hang
  { delay: 2000, side: 'right', type: 'log', content: '   → Unknown',                                cls: 'warn'   },

  // 3.0s — seller has nothing, buyer checks interactions
  { delay: 3000, side: 'left',  type: 'log', content: '▶ Identity credential: none',                 cls: 'dim'    },
  { delay: 3000, side: 'right', type: 'log', content: '◀ Checking prior interactions...',            cls: 'normal' },

  // 4.0s — hang
  { delay: 4000, side: 'right', type: 'log', content: '   → None found',                             cls: 'dim'    },

  // 5.0s — seller exposes more nothing, buyer checks reputation
  { delay: 5000, side: 'left',  type: 'log', content: '▶ Interaction history: none',                 cls: 'dim'    },
  { delay: 5000, side: 'right', type: 'log', content: '◀ Checking reputation data...',               cls: 'normal' },

  // 6.0s — hang
  { delay: 6000, side: 'right', type: 'log', content: '   → None found',                             cls: 'dim'    },

  // 7.0s — seller, buyer checks trust signals
  { delay: 7000, side: 'left',  type: 'log', content: '▶ Reputation signal: none',                   cls: 'dim'    },
  { delay: 7000, side: 'right', type: 'log', content: '◀ Checking trust signals...',                 cls: 'normal' },

  // 8.0s — final hang before verdict
  { delay: 8000, side: 'right', type: 'log', content: '   → None found',                             cls: 'dim'    },

  // 9.0s — visual gap, silence
  { delay: 9000, side: 'left',  type: 'gap' },
  { delay: 9000, side: 'right', type: 'gap' },

  // 9.8s — waiting
  { delay: 9800, side: 'left',  type: 'log', content: '⏳ Awaiting response...',                      cls: 'warn'   },
  { delay: 9800, side: 'right', type: 'log', content: '⚠  Decision: Insufficient data to evaluate',  cls: 'warn'   },

  // 11.0s — gap, then the cold verdict
  { delay: 11000, side: 'left',  type: 'gap' },
  { delay: 11000, side: 'right', type: 'gap' },

  { delay: 11800, side: 'left',  type: 'log', content: '❌ Connection terminated',                    cls: 'fail'   },
  { delay: 11800, side: 'right', type: 'log', content: '❌ Action: REJECT',                           cls: 'fail'   },

  { delay: 12600, side: 'left',  type: 'log', content: '❌ No feedback provided',                     cls: 'fail'   },
  { delay: 12600, side: 'right', type: 'log', content: '❌ Classification: Indistinguishable from spam', cls: 'fail' },

  { delay: 13400, side: 'left',  type: 'log', content: '❌ Reason: unknown',                          cls: 'fail'   },
  { delay: 13400, side: 'right', type: 'log', content: '❌ Agent blocked. No human notified.',        cls: 'fail'   },
]

export const ACT1_DURATION = 14800
