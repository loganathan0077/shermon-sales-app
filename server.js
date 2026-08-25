const express = require("express");
const app = express();
app.use(express.json());

const ADMIN_PASSWORD = "admin123"; // SAFE here

app.post("/api/delete", (req, res) => {
    const { password, id } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // TODO: Delete from your database or file
    console.log("Deleting item ID:", id);

    res.json({ success: true, message: "Product deleted successfully" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
