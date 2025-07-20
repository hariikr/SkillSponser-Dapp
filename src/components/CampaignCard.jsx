import React from 'react';
import { Card, CardContent, Typography, Button, Stack, LinearProgress, Avatar, Box, Chip, Tooltip, IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function CampaignCard({ campaign, onDonate, onViewDonators, isOwner }) {
  const progress = Math.min((Number(campaign.amountCollected) / Number(campaign.target)) * 100, 100);
  const deadlineDate = campaign.deadline ? new Date(Number(campaign.deadline) * 1000) : null;
  const isExpired = deadlineDate && deadlineDate < new Date();
  const [showMore, setShowMore] = React.useState(false);

  // Generate a skill/course category based on title or description
  const getSkillCategory = () => {
    const text = (campaign.title + ' ' + campaign.description).toLowerCase();
    if (text.includes('web') || text.includes('frontend') || text.includes('react') || text.includes('javascript')) return 'Web Development';
    if (text.includes('blockchain') || text.includes('crypto') || text.includes('defi') || text.includes('solidity')) return 'Blockchain';
    if (text.includes('ai') || text.includes('machine') || text.includes('data') || text.includes('python')) return 'AI & Data Science';
    if (text.includes('mobile') || text.includes('ios') || text.includes('android') || text.includes('flutter')) return 'Mobile Development';
    if (text.includes('design') || text.includes('ui') || text.includes('ux') || text.includes('figma')) return 'Design';
    if (text.includes('business') || text.includes('marketing') || text.includes('finance') || text.includes('entrepreneur')) return 'Business';
    return 'Professional Development';
  };

  const skillCategory = getSkillCategory();

  return (
    <Card sx={{
      minWidth: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      maxWidth: 420,
      m: 1,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      borderRadius: 4,
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #475569',
      '&:hover': { 
        transform: 'translateY(-8px)', 
        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
        border: '1px solid #6366f1',
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        <img
          src={typeof campaign.image === 'string' && campaign.image.trim() !== '' ? campaign.image : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'}
          alt={campaign.title || 'Learner Profile'}
          style={{ width: '100%', height: 200, objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }} />
        
        {/* Skill Category Badge */}
        <Chip 
          label={skillCategory} 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            left: 16,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
          }} 
        />
        
        {/* Status Badge */}
        {isExpired ? (
          <Chip 
            label="Campaign Ended" 
            color="error" 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            }} 
          />
        ) : (
          <Chip 
            label="Active" 
            size="small"
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
            }} 
          />
        )}

        {/* Video Play Button (if video pitch exists) */}
        {campaign.videoPitch && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(99, 102, 241, 0.9)',
              color: 'white',
              '&:hover': {
                background: 'rgba(99, 102, 241, 1)',
              }
            }}
          >
            <PlayArrowIcon />
          </IconButton>
        )}
      </Box>

      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Learner Info */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              fontSize: '1.2rem',
              fontWeight: 600,
            }}
          >
            {campaign.owner ? campaign.owner.slice(2, 4).toUpperCase() : 'L'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#f8fafc', mb: 0.5 }}>
              {campaign.title && typeof campaign.title === 'string' && campaign.title.trim() !== '' ? campaign.title : 'Learning Campaign'}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOnIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="body2" color="#94a3b8">
                {campaign.owner ? `${campaign.owner.slice(0, 6)}...${campaign.owner.slice(-4)}` : 'Anonymous Learner'}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Description */}
        <Typography variant="body2" color="#94a3b8" sx={{ mb: 2, minHeight: 40, lineHeight: 1.6 }}>
          {campaign.description && typeof campaign.description === 'string' && campaign.description.trim() !== '' 
            ? campaign.description 
            : 'Passionate learner seeking support for professional development and skill enhancement.'
          }
        </Typography>

        {/* Story/Background */}
        {campaign.story && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="#e0e0e0" sx={{ fontStyle: 'italic', lineHeight: 1.6 }}>
              {showMore ? campaign.story : `${campaign.story.slice(0, 120)}...`}
              {campaign.story.length > 120 && (
                <Button 
                  size="small" 
                  sx={{ 
                    ml: 1, 
                    color: '#6366f1',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { background: 'rgba(99, 102, 241, 0.1)' }
                  }} 
                  onClick={() => setShowMore(s => !s)}
                >
                  {showMore ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </Typography>
          </Box>
        )}

        {/* Funding Progress */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="body2" color="#94a3b8">
              Progress: <span style={{ color: '#10b981', fontWeight: 600 }}>{progress.toFixed(1)}%</span>
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              {deadlineDate && `Ends ${deadlineDate.toLocaleDateString()}`}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ 
              mb: 2, 
              height: 8, 
              borderRadius: 4, 
              background: '#475569', 
              '& .MuiLinearProgress-bar': { 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                borderRadius: 4,
              } 
            }}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="#94a3b8">
              Raised: <span style={{ color: '#10b981', fontWeight: 600 }}>{campaign.amountCollected} ETH</span>
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              Goal: <span style={{ color: '#f59e0b', fontWeight: 600 }}>{campaign.target} ETH</span>
            </Typography>
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
          <Button 
            variant="contained" 
            onClick={onDonate} 
            fullWidth
            sx={{ 
              fontWeight: 600, 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
              }
            }}
          >
            Support Learner
          </Button>
          <Button 
            variant="outlined" 
            onClick={onViewDonators} 
            sx={{ 
              fontWeight: 600, 
              borderRadius: 2, 
              color: '#6366f1', 
              borderColor: '#6366f1', 
              minWidth: 'auto',
              px: 2,
              '&:hover': { 
                borderColor: '#5855eb',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
              } 
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 20 }} />
          </Button>
        </Stack>

        {/* Owner Badge */}
        {isOwner && (
          <Chip 
            label="Your Campaign" 
            size="small"
            sx={{ 
              mt: 2,
              alignSelf: 'center',
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
              color: 'white',
              fontWeight: 600,
            }} 
          />
        )}
      </CardContent>
    </Card>
  );
}
