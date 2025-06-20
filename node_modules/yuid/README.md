# Yield UID (yuid)

### What is it?
`yuid` produces unique ids using javascript generator methods.

### Goals
1. Extremely small, less than 600 bytes (ES6, non-minified)
2. Non-cryptographic but random enough to not have collisions when used async
3. Has a monotonic component

A generated Id looks like this: "1-khjm3urk-2aru7hqvsdv"

It is composed of: `${serial}-${time}-${random}`

### Installation
```
npm install --save yuid
```

### Usage
```javascript
import yuid from 'yuid';

// using generators
const generator = yuid.generator();  // initialize the generator
const uid = generator.next().value; // pull a uid
```
or, alternatively, you can use a static, pre-instantiated generator provided by the class.
```javascript
import yuid from 'yuid';
const uid = yuid.getId();
```

Instantiating your own generates a new monotonic sequence. Using `getId` shares a global sequence.