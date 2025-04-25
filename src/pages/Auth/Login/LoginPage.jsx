import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Row, 
  Col, 
  Card, 
  Divider, 
  Space,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined, 
  ArrowRightOutlined,
  HomeOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import styles from './LoginPage.module.css';

const { Title, Text, Paragraph } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
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

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      await login(values);
      toast.success('Logged in successfully!');
      console.log("POST /auth/login successful");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.toString());
      form.setFields([
        {
          name: 'password',
          errors: ['Invalid email or password. Please try again.'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
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
          className={styles.loginCard}
        >
          <div className={styles.formHeader}>
            <Title level={2} style={{ marginBottom: '0.5rem', fontWeight: 600 }}>
              Welcome Back
            </Title>
            <Paragraph type="secondary">
              Sign in to your account to continue
            </Paragraph>
          </div>

          <Form
            form={form}
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Email" 
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '12px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                icon={<LoginOutlined />}
                className={styles.submitButton}
              >
                Sign In
              </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center' }}>
              <Paragraph type="secondary">
                <Space className={isMobile ? styles.passwordReset : ''}>
                  Forgot password?
                  <Link to="/forgot-password" className={styles.passwordResetLink}>Reset it here</Link>
                </Space>
              </Paragraph>
            </div>
          </Form>

          <Divider plain>Or</Divider>
          
          <Row gutter={16}>
            <Col span={24}>
              <Link to="/register">
                <Button 
                  block 
                  icon={<ArrowRightOutlined />}
                  className={styles.createAccountButton}
                >
                  Create New Account
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage; 