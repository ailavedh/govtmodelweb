const SERVICES = [{
        id: 'inc',
        name: 'Income Certificate',
        icon: '💰',
        duration: 30
    },
    {
        id: 'ews',
        name: 'EWS Certificate',
        icon: '🏢',
        duration: 30
    },
    {
        id: 'res',
        name: 'Resident Certificate',
        icon: '📍',
        duration: 20
    },
    {
        id: 'fam',
        name: 'Family Member Cert',
        icon: '👨‍👩‍👧‍👦',
        duration: 30
    },
    {
        id: 'sol',
        name: 'Solvency Certificate',
        icon: '🏦',
        duration: 45
    },
    {
        id: 'rat',
        name: 'Ration Card',
        icon: '🌾',
        duration: 20
    },
    {
        id: 'cas',
        name: 'Caste Certificate',
        icon: '📜',
        duration: 30
    },
    {
        id: 'pen',
        name: 'Pension Certificate',
        icon: '👴',
        duration: 20
    },
    {
        id: 'ryt',
        name: 'Rythu Bandhu Passbook',
        icon: '🚜',
        duration: 45
    }
];

const DISTRICTS = ['Hyderabad', 'Rangareddy', 'Medchal', 'Sangareddy', 'Warangal'];
const MANDALS = {
    'Hyderabad': ['Charminar', 'Secunderabad', 'Jubilee Hills', 'Khairatabad'],
    'Rangareddy': ['LB Nagar', 'Shamshabad', 'Rajendranagar'],
    'default': ['Mandal 1', 'Mandal 2']
};

let state = {
    mode: 'citizen',
    screen: 'login',
    history: [],
    phone: '',
    name: '',
    age: '',
    gender: 'Male',
    district: '',
    mandal: '',
    service: null,
    selectedDate: null,
    selectedSlot: null,
    adminDate: new Date(),
    showWalkinModal: false,
    showOWDModal: false,
    blockedDates: [],
    walkinCount: 0,
    appointments: []
};

function navigate(newScreen) {
    state.history.push(state.screen);
    state.screen = newScreen;
    render();
}

function goBack() {
    if (state.history.length) {
        state.screen = state.history.pop();
        render();
    }
}

function switchMode(targetMode) {
    state.mode = targetMode;
    state.screen = targetMode === 'admin' ? 'admin-login' : 'login';
    state.history = [];
    render();
}

function getNextDates() {
    const dates = [];
    let d = new Date();
    while (dates.length < 14) {
        d.setDate(d.getDate() + 1);
        const dow = d.getDay();
        if (dow === 0) continue;

        const iso = d.toISOString().split('T')[0];
        const blocked = state.blockedDates.includes(iso) || (dow === 6);
        dates.push({
            date: new Date(d),
            iso,
            blocked
        });
    }
    return dates;
}

function getAvailableSlots(duration, dateStr) {
    const slots = [];
    let h = 9,
        m = 0;
    const appsOnDate = state.appointments.filter(a => a.date === dateStr && a.status !== 'cancelled');

    while (h < 17) {
        if (h === 12 && m >= 30) {
            h = 14;
            m = 0;
        }
        if (h >= 17) break;

        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const label = `${h > 12 ? h - 12 : h}:${mm} ${h >= 12 ? 'PM' : 'AM'}`;

        const isBusy = appsOnDate.some(a => a.time === label);
        const end_h = Math.floor((h * 60 + m + duration) / 60);
        const end_m = (h * 60 + m + duration) % 60;

        if (end_h < 17 || (end_h === 17 && end_m === 0)) {
            slots.push({
                label,
                busy: isBusy
            });
        }
        m += duration;
        if (m >= 60) {
            h += Math.floor(m / 60);
            m = m % 60;
        }
    }
    return slots;
}

function changeAdminDate(days) {
    state.adminDate.setDate(state.adminDate.getDate() + days);
    render();
}

function getAdminDateString() {
    const isToday = state.adminDate.toDateString() === new Date().toDateString();
    const dStr = state.adminDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
    return isToday ? `Today, ${dStr}` : dStr;
}

function getNextSaturday(fromDateStr) {
    let d = new Date(fromDateStr);
    let daysToSat = 6 - d.getDay();
    if (daysToSat <= 0) daysToSat += 7;
    d.setDate(d.getDate() + daysToSat);
    return d.toISOString().split('T')[0];
}

