
/* ==========================================================================
   1. SUPABASE CLOUD DATABASE CONFIGURATION
   ========================================================================== */

const SUPABASE_URL = 'https://leiivmvlqwgswziqlhqb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaWl2bXZscXdnc3d6aXFsaHFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzkyNTgsImV4cCI6MjA5MTkxNTI1OH0.GAqwJJZZMpj-kuEU8dRJoo0u32vvwTHvxuu-DI6rwLc';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

/* ==========================================================================
   2. APP CONFIGURATION & STATIC DATA
   ========================================================================== */
const SERVICES = [
    { id: 'inc', name: 'Income Certificate', icon: '💰', duration: 30 },
    { id: 'ews', name: 'EWS Certificate', icon: '🏢', duration: 30 },
    { id: 'res', name: 'Resident Certificate', icon: '📍', duration: 20 },
    { id: 'fam', name: 'Family Member Cert', icon: '👨‍👩‍👧‍👦', duration: 30 },
    { id: 'sol', name: 'Solvency Certificate', icon: '🏦', duration: 45 },
    { id: 'rat', name: 'Ration Card', icon: '🌾', duration: 20 },
    { id: 'cas', name: 'Caste Certificate', icon: '📜', duration: 30 },
    { id: 'pen', name: 'Pension Certificate', icon: '👴', duration: 20 },
    { id: 'ryt', name: 'Rythu Bandhu Passbook', icon: '🚜', duration: 45 }
];

