import React, { Component, type PropsWithChildren } from "react";

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<PropsWithChildren, State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="text-center p-4 text-red-600">
          <h2 className="text-xl font-semibold mb-2">Something went wrong.</h2>
          <button
            onClick={() => window.location.reload()}
            className="underline text-blue-500"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
