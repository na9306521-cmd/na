// Content Data
const contents = [
  {id:1,title:"Premium Collection Vol.1",type:"🎬",tag:"new",views:4820,vip:false},
  {id:2,title:"Gallery Exclusive Pack",type:"📸",tag:"hot",views:8200,vip:true},
  {id:3,title:"VIP Series Episode 3",type:"🎬",tag:"vip",views:2100,vip:true},
  {id:4,title:"Photo Album #09",type:"📸",tag:"new",views:1540,vip:false},
  {id:5,title:"Live Show Replay HD",type:"🔴",tag:"hot",views:6300,vip:true},
  {id:6,title:"Story Pack Volume 12",type:"📸",tag:"new",views:980,vip:false},
  {id:7,title:"Night Edition Vol.2",type:"🎬",tag:"vip",views:3400,vip:true},
  {id:8,title:"Summer Gallery 2025",type:"📸",tag:"hot",views:5100,vip:false},
];

const users = [
  {name:"user_kh001",email:"user001@mail.com",plan:"VIP",joined:"2025-12-01",status:"active"},
  {name:"khmer_user2",email:"user002@mail.com",plan:"Free",joined:"2026-01-15",status:"active"},
  {name:"vip_member3",email:"user003@mail.com",plan:"VIP",joined:"2026-02-20",status:"banned"},
  {name:"newuser_88",email:"user004@mail.com",plan:"Free",joined:"2026-05-10",status:"active"},
  {name:"premium_kh5",email:"user005@mail.com",plan:"VIP",joined:"2026-03-05",status:"active"},
];

const payments = [
  {id:"#TXN-001",user:"user_kh001",amount:"$9.99",method:"ABA Pay",date:"2026-05-14",status:"success"},
  {id:"#TXN-002",user:"vip_member3",amount:"$9.99",method:"Wing",date:"2026-05-13",status:"failed"},
  {id:"#TXN-003",user:"newuser_88",amount:"$9.99",method:"Stripe",date:"2026-05-12",status:"success"},
  {id:"#TXN-004",user:"premium_kh5",amount:"$9.99",method:"ABA Pay",date:"2026-05-11",status:"success"},
];

const activities = [
  "អ្នកប្រើ newuser_88 បានចុះឈ្មោះ",
  "មាតិកា 'Gallery Exclusive Pack' ត្រូវបានបន្ថែម",
  "ការទូទាត់ #TXN-003 ជោគជ័យ $9.99",
  "អ្នកប្រើ vip_member3 ត្រូវបាន ban",
  "Live Show ចាប់ផ្ដើមផ្សាយ",
  "VIP member premium_kh5 បានចុះឈ្មោះ",
];

// Age Gate - Enter Site
function enterSite() {
  document.getElementById('age-gate').style.display = 'none';
  document.getElementById('main-site').classList.remove('hidden');
  buildAll();
}

// Build All Content & Tables
function buildAll() {
  // Content Grid
  document.getElementById('content-grid').innerHTML = contents.map(c => `
    <div class="content-card" onclick="toast('▶ ចូលមើល: ${c.title}')">
      <div class="content-thumb">
        ${c.type}
        ${c.vip ? '<span class="vip-lock">👑 VIP</span>' : ''}
      </div>
      <div class="content-body">
        <div class="content-title">${c.title}</div>
        <div class="content-meta">
          <span class="tag tag-${c.tag}">${c.tag === 'new' ? 'ថ្មី' : c.tag === 'hot' ? '🔥 Hot' : '👑 VIP'}</span>
          <span class="views">${c.views.toLocaleString()} views</span>
        </div>
      </div>
    </div>
  `).join('');

  // Activity Log
  document.getElementById('activity-log').innerHTML = activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot"></div>
      <span>${a}</span>
    </div>
  `).join('');

  // Content Table
  document.getElementById('content-table').innerHTML = `
    <table>
      <thead><tr>
        <th>ចំណងជើង</th><th>ប្រភេទ</th><th>Views</th><th>ស្ថានភាព</th><th>សកម្មភាព</th>
      </tr></thead>
      <tbody>${contents.map(c => `<tr>
        <td>${c.type} ${c.title}</td>
        <td style="color:var(--text2)">${c.type === '🎬' ? 'វីដេអូ' : c.type === '📸' ? 'រូបភាព' : 'ផ្សាយ'}</td>
        <td style="color:var(--text2)">${c.views.toLocaleString()}</td>
        <td><span class="badge ${c.vip ? 'badge-gold' : 'badge-gray'}">${c.vip ? '👑 VIP' : 'Free'}</span></td>
        <td style="display:flex;gap:6px">
          <button class="action-btn" onclick="toast('✏ កែ: ${c.title}')">✏ កែ</button>
          <button class="action-btn danger" onclick="toast('🗑 លុប: ${c.title}')">🗑 លុប</button>
        </td>
      </tr>`).join('')}</tbody>
    </table>`;

  // User Table
  document.getElementById('user-table').innerHTML = `
    <table>
      <thead><tr>
        <th>Username</th><th>Email</th><th>Plan</th><th>ចូលថ្ងៃ</th><th>ស្ថានភាព</th><th>សកម្មភាព</th>
      </tr></thead>
      <tbody>${users.map(u => `<tr>
        <td>${u.name}</td>
        <td style="color:var(--text2)">${u.email}</td>
        <td><span class="badge ${u.plan === 'VIP' ? 'badge-gold' : 'badge-gray'}">${u.plan}</span></td>
        <td style="color:var(--text3)">${u.joined}</td>
        <td><span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">${u.status === 'active' ? '● Active' : '● Banned'}</span></td>
        <td><button class="action-btn ${u.status !== 'active' ? '' : 'danger'}" onclick="toast('${u.status === 'active' ? '🚫 Ban' : '✓ Unban'}: ${u.name}')">${u.status === 'active' ? 'Ban' : 'Unban'}</button></td>
      </tr>`).join('')}</tbody>
    </table>`;

  // Payment Table
  document.getElementById('payment-table').innerHTML = `
    <table>
      <thead><tr>
        <th>Transaction ID</th><th>User</th><th>ចំនួន</th><th>Method</th><th>ថ្ងៃ</th><th>ស្ថានភាព</th>
      </tr></thead>
      <tbody>${payments.map(p => `<tr>
        <td style="color:var(--text3);font-family:monospace">${p.id}</td>
        <td>${p.user}</td>
        <td style="font-weight:700;color:${p.status === 'success' ? '#4ec994' : 'var(--accent2)'}">${p.amount}</td>
        <td style="color:var(--text2)">${p.method}</td>
        <td style="color:var(--text3)">${p.date}</td>
        <td><span class="badge ${p.status === 'success' ? 'badge-success' : 'badge-danger'}">${p.status === 'success' ? '✓ ជោគជ័យ' : '✗ បរាជ័យ'}</span></td>
      </tr>`).join('')}</tbody>
    </table>`;
}

// Show Page
function showPage(name, btn) {
  ['home','categories','vip','admin'].forEach(p => document.getElementById('page-'+p).classList.add('hidden'));
  document.getElementById('page-'+name).classList.remove('hidden');
  document.querySelectorAll('.nav-links .nav-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Show Admin Panel
function showAdmin(name, btn) {
  ['dashboard','content','users','payments','upload','settings'].forEach(p => document.getElementById('adm-'+p).classList.add('hidden'));
  document.getElementById('adm-'+name).classList.remove('hidden');
  document.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Toast Notification
let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}
