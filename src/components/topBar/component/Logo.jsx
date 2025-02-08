import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/tumbnail-white.png'



const Logo = () => {

  const navigate = useNavigate()
  return (
    <div>
       <div onClick={() => navigate("/")} className="logo">
        <img src={logo}/>
       </div>
    </div>
  )
}

export default Logo