// Handlers
function handleLoginNext() {
    state.phone = document.getElementById('inp-phone').value;
    navigate('demographics');
}

function handleDemographicsNext() {
    state.name = document.getElementById('inp-name').value || 'Citizen';
    state.age = document.getElementById('inp-age').value || '30';
    state.gender = document.getElementById('inp-gender').value;
    navigate('location');
}

function handleLocationNext() {
    state.district = document.getElementById('inp-dist').value;
    state.mandal = document.getElementById('inp-mand').value;
    navigate('services');
}

function handleDistrictChange() {
    state.district = document.getElementById('inp-dist').value;
    render();
}

function selectService(id) {
    state.service = SERVICES.find(s => s.id === id);
    render();
}

function handleServiceNext() {
    if (state.service) navigate('schedule');
    else alert('Please select a service first.');
}

function selectDate(iso) {
    state.selectedDate = {
        iso: iso
    };
    state.selectedSlot = null;
    render();
}

function selectSlot(label) {
    state.selectedSlot = {
        label: label
    };
    render();
}

function handleScheduleNext() {
    if (state.selectedSlot) navigate('confirm');
    else alert('Please select a time slot.');
}

function handleBookAnother() {
    state._confirmedFlag = false;
    navigate('services');
}

function userCancelApp(id, dateStr, timeStr) {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    let canCancel = false;

    if (dateStr > todayStr) {
        canCancel = true;
    } else if (dateStr === todayStr) {
        const parts = timeStr.split(' ');
        if (parts.length === 2) {
            let [h, m] = parts[0].split(':').map(Number);
            if (parts[1] === 'PM' && h !== 12) h += 12;
            if (parts[1] === 'AM' && h === 12) h = 0;
            const appTime = new Date();
            appTime.setHours(h, m, 0, 0);
            if ((appTime - now) / 60000 >= 60) canCancel = true;
        }
    }

    if (canCancel) {
        if (confirm("Cancel this appointment? This cannot be undone.")) {
            const app = state.appointments.find(a => a.id === id);
            if (app) app.status = 'cancelled';
            alert("Appointment cancelled successfully.");
            render();
        }
    } else {
        alert("⚠️ Appointments can only be cancelled at least 1 hour prior to the scheduled time.");
    }
}

function handleOWDClick() {
    const viewDateISO = state.adminDate.toISOString().split('T')[0];
    const now = new Date();
    const isToday = viewDateISO === now.toISOString().split('T')[0];
    const pastDeadline = isToday && (now.getHours() > 10 || (now.getHours() === 10 && now.getMinutes() >= 30));

    if (pastDeadline) {
        alert("Today's Out-Work-On-Duty must be scheduled before 10:30 AM.");
    } else {
        state.showOWDModal = true;
        render();
    }
}

function toggleWalkinModal(show) {
    state.showWalkinModal = show;
    render();
}

function toggleOWDModal(show) {
    state.showOWDModal = show;
    render();
}

function markDone(id) {
    const app = state.appointments.find(x => x.id === id);
    if (app) app.status = 'done';
    render();
}

function postponeApp(id) {
    const app = state.appointments.find(x => x.id === id);
    if (app && (app.postponeCount || 0) < 2) {
        const nextSat = getNextSaturday(app.date);
        app.date = nextSat;
        app.isPostponed = true;
        app.postponeCount = (app.postponeCount || 0) + 1;
        alert(`SMS Sent: Appointment shifted to Saturday, ${nextSat}.`);
        render();
    }
}

function adminCancelApp(id) {
    const otp = prompt("SECURITY CHECK:\nEnter 4-digit OTP provided by citizen:");
    if (otp && otp.trim().length === 4 && !isNaN(otp)) {
        const app = state.appointments.find(x => x.id === id);
        if (app) app.status = 'cancelled';
        alert('Appointment Cancelled.');
        render();
    } else if (otp) {
        alert('⚠️ Invalid OTP. Cancellation aborted.');
    }
}

