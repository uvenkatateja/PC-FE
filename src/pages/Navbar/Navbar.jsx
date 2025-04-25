import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Layout, 
  Menu, 
  Button, 
  Drawer, 
  Space, 
  Avatar, 
  Typography,
  Dropdown
} from 'antd';
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  MenuOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import styles from './Navbar.module.css';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div style={{ padding: '8px 0' }}>
          <Text type="secondary">
            Welcome, {user?.name || 'User'}
          </Text>
        </div>
      ),
      disabled: true
    },
    {
      key: 'dashboard',
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <div style={{ flex: isMobile ? 1 : '0 0 auto' }}>
          <Link to="/" className={styles.logo}>
            PetFinder <span className={styles.logoEmoji}>🐾</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '10px' }}>
          <Menu 
            mode="horizontal" 
            selectedKeys={[]} 
            className={styles.menu}
            style={{ visibility: 'visible', display: 'flex' }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />} style={{ display: 'flex', alignItems: 'center' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            {isAuthenticated && (
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
            )}
          </Menu>

          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                <Space>
                  <Avatar size="small" icon={<UserOutlined />} className={styles.userAvatar} />
                  <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{user?.name || 'User'}</span>
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Space>
              <Link to="/login">
                <Button type="link" className={styles.navButton} style={{ color: '#333333' }}>Login</Button>
              </Link>
              <Link to="/register">
                <Button shape="round" className={styles.registerButton}>
                  Register
                </Button>
              </Link>
            </Space>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: isMobile ? 'block' : 'none', textAlign: 'right' }}>
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={() => setMobileMenuOpen(true)}
            className={styles.navButton}
          />
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <div className={styles.logo}>
              PetFinder <span className={styles.logoEmoji}>🐾</span>
            </div>
          }
          placement="right"
          closable={true}
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          width={280}
          bodyStyle={{ padding: '20px 0' }}
        >
          <Menu mode="vertical" style={{ border: 'none' }}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </Menu.Item>
            
            {isAuthenticated ? (
              <>
                <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="user" disabled>
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} className={styles.userAvatar} />
                    <Text type="secondary">Welcome, {user?.name || 'User'}</Text>
                  </Space>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="login">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                </Menu.Item>
                <Menu.Divider />
                <div style={{ padding: '0 16px' }}>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button shape="round" block className={styles.registerButton}>
                      Register
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </Menu>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar; 