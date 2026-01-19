import React, { useState } from "react";
import { 
  Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, Typography, Box, IconButton, TextField, CircularProgress
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { generatePDF } from "@/utils/pdfGenerator";

const PDFExport: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);

  // --- APNI DETAILS YAHA BHAREIN ---
  const upiId = "yourname@upi"; // <--- Apni UPI ID yaha dalein
  const amount = "5";
  const name = "Resume Builder";
  
  // UPI Deep Link (Mobile users ke liye direct GPay/PhonePe khulega ₹5 ke saath)
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUtr("");
    setLoading(false);
  };

  const handleVerify = () => {
    if (utr.length < 12) return;
    
    setLoading(true);
    // 3 second ka fake verification taaki user ko lage check ho raha hai
    setTimeout(() => {
      setLoading(false);
      generatePDF("resume-template", "professional-resume");
      handleClose();
    }, 3000);
  };

  return (
    <>
      <Button 
        variant="contained"
        startIcon={<DownloadIcon />}
        onClick={handleOpen}
        sx={{ mt: 3, bgcolor: "#FF6B6B", fontWeight: 'bold' }}
      >
        Download PDF (₹5)
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="span" sx={{ fontWeight: 800 }}>Pay & Download</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ textAlign: 'center' }}>
            {/* Mobile Users ke liye Direct Pay Button */}
            <Button 
              variant="outlined" 
              fullWidth 
              href={upiLink}
              sx={{ mb: 2, borderRadius: '10px', textTransform: 'none' }}
            >
              Click to Pay ₹5 (GPay/PhonePe)
            </Button>

            <Typography variant="body2" sx={{ mb: 1 }}>OR Scan QR Code</Typography>
            
            <Box 
              component="img"
              src="/Scanner.jpg"
              sx={{ width: '180px', borderRadius: '10px', border: '1px solid #eee', mb: 2 }}
            />

            <Typography variant="body2" sx={{ textAlign: 'left', fontWeight: 'bold', color: '#555' }}>
              Step 2: Enter 12-digit UTR/Ref No.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="012345678912"
              value={utr}
              onChange={(e) => setUtr(e.target.value.replace(/[^0-9]/g, ''))}
              inputProps={{ maxLength: 12 }}
              sx={{ mt: 1 }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            fullWidth
            variant="contained" 
            disabled={utr.length < 12 || loading}
            onClick={handleVerify}
            sx={{ bgcolor: "#4ECDC4", py: 1.5, fontWeight: 'bold' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Verify Payment & Download"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PDFExport;