function submitWalkin() {
    const n = document.getElementById('wi-name').value || 'Unknown Citizen';
    const a = parseInt(document.getElementById('wi-age').value) || 0;
    const s = document.getElementById('wi-svc').value;

    state.walkinCount++;
    const token = 'W' + String(state.walkinCount).padStart(3, '0');

    state.appointments.push({
        id: token,
        type: 'walkin',
        token: token,
        name: n,
        age: a,
        gender: '—',
        service: s,
        date: state.adminDate.toISOString().split('T')[0],
        time: 'Walk-in',
        status: 'pending',
        senior: a >= 60,
        walkin: true,
        isPostponed: false,
        postponeCount: 0
    });

    state.showWalkinModal = false;
    render();
}

function submitOWD() {
    const time = document.getElementById('owd-time').value;
    const reason = document.getElementById('owd-reason').value || 'Field Duty';

    if (!time) {
        alert("No free slots available.");
        return;
    }

    state.appointments.push({
        id: 'OWD' + Date.now(),
        type: 'owd',
        token: 'OWD',
        name: 'Official Duty',
        age: 0,
        gender: '—',
        service: reason,
        date: state.adminDate.toISOString().split('T')[0],
        time: time,
        status: 'pending',
        senior: false,
        walkin: false,
        isPostponed: false,
        postponeCount: 0
    });

    state.showOWDModal = false;
    render();
}

// Rendering Views
function viewLogin() {
    return `
        <div style="text-align:center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 10px;">🇮🇳</div>
            <h2 class="page-title">Welcome to Suvidha</h2>
            <p class="page-sub">Book MRO appointments instantly.</p>
        </div>
        <div class="form-group">
            <label class="label">Mobile Number</label>
            <div style="display:flex; gap:8px;">
                <div style="padding: 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1.5px solid var(--border-med);">+91</div>
                <input class="input" type="tel" id="inp-phone" placeholder="9999999999" maxlength="10" value="${state.phone}" style="flex:1">
            </div>
        </div>
        <button class="btn btn-primary" onclick="handleLoginNext()">Login with OTP →</button>
    `;
}

function viewDemographics() {
    return `
        <h2 class="page-title">Citizen Details</h2>
        <p class="page-sub">Who is attending the appointment?</p>
        <div class="form-group"><label class="label">Full Name</label><input class="input" id="inp-name" value="${state.name}" placeholder="Enter name"></div>
        <div class="form-group"><label class="label">Age</label><input class="input" type="number" id="inp-age" value="${state.age}" placeholder="e.g. 65"></div>
        <div class="form-group">
            <label class="label">Gender</label>
            <select class="select" id="inp-gender">
                <option ${state.gender==='Male'?'selected':''}>Male</option>
                <option ${state.gender==='Female'?'selected':''}>Female</option>
            </select>
        </div>
        <button class="btn btn-primary" onclick="handleDemographicsNext()">Next Step →</button>
    `;
}

