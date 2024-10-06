import { forwardRef, useState } from "react"
import { Header, Navbar, Nav, Divider } from "rsuite"
import BookOpenBlankVariantOutlineIcon from 'mdi-react/BookOpenBlankVariantOutlineIcon'
import { Link, useNavigate } from "react-router-dom"
import LogoutIcon from 'mdi-react/LogoutIcon'
import storageHelper from "app/helpers/storage.helper"


function loadUser() {
    return storageHelper.loadItem('user')
}

function generateUserImage() {
    const {name} = loadUser()
    const splitted = name.split(' ')

    let profileLabel = ''

    splitted.forEach(item => {
        profileLabel += item.charAt(0)
    })

    if (profileLabel.length < 2){
        profileLabel += "1"
    }

    return profileLabel.toUpperCase()
}

const RenderProfileIcon = (prop, ref) => {
    return (
        <div className="h-14 mr-4 flex items-center justify-center" {...prop} ref={ref}>
            <div className="account-profile-icon">{generateUserImage()}</div>
        </div>
    )
}

const NavLink = forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
));

const AppNavbar = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState('user-management')
    const userData = loadUser()

    const handleSelect = (event) => {
        if(event === 'logout') {
            storageHelper.clearItems()
            navigate('/login')
        }
    }

    return (
        <Header>
            <Navbar className="bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.1)]">
                <Navbar.Brand className="flex justify-center items-center" href="/">
                    <img src="/img/brand.png" alt="stories" width="120px" />
                </Navbar.Brand>
                <Nav activeKey={active} onSelect={setActive} appearance="subtle">
                    <Nav.Item as={NavLink} href="/" eventKey="articles" className="font-medium">
                        <BookOpenBlankVariantOutlineIcon size={18} className="mr-1" />Articles
                    </Nav.Item>
                </Nav>
                <Nav onSelect={handleSelect} pullRight>
                    <Nav.Menu renderToggle={RenderProfileIcon} noCaret placement="bottomEnd">
                        <Nav.Item eventKey="profile">
                            <div className='flex items-center min-w-56'>
                                <div className='account-profile-icon mr-2.5'>{generateUserImage()}</div>
                                <div className='profile-nav-info'>
                                    <div className="font-semibold">{userData.name}</div>
                                    <span>{userData.email}</span>
                                </div>
                            </div>
                        </Nav.Item>
                        <Divider className="my-2" />
                        <Nav.Item eventKey="logout" className='flex items-center text-[13px]'>
                            <LogoutIcon size={18} className="mr-2.5" /> Logout
                        </Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Navbar>
        </Header>
    )
}

export default AppNavbar