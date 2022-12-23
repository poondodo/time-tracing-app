function CountToday({ count }) {
    const DISPLAYTYPE = {
        "study": "Study",
        "work-out": "Work Out",
        "trafic": "Trafic",
        "dining": "Dining",
        "shopping": "Shopping",
        "social-media": "Social Media",
        "watch-series": "Watch Series",
        "house-work": "House Work",
      };
  return (
    <div className="count-content">
      <ul className="count-all-type">
        {Object.values(count).map((countItem, index) => (
          <li className={`count-${countItem.type}`} key={index}>
            <div className={`shape-${countItem.type}`} style={{height:countItem.countTime, width:50}}></div>
            {DISPLAYTYPE[countItem.type]}: {countItem.countTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CountToday;
