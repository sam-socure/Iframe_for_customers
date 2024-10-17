import React, { useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [url, setUrl] = useState('');
  const [showIframe, setShowIframe] = useState(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");
    let userData = {
      name: name,
      phoneNumber: phoneNumber
    };

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const receivedUrl = data.url;

        setUrl(receivedUrl);
        setShowIframe(true);
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      {showIframe && (
        <>
          <iframe title="Third Party Content" width="430px" height="932px" src={url} />
          <p>Having trouble? <Button onClick={handleOpenInNewTab}>Open in a new tab</Button></p>
        </>
      )}
    </Container>
  );
};

export default RegistrationForm;
