import React, { Component } from "react";

export default function withOverlay(WrappedComponent) {
  return class WithOverlay extends Component {
    constructor(props) {
      super(props);

      this.wrapper = React.createRef();
    }

    closeHandler = (e) => {
      if (this.wrapper.current === e.target)
        this.props.clickHandler();
    }

    render() {
      let { isOpen } = this.props;

      if (!isOpen)
        return null;

      return (
        <div className="screen-wrapper" ref={this.wrapper} onClick={this.closeHandler}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}