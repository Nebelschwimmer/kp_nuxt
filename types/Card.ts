
declare global {
  interface CardDetails {
    name: string;
    value?: string | number;
    type?: string;
    to?: string;
  }

  interface CardItem {
    title: string;
    subtitle?: string;
    text?: string;
    imageSrc?: string;
    height?: number;
    to?: string;
    variant?: string;
    color?: string;
  }

  interface ToolbarOptions {
    title: string;
    to?: string;
    color?: string;
    displayBackButton?: boolean;
    prependIcon?: string;
  }
}

