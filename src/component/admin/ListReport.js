import concatAddress from 'helper/concatAddress';
import React, { useEffect, useState } from 'react';
import 'assets/css/approvalOwner.css';
import girlImg from 'assets/img/girl.jpg';
import axios from 'axios';
import authHeader from 'helper/auth-header';
import { Link } from 'react-router-dom';
import formatDate from 'helper/formatDate';

function ListReport({ loading, listItem }) {
  const [reportArr, setReportArr] = useState(listItem);
  if (loading) return <h2>Loading.....</h2>;

  return (
    <div className="ApprovalOwner">
      {reportArr.map(item => (
        <div className="ApprovalRow" key={item._id}>
          <div className="img">
            <img
              src={
                item.avatar ? `http://localhost:3001/${item.avatar}` : girlImg
              }
              alt=""
            />
          </div>
          <div className="username field">{item.report.author.username}</div>
          <div className="roomNotFound field">
            {item.report.roomNotFound && <i className="far fa-check"></i>}Không
            tìm thấy phòng
          </div>
          <div className="notAsDescribed field">
            {item.report.notAsDescribed ? (
              <i className="far fa-check"></i>
            ) : (
              <i className="fal fa-times"></i>
            )}
            Không giống mô tả
          </div>
          <div className="wrongAddress field">
            {item.report.wrongAddress ? (
              <i className="far fa-check"></i>
            ) : (
              <i className="fal fa-times"></i>
            )}
            Sai địa chỉ
          </div>
          <div className="other field">
            {item.report.other ? (
              <i className="far fa-check"></i>
            ) : (
              <i className="fal fa-times"></i>
            )}
            Lí do khác
          </div>
          <div className="field">{item.report.description}</div>
          <Link
            to={`/detail/${item.report.post._id}`}
            style={{ textDecoration: 'underline', color: 'blue' }}
          >
            <div className="field">{item.report.post._id}</div>
          </Link>
          <div className="date field">
            {formatDate(new Date(item.createdAt))}
          </div>
          <div className="rating field">{item.rating}</div>
        </div>
      ))}
    </div>
  );
}

export default ListReport;
