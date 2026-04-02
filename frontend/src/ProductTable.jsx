import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [editProduct,setEditProduct] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        lowStockThreshold: '',
        category: '',
        warranty: ''
    });
    const [errors, setErrors] = useState({});

    const fetchProducts = () => {
        axios
            .get('http://localhost:5001/api/products')
            .then((res) => {
                setProducts(res.data || []);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Product name is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (Number(formData.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        if (!formData.lowStockThreshold) {
            newErrors.lowStockThreshold = "Low stock threshold is required";
        } else if (Number(formData.lowStockThreshold) < 0) {
            newErrors.lowStockThreshold = "Low stock threshold cannot be negative";
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required";
        }

        if (!formData.warranty.trim()) {
            newErrors.warranty = "Warranty is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const request = editProduct
        ? axios.put(`http://localhost:5001/api/products/${editProduct}`, formData)
        : axios.post('http://localhost:5001/api/products', formData);

    request
        .then((res) => {
            console.log(res.data);
            setShow(false);
            setEditProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                lowStockThreshold: '',
                category: '',
                warranty: ''
            });
            setErrors({});
            fetchProducts();
            alert(editProduct ? "Product updated successfully!" : "Product saved successfully!");
        })
        .catch((err) => {
            console.log(err);
            alert("Failed to save: " + (err.response?.data?.message || err.message));
        });
};
        const handleDelete = (id) =>{
            const conformDelete = window.confirm("are you want to delete this one?");

            if(!conformDelete)
            {
                return;
            }

            axios
                .delete(`http://localhost:5001/api/products/${id}`)
                .then((res)=>{
                    console.log(res.data);
                    alert("Product delete successfully");
                    fetchProducts();
                })
                .catch((err)=>{
                    console.log((err));
                    alert("Failed to save: " + (err.response?.data?.message || err.message));
                })


        }

    return (
        <div className='m-4'>
            <div className='m-4 flex gap-4'>
                <p className='text-3xl'>Product Table</p>
                <button
                    onClick={() => {
                        setShow(true);
                        setEditProduct(null);
                        setFormData({
                            name: '',
                            description: '',
                            price: '',
                            lowStockThreshold: '',
                            category: '',
                            warranty: ''
                        });
                        setErrors({});
                    }}
                    className='border p-2 rounded-2xl bg-blue-400 hover:bg-blue-500 text-white'
                >
                    Add Product
                </button>
            </div>

            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="overflow-x-auto">
                <table className=' min-w-[900px] border border-collapse w-full'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='border p-4'>Name</th>
                            <th className='border p-4'>Description</th>
                            <th className='border p-4'>Price</th>
                            <th className='border p-4'>Low Stock Threshold</th>
                            <th className='border p-4'>Category</th>
                            <th className='border p-4'>Warranty</th>
                            <th className='border p-4'>Action</th>
                                     
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product?._id}>
                                <td className='border p-4'>{product.name}</td>
                                <td className='border p-4'>{product.description}</td>
                                <td className='border p-4'>{product.price}</td>
                                <td className='border p-4'>{product.lowStockThreshold}</td>
                                <td className='border p-4'>{product.category}</td>
                                <td className='border p-4'>{product.warranty}</td>
                                <td className='border p-4'><button  
                                                                className='border p-2 rounded-2xl bg-blue-700 hover:bg-blue-900 text-white shadow-xl' 
                                                                type='button'
                                                                onClick={()=>{
                                                                    setShow(true);
                                                                    setEditProduct(product._id)
                                                                    setFormData({
                                                                        name: product.name,
                                                                        description: product.description,
                                                                        price: product.price,
                                                                        lowStockThreshold:product.lowStockThreshold,
                                                                        category: product.category,
                                                                        warranty: product.warranty
                                                                    });
                                                                    setErrors({});
                                                                }}
                                                                >Update</button>
                                                            <button className='border p-2 rounded-2xl bg-blue-700 hover:bg-blue-900 text-white shadow-xl' onClick={()=>handleDelete(product._id)}>
                                                                Delete
                                                            </button>
                                                                
                                                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}

            {show && (
                <div className="fixed inset-0 bg-gray-200/80 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-96 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">
                                {editProduct ? "Update Product" : "Add Product"}
                            </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 w-full mb-1"
                                value={formData.name}
                                onChange={(e) => {setFormData({ ...formData, name: e.target.value });
                                setErrors({ ...errors, name: '' });
                            }}
                            />
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                            <input
                                type="text"
                                placeholder="Description"
                                className="border p-2 w-full mb-1"
                                value={formData.description}
                                onChange={(e) => {setFormData({ ...formData, description: e.target.value });
                                setErrors({ ...errors, description: '' });
                            
                            }}
                            />
                            {errors.description && <p className="text-red-500 text-sm mb-2">{errors.description}</p>}

                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2 w-full mb-1"
                                value={formData.price}
                                onChange={(e) => {setFormData({ ...formData, price: e.target.value });
                                setErrors({ ...errors, price: '' });
                            }}
                            />
                            {errors.price && <p className="text-red-500 text-sm mb-2">{errors.price}</p>}

                            <input
                                type="number"
                                placeholder="Low Stock Threshold"
                                className="border p-2 w-full mb-1"
                                value={formData.lowStockThreshold}
                                onChange={(e) => {setFormData({ ...formData, lowStockThreshold: e.target.value });
                                setErrors({ ...errors, lowStockThreshold: '' });
                            }}
                            />
                            {errors.lowStockThreshold && <p className="text-red-500 text-sm mb-2">{errors.lowStockThreshold}</p>}

                            <input
                                type="text"
                                placeholder="Category"
                                className="border p-2 w-full mb-1"
                                value={formData.category}
                                onChange={(e) => {setFormData({ ...formData, category: e.target.value });
                                setErrors({ ...errors, category: '' });
                            }}
                            />
                            {errors.category && <p className="text-red-500 text-sm mb-2">{errors.category}</p>}

                            <input
                                type="text"
                                placeholder="Warranty"
                                className="border p-2 w-full mb-1"
                                value={formData.warranty}
                                onChange={(e) => {setFormData({ ...formData, warranty: e.target.value });
                                setErrors({ ...errors, warranty: '' });
                            }}
                            />
                            {errors.warranty && <p className="text-red-500 text-sm mb-2">{errors.warranty}</p>}

                            <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setShow(false);
                                    setEditProduct(null);
                                    setErrors({});
                                    setFormData({
                                        name: '',
                                        description: '',
                                        price: '',
                                        lowStockThreshold: '',
                                        category: '',
                                        warranty: ''
                                    });
                                }}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Cancel
                            </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    {editProduct ? "Update" : "Save"}
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