const MANDALS = {
    'Adilabad': ['Adilabad Rural', 'Adilabad Urban', 'Bazarhatnoor', 'Bela', 'Bheempur', 'Boath', 'Gudihathnoor', 'Ichoda', 'Inderavelly', 'Jainad', 'Mavala', 'Narnoor', 'Neradigonda', 'Sirikonda', 'Talamadugu', 'Tamsi', 'Utnur'],
    'Bhadradri Kothagudem': ['Allapalli', 'Annapureddypally', 'Aswapuram', 'Aswaraopeta', 'Bhadrachalam', 'Burgampahad', 'Chandrugonda', 'Cherla', 'Chunchupally', 'Dammapeta', 'Dummugudem', 'Gundala', 'Julurpad', 'Karakagudem', 'Kothagudem', 'Laxmidevipalli', 'Manuguru', 'Mulakalapalli', 'Palwancha', 'Pinapaka', 'Sujathanagar', 'Tekulapalli', 'Yellandu'],
    'Hanumakonda': ['Bheemadevarpalli', 'Dharmasagar', 'Elkathurthy', 'Hasanparthy', 'Inavolu', 'Kamalapur', 'Kazipet', 'Khila Warangal', 'Nad Nadikuda', 'Parkal', 'Velair', 'Hanumakonda', 'Geesugonda', 'Wardhannapet'],
    'Hyderabad': ['Amberpet', 'Asifnagar', 'Bahadurpura', 'Bandlaguda', 'Charminar', 'Golconda', 'Himayatnagar', 'Khairatabad', 'Marredpally', 'Musheerabad', 'Nampally', 'Saidabad', 'Secunderabad', 'Shaikpet', 'Trimulgherry', 'Ameerpet'],
    'Jagtial': ['Beerpur', 'Buggaram', 'Dharmapuri', 'Gollapalli', 'Ibrahimpatnam', 'Jagtial', 'Jagtial Rural', 'Kathlapur', 'Kodimial', 'Korutla', 'Macchupeta', 'Mallapur', 'Malyal', 'Medipalli', 'Metpalli', 'Pegadapalli', 'Raikal', 'Sarangapur', 'Velgatoor'],
    'Jangaon': ['Bachannapet', 'Chilpur', 'Devaruppula', 'Ghanpur (Station)', 'Jangaon', 'Kodakandla', 'Lingalaghanpur', 'Narmetta', 'Palakurthi', 'Raghunathpalle', 'Tarigoppula', 'Zaffergadh'],
    'Jayashankar Bhupalpally': ['Bhupalpally', 'Chityal', 'Ghanpur', 'Kataram', 'Mahadevpur', 'Maha Mutharam', 'Malharrao', 'Mogullapally', 'Palimela', 'Regonda', 'Tekumatla'],
    'Jogulamba Gadwal': ['Aiza', 'Alampur', 'Dharur', 'Gadwal', 'Ghattu', 'Itikyal', 'Kaloor Timmanadoddi', 'Maldakal', 'Manopad', 'Rajoli', 'Undavelly', 'Waddepalle'],
    'Kamareddy': ['Banswada', 'Bhimgal', 'Bhiknoor', 'Birkur', 'Bichkunda', 'Brahmanapalle', 'Domakonda', 'Dongli', 'Gandhari', 'Jukkal', 'Kamareddy', 'Lingampet', 'Machareddy', 'Madnoor', 'Nizamsagar', 'Peddakodapgal', 'Pitlam', 'Rajampet', 'Ramareddy', 'Sadashivanagar', 'Tadwai', 'Yellareddy'],
    'Karimnagar': ['Chigurumamidi', 'Choppadandi', 'Ganneruvaram', 'Gangadhara', 'Illandakunta', 'Jammikunta', 'Karimnagar', 'Karimnagar Rural', 'Kothapalli', 'Manakondur', 'Ramadugu', 'Shankarapatnam', 'Thimmapur', 'Veenavanka', 'V.V. Rao Palle'],
    'Khammam': ['Bonakal', 'Chinthakani', 'Earloodu', 'Enkoor', 'Kallur', 'Kamepalli', 'Khammam Rural', 'Khammam Urban', 'Konijerla', 'Kusumanchi', 'Madhira', 'Mudigonda', 'Nelakondapalli', 'Penuballi', 'Ragunathapalem', 'Sathupalli', 'Singareni', 'Tallada', 'Tirumalayapalem', 'Vemsoor', 'Wyra'],
    'Komaram Bheem Asifabad': ['Asifabad', 'Bejjur', 'Chintalamanepally', 'Dahegaon', 'Jainoor', 'Kagaznagar', 'Kerameri', 'Kouthala', 'Lingapur', 'Penchikalpet', 'Rebbena', 'Sirpur (T)', 'Sirpur (U)', 'Tiryani', 'Wankidi'],
    'Mahabubabad': ['Bayyaram', 'Bodan', 'Dornakal', 'Gangaram', 'Garla', 'Gudur', 'Kothaguda', 'Kuravi', 'Mahabubabad', 'Maripeda', 'Narsimhulapet', 'Nellikudur', 'Peddavangara', 'Siroor', 'Thorur'],
    'Mahabubnagar': ['Addakal', 'Balanagar', 'Bhoothpur', 'CC Kunta', 'Devarkadra', 'Gandeed', 'Hanwada', 'Jadcherla', 'Koilkonda', 'Mahabubnagar Rural', 'Mahabubnagar Urban', 'Midjil', 'Moosapet', 'Nawabpet', 'Narva', 'Rajapur'],
    'Mancherial': ['Bellampalli', 'Bheemaram', 'Bheemini', 'Chennur', 'Dandepally', 'Hajipur', 'Jaipur', 'Jannaram', 'Kannepally', 'Kasipet', 'Kotapally', 'Luxettipet', 'Mancherial', 'Mandamarri', 'Nennal', 'Vemanpally'],
    'Medak': ['Alladurg', 'Chegunta', 'Chilipched', 'Havelighanpur', 'Kowdhipally', 'Kulcharam', 'Medak', 'Narsingi', 'Narsapur', 'Nizampet', 'Papannapet', 'Ramayampet', 'Regode', 'Shankarampet (A)', 'Shankarampet (R)', 'Shivampet', 'Tekmal', 'Tupran', 'Veldurthy', 'Yeldurthy'],
    'Medchal-Malkajgiri': ['Alwal', 'Bachupally', 'Balnagar', 'Dundigal Gandimaisamma', 'Ghatkesar', 'Keesara', 'Kukatpally', 'Malkajgiri', 'Medipally', 'Medchal', 'Quthbullapur', 'Shamirpet', 'Uppal'],
    'Mulugu': ['Eturnagaram', 'Govindaraopet', 'Kannaigudem', 'Mangapet', 'Mulugu', 'SS Tadvai', 'Vazeed', 'Venkatapur'],
    'Nagarkurnool': ['Achampet', 'Amrabad', 'Balmoor', 'Bijinapalle', 'Charakonda', 'Kalwakurthy', 'Kollapur', 'Lingal', 'Nagarkurnool', 'Padara', 'Peddakothapalle', 'Pentlavelli', 'Telkapalle', 'Thimmajipeta', 'Uppununthala', 'Urkonda', 'Vangoor'],
    'Nalgonda': ['Adavi Devulapally', 'Anumula', 'Chandur', 'Chinthapally', 'Chityal', 'Damaracherla', 'Devarakonda', 'Gundlapally', 'Gurrampode', 'Kangal', 'Kattangoor', 'Kethepally', 'Madgulapally', 'Mar riguda', 'Miryalaguda', 'Munugode', 'Narketpally', 'Nalgonda', 'Nampally', 'Narayanapur', 'Neredugommu', 'Nidamanur', 'Pedda Adiserlapally', 'Peddavoora', 'Thipparthi', 'Tirumalgiri (Sagar)', 'Tripuraram', 'Vemulapally'],
    'Narayanpet': ['Damaragidda', 'Dhanwada', 'Kosgi', 'Krishna', 'Maddur', 'Maganoor', 'Makthal', 'Marikal', 'Narayanpet', 'Utkoor'],
    'Nirmal': ['Bainsa', 'Basar', 'Bhainsa', 'Dasturabad', 'Dilawarpur', 'Kaddampeddur', 'Khanapur', 'Kuntala', 'Lokeswaram', 'Mamda', 'Mudhole', 'Narsapur (G)', 'Nirmal Rural', 'Nirmal Urban', 'Pemdhi', 'Sarangapur', 'Soan', 'Tanoor'],
    'Nizamabad': ['Armoor', 'Balkonda', 'Bheemgal', 'Bodhan', 'Chandur', 'Dharpally', 'Dichpally', 'Edapally', 'Erandi', 'Jakranpally', 'Kammarpally', 'Kotgiri', 'Makloor', 'Mendora', 'Morthad', 'Mugpal', 'Mupkal', 'Nandipet', 'Navipet', 'Nizamabad North', 'Nizamabad Rural', 'Nizamabad South', 'Ranjal', 'Rudrur', 'Sirikonda', 'Varni', 'Velpur', 'Yedapally'],
    'Peddapalli': ['Anthergoam', 'Dharmaram', 'Eligaided', 'Julapalli', 'Kamanpur', 'Manthani', 'Mutharam (Manthani)', 'Odela', 'Palakurthy', 'Peddapalli', 'Ramagiri', 'Ramagundam', 'Srirampur', 'Sulthanabad'],
    'Rajanna Sircilla': ['Boinpalli', 'Chandurthi', 'Ellanthakunta', 'Gambhiraopet', 'Konaraopet', 'Mustabad', 'Rudrangi', 'Sircilla', 'Thangallapalli', 'Vemulawada', 'Vemulawada Rural', 'Yellareddypet'],
    'Rangareddy': ['Abdullapurmet', 'Amangal', 'Balapur', 'Chewalla', 'Farooqnagar', 'Gandipet', 'Hayathnagar', 'Ibrahimpatnam', 'Kadthal', 'Kandukur', 'Keshampet', 'Kondurg', 'Madgul', 'Maheswaram', 'Manchal', 'Moinabad', 'Nandigama', 'Rajendranagar', 'Saroornagar', 'Serilingampally', 'Shabad', 'Shamshabad', 'Shankarpalle', 'Talakondapalle', 'Yacharam'],
    'Sangareddy': ['Ameenpur', 'Andole', 'Bhanur', 'Choutkur', 'Gummadidala', 'Hathnoora', 'Jharasangam', 'Jinnaram', 'Kalher', 'Kandi', 'Kondapur', 'Kohir', 'Manoor', 'Munipally', 'Nagalgidda', 'Narayankhed', 'Nyalkal', 'Patancheru', 'Pulkal', 'Raide', 'Ramchandrapuram', 'Sadasivpet', 'Sangareddy', 'Sirgapoor', 'Vatpally', 'Zahirabad'],
    'Siddipet': ['Akkannapet', 'Bejjanki', 'Cherial', 'Chinnakodur', 'Doulthabad', 'Dubbak', 'Gajwel', 'Husnabad', 'Jagdevpur', 'Koheda', 'Komuravelli', 'Kondapak', 'Maddur', 'Markook', 'Mirdoddi', 'Nanganur', 'Narayanraopet', 'Raipole', 'Siddipet (Rural)', 'Siddipet (Urban)', 'Thoguta'],
    'Suryapet': ['Ananthagiri', 'Atmakur (S)', 'Chilkur', 'Chinthapalem', 'Garidepally', 'Huzurnagar', 'Jajireddygudem', 'Kodad', 'Maddirala', 'Mellachervu', 'Mothey', 'Munagala', 'Nadigudem', 'Nagaram', 'Neredcherla', 'Noothankal', 'Palakeedu', 'Penpahad', 'Suryapet', 'Thirumalagiri', 'Tungaturthi'],
    'Vikarabad': ['Bantwaram', 'Basheerabad', 'Bommraspet', 'Chowdapur', 'Dharur', 'Doma', 'Doulthabad', 'Kodikongal', 'Kulkacharla', 'Marpalle', 'Mominpet', 'Nawabpet', 'Pargi', 'Peddemul', 'Pudur', 'Tandur', 'Vikarabad', 'Yalal'],
    'Wanaparthy': ['Amarchinta', 'Atmakur', 'Chinnambavi', 'Ghanpur', 'Gopalpeta', 'Kothakota', 'Madanapur', 'Pangal', 'Pebbair', 'Peddamandadi', 'Revally', 'Srirangapur', 'Veepangandla', 'Wanaparthy'],
    'Warangal': ['Chennaraopet', 'Duggondi', 'Geesugonda', 'Khanapur', 'Khila Warangal', 'Narsampet', 'Nekkonda', 'Parvathagiri', 'Rayaparthy', 'Sangam', 'Warangal', 'Wardhannapet'],
    'Yadadri Bhuvanagiri': ['Addagudur', 'Alair', 'Atmakur (M)', 'Bhoodan Pochampally', 'Bhuvanagiri', 'Bommalaramaram', 'Choutuppal', 'Gundala', 'Mothkur', 'Motakondur', 'Narayanpur', 'Rajapet', 'Ramannapet', 'Turkapally', 'Valigonda', 'Yadagirigutta']
};

