const NoticeList = ({ notices }) => (
  <div className="space-y-4 p-4">
    {notices.length > 0 ? (
      notices.map((n) => (
        <a
          href="/admin/display-notices"
          className="admin-dashboard-notice-link"
          key={n.id}
        >
          <div className="row2-second-notice-item">
            <p style={{ marginBottom: "0px" }}>{n.date}</p>
            <p
              style={{ fontSize: "1.2rem", marginBottom: '0px', fontWeight: "bold" }}
              dangerouslySetInnerHTML={{ __html: n.title }}
            />
            <p
              style={{ fontSize: "0.8rem", marginBottom: '20px' }}
              dangerouslySetInnerHTML={{ __html: n.description }}
            />
            
          </div>
        </a>
      ))
    ) : (
      <p style={{ textAlign: "center", color: "gray" }}>No notices available</p>
    )}
  </div>
);

export default NoticeList;
