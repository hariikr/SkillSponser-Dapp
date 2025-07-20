import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Box,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentIcon from '@mui/icons-material/Payment';

export default function DonateModal({ open, onClose, onDonate }) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [message, setMessage] = useState('');

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    onDonate(amount);
    setAmount('');
    setMessage('');
  };

  const presetAmounts = [0.01, 0.05, 0.1, 0.5, 1.0];

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
          <SchoolIcon sx={{ fontSize: 32, color: '#6366f1' }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.5 }}>
              Support a Learner
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              Help someone achieve their learning goals
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Payment Method Selection */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Payment Method
            </Typography>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#94a3b8' }}>Select Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                  '& .MuiSelect-icon': { color: '#94a3b8' },
                  '& .MuiSelect-select': { color: '#f8fafc' },
                }}
              >
                <MenuItem value="crypto" sx={{ color: '#f8fafc' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaymentIcon sx={{ fontSize: 20 }} />
                    Cryptocurrency (BNB)
                  </Box>
                </MenuItem>
                <MenuItem value="stripe" sx={{ color: '#f8fafc' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaymentIcon sx={{ fontSize: 20 }} />
                    Credit/Debit Card (Coming Soon)
                  </Box>
                </MenuItem>
                <MenuItem value="upi" sx={{ color: '#f8fafc' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaymentIcon sx={{ fontSize: 20 }} />
                    UPI (Coming Soon)
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Amount Selection */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Support Amount
            </Typography>

            {/* Preset Amounts */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="#94a3b8" sx={{ mb: 1 }}>
                Quick Select:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {presetAmounts.map((presetAmount) => (
                  <Chip
                    key={presetAmount}
                    label={`${presetAmount} BNB`}
                    onClick={() => setAmount(presetAmount.toString())}
                    sx={{
                      background: amount === presetAmount.toString()
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        : 'rgba(71, 85, 105, 0.5)',
                      color: 'white',
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Custom Amount */}
            <TextField
              label="Custom Amount (BNB)"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              fullWidth
              placeholder="0.0"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: '#f8fafc' },
              }}
            />
          </Box>

          {/* Support Message */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Message of Support (Optional)
            </Typography>
            <TextField
              label="Leave an encouraging message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              multiline
              rows={3}
              fullWidth
              placeholder="e.g., Good luck with your learning journey! You've got this!"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' },
                '& .MuiInputBase-input': { color: '#f8fafc' },
              }}
            />
          </Box>

          {/* Info Alert */}
          <Alert severity="info" sx={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3b82f6',
            color: '#93c5fd'
          }}>
            <Typography variant="body2">
              Your support will help this learner achieve their educational goals.
              The funds will be released to the learner upon successful completion of milestones.
            </Typography>
          </Alert>
        </Stack>
      </DialogContent>

      <DialogActions sx={{
        p: 3,
        borderTop: '1px solid #475569',
        background: 'rgba(30, 41, 59, 0.5)'
      }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#94a3b8',
            '&:hover': { background: 'rgba(148, 163, 184, 0.1)' }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDonate}
          variant="contained"
          disabled={!amount || parseFloat(amount) <= 0}
          startIcon={<FavoriteIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
            },
            '&:disabled': {
              background: '#475569',
              color: '#94a3b8'
            }
          }}
        >
          Support Learner
        </Button>
      </DialogActions>
    </Dialog>
  );
}
