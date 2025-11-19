// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Dashboard functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Mobile menu toggle
  if (menuToggle && dashboardSidebar) {
    menuToggle.addEventListener('click', function() {
      dashboardSidebar.classList.toggle('active');
    });
  }
  
  // Set active nav item
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Close sidebar on mobile after clicking
      if (window.innerWidth <= 992) {
        dashboardSidebar.classList.remove('active');
      }
    });
  });
  
  // Update active nav based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  
  // Animate skill bars on scroll
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const barPosition = bar.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (barPosition < screenPosition) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      }
    });
  }
  
  // Set initial state for skill bars
  document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0%';
  });
  
  // Run on load and scroll
  window.addEventListener('load', animateSkillBars);
  window.addEventListener('scroll', animateSkillBars);
  
  // Ensure keyboard focus outlines are visible for accessibility
  document.body.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
  });

  // ===== CONTACT FORM FUNCTIONALITY =====
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      
      // Tampilkan loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Mengirim...';
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      const nama = document.getElementById('nama').value.trim();
      const email = document.getElementById('email').value.trim();
      const telepon = document.getElementById('telepon').value.trim();
      const subjek = document.getElementById('subjek').value;
      const pesan = document.getElementById('pesan').value.trim();

      // Validasi field
      if (!nama || !email || !telepon || !subjek || !pesan) {
        msg.textContent = 'Semua field harus diisi!';
        msg.className = 'form-message error';
        resetButton(submitBtn, originalText);
        return;
      }

      // Validasi email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        msg.textContent = 'Mohon masukkan alamat email yang valid.';
        msg.className = 'form-message error';
        resetButton(submitBtn, originalText);
        return;
      }

      // Validasi nomor telepon
      const phonePattern = /^[+]?[\d\s\-()]+$/;
      if (!phonePattern.test(telepon)) {
        msg.textContent = 'Mohon masukkan nomor WhatsApp yang valid.';
        msg.className = 'form-message error';
        resetButton(submitBtn, originalText);
        return;
      }

      // Kirim ke WhatsApp
      const phoneNumber = '62882007302535'; // Nomor WhatsApp Anda
      const whatsappMessage = `
Halo Wahidatun,

Saya ${nama} ingin menghubungi Anda melalui website.

📧 Email: ${email}
📱 WhatsApp: ${telepon}
📋 Subjek: ${getSubjectText(subjek)}

💬 Pesan:
${pesan}

Saya menunggu balasan dari Anda.

Salam,
${nama}
      `.trim();

      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
      
      // Tampilkan pesan sukses
      msg.textContent = 'Mengarahkan ke WhatsApp...';
      msg.className = 'form-message success';
      
      // Redirect ke WhatsApp setelah 2 detik
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        form.reset();
        resetButton(submitBtn, originalText);
        msg.textContent = '';
      }, 2000);
    });
  }

  // Fungsi helper untuk reset button
  function resetButton(button, originalHtml) {
    button.innerHTML = originalHtml;
    button.classList.remove('loading');
    button.disabled = false;
  }

  // Fungsi helper untuk teks subjek
  function getSubjectText(value) {
    const subjects = {
      'kerja-sama': 'Kerja Sama Projek',
      'beli-produk': 'Beli Produk Digital', 
      'konsultasi': 'Konsultasi Bisnis',
      'lainnya': 'Lainnya'
    };
    return subjects[value] || value;
  }

  // Smooth-scroll for nav links
  document.querySelectorAll('.nav-item[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        window.setTimeout(() => target.removeAttribute('tabindex'), 1000);
      }
    });
  });

  // Add animation on scroll for other elements
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .section-title, .service-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Set initial state for animation
  document.querySelectorAll('.card, .section-title, .service-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  // Run on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // ===== PROJECTS FUNCTIONALITY =====
  
  // Filter Projects
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.projects-grid > div');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// Modal functionality untuk preview produk
function initProjectModals() {
  const viewButtons = document.querySelectorAll('.view-btn');
  
  viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('href').replace('#', '');
      showProjectModal(projectId);
    });
  });
}

function showProjectModal(projectId) {
  // Buat modal sederhana untuk preview
  const modal = document.createElement('div');
  modal.className = 'project-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 500px; width: 90%; position: relative;">
      <button class="close-modal" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
      <h3>Preview Produk</h3>
      <p>Fitur preview detail produk akan ditampilkan di sini.</p>
      <p>Untuk implementasi lengkap, Anda perlu:</p>
      <ul>
        <li>Menambahkan gambar detail produk</li>
        <li>Menambahkan deskripsi lengkap</li>
        <li>Menambahkan fitur zoom gambar</li>
      </ul>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Tutup modal
  modal.querySelector('.close-modal').addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Panggil fungsi di DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initProjectModals();
});

