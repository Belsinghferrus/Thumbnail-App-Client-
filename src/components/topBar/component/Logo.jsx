import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/tumbnail-white.png'
import mobileLogo from '../../../assets/tumbnail logo.png'


const Logo = () => {

  const navigate = useNavigate()
  return (
    <div>
       <div onClick={() => navigate("/")} className="logo">
        <img className='desktop-logo' src={logo} alt='logo'/>
        <img className='mobile-logo' src={mobileLogo} alt='logo'/>

       </div>
    </div>
  )
}

export default Logo
