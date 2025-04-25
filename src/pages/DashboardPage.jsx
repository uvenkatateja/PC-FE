import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { 
  Tabs, 
  Card, 
  Avatar, 
  Badge, 
  Button,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  BellOutlined,
  DashboardOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const DashboardPage = ({ tab = 'dashboard' }) => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState(tab);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInquiry = () => {
    // Function to handle inquiry button click
    console.log('Inquiry button clicked');
    // Add your inquiry logic here
  };

  return (
    <PageContainer>
      <DashboardHeader>
        <HeaderTitle>
          {activeTab !== 'dashboard' && (
            <>
              <h1>My Dashboard</h1>
              <span>Welcome back, {user?.name}</span>
            </>
          )}
        </HeaderTitle>
        
        
      </DashboardHeader>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        size={isMobile ? "small" : "large"}
      >
        <TabPane 
          tab={
            <span>
              <DashboardOutlined />
              Dashboard
            </span>
          } 
          key="dashboard"
        >
          <CardGrid>
            {/* Main Card with Inquiry Button */}
            <DashboardCard span={3}>
              <CardHeader>
                <h3>Pet Care Services</h3>
              </CardHeader>
              <CardContent>
                <CenteredContent>
                  <WelcomeText>
                    Need assistance with your pet?
                  </WelcomeText>
                  <InquiryDescription>
                    Submit an inquiry to our team and we'll get back to you as soon as possible.
                  </InquiryDescription>
                  <ButtonWrapper>
                    <InquiryButton onClick={handleInquiry}>
                      <QuestionCircleOutlined /> Submit an Inquiry
                    </InquiryButton>
                  </ButtonWrapper>
                </CenteredContent>
              </CardContent>
            </DashboardCard>
          </CardGrid>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <UserOutlined />
              Profile
            </span>
          } 
          key="profile"
        >
          <DashboardCard>
            <CardHeader>
              <h3>Personal Information</h3>
            </CardHeader>
            <CardContent>
              <ProfileDetails>
                <DetailItem>
                  <DetailLabel>Name:</DetailLabel>
                  <DetailValue>{user?.name}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Email:</DetailLabel>
                  <DetailValue>{user?.email}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Account Created:</DetailLabel>
                  <DetailValue>{new Date().toLocaleDateString()}</DetailValue>
                </DetailItem>
              </ProfileDetails>
              <ButtonWrapper>
                <StyledButton>
                  <SettingOutlined /> Edit Profile
                </StyledButton>
              </ButtonWrapper>
            </CardContent>
          </DashboardCard>
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 7rem 1rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 8rem 0.75rem 0.75rem;
  }
`;

const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 0.25rem;
    color: #333;
  }
  
  span {
    color: #666;
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.75rem;
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    align-self: flex-end;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  color: #333;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DashboardCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1.5px solid #000000;
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.span ? `span ${props.span}` : 'auto'};
  
  @media (max-width: 768px) {
    grid-column: 1;
    border-radius: 8px;
  }
  
  @media (max-width: 480px) {
    border-radius: 6px;
  }
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    
    h3 {
      font-size: 1.1rem;
    }
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 1.25rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
`;

const WelcomeText = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const InquiryDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;
`;

const InquiryButton = styled.button`
  background-color: #000;
  color: #fff;
  border: 1.5px solid #000;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  transition: all 0.3s;
  
  &:hover {
    background-color: #333;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  background-color: #fff;
  color: #000;
  border: 1.5px solid #000;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.75rem;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const DetailLabel = styled.div`
  font-weight: 500;
  color: #333;
  width: 150px;
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const DetailValue = styled.div`
  flex: 1;
`;

export default DashboardPage; 