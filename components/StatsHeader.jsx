export default function StatsHeader({ ordersToday, ordersWeek, ordersMonth }) {
    return (
        <div className="tile-grid">
            <div className="tile">
                <h3 className="tile-header ">Today</h3>
                <div className="tile-number">{ordersToday.length}</div>
                <div className="tile-desc">
                    {ordersToday.length} Orders today
                </div>
            </div>
            <div className="tile">
                <h3 className="tile-header ">This week</h3>
                <div className="tile-number">{ordersWeek.length}</div>
                <div className="tile-desc">
                    {ordersWeek.length} Orders this week
                </div>
            </div>
            <div className="tile">
                <h3 className="tile-header ">This month</h3>
                <div className="tile-number">{ordersMonth.length}</div>
                <div className="tile-desc">
                    {ordersMonth.length} Orders this month
                </div>
            </div>
        </div>
    );
}
