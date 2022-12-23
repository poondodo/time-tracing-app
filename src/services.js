export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchTimetable() {
    return fetch('/api/timetable', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                const test = response.json();
                console.log("tests" + test)
                return test;
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchAddTimeSlot(type, duration) {
    return fetch('/api/timeslot', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ type, duration }),
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        })
}

export function fetchUpdateTimeSlot(id, type, duration) {
    return fetch(`/api/timeslot/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ type, duration }),
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchDeleteTimeSlot(id) {
    return fetch(`/api/timeslot/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchGetCount() {
    return fetch('/api/count', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'networkError' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}