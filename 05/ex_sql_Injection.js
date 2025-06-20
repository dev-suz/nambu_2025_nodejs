// # Sql injection
// ? 로 해놓고 받자!

app.get("/user", (req, res) => {});

// GET /user?username = '함선우'
// GET /user?username=admin' OR '1'='1,

// SQL injection
// SELECT * from users = WHERE username = 'admin' OR '1'='1'
