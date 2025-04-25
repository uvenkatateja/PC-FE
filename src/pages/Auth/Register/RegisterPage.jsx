import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Card, 
  Space, 
  Divider 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined, 
  UserAddOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import styles from './RegisterPage.module.css';

const { Title, Paragraph } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = values;
      
      await register(userData);
      toast.success('Registered successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButtonContainer}>
        <Link to="/">
          <Button 
            icon={<ArrowLeftOutlined />} 
            className={styles.backButton}
          >
            Back to Home
          </Button>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.cardContainer}
      >
        <Card 
          bordered={true}
          className={styles.formContainer}
        >
          <div className={styles.formHeader}>
            <Title level={2}>Create Account</Title>
            <Paragraph type="secondary">Join our community to help find lost pets</Paragraph>
          </div>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please enter your name' },
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Full Name" 
                autoComplete="name"
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email" 
                autoComplete="email"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter a password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                autoComplete="new-password"
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </Form.Item>
            
            <Form.Item style={{ marginBottom: '12px' }}>
              <Button 
                type="primary" 
                htmlType="submit"
                block 
                loading={loading}
                icon={<UserAddOutlined />}
                className={styles.submitButton}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Form.Item>
          </Form>
          
          <Divider plain>Or</Divider>
          
          <div className={styles.formFooter}>
            <Space align="center">
              <ArrowLeftOutlined />
              <Link to="/login">Back to Login</Link>
            </Space>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage; 