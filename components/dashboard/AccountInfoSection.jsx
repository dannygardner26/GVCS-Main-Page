import React, { useState } from 'react';

const AccountInfoSection = ({ user, profile, isEditing, onEdit, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        display_name: profile?.display_name || user?.name || '',
        bio: profile?.bio || '',
        grade_level: profile?.grade_level || '',
        graduation_year: profile?.graduation_year || '',
        interests: profile?.interests || [],
        skills: profile?.skills || []
    });

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gvcs-navy mb-4">Edit Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={formData.display_name}
                            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            rows="3"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Grade Level</label>
                            <select
                                value={formData.grade_level}
                                onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select...</option>
                                <option value="9">9th Grade</option>
                                <option value="10">10th Grade</option>
                                <option value="11">11th Grade</option>
                                <option value="12">12th Grade</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="number"
                                value={formData.graduation_year}
                                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="2026"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onSave(formData)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gvcs-navy">Account Info</h2>
                <button
                    onClick={onEdit}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Edit
                </button>
            </div>
            <div className="space-y-3">
                <div>
                    <span className="text-sm text-gray-500">Name:</span>
                    <p className="font-semibold text-gray-800">{formData.display_name || user?.name || 'Not set'}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-semibold text-gray-800">{user?.email}</p>
                </div>
                {formData.bio && (
                    <div>
                        <span className="text-sm text-gray-500">Bio:</span>
                        <p className="text-gray-800">{formData.bio}</p>
                    </div>
                )}
                {(formData.grade_level || formData.graduation_year) && (
                    <div>
                        <span className="text-sm text-gray-500">Grade:</span>
                        <p className="font-semibold text-gray-800">
                            {formData.grade_level ? `Grade ${formData.grade_level}` : ''}
                            {formData.graduation_year && ` • Class of ${formData.graduation_year}`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountInfoSection;
