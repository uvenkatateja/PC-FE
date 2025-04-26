import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
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
  Image,
  Spin
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
import Lottie from 'lottie-react';
import styles from './HomePage.module.css';
import profileImage from '../../assets/profile.jpg';
import PetCarousel from '../../components/Carousel/PetCarousel';
import findPetsAnimation from '../../assets/findpets.json';

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

// New animation variants for enhanced effects
const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } }
};

const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 } }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10, duration: 0.6 } }
};

const bounce = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 15,
      duration: 0.6 
    } 
  }
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
    className={styles.sectionTitle}
  >
    <Title level={2} className={styles.sectionTitleText}>{title}</Title>
    {subtitle && (
      <Paragraph className={styles.sectionSubtitle}>{subtitle}</Paragraph>
    )}
  </motion.div>
);

// Feature card component - Enhanced with better animations
const FeatureCard = ({ icon, title, description, linkText, linkTo, index }) => (
  <motion.div 
    variants={index % 2 === 0 ? slideInLeft : slideInRight}
    custom={index}
    viewport={{ once: true, amount: 0.2 }}
    className={styles.featureCardContainer}
  >
    <Card 
      hoverable
      className={styles.featureCard}
      bodyStyle={{ padding: '30px' }}
    >
      <motion.div 
        className={styles.iconContainer}
        whileHover={{ 
          scale: 1.1, 
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.3 }
        }}
      >
        <span className={styles.featureIcon}>{icon}</span>
      </motion.div>
      <Title level={3} className={styles.featureTitle}>{title}</Title>
      <Paragraph className={styles.featureDescription}>{description}</Paragraph>
      {linkText && linkTo && (
        <Link to={linkTo}>
          <Button type="link" className={styles.featureLink}>{linkText} →</Button>
        </Link>
      )}
    </Card>
  </motion.div>
);

// Testimonial card component
const TestimonialCard = ({ emoji, name, location, testimonial }) => (
  <motion.div variants={fadeIn} className={styles.testimonialCard}>
    <div className={styles.testimonialAvatarContainer}>
      <Avatar className={styles.testimonialAvatar} size={48}>
        {emoji}
      </Avatar>
    </div>
    <div className={styles.testimonialContent}>
      <Title level={4} className={styles.testimonialName}>{name}</Title>
      <Text type="secondary" className={styles.testimonialLocation}>{location}</Text>
      <Paragraph italic className={styles.testimonialText}>{testimonial}</Paragraph>
    </div>
  </motion.div>
);

// DogLoader component for loading states
const DogLoader = lazy(() => import('../../components/Loader/DogLoader'));

