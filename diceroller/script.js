document.addEventListener('DOMContentLoaded', () => {
    const rollButton = document.getElementById('rollButton');
    const diceElement = document.getElementById('dice');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    // Dice faces using Unicode dice symbols
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

    // Tracking roll timing to prevent rapid clicks
    let lastRollTime = 0;
    const ROLL_COOLDOWN = 500; // milliseconds

    // Secure random number generation
    function secureRandomRoll() {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        return (randomBuffer[0] % 6) + 1;
    }

    // Validate roll attempt
    function validateRoll() {
        const currentTime = Date.now();
        
        // Rate limiting
        if (currentTime - lastRollTime < ROLL_COOLDOWN) {
            errorElement.textContent = 'Please wait before rolling again';
            return false;
        }
        
        // Clear any previous errors
        errorElement.textContent = '';
        lastRollTime = currentTime;
        return true;
    }

    // Roll the dice
    function rollDice() {
        // Validate roll attempt
        if (!validateRoll()) return;

        // Add rolling animation
        diceElement.classList.add('rolling');

        // Simulate roll with timeout
        setTimeout(() => {
            try {
                // Generate secure random number
                const randomRoll = secureRandomRoll();
                
                // Update dice face and result
                diceElement.textContent = diceFaces[randomRoll - 1];
                resultElement.textContent = `You rolled a ${randomRoll}!`;
                
                // Remove rolling animation
                diceElement.classList.remove('rolling');
            } catch (error) {
                // Handle any unexpected errors
                errorElement.textContent = 'An error occurred during roll';
                console.error('Dice roll error:', error);
            }
        }, 500); // Matches animation duration
    }

    // Add event listener to roll button
    rollButton.addEventListener('click', rollDice);

    // Optional: Allow spacebar and enter key to roll
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            rollDice();
        }
    });
});