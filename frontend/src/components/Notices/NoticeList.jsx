import React from "react";
import Notice from "./Notice";
import styles from "./Notice.module.css";

const NoticeList = ({ notices }) => {
  return (
    <>
      <div className={`p-3 ${styles.bgColor}`}>
        <h1>NOTICES</h1>
        <div
          className="notice-list overflow-auto"
          style={{ maxHeight: "500px" }}
        >
          {notices.map((notice) => (
            <Notice key={notice._id} notice={notice} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NoticeList;
