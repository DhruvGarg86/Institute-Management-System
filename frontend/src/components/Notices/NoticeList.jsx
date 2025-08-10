const NoticeList = ({ notices }) => (
  console.log(notices),
  <div className="space-y-4 p-4">
    {notices.length > 0 ? (
      notices.map((n) => {
        const path = n.filePath?.startsWith("http")
          ? n.filePath
          : `http://localhost:8080${n.filePath}`;
        return (
          <div className="row2-second-notice-item" key={n.date + n.title}>
            <p style={{ marginBottom: "0px" }}>{n.date}</p>
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "1.2rem",
                marginBottom: "0px",
                fontWeight: "bold",
                display: "inline-block",
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1a73e8")} // hover color
              onMouseLeave={(e) => (e.target.style.color = "inherit")}
              dangerouslySetInnerHTML={{ __html: n.title }}
            />
            <p
              style={{ fontSize: "0.8rem", marginBottom: "0px" }}
              dangerouslySetInnerHTML={{ __html: n.description }}
            />
          </div>
        );
      })
    ) : (
      <p style={{ textAlign: "center", color: "gray" }}>No notices available</p>
    )}
  </div>
);

export default NoticeList;
