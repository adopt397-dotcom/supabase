window.login = async function(email, pin) {
  const response = await fetch('https://script.google.com/macros/s/AKfycbyAEu_jxPeIVq2iB5jLC2zGq7dtbXCCUe7ZaQ8Yo8zsBkAeHkPrOZ7wwOhVnGdh4eSs/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ email, pin })
  });
  return response.json();
};
