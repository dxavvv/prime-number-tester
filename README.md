# Prime Number Tester

A sleek, interactive web application that lets you instantly test if a number is prime, view all its divisors, and see its prime factorization. Built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Vanilla JS](https://img.shields.io/badge/vanilla-js-yellow)

---

## ✨ Features

- **Prime check** – instantly determines whether a number is prime, composite, or special (0/1)
- **Divisors list** – displays every divisor of the entered number in animated chips
- **Prime factorization** – breaks down any composite number into its prime factors (e.g. 12 = 2² × 3)
- **History** – saves your last 6 checked numbers as clickable pills for quick re‑testing
- **Responsive design** – looks great on desktop, tablet, and mobile
- **Smooth animations** – polished UI with subtle transitions and micro‑interactions
- **Error handling** – clear validation messages with a shaking input animation
- **Zero dependencies** – no npm, no frameworks, just three files

---

## 🚀 Live Demo

🔗 [Click here for a live demo](https://dxavvv.github.io/prime-number-tester)

---

## 🛠️ Tech Stack

- **HTML5** – semantic structure
- **CSS3** – custom properties, flexbox, animations, responsive media queries
- **JavaScript (ES6+)** – IIFE module pattern, DOM manipulation, localStorage for history

---

## 📁 Project Structure

```
prime-number-tester/
├── index.html      # Main HTML file
├── style.css       # All styles and animations
├── script.js       # Application logic (prime check, divisors, factorization)
└── README.md       # Project documentation
```

---

## 🔧 How to Run Locally

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/prime-number-tester.git
   ```

2. **Navigate to the project folder**
   ```bash
   cd prime-number-tester
   ```

3. **Open `index.html` in your browser**
   - Simply double‑click the file, or
   - Use a local server for best experience (e.g. VS Code Live Server extension)

No build tools or installations required! 🎉

---

## 📖 Usage

1. Enter any non‑negative integer (0, 1, 2, 3, …) into the input field
2. Click the **Check** button or press **Enter**
3. View the result:
   - ✅ **Green badge** = prime number
   - 📐 **Amber badge** = composite number
   - ℹ️ **Blue badge** = special case (0 or 1)
4. See all divisors listed as animated chips
5. See the prime factorization displayed in mathematical notation
6. Click any history pill to quickly re‑check that number

### Examples

| Input | Result | Divisors | Prime Factorization |
|-------|--------|----------|---------------------|
| `7` | Prime ✅ | 1, 7 | 7 = 7 |
| `12` | Composite 📐 | 1, 2, 3, 4, 6, 12 | 12 = 2² × 3 |
| `1` | Special ℹ️ | 1 | 1 = 1 (no prime factors) |
| `97` | Prime ✅ | 1, 97 | 97 = 97 |
| `100` | Composite 📐 | 1, 2, 4, 5, 10, 20, 25, 50, 100 | 100 = 2² × 5² |

---

## 🧮 How It Works

### Primality test
```javascript
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
```
Uses trial division up to √n, optimized by checking only odd numbers after handling 2 separately.

### Divisor enumeration
```javascript
function getDivisors(n) {
    if (n === 0) return null; // infinite
    const divisors = [];
    const limit = Math.floor(Math.sqrt(n));
    for (let i = 1; i <= limit; i++) {
        if (n % i === 0) {
            divisors.push(i);
            const pair = n / i;
            if (pair !== i) divisors.push(pair);
        }
    }
    return divisors.sort((a, b) => a - b);
}
```
Iterates from 1 to √n, collecting both `i` and `n / i` as divisor pairs.

### Prime factorization
```javascript
function getPrimeFactorization(n) {
    if (n < 2) return null;
    const factors = [];
    let temp = n;
    while (temp % 2 === 0) { factors.push(2); temp /= 2; }
    for (let i = 3; i <= Math.sqrt(temp); i += 2) {
        while (temp % i === 0) { factors.push(i); temp /= i; }
    }
    if (temp > 1) factors.push(temp);
    return factors;
}
```
Repeatedly divides by prime factors, collecting them into an array for grouping and display.

---

## 🎨 UI Design System

| Element | Style |
|--------|--------|
| **Prime badge** | Green background, dark green text, green border |
| **Composite badge** | Amber background, dark amber text, amber border |
| **Special badge** | Blue background, dark blue text, blue border |
| **Divisor chips** | Light gray pills, self‑number highlighted in indigo |
| **Exponents** | Superscript in accent color (#6366f1) |
| **History pills** | Light gray, turn indigo on hover |
| **Background** | Gradient with animated floating blobs |

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout changes |
|-----------|----------------|
| **> 480px** | Side‑by‑side input + button, larger padding & fonts |
| **< 480px** | Stacked input + button, full‑width elements, compact typography |

---

## ⚡ Performance

| Operation | Time Complexity | Max practical input |
|-----------|----------------|---------------------|
| Prime check | O(√n) | ~9 × 10¹⁵ |
| Divisors | O(√n) | ~9 × 10¹⁵ |
| Factorization | O(√n) | ~9 × 10¹⁵ |

For numbers up to ~10⁹, response is instant. For larger safe integers, a brief loading spinner appears.

---

## 🔮 Planned Enhancements

- [ ] Dark mode toggle
- [ ] Copy‑to‑clipboard for results
- [ ] Keyboard shortcut (Ctrl+L to clear)
- [ ] Prime range generator (find all primes between A and B)
- [ ] Web Worker for background computation of very large numbers
- [ ] PWA support for offline usage
- [ ] Sound effects / haptic feedback on mobile
- [ ] i18n support (multiple languages)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing style and is well‑commented.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- GitHub: [@dxavvv](https://github.com/dxavvv)

---

## ⭐ Show Your Support

If this project helped you or you found it interesting, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🔗 Sharing it with others

Thank you! 🙏

---

<p align="center">
  Made with ❤️ and vanilla JavaScript
</p>
