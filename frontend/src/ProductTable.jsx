import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        lowStockThreshold: '',
        category: '',
        warranty: ''
    });

  
    const fetchProducts = () => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:5001/api/products', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res.data);
                setProducts(res.data.data?.products || []);
            })
            .catch((err) => console.log(err));
    };

  
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
        alert("Please login first! No token found.");
        return;
    }

        axios
            .post('http://localhost:5001/api/products', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                console.log(res.data);
                setShow(false);
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    lowStockThreshold: '',
                    category: '',
                    warranty: ''
                });
                fetchProducts();
                alert("Product saved successfully!");
            })
            .catch((err) => {
                console.log(err);
                if (err.response?.status === 401) {
                alert("Invalid or expired token. Please login again.");
            } else {
                alert("Failed to save: " + (err.response?.data?.message || err.message));
            }
            });
    };

    return (
        <div className='m-4'>
            <div className='m-4 flex gap-4'>
                <p className='text-3xl'>Product Table</p>
                <button
                    onClick={() => setShow(true)}
                    className='border p-2 rounded bg-blue-400 hover:bg-blue-500 text-white'
                >
                    Add Product
                </button>
            </div>

            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <table className='border border-collapse w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border p-4'>Name</th>
                            <th className='border p-4'>Description</th>
                            <th className='border p-4'>Price</th>
                            <th className='border p-4'>Low Stock Threshold</th>
                            <th className='border p-4'>Category</th>
                            <th className='border p-4'>Warranty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className='border p-4'>{product.name}</td>
                                <td className='border p-4'>{product.description}</td>
                                <td className='border p-4'>{product.price}</td>
                                <td className='border p-4'>{product.lowStockThreshold}</td>
                                <td className='border p-4'>{product.category}</td>
                                <td className='border p-4'>{product.warranty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {show && (
                <div className="fixed inset-0 bg-gray-200/80 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-96 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Low Stock Threshold"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.lowStockThreshold}
                                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Warranty"
                                className="border p-2 w-full mb-2"
                                required
                                value={formData.warranty}
                                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShow(false)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductTable