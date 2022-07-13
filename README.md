# express & mongo template

-   sign in with tokens
-   crud on user
-   crud on blogs
-   test all service func

## routes

    "/api"
      "/users"
            "GET "/",
            "GET /:userId",
            "POST "/",
            "POST /login",
            "PUT /:userId",
            "DELETE /:userId",

      "/blogs"
            "GET "/",
            "GET /:blogId",
            "GET /author/:userName"
            "POST "/",
            "PUT /:blogId",
            "DELETE /:blogId",
