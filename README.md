# Slash Mobility Technical Test (SITA)

This repository contains solutions to two programming challenges for the Slash Mobility (SITA) technical assessment.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/facuabarcadev/slash-mobility-technical-test.git

# Navigate to the project directory
cd slash-mobility-technical-test

# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test -- --watch
```

### Building the Project

```bash
# Compile TypeScript to JavaScript
npm run build
```

## 📋 Challenges

### 1. JavaScript Concurrency Exercise (`fetchWithConcurrency.ts`)

**Problem Statement:**
Implement a function that asynchronously fetches URLs with controlled concurrency. The function should:
- Accept an array of URLs and a maximum concurrency limit
- Fetch URLs as soon as possible without exceeding the concurrency limit
- Return responses in the same order as the input URLs
- Handle errors gracefully

**Key Features:**
- ✅ Order preservation of results
- ✅ Error handling for failed requests
- ✅ Efficient resource utilization

**Usage Example:**
```typescript
import { fetchWithConcurrency } from './src/fetchWithConcurrency';

const urls = ['https://api1.com', 'https://api2.com', 'https://api3.com'];
const maxConcurrency = 2;

const results = await fetchWithConcurrency(urls, maxConcurrency);
```

### 2. License Plate Generator (`getLicensePlateByIndex.ts`)

**Problem Statement:**
Create a DMV license plate number generator that follows a specific sequential pattern:
- 6 alphanumeric characters total
- Numbers always come before letters
- Sequential progression: `000000` → `000001` → ... → `999999` → `00000A` → `00001A` → ... → `ZZZZZZ`

**Pattern Overview:**
```
000000, 000001, ..., 999999
00000A, 00001A, ..., 99999A
00000B, 00001B, ..., 99999B
...
00000Z, 00001Z, ..., 99999Z
0000AA, 0001AA, ..., 9999AA
0000AB, 0001AB, ..., 9999AB
...
ZZZZZZ
```

**Key Features:**
- ✅ Handles all valid license plate combinations
- ✅ Input validation and error handling
- ✅ Modular, testable functions
- ✅ Configurable constants for future extensibility

**Usage Example:**
```typescript
import { getLicensePlateByIndex } from './src/getLicensePlateByIndex';

console.log(getLicensePlateByIndex(0));        // "000000"
console.log(getLicensePlateByIndex(999999));   // "999999"
console.log(getLicensePlateByIndex(1000000));  // "00000A"
console.log(getLicensePlateByIndex(1000001));  // "00001A"
```

## 🏗️ Project Structure

```
├── src/
│   ├── fetchWithConcurrency.ts    # Concurrency control implementation
│   └── getLicensePlateByIndex.ts  # License plate generator
├── __tests__/
│   └── fetchWithConcurrency.test.ts
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🧪 Testing Strategy

### Concurrency Tests
- Verifies correct order preservation
- Validates concurrency limits are respected
- Tests error handling scenarios
- Measures timing to ensure parallel execution

### License Plate Tests
- Boundary value testing (0, 999999, etc.)
- Pattern validation across different stages
- Input validation (negative numbers, non-integers)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

**facuabarcadev**
- GitHub: [@facuabarcadev](https://github.com/facuabarcadev)
