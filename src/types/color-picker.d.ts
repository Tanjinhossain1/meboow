
declare module "react-gradient-color-picker" {
    import React from "react";
  
    interface GradientPickerProps {
      gradient: {
        start: string;
        end: string;
        angle: number;
      };
      onChange: (newGradient: { start: string; end: string; angle: number }) => void;
      showAnglePicker?: boolean;
      showStartEndPickers?: boolean;
      angle?: number;
    }
  
    export const GradientPicker: React.FC<GradientPickerProps>;
  }
  