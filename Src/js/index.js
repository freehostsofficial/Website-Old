  const roleIcons = {
    "Owner": { icon: "crown", color: "text-yellow-400" },
    "Co-owner": { icon: "shield", color: "text-blue-400" },
    "Supervisor": { icon: "shield-check", color: "text-green-400" },
    "Developer": { icon: "code", color: "text-purple-400" },
    "Hosting Publisher": { icon: "server", color: "text-orange-400" },
    "Hosting Provider": { icon: "server", color: "text-orange-400" },
    "Support": { icon: "help-circle", color: "text-pink-400" },
    "Supporter": { icon: "heart", color: "text-red-400" }
  };

  async function loadStaff() {
    try {
      const response = await fetch('./Src/data/staff.json');
      const data = await response.json();
      const teamGrid = document.getElementById('team-grid');

      Object.entries(data.staffs).forEach(([name, role]) => {
        const { icon, color } = roleIcons[role] || { icon: "user", color: "text-gray-400" };
        const card = document.createElement('div');
        card.className = 'team-card card-gradient p-6 rounded-xl fade-in';
        card.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            data-lucide="${icon}"
            class="lucide lucide-${icon} h-12 w-12 ${color} mx-auto mb-4"
          ></svg>
          <h3 class="text-xl font-bold">${name}</h3>
          <p class="text-blue-400 font-medium">${role}</p>
        `;
        teamGrid.appendChild(card);
      });

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    } catch (error) {
      console.error('Failed to load staff data:', error);
    }
  }

  function toggleAnswer(id) {
    const answer = document.getElementById(`answer${id}`);
    const icon = answer.parentElement.querySelector('[data-lucide="chevron-down"]');
    answer.classList.toggle("open");
    icon.style.transform = answer.classList.contains("open") ? "rotate(180deg)" : "";
  }

  function openModal(imageSrc) {
    const modal = document.getElementById("screenshot-modal");
    const modalImage = document.getElementById("modal-image");
    modalImage.src = imageSrc;
    modal.classList.remove("hidden");
  }

  document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("screenshot-modal");
    modal.classList.add("hidden");
  });

  document.getElementById("screenshot-modal").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add("hidden");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    loadStaff();

    const currentYear = new Date().getFullYear();
    document.querySelector("#current-year").textContent = currentYear;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
  });

  (function () {
    function c() {
      const b = a.contentDocument || a.contentWindow.document;
      if (b) {
        const d = b.createElement("script");
        d.innerHTML = b.getElementsByTagName("head")[0].appendChild(d);
      }
    }
    if (document.body) {
      const a = document.createElement("iframe");
      a.height = 1;
      a.width = 1;
      a.style.position = "absolute";
      a.style.top = 0;
      a.style.left = 0;
      a.style.border = "none";
      a.style.visibility = "hidden";
      document.body.appendChild(a);
      if (document.readyState !== "loading") c();
      else if (window.addEventListener) {
        document.addEventListener("DOMContentLoaded", c);
      } else {
        const e = document.onreadystatechange || function () {};
        document.onreadystatechange = function (b) {
          e(b);
          if (document.readyState !== "loading") {
            document.onreadystatechange = e;
            c();
          }
        };
      }
    }
  })();
