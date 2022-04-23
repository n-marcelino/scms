# scms

## HOW TO RUN (!!!)

1. download the zip file of the project and extract to any location on your drive

2. the backend folder contains the java project compatible with eclipse, while the client folder contains html/js to be launched on vscode

<details>
<summary>3. what to do on vscode</summary>

    1. add the client folder to ur vscode workspace

    2. make sure that your terminal is set to the client folder directory
        * e.g. your terminal should look like this:
        
    E:\Programming\github\scms\client> []     <= this thing is ur cursor
    
</details>

4. in your vscode terminal, type the following in order to run the sql script:
```
mysql -p -u (sql username) < scms.sql
```

<details>
<summary>5. what to do on eclipse</summary>

    1. import as project the backend to eclipse
    
    2. within eclipse, in src/main/resources/application.properties,
    change the necessary info to match ur sql settings

    3. run 'program.java' within the backend project on eclipse

</details>

6. going back to your vscode terminal, type this to launch the client:

```
./node_modules/.bin/webpack serve --mode development
```

7. on your browser, go to localhost:8081


## IMPORTANT
<details>
<summary>TO-DO LIST (last updated: 22/04/22 - 10:04 P.M.)</summary>

- implement "update" functionality into the saves
    <details>
    <summary>backend</summary>

    * category

    * customer

    * order

    * product
    </details>

    <details>
    <summary>client</summary>

    * category

    * customer

    * order
    
    * product

        <details>
        <summary>client: things of note</summary>

        - make sure that the header changes if there is an id received (check recording for more info)

        - if there is an id (which means u are editing), then header is "Editing {object} {id}}"
            - where 
                - object is either category, customer, order, or product
                - id is the object's id
                - e.g. Editing Product 1

            - should delete button be:
                - in category show, beside the edit button (like how sir did it)
                - or embedded in the edit page as a danger zone?
                    - if danger zone, set it so it only appears when u go to save page through the edit button
                    - if there is id, then return danger zone

        </details>
    </details>
        
- implement "delete" functionality ✅

</details>

<details>
<summary>THINGS TO CONSULT MISS ABOUT ✅</summary>

1. how our backend and client works
    * backend thats built on spring framework that is connected to a mysql db
    * client that runs on react and js
2. incompatibility with the java tutorial she showed
    * java & jdbc vs. java spring framework & mysql
    * wrong understanding that we needed a .sql file to have a working backend?
    * rather, we are connected to sql already
3. we're following the oop that our other major is talking about
4. ensure that she knows there is mysql involved
    * we dont have a specific .sql file, BUT we are working with sql
    * the only thing that needs to be done is make a scms db in mysql
    * then our backend will handle the rest

</details>

<details>
<summary>THINGS TO CONSULT SIR ABOUT ✅</summary>

1. ung id system ang gulo :l
2. ung orders, how to work with many to many relationships?
    * how to have a form input for many inputs (like list of product)? 
    * and how to convert that into smth that the backend can use???
    * how to work with the builder + controller?
3. additionally, how to work with arrays sa render product?
    * e.g. in categories, show localhost:8080, the array of products under a category
    * how to render that?
4. how to work with update and delete in the backend?
    * problematic cors request errors kahit may cross origin annotation

</details>