INSTALLS:    
    Initial setup:
        - npm init
        -   package name: (ecommerce) ecommerce
            version: (1.0.0)
            description: MERN stack project
            entry point: (index.js) backend/server.js
    
    Packages:
        Backend
        - npm i express mongoose dotenv
        - npm i dotenv (for config.env file)
        - npm i nodemon (auto restart server on changes)

        - npm i bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser
        (
            bcrypt - encrypting passwords
            jsonwebtoken - Creating user session token
            nodemailer - send emails
            cookie-parser - cookies
            body-parser - data transformation
        )

        frontend
        - npm i axios (Promise based HTTP client)
            react-alert 
            react-alert-template-basic 
            react-helmet (for Page Title)
            react-redux 
            react-icons
            redux 
            redux-thunk 
            redux-devtools-extension 
            react-router-dom 
            overlay-navbar
            react-rating-stars-component
            @reduxjs/toolkit
            react-material-ui-carousel
            @material-ui/core
            @material-ui/icons
            (--legacy-peer-deps  )

    -npm list -g (check installed global packages)

THEORY:
    EXPRESS:
        - Middleware.
        - Provides funtionality to node.

    CSS:
        - position 
            - absolute
            - sticky

        - sizes
            - vmin
            - em

        - media
            -@media (max-width:480px){}


STAGES:
    1 Basic setup
    2. MongoDB connection
    3. Creating product schema.
    4. Creating products API 
        (create,get all,update,delete,getOne)
        productSchema->productController->productRoute
    5. Backend Error handling
        - error handler + middleware
        - async error handler
        - env file error
        - db connection error (unhandled promise rejection)
        - uncaught exception error
    6. Products Search filter pagination
        - find()
        - filter()
        - pagination()
    7. Authentication
        - user schema created
        - user controller created
        - jwtToken.js
        - token verification
    8. Password reset using email
        - tokens generation
        - token validation and reset password
    9. User Routes
        - update password
        - get user details
    10. more product APIs
        - Get all reviews of a product
        - Update review 
        - Delete review
    11. Order routes/APIs
        - orderModel.js
        - orderController.js 
        - orderRoutes.js

    Frontend
    12. Header, Footer and Home
    13. Redux Setup
    14. Loader Functionality
    15. react-alert functionality 
    16. creating reducers

        
