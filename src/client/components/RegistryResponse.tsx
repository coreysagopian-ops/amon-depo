import { useEffect, useRef } from 'react'

export default function RegistryResponse() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('visible'))
  }, [])

  return (
    <div ref={ref} className="card registry">
      <div className="card-title">
        <div className="cdot" />
        Amon Registry Response
      </div>
      <div className="card-row">
        <div className="clabel">Entity Verified</div>
        <div className="cval green">Contractly Inc. ✓</div>
      </div>
      <div className="card-row">
        <div className="clabel">Trust Score</div>
        <div className="cval green">87 — Top 12%</div>
      </div>
      <div className="card-row">
        <div className="clabel">Interaction History</div>
        <div className="cval green">Clean</div>
      </div>
      <div className="card-row">
        <div className="clabel">Category Match</div>
        <div className="cval green">YES</div>
      </div>
      <div className="card-row">
        <div className="clabel">Active Evaluation</div>
        <div className="cval">Contract Management</div>
      </div>
      <div className="card-row">
        <div className="clabel">Recommendation</div>
        <div className="cval green mono-sm">ROUTE TO HUMAN</div>
      </div>
    </div>
  )
}
