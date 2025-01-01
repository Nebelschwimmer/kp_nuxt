
declare global {
  interface CardDetails {
    name: string;
    value: string | number;
    type?: string;
    icon?: string;
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

}