const DISTRICTS = Object.keys(MANDALS).sort();

/* ==========================================================================
   3. GLOBAL STATE MANAGEMENT
   ========================================================================== */
let state = {
    mode: 'citizen',
    screen: 'login',
    history: [],
    
    phone: '', name: '', age: '', gender: 'Male',
    district: '', mandal: '', service: null,
    selectedDate: null, selectedSlot: null,
    
    adminDate: new Date(),
    adminLocation: { district: '', mandal: '' },
    tempAdminDist: '',
    
    showWalkinModal: false,
    showOWDModal: false,
    showCalendarModal: false,
    
    // Synced with Cloud
    calendarConfig: {}, // { 'YYYY-MM-DD': { type: 'holiday|leave|working', reason: '...' } }
    walkinCount: 0,
    appointments: [] 
};

/* ==========================================================================
   4. SUPABASE SYNC ENGINE
   ========================================================================== */
async function loadData() {
    if(!supabaseClient) return render();
    try {
        const { data, error } = await supabaseClient.from('global_state').select('data').eq('id', 1).single();
        if (data && data.data) {
            state.appointments = data.data.appointments || [];
            state.walkinCount = data.data.walkinCount || 0;
            state.calendarConfig = data.data.calendarConfig || {};
            render();
        }
    } catch (e) { console.error("DB Load Error", e); render(); }
}

async function pushDataToCloud() {
    if(!supabaseClient) return;
    const payload = { appointments: state.appointments, walkinCount: state.walkinCount, calendarConfig: state.calendarConfig };
    try { await supabaseClient.from('global_state').update({ data: payload }).eq('id', 1); } 
    catch (e) { console.error("DB Save Error", e); }
}

function updateStateAndSave(action) {
    action(); render(); pushDataToCloud(); 
}

if(supabaseClient) {
    supabaseClient.channel('public:global_state')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'global_state' }, payload => {
          const newData = payload.new.data;
          state.appointments = newData.appointments || [];
          state.walkinCount = newData.walkinCount || 0;
          state.calendarConfig = newData.calendarConfig || {};
          render();
      }).subscribe();
}

/* ==========================================================================
   5. TIME & CALENDAR ENGINE
   ========================================================================== */
function navigate(newScreen) { state.history.push(state.screen); state.screen = newScreen; render(); }
function goBack() { if(state.history.length > 0) { state.screen = state.history.pop(); render(); } }
function switchMode(targetMode) { state.mode = targetMode; state.screen = targetMode === 'admin' ? 'admin-login' : 'login'; state.history = []; render(); }

// Timezone safe ISO generator for India
function toLocalISOString(date) {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset*60*1000));
    return localDate.toISOString().split('T')[0];
}

function cleanOldData() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 3);
    const cutoffISO = toLocalISOString(cutoffDate);
    
    let changed = false;
    const oldAppCount = state.appointments.length;
    state.appointments = state.appointments.filter(app => app.date >= cutoffISO);
    if(oldAppCount !== state.appointments.length) changed = true;
    
    for (const key in state.calendarConfig) {
        if (key < cutoffISO) { delete state.calendarConfig[key]; changed = true; }
    }
    
    if(changed) pushDataToCloud();
}

