// src/components/PaymentModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onPaymentSuccess }) => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      // Auto close after 2 seconds and trigger success
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxWidth: '90vw',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 3,
        outline: 'none'
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {!paymentCompleted ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <QrCodeScannerIcon sx={{ fontSize: 48, color: '#FF6B6B', mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2D3047' }}>
                Download Resume - ₹5 Only
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Pay ₹5 to download your professional resume
              </Typography>
            </Box>
            
            <Card sx={{ 
              mb: 3, 
              border: '2px dashed #e0e0e0',
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              <CardMedia
                component="img"
                height="250"
                image="/Scanner.jpg"
                alt="Payment QR Code"
                sx={{ 
                  objectFit: 'contain',
                  p: 2,
                  bgcolor: '#f5f5f5'
                }}
              />
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Scan this QR code to pay ₹5
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  UPI ID: <strong>resume@builder</strong>
                </Typography>
              </CardContent>
            </Card>

            <Box sx={{ 
              bgcolor: '#f8f9fa', 
              p: 2, 
              borderRadius: 2,
              mb: 3,
              border: '1px solid #e9ecef'
            }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Instructions:</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                1. Open any UPI app on your phone
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                2. Scan the QR code above
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                3. Pay ₹5 and click I have Paid  below
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handlePayment}
              disabled={isProcessing}
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '16px',
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252 30%, #FF7B47 90%)',
                }
              }}
            >
              {isProcessing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'I\'ve Paid ₹5'
              )}
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ 
              display: 'block', 
              textAlign: 'center', 
              mt: 2 
            }}>
              Your resume will download automatically after payment
            </Typography>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#2D3047' }}>
              Payment Successful!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Thank you for your payment. Your resume is downloading...
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentModal;