import React, { Component } from "react";

class TableController extends Component {
  constructor(props) {
    super(props);

    let { elements, schema } = props;
    console.log(elements, schema);

    schema = this.formatSchema(schema);
    this.header = this.createHeader(schema);
    this.body = this.createBody(schema, elements);

    console.log(this.header, this.body);
  }

  formatSchema(schema) {
    for (let i = 0; i < schema.fields.length; i++) {
      if (typeof schema.fields[i] !== typeof {})
        schema.fields[i] = { property: schema.fields[i] };
    }

    return schema;
  }

  createHeader(schema) {
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

  createBody(schema, elements) {
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
          {row.map((name) => <td key={name}>{name}</td>)}
        </tr>
      );
    } // elements 

    return result;
  }

  render() {
    return (
      <table className="table-cuntroller">
        <thead className="table-cuntroller_header">
          {this.header}
        </thead>
        <tbody className="table-cuntroller_body">
          {this.body}
        </tbody>
      </table>
    );
  }
}

export default TableController;
