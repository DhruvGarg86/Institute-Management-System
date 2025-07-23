import React from "react";
import styles from "./Notice.module.css";

const Notice = ({ notice }) => {
  const { title, description, created_at } = notice;

  return (
    <div className={`card mb-2 p-2 border-0 shadow-sm ${styles.noticeCardHover}`}>
      <div className="card-body py-2 px-3">
        <h6 className="card-title mb-1 fw-semibold text-dark">{title}</h6>
        <p className="card-text mb-1 small text-secondary">{description}</p>
        <p className="card-text text-end mb-0">
          <small className="text-muted">
            {new Date(created_at).toDateString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default Notice;
