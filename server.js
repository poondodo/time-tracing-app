const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

const timeTable = require('./timeTable');
// const sessions = require('./sessions');
// const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const sessions = require('./sessions');
const users = require('./users');

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
        users.addUserData(username, timeTable.makeTimeTable());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getTimeSlots());
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
})

app.get('/api/timetable', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username).getTimeSlots());
})

app.post('/api/timeslot', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { type, duration } = req.body;
    const id = users.getUserData(username).addTimeSlot(type, duration);
    res.json(users.getUserData(username).getTimeSlot(id));
})

app.put('/api/timeslot/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { id } = req.params;
    const { type, duration } = req.body;
    const timeTable = users.getUserData(username);
    if (!timeTable.contains(id)) {
        res.status(404).json({ error: `noSuchId`, message: `No time slot with id ${id}` });
        return;
    }
    if (!type) {
        res.status(400).json({ error: 'required-type' });
        return;
    }
    if (!duration) {
        res.status(400).json({ error: 'required-duration' });
        return;
    }
    timeTable.updateTimeSlot(id, type, duration);
    res.json(timeTable.getTimeSlot(id));
});

app.delete('/api/timeslot/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { id } = req.params;
    const timeTable = users.getUserData(username);
    const exists = timeTable.contains(id);
    if (exists) {
        timeTable.deleteTimeSlot(id);
    }
    res.json({ message: exists ? `time slot ${id} deleted` : `time slot ${id} did not exist` });
});

app.get('/api/count', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json(users.getUserData(username).getCount());
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));