function timeToMins(tStr) {
    if(!tStr || tStr === 'All Day' || tStr === 'Walk-in' || tStr.includes('Saturday')) return -1;
    const timePart = tStr.split(' - ')[0]; 
    const parts = timePart.split(' ');
    if(parts.length !== 2) return -1;
    let [h, m] = parts[0].split(':').map(Number);
    if(parts[1] === 'PM' && h !== 12) h += 12;
    if(parts[1] === 'AM' && h === 12) h = 0;
    return h * 60 + m;
}

function generateTimeOptions() {
    const times = []; let h = 9, m = 0;
    while(h < 17 || (h === 17 && m === 0)) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        times.push(`${h > 12 ? h - 12 : h}:${mm} ${h >= 12 ? 'PM' : 'AM'}`);
        m += 30; if(m >= 60) { h++; m = 0; }
    }
    return times;
}

// NEW: Advanced Calendar Generator parsing Holidays and Weekends
function getCalendarDates() {
    const dates = []; let d = new Date();
    for(let i = 0; i < 14; i++) { 
        d.setDate(d.getDate() + 1);
        const iso = toLocalISOString(d);
        const dow = d.getDay();
        
        let isBlocked = false;
        let reason = '';
        let chipClass = '';

        const config = state.calendarConfig[iso];
        
        if(config) {
            if(config.type === 'holiday' || config.type === 'leave') {
                isBlocked = true; reason = config.reason || config.type; chipClass = 'holiday';
            } else if (config.type === 'working') {
                isBlocked = false; // Forces it open
            }
        } else {
            // Default Calendar Rules
            if(dow === 0) { isBlocked = true; reason = 'Sunday'; chipClass = 'holiday'; } 
            else if(dow === 6) { isBlocked = true; reason = 'Pending Only'; chipClass = 'saturday'; }
        }

        dates.push({ date: new Date(d), iso, blocked: isBlocked, reason, chipClass });
    }
    return dates;
}

function getAvailableSlots(durationMins, dateStr, dist, mand) {
    const config = state.calendarConfig[dateStr];
    if(config && (config.type === 'holiday' || config.type === 'leave')) return [];

    const slots = []; let h = 9, m = 0;
    const appsOnDate = state.appointments.filter(a => a.date === dateStr && a.district === dist && a.mandal === mand && a.status !== 'cancelled');

    while(h < 17) {
        if(h === 12 && m >= 30) { h = 14; m = 0; } 
        if(h >= 17) break;

        const slotStartMins = h * 60 + m;
        const slotEndMins = slotStartMins + durationMins;
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        const label = `${h > 12 ? h - 12 : h}:${mm} ${h >= 12 ? 'PM' : 'AM'}`;
        
        let isBusy = false;
        for(let app of appsOnDate) {
            if(app.time === 'Walk-in') continue;
            const appStart = timeToMins(app.time);
            if(appStart === -1) continue;
            const appEnd = appStart + app.duration;
            if(slotStartMins < appEnd && appStart < slotEndMins) { isBusy = true; break; }
        }
        
        if(slotEndMins <= 17 * 60) slots.push({ label, busy: isBusy });
        m += durationMins; 
        if(m >= 60) { h += Math.floor(m / 60); m -= 60; }
    }
    return slots;
}

function findNearestFreeSlot(durationMins, startDateISO, dist, mand, minStartMins) {
    let checkDate = new Date(startDateISO);
    for(let i = 0; i < 14; i++) { 
        const iso = toLocalISOString(checkDate);
        const dow = checkDate.getDay();
        const config = state.calendarConfig[iso];
        
        // Skip explicitly declared holidays
        if(!(config && (config.type === 'holiday' || config.type === 'leave')) && dow !== 0) {
            const slots = getAvailableSlots(durationMins, iso, dist, mand);
            const freeSlot = slots.find(s => {
                if (s.busy) return false;
                if (i === 0) return timeToMins(s.label) >= minStartMins;
                return true; 
            });
            if(freeSlot) return { date: iso, time: freeSlot.label };
        }
        checkDate.setDate(checkDate.getDate() + 1);
    }
    return null;
}

function changeAdminDate(days) { state.adminDate.setDate(state.adminDate.getDate() + days); render(); }
function getAdminDateString() {
    const isToday = state.adminDate.toDateString() === new Date().toDateString();
    const dStr = state.adminDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    return isToday ? `Today, ${dStr}` : dStr;
}

function getNextValidSaturday(fromDateStr) {
    let d = new Date(fromDateStr);
    while(true) {
        let daysToSat = 6 - d.getDay();
        if(daysToSat <= 0) daysToSat += 7; 
        d.setDate(d.getDate() + daysToSat);
        const iso = toLocalISOString(d);
        const config = state.calendarConfig[iso];
        
        // Ensure the Saturday we pick isn't actually a declared holiday
        if(!(config && (config.type === 'holiday' || config.type === 'leave'))) {
            return iso; 
        }
    }
}

/* ==========================================================================
   6. EVENT HANDLERS
   ========================================================================== */
function handleLoginNext() {
    state.phone = document.getElementById('inp-phone').value;
    if(!state.phone) return alert('Enter mobile number');
    navigate('citizen-dash');
}

