import './security.css'
import useAuth from './../../Store/useAuthStore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Logo from './../topBar/component/Logo';
import { useNavigate } from 'react-router-dom';

const Security = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {isUpdating, changePassword, authUser} = useAuth()
  const navigate = useNavigate();


  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    await changePassword(oldPassword, confirmPassword, navigate);
    
  }

  return (
    <div className='security'>
      <Logo />
      <div className="change-password-container">
      <h2 className='head-h2'>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="update-btn" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
    </div>
  )
}

export default Security
