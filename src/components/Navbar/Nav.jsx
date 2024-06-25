import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import darkLogo from "/svg/logo-dark.svg";
import logo from "/svg/logo.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { setUser,logoutUser, clearUser, resetStatus , resetError} from "../../slice/UserSlice";
import Switch from "../Toggle/Switch";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const mode = useSelector((state)=> state.mode.mode)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const handleLoggedOut = ()=>{
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <nav>
      <Link className="title" to="/">
        <img src={mode ? darkLogo : logo} alt="logo" />
        <h4> BlogiFy</h4>
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li>
          {
            user && ( <NavLink to={`/profile/${user.uid}`}>Profile</NavLink>)
          }
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
      <div className="nav-btns">
        {user ? <><img src="/user-avatar.png" width="45" alt="avatar" /> <span className="user">{user.displayName}</span> <span><button onClick={handleLoggedOut} className="nav-btn">Logout</button></span> </> : <><Link to="/login"> <button className="nav-btn">Login</button></Link>
        <Link to="/register"> <button className="nav-btn">Register</button></Link>
        </> }
        <Switch />
      </div>
    </nav>
  );
};

export default Navbar;
