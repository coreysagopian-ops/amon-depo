import { useState, useRef, useCallback } from 'react'
import AgentPanel from './AgentPanel'
import EndScreen from './EndScreen'
import type { PanelItem } from './AgentPanel'
import { withoutAmonEvents, ACT1_DURATION } from '../data/withoutAmon'
import { withAmonEvents, ACT2_API_QUERY_DELAY, ACT2_API_INTERACT_DELAY, ACT2_END_DELAY } from '../data/withAmon'

type Phase = 'idle' | 'act1-running' | 'act1-done' | 'act2-running' | 'act2-done'

let idCounter = 0
const uid = () => `item-${idCounter++}`

export default function DemoRunner() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [leftItems, setLeftItems]   = useState<PanelItem[]>([])
  const [rightItems, setRightItems] = useState<PanelItem[]>([])
  const [dividerMsg, setDividerMsg] = useState('')
  const [showDivider, setShowDivider] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [phaseLabel, setPhaseLabel] = useState('Agent Trust Infrastructure — Demo')

  const tids = useRef<ReturnType<typeof setTimeout>[]>([])

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    tids.current.push(id)
  }

  const clearAll = () => {
    tids.current.forEach(clearTimeout)
    tids.current = []
  }

  const pushLeft  = (item: PanelItem) => setLeftItems(prev => [...prev, item])
  const pushRight = (item: PanelItem) => setRightItems(prev => [...prev, item])

  const runAct1 = useCallback(() => {
    setPhase('act1-running')
    setPhaseLabel('Act 1 — Without Amon')
    setLeftItems([]); setRightItems([])
    setShowDivider(false); setDividerMsg('')

    for (const ev of withoutAmonEvents) {
      const push = ev.side === 'left' ? pushLeft : pushRight

      if (ev.type === 'gap') {
        schedule(() => push({ id: uid(), kind: 'gap' }), ev.delay)
      } else if (ev.type === 'log' && ev.content) {
        const snap = { content: ev.content, cls: ev.cls }
        schedule(() => push({ id: uid(), kind: 'log', ...snap }), ev.delay)
      }
    }

    schedule(() => {
      setDividerMsg('Every agent interaction today starts from zero.')
      setShowDivider(true)
      setPhase('act1-done')
    }, ACT1_DURATION)
  }, [])

  const runAct2 = useCallback(() => {
    setPhase('act2-running')
    setPhaseLabel('Act 2 — With Amon')
    setLeftItems([]); setRightItems([])
    setShowDivider(false)

    for (const ev of withAmonEvents) {
      const push = ev.side === 'left' ? pushLeft : pushRight

      if (ev.type === 'gap') {
        schedule(() => push({ id: uid(), kind: 'gap' }), ev.delay)
      } else if (ev.type === 'log' && ev.content) {
        const snap = { content: ev.content, cls: ev.cls }
        schedule(() => push({ id: uid(), kind: 'log', ...snap }), ev.delay)
      } else if (ev.type === 'passport-card') {
        schedule(() => pushLeft({ id: uid(), kind: 'passport-card' }), ev.delay)
      } else if (ev.type === 'registry-card') {
        schedule(() => pushRight({ id: uid(), kind: 'registry-card' }), ev.delay)
      }
    }

    // Real API calls — visible in browser Network tab
    schedule(() => {
      fetch('/api/registry/query?agentId=amon://contractly/sdr-v3').catch(() => {})
    }, ACT2_API_QUERY_DELAY)

    schedule(() => {
      fetch('/api/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: 'amon://contractly/sdr-v3',
          target: 'enterprise-procurement',
          hasCredential: true,
        }),
      }).catch(() => {})
    }, ACT2_API_INTERACT_DELAY)

    schedule(() => {
      setShowEnd(true)
      setPhase('act2-done')
    }, ACT2_END_DELAY)
  }, [])

  const reset = useCallback(() => {
    clearAll()
    setPhase('idle')
    setPhaseLabel('Agent Trust Infrastructure — Demo')
    setLeftItems([]); setRightItems([])
    setDividerMsg(''); setShowDivider(false)
    setShowEnd(false)
  }, [])

  const btnDisabled = phase === 'act1-running' || phase === 'act2-running'

  return (
    <div id="app">
      {/* Top bar */}
      <div className="top-bar">
        <div className="logo">AMON<span>.</span></div>
        <div className="phase-label" id="phaseLabel">{phaseLabel}</div>
        <div className="phase-label">R&amp;D Session 1 // March 2026</div>
      </div>

      {/* Main area */}
      <div className="demo-area">
        <div className="panels">
          <AgentPanel
            side="left"
            title="SellerBot"
            sub="Contractly Inc. // SDR-v3"
            items={leftItems}
          />
          <AgentPanel
            side="right"
            title="Gatekeeper"
            sub="Buyer-side agent // Enterprise Procurement"
            items={rightItems}
          />
        </div>

        <div className="divider-wrap">
          <div className={`divider-msg${showDivider ? ' visible' : ''}`}>
            {dividerMsg}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        {phase === 'idle' && (
          <button className="btn btn-primary" onClick={runAct1} disabled={btnDisabled}>
            ▶ Run Without Amon
          </button>
        )}
        {phase === 'act1-running' && (
          <button className="btn btn-primary" disabled>
            ▶ Run Without Amon
          </button>
        )}
        {phase === 'act1-done' && (
          <button className="btn btn-primary" onClick={runAct2} disabled={btnDisabled}>
            ▶ Run With Amon
          </button>
        )}
        {(phase === 'act2-running' || phase === 'act2-done') && (
          <button className="btn btn-primary" disabled>
            ▶ Run With Amon
          </button>
        )}
      </div>

      <EndScreen visible={showEnd} onReset={reset} />
    </div>
  )
}
