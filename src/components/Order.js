import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";
function Order({ id, amount, amountShipping, items, timestamp, images }) {
  console.log(items);
  return (
    <div className="relative border shadow-lg rounded-lg">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm">
        <div>
          <p className="font-bold text-xs text-blue-500">DATE: </p>
          <p>{moment.unix(timestamp).format("DD/MM/YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-blue-500">TOTAL: </p>
          <p>
            <Currency quantity={amount + amountShipping} currency="USD" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl seld-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, i) => (
            <img key={i} className="h-20 object-contain sm:h-32" src={image} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
