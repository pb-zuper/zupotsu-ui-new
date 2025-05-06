declare module 'react-flipcard' {
    import * as React from 'react';
  
    interface FlipCardProps {
      type?: 'horizontal' | 'vertical';
      disabled?: boolean;
      flipped?: boolean;
      onFlip?: (flipped: boolean) => void;
      onKeyDown?: (e: React.KeyboardEvent) => void;
    }
  
    export default class FlipCard extends React.Component<FlipCardProps> {}
  }
  