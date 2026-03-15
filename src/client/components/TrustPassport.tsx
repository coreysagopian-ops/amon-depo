import { useEffect, useRef } from 'react'

export default function TrustPassport() {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    requestAnimationFrame(() => {
      el.classList.add('visible')
      setTimeout(() => {
        if (barRef.current) barRef.current.style.width = '87%'
      }, 200)
    })
  }, [])

  return (
    <div ref={ref} className="card passport">
      <div className="card-title">
        <div className="cdot" />
        Amon Trust Passport
      </div>
      <div className="card-row">
        <div className="clabel">Verified Entity</div>
        <div className="cval">Contractly Inc.</div>
      </div>
      <div className="card-row">
        <div className="clabel">Agent ID</div>
        <div className="cval dim-val">amon://contractly/sdr-v3</div>
      </div>
      <div className="card-row">
        <div className="clabel">Trust Score</div>
        <div className="score-wrap">
          <div className="bar-bg">
            <div ref={barRef} className="bar-fill" />
          </div>
          <div className="snum">87</div>
          <div className="smax">/100</div>
        </div>
      </div>
      <div className="card-row">
        <div className="clabel">Interactions</div>
        <div className="cval green">2,341 verified</div>
      </div>
      <div className="card-row">
        <div className="clabel">Response Rate</div>
        <div className="cval green">94%</div>
      </div>
      <div className="card-row">
        <div className="clabel">Category</div>
        <div className="cval">Contract Management</div>
      </div>
      <div className="card-row">
        <div className="clabel">Buyer Relevance</div>
        <div className="cval amber">HIGH</div>
      </div>
    </div>
  )
}
