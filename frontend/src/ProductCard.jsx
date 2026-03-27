
import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/products")
      .then((res) => {
        setProducts(res.data.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No product</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded shadow"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
              </div>
              
            </div>
          ))}
        </div>
      )} */}

      <div className="m-4">
        {products.length === 0 ? (
        <p className="text-gray-500">No product</p>
      ) : (
        <table>
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">{product.price}</td>
              </tr>
            ))}
          </tbody>


        </table>
      )}
           {/* <table class="border-collapse border border-gray-400 ...">
                <thead>
                  <tr>
                    <th class="border p-4">product name</th>
                    <th class="border p-4">description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4"></td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4"></td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4"></td>
                    <td class="border p-4"></td>
                  </tr>
                </tbody>
           </table> */}
      </div>
      
    </div>
  );
}

export default ProductCard;