import React from "react";
import Notice from "./Notice";
const NoticeList = ({ notices }) => (
  <div className="space-y-4 p-4">
    {notices.map((notice) => (
      <Notice key={notice._id} notice={notice} />
    ))}
  </div>
);

export default NoticeList;
