"use client";
import React, { useState } from "react";
import GradientColorPicker from "react-best-gradient-color-picker";

const ColorPickerComponent = ({gradient,setGradient}:{gradient:any,setGradient:any}) => {
    console.log('gradient  ',gradient)
  return (
    <div className="flex justify-start align-top items-start gap-5 mt-5">
      
      <GradientColorPicker height={150} value={gradient} onChange={setGradient} />

      {/* Displaying the selected gradient */}
      <div
        style={{
          width: "500px",
          height: "300px",
          background: gradient,
          marginTop: "20px",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
};

export default ColorPickerComponent;