// HomePage component
const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track scroll position with useCallback for better performance
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  // Track scroll position
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Simulate image loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Features data - expanded with more detailed information
  const features = useMemo(() => [
    {
      icon: '📝',
      title: 'Register & Login',
      description: 'Create a secure account in minutes to access our full platform. Set up your profile, add your contact details, and start using our services immediately. Our fast registration process ensures you can get started right away.',
      linkText: 'Create Account',
      linkTo: '/register'
    },
    {
      icon: '🔍',
      title: 'Dashboard Access',
      description: 'Your personalized dashboard gives you a complete overview of your activity. Track your pets, monitor their health data, schedule appointments, and receive important notifications all in one place. Stay organized with our intuitive interface.',
      linkText: 'Sign In',
      linkTo: '/login'
    },
    {
      icon: '🤝',
      title: 'Community Help',
      description: 'Connect with thousands of pet lovers in our supportive community. Share experiences, get advice, find local pet services, and help others in need. Our community members have helped reunite hundreds of lost pets with their families.',
      linkText: 'Join Community',
      linkTo: '/register'
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Take PetCare with you anywhere using our mobile-friendly platform. Get real-time notifications, access pet information, and connect with our community on any device. Always stay connected, even while traveling.',
      linkText: 'Learn More',
      linkTo: '/register'
    }
  ], []);

  // Testimonials data - memoized to prevent unnecessary re-renders
  const testimonials = useMemo(() => [
    {
      emoji: '🐕',
      name: 'Max\'s Return',
      quote: 'Thanks to this platform, we found our dog Max within 48 hours of posting!',
      author: 'Sarah J.',
      location: 'Boston, MA'
    },
    {
      emoji: '🐈',
      name: 'Whiskers Home',
      quote: 'Our cat was missing for a week until someone on this site recognized her from our post.',
      author: 'Michael T.',
      location: 'Los Angeles, CA'
    }
  ], []);

  // Stats data
  const stats = [
    { title: 'Pets Found', value: 500, prefix: '+', color: '#333333' },
    { title: 'Active Users', value: 1200, prefix: '+', color: '#333333' },
    { title: 'Cities Covered', value: 50, prefix: '+', color: '#333333' },
    { title: 'Success Rate', value: 98, suffix: '%', color: '#333333' }
  ];

  // Warm color palette that complements orange
  const colors = {
    warmBackground: '#FFF8F0',
    lighterOrange: '#FFE6D9',
    softCream: '#FFF6EC',
    accentOrange: '#FF7F50',
    deepOrange: '#E86A3E',
    softBlue: '#E6F7FF',
    accentBlue: '#1890FF'
  };

  return (
    <Layout className={styles.heroLayout}>
      {/* Hero Section */}
      <div className={`${styles.heroSection} ${styles.heroSectionWrapper}`}>
        <div className={styles.petPattern} />
        
        {/* Decorative elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0, x: -100 }}
          animate={{ opacity: 0.6, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={styles.decorativeCircleLeft}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 0.5, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={styles.decorativeCircleRight}
        />
        
        <div className={`${styles.container} ${styles.heroContainer}`}>
          <Row gutter={[{ xs: 16, sm: 24, md: 32, lg: 48 }, { xs: 16, sm: 24, md: 32 }]} align="middle" justify="center" className={styles.heroRow}>
            <Col xs={24} sm={24} md={14} lg={12} className={styles.heroContentCol}>
              <motion.div initial="hidden" animate="visible" variants={fadeIn} className={styles.heroContent}>
                <Space direction="vertical" size="large" className={styles.heroSpace}>
                  <div className={`${styles.tagBadge} ${styles.tagBadgeGradient}`}>
                    <span>🐾</span>
                    <span>Reuniting pets with their families</span>
                  </div>
                  
                  <Title level={1} className={styles.heroTitle}>
                    Your <span className={styles.heroHighlight}>Pet Care</span> Center
                  </Title>
                  
                  <Paragraph className={styles.heroParagraph}>
                    We believe finding a reliable, professional pet sitter should be easy. So make sure every member of our Family gets the best care possible.
                  </Paragraph>
                  
                  <Space size="middle" wrap className={styles.buttonGroup}>
                    {isAuthenticated ? (
                      <Link to="/dashboard">
                        <Button 
                          size="large" 
                          type="primary" 
                          icon={<DashboardOutlined />} 
                          className={`${styles.primaryButton} ${styles.primaryButtonGradient}`}
                        >
                          View Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/register">
                          <Button 
                            size="large" 
                            className={`${styles.primaryButton} ${styles.primaryButtonGradient}`}
                          >
                            <Space>
                              <span role="img" aria-label="paw">🐾</span>
                              Watch Now
                            </Space>
                          </Button>
                        </Link>
                        <Link to="/login">
                          <Button 
                            size="large"
                            className={`${styles.secondaryButton} ${styles.secondaryButtonCustom}`}
                          >
                            Our Service
                          </Button>
                        </Link>
                      </>
                    )}
                  </Space>
                  
                  {/* Stats counter */}
                  <div className={`${styles.statCounter} ${styles.statCounterCustom}`}>
                    <Row align="middle">
                      <Col>
                        <div className={styles.flexAlignCenter}>
                          <div className={styles.marginRightSmall}>
                            <Text strong className={styles.strongTextOrange}>4k+</Text>
                          </div>
                          <div className={styles.flexAlignCenter}>
                            <Avatar.Group
                              maxCount={3}
                              maxStyle={{ 
                                color: colors.accentOrange, 
                                backgroundColor: colors.lighterOrange,
                                border: '2px solid #fff',
                                fontWeight: 'bold'
                              }}
                            >
                              <Avatar 
                                style={{ 
                                  backgroundColor: colors.accentOrange, 
                                  border: '2px solid #fff',
                                  color: '#fff'
                                }}
                              >
                                J
                              </Avatar>
                              <Avatar 
                                style={{ 
                                  backgroundColor: colors.deepOrange, 
                                  border: '2px solid #fff',
                                  color: '#fff'
                                }}
                              >
                                S
                              </Avatar>
                              <Avatar 
                                style={{ 
                                  backgroundColor: '#FFA07A', 
                                  border: '2px solid #fff',
                                  color: '#fff'
                                }}
                              >
                                M
                              </Avatar>
                            </Avatar.Group>
                            <Text className={styles.marginLeftSmall}>Satisfied Customers</Text>
                          </div>
                        </div>
                      </Col>
                      <Col className={styles.marginLeftAuto}>
                        <div className={styles.flexAlignCenter}>
                          <Text>Rating</Text>
                          <div className={`${styles.flexAlignCenter} ${styles.marginLeftSmall}`}>
                            <span role="img" aria-label="star" className={styles.starIcon}>⭐</span>
                            <Text strong className={styles.strongRating}>5.0</Text>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Space>
              </motion.div>
            </Col>
            
            <Col xs={24} sm={24} md={10} lg={10} className={styles.heroImageCol}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
                className={`${styles.profileImageWrapper} ${styles.profileImageContainer}`}
              >
                {!imagesLoaded ? (
                  <div className={styles.imageLoader}>
                    <Suspense fallback={<Spin size="large" />}>
                      <DogLoader size="medium" showCaption={false} />
                    </Suspense>
                  </div>
                ) : null}
                
                {/* Decorative elements behind the image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className={styles.decorativeShape}
                />
                
                <img 
                  src={profileImage} 
                  alt="Pet Care Profile" 
                  className={`${styles.profileImage} ${styles.profileImageStyle} ${imagesLoaded ? styles.imageLoaded : styles.imageLoading}`} 
                  onLoad={() => setImagesLoaded(true)}
                  loading="lazy"
                />
                
                {/* Floating paw prints */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className={styles.pawPrintBottom}
                >
                  🐾
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className={styles.pawPrintTop}
                >
                  🐾
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section - Enhanced with better animations and improved layout */}
      <Section className={styles.featuresSection}>
        {/* Decorative background elements */}
        <div className={styles.decorativeShapeTop} />
        
        <div className={styles.decorativeShapeBottom} />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scaleUp}
          className={styles.howItWorksHeader}
        >
          <div className={styles.sectionBadge}>
            <span role="img" aria-label="how it works">🔍</span>
            <span>Simple Process</span>
          </div>
          
          <Title level={2} className={styles.howItWorksTitle}>
            How It Works
            <motion.div 
              className={styles.titleUnderline}
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </Title>
          
          <Paragraph className={styles.howItWorksParagraph}>
            Our platform makes it easy to care for your pets and access services with just a few clicks. 
            Follow these simple steps to get started and experience the best pet care available.
          </Paragraph>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={styles.featuresContainer}
        >
          <Row gutter={[{ xs: 16, sm: 24, md: 32 }, { xs: 24, sm: 32, md: 48 }]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={12} lg={index < 2 ? 12 : 12} key={index}>
                <FeatureCard 
                  {...feature} 
                  index={index}
                />
              </Col>
            ))}
          </Row>
          
          <motion.div 
            className={styles.howItWorksExtra}
            variants={bounce}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Card className={styles.stepsCard}>
              <Title level={3} className={styles.stepsTitle}>4 Simple Steps</Title>
              <Row gutter={[{ xs: 15, sm: 20, md: 30 }, { xs: 15, sm: 20, md: 30 }]}>
                {[
                  { number: '01', title: 'Create Account', desc: 'Sign up in seconds' },
                  { number: '02', title: 'Set Up Profile', desc: 'Add your pets\' details' },
                  { number: '03', title: 'Browse Services', desc: 'Find what you need' },
                  { number: '04', title: 'Get Started', desc: 'Enjoy the benefits' }
                ].map((step, i) => (
                  <Col xs={12} sm={12} md={6} key={i}>
                    <motion.div 
                      className={styles.stepItem}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <div className={styles.stepNumber}>{step.number}</div>
                      <Title level={5} className={styles.stepTitle}>{step.title}</Title>
                      <Text type="secondary" className={styles.stepDescription}>{step.desc}</Text>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Card>
          </motion.div>
        </motion.div>
      </Section>

      {/* Statistics Section */}
      <Section className={styles.statisticsSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <Row gutter={[{ xs: 16, sm: 24, md: 32 }, { xs: 16, sm: 24, md: 32 }]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} md={6} key={index}>
                <motion.div variants={fadeIn} className={styles.statisticItem}>
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
      <Section className={styles.testimonialsSection}>
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
          <Row gutter={[{ xs: 16, sm: 20, md: 24 }, { xs: 16, sm: 20, md: 24 }]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} sm={12} md={8} lg={8} key={index}>
                <TestimonialCard 
                  {...testimonial} 
                  className={styles.testimonialItemStyle}
                />
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
          <Paragraph className={styles.ctaParagraph}>
            Join thousands of pet owners who have successfully found their lost pets using our platform. Our community is growing every day!
          </Paragraph>
          
          {!isAuthenticated && (
            <Row gutter={[24, 24]} align="middle" justify="center">
              <Col xs={24} md={12} className={styles.ctaFlexCenter}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={styles.ctaImageContainer}
                >
                  <Lottie 
                    animationData={findPetsAnimation} 
                    loop={true}
                    className={styles.lottieFullWidth}
                  />
                </motion.div>
              </Col>
              <Col xs={24} md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Space direction="vertical" size="large" className={styles.ctaSpace}>
                    <Title level={3} className={styles.ctaTitle}>
                      Ready to find your lost pet?
                    </Title>
                    <Paragraph className={styles.ctaDescription}>
                      Create an account today and get access to our powerful pet finding tools and supportive community.
                    </Paragraph>
                    <Space size="middle" wrap className={styles.ctaButtonsContainer}>
                      <Link to="/register">
                        <Button 
                          size="large" 
                          type="primary"
                          className={styles.primaryButtonGradient}
                        >
                          Sign Up Now
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button 
                          size="large"
                          className={styles.secondaryButtonCustom}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </Space>
                  </Space>
                </motion.div>
              </Col>
            </Row>
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
          <Row gutter={[{ xs: 16, sm: 20, md: 24 }, { xs: 20, sm: 30, md: 40 }]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <div>
                <Link to="/" className={styles.footerLogo}>
                  PetFinder <span>🐾</span>
                </Link>
              </div>
              <Paragraph className={styles.footerParagraph}>
                Helping reunite lost pets with their families through our community-driven platform.
              </Paragraph>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} className={styles.footerHeading}>Quick Links</Title>
              <ul className={styles.footerNav}>
                <li><Link to="/" className={styles.footerNavLink}>Home</Link></li>
                <li><Link to="/dashboard" className={styles.footerNavLink}>Dashboard</Link></li>
                <li><Link to="/register" className={styles.footerNavLink}>Sign Up</Link></li>
                <li><Link to="/login" className={styles.footerNavLink}>Login</Link></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} className={styles.footerHeading}>Resources</Title>
              <ul className={styles.footerNav}>
                <li><a href="#" className={styles.footerNavLink}>Pet Care Tips</a></li>
                <li><a href="#" className={styles.footerNavLink}>Lost Pet Guide</a></li>
                <li><a href="#" className={styles.footerNavLink}>Community Forums</a></li>
                <li><a href="#" className={styles.footerNavLink}>FAQs</a></li>
              </ul>
            </Col>
            
            <Col xs={24} sm={12} md={8} lg={6}>
              <Title level={4} className={styles.footerHeading}>Contact Us</Title>
              <ul className={styles.footerNav}>
                <li className={styles.contactItem}>Email: support@petfinder.com</li>
                <li className={styles.contactItem}>Phone: (123) 456-7890</li>
                <li className={styles.contactItem}>Address: 123 Pet Street, Animal City</li>
              </ul>
            </Col>
          </Row>
          
          <Divider className={styles.footerDivider} />
          
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12} className={styles.footerLeft}>
              <Text className={styles.footerCopyright}>
                &copy; 2023 PetFinder. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} md={12} className={styles.footerRight}>
              <Space size={16}>
                {['📖', '🐦', '📷', '📺'].map((icon, index) => (
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