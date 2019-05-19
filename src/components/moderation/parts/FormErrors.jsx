import React from "react";

const errorMessages = {
  "required": "Field is required",
  "maxSize": "Maximum number of characters exceeded",
  "imageType": "File should be image",
  "imageSize": "File to big",
  "number": "Value should be number",
  "min": "Value to small",
  "max": "Value to big",
}

export default function FormErrors(props) {
  let errorBlocks = [];

  for (let error in props.errors) {
    let errorArray = props.errors[error];

    for (let i = 0; i < 1; i++) {
      errorBlocks.push(
        <div className="form-error_block" key={`${error}:${i}`}>
          <div className="form-error_block-title">{error}:</div>
          <div className="form-error_block-message">{errorMessages[props.errors[error][i]]}</div>
        </div>
      );
    }
  }

  return (
    <div className="form-error">
      {errorBlocks}
    </div>
  );
}