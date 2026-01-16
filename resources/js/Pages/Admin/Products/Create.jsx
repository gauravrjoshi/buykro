import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import RichTextEditor from '@/Components/RichTextEditor';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Product</h2>}
        >
            <Head title="Admin - Create Product" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={submit} className="space-y-6">
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
                                <label className="block font-medium text-sm text-gray-700 mb-2">Description</label>
                                <RichTextEditor
                                    value={data.description}
                                    onChange={(value) => setData('description', value)}
                                    placeholder="Enter product description with rich formatting..."
                                />
                                {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
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
                                <label className="block font-medium text-sm text-gray-700 mb-2">Product Image</label>
                                <input
                                    type="file"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                <p className="text-xs text-gray-500 mt-2 italic">Links can be added after creating the product.</p>
                                {errors.image && <div className="text-red-600 text-sm mt-1">{errors.image}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
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
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
