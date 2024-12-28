declare global {
  interface ToolbarOptions {
    displayBackButton?: boolean;
    prependIcon?: string;
    color?: string;
    appendIcon?: string;
    breadcrumbs?: Breadcrumb[];
  }
  interface ImgPlaceholderOptions {
    displayTitle: boolean;
    title?: string;
  }
  interface ImgOptions {
    shaded?: boolean;
    height?: number|string;
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
  
  interface Breadcrumb {
		href: string;
		title: string;
		disabled?: boolean;
	}
}
