import React, { Component } from "react";

function TableController(props) {
  let { elements, schema } = props;

  schema = formatSchema(schema);
  let header = createHeader(schema);
  let body = createBody(schema, elements);

  function formatSchema(schema) {
    for (let i = 0; i < schema.fields.length; i++) {
      if (typeof schema.fields[i] !== typeof {})
        schema.fields[i] = { property: schema.fields[i] };
    }

    return schema;
  }

  function createHeader(schema) {
    let result = [];

    if (schema.numeric)
      result.push("№");

    for (let i = 0; i < schema.fields.length; i++) {
      let temp = schema.fields[i];

      result.push(temp.name || temp.property);
    }

    if (schema.controls)
      result.push(schema.controls.name);

    return (
      <tr>
        {result.map((name) => <th key={name}>{name}</th>)}
      </tr>
    );
  }

  function createBody(schema, elements) {
    let result = [];

    for (let i = 0; i < elements.length; i++) {
      let elenemt = elements[i],
        row = [];

      if (schema.numeric)
        row.push(i + 1);

      for (let j = 0; j < schema.fields.length; j++) {
        let schemaFieldRule = schema.fields[j],
          elementProp = elenemt[schemaFieldRule.property];

        if (schemaFieldRule.path)
          elementProp = elementProp[schemaFieldRule.path];

        if (schemaFieldRule.format)
          elementProp = schemaFieldRule.format(elementProp);

        row.push(elementProp);
      }

      if (schema.controls) {
        let buttons = [];
        for (let j = 0; j < schema.controls.buttons.length; j++) {
          let buttonSchema = schema.controls.buttons[j];

          buttons.push(
            <button
              key={buttonSchema.name}
              onClick={buttonSchema.handler.bind(null, elenemt)}>
              {buttonSchema.name}
            </button>
          );
        }

        row.push(
          <div className="table-cuntroller_button-list">
            {buttons}
          </div>
        );
      }

      result.push(
        <tr key={elenemt._id}>
          {row.map((name, id) => <td key={id}>{name}</td>)}
        </tr>
      );
    } // elements 

    return result;
  }

  return (
    <table className="table-cuntroller">
      <thead className="table-cuntroller_header">
        {header}
      </thead>
      <tbody className="table-cuntroller_body">
        {body}
      </tbody>
    </table>
  );
}

export default TableController;
