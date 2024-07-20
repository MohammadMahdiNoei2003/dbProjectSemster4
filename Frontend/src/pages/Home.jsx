import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';

const cardsData = [
  { title: 'Customer', icon: <PeopleAltIcon style={{ fontSize: 100 }} /> },
  {
    title: 'Representative',
    icon: <SupportAgentIcon style={{ fontSize: 100 }} />,
  },
  { title: 'Contract', icon: <ArticleIcon style={{ fontSize: 100 }} /> },
];

function Home() {
  return (
    <Box sx={{ flexGrow: 1, m: 10 }}>
      <Grid container spacing={3} justifyContent="center">
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={`/${card.title.toLowerCase()}/show-all`}>
              <Card
                sx={{
                  minHeight: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#483285',
                  color: 'white',
                  ':hover': { bgcolor: '#342461' },
                  transition: 'all',
                }}
              >
                <CardContent>
                  {card.icon}
                  <Typography variant="h4" component="div" align="center">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
