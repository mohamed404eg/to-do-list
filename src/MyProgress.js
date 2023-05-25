import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinatevariant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function MyProgress(props) {
  const { time, onCompletion } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(intervalId);
          onCompletion(); // إرسال إشارة بعد الانتهاء
          return 100;
        } else {
          return prevProgress + (100 / (time / 1000)); // تحديث التقدم
        }
      });
    }, 1000); // التحديث كل ثانية واحدة

    return () => clearInterval(intervalId);
  }, [time, onCompletion]);

  return <CircularProgressWithLabel value={progress} />;
}

MyProgress.propTypes = {
  time: PropTypes.number.isRequired,
  onCompletion: PropTypes.func.isRequired,
};

export default MyProgress;