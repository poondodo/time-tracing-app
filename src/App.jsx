import { useState, useEffect } from "react";
import "./App.css";
import { LOGIN_STATUS, CLIENT, SERVER } from "./constants";
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTimetable,
  fetchAddTimeSlot,
  fetchUpdateTimeSlot,
  fetchDeleteTimeSlot,
  fetchGetCount,
} from "./services";

import NewTimeSlot from "./NewTimeSlot";
import TimeTable from "./TimeTable";
import CountToday from "./CountToday";
import Login from "./Login";
import Loading from "./Loading";
import Status from "./Status";

function App() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isTimetablePending, setIsTimetablePending] = useState(false);
  const [loginStatus, setLoginStatus] = useState("pending");
  const [timeSlots, setTimeSlots] = useState({});
  const [count, setCount] = useState({});

  function onLogin(username) {
    setIsTimetablePending(true);
    fetchLogin(username)
      .then((fetchedTimeSlots) => {
        setError("");
        setTimeSlots(fetchedTimeSlots);
        setIsTimetablePending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchGetCount();
      })
      .then((fetchedCount) => {
        setCount(fetchedCount);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setTimeSlots({});
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
    });
  }

  function onAddTimeSlot(type, duration) {
    fetchAddTimeSlot(type, duration)
      .then((addedTimeSlot) => {
        setTimeSlots({
          ...timeSlots,
          [addedTimeSlot.id]: addedTimeSlot,
        });
        return fetchGetCount();
      })
      .then((fetchedCount) => {
        setCount(fetchedCount);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onUpdateTimeSlot(id, type, duration) {
    fetchUpdateTimeSlot(id, type, duration)
      .then((timeSlot) => {
        setTimeSlots({
          ...timeSlots,
          [id]: timeSlot,
        });
        return fetchTimetable();
      })
      .then((fetchedTimeSlots) => {
        setTimeSlots(fetchedTimeSlots);
        return fetchGetCount();
      })
      .then((fetchedCount) => {
        setCount(fetchedCount);
      })
      .catch((err) => {
        setError(err?.error || "ERROR"); // Ensure that the error ends up truthy
      });
  }

  function onDeleteTimeSlot(id) {
    setError("");
    setIsTimetablePending(true);
    fetchDeleteTimeSlot(id)
      .then(() => {
        return fetchTimetable();
      })
      .then((timeSlots) => {
        setTimeSlots(timeSlots);
        setIsTimetablePending(false);
        return fetchGetCount();
      })
      .then((fetchedCount) => {
        setCount(fetchedCount);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchTimetable();
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then((timeSlots) => {
        setTimeSlots(timeSlots);
        return fetchGetCount();
      })
      .then((fetchedCount) => {
        setCount(fetchedCount);
      })
      .catch((err) => {
        if (err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || "ERROR");
      });
  }

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      {error && <Status error={error} />}
      {loginStatus === LOGIN_STATUS.PENDING && (
        <Loading className="login__waiting">Loading data...</Loading>
      )}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} />
      )}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="main-content">
          <div className="welcome">
            <p>Hello, {username}</p>
            <p>Daily Time Tracing</p>
            <button className="logout-button" onClick={onLogout}>
              Log Out
            </button>
          </div>
          <NewTimeSlot onAddTimeSlot={onAddTimeSlot} />
          <TimeTable
            timeSlots={timeSlots}
            isTimetablePending={isTimetablePending}
            onUpdateTimeSlot={onUpdateTimeSlot}
            onDeleteTimeSlot={onDeleteTimeSlot}
          />
          <CountToday count={count} />
        </div>
      )}
    </div>
  );
}

export default App;
