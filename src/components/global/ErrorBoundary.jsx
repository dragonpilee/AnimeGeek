import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errMsg: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errMsg: error?.message };
  }

  render() {
    if (this.state.hasError) {
      return React.Children.map(this.props.fallback, (child) => {
        return React.cloneElement(child, { error: this.state?.errMsg });
      });
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
