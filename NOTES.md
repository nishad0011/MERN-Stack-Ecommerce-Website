INSTALLS:
    
    Initial setup:
        - npm init
        -   package name: (ecommerce) ecommerce
            version: (1.0.0)
            description: MERN stack project
            entry point: (index.js) backend/server.js
    
    Packages:
        - npm i express mongoose dotenv
        - npm i dotenv (for config.env file)
        - npm i nodemon

    -npm list -g (check installed global packages)

THEORY:
    EXPRESS:
        - Middleware.
        - Provides funtionality to node.

STAGES:
    1 Basic setup
    2. MongoDB connection
    3. Creating schemas.
    4. Creating products API 
        create, 
        get all,
        update, 
        delete, 
        getOne
        productSchema->productController->productRoute
    5. Backend Error handling
        - error handler + middleware
        - async error handler
        - env file error
        - db connection error (unhandled promise rejection)
        - uncaught exception error
        