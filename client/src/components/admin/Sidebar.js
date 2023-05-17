import React from 'react';
import { Link } from 'react-router-dom';


//icons
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ReviewsIcon from '@mui/icons-material/Reviews';
const Sidebar = () => {
  return (
    <div>
 <div className="row fixed bg-gray-500 h-screen left-0 px-20">
        <div className="col-2 py-40">
            <div className="sidebar-wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><DashboardIcon/> Dashboard</Link>
                    </li>
                    <li>
                        <Link href="#productSubmenu"> <StorefrontIcon/> Products</Link>
                        <ul >
                            <li>
                            <Link to="/admin/products"><CategoryIcon/> All</Link>
                            </li>
                            <li>
                            <Link to="/admin/product"><AddIcon/> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/admin/orders"><ShoppingCart/> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><PeopleIcon/> Users</Link>
                    </li>
                            
                    <li>
                        <Link to="/admin/reviews"><ReviewsIcon/>Reviews</Link>
                    </li>
                            
                </ul>
                </nav>
            </div>
        </div>
    </div>


    </div>
  )
}

export default Sidebar;