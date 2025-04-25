import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Layout, 
  Typography, 
  Button, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Divider, 
  Space, 
  Avatar, 
  BackTop,
  Carousel,
  Image
} from 'antd';
import { 
  FormOutlined, 
  DashboardOutlined, 
  TeamOutlined, 
  SearchOutlined,
  ArrowUpOutlined,
  UserOutlined,
  HeartOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import styles from './HomePage.module.css';
import profileImage from '../../assets/profile.jpg';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// Reusable section component
const Section = ({ className, children, style }) => (
  <div className={className} style={style}>
    <div className={styles.container}>
      {children}
    </div>
  </div>
);

// Section title component
const SectionTitle = ({ title, subtitle }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeIn}
    style={{ textAlign: 'center', marginBottom: '60px' }}
  >
    <Title level={2} style={{ fontWeight: 700 }}>{title}</Title>
    {subtitle && (
      <Paragraph style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.65)', maxWidth: '600px', margin: '0 auto' }}>
        {subtitle}
      </Paragraph>
    )}
  </motion.div>
);

// Feature card component
const FeatureCard = ({ icon, title, description, linkText, linkTo }) => (
  <motion.div variants={fadeIn}>
    <Card 
      hoverable
      className={styles.featureCard}
      bodyStyle={{ padding: '24px' }}
    >
      <div className={styles.iconContainer}>
        <span style={{ fontSize: '28px' }}>{icon}</span>
      </div>
      <Title level={4}>{title}</Title>
      <Paragraph style={{ color: 'rgba(0, 0, 0, 0.65)', marginBottom: '16px' }}>
        {description}
      </Paragraph>
      {linkText && linkTo && (
        <Link to={linkTo}>
          <Button type="link" style={{ paddingLeft: 0 }}>{linkText}</Button>
        </Link>
      )}
    </Card>
  </motion.div>
);