function initiateNewBooking() {
    state.service = null; state.selectedDate = null; state.selectedSlot = null;
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

function handleDistrictChange() { state.district = document.getElementById('inp-dist').value; render(); }
function selectService(id) { state.service = SERVICES.find(s => s.id === id); render(); }
function handleServiceNext() { if(state.service) navigate('schedule'); else alert('Please select a service first.'); }
function selectDate(iso) { state.selectedDate = { iso: iso }; state.selectedSlot = null; render(); }
function selectSlot(label) { state.selectedSlot = { label: label }; render(); }

function handleScheduleNext() {
    if(!state.selectedSlot) return alert('Please select a time slot.');
    updateStateAndSave(() => {
        const isSenior = parseInt(state.age) >= 60;
        const newToken = 'C' + Math.floor(Math.random() * 900 + 100);
        state.appointments.push({
            id: newToken, type: 'citizen', token: newToken, phone: state.phone,
            name: state.name, age: state.age, gender: state.gender,
            district: state.district, mandal: state.mandal,
            service: state.service.name, duration: state.service.duration, 
            date: state.selectedDate.iso, time: state.selectedSlot.label,
            status: 'pending', senior: isSenior, isPostponed: false, postponeReason: '', postponeCount: 0
        });
    });
    navigate('citizen-dash');
}

function userCancelApp(id, dateStr, timeStr) {
    const now = new Date();
    const todayStr = toLocalISOString(now);
    let canCancel = false;

    if (dateStr > todayStr) { canCancel = true; } 
    else if (dateStr === todayStr) {
        const appMins = timeToMins(timeStr);
        if(appMins !== -1) {
            const appTime = new Date();
            appTime.setHours(Math.floor(appMins / 60), appMins % 60, 0, 0);
            if ((appTime - now) / 60000 >= 60) canCancel = true;
        }
    }

    if(canCancel) {
        if(confirm("Cancel this appointment? This cannot be undone.")) {
            updateStateAndSave(() => {
                const app = state.appointments.find(a => a.id === id);
                if(app) app.status = 'cancelled';
            });
            alert("Appointment cancelled successfully.");
        }
    } else { alert("⚠️ Appointments can only be cancelled at least 1 hour prior to the scheduled time."); }
}

function handleAdminLogin() {
    const d = document.getElementById('admin-dist').value;
    const m = document.getElementById('admin-mand').value;
    if(!d || !m) return alert('Select District and Mandal');
    state.adminLocation = { district: d, mandal: m };
    navigate('admin-dash');
}

function handleAdminDistChange() { state.tempAdminDist = document.getElementById('admin-dist').value; render(); }

function handleOWDClick() { state.showOWDModal = true; render(); }

function submitOWD() {
    const startLabel = document.getElementById('owd-start').value;
    const endLabel = document.getElementById('owd-end').value;
    const reason = document.getElementById('owd-reason').value || 'Field Duty';
    
    const startMins = timeToMins(startLabel);
    const endMins = timeToMins(endLabel);

    if(startMins >= endMins) return alert("End time must be after Start time.");

    let rescheduleCount = 0;

    updateStateAndSave(() => {
        const viewDateISO = toLocalISOString(state.adminDate);
        const loc = state.adminLocation;

        const affectedApps = state.appointments.filter(a => {
            if(a.date !== viewDateISO || a.district !== loc.district || a.mandal !== loc.mandal || a.status !== 'pending' || a.type === 'owd') return false;
            const appStart = timeToMins(a.time);
            if(appStart === -1) return false;
            const appEnd = appStart + a.duration;
            return (appStart < endMins && startMins < appEnd);
        });

        state.appointments.push({
            id: 'OWD' + Date.now(), type: 'owd', token: 'OWD', name: 'Official Duty', age: 0, gender: '—',
            district: loc.district, mandal: loc.mandal, service: reason, duration: (endMins - startMins),
            date: viewDateISO, time: `${startLabel} - ${endLabel}`, status: 'pending', senior: false, walkin: false, 
            isPostponed: false, postponeCount: 0
        });

        affectedApps.sort((a, b) => timeToMins(a.time) - timeToMins(b.time)); 
        for(let app of affectedApps) {
            const originalStartMins = timeToMins(app.time);
            const minAllowedTime = Math.max(originalStartMins, endMins);
            const newSlot = findNearestFreeSlot(app.duration, viewDateISO, loc.district, loc.mandal, minAllowedTime);
            
            if(newSlot) {
                app.date = newSlot.date; app.time = newSlot.time; app.isPostponed = true;
                app.postponeReason = 'Officer on Field Duty'; rescheduleCount++;
            }
        }
        state.showOWDModal = false; 
    });
    alert(`Field Duty Scheduled.\n\n${rescheduleCount} appointments postponed to slots strictly after the officer returns.`);
}

function submitCalendarConfig() {
    const date = document.getElementById('cal-date').value;
    const type = document.getElementById('cal-status').value;
    const reason = document.getElementById('cal-reason').value;
    
    if(!date) return alert("Select a date");
    
    updateStateAndSave(() => {
        if(type === 'clear') {
            delete state.calendarConfig[date];
        } else {
            state.calendarConfig[date] = { type, reason };
        }
        state.showCalendarModal = false;
    });
    alert("Calendar updated successfully.");
}

function toggleWalkinModal(show) { state.showWalkinModal = show; render(); }
function toggleOWDModal(show) { state.showOWDModal = show; render(); }
function toggleCalendarModal(show) { state.showCalendarModal = show; render(); }

function markDone(id) { updateStateAndSave(() => { const app = state.appointments.find(x => x.id === id); if(app) app.status = 'done'; }); }

function postponeApp(id) {
    updateStateAndSave(() => {
        const app = state.appointments.find(x => x.id === id);
        if(app && (app.postponeCount || 0) < 2) {
            const nextSat = getNextValidSaturday(app.date);
            app.date = nextSat; app.isPostponed = true; 
            app.postponeReason = 'Admin Reschedule'; app.postponeCount = (app.postponeCount || 0) + 1;
            app.time = 'Saturday Overflow Slot';
            alert(`SMS Sent: Appointment shifted to Saturday, ${nextSat}.`); 
        }
    });
}

function adminCancelApp(id) {
    const otp = prompt("SECURITY CHECK:\nEnter 4-digit OTP provided by citizen:");
    if (otp && otp.trim().length === 4 && !isNaN(otp)) {
        updateStateAndSave(() => { const app = state.appointments.find(x => x.id === id); if(app) app.status = 'cancelled'; });
        alert('Appointment Cancelled.'); 
    } else if (otp) { alert('⚠️ Invalid OTP. Cancellation aborted.'); }
}

function submitWalkin() {
    updateStateAndSave(() => {
        const n = document.getElementById('wi-name').value || 'Unknown Citizen';
        const a = parseInt(document.getElementById('wi-age').value) || 0;
        const s = document.getElementById('wi-svc').value;
        
        state.walkinCount++;
        const token = 'W' + String(state.walkinCount).padStart(3, '0');
        
        state.appointments.push({
            id: token, type: 'walkin', token: token, name: n, age: a, gender: '—',
            district: state.adminLocation.district, mandal: state.adminLocation.mandal,
            service: s, duration: 15, date: toLocalISOString(state.adminDate),
            time: 'Walk-in', status: 'pending', senior: a >= 60, walkin: true, 
            isPostponed: false, postponeCount: 0
        });
        state.showWalkinModal = false; 
    });
}

/* ==========================================================================
   7. RENDER ENGINE & VIEWS
   ========================================================================== */
function render() {
    cleanOldData(); 

    const wrap = document.getElementById('screen-wrap');
    const topbar = document.getElementById('main-topbar');
    const backBtn = document.getElementById('back-btn');
    const modeSwitch = document.getElementById('mode-switch');
    
    if(!wrap) return;

    backBtn.classList.toggle('hidden', state.history.length === 0);
    topbar.className = `topbar ${state.mode === 'admin' ? 'admin-mode' : ''}`;
    document.getElementById('top-sub').innerText = state.mode === 'admin' ? 'Official Dashboard' : 'Citizen Portal';

    if(state.mode === 'citizen') {
        modeSwitch.innerHTML = `Are you a government official? <a onclick="switchMode('admin')" style="color:var(--navy);font-weight:700;cursor:pointer;">Admin Login</a>`;
    } else if(state.screen === 'admin-login') {
        modeSwitch.innerHTML = `<a onclick="switchMode('citizen')" style="color:var(--text-secondary);cursor:pointer;">← Back to Citizen Portal</a>`;
    } else { 
        modeSwitch.innerHTML = `<a onclick="switchMode('citizen')" style="color:var(--red);font-weight:bold;cursor:pointer;">Log Out Securely</a>`; 
    }

    const routes = {
        'login': viewLogin, 'citizen-dash': viewCitizenDash,
        'demographics': viewDemographics, 'location': viewLocation,
        'services': viewServices, 'schedule': viewSchedule,
        'admin-login': viewAdminLogin, 'admin-dash': viewAdminDash
    };

    wrap.innerHTML = `<div class="animate-in">${(routes[state.screen] || viewLogin)()}</div>`;
}

function viewLogin() {
    return `
        <div style="text-align:center; padding: 20px 0;">
            <div style="font-size: 48px; margin-bottom: 10px;">🇮🇳</div>
            <h2 class="page-title">Welcome to Suvidha</h2>
            <p class="page-sub">Book MRO appointments instantly.</p>
        </div>
        <div class="form-group"><label class="label">Mobile Number</label><div style="display:flex; gap:8px;"><div style="padding: 14px; background: var(--bg-secondary); border-radius: var(--radius-sm); border: 1.5px solid var(--border-med);">+91</div><input class="input" type="tel" id="inp-phone" placeholder="9999999999" maxlength="10" value="${state.phone}" style="flex:1"></div></div>
        <button class="btn btn-primary" onclick="handleLoginNext()">Login with OTP →</button>
    `;
}

function viewCitizenDash() {
    const myApps = state.appointments.filter(a => a.phone === state.phone && a.type === 'citizen');
    let listHTML = '';
    
    if(myApps.length === 0) {
        listHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);"><div style="font-size:32px; margin-bottom:8px">📋</div><p>You have no bookings yet.</p></div>`;
    } else {
        listHTML = myApps.reverse().map(a => `
            <div class="card" style="${a.isPostponed ? 'border-left: 4px solid var(--red);' : ''}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;"><div class="token-badge">${a.token}</div><span class="badge ${a.status==='done'?'badge-green':a.status==='cancelled'?'badge-gray':'badge-gold'}">${a.status.toUpperCase()}</span></div>
                <h3 style="font-size:16px; margin-bottom:4px;">${a.service}</h3>
                <p style="font-size:13px; color:var(--text-secondary); margin-bottom:8px;">📍 ${a.mandal} MRO, ${a.district}</p>
                <div style="background:var(--bg-secondary); padding:10px; border-radius:6px; font-size:13px; font-weight:600;">🗓️ ${a.date} | ⏰ ${a.time}</div>
                ${a.isPostponed ? `<div style="margin-top:10px; color:var(--red); font-size:12px; font-weight:700; background:var(--red-light); padding:8px; border-radius:6px;">⚠️ Rescheduled: ${a.postponeReason}</div>` : ''}
                ${a.status === 'pending' ? `<button class="btn btn-outline-danger btn-sm" style="width:100%; margin-top:12px;" onclick="userCancelApp('${a.id}', '${a.date}', '${a.time}')">Cancel Appointment</button>` : ''}
            </div>`).join('');
    }
    return `<h2 class="page-title">My Dashboard</h2><p class="page-sub">+91 ${state.phone}</p><button class="btn btn-primary" style="margin-bottom:24px;" onclick="initiateNewBooking()">+ Book New Appointment</button><div class="section-hdr">Recent Bookings</div>${listHTML}`;
}

