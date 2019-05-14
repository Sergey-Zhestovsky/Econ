import React from "react";
import SampleElement from "./parts/SampleElement";

import "../../css/sampleList.css";

export default function SampleList(props) {
  return (
    <div className="sample-list">
      <SampleElement />
      <SampleElement />
      <SampleElement />
      <div className="sample-list_more-btn">
        <div className="sample-list_more-btn-text">
          <span>Learn more</span>
          <i class="fas fa-long-arrow-alt-right"></i>
        </div>
      </div>
    </div>
  );
}