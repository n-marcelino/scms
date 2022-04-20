# scms

## TO-DO LIST (!!!)
1. *crud*
    * *c*
        * client ✅ 
        * backend ✅ 
    * *r*
        * client ✅ 
        * backend ✅ 
    * *u*
        * client ❓
        * backend ❓
    * *d*
        * client ❓
        * backend ❓
2. *orders:*
    * The problem here is i cant figure out how to work with dates :L
    * client
        * OrderShow ❓
        * OrderAdd ❓
    * back-end
        * Save ❓
        * Builder ❓


## HOW TO RUN (!!!)

1. backend folder contains java project made on eclipse

2. client folder contains html/js made on vscode

3. to launch, first run the 'program.java' within the backend project on eclipse

4. then run this code on ur client terminal:
```
./node_modules/.bin/webpack serve --mode development
```

5. go to localhost:8081

## making new "show" js

1. import the ff:

```
import React, { useState, useEffect } from "react";
```

2. make the necessary function with the following syntax:
```
export default function functionName() {}
```

3. declare the const variables needed:

```
1. empty array containing a variable 'object', and a function 'setObject' to change it: 
const [object, setObject] = useState([]);
\\e.g.
const [products, setProducts] = useState([]);

2. url
const urlObject = "http://localhost:8080/api/object"
\\note: this was declared in eclipse

\\e.g.
const urlProducts = "http://localhost:8080/api/products";
```

4. declare use effect and load object:

```
useEffect(() => {
        loadProducts()
    }, []); //function called only once

    function loadProducts() {
        // Step 1: Call the urlProducts URL
        fetch(urlProducts)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setProducts(data.products);
            })
            .catch((error) => {
            });
    }
```

5. render products code

```
function renderObject() {
    if (objects.length > 0) {
        return (
            <div>
                {
                    objects.map((o) => {
                        return(
                            <div>
                                <h2>{o.name}</h2>
                                    <h5>ID: {o.id}</h5>
                                    <h5>PRICE: {o.price}</h5>
                                    <h5>CATEGORY: {o.category}</h5>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <h2>
                No Products Foud
            </h2>
        )
    }
}
```

6. the final return
```
return(
    <div>
        <h1>
                My List of Objects
        </h1>

        {renderObject()}
    </div>
)
```

7. add the save function on ur java file in eclipse

```
@RequestMapping(
	value= {"","/"},
	method=RequestMethod.POST,
	produces=MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public String save(@RequestBody String payload) {
	Gson gson = new Gson();
	HashMap<String,Object> data = new HashMap<String,Object>();
	data = gson.fromJson(payload, data.getClass());
	
    Datatype attribute = data.get("attribute").toDataType();
		
	Object o = new Object();
	o.setAttribute(firstNattributeame);
		
	objectRepository.save(o);
	return " { \"message\": \"ok\" } ";
}
```

8. reset ur backend (stop running, then run again)