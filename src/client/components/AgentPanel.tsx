import { useEffect, useRef } from 'react'
import LogLine from './LogLine'
import TrustPassport from './TrustPassport'
import RegistryResponse from './RegistryResponse'

export type PanelItem =
  | { id: string; kind: 'log'; content: string; cls?: 'dim' | 'normal' | 'bright' | 'fail' | 'success' | 'warn' }
  | { id: string; kind: 'gap' }
  | { id: string; kind: 'passport-card' }
  | { id: string; kind: 'registry-card' }

interface Props {
  side: 'left' | 'right'
  title: string
  sub: string
  items: PanelItem[]
}

export default function AgentPanel({ side, title, sub, items }: Props) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [items])

  return (
    <div className={`panel ${side}`}>
      <div className="panel-header">
        <div className="panel-dot" />
        <div className="panel-title">{title}</div>
        <div className="panel-sub">{sub}</div>
      </div>
      <div className="log-area" ref={logRef}>
        {items.map((item) => {
          if (item.kind === 'log') {
            return <LogLine key={item.id} content={item.content} cls={item.cls} />
          }
          if (item.kind === 'gap') {
            return <div key={item.id} className="log-gap" />
          }
          if (item.kind === 'passport-card') {
            return <TrustPassport key={item.id} />
          }
          if (item.kind === 'registry-card') {
            return <RegistryResponse key={item.id} />
          }
          return null
        })}
      </div>
    </div>
  )
}