function viewDemographics() {
    return `
        <h2 class="page-title">Citizen Details</h2><p class="page-sub">Who is attending the appointment?</p>
        <div class="form-group"><label class="label">Full Name</label><input class="input" id="inp-name" value="${state.name}" placeholder="Enter name"></div>
        <div class="form-group"><label class="label">Age</label><input class="input" type="number" id="inp-age" value="${state.age}" placeholder="e.g. 65"></div>
        <div class="form-group"><label class="label">Gender</label><select class="select" id="inp-gender"><option ${state.gender==='Male'?'selected':''}>Male</option><option ${state.gender==='Female'?'selected':''}>Female</option></select></div>
        <button class="btn btn-primary" onclick="handleDemographicsNext()">Next Step →</button>
    `;
}

function viewLocation() {
    return `
        <h2 class="page-title">Select Office</h2><p class="page-sub">Choose your local revenue office.</p>
        <div class="form-group"><label class="label">District</label><select class="select" id="inp-dist" onchange="handleDistrictChange()"><option value="">--Select--</option>${DISTRICTS.map(d => `<option ${state.district===d?'selected':''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label class="label">Mandal</label><select class="select" id="inp-mand"><option value="">--Select--</option>${(MANDALS[state.district] || []).map(m => `<option ${state.mandal===m?'selected':''}>${m}</option>`).join('')}</select></div>
        <button class="btn btn-primary" onclick="handleLocationNext()">Select Services →</button>
    `;
}

function viewServices() {
    return `
        <h2 class="page-title">Services</h2><p class="page-sub">What do you need help with?</p>
        <div class="service-grid">${SERVICES.map(s => `<div class="service-card ${state.service?.id === s.id ? 'selected' : ''}" onclick="selectService('${s.id}')"><span>${s.icon}</span><h3>${s.name}</h3><p>${s.duration} mins</p></div>`).join('')}</div>
        <button class="btn btn-primary" style="margin-top:20px" onclick="handleServiceNext()">Proceed →</button>
    `;
}

function viewSchedule() {
    const dates = getCalendarDates();
    const slots = state.selectedDate ? getAvailableSlots(state.service.duration, state.selectedDate.iso, state.district, state.mandal) : [];
    
    return `
        <h2 class="page-title">Pick Date & Time</h2><p class="page-sub">${state.service.name} (${state.service.duration} mins)</p>
        <div class="section-hdr">1. Select Date</div>
        <div class="date-scroll">
            ${dates.map(d => `
                <div class="date-chip ${d.blocked?'blocked':''} ${d.chipClass} ${state.selectedDate?.iso===d.iso?'selected':''}" onclick="${d.blocked?'':`selectDate('${d.iso}')`}">
                    <div class="dc-day">${d.date.toLocaleDateString('en-US',{weekday:'short'})}</div>
                    <div class="dc-num">${d.date.getDate()}</div>
                    ${d.reason ? `<div class="dc-reason">${d.reason}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ${state.selectedDate ? `
            <div class="section-hdr">2. Select Time Slot</div>
            <div class="slot-grid">${slots.map(s => `<div class="slot ${s.busy?'busy':''} ${state.selectedSlot?.label===s.label?'selected':''}" onclick="${s.busy?'':`selectSlot('${s.label}')`}">${s.label}</div>`).join('')}</div>
            ${slots.length === 0 ? '<p style="font-size:13px; color:var(--red); text-align:center; margin-top:20px; background:var(--red-light); padding:10px; border-radius:6px;">No available slots for this date.</p>' : ''}
        ` : ''}
        <button class="btn btn-primary" style="margin-top:24px" onclick="handleScheduleNext()">Confirm Booking ✅</button>
    `;
}

function viewAdminLogin() {
    const dist = state.tempAdminDist || DISTRICTS[0];
    const mandals = MANDALS[dist] || [];

    return `
        <h2 class="page-title" style="margin-top:20px">Admin Login</h2><p class="page-sub">MRO & Staff Access Only</p>
        <div class="form-group"><label class="label">District</label><select class="select" id="admin-dist" onchange="handleAdminDistChange()">${DISTRICTS.map(d => `<option ${dist===d?'selected':''}>${d}</option>`).join('')}</select></div>
        <div class="form-group"><label class="label">Mandal (Office Location)</label><select class="select" id="admin-mand">${mandals.map(m => `<option>${m}</option>`).join('')}</select></div>
        <div class="form-group"><label class="label">Passcode</label><input class="input" type="password" placeholder="••••"></div>
        <button class="btn btn-green" onclick="handleAdminLogin()">Access Dashboard →</button>
    `;
}

function viewAdminDash() {
    const viewDateISO = toLocalISOString(state.adminDate);
    const loc = state.adminLocation;
    const dailyApps = state.appointments.filter(a => a.date === viewDateISO && a.district === loc.district && a.mandal === loc.mandal && a.status !== 'cancelled');

    const sorted = [...dailyApps].sort((a, b) => {
        if (a.type === 'owd' && b.type !== 'owd') return -1;
        if (b.type === 'owd' && a.type !== 'owd') return 1;
        return (b.senior === true) - (a.senior === true);
    });

    const pendingCount = sorted.filter(a => a.status === 'pending').length;
    const timeOptions = generateTimeOptions();

    return `
        ${state.showWalkinModal ? `
            <div class="alert-overlay">
                <div class="alert-box" style="border-top: 6px solid var(--saffron);">
                    <h2 style="color:var(--text-primary); margin-bottom:16px; text-align:left;">Add Walk-in</h2>
                    <div class="form-group"><label class="label">Full Name</label><input class="input" id="wi-name" placeholder="Enter Name"></div>
                    <div class="form-group"><label class="label">Age</label><input class="input" type="number" id="wi-age" placeholder="e.g. 45"></div>
                    <div class="form-group"><label class="label">Service</label><select class="select" id="wi-svc">${SERVICES.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}<option value="General Enquiry">General Enquiry</option></select></div>
                    <div style="display:flex; gap:8px; margin-top:20px;"><button class="btn btn-outline" style="flex:1" onclick="toggleWalkinModal(false)">Cancel</button><button class="btn btn-saffron" style="flex:1" onclick="submitWalkin()">Add</button></div>
                </div>
            </div>
        ` : ''}

        ${state.showOWDModal ? `
            <div class="alert-overlay">
                <div class="alert-box" style="border-top: 6px solid var(--purple);">
                    <h2 style="color:var(--text-primary); margin-bottom:8px; text-align:left;">Schedule Field Duty</h2>
                    <div style="display:flex; gap:10px;">
                        <div class="form-group" style="flex:1;"><label class="label">From Time</label><select class="select" id="owd-start">${timeOptions.map(t => `<option value="${t}">${t}</option>`).join('')}</select></div>
                        <div class="form-group" style="flex:1;"><label class="label">To Time</label><select class="select" id="owd-end">${timeOptions.map(t => `<option value="${t}">${t}</option>`).join('')}</select></div>
                    </div>
                    <div class="form-group"><label class="label">Duty Reason</label><input class="input" id="owd-reason" placeholder="e.g. Village Inspection"></div>
                    <div style="display:flex; gap:8px; margin-top:20px;"><button class="btn btn-outline" style="flex:1" onclick="toggleOWDModal(false)">Cancel</button><button class="btn btn-purple" style="flex:1" onclick="submitOWD()">Block</button></div>
                </div>
            </div>
        ` : ''}

        ${state.showCalendarModal ? `
            <div class="alert-overlay">
                <div class="alert-box" style="border-top: 6px solid var(--navy);">
                    <h2 style="color:var(--text-primary); margin-bottom:16px; text-align:left;">Manage Calendar</h2>
                    <div class="form-group"><label class="label">Select Date</label><input type="date" id="cal-date" class="input" min="${toLocalISOString(new Date())}"></div>
                    <div class="form-group">
                        <label class="label">Day Status</label>
                        <select id="cal-status" class="select">
                            <option value="holiday">General Holiday</option>
                            <option value="leave">Officer Leave</option>
                            <option value="working">Force Working Day</option>
                            <option value="clear">Clear Custom Rules</option>
                        </select>
                    </div>
                    <div class="form-group"><label class="label">Reason Label (e.g. Diwali)</label><input type="text" id="cal-reason" class="input" placeholder="Optional"></div>
                    <div style="display:flex; gap:8px; margin-top:20px;"><button class="btn btn-outline" style="flex:1" onclick="toggleCalendarModal(false)">Cancel</button><button class="btn btn-primary" style="flex:1" onclick="submitCalendarConfig()">Save Date</button></div>
                </div>
            </div>
        ` : ''}

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <div style="display:flex; align-items:center; gap:12px">
                <button class="btn btn-outline btn-sm" onclick="changeAdminDate(-1)">◀</button>
                <div style="text-align:center; min-width: 120px;"><h3 style="font-size:15px; font-weight:700;">${getAdminDateString()}</h3><p style="font-size:11px; color:var(--text-secondary)">${loc.mandal} MRO, ${loc.district}</p></div>
                <button class="btn btn-outline btn-sm" onclick="changeAdminDate(1)">▶</button>
            </div>
        </div>

        <div class="stat-grid">
            <div class="stat-card"><div class="stat-num">${sorted.length}</div><div class="stat-lbl">Tasks Displayed</div></div>
            <div class="stat-card"><div class="stat-num" style="color:${pendingCount>0?'var(--saffron)':'var(--green)'}">${pendingCount}</div><div class="stat-lbl">Pending</div></div>
        </div>

        <div style="display:flex; gap:8px; margin-bottom: 20px;">
            <button class="btn btn-sm btn-outline" style="flex:1; border-color:var(--saffron); color:var(--saffron-dark)" onclick="toggleWalkinModal(true)">+ Walk-in</button>
            <button class="btn btn-sm btn-outline" style="flex:1; border-color:var(--purple); color:var(--purple)" onclick="handleOWDClick()">🚗 Interval OWD</button>
            <button class="btn btn-sm btn-outline" style="flex:1; border-color:var(--navy); color:var(--navy)" onclick="toggleCalendarModal(true)">📅 Calendar</button>
        </div>

        <div class="section-hdr">Schedule Queue</div>

        ${sorted.length === 0 ? `<div style="text-align:center; padding: 40px 20px; color:var(--text-secondary)"><div style="font-size:32px; margin-bottom:8px">☕</div><p>No appointments or duties scheduled.</p></div>` : sorted.map(a => {
            if(a.type === 'owd') {
                return `<div class="queue-item owd-block"><div class="queue-header"><div class="token-badge owd">OWD</div><div style="flex:1"><div style="font-weight:700; font-size:15px; color:var(--purple)">${a.service}</div><div style="font-size:12px; color:var(--text-secondary)">${a.time}</div></div>${a.status==='done' ? '<span class="badge badge-green">Completed</span>' : ''}</div>${a.status === 'pending' ? `<div class="queue-actions"><button class="btn btn-sm btn-purple" style="flex:1" onclick="markDone('${a.id}')">✓ Mark Returned</button></div>` : ''}</div>`;
            }
            return `
                <div class="queue-item ${a.senior ? 'senior' : ''} ${a.status === 'done' ? 'done' : ''}">
                    <div class="queue-header">
                        <div class="token-badge" style="background:${a.walkin ? 'var(--saffron)' : 'var(--navy)'}">${a.token}</div>
                        <div style="flex:1"><div style="font-weight:700; font-size:15px">${a.name}</div><div style="font-size:12px; color:var(--text-secondary)">${a.age}y • ${a.time}</div></div>
                        ${a.isPostponed ? '<span class="badge badge-gray">↪ Postponed</span>' : ''}
                        ${a.senior ? '<span class="badge badge-gold">Senior Priority</span>' : ''}
                        ${a.status === 'done' ? '<span class="badge badge-green">Completed</span>' : ''}
                    </div>
                    <div style="font-size:13px; margin-bottom:8px;">${a.service}</div>
                    ${a.status === 'pending' ? `
                        <div class="queue-actions">
                            <button class="btn btn-green btn-sm" style="flex:1" onclick="markDone('${a.id}')">✓ Done</button>
                            ${(a.postponeCount || 0) < 2 ? `<button class="btn btn-outline btn-sm" style="flex:1" onclick="postponeApp('${a.id}')">↪ Postpone (${2 - (a.postponeCount || 0)} left)</button>` : `<button class="btn btn-outline btn-sm" style="flex:1; opacity:0.5; cursor:not-allowed;" disabled>Limit Reached</button>`}
                            <button class="btn btn-danger btn-sm" style="flex:1; padding: 8px 4px;" onclick="adminCancelApp('${a.id}')">🗑️ Cancel</button>
                        </div>
                    ` : ''}
                </div>`;
        }).join('')}
    `;
}

// Initial Boot Call (Downloads data from Cloud first)
document.addEventListener('DOMContentLoaded', loadData);
