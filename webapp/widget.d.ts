// Type declarations for the <geochatter-widget> custom element

export interface GeoChatterWidgetAttributes {
  /** JWT token for authenticating API requests */
  token: string;
  /** Base URL of the GeoChatter API (e.g., "https://api.example.com") */
  "api-url": string;
  /** Email address of the authenticated user */
  email: string;
  /** Color theme: "light" or "dark" */
  theme?: "light" | "dark";
}

// Augment JSX for React hosts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "geochatter-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & GeoChatterWidgetAttributes,
        HTMLElement
      >;
    }
  }

  interface HTMLElementTagNameMap {
    "geochatter-widget": HTMLElement;
  }
}

export {};
