"use client";
import { Component, ErrorInfo, ReactNode } from "react";

type FallbackRenderArgs = {
  error: Error;
  reset: () => void;
};

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackRender?: (args: FallbackRenderArgs) => ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  private reset = () => this.setState({ hasError: false, error: undefined });

  render() {
    const { hasError, error } = this.state;
    const { children, fallback, fallbackRender } = this.props;

    if (hasError) {
      if (fallbackRender && error) {
        return fallbackRender({ error, reset: this.reset });
      }
      if (fallback) return fallback;
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
