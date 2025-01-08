const contractAddress = "0xAd499C1C9A64E4EE2f43C00836ebF1337ef9e215";
const contractABI = [...]; // Pega aquí tu ABI
const ownerAddress = "0xYOUR_OWNER_ADDRESS_HERE"; // Cambia por la dirección del dueño

const timerElement = document.getElementById("timer");
const sacrificeForm = document.getElementById("sacrifice-form");
const claimButton = document.getElementById("claim-btn");
const withdrawHexButton = document.getElementById("withdraw-hex-btn");

// Actualizar cuenta regresiva
const startTimestamp = 1704715200;
function updateCountdown() {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = startTimestamp - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent = ${days}d ${hours}h ${minutes}m ${seconds}s;
  } else {
    timerElement.textContent = "El sacrificio ha iniciado.";
  }
}

setInterval(updateCountdown, 1000);

// Sacrificar tokens
sacrificeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = document.getElementById("token").value;
  const amount = document.getElementById("amount").value;

  if (!window.ethereum) {
    alert("Necesitas MetaMask instalado para interactuar.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    await contract.sacrifice(token, ethers.utils.parseUnits(amount, 18));
    alert("Sacrificio enviado correctamente.");
  } catch (error) {
    alert(Error: ${error.message});
  }
});

// Reclamar TIS
claimButton.addEventListener("click", async () => {
  if (!window.ethereum) {
    alert("Necesitas MetaMask instalado para interactuar.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    await contract.claim();
    alert("Recompensas reclamadas exitosamente.");
  } catch (error) {
    alert(Error: ${error.message});
  }
});

// Retirar HEX
withdrawHexButton.addEventListener("click", async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    await contract.finalize();
    alert("HEX retirado correctamente.");
  } catch (error) {
    alert(Error: ${error.message});
  }
});
