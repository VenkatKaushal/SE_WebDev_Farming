const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  


exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });
        user.password = await bcrypt.hash(password, 10);  
        await user.save();

        const payload = {
            user: { id: user.id }
        };
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error('Error generating access token:', err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );
        
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
            if (err) {
                console.error('Error generating refreshtoken:', err.message);
                return res.status(500).send("Server Error");
            }
            res.json({ token });
        });
        user.refreshToken = refreshToken;
        await user.save();
        console.log("SignUp Successful");
    } catch (err) {
        console.error("Error during registration:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Invalid User" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = { user: { id: user.id } };

        const accessToken =  jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error('Error generating accesstoken:', err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );

        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' },(err, token) => {
            if (err) {
                console.error('Error generating refreshtoken:', err.message);
                return res.status(500).send("Server Error");
            }
            res.json({ token });
        });

        user.refreshToken = refreshToken;
        await user.save();
        res.json({ accessToken, refreshToken });


        console.log("Login Successful");
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("Server Error");
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ msg: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ msg: "Invalid refresh token" });
        }

        const payload = { user: { id: user.id } };
        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error("Error verifying refresh token:", err.message);
        res.status(403).json({ msg: "Invalid refresh token" });
    }
};


exports.ForgetPassword = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        if (!email && !username) {
            return res.status(400).json({ message: "Email or username is required." });
        }

        if (!password) {
            return res.status(400).json({ message: 'New Password is required' });
        }

        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
