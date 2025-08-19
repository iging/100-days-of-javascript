import React from "react";
import Player from "./components/Player";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
          <h1 className="text-xl font-bold mb-4">Something went wrong.</h1>
          <details className="bg-gray-800 p-4 rounded-lg w-full max-w-2xl">
            <summary className="cursor-pointer">Show error details</summary>
            <pre className="mt-2 text-red-400 overflow-auto text-sm">
              {this.state.error && this.state.error.toString()}
            </pre>
            <pre className="mt-2 text-gray-400 overflow-auto text-xs">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-400 p-4">
        <Player />
      </div>
    </ErrorBoundary>
  );
};

export default App;
