const DB_KEY = 'ukm_hackathon_registrations';


function getRegistrations() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) :[];
}


function saveRegistration(data) {
  const registrations = getRegistrations();
  const newReg = {
    ...data,
    id: 'UKM-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
    date: new Date().toISOString(),
    status: 'Pending'
  };
  registrations.push(newReg);
  localStorage.setItem(DB_KEY, JSON.stringify(registrations));
  return newReg;
}


function generateTeamCode() {
  return 'TEAM-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}


function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('text-[#00f5ff]', 'border-b', 'border-[#00f5ff]');
    }
  });
});
