import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box component="img" src="https://www.xcally.com/assets/images/features/call-center-realtime-monitoring.png" sx={{ width: 150, ...sx }} />
    </RouterLink>
  );
}
