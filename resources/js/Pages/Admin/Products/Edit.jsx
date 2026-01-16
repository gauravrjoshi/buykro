import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Edit({ auth, product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        title: product.title,
        description: product.description || '',
        category: product.category || '',
        image: null,
    });

    const [showLinkModal, setShowLinkModal] = useState(false);
    const linkForm = useForm({
        vendor_name: '',
        url: '',
    });

    const submitProduct = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    const submitLink = (e) => {
        e.preventDefault();
        linkForm.post(route('admin.links.store', product.id), {
            onSuccess: () => {
                setShowLinkModal(false);
                linkForm.reset();
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Product: {product.title}</h2>}
        >
            <Head title={`Admin - Edit ${product.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Product Form */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-6">Product Details</h3>
                        <form onSubmit={submitProduct} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block font-medium text-sm text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm px-4 py-2"
                                            value={data.title}
                                            onChange={e => setData('title', e.target.value)}
                                            required
                                        />
                                        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700 mb-2">Category</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 bg-white text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm px-4 py-2"
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                        />
                                        {errors.category && <div className="text-red-600 text-sm mt-1">{errors.category}</div>}
                                    </div>

                                    <div>
                                        <label className="block font-medium text-sm text-gray-700 mb-2">Description</label>
                                        <RichTextEditor
                                            value={data.description}
                                            onChange={(value) => setData('description', value)}
                                            placeholder="Enter product description with rich formatting..."
                                        />
                                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                                    </div>
                                </div>

                                <div className="space-y-6 text-center">
                                    <label className="block font-medium text-sm text-gray-700 text-left mb-2">Product Image</label>
                                    {product.image_url && !data.image && (
                                        <div className="mb-4">
                                            <img src={product.image_url} alt="Current" className="mx-auto h-48 w-48 object-cover rounded-lg shadow" />
                                            <p className="text-xs text-gray-500 mt-2">Current Image</p>
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                                        <input
                                            type="file"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                            onChange={e => setData('image', e.target.files[0])}
                                        />
                                    </div>
                                    {errors.image && <div className="text-red-600 text-sm mt-1">{errors.image}</div>}
                                </div>
                            </div>

                            <div className="flex items-center justify-end pt-4 border-t border-gray-200 gap-4">
                                <Link
                                    href={route('admin.products.index')}
                                    className="text-sm text-gray-600 hover:text-gray-900 transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-indigo-600 border border-transparent rounded-lg font-bold text-sm text-white uppercase tracking-widest hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg"
                                    disabled={processing}
                                >
                                    Update Product
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Affiliate Links Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">Affiliate Links</h3>
                            <button
                                onClick={() => setShowLinkModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 border border-transparent rounded-lg font-bold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                <Plus size={14} /> Add New Link
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {product.affiliate_links.map((link) => (
                                <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                                    <div>
                                        <div className="font-black text-gray-900">{link.vendor_name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-lg">{link.url}</div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('admin.links.destroy', link.id)}
                                            method="delete"
                                            as="button"
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Remove Link"
                                        >
                                            <Trash2 size={18} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {product.affiliate_links.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                                    <p className="text-gray-400 italic font-medium">No links added to this product yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for adding link */}
            {showLinkModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full p-10 relative">
                        <button
                            onClick={() => setShowLinkModal(false)}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-black mb-2 text-gray-900">Add Partner Link</h2>
                        <p className="text-gray-500 text-sm mb-8 font-medium">Link this product to a verified vendor.</p>

                        <form onSubmit={submitLink} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Vendor Name (e.g. Amazon)</label>
                                <input
                                    type="text"
                                    className="block w-full border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm focus:border-indigo-600 focus:ring-indigo-600 transition p-4 font-bold"
                                    placeholder="Enter store name..."
                                    value={linkForm.data.vendor_name}
                                    onChange={e => linkForm.setData('vendor_name', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Affiliate URL</label>
                                <input
                                    type="url"
                                    className="block w-full border-gray-300 bg-white text-gray-900 rounded-xl shadow-sm focus:border-indigo-600 focus:ring-indigo-600 transition p-4 font-bold"
                                    placeholder="https://..."
                                    value={linkForm.data.url}
                                    onChange={e => linkForm.setData('url', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowLinkModal(false)}
                                    className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
                                    disabled={linkForm.processing}
                                >
                                    Save Partner Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
