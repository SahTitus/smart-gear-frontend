import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { User, Mail, Phone, MapPin, Edit, Save, X, Lock, AlertCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile, updatePassword, error: authError, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profile, setProfile] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [formData, setFormData] = useState(profile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      const updatedProfile = {
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      };
      setProfile(updatedProfile);
      setFormData(updatedProfile);
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (authError) clearError();
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
    if (authError) clearError();
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setProfile(formData);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
      setSuccess('Password updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="wrapper py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Error and Success Messages */}
            {(error || authError) && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {error || authError}
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
              {!isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Lock size={16} className="mr-2" />
                    Change Password
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} className="mr-2" />
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Picture */}
              <div className="md:col-span-1">
                <div className="bg-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={48} className="text-gray-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {isEditing ? formData.username : profile.username}
                  </h2>
                  <p className="text-gray-500">Customer</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-4" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.username}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="text-gray-400 mr-4" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="text-gray-400 mr-4" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="text-gray-400 mr-4" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      {isEditing ? (
                        <textarea
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Change Section */}
            {isChangingPassword && (
              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                      <Save size={16} className="mr-2" />
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                        setError('');
                      }}
                      className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage; 