import React, { useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';

export default function CreateCampaignModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    videoPitch: '',
    skillCategory: '',
    courseDetails: '',
    feeBreakdown: '',
    milestones: '',
    story: '',
  });
  const [error, setError] = useState('');

  const skillCategories = [
    'Web Development',
    'Mobile Development',
    'AI & Data Science',
    'Blockchain & Web3',
    'Design & UX',
    'Business & Marketing',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'Professional Development'
  ];

  const handleChange = (e) => {
    if (e.target.name === 'imageFile') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!form.title || !form.description || !form.target || !form.deadline || !form.skillCategory) {
      setError('Please fill in all required fields.');
      return;
    }
    const deadlineTimestamp = Math.floor(new Date(form.deadline).getTime() / 1000);
    if (isNaN(deadlineTimestamp) || deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
      setError('Deadline must be a future date.');
      return;
    }
    setError('');
    onCreate({ ...form, deadline: deadlineTimestamp });
    setForm({
      title: '',
      description: '',
      target: '',
      deadline: '',
      image: '',
      videoPitch: '',
      skillCategory: '',
      courseDetails: '',
      feeBreakdown: '',
      milestones: '',
      story: ''
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
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
              Start Your Learning Campaign
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              Share your upskilling journey and get support from the community
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Basic Information
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Campaign Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                required
                placeholder="e.g., Master React Development Bootcamp"
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

              <FormControl fullWidth required>
                <InputLabel sx={{ color: '#94a3b8' }}>Skill Category</InputLabel>
                <Select
                  name="skillCategory"
                  value={form.skillCategory}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#475569' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                    '& .MuiSelect-icon': { color: '#94a3b8' },
                    '& .MuiSelect-select': { color: '#f8fafc' },
                  }}
                >
                  {skillCategories.map((category) => (
                    <MenuItem key={category} value={category} sx={{ color: '#f8fafc' }}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                required
                placeholder="Describe what you want to learn and why it's important to you"
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
            </Stack>
          </Box>

          <Divider sx={{ borderColor: '#475569' }} />

          {/* Course & Financial Details */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Course & Financial Details
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Course/Program Details"
                name="courseDetails"
                value={form.courseDetails}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                placeholder="e.g., React Bootcamp by Codecademy, 6-month program"
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

              <TextField
                label="Fee Breakdown"
                name="feeBreakdown"
                value={form.feeBreakdown}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                placeholder="e.g., Course fee: 2 ETH, Materials: 0.5 ETH, Certification: 0.3 ETH"
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

              <TextField
                label="Total Target (ETH)"
                name="target"
                value={form.target}
                onChange={handleChange}
                fullWidth
                type="number"
                required
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

              <TextField
                label="Campaign Deadline"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                required
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
            </Stack>
          </Box>

          <Divider sx={{ borderColor: '#475569' }} />

          {/* Media & Story */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#f8fafc', fontWeight: 600 }}>
              Media & Story
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Profile Image URL"
                name="image"
                value={form.image}
                onChange={handleChange}
                fullWidth
                placeholder="https://example.com/your-photo.jpg"
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

              <TextField
                label="Video Pitch URL (YouTube/Vimeo)"
                name="videoPitch"
                value={form.videoPitch}
                onChange={handleChange}
                fullWidth
                placeholder="https://youtube.com/watch?v=..."
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

              <TextField
                label="Your Story & Motivation"
                name="story"
                value={form.story}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Share your background, why you want to learn this skill, and how it will help you achieve your goals..."
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

              <TextField
                label="Learning Milestones (Optional)"
                name="milestones"
                value={form.milestones}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                placeholder="e.g., Week 1-2: Fundamentals, Week 3-4: Advanced concepts, Week 5-6: Project building..."
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
            </Stack>
          </Box>

          {error && (
            <Alert severity="error" sx={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid #ef4444',
              color: '#fca5a5'
            }}>
              {error}
            </Alert>
          )}
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
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
            }
          }}
        >
          Create Learning Campaign
        </Button>
      </DialogActions>
    </Dialog>
  );
}
