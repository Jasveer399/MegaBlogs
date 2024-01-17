import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, lable, control, defaultValue = "" }) {
  return;
  <div className="w-full">
    {lable && <lable className="text-sm text-gray-600">{lable}</lable>}
  </div>;
}

export default RTE;
