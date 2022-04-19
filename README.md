# scms
simple commerce management system

1. backend folder contains java project made on eclipse

2. client folder contains html/js made on vscode

3. to launch, first run the 'program.java' within the backend project on eclipse

4. then run this code on ur client terminal:

```
./node_modules/.bin/webpack serve --mode development
```

5. go to localhost:8081

making new "show" js

1. import the ff:

```
import React, { useState, useEffect } from "react";
```

2. make the necessary function with the following syntax:
```
export default function functionName() {}
```

3. declare the const variables needed:

3.1: empty array containing a variable 'object', and a function 'setObject' to change it
```
const [object, setObject] = useState([]);

\\e.g.
const [products, setProducts] = useState([]);
```
