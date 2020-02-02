db.createUser(
    {
        user: "homestead",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "points_of_interest",
            }
        ]
    }
)