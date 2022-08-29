// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../Components/Page';
import MultiStepForm from './multiStepForm';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>



        {mdUp && (
          <SectionStyle>

            <Typography variant="h5" sx={{ px: 5 }}>
              <Link to={"/dashboard/user"} style={{ color: "blue" }}>Go Back</Link>
            </Typography>
            <Typography variant="h3" sx={{ px: 5, mb: 5 }}>
              Register
            </Typography>
            <img alt="register" src="/static/illustrations/illustration_register.png" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>

            <MultiStepForm />

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
