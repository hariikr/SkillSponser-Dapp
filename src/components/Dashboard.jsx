import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  Alert
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Dashboard({ campaigns, account }) {
  const [activeTab, setActiveTab] = useState(0);

  // Filter campaigns for current user
  const userCampaigns = campaigns.filter(c => 
    c.owner && account && c.owner.toLowerCase() === account.toLowerCase()
  );

  // Mock data for demonstration
  const mockUserStats = {
    totalRaised: userCampaigns.reduce((sum, c) => sum + Number(c.amountCollected), 0),
    totalSupporters: userCampaigns.length * 3, // Mock data
    completedMilestones: 5,
    pendingMilestones: 2,
    badges: ['First Campaign', 'Community Favorite', 'Milestone Master'],
    recentActivity: [
      { type: 'milestone', message: 'Completed React Fundamentals module', date: '2 days ago' },
      { type: 'support', message: 'Received 0.1 BNB from 0x1234...', date: '3 days ago' },
      { type: 'milestone', message: 'Started Advanced JavaScript course', date: '1 week ago' }
    ]
  };

  const mockSupporterStats = {
    totalSupported: 2.5,
    learnersSupported: 3,
    badges: ['First Supporter', 'Generous Donor', 'Community Builder'],
    supportedLearners: [
      { name: 'React Developer', amount: 1.2, progress: 75, status: 'active' },
      { name: 'AI Enthusiast', amount: 0.8, progress: 45, status: 'active' },
      { name: 'Blockchain Learner', amount: 0.5, progress: 100, status: 'completed' }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderLearnerDashboard = () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, color: '#f8fafc', fontWeight: 700 }}>
        Your Learning Dashboard
      </Typography>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUpIcon sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockUserStats.totalRaised.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                BNB Raised
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: '#6366f1', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockUserStats.totalSupporters}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Supporters
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockUserStats.completedMilestones}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Milestones Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PendingIcon sx={{ fontSize: 40, color: '#ef4444', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockUserStats.pendingMilestones}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Pending Milestones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Your Campaigns */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
          Your Learning Campaigns
        </Typography>
        {userCampaigns.length === 0 ? (
          <Alert severity="info" sx={{ 
            background: 'rgba(59, 130, 246, 0.1)', 
            border: '1px solid #3b82f6',
            color: '#93c5fd'
          }}>
            You haven't created any learning campaigns yet. Start your upskilling journey today!
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {userCampaigns.map((campaign, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
                  border: '1px solid #475569',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                  }
                }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                        {campaign.title}
                      </Typography>
                      <Chip 
                        label="Active" 
                        size="small"
                        sx={{ 
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Stack>
                    
                    <Typography variant="body2" color="#94a3b8" sx={{ mb: 2 }}>
                      {campaign.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color="#94a3b8">
                          Progress
                        </Typography>
                        <Typography variant="body2" color="#10b981" fontWeight={600}>
                          {Math.min((Number(campaign.amountCollected) / Number(campaign.target)) * 100, 100).toFixed(1)}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min((Number(campaign.amountCollected) / Number(campaign.target)) * 100, 100)}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#475569',
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          }
                        }}
                      />
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="#94a3b8">
                        Raised: <span style={{ color: '#10b981', fontWeight: 600 }}>{campaign.amountCollected} BNB</span>
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          borderColor: '#6366f1',
                          color: '#6366f1',
                          '&:hover': { borderColor: '#5855eb' }
                        }}
                      >
                        View Details
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Badges and Achievements */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
          Your Badges & Achievements
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {mockUserStats.badges.map((badge, index) => (
            <Chip
              key={index}
              label={badge}
              icon={<StarIcon />}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Recent Activity */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
          <CardContent>
            <List sx={{ p: 0 }}>
              {mockUserStats.recentActivity.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        background: activity.type === 'milestone' 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        fontSize: '0.9rem'
                      }}>
                        {activity.type === 'milestone' ? <CheckCircleIcon /> : <AttachMoneyIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.date}
                      sx={{
                        '& .MuiListItemText-primary': { color: '#f8fafc', fontWeight: 500 },
                        '& .MuiListItemText-secondary': { color: '#94a3b8' }
                      }}
                    />
                  </ListItem>
                  {index < mockUserStats.recentActivity.length - 1 && (
                    <Divider sx={{ borderColor: '#475569', opacity: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );

  const renderSupporterDashboard = () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, color: '#f8fafc', fontWeight: 700 }}>
        Supporter Dashboard
      </Typography>

      {/* Supporter Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoneyIcon sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockSupporterStats.totalSupported}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                BNB Supported
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#6366f1', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockSupporterStats.learnersSupported}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Learners Supported
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {mockSupporterStats.badges.length}
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Badges Earned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', border: '1px solid #475569' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <StarIcon sx={{ fontSize: 40, color: '#ef4444', mb: 1 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                4.8
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Supporter Rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Supported Learners */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
          Learners You're Supporting
        </Typography>
        <Grid container spacing={2}>
          {mockSupporterStats.supportedLearners.map((learner, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
                border: '1px solid #475569',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                }
              }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                      {learner.name}
                    </Typography>
                    <Chip 
                      label={learner.status} 
                      size="small"
                      sx={{ 
                        background: learner.status === 'completed' 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Stack>
                  
                  <Typography variant="body2" color="#94a3b8" sx={{ mb: 2 }}>
                    Supported with {learner.amount} BNB
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="body2" color="#94a3b8">
                        Progress
                      </Typography>
                      <Typography variant="body2" color="#10b981" fontWeight={600}>
                        {learner.progress}%
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={learner.progress}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#475569',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        }
                      }}
                    />
                  </Box>

                  <Button 
                    variant="outlined" 
                    fullWidth
                    sx={{ 
                      borderColor: '#6366f1',
                      color: '#6366f1',
                      '&:hover': { borderColor: '#5855eb' }
                    }}
                  >
                    View Progress
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Supporter Badges */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
          Your Supporter Badges
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {mockSupporterStats.badges.map((badge, index) => (
            <Chip
              key={index}
              label={badge}
              icon={<StarIcon />}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box>
      <Paper sx={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        border: '1px solid #475569',
        borderRadius: 2,
        mb: 3
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              color: '#94a3b8',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              minHeight: 64,
              '&.Mui-selected': {
                color: '#6366f1',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#6366f1',
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SchoolIcon sx={{ fontSize: 20 }} />
                Learner Dashboard
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleIcon sx={{ fontSize: 20 }} />
                Supporter Dashboard
              </Box>
            } 
          />
        </Tabs>
      </Paper>

      {activeTab === 0 && renderLearnerDashboard()}
      {activeTab === 1 && renderSupporterDashboard()}
    </Box>
  );
} 