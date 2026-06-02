import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { WidgetProvider } from "./WidgetProvider";
import type { WidgetConfig } from "./context";
import styles from "./styles.css?inline";

class GeoChatterElement extends HTMLElement {
  static observedAttributes = ["token", "api-url", "email", "theme"];

  private root: Root | null = null;
  private mountEl: HTMLDivElement | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // Inject styles into shadow DOM
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);

    // Create mount point
    this.mountEl = document.createElement("div");
    this.mountEl.id = "geochatter-root";
    this.mountEl.style.width = "100%";
    this.mountEl.style.height = "100%";
    shadow.appendChild(this.mountEl);

    // Apply theme
    const theme = this.getAttribute("theme");
    if (theme === "dark") {
      this.classList.add("dark");
    }

    this.renderReact();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = null;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === "theme") {
      if (newValue === "dark") {
        this.classList.add("dark");
      } else {
        this.classList.remove("dark");
      }
    }

    // Re-render on any attribute change
    if (this.mountEl) {
      this.renderReact();
    }
  }

  private getConfig(): WidgetConfig {
    return {
      token: this.getAttribute("token") || "",
      apiUrl: this.getAttribute("api-url") || "http://localhost:3003",
      email: this.getAttribute("email") || "",
      theme: (this.getAttribute("theme") as "light" | "dark") || "light",
      onAuthError: () => {
        this.dispatchEvent(
          new CustomEvent("auth-error", { bubbles: true, composed: true })
        );
      },
    };
  }

  private renderReact() {
    if (!this.mountEl) return;

    const config = this.getConfig();

    if (!this.root) {
      this.root = createRoot(this.mountEl);
    }

    this.root.render(
      React.createElement(WidgetProvider, { config })
    );
  }
}

customElements.define("geochatter-widget", GeoChatterElement);

export { GeoChatterElement };
