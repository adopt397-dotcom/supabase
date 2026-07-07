window.login = async function(email, pin) {
  const response = await fetch('https://script.google.com/macros/s/AKfycbxIymT6beN1izBiBXMR95qT19ykaA1wjcmiqwasghvKJanVfSPpTEu68NcLJJy1QWQC/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pin })
  });
  return response.json();
};