function viewLocation() {
    return `
        <h2 class="page-title">Select Office</h2>
        <p class="page-sub">Choose your local revenue office.</p>
        <div class="form-group">
            <label class="label">District</label>
            <select class="select" id="inp-dist" onchange="handleDistrictChange()">
                <option value="">--Select--</option>
                ${DISTRICTS.map(d => `<option ${state.district===d?'selected':''}>${d}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label class="label">Mandal</label>
            <select class="select" id="inp-mand">
                <option value="">--Select--</option>
                ${(MANDALS[state.district] || MANDALS['default']).map(m => `<option ${state.mandal===m?'selected':''}>${m}</option>`).join('')}
            </select>
        </div>
        <button class="btn btn-primary" onclick="handleLocationNext()">Select Services →</button>
    `;
}

function viewServices() {
    return `
        <h2 class="page-title">Services</h2>
        <p class="page-sub">What do you need help with?</p>
        <div class="service-grid">
            ${SERVICES.map(s => `
                <div class="service-card ${state.service?.id === s.id ? 'selected' : ''}" onclick="selectService('${s.id}')">
                    <span>${s.icon}</span><h3>${s.name}</h3><p>${s.duration} mins</p>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top:20px" onclick="handleServiceNext()">Proceed →</button>
    `;
}

function viewSchedule() {
    const dates = getNextDates();
    const slots = state.selectedDate ? getAvailableSlots(state.service.duration, state.selectedDate.iso) : [];

    return `
        <h2 class="page-title">Pick Date & Time</h2>
        <p class="page-sub">${state.service.name} (${state.service.duration} mins)</p>
        
        <div class="section-hdr">1. Select Date</div>
        <div class="date-scroll">
            ${dates.map(d => `
                <div class="date-chip ${d.blocked?'blocked':''} ${state.selectedDate?.iso===d.iso?'selected':''}" onclick="selectDate('${d.iso}')">
                    <div class="dc-day">${d.date.toLocaleDateString('en-US',{weekday:'short'})}</div>
                    <div class="dc-num">${d.date.getDate()}</div>
                </div>
            `).join('')}
        </div>
        
        ${state.selectedDate ? `
            <div class="section-hdr">2. Select Time Slot</div>
            <div class="slot-grid">
                ${slots.map(s => `
                    <div class="slot ${s.busy?'busy':''} ${state.selectedSlot?.label===s.label?'selected':''}" onclick="${s.busy?'':`selectSlot('${s.label}')`}">${s.label}</div>
                `).join('')}
            </div>
            ${slots.length === 0 ? '<p style="font-size:12px; color:var(--text-secondary); text-align:center; margin-top:20px;">No available slots on this date.</p>' : ''}
        ` : ''}
        
        <button class="btn btn-primary" style="margin-top:24px" onclick="handleScheduleNext()">Confirm Booking ✅</button>
    `;
}

function viewConfirm() {
    if (!state._confirmedFlag) {
        const isSenior = parseInt(state.age) >= 60;
        const newToken = 'C' + Math.floor(Math.random() * 900 + 100);

        state.appointments.push({
            id: newToken,
            type: 'citizen',
            token: newToken,
            name: state.name,
            age: state.age,
            gender: state.gender,
            service: state.service.name,
            date: state.selectedDate.iso,
            time: state.selectedSlot.label,
            status: 'pending',
            senior: isSenior,
            isPostponed: false,
            postponeCount: 0
        });

        state.lastToken = newToken;
        state._confirmedFlag = true;
    }

    const app = state.appointments.find(a => a.id === state.lastToken);

    return `
        <div style="text-align:center; padding-top:20px;">
            <div style="font-size: 64px; margin-bottom: 10px; color: var(--green);">✅</div>
            <h2 class="page-title">Booking Confirmed</h2>
            <p class="page-sub">SMS sent to +91 ${state.phone}</p>
            
            <div class="card" style="background:linear-gradient(135deg, var(--navy), #1a4db5); color:white; padding:30px;">
                <p style="font-size:12px; opacity:0.8; margin-bottom:4px">TOKEN NUMBER</p>
                <h1 style="font-size:48px; font-weight:800; letter-spacing:2px;">${app.token}</h1>
            </div>
            
            <div class="card" style="text-align:left;">
                <p><strong>Name:</strong> ${app.name} ${app.senior ? '<span class="badge badge-gold">Senior</span>' : ''}</p>
                <p style="margin-top:8px"><strong>Date & Time:</strong> ${app.date} at ${app.time}</p>
                <p style="margin-top:8px"><strong>Status:</strong> <span class="badge badge-green">${app.status.toUpperCase()}</span></p>
            </div>
            
            <div style="display:flex; gap:10px; margin-top:20px;">
                <button class="btn btn-outline" style="flex:1" onclick="handleBookAnother()">Book Another</button>
                ${app.status === 'pending' ? `<button class="btn btn-outline-danger" style="flex:1" onclick="userCancelApp('${app.id}', '${app.date}', '${app.time}')">Cancel Appointment</button>` : ''}
            </div>
        </div>
    `;
}

function viewAdminLogin() {
    return `
        <h2 class="page-title" style="margin-top:20px">Admin Login</h2>
        <p class="page-sub">MRO & Staff Access Only</p>
        <div class="form-group"><label class="label">Officer ID</label><input class="input" placeholder="AP-MRO-..."></div>
        <div class="form-group"><label class="label">Passcode</label><input class="input" type="password" placeholder="••••"></div>
        <button class="btn btn-green" onclick="navigate('admin-dash')">Access Dashboard →</button>
    `;
}

function viewAdminDash() {
    const viewDateISO = state.adminDate.toISOString().split('T')[0];
    const dailyApps = state.appointments.filter(a => a.date === viewDateISO && a.status !== 'cancelled');

    const sorted = [...dailyApps].sort((a, b) => {
        if (a.type === 'owd' && b.type !== 'owd') return -1;
        if (b.type === 'owd' && a.type !== 'owd') return 1;
        return (b.senior === true) - (a.senior === true);
    });

    const pendingCount = sorted.filter(a => a.status === 'pending').length;
    const owdSlots = getAvailableSlots(30, viewDateISO);

    return `
        ${state.showWalkinModal ? `
            <div class="alert-overlay">
                <div class="alert-box" style="border-top: 6px solid var(--saffron);">
                    <h2 style="color:var(--text-primary); margin-bottom:16px; text-align:left;">Add Walk-in Citizen</h2>
                    <div class="form-group"><label class="label">Full Name</label><input class="input" id="wi-name" placeholder="Enter Name"></div>
                    <div class="form-group"><label class="label">Age</label><input class="input" type="number" id="wi-age" placeholder="e.g. 45"></div>
                    <div class="form-group">
                        <label class="label">Service Required</label>
                        <select class="select" id="wi-svc">
                            ${SERVICES.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                            <option value="General Enquiry">General Enquiry</option>
                        </select>
                    </div>
                    <div style="display:flex; gap:8px; margin-top:20px;">
                        <button class="btn btn-outline" style="flex:1" onclick="toggleWalkinModal(false)">Cancel</button>
                        <button class="btn btn-saffron" style="flex:1" onclick="submitWalkin()">Add to Queue</button>
                    </div>
                </div>
            </div>
        ` : ''}

        ${state.showOWDModal ? `
            <div class="alert-overlay">
                <div class="alert-box" style="border-top: 6px solid var(--purple);">
                    <h2 style="color:var(--text-primary); margin-bottom:8px; text-align:left;">Schedule Field Duty</h2>
                    <p style="font-size:12px; color:var(--text-secondary); text-align:left; margin-bottom:16px;">Blocks time so citizens cannot book.</p>
                    <div class="form-group">
                        <label class="label">Select Free Time Slot</label>
                        <select class="select" id="owd-time">
                            ${owdSlots.filter(s => !s.busy).map(s => `<option value="${s.label}">${s.label}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group"><label class="label">Duty Reason</label><input class="input" id="owd-reason" placeholder="e.g. Village Inspection"></div>
                    <div style="display:flex; gap:8px; margin-top:20px;">
                        <button class="btn btn-outline" style="flex:1" onclick="toggleOWDModal(false)">Cancel</button>
                        <button class="btn btn-purple" style="flex:1" onclick="submitOWD()">Block Time</button>
                    </div>
                </div>
            </div>
        ` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <div style="display:flex; align-items:center; gap:12px">
                <button class="btn btn-outline btn-sm" onclick="changeAdminDate(-1)">◀</button>
                <div style="text-align:center; min-width: 120px;"><h3 style="font-size:15px; font-weight:700;">${getAdminDateString()}</h3><p style="font-size:11px; color:var(--text-secondary)">Secunderabad MRO</p></div>
                <button class="btn btn-outline btn-sm" onclick="changeAdminDate(1)">▶</button>
            </div>
        </div>

        <div class="stat-grid">
            <div class="stat-card"><div class="stat-num">${sorted.length}</div><div class="stat-lbl">Tasks Displayed</div></div>
            <div class="stat-card"><div class="stat-num" style="color:${pendingCount>0?'var(--saffron)':'var(--green)'}">${pendingCount}</div><div class="stat-lbl">Pending</div></div>
        </div>

        <div style="display:flex; gap:8px; margin-bottom: 20px;">
            <button class="btn btn-sm btn-outline" style="flex:1; border-color:var(--saffron); color:var(--saffron-dark)" onclick="toggleWalkinModal(true)">+ Walk-in</button>
            <button class="btn btn-sm btn-outline" style="flex:1; border-color:var(--purple); color:var(--purple)" onclick="handleOWDClick()">🚗 Schedule OWD</button>
        </div>

        <div class="section-hdr">Schedule Queue</div>

        ${sorted.length === 0 ? `
            <div style="text-align:center; padding: 40px 20px; color:var(--text-secondary)"><div style="font-size:32px; margin-bottom:8px">☕</div><p>No appointments or duties scheduled.</p></div>
        ` : sorted.map(a => {
            
            if(a.type === 'owd') {
                return `
                <div class="queue-item owd-block">
                    <div class="queue-header">
                        <div class="token-badge owd">OWD</div>
                        <div style="flex:1"><div style="font-weight:700; font-size:15px; color:var(--purple)">${a.service}</div><div style="font-size:12px; color:var(--text-secondary)">${a.time}</div></div>
                        ${a.status==='done' ? '<span class="badge badge-green">Completed</span>' : ''}
                    </div>
                    ${a.status === 'pending' ? `<div class="queue-actions"><button class="btn btn-sm btn-purple" style="flex:1" onclick="markDone('${a.id}')">✓ Mark Returned</button></div>` : ''}
                </div>`;
            }

            return ` <
        div class = "queue-item ${a.senior ? 'senior' : ''} ${a.status==='done' ? 'done' : ''}" >
        <
        div class = "queue-header" >
        <
        div class = "token-badge"
    style = "background:${a.walkin ? 'var(--saffron)' : 'var(--navy)'}" > $ {
        a.token
    } < /div> <
    div style = "flex:1" >
        <
        div style = "font-weight:700; font-size:15px" > $ {
            a.name
        } < /div> <
    div style = "font-size:12px; color:var(--text-secondary)" > $ {
        a.age
    }
    y• $ {
        a.time
    } < /div> < /
    div >
        $ {
            a.isPostponed ? '<span class="badge badge-gray">↪ Postponed</span>' : ''
        }
    $ {
        a.senior ? '<span class="badge badge-gold">Senior Priority</span>' : ''
    }
    $ {
        a.status === 'done' ? '<span class="badge badge-green">Completed</span>' : ''
    } <
    /div> <
    div style = "font-size:13px; margin-bottom:8px;" > $ {
        a.service
    } < /div>

    $ {
        a.status === 'pending' ? `
                    <div class="queue-actions">
                        <button class="btn btn-green btn-sm" style="flex:1" onclick="markDone('${a.id}')">✓ Done</button>
                        ${(a.postponeCount || 0) < 2 
                            ? `<button class="btn btn-outline btn-sm" style="flex:1" onclick="postponeApp('${a.id}')">↪ Postpone (${2 - (a.postponeCount || 0)} left)</button>`
                            : `<button class="btn btn-outline btn-sm" style="flex:1; opacity:0.5; cursor:not-allowed;" disabled>Limit Reached</button>`
                        }
                        <button class="btn btn-danger btn-sm" style="flex:1; padding: 8px 4px;" onclick="adminCancelApp('${a.id}')">🗑️ Cancel</button>
                    </div>
                ` : ''
    } <
    /div>
    `;
        }).join('')}
    `;
}

// Ensure the app renders when the script loads
function render() {
    const wrap = document.getElementById('screen-wrap');
    const topbar = document.getElementById('main-topbar');
    const backBtn = document.getElementById('back-btn');
    const modeSwitch = document.getElementById('mode-switch');

    if (!wrap) return;

    topbar.className = `topbar ${state.mode === 'admin' ? 'admin-mode' : ''}`;
    document.getElementById('top-sub').innerText = state.mode === 'admin' ? 'Official Dashboard' : 'Citizen Portal';
    backBtn.classList.toggle('hidden', state.screen === 'login' || state.screen === 'admin-dash');

    if (state.mode === 'citizen') {
        modeSwitch.innerHTML = `Are you a government official? <a onclick="switchMode('admin')" style="color:var(--navy);font-weight:700;cursor:pointer;">Admin Login</a>`;
    } else if (state.screen === 'admin-login') {
        modeSwitch.innerHTML = `<a onclick="switchMode('citizen')" style="color:var(--text-secondary);cursor:pointer;">← Back to Citizen Portal</a>`;
    } else {
        modeSwitch.innerHTML = '';
    }

    const routes = {
        'login': viewLogin,
        'demographics': viewDemographics,
        'location': viewLocation,
        'services': viewServices,
        'schedule': viewSchedule,
        'confirm': viewConfirm,
        'admin-login': viewAdminLogin,
        'admin-dash': viewAdminDash
    };

    wrap.innerHTML = `<div class="animate-in">${(routes[state.screen] || viewLogin)()}</div>`;
}

document.addEventListener('DOMContentLoaded', render);