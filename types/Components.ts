declare global {
  interface ToolbarAction {
    type: string;
    title: string;
    icon: string;
    disabled?: boolean;
    to?: string;
  }

  interface Breadcrumb {
    to: string;
    title: string;
    icon?: string;
    disabled?: boolean;
  }

  interface ToolbarOptions {
    displayBackButton?: boolean;
    prependIcon?: string;
    color?: string;
    appendIcon?: string;
    breadcrumbs?: Breadcrumb[];
    actions?: ToolbarAction[];
  }
  interface ImgPlaceholderOptions {
    displayTitle: boolean;
    title?: string;
  }
  interface ImgOptions {
    shaded?: boolean;
    height?: number | string;
    cover?: boolean;
    class?: string;
    aspectRatio?: number | string;
    clickable?: boolean;
    removable?: boolean;
    uploaded?: boolean;
    placeholderOptions?: ImgPlaceholderOptions;
  }

  interface ActionBtnProps {
    type: string;
    color?: string;
    size?: string;
    icon?: string;
    showLabel?: boolean;
    variant?: string;
    disabled?: boolean;
    to?: string;
  }

  interface ActorObj {
    id: number;
    name: string;
    photo: string;
  }

  interface galleryContent {
    poster: string;
    gallery: string[];
  }
}
