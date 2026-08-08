import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Optional label for recovery copy (e.g. "this page"). */
  scope?: string;
};

type State = {
  hasError: boolean;
};

/**
 * Last-resort UI when a render error or failed lazy chunk would otherwise
 * leave #root empty on a white page (desktop and mobile).
 */
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Bianca] UI error boundary", error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHome = () => {
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const scope = this.props.scope ?? "the salon";

    return (
      <div
        className="flex min-h-[100svh] flex-col items-center justify-center bg-[#faf8f5] px-6 py-16 text-center"
        role="alert"
        data-protected-page
      >
        <p className="font-editorial text-[11px] uppercase tracking-[0.22em] text-[#766d42]">
          Bianca Diamonds
        </p>
        <h1 className="mt-6 font-editorial text-[clamp(1.5rem,4vw,2.25rem)] tracking-[0.06em] text-[#1d3c34]">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-house-body leading-relaxed text-on-cream-body">
          We could not present {scope}. Please reload — your connection may have
          been interrupted, or a newer version of the site is available.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.handleReload}
            className="min-h-11 border border-[#1d3c34] bg-[#1d3c34] px-6 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#faf8f5] transition hover:bg-[#163029]"
          >
            Reload
          </button>
          <button
            type="button"
            onClick={this.handleHome}
            className="min-h-11 border border-[#766d42]/40 bg-transparent px-6 py-2.5 text-[10px] uppercase tracking-[0.18em] text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]"
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}
