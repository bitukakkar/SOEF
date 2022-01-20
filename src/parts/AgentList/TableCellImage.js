import React from "react";
import { getTableCellImage, validateIsSvgFile } from "../../utils";

const TableCellImage = function ({ genus }) {
  const Image = getTableCellImage(genus);
  return (
    <div className={`image_circle_div bg_${genus}`}>
      {validateIsSvgFile(Image) ? (
        <Image className="image_circle_image" />
      ) : (
        <img src={Image} alt="car" className="image_circle_image" />
      )}
    </div>
  );
};

export default TableCellImage;
