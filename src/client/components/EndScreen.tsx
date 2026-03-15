interface Props {
  visible: boolean
  onReset: () => void
}

export default function EndScreen({ visible, onReset }: Props) {
  return (
    <div className={`end-screen${visible ? ' visible' : ''}`}>
      <div className="end-glow" />
      <div className="end-logo">AMON</div>
      <div className="end-tag">The trust layer for the agent economy.</div>
      <div className="end-sub">Your agent should never start from zero.</div>
      <button className="btn btn-secondary" onClick={onReset}>
        ↺ Reset
      </button>
    </div>
  )
}
