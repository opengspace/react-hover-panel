import * as React from 'react';

export interface PanelIcon {
  icon: React.ReactNode;
  tooltip?: string;
}

export type IconProp = React.ReactNode | PanelIcon;

export interface Position {
  x: number;
  y: number;
}

export type Boundary = 'window' | 'parent' | 'none';

export interface FloatingPanelProps {
  // Content
  children?: React.ReactNode;

  // Icon regions (top-left, top-center, top-right, bottom-left, bottom-right)
  topLeft?: IconProp;
  topCenter?: IconProp;
  topRight?: IconProp;
  bottomLeft?: IconProp;
  bottomRight?: IconProp;

  // Size control
  width?: number | string;
  topPadding?: number;
  bottomPadding?: number;
  edgeMargin?: number;

  // Behavior control
  draggable?: boolean;
  defaultPosition?: Position;
  boundary?: Boundary;

  // Opacity settings
  idleOpacity?: number;
  activeOpacity?: number;
  opacityTransitionDuration?: number;

  // Visual style
  roundedCorners?: boolean;
  shadow?: boolean;

  // Event callbacks
  onClose?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (position: Position) => void;
  onVisibilityChange?: (isVisible: boolean) => void;

  // Minimize to sidebar
  minimizable?: boolean;
  minimizeIcon?: React.ReactNode | string;
  minimizeTooltip?: string;
  defaultMinimized?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;

  // Other
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}

export declare const FloatingPanel: React.ForwardRefExoticComponent<
  FloatingPanelProps & React.RefAttributes<HTMLDivElement>
>;

export default FloatingPanel;
