function LeadsDetailSelect({ status }) {
  return (
    <form className="leads-detail-select">
      <h5>Status</h5>
      <select name="status" id="status" defaultValue={status}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>

      <button type="submit">Update Status</button>
    </form>
  );
}

export default LeadsDetailSelect;
