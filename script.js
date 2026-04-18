// ============================================
//   Online Quran Academy — script.js
// ============================================

// ─────────────────────────────────────────────
// 1. NEWSLETTER SUBSCRIPTION
// ─────────────────────────────────────────────
const subBtn = document.querySelector('.sub-btn');
const emailInput = document.querySelector('.input-box input[type="email"]');

if (subBtn && emailInput) {
    subBtn.addEventListener('click', function () {
        const email = emailInput.value.trim();
        if (email === '') { showToast('⚠️ Please enter your email address.', 'warning'); return; }
        if (!isValidEmail(email)) { showToast('❌ Please enter a valid email address.', 'error'); return; }

        let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (subscribers.includes(email)) { showToast('ℹ️ You are already subscribed!', 'info'); return; }

        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        emailInput.value = '';
        showToast('✅ Thank you for subscribing! JazakAllah Khair 🌙', 'success');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ─────────────────────────────────────────────
// 2. STYLES INJECT
// ─────────────────────────────────────────────
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  .modal-overlay {
    display: none; position: fixed; inset: 0;
    background: rgba(0,0,0,0.6); z-index: 9999;
    justify-content: center; align-items: center;
  }
  .modal-overlay.active { display: flex; }
  .modal-box {
    background: #fff; border-radius: 16px; padding: 40px 35px;
    width: 100%; max-width: 420px; position: relative;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;
    max-height: 90vh; overflow-y: auto;
  }
  @keyframes slideUp {
    from { transform: translateY(40px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .modal-close {
    position: absolute; top: 14px; right: 18px;
    background: none; border: none; font-size: 26px; cursor: pointer; color: #555;
  }
  .modal-box h2 { margin-bottom: 5px; color: #1a1a2e; font-size: 22px; }
  .modal-sub { color: #888; font-size: 14px; margin-bottom: 22px; }
  .modal-input-group { margin-bottom: 16px; }
  .modal-input-group label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
  .modal-input-group input,
  .modal-input-group select {
    width: 100%; padding: 11px 14px; border: 1.5px solid #ddd;
    border-radius: 8px; font-size: 14px; outline: none;
    box-sizing: border-box; transition: border 0.2s;
  }
  .modal-input-group input:focus,
  .modal-input-group select:focus { border-color: #4CAF50; }
  .modal-options { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-bottom: 20px; }
  .forgot-link { color: #4CAF50; text-decoration: none; }
  .modal-login-btn {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg, #4CAF50, #2e7d32);
    color: #fff; border: none; border-radius: 8px;
    font-size: 16px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
  }
  .modal-login-btn:hover { opacity: 0.9; }
  .modal-register { text-align: center; margin-top: 16px; font-size: 13px; color: #666; }
  .modal-register a { color: #4CAF50; text-decoration: none; font-weight: 600; }
  #toast-container {
    position: fixed; bottom: 30px; right: 30px;
    z-index: 99999; display: flex; flex-direction: column; gap: 10px;
  }
  .toast {
    padding: 14px 22px; border-radius: 10px; font-size: 14px;
    font-weight: 500; color: #fff; box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    animation: fadeInToast 0.3s ease, fadeOutToast 0.4s ease 3s forwards;
    max-width: 320px;
  }
  .toast.success { background: #2e7d32; }
  .toast.error   { background: #c62828; }
  .toast.warning { background: #e65100; }
  .toast.info    { background: #1565c0; }
  @keyframes fadeInToast  { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
  @keyframes fadeOutToast { from { opacity:1; } to { opacity:0; } }
  .course-modal-img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; margin-bottom: 14px; }
  .course-modal-title { direction: rtl; font-family: 'Noto Nastaliq Urdu', serif; font-size: 22px; color: #1a1a2e; margin-bottom: 16px; text-align: center; }
  .course-enroll-btn {
    margin-top: 18px; width: 100%; padding: 12px;
    background: linear-gradient(135deg, #4CAF50, #2e7d32);
    color: #fff; border: none; border-radius: 8px;
    font-size: 15px; font-weight: 600; cursor: pointer;
  }
  .course-enroll-btn:hover { opacity: 0.9; }
  .wa-submit-btn {
    width: 100%; padding: 13px; margin-top: 10px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: #fff; border: none; border-radius: 8px;
    font-size: 16px; font-weight: 600; cursor: pointer; transition: opacity 0.2s;
  }
  .wa-submit-btn:hover { opacity: 0.9; }
`;
document.head.appendChild(modalStyle);


// ─────────────────────────────────────────────
// 3. LOGIN MODAL
// ─────────────────────────────────────────────
const loginModalEl = document.createElement('div');
loginModalEl.innerHTML = `
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal-box">
      <button class="modal-close" id="closeModal">&times;</button>
      <h2>🎓 Login to Your Account</h2>
      <p class="modal-sub">Welcome back! Please enter your details.</p>
      <div class="modal-input-group">
        <label>Email Address</label>
        <input type="email" id="loginEmail" placeholder="Enter your email">
      </div>
      <div class="modal-input-group">
        <label>Password</label>
        <input type="password" id="loginPassword" placeholder="Enter your password">
      </div>
      <div class="modal-options">
        <label><input type="checkbox" id="rememberMe"> Remember me</label>
        <a href="#" class="forgot-link">Forgot Password?</a>
      </div>
      <button class="modal-login-btn" id="doLogin">Login</button>
      <p class="modal-register">Don't have an account? <a href="#" id="goRegister">Register Now</a></p>
    </div>
  </div>
`;
document.body.appendChild(loginModalEl);

const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('modalOverlay').classList.add('active');
    });
}

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modalOverlay').classList.remove('active');
});
document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
});
document.getElementById('doLogin').addEventListener('click', function () {
    const email    = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!email || !password) { showToast('⚠️ Please fill in all fields.', 'warning'); return; }
    if (!isValidEmail(email)) { showToast('❌ Enter a valid email.', 'error'); return; }
    if (password.length < 6) { showToast('❌ Password must be at least 6 characters.', 'error'); return; }

    const users = JSON.parse(localStorage.getItem('uqa_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
        localStorage.setItem('uqa_loggedIn', JSON.stringify(found));
        document.getElementById('modalOverlay').classList.remove('active');
        showToast(`✅ Welcome back, ${found.name || 'Student'}! 🌙`, 'success');
        updateNavForLoggedIn(found.name || email);
    } else {
        showToast('❌ Invalid email or password.', 'error');
    }
});
document.getElementById('goRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('regOverlay').classList.add('active');
});


// ─────────────────────────────────────────────
// 4. REGISTER MODAL
// ─────────────────────────────────────────────
const registerModalEl = document.createElement('div');
registerModalEl.innerHTML = `
  <div class="modal-overlay" id="regOverlay">
    <div class="modal-box">
      <button class="modal-close" id="closeReg">&times;</button>
      <h2>📝 Create Account</h2>
      <p class="modal-sub">Join 1 million learners worldwide!</p>
      <div class="modal-input-group">
        <label>Full Name</label>
        <input type="text" id="regName" placeholder="Enter your full name">
      </div>
      <div class="modal-input-group">
        <label>Email Address</label>
        <input type="email" id="regEmail" placeholder="Enter your email">
      </div>
      <div class="modal-input-group">
        <label>Password</label>
        <input type="password" id="regPassword" placeholder="Create a password">
      </div>
      <button class="modal-login-btn" id="doRegister">Create Account</button>
      <p class="modal-register">Already have an account? <a href="#" id="goLogin">Login</a></p>
    </div>
  </div>
`;
document.body.appendChild(registerModalEl);

document.getElementById('closeReg').addEventListener('click', function () {
    document.getElementById('regOverlay').classList.remove('active');
});
document.getElementById('regOverlay').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
});
document.getElementById('goLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('regOverlay').classList.remove('active');
    document.getElementById('modalOverlay').classList.add('active');
});
document.getElementById('doRegister').addEventListener('click', function () {
    const name     = document.getElementById('regName').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    if (!name || !email || !password) { showToast('⚠️ Please fill in all fields.', 'warning'); return; }
    if (!isValidEmail(email)) { showToast('❌ Enter a valid email.', 'error'); return; }
    if (password.length < 6) { showToast('❌ Password must be at least 6 characters.', 'error'); return; }

    let users = JSON.parse(localStorage.getItem('uqa_users') || '[]');
    if (users.find(u => u.email === email)) { showToast('ℹ️ This email is already registered.', 'info'); return; }

    users.push({ name, email, password });
    localStorage.setItem('uqa_users', JSON.stringify(users));
    localStorage.setItem('uqa_loggedIn', JSON.stringify({ name, email }));
    document.getElementById('regOverlay').classList.remove('active');
    showToast(`🎉 Account created! Welcome, ${name}! 🌙`, 'success');
    updateNavForLoggedIn(name);
});


// ─────────────────────────────────────────────
// 5. UPDATE NAV AFTER LOGIN
// ─────────────────────────────────────────────
function updateNavForLoggedIn(name) {
    const btn = document.querySelector('.login-btn');
    if (btn) {
        btn.textContent = `👤 ${name}`;
        btn.onclick = function (e) {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('uqa_loggedIn');
                btn.textContent = 'Login';
                btn.onclick = null;
                showToast('👋 You have been logged out.', 'info');
                location.reload();
            }
        };
    }
}
window.addEventListener('load', function () {
    const loggedIn = JSON.parse(localStorage.getItem('uqa_loggedIn') || 'null');
    if (loggedIn) updateNavForLoggedIn(loggedIn.name || loggedIn.email);
});


// ─────────────────────────────────────────────
// 6. COURSE DATA — 6 Courses
// ─────────────────────────────────────────────
const courseData = [
    { title: 'نورانی قاعدہ',   img: 'pic 23.jpg' },
    { title: 'ناظرہ قرآن',     img: 'pic 25.jpg' },
    { title: 'حفظ قرآن',       img: 'pic 22.png' },
    { title: 'ترجمہ، تفسیر',   img: 'pic 23.jpg' },
    { title: 'مسنون دعائیں',   img: 'pic 25.jpg' },
    { title: 'چالیس احادیث',   img: 'pic 22.png' }
];


// ─────────────────────────────────────────────
// 7. COURSE DETAIL MODAL
// ─────────────────────────────────────────────
const courseModalEl = document.createElement('div');
courseModalEl.innerHTML = `
  <div class="modal-overlay" id="courseOverlay">
    <div class="modal-box course-modal-box">
      <button class="modal-close" id="closeCourse">&times;</button>
      <img src="" alt="Course" class="course-modal-img" id="courseModalImg">
      <h3 class="course-modal-title" id="courseModalTitle"></h3>
      <button class="course-enroll-btn" id="enrollBtn">📋 Enroll Now – It's Free!</button>
    </div>
  </div>
`;
document.body.appendChild(courseModalEl);

let currentCourse = '';

document.getElementById('closeCourse').addEventListener('click', function () {
    document.getElementById('courseOverlay').classList.remove('active');
});
document.getElementById('courseOverlay').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
});
document.getElementById('enrollBtn').addEventListener('click', function () {
    document.getElementById('courseOverlay').classList.remove('active');
    document.getElementById('enroll_course').value = currentCourse;
    document.getElementById('enrollCourseTitle').textContent = '📚 Course: ' + currentCourse;
    document.getElementById('enrollOverlay').classList.add('active');
});

document.querySelectorAll('.know-more').forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        const data = courseData[index];
        currentCourse = data.title;
        document.getElementById('courseModalImg').src = data.img;
        document.getElementById('courseModalTitle').textContent = data.title;
        document.getElementById('courseOverlay').classList.add('active');
    });
});


// ─────────────────────────────────────────────
// 8. ENROLLMENT FORM MODAL
// ─────────────────────────────────────────────
const enrollFormEl = document.createElement('div');
enrollFormEl.innerHTML = `
  <div class="modal-overlay" id="enrollOverlay">
    <div class="modal-box" style="max-width:500px;">
      <button class="modal-close" id="closeEnroll">&times;</button>
      <h2 style="text-align:center; color:#1a5276;">📋 Enrollment Form</h2>
      <p class="modal-sub" style="text-align:center;" id="enrollCourseTitle"></p>
      <div class="modal-input-group">
        <label>Full Name *</label>
        <input type="text" id="enroll_name" placeholder="Enter your full name">
      </div>
      <div class="modal-input-group">
        <label>Father's Name *</label>
        <input type="text" id="enroll_father" placeholder="Enter father's name">
      </div>
      <div class="modal-input-group">
        <label>Age *</label>
        <input type="number" id="enroll_age" placeholder="Enter your age" min="4" max="80">
      </div>
      <div class="modal-input-group">
        <label>Course *</label>
        <input type="text" id="enroll_course" readonly
          style="background:#f5f5f5; cursor:not-allowed; direction:rtl; font-family:'Noto Nastaliq Urdu',serif;">
      </div>
      <div class="modal-input-group">
        <label>WhatsApp Number *</label>
        <input type="tel" id="enroll_whatsapp" placeholder="+92XXXXXXXXXX">
      </div>
      <div class="modal-input-group">
        <label>Preferred Language *</label>
        <select id="enroll_language">
          <option value="">-- Select Language --</option>
          <option value="Urdu">Urdu</option>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>
      <button class="wa-submit-btn" id="submitEnroll">
        📲 Submit via WhatsApp
      </button>
    </div>
  </div>
`;
document.body.appendChild(enrollFormEl);

document.getElementById('closeEnroll').addEventListener('click', function () {
    document.getElementById('enrollOverlay').classList.remove('active');
});
document.getElementById('enrollOverlay').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
});
document.getElementById('submitEnroll').addEventListener('click', function () {
    const name     = document.getElementById('enroll_name').value.trim();
    const father   = document.getElementById('enroll_father').value.trim();
    const age      = document.getElementById('enroll_age').value.trim();
    const course   = document.getElementById('enroll_course').value.trim();
    const whatsapp = document.getElementById('enroll_whatsapp').value.trim();
    const language = document.getElementById('enroll_language').value;

    if (!name || !father || !age || !whatsapp || !language) {
        showToast('⚠️ Please fill all fields!', 'warning'); return;
    }
    if (whatsapp.length < 10) {
        showToast('❌ Enter a valid WhatsApp number!', 'error'); return;
    }

    const message =
`🎓 *New Enrollment Request*

📚 *Course:* ${course}
👤 *Student Name:* ${name}
👨 *Father's Name:* ${father}
🎂 *Age:* ${age}
📱 *WhatsApp:* ${whatsapp}
🌐 *Language:* ${language}

_Sent from Online Quran Academy Website_`;

    window.open(`https://wa.me/923411929949?text=${encodeURIComponent(message)}`, '_blank');
    document.getElementById('enrollOverlay').classList.remove('active');
    showToast('✅ Redirecting to WhatsApp! JazakAllah Khair 🌙', 'success');

    // Reset form
    document.getElementById('enroll_name').value = '';
    document.getElementById('enroll_father').value = '';
    document.getElementById('enroll_age').value = '';
    document.getElementById('enroll_whatsapp').value = '';
    document.getElementById('enroll_language').value = '';
});


// ─────────────────────────────────────────────
// 9. WHATSAPP FLOAT BUTTON
// ─────────────────────────────────────────────
const waBtn = document.querySelector('.whatsapp-float');
if (waBtn) {
    waBtn.href = 'https://wa.me/923411929949?text=Assalamu%20Alaikum!%20I%20want%20to%20know%20more%20about%20your%20courses.';
    waBtn.target = '_blank';
}


// ─────────────────────────────────────────────
// 10. HERO BUTTON — Scroll to Courses
// ─────────────────────────────────────────────
const mainBtn = document.querySelector('.main-btn');
if (mainBtn) {
    mainBtn.addEventListener('click', function () {
        document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
    });
}


// ─────────────────────────────────────────────
// 11. NAVBAR MENU ITEMS — Smooth Scroll
// ─────────────────────────────────────────────
document.querySelectorAll('.menu-item').forEach(function (item) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () {
        document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
    });
});


// ─────────────────────────────────────────────
// 12. TOP BAR LINKS
// ─────────────────────────────────────────────
document.querySelectorAll('.top-links a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const text = link.textContent.trim();
        if (text === 'Free Courses') {
            document.querySelector('.courses').scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'About Us') {
            document.querySelector('.main-footer').scrollIntoView({ behavior: 'smooth' });
        } else if (text === 'Personal Tutor') {
            showToast('📞 Contact us on WhatsApp for a personal tutor!', 'info');
        } else if (text === 'Live Events') {
            showToast('🔴 Live events coming soon! Stay tuned.', 'info');
        }
    });
});


// ─────────────────────────────────────────────
// 13. SOCIAL ICONS
// ─────────────────────────────────────────────
const socialLinks = [
    'https://facebook.com',
    'https://instagram.com',
    'https://youtube.com',
    'https://wa.me/923411929949',
    'https://telegram.org'
];
document.querySelectorAll('.social-icons i').forEach(function (icon, idx) {
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function () {
        if (socialLinks[idx]) window.open(socialLinks[idx], '_blank');
    });
});


// ─────────────────────────────────────────────
// 14. NAVBAR SCROLL SHADOW
// ─────────────────────────────────────────────
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 50
            ? '0 4px 20px rgba(0,0,0,0.15)'
            : 'none';
    }
});


// ─────────────────────────────────────────────
// 15. TOAST NOTIFICATION SYSTEM
// ─────────────────────────────────────────────
let toastContainer = document.getElementById('toast-container');
if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3600);
}