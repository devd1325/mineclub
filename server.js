const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // لتشغيل ملفات HTML/CSS

// دالة تسجيل الحساب وحفظه في ملف
app.post('/register', (req, res) => {
    const newUser = req.body;

    // 1. قراءة الملف الحالي
    fs.readFile('users.json', (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }

        // 2. إضافة المستخدم الجديد
        users.push(newUser);

        // 3. حفظ البيانات مجدداً في الملف
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send("Error saving user");
            res.send("Account Saved in users.json!");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
