import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { MdDashboard } from "react-icons/md";
import { CiLogout, CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useAlert } from 'react-alert';
import Backdrop from "@material-ui/core/Backdrop"

import { logoutUser } from '../../../actions/userAction';
import "./Header.css";
import zIndex from '@material-ui/core/styles/zIndex';


const UserOptions = ({ user }) => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)

    const options = [
        { icon: <CiShoppingCart />, name: 'Orders', func: orders },
        { icon: <CgProfile />, name: 'Profile', func: profile },
        { icon: <CiLogout />, name: 'Logout', func: logout }
    ]

    if (user.role === "admin") {
        options.unshift({
            icon: <MdDashboard />, name: 'Dashboard', func: dashboard
        })
    }

    function dashboard() {
        navigate(`/dashboard`);
    }
    function orders() {
        navigate(`/cart`);
    }
    function profile() {
        navigate(`/profile`);
    }
    function logout() {
        dispatch(logoutUser())
        alert.success("Logged out Successfully")
    }

    return (
        <>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className='sd'
                ariaLabel='Speeddial Tool tip'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                icon={<img
                    className='sdIcon'
                    src={user && user.avatar.url ? user.avatar.url : "/Profile.png"}
                    alt="Icon"
                />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}

            </SpeedDial>
        </>
    )
}

export default UserOptions