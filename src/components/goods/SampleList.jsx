import React from "react";
import SampleElement from "./parts/SampleElement";
import { Link } from "react-router-dom";

import "../../css/sampleList.css";

export default function SampleList(props) {
  let elementList = props.elements && props.elements.reverse().map(
    el => <SampleElement key={el._id} element={el} />
    ).splice(0, 3);

  return (
    <div className="sample-list">
      { elementList }
      <div className="sample-list_more-btn">
        <Link to="/selector" className="sample-list_more-btn-text">
          <span>Learn more</span>
          <i className="fas fa-long-arrow-alt-right"></i>
        </Link>
      </div>
    </div>
  );
}