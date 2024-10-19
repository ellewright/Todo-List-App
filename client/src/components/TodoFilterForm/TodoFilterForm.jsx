import "./TodoFilterForm.css"

export default function TodoFilterForm({ filter, setFilter, hideCompleted, setHideCompleted }) {
    return (
        <>
            <div className="filter-form">
                <div className="filter-form-group">
                    <label htmlFor="name"></label>
                    <input
                        type="text"
                        id="name"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search"
                    />
                </div>
                <label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={hideCompleted}
                            onChange={(e) => setHideCompleted(e.target.checked)}
                        />
                        <p>Hide Completed</p>
                    </div>
                </label>
            </div>
        </>
    )
}