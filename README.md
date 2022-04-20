# scms

## THINGS TO CONSULT SIR ABOUT (!!!)
1. ung id system ang gulo :l
2. ung orders, how to work w/ date?
    * how to have a form input for date? and how to convert that into smth that the backend can use???
    * how to work with the builder + controller?
3. additionally, how to work with arrays sa render product?
    * e.g. in categories, show localhost:8080, the array of products under a category
    * how to render that?

## TO-DO LIST (!!!)
1. **crud**
    * **c**reate
        * client ✅ 
        * backend ✅ 
    * **r**ead
        * client ✅ 
        * backend ✅ 
    * **u**pdate
        * client ❓
        * backend ❓
    * **d**elete
        * client ❓
        * backend ❓
2. **orders:**
    * The problem here is i cant figure out how to work with dates :L
    * client
        * OrderShow ❓
        * OrderAdd ❓
    * back-end
        * Save function in orderscontroller ❓
        * Builder for gson/json edit to be compatible converting back and forth ❓
            * there should be no concatenated anything in builder bc it wont be able to convert back from gson to java
3. **Form authentication**
    * Find a way to make a restriction on the forms
    * columns cant be empty etc etc
    * preferably figure out how to bootstrap ur way into it?
    * https://getbootstrap.com/docs/5.0/forms/overview/



## HOW TO RUN (!!!)

1. backend folder contains java project made on eclipse

2. client folder contains html/js made on vscode

3. import as project the backend to eclipse

4. within eclipse, in src/main/resources/application.properties, change the necessary info to match ur sql settings

5. run 'program.java' within the backend project on eclipse

6. add the client folder to ur vscode workspace

7. make sure that your terminal is set to the client folder directory
    * e.g. your terminal should look like this:
```
E:\Programming\github\scms\client> []     <= this thing is ur cursor
```

8. on your terminal, run this:
```
./node_modules/.bin/webpack serve --mode development
``` 
9. go to localhost:8081

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