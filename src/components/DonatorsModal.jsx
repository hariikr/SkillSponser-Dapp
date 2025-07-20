import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function DonatorsModal({ open, onClose, donators, donations }) {
  const totalSupport = donations.reduce((sum, donation) => sum + parseFloat(donation), 0);
  const supporterCount = donators.length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          borderRadius: 4,
          border: '1px solid #475569',
        }
      }}
    >
      <DialogTitle sx={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        borderBottom: '1px solid #475569',
        pb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PeopleIcon sx={{ fontSize: 32, color: '#6366f1' }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.5 }}>
              Learning Supporters
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              People who believe in this learner's potential
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {/* Support Summary */}
        <Box sx={{
          mb: 3,
          p: 2,
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: 2,
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ color: '#f8fafc', fontWeight: 600 }}>
                {supporterCount} Supporters
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Total community support
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 600 }}>
                {totalSupport.toFixed(4)} BNB
              </Typography>
              <Typography variant="body2" color="#94a3b8">
                Total raised
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Supporters List */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
            Supporters List
          </Typography>

          {donators.length === 0 ? (
            <Box sx={{
              textAlign: 'center',
              py: 4,
              background: 'rgba(71, 85, 105, 0.2)',
              borderRadius: 2,
              border: '1px dashed #475569'
            }}>
              <EmojiEventsIcon sx={{ fontSize: 48, color: '#475569', mb: 2 }} />
              <Typography variant="body1" color="#94a3b8" sx={{ mb: 1 }}>
                No supporters yet
              </Typography>
              <Typography variant="body2" color="#64748b">
                Be the first to support this learner's journey!
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {donators.map((addr, i) => (
                <React.Fragment key={addr + i}>
                  <ListItem sx={{
                    px: 0,
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(99, 102, 241, 0.05)',
                      borderRadius: 1,
                    }
                  }}>
                    <ListItemAvatar>
                      <Avatar sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}>
                        {addr.slice(2, 4).toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" sx={{ color: '#f8fafc', fontWeight: 500 }}>
                            {addr.slice(0, 6)}...{addr.slice(-4)}
                          </Typography>
                          <Chip
                            label="Supporter"
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              fontSize: '0.7rem',
                              height: 20,
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <FavoriteIcon sx={{ fontSize: 16, color: '#ef4444' }} />
                          <Typography variant="body2" color="#94a3b8">
                            Supported with <span style={{ color: '#10b981', fontWeight: 600 }}>{donations[i]} BNB</span>
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {i < donators.length - 1 && (
                    <Divider sx={{ borderColor: '#475569', opacity: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Community Message */}
        {donators.length > 0 && (
          <Box sx={{
            mt: 3,
            p: 2,
            background: 'rgba(16, 185, 129, 0.1)',
            borderRadius: 2,
            border: '1px solid rgba(16, 185, 129, 0.2)',
            textAlign: 'center'
          }}>
            <Typography variant="body2" color="#6ee7b7" sx={{ fontWeight: 500 }}>
              🎉 Amazing community support! Every contribution helps this learner achieve their goals.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
