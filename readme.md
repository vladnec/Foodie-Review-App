
My role was to build the back-end serving the Express app by a Node Server connected to a MongoDB database. 


## Technical Datas



The front-end developer has provided you with the following requirements for the API (as the front end has already been fully developed and tested):

| Verb | Endpoint | Request body(where applicable) | Expected response type | Function |
|--------|------------------|----------------------------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST | /api/auth/signup | {email:string,password:string} | {message:String} | Hashes user password, adds user to database |
| POST | /api/auth/login | {email:string,password:string} | {userId: string, token: string} | Checks user credentials, returning the user's _id from the database and a signed JSON web token (also containing the user's _id) |
| GET | /api/sauces | - | Array of sauces | Returns array of all sauces in the database |
| GET | /api/sauces/:id | - | Single sauce | Returns the sauce with the provided _id |
| POST | /api/sauces | {sauce:String, image:File} | {message:String} | Captures and saves image, parses stringified sauce and saves it to the  database, setting its imageUrl correctly. Initializes sauces likes and  dislikes to 0, and usersLiked and usersDisliked to empty arrays. |
| PUT | /api/sauces/:id | EITHER Sauce as JSON or {sauce:String, image:File} | {message:String} | Updates the sauce with the provided _id. If an image is uploaded,  capture it and update the sauces imageUrl. If no file is provided, the  sauce details are directly within the request body (req.body.name,  req.body.heat etc). If a file is provided, the stringified sauce is in  req.body.sauce. |
| DELETE | /api/sauces/:id | - | {message:String} | Deletes the sauce with the provided _id. |
| POST | /api/sauces/:id/like | {userId: String, like: Number} | {message:String} | Sets "like" status for the userId provided. If like = 1, the user likes  the sauce. If like = 0, the user is cancelling their like or dislike. If  like = -1, the user dislikes the sauce. The user's ID must be added to  or removed from the appropriate array, keeping track of their  preferences and preventing them from liking or disliking the same sauce  multiple times. Total number of likes and dislikes to be updated with  each like. |



The data model for a sauce is as follows:

    _id: String — the unique identifier created by MongoDB
    userId: String — the MongoDB unique identifier for the user who created the sauce
    name: String — name of the sauce
    manufacturer: String — manufacturer of the sauce
    description: String — description of the sauce
    mainPepper: String — the main pepper ingredient in the sauce
    imageUrl: String — the URL for the picture of the sauce uploaded by the user
    heat: Number — number between 1 and 10 describing the sauce
    likes: Number — number of users liking the sauce
    dislikes: Number — number of users disliking the sauce
    usersLiked: [String] — array of user IDs of users having liked the sauce
    usersDisliked: [String] — array of user IDs of users having disliked the sauce

The data model for a user is as follows:

    email: String — the user's email address [unique]
    password: String — hash of the user's password



Assessment guidelines

    The data store is regulation compliant.
    The project is structured in a clear and sensible manner.
    The Express app is served by a Node server and connected to a MongoDB database.
    Security on the MongoDB database (on a service such as MongoDB Atlas) is such that the validator can successfully run the app on his or her own machine.
    All database operations are performed using the Mongoose package, enforcing strict data schemas.
    Authentication is strictly enforced on required routes.
    Passwords are stored securely.
    Email addresses in the database are unique, and an appropriate Mongoose plugin is used to ensure this and report any errors.
    All elements of the front-end app function correctly.
