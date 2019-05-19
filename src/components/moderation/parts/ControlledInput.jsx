import React from "react";

export default function ControlledInput(props) {
  let attr = { ...props },
    controllerReg = attr.controller,
    handler = attr.onChange || (() => { });

  delete attr.controller;

  function controller(e) {
    let value = e.target.value,
      correntInput = controllerReg.test(value);

    if (correntInput)
      return handler(e);
  }

  return (
    <input {...attr} onChange={controller} />
  );
}