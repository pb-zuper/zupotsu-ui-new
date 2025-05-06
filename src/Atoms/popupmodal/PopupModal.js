import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
   
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "#FFF",
    border: '0px solid #000',
    borderRadius: '8px',
    divShadow: 24,
    padding: "20px",
    fontFamily: 'Inter'
};

export default function PopupModal({ open, setOpen, handleYesAction, handleClose, text, heading }) {

    return (

        <Modal
            open={open}
            onClose={handleClose}
        // aria-labelledby="modal-title"
        // aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ fontSize: "20px", fontWeight: "500" }}>
                    {heading}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2, fontSize: "14px", fontWeight: "400" }}>
                    {text}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose} sx={{ mr: 1 }}>
                        No
                    </Button>
                    <Button onClick={handleYesAction}>
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>

    );
}

// <React.Fragment>
{/* </React.Fragment> */ }
{/* <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}>
          <ModalClose />
          <DialogTitle>Vertical scroll example</DialogTitle>
          <FormControl
            orientation="horizontal"
            sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 'sm' }}
          >
            <FormLabel>Container overflow</FormLabel>
            <Switch
              checked={scroll}
              onChange={(event) => setScroll(event.target.checked)}
              sx={{ ml: 'auto' }}
            />
          </FormControl>
          <List
            sx={{
              overflow: scroll ? 'scroll' : 'initial',
              mx: 'calc(-1 * var(--ModalDialog-padding))',
              px: 'var(--ModalDialog-padding)',
            }}
          >
            {[...Array(100)].map((item, index) => (
              <ListItem key={index}>I&apos;m in a scrollable area.</ListItem>
            ))}
          </List>
        </ModalDialog>
      </Modal> */}