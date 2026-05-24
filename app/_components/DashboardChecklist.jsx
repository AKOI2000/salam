function DashboardChecklist({ text, action, confirmed = false }) {
  return (
    <div className="section-checklist">
      <h5>{text}</h5>
      <form action="">
        <input type="checkbox" name="" id="" defaultChecked={confirmed} />
        <button className="btn-dashboard-primary small">Confirm</button>
      </form>
    </div>
  );
}

export default DashboardChecklist;
