import React from 'react';
import { Button, Box, Typography, Tabs, Tab, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Header({ onCreate, currentView, onViewChange }) {
  const handleTabChange = (event, newValue) => {
    onViewChange(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      borderRadius: 4,
      boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)',
      padding: '24px 32px',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SchoolIcon sx={{ fontSize: 40, color: '#6366f1' }} />
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #6366f1 0%, #f59e0b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 1,
              mb: 0
            }}>
              SkillSponsor
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
              Fund Learning. Fuel Potential.
            </Typography>
          </Box>
        </Box>
        <Button 
          variant="contained" 
          onClick={onCreate} 
          sx={{ 
            fontWeight: 600, 
            borderRadius: 3,
            px: 3,
            py: 1,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
            }
          }}
        >
          Start Learning Campaign
        </Button>
      </Stack>
      
      <Tabs 
        value={currentView} 
        onChange={handleTabChange}
        sx={{
          '& .MuiTab-root': {
            color: '#94a3b8',
            fontWeight: 600,
            fontSize: '1rem',
            textTransform: 'none',
            minHeight: 48,
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
          value="home" 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HomeIcon sx={{ fontSize: 20 }} />
              Home
            </Box>
          } 
        />
        <Tab 
          value="campaigns" 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ fontSize: 20 }} />
              Browse Learners
            </Box>
          } 
        />
        <Tab 
          value="dashboard" 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DashboardIcon sx={{ fontSize: 20 }} />
              Dashboard
            </Box>
          } 
        />
      </Tabs>
    </Box>
  );
}