// Testimonial card component
const TestimonialCard = ({ emoji, name, location, testimonial }) => (
  <motion.div variants={fadeIn}>
    <Card className={styles.testimonialCard}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Avatar className={styles.testimonialAvatar} size={48}>
          {emoji}
        </Avatar>
        <div style={{ marginLeft: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>{name}</Title>
          <Text type="secondary">{location}</Text>
        </div>
      </div>
      <Paragraph italic style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
        {testimonial}
      </Paragraph>
    </Card>
  </motion.div>
);

// HomePage component
const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Features data
  const features = [
    {
      icon: '📝',
      title: 'Register & Login',
      description: 'Create an account to access all features and report lost pets.',
      linkText: 'Create Account',
      linkTo: '/register'
    },
    {
      icon: '🔍',
      title: 'Dashboard Access',
      description: 'Get access to your personalized dashboard after login.',
      linkText: 'Sign In',
      linkTo: '/login'
    },
    {
      icon: '🤝',
      title: 'Community Help',
      description: 'Join our community to help pet owners find their lost pets.',
      linkText: 'Join Community',
      linkTo: '/register'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      emoji: '🐕',
      name: 'Max\'s Return',
      location: 'Sarah Johnson, New York',
      testimonial: '"I lost Max during a storm and was devastated. Thanks to PetFinder, someone spotted him 3 miles away and contacted me immediately. We were reunited within hours!"'
    },
    {
      emoji: '🐈',
      name: 'Luna\'s Journey Home',
      location: 'David Martinez, Los Angeles',
      testimonial: '"Luna slipped out of our apartment and disappeared. Thanks to the amazing community on PetFinder, she was found safe and sound at a neighbor\'s garage. So grateful!"'
    }
  ];

  // Stats data
  const stats = [
    { title: 'Pets Found', value: 500, prefix: '+', color: '#333333' },
    { title: 'Active Users', value: 1200, prefix: '+', color: '#333333' },
    { title: 'Cities Covered', value: 50, prefix: '+', color: '#333333' },
    { title: 'Success Rate', value: 98, suffix: '%', color: '#333333' }
  ];

  return (
    <Layout style={{ background: '#fff', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            opacity: 0.4,
            transform: `translateY(${scrollY * 0.2}px)`,
            backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-white-shapes-background_79603-1362.jpg")',
            backgroundSize: 'cover',
            zIndex: 0
          }} 
        />
        
        <div className={styles.container} style={{ position: 'relative', zIndex: 1 }}>
          <Row gutter={[48, 32]} align="middle">
            <Col xs={24} md={14}>
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div className={styles.tagBadge}>
                    <span>🐾</span>
                    <span>Reuniting pets with their families</span>
                  </div>
                  
                  <Title level={1} style={{ margin: '16px 0', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    Find Your Lost <Text style={{ color: '#333333' }}>Pet</Text> With Our Community
                  </Title>
                  
                  <Paragraph style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.75)', maxWidth: '600px' }}>
                    PetFinder helps reunite lost pets with their owners through our community-driven platform for reporting and finding missing pets.
                  </Paragraph>
                  
                  <Space size="middle" wrap className={styles.buttonGroup}>
                    {isAuthenticated ? (
                      <Link to="/dashboard">
                        <Button size="large" type="primary" icon={<DashboardOutlined />}>
                          View Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/register">
                          <Button size="large" type="primary" icon={<FormOutlined />} className={styles.primaryButton}>
                            Report Missing Pet
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button size="large" icon={<UserOutlined />} className={styles.secondaryButton}>
                            Sign In
                          </Button>
                        </Link>
                      </>
                    )}
                  </Space>
                  
                  {/* Stats counter */}
                  <div className={styles.statCounter}>
                    <Row gutter={[16, 16]}>
                      <Col span={8}>
                        <Statistic 
                          title="Pets Found" 
                          value={5243} 
                          valueStyle={{ color: '#333333', fontWeight: 'bold' }}
                          prefix={<HeartOutlined />} 
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic 
                          title="Members" 
                          value={10892} 
                          valueStyle={{ color: '#52c41a', fontWeight: 'bold' }}
                          prefix={<UserOutlined />} 
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic 
                          title="Success Rate" 
                          value={95} 
                          suffix="%" 
                          valueStyle={{ color: '#333333', fontWeight: 'bold' }}
                          prefix={<HomeOutlined />} 
                        />
                      </Col>
                    </Row>
                  </div>
                </Space>
              </motion.div>
            </Col>
            
            <Col xs={24} md={10}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={styles.profileImageWrapper}
              >
                <img 
                  src={profileImage} 
                  alt="Pet Profile" 
                  className={styles.profileImage}
                />
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <Section style={{ background: '#fff', padding: '80px 0' }}>
        <SectionTitle 
          title="How It Works" 
          subtitle="Our platform makes it easy to find lost pets and reunite them with their owners"
        />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <FeatureCard {...feature} />
              </Col>
            ))}
          </Row>
        </motion.div>
      </Section>

      {/* Statistics Section */}
      <Section style={{ background: '#f9f9f9', padding: '60px 0' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <motion.div variants={fadeIn} style={{ textAlign: 'center' }}>
                  <Statistic 
                    title={stat.title} 
                    value={stat.value} 
                    valueStyle={{ color: stat.color, fontWeight: 'bold' }} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Section>

      {/* Testimonials Section */}
      <Section style={{ background: '#fff', padding: '80px 0' }}>
        <SectionTitle 
          title="Success Stories" 
          subtitle="Read how PetFinder has helped reunite pets with their families"
        />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={12} key={index}>
                <TestimonialCard {...testimonial} />
              </Col>
            ))}
          </Row>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section className={styles.ctaSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className={styles.ctaContent}
        >
          <Title level={2} style={{ fontWeight: 700 }}>Ready to find your lost pet?</Title>
          <Paragraph style={{ 
            fontSize: '18px', 
            color: 'rgba(0, 0, 0, 0.65)', 
            maxWidth: '600px', 
            margin: '0 auto 32px' 
          }}>
            Join our community today and increase the chances of finding your pet or help others find theirs.
          </Paragraph>
          
          {!isAuthenticated && (
            <Space size="middle" wrap style={{ justifyContent: 'center' }}>
              <Link to="/register">
                <Button size="large" type="primary">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="large">
                  Sign In
                </Button>
              </Link>
            </Space>
          )}
        </motion.div>
      </Section>
      
      <BackTop>
        <div className={styles.backTopButton}>
          <ArrowUpOutlined />
        </div>
      </BackTop>

      {/* Footer */}
      <Footer className={styles.footer}>
        <div className={styles.container}>
          <Row gutter={[24, 40]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div>
                <Link to="/" className={styles.footerLogo}>
                  PetFinder <span>🐾</span>
                </Link>
              </div>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                Helping reunite lost pets with their families through our community-driven platform.
              </Paragraph>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</Title>
              <ul className={styles.footerNav}>
                <li><Link to="/" className={styles.footerNavLink}>Home</Link></li>
                <li><Link to="/dashboard" className={styles.footerNavLink}>Dashboard</Link></li>
                <li><Link to="/register" className={styles.footerNavLink}>Sign Up</Link></li>
                <li><Link to="/login" className={styles.footerNavLink}>Login</Link></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>Resources</Title>
              <ul className={styles.footerNav}>
                <li><a href="#" className={styles.footerNavLink}>Pet Care Tips</a></li>
                <li><a href="#" className={styles.footerNavLink}>Lost Pet Guide</a></li>
                <li><a href="#" className={styles.footerNavLink}>Community Forums</a></li>
                <li><a href="#" className={styles.footerNavLink}>FAQs</a></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} style={{ color: '#fff', marginBottom: '20px' }}>Contact Us</Title>
              <ul className={styles.footerNav}>
                <li style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Email: support@petfinder.com</li>
                <li style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Phone: (123) 456-7890</li>
                <li style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Address: 123 Pet Street, Animal City</li>
              </ul>
            </Col>
          </Row>
          
          <Divider className={styles.footerDivider} />
          
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12} className={styles.footerLeft}>
              <Text className={styles.footerCopyright}>
                © 2023 PetFinder. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} md={12} className={styles.footerRight}>
              <Space size={16}>
                {['📘', '🐦', '📷', '🎥'].map((icon, index) => (
                  <a key={index} href="#" className={styles.socialIcon}>
                    <span role="img" aria-label={['facebook', 'twitter', 'instagram', 'youtube'][index]}>
                      {icon}
                    </span>
                  </a>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage; 