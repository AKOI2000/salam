function SelectedWorksSkeleton() {
  const cards = Array.from({ length: 2 }, (_, index) => index);

  return (
    <div className="skeleton-group" style={{ gridTemplateColumns: `repeat(${Math.min(cards.length, 4)}, minmax(0, 1fr))` }}>
      {cards.map((card) => (
        <div key={card} className="skeleton-card" />
      ))}
    </div>
  );
}

export default SelectedWorksSkeleton;