// ===== FUNGSI WHATSAPP & EMAIL DIRECT =====
function openWhatsAppDirect() {
  const phoneNumber = '62882007302535'; // Nomor WhatsApp Anda
  const message = 'Halo Wahidatun, saya tertarik dengan portfolio dan layanan Anda. Bisakah kita berdiskusi lebih lanjut?';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    
    setTimeout(function() {
      window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    }, 500);
  } else {
    window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`, '_blank');
  }
}

function openEmailDirect() {
  const subject = 'Konsultasi Portfolio & Layanan - Wahidatun NK';
  const body = 'Halo Wahidatun,\n\nSaya tertarik dengan portfolio dan layanan Anda. Bisakah kita berdiskusi lebih lanjut?\n\nSalam,\n[Nama Anda]';
  
  window.location.href = `mailto:nurrrwahida@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Fungsi untuk download PDF Resume
function createTempPDF() {
  // Buat konten HTML untuk PDF
  const pdfContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; max-width: 800px; margin: 0 auto; color: #333;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #8B5FBF; padding-bottom: 20px;">
        <h1 style="color: #8B5FBF; margin-bottom: 5px; font-size: 28px;">WAHIDATUN NUR KHOLISOH</h1>
        <h2 style="color: #FF6B9D; margin-top: 0; font-weight: normal; font-size: 18px;">Mahasiswa Sistem Informasi & Web Developer</h2>
      </div>
      
      <!-- Pendidikan -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #8B5FBF; border-left: 4px solid #8B5FBF; padding-left: 10px; font-size: 20px;">📚 Pendidikan</h3>
        <div style="margin-left: 20px;">
          <div style="background: #F0EBFF; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0;"><strong>2024 - Sekarang</strong></p>
            <p style="margin: 5px 0 0 0;"><strong>Mahasiswa</strong><br>
            Universitas Komputama, Cilacap<br>
            <em>Status: Aktif</em></p>
          </div>
          <div style="background: #F0EBFF; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0;"><strong>2018 - 2021</strong></p>
            <p style="margin: 5px 0 0 0;"><strong>SMK LPPM RI 02 KEDUNGREJA</strong><br>
            Jurusan Akuntansi</p>
          </div>
        </div>
      </div>
      
      <!-- Keterampilan -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #8B5FBF; border-left: 4px solid #8B5FBF; padding-left: 10px; font-size: 20px;">💼 Keterampilan</h3>
        <div style="margin-left: 20px;">
          <div style="background: #F0EBFF; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0;"><strong>Software & Hard Skills</strong></p>
            <ul style="margin: 5px 0 0 0;">
              <li>Membuat surat dan presentasi</li>
              <li>Mengoperasikan komputer</li>
              <li>Komunikasi dan kerjasama antar tim</li>
              <li>Microsoft Office</li>
              <li>Bahasa Indonesia</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Pengalaman -->
      <div style="margin-bottom: 25px;">
        <h3 style="color: #8B5FBF; border-left: 4px solid #8B5FBF; padding-left: 10px; font-size: 20px;">🎯 Pengalaman</h3>
        <div style="margin-left: 20px;">
          <div style="background: #F0EBFF; padding: 15px; border-radius: 8px; margin: 10px 0;">
            <p style="margin: 0;"><strong>2025 - Sekarang</strong></p>
            <p style="margin: 5px 0 0 0;"><strong>BEM</strong><br>
            Mengikuti kegiatan di Organisasi</p>
            <ul style="margin: 5px 0 0 0;">
              <li>Menjadi Panitia di kegiatan</li>
              <li>Menjadi Peserta di kegiatan</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Kontak -->
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="margin: 5px 0;">📧 Email: nurrrwahida@gmail.com</p>
        <p style="margin: 5px 0;">📱 WhatsApp: +62 882 0073 02535</p>
        <p style="margin: 5px 0;">📷 Instagram: @lis.khlsh_</p>
      </div>
    </div>
  `;
  
  // Buat blob dan download
  const blob = new Blob([pdfContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Resume_Wahidatun_Nur_Kholisoh.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Tampilkan pesan
  alert('Resume berhasil didownload! File tersimpan di folder Download.');
}