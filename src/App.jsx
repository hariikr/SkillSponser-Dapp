import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import './theme.css';
import Header from './components/Header';
import CreateCampaignModal from './components/CreateCampaignModal';
import CampaignCard from './components/CampaignCard';
import DonateModal from './components/DonateModal';
import DonatorsModal from './components/DonatorsModal';
import Dashboard from './components/Dashboard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract';
import { Container, Grid, Snackbar, Alert, CircularProgress, Button, Box, Typography, CssBaseline, InputAdornment, TextField, IconButton, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, Stack, Paper, Card, CardContent, Avatar, Chip, LinearProgress, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e1a',
      paper: '#1a1f2e',
    },
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f59e0b',
    },
    success: {
      main: '#10b981',
    },
    info: {
      main: '#3b82f6',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

function App() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [account, setAccount] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [donatorsOpen, setDonatorsOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donators, setDonators] = useState([]);
  const [donations, setDonations] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [connecting, setConnecting] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'campaigns', 'dashboard'

  // Connect wallet and contract
  const connectWallet = async () => {
    setConnecting(true);
    try {
      if (!window.ethereum) {
        setSnackbar({ open: true, message: 'MetaMask not detected!', severity: 'error' });
        setConnecting(false);
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const _provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(_provider);
      const _signer = await _provider.getSigner();
      setSigner(_signer);
      setAccount(await _signer.getAddress());
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, _signer);
      setContract(_contract);
      setSnackbar({ open: true, message: 'Wallet connected!', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: 'Wallet connection failed', severity: 'error' });
    }
    setConnecting(false);
  };

  useEffect(() => {
    // Auto-connect if already authorized
    if (window.ethereum && window.ethereum.selectedAddress) connectWallet();
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => window.location.reload());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (contract) fetchCampaigns();
    // eslint-disable-next-line
  }, [contract]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await contract.getCampaigns();
      console.log('Fetched campaigns:', data);
      if (!Array.isArray(data)) {
        setSnackbar({ open: true, message: 'No campaigns found or contract error', severity: 'error' });
        setCampaigns([]);
      } else {
        setCampaigns(data.map(c => ({
          ...c,
          title: typeof c.title === 'string' ? c.title : '',
          description: typeof c.description === 'string' ? c.description : '',
          image: typeof c.image === 'string' ? c.image : '',
          target: ethers.formatEther(c.target),
          amountCollected: ethers.formatEther(c.amountCollected),
        })));
      }
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to fetch campaigns', severity: 'error' });
      console.error('Error fetching campaigns:', e);
      setCampaigns([]);
    }
    setLoading(false);
  };

  const handleCreate = async (form) => {
    try {
      await contract.createCampaign(
        account,
        form.title,
        form.description,
        ethers.parseEther(form.target),
        Number(form.deadline),
        form.image
      );
      setSnackbar({ open: true, message: 'Learning campaign created!', severity: 'success' });
      setCreateOpen(false);
      fetchCampaigns();
    } catch (e) {
      console.error('Create campaign error:', e);
      setSnackbar({ open: true, message: 'Failed to create campaign', severity: 'error' });
    }
  };

  const handleDonate = async (amount) => {
    try {
      await contract.donateToCampaign(selectedCampaign, { value: ethers.parseEther(amount) });
      setSnackbar({ open: true, message: 'Support successful!', severity: 'success' });
      setDonateOpen(false);
      fetchCampaigns();
    } catch (e) {
      setSnackbar({ open: true, message: 'Support failed', severity: 'error' });
    }
  };

  const handleViewDonators = async (id) => {
    try {
      const [addrs, amts] = await contract.getDonators(id);
      setDonators(addrs);
      setDonations(amts.map(a => ethers.formatEther(a)));
      setSelectedCampaign(id);
      setDonatorsOpen(true);
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to fetch supporters', severity: 'error' });
    }
  };

  // Filtering, searching, and sorting logic
  const filteredCampaigns = campaigns
    .filter(c => {
      if (filter === 'active') return Number(c.deadline) > Date.now() / 1000;
      if (filter === 'expired') return Number(c.deadline) <= Date.now() / 1000;
      return true;
    })
    .filter(c =>
      (c.title && c.title.toLowerCase().includes(search.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'newest') return Number(b.deadline) - Number(a.deadline);
      if (sort === 'mostFunded') return Number(b.amountCollected) - Number(a.amountCollected);
      if (sort === 'endingSoon') return Number(a.deadline) - Number(b.deadline);
      return 0;
    });

  // Featured learners for carousel
  const featuredLearners = filteredCampaigns.slice(0, 3);

  const renderHomePage = () => (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 8, 
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: 4,
        mb: 6,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
        }} />
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ 
            mb: 2, 
            background: 'linear-gradient(135deg, #6366f1 0%, #f59e0b 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}>
            Fund Learning. Fuel Potential.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: '#94a3b8', fontWeight: 400 }}>
            Support passionate individuals in their upskilling journey
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => setCreateOpen(true)}
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                }
              }}
            >
              Start a Learning Campaign
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => setCurrentView('campaigns')}
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                borderColor: '#6366f1',
                color: '#6366f1',
                '&:hover': {
                  borderColor: '#5855eb',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)',
                }
              }}
            >
              Browse Learners
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Featured Learners Carousel */}
      {featuredLearners.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ mb: 3, textAlign: 'center', color: '#f8fafc' }}>
            Featured Learners
          </Typography>
          <Grid container spacing={3}>
            {featuredLearners.map((campaign, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  border: '1px solid #475569',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                  }
                }}>
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={campaign.image || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'}
                      alt={campaign.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                    <Chip 
                      label="Featured" 
                      sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        right: 16,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                        color: 'white',
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#f8fafc' }}>
                      {campaign.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: '#94a3b8', minHeight: 60 }}>
                      {campaign.description}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((Number(campaign.amountCollected) / Number(campaign.target)) * 100, 100)}
                      sx={{ 
                        mb: 2, 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#475569',
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        }
                      }}
                    />
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                      <Typography variant="body2" color="#94a3b8">
                        Raised: <span style={{ color: '#10b981', fontWeight: 600 }}>{campaign.amountCollected} ETH</span>
                      </Typography>
                      <Typography variant="body2" color="#94a3b8">
                        Goal: <span style={{ color: '#f59e0b', fontWeight: 600 }}>{campaign.target} ETH</span>
                      </Typography>
                    </Stack>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => { setSelectedCampaign(index); setDonateOpen(true); }}
                      sx={{ 
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                        }
                      }}
                    >
                      Support Learner
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Stats Section */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569'
            }}>
              <SchoolIcon sx={{ fontSize: 48, color: '#6366f1', mb: 2 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {campaigns.length}
              </Typography>
              <Typography variant="body1" color="#94a3b8">
                Active Learners
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569'
            }}>
              <TrendingUpIcon sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {campaigns.reduce((sum, c) => sum + Number(c.amountCollected), 0).toFixed(2)}
              </Typography>
              <Typography variant="body1" color="#94a3b8">
                ETH Raised
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '1px solid #475569'
            }}>
              <PeopleIcon sx={{ fontSize: 48, color: '#f59e0b', mb: 2 }} />
              <Typography variant="h4" sx={{ color: '#f8fafc', fontWeight: 700, mb: 1 }}>
                {campaigns.length * 5}
              </Typography>
              <Typography variant="body1" color="#94a3b8">
                Supporters
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const renderCampaignsPage = () => (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: '#f8fafc' }}>
        Browse Learning Campaigns
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            placeholder="Search learners or skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 220 }}
          />
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v)}
            size="small"
            sx={{ bgcolor: '#1e293b', borderRadius: 2 }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="active">Active</ToggleButton>
            <ToggleButton value="expired">Expired</ToggleButton>
          </ToggleButtonGroup>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={e => setSort(e.target.value)}>
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="mostFunded">Most Funded</MenuItem>
              <MenuItem value="endingSoon">Ending Soon</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredCampaigns.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <SchoolIcon sx={{ fontSize: 64, color: '#475569', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            No learning campaigns yet.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Be the first to start your upskilling journey!
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setCreateOpen(true)}
            sx={{ 
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
              }
            }}
          >
            Create Learning Campaign
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {filteredCampaigns.map((c, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
              <CampaignCard
                campaign={c}
                onDonate={() => { setSelectedCampaign(i); setDonateOpen(true); }}
                onViewDonators={() => handleViewDonators(i)}
                isOwner={account && c.owner && account.toLowerCase() === c.owner.toLowerCase()}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Header 
              onCreate={() => setCreateOpen(true)} 
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            {account ? (
              <Button variant="outlined" color="primary" sx={{ ml: 2, fontWeight: 700 }}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={connectWallet} 
                disabled={connecting} 
                sx={{ 
                  ml: 2, 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5855eb 0%, #7c3aed 100%)',
                  }
                }}
              >
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </Box>

          {currentView === 'home' && renderHomePage()}
          {currentView === 'campaigns' && renderCampaignsPage()}
          {currentView === 'dashboard' && <Dashboard campaigns={campaigns} account={account} />}

          <CreateCampaignModal open={createOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate} />
          <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} onDonate={handleDonate} />
          <DonatorsModal open={donatorsOpen} onClose={() => setDonatorsOpen(false)} donators={donators} donations={donations} />
          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
