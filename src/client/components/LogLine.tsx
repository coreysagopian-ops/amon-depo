import { useEffect, useRef } from 'react'
import type { DemoEvent } from '../../../shared/types'

interface Props {
  content: string
  cls?: DemoEvent['cls']
}

const clsMap: Record<string, string> = {
  dim:     'log-line dim',
  normal:  'log-line normal',
  bright:  'log-line bright',
  fail:    'log-line fail',
  success: 'log-line success',
  warn:    'log-line warn',
}

export default function LogLine({ content, cls = 'normal' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('visible'))
  }, [])

  return (
    <div ref={ref} className={clsMap[cls] ?? 'log-line normal'}>
      {content}
    </div>
  )
}
