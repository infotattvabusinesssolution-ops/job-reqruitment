import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { blogApi, uploadApi } from '../../../api/candidateApi';
import {
  HiTrash,
  HiPlus,
  HiPhotograph,
  HiX,
  HiCloudUpload,
  HiPencil,
  HiLink,
} from 'react-icons/hi';

const emptyBlogState = {
  title: '',
  content: '',
  excerpt: '',
  readTime: 5,
  allowComments: true,
  isFeatured: false,
  coverImage: { url: '', alt: '' },
  images: [], // array of { url: '', alt: '', caption: '' }
};

const AdminBlogs = () => {
  const queryClient = useQueryClient();
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [blogForm, setBlogForm] = useState(emptyBlogState);

  // Uploading state indicators
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingSection, setUploadingSection] = useState(false);

  // Direct URL temporary inputs
  const [coverUrlInput, setCoverUrlInput] = useState('');
  const [sectionUrlInput, setSectionUrlInput] = useState('');
  const [sectionCaptionInput, setSectionCaptionInput] = useState('');
  const [sectionAltInput, setSectionAltInput] = useState('');

  // Fetch blogs list
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['adminBlogs'],
    queryFn: async () => {
      const res = await blogApi.getAll({ limit: 100 });
      return res.data.data.blogs;
    },
  });

  // Create mutation
  const createBlogMutation = useMutation({
    mutationFn: async (data) => blogApi.create(data),
    onSuccess: () => {
      toast.success('Blog post created successfully');
      handleCloseModal();
      queryClient.invalidateQueries(['adminBlogs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create blog post'),
  });

  // Update mutation
  const updateBlogMutation = useMutation({
    mutationFn: async ({ id, data }) => blogApi.update(id, data),
    onSuccess: () => {
      toast.success('Blog post updated successfully');
      handleCloseModal();
      queryClient.invalidateQueries(['adminBlogs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update blog post'),
  });

  // Delete mutation
  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => blogApi.delete(id),
    onSuccess: () => {
      toast.success('Blog post deleted');
      queryClient.invalidateQueries(['adminBlogs']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to delete blog post'),
  });

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setBlogForm(emptyBlogState);
    setCoverUrlInput('');
    setSectionUrlInput('');
    setSectionCaptionInput('');
    setSectionAltInput('');
    setBlogModalOpen(true);
  };

  const handleOpenEditModal = (blog) => {
    setEditingId(blog._id);
    setBlogForm({
      title: blog.title || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      readTime: blog.readTime || 5,
      allowComments: blog.allowComments !== false,
      isFeatured: !!blog.isFeatured,
      coverImage: blog.coverImage || { url: '', alt: '' },
      images: blog.images || [],
    });
    setCoverUrlInput(blog.coverImage?.url || '');
    setSectionUrlInput('');
    setSectionCaptionInput('');
    setSectionAltInput('');
    setBlogModalOpen(true);
  };

  const handleCloseModal = () => {
    setBlogModalOpen(false);
    setEditingId(null);
    setBlogForm(emptyBlogState);
  };

  // Upload Cover Image Handler
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const res = await uploadApi.uploadImage(file);
      const url = res.data.data.url;
      setBlogForm((prev) => ({
        ...prev,
        coverImage: { ...prev.coverImage, url },
      }));
      setCoverUrlInput(url);
      toast.success('Cover image uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload cover image');
    } finally {
      setUploadingCover(false);
    }
  };

  // Add Cover Image via URL
  const handleAddCoverUrl = () => {
    if (!coverUrlInput.trim()) return;
    setBlogForm((prev) => ({
      ...prev,
      coverImage: { ...prev.coverImage, url: coverUrlInput.trim() },
    }));
    toast.success('Cover image URL set');
  };

  // Remove Cover Image
  const handleRemoveCover = () => {
    setBlogForm((prev) => ({
      ...prev,
      coverImage: { url: '', alt: '' },
    }));
    setCoverUrlInput('');
  };

  // Upload Section Image Handler
  const handleSectionImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingSection(true);
      const res = await uploadApi.uploadImage(file);
      const url = res.data.data.url;
      const newImg = {
        url,
        caption: sectionCaptionInput.trim() || file.name,
        alt: sectionAltInput.trim() || 'Section image',
      };
      setBlogForm((prev) => ({
        ...prev,
        images: [...prev.images, newImg],
      }));
      setSectionCaptionInput('');
      setSectionAltInput('');
      setSectionUrlInput('');
      toast.success('Section image uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload section image');
    } finally {
      setUploadingSection(false);
    }
  };

  // Add Section Image via URL
  const handleAddSectionUrl = () => {
    if (!sectionUrlInput.trim()) return;
    const newImg = {
      url: sectionUrlInput.trim(),
      caption: sectionCaptionInput.trim(),
      alt: sectionAltInput.trim() || 'Article section image',
    };
    setBlogForm((prev) => ({
      ...prev,
      images: [...prev.images, newImg],
    }));
    setSectionUrlInput('');
    setSectionCaptionInput('');
    setSectionAltInput('');
    toast.success('Section image added');
  };

  // Remove Section Image
  const handleRemoveSectionImage = (index) => {
    setBlogForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  // Submit Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateBlogMutation.mutate({ id: editingId, data: blogForm });
    } else {
      createBlogMutation.mutate(blogForm);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-secondary-400 animate-pulse">Loading blog directory...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-heading font-bold text-secondary-900">Blogs Management</h2>
          <p className="text-xs text-secondary-500">Create, edit, and curate career articles with rich media</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs shadow-md"
        >
          <HiPlus className="w-4 h-4" /> Create Article
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-secondary-500">
                <th className="px-6 py-4">Article</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Images</th>
                <th className="px-6 py-4">Comments</th>
                <th className="px-6 py-4">Likes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-secondary-700">
              {blogs?.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold">
                    <div className="flex items-center gap-3">
                      {b.coverImage?.url ? (
                        <img
                          src={b.coverImage.url}
                          alt={b.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <HiPhotograph className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-secondary-900 line-clamp-1">{b.title}</div>
                        <div className="text-[10px] text-gray-400 font-normal line-clamp-1">{b.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-500">
                    <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                      <HiPhotograph className="w-3 h-3 text-primary-600" />
                      {(b.coverImage?.url ? 1 : 0) + (b.images?.length || 0)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-500">{b.comments?.length || 0}</td>
                  <td className="px-6 py-4 text-secondary-500">{b.likes || 0} likes</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEditModal(b)}
                        className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                        title="Edit Article"
                      >
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete blog article permanently?')) {
                            deleteBlogMutation.mutate(b._id);
                          }
                        }}
                        className="text-danger-600 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50 transition-colors"
                        title="Delete Article"
                      >
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Article Creation / Editing */}
      {blogModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-left">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold p-1 rounded-lg hover:bg-gray-100"
            >
              <HiX className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-heading font-bold text-secondary-900 border-b border-gray-100 pb-3">
              {editingId ? 'Edit Article' : 'Create New Article'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. 5 Tips to Build a Strong CV for 2026"
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              {/* Excerpt Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Short Excerpt *</label>
                <input
                  type="text"
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A quick summary of the article..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              {/* SECTION: Cover Image Upload */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-secondary-800 flex items-center gap-1.5">
                    <HiPhotograph className="w-4 h-4 text-primary-600" /> Main Cover Image
                  </label>
                  {blogForm.coverImage?.url && (
                    <button
                      type="button"
                      onClick={handleRemoveCover}
                      className="text-[10px] text-danger-600 font-bold hover:underline"
                    >
                      Remove Cover
                    </button>
                  )}
                </div>

                {/* Preview of Cover Image */}
                {blogForm.coverImage?.url ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 h-44 bg-gray-100 flex items-center justify-center">
                    <img
                      src={blogForm.coverImage.url}
                      alt={blogForm.coverImage.alt || 'Cover preview'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                      Cover Active
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {/* File Upload Box */}
                    <label className="border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-white transition-all text-center">
                      <HiCloudUpload className="w-6 h-6 text-primary-500 mb-1" />
                      <span className="text-xs font-semibold text-secondary-700">
                        {uploadingCover ? 'Uploading...' : 'Upload Image File'}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingCover}
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Or URL Input */}
                    <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                        <HiLink className="w-3 h-3" /> Or Enter Image URL
                      </span>
                      <input
                        type="url"
                        value={coverUrlInput}
                        onChange={(e) => setCoverUrlInput(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-200 rounded-lg p-2 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCoverUrl}
                        className="w-full bg-secondary-900 hover:bg-secondary-800 text-white text-[11px] font-bold py-1.5 rounded-lg transition-all"
                      >
                        Set Cover URL
                      </button>
                    </div>
                  </div>
                )}

                {/* Alt Text Input */}
                <div className="pt-1">
                  <input
                    type="text"
                    value={blogForm.coverImage?.alt || ''}
                    onChange={(e) =>
                      setBlogForm({
                        ...blogForm,
                        coverImage: { ...blogForm.coverImage, alt: e.target.value },
                      })
                    }
                    placeholder="Cover image alt text (for accessibility/SEO)"
                    className="w-full border border-gray-200 rounded-lg p-2 text-xs bg-white text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              {/* Full Content Input */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Full Content *</label>
                <textarea
                  rows={6}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the full content of the article here..."
                  className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>

              {/* SECTION: Article / Section Images Gallery */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-secondary-800 flex items-center gap-1.5">
                    <HiPhotograph className="w-4 h-4 text-accent-600" /> Article / Section Images
                  </label>
                  <span className="text-[10px] font-semibold text-gray-400">
                    {blogForm.images.length} Image{blogForm.images.length !== 1 ? 's' : ''} Attached
                  </span>
                </div>

                {/* Add Section Image Box */}
                <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-3">
                  <span className="text-[11px] font-bold text-secondary-700 block">Add New Section Image</span>

                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={sectionCaptionInput}
                      onChange={(e) => setSectionCaptionInput(e.target.value)}
                      placeholder="Image Caption (e.g. Figure 1: Team Meeting)"
                      className="border border-gray-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <input
                      type="text"
                      value={sectionAltInput}
                      onChange={(e) => setSectionAltInput(e.target.value)}
                      placeholder="Alt Text (SEO)"
                      className="border border-gray-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    {/* File Upload Button */}
                    <label className="w-full sm:w-auto px-4 py-2 border border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                      <HiCloudUpload className="w-4 h-4" />
                      <span>{uploadingSection ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingSection}
                        onChange={handleSectionImageUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-[10px] font-bold text-gray-400 uppercase">or URL:</span>

                    <input
                      type="url"
                      value={sectionUrlInput}
                      onChange={(e) => setSectionUrlInput(e.target.value)}
                      placeholder="Paste Image URL..."
                      className="flex-1 border border-gray-200 rounded-lg p-2 text-xs outline-none focus:ring-2 focus:ring-primary-500 w-full"
                    />

                    <button
                      type="button"
                      onClick={handleAddSectionUrl}
                      className="px-4 py-2 bg-secondary-900 hover:bg-secondary-800 text-white text-xs font-bold rounded-lg transition-all w-full sm:w-auto"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                {/* List of Attached Section Images */}
                {blogForm.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {blogForm.images.map((img, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-2.5 flex items-center gap-3 relative group hover:shadow-sm transition-all"
                      >
                        <img
                          src={img.url}
                          alt={img.alt || 'Section thumbnail'}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-150"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-secondary-800 truncate">
                            {img.caption || `Section Image ${index + 1}`}
                          </p>
                          <p className="text-[10px] text-gray-400 truncate">{img.alt || 'No alt text'}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSectionImage(index)}
                          className="text-danger-500 hover:text-danger-700 p-1.5 rounded-lg hover:bg-danger-50"
                          title="Remove image"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Read time and Options */}
              <div className="flex flex-wrap gap-4 animate-fadeIn">
                <div className="space-y-1 flex-1 min-w-[140px]">
                  <label className="block text-[10px] font-bold text-secondary-500 uppercase tracking-wider">Read Time (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: parseInt(e.target.value) || 5 })}
                    className="w-full border border-gray-200 rounded-xl p-2.5 text-xs text-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="allowComments"
                    checked={blogForm.allowComments}
                    onChange={(e) => setBlogForm({ ...blogForm, allowComments: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="allowComments" className="text-xs font-semibold text-secondary-750">Allow Comments</label>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={blogForm.isFeatured}
                    onChange={(e) => setBlogForm({ ...blogForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="isFeatured" className="text-xs font-semibold text-secondary-750">Feature Article</label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-secondary-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBlogMutation.isLoading || updateBlogMutation.isLoading}
                  className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  {createBlogMutation.isLoading || updateBlogMutation.isLoading
                    ? 'Saving...'
                    : editingId
                    ? 'Save Changes'
                    : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
