export default function TableHeader({filter,setFilter,studentNumber}) {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{ fontSize: "22px", fontWeight: "bold", marginRight: "10px", alignSelf: 'flex-end' }}
      >
        Total Student Number : <span style={{fontSize: '20px' , fontWeight: '500'}}>{studentNumber}</span>
      </div>
      <form
        action=""
        style={{
          width: "",
          padding: "10px 0 ",
          borderRadius: "5px",
          backgroundColor: "#ddd",
          display: "flex",
          alignItems: "center",
        }}
      >
        <i
          className="bi bi-search"
          style={{ margin: "0 10px", color: "gray", fontWeight: "bold" }}
        ></i>
        <input
          type="search"
          id="search"
          style={{
            backgroundColor: "transparent",
            fontWeight: "500",
            color: "gray",
          }}
          placeholder="Search anything..."
          value={filter || ''}
          onChange={(e) => {setFilter(e.target.value)}}
        />
        <button
          style={{
            padding: "3px 20px",
            margin: "0px 10px",
            border: "none",
            color: "white",
            backgroundColor: "#066599",
            borderRadius: "2.4px",
          }}
        >
          Search
        </button>
      </form>
    </section>
  );
}
