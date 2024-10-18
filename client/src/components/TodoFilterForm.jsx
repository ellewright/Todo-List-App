export default function TodoFilterForm({ filter, setFilter, hideCompleted, setHideCompleted }) {
    return (
        <>
            <div className="filter-form">
                <div className="filter-form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <label>
                    <input
                        type="checkbox"
                        checked={hideCompleted}
                        onChange={(e) => setHideCompleted(e.target.checked)}
                    />
                    Hide Completed
                </label>
            </div>
        </>
    )
}