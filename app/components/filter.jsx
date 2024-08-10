const Filter = ({
  setDescription,
  setLocation,
  setFullTime,
  fullTime,
  fetchPositions,
}) => {
  const handleCheckboxChange = (event) => {
    setFullTime(event.target.checked);
  };

  return (
    <section className="container flex justify-between mt-8 items-end">
      <div className="w-full mr-6">
        <label className="font-bold mb-1 block">Job Description</label>
        <input
          type="text"
          className="w-full px-3 py-1 border border-gray-300 rounded"
          placeholder="Filter by title, benefits, companies, expertise"
          onChange={(e) => setDescription(e?.target?.value)}
        />
      </div>
      <div className="w-full mr-6">
        <label className="font-bold mb-1 block">Location</label>
        <input
          type="text"
          onChange={(e) => setLocation(e?.target?.value)}
          className="w-full px-3 py-1 border border-gray-300 rounded"
          placeholder="Filter by city, state, zip code or country"
        />
      </div>
      <div className="w-full flex items-center mb-2">
        <input
          className=""
          type="checkbox"
          value="full_time"
          id="full_time"
          checked={fullTime}
          onChange={handleCheckboxChange}
        />
        <label className="ml-2" htmlFor="full_time">
          Full Time Only
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={fetchPositions}
          className="px-4 py-2 text-white bg-slate-800"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Filter;
