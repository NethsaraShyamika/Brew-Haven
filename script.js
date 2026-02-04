function subscribeNewsletter(event) {
  event.preventDefault();

  const emailInput = document.getElementById("emailInput");
  const nameInput = document.getElementById("nameInput");
  const messageDiv = document.getElementById("message");
  const submitBtn = document.querySelector('.subscribe-btn');

  const email = emailInput.value.trim().toLowerCase();
  const name = nameInput ? nameInput.value.trim() : "";
  const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (submitBtn) submitBtn.disabled = true;

  if (!emailPattern.test(email)) {
    showFormMessage("❌ Please enter a valid email address.", false);
    if (submitBtn) submitBtn.disabled = false;
    return false;
  }

  const storageKey = 'brewhaven_subscribers_v1';
  let subscribers = [];
  try {
    const raw = localStorage.getItem(storageKey);
    subscribers = raw ? JSON.parse(raw) : [];
  } catch (e) {
    subscribers = [];
  }

  if (subscribers.some(s => s.email === email)) {
    showFormMessage('✅ You are already subscribed with this email.', true);
    if (submitBtn) submitBtn.disabled = false;
    return false;
  }

  const subscriber = {
    name: name || null,
    email,
    interests,
    subscribedAt: new Date().toISOString()
  };
  subscribers.push(subscriber);

  try {
    localStorage.setItem(storageKey, JSON.stringify(subscribers));
  } catch (e) {
  }

  const displayName = name ? name : email;
  showFormMessage(`🎉 Thank you ${displayName}! You've joined the Brew Haven Coffee Club.`, true);

  emailInput.value = '';
  if (nameInput) nameInput.value = '';
  document.querySelectorAll('input[name="interests"]:checked').forEach(cb => cb.checked = false);

  if (submitBtn) submitBtn.disabled = false;

  return false;

  function showFormMessage(text, success) {
    messageDiv.textContent = text;
    if (success) {
      messageDiv.style.background = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.style.border = '1px solid #c3e6cb';
    } else {
      messageDiv.style.background = '#f8d7da';
      messageDiv.style.color = '#721c24';
      messageDiv.style.border = '1px solid #f5c6cb';
    }

    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.style.background = '';
      messageDiv.style.border = '';
    }, 5000);
  }
}

function setActiveNavLink() {}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();

  const categories = document.querySelectorAll(".menu-category");

  categories.forEach((category, index) => {
    category.style.opacity = "0";
    category.style.transform = "translateY(30px)";

    setTimeout(() => {
      category.style.transition = "all 0.6s ease-in-out";
      category.style.opacity = "1";
      category.style.transform = "translateY(0)";
    }, index * 200);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  document.querySelectorAll(".left-box a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

window.addEventListener("scroll", setActiveNavLink);