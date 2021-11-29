import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        {...props}
        closeAfterTransition
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Résultats
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Score : { props.score }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Temps : { props.timeScore}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
