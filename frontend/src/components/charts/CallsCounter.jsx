// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, CircularProgress } from '@mui/material';
// component
import Iconify from '../general/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3)
}));

// ----------------------------------------------------------------------

export default function CallsCounter({ data, color = '#fff', icon, title = 'title', isloaded="false" }) {
  return (
    <RootStyle
      style={{
        backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(
          color,
          0.7
        )} 100%)`
      }}
    >
      <IconWrapperStyle
        style={{
          backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(
            color,
            0.24
          )} 100%)`
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>
      {
        isloaded ? (
          <Typography variant="h3">{data.toLocaleString()}</Typography>
        ) : (
          <CircularProgress color='inherit'/>
        )
      }
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
