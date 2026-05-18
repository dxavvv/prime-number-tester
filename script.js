(function() {
    // DOM elements
    const numberInput = document.getElementById('numberInput');
    const checkBtn = document.getElementById('checkBtn');
    const errorMsg = document.getElementById('errorMsg');
    const resultArea = document.getElementById('resultArea');
    const statusBadge = document.getElementById('statusBadge');
    const divisorsContainer = document.getElementById('divisorsContainer');
    const divisorsCount = document.getElementById('divisorsCount');
    const divisorsSection = document.getElementById('divisorsSection');
    const factorizationSection = document.getElementById('factorizationSection');
    const factorizationDisplay = document.getElementById('factorizationDisplay');
    const historyRow = document.getElementById('historyRow');

    // History (max 6 unique numbers)
    let history = [];

    function loadHistory() {
        try {
            const stored = localStorage.getItem('primeTestHistory');
            if (stored) {
                history = JSON.parse(stored);
                if (!Array.isArray(history)) history = [];
                history = [...new Set(history)].slice(0, 6);
            }
        } catch (e) {
            history = [];
        }
    }

    function saveHistory() {
        try {
            localStorage.setItem('primeTestHistory', JSON.stringify(history));
        } catch (e) {
            // localStorage might not be available
        }
    }

    function addToHistory(num) {
        history = history.filter(n => n !== num);
        history.unshift(num);
        history = history.slice(0, 6);
        saveHistory();
        renderHistory();
    }

    function renderHistory() {
        historyRow.innerHTML = '<span class="history-label">Recent:</span>';
        if (history.length === 0) {
            const emptySpan = document.createElement('span');
            emptySpan.style.cssText = 'font-size:0.78rem;color:#b0bcc9;font-style:italic;';
            emptySpan.textContent = 'none';
            historyRow.appendChild(emptySpan);
        } else {
            history.forEach(num => {
                const pill = document.createElement('span');
                pill.className = 'history-pill';
                pill.textContent = num.toLocaleString('en-US');
                pill.title = `Check number ${num}`;
                pill.addEventListener('click', () => {
                    numberInput.value = num;
                    runCheck(num);
                    numberInput.focus();
                });
                historyRow.appendChild(pill);
            });
        }
    }

    // Mathematical functions
    function isPrime(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        const limit = Math.floor(Math.sqrt(n));
        for (let i = 3; i <= limit; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    function getDivisors(n) {
        if (n === 0) return null; // infinite
        const divisors = [];
        const limit = Math.floor(Math.sqrt(n));
        for (let i = 1; i <= limit; i++) {
            if (n % i === 0) {
                divisors.push(i);
                const pair = n / i;
                if (pair !== i) {
                    divisors.push(pair);
                }
            }
        }
        return divisors.sort((a, b) => a - b);
    }

    function getPrimeFactorization(n) {
        if (n < 2) return null;
        const factors = [];
        let temp = n;
        while (temp % 2 === 0) {
            factors.push(2);
            temp /= 2;
        }
        const limit = Math.floor(Math.sqrt(temp));
        for (let i = 3; i <= limit; i += 2) {
            while (temp % i === 0) {
                factors.push(i);
                temp /= i;
            }
        }
        if (temp > 1) {
            factors.push(temp);
        }
        return factors;
    }

    function formatFactorization(n, factors) {
        if (!factors || factors.length === 0) {
            if (n === 1) return '<span style="color:#64748b;">1</span> <span class="equals">=</span> 1 (no prime factors)';
            if (n === 0) return '<span style="color:#64748b;">0</span> – undefined';
            return '';
        }
        const grouped = {};
        factors.forEach(f => {
            grouped[f] = (grouped[f] || 0) + 1;
        });
        const parts = [];
        for (const [prime, exp] of Object.entries(grouped)) {
            if (exp === 1) {
                parts.push(`<strong>${prime}</strong>`);
            } else {
                parts.push(`<strong>${prime}</strong><sup>${exp}</sup>`);
            }
        }
        const joined = parts.join('<span class="times"> × </span>');
        return `<span style="color:#64748b;">${n.toLocaleString('en-US')}</span> <span class="equals">=</span> ${joined}`;
    }

    // Display results
    function displayResult(n, prime, divisors, factors) {
        // Status badge
        let badgeClass, badgeIcon, badgeText;
        if (n === 0 || n === 1) {
            badgeClass = 'special';
            badgeIcon = 'ℹ️';
            if (n === 0) {
                badgeText = 'Zero – not prime';
            } else {
                badgeText = 'One – not prime';
            }
        } else if (prime) {
            badgeClass = 'prime';
            badgeIcon = '✅';
            badgeText = 'Prime number!';
        } else {
            badgeClass = 'composite';
            badgeIcon = '📐';
            badgeText = 'Composite number';
        }
        statusBadge.className = 'status-badge ' + badgeClass;
        statusBadge.innerHTML = `<span class="badge-icon">${badgeIcon}</span> ${badgeText}`;

        // Divisors
        if (n === 0) {
            divisorsSection.style.display = 'block';
            divisorsContainer.innerHTML = '<span style="color:#64748b;font-style:italic;">Every positive integer divides 0 – infinite set.</span>';
            divisorsCount.textContent = 'Infinite divisors';
        } else if (divisors && divisors.length > 0) {
            divisorsSection.style.display = 'block';
            divisorsContainer.innerHTML = '';
            divisors.forEach((d, index) => {
                const chip = document.createElement('span');
                chip.className = 'divisor-chip';
                if (d === n && n > 1) chip.classList.add('highlight-self');
                if (d === 1) chip.classList.add('highlight-one');
                chip.textContent = d.toLocaleString('en-US');
                chip.style.animationDelay = `${Math.min(index * 15, 400)}ms`;
                divisorsContainer.appendChild(chip);
            });
            const count = divisors.length;
            divisorsCount.textContent = `Number of divisors: ${count}`;
            if (count === 2 && prime) {
                divisorsCount.textContent += ' (only 1 and itself – property of primes)';
            }
        }

        // Prime factorization
        if (n === 0) {
            factorizationSection.style.display = 'block';
            factorizationDisplay.innerHTML = '<span style="color:#64748b;font-style:italic;">Prime factorization of zero is undefined.</span>';
        } else if (n === 1) {
            factorizationSection.style.display = 'block';
            factorizationDisplay.innerHTML = formatFactorization(1, null);
        } else if (factors && factors.length > 0) {
            factorizationSection.style.display = 'block';
            factorizationDisplay.innerHTML = formatFactorization(n, factors);
        } else {
            factorizationSection.style.display = 'none';
        }

        resultArea.classList.add('visible');
    }

    function hideResult() {
        resultArea.classList.remove('visible');
        statusBadge.innerHTML = '';
        statusBadge.className = 'status-badge';
        divisorsContainer.innerHTML = '';
        divisorsCount.textContent = '';
        factorizationDisplay.innerHTML = '';
        divisorsSection.style.display = 'block';
        factorizationSection.style.display = 'block';
    }

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.add('visible');
        numberInput.classList.add('error-shake');
        setTimeout(() => {
            numberInput.classList.remove('error-shake');
        }, 500);
    }

    function clearError() {
        errorMsg.textContent = '';
        errorMsg.classList.remove('visible');
        numberInput.classList.remove('error-shake');
    }

    // Main check function
    function runCheck(rawValue) {
        clearError();
        hideResult();

        let value = rawValue;
        if (typeof value === 'string') {
            value = value.trim();
        }

        if (value === '' || value === null || value === undefined) {
            showError('Please enter an integer.');
            return;
        }

        const parsed = Number(value);

        if (!Number.isFinite(parsed)) {
            showError('That is not a valid number. Please enter an integer.');
            return;
        }

        if (!Number.isInteger(parsed)) {
            showError('Please enter an integer (no decimal part).');
            return;
        }

        if (parsed < 0) {
            showError('Please enter a non‑negative integer (0, 1, 2, 3, …).');
            return;
        }

        if (!Number.isSafeInteger(parsed)) {
            showError('The number is too large for exact calculations. Please use a smaller number (up to about 9 quadrillion).');
            return;
        }

        const n = parsed;

        checkBtn.classList.add('loading');
        checkBtn.disabled = true;

        setTimeout(() => {
            try {
                const prime = isPrime(n);
                const divisors = getDivisors(n);
                const factors = getPrimeFactorization(n);

                displayResult(n, prime, divisors, factors);
                addToHistory(n);
            } catch (e) {
                showError('An error occurred during calculation. Try a smaller number.');
                console.error(e);
            } finally {
                checkBtn.classList.remove('loading');
                checkBtn.disabled = false;
            }
        }, 60);
    }

    // Event listeners
    checkBtn.addEventListener('click', () => {
        runCheck(numberInput.value);
    });

    numberInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            runCheck(numberInput.value);
        }
        if (errorMsg.classList.contains('visible')) {
            clearError();
        }
    });

    // Initialize
    loadHistory();
    renderHistory();
    numberInput.focus();
})();