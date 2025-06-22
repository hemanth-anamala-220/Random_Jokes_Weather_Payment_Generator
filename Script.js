// payment Qr code page
const methods = document.querySelectorAll('.method');
    const section = document.getElementById('dynamic-section');
    const confirmation = document.getElementById('confirmation');

    methods.forEach(method => {
      method.addEventListener('click', () => {
        const selected = method.getAttribute('data-method');
        section.innerHTML = ''; // Clear previous content

        if (selected === 'gpay') {
          section.innerHTML = `<p>Scan Google Pay QR:</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=gpay@upi&pn=Payee">`;

        } else if (selected === 'phonepe') {
          const input = document.createElement('input');
          input.placeholder = "Enter PhonePe UPI ID";
          input.id = "upi-id";
          input.addEventListener('blur', () => {
            if (input.value) {
              const qr = document.createElement('img');
              qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${encodeURIComponent(input.value)}&pn=Payee`;
              section.appendChild(qr);
            }
          });
          section.appendChild(document.createTextNode("Enter your PhonePe UPI ID:"));
          section.appendChild(document.createElement("br"));
          section.appendChild(input);

        } else if (selected === 'card') {
          section.innerHTML = `
            <p>Enter Card Details:</p>
            <input type="text" placeholder="Card Number"><br>
            <input type="text" placeholder="Expiry (MM/YY)"><br>
            <input type="text" placeholder="CVV"><br>
          `;

        } else if (selected === 'qr') {
          section.innerHTML = `<p>Scan this QR:</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=example@upi&pn=Payee">`;
        }
      });
    });

    function showConfirmation() {
      confirmation.style.display = "block";
      setTimeout(() => confirmation.style.display = "none", 4000);
    }
    
    async function generateJoke() {
      const jokeBox = document.getElementById('joke-box');
      jokeBox.innerHTML = "Loading...";

      try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        const data = await response.json();

        if (data && data.length > 0) {    
          const joke = data[0];
          jokeBox.innerHTML = `
            <p><strong>🧠 Setup:</strong> ${joke.setup}</p>
            <p><strong>😂 Punchline:</strong> ${joke.punchline}</p>
          `;
        } else {
          jokeBox.textContent = "No joke found.";
        }
      } catch (error) {
        console.error(error);
        jokeBox.textContent = "Failed to load a joke. Please try again.";
      }
    }
