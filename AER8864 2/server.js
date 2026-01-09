const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


let verificationStorage = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heoneoljang@gmail.com', 
        pass: 'ktgv jvts lrfz qcqz' 
    }
});


app.post('/send-welcome-email', (req, res) => {
    const { email, code } = req.body;
    
    if (!email || !code) {
        return res.status(400).json({ success: false, message: "데이터 누락" });
    }

    verificationStorage[email] = code.toString();

    const mailOptions = {
        from: 'heoneoljang@gmail.com',
        to: email,
        subject: '[인증번호] 가입 확인 코드입니다.',
        text: `회원가입 인증번호는 [${code}] 입니다.`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false });
        }
        console.log(`메일 발송: ${email} (${code})`);
        res.status(200).json({ success: true });
    });
});


app.post('/verify-code', (req, res) => {
    const { email, userInputCode } = req.body;

    if (verificationStorage[email] && verificationStorage[email] === userInputCode) {
        delete verificationStorage[email]; 
        res.status(200).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "일치하지 않음" });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));