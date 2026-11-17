// ============================================================
//  EDIT HERE: WhatsApp number + services and their messages
// ============================================================
const WHATSAPP = "917098168009"; // country code + number, digits only
const CLINIC = "Comfort Dental Clinic";

const SERVICES = [
  {
    name: "General Check-up",
    desc: "Complete oral exam to catch problems early and keep your teeth healthy.",
    msg: "Hi Dr. Arnab Saha, I'd like to book a general dental check-up.",
  },
  {
    name: "Cleaning & Polishing",
    desc: "Scaling and polishing to remove tartar and stains, and to keep gums healthy.",
    msg: "Hi, I'd like to book an appointment for teeth cleaning & polishing.",
  },
  {
    name: "Tooth Filling",
    desc: "Tooth-coloured fillings that repair cavities and blend in naturally.",
    msg: "Hi, I think I have a cavity and would like to book an appointment for a tooth filling.",
  },
  {
    name: "Root Canal Treatment",
    desc: "Save an infected or painful tooth with comfortable, modern root canal treatment.",
    msg: "Hi Doctor, I have tooth pain and would like to book an appointment for root canal treatment / consultation.",
  },
  {
    name: "Braces & Aligners",
    desc: "Straighten teeth with metal, ceramic braces or clear aligners.",
    msg: "Hi, I'm interested in braces / aligners. I'd like to book a consultation.",
  },
  {
    name: "Teeth Whitening",
    desc: "Safe in-clinic whitening for a brighter, more confident smile.",
    msg: "Hi, I'd like to know more about teeth whitening and book an appointment.",
  },
  {
    name: "Tooth Extraction",
    desc: "Gentle removal of damaged or wisdom teeth with proper aftercare.",
    msg: "Hi, I'd like to book an appointment for a tooth extraction / wisdom tooth.",
  },
  {
    name: "Dental Implants & Crowns",
    desc: "Replace missing or broken teeth with natural-looking implants, crowns and bridges.",
    msg: "Hi, I'd like a consultation for dental implants / crowns.",
  },
  {
    name: "Kids Dentistry",
    desc: "Friendly, patient care for children's teeth, from first visits to fillings.",
    msg: "Hi, I'd like to book a dental appointment for my child.",
  },
];

const ENDING = "\n\nName: \nPreferred date & time: ";
const GENERAL_MSG = `Hi ${CLINIC}, I'd like to book an appointment.` + ENDING;

const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Images in /img, same order as SERVICES above
const IMAGES = ["checkup", "cleaning", "filling", "root-canal", "braces", "whitening", "extraction", "implants", "kids"];

// ---- services grid ----
const grid = document.getElementById("serviceGrid");
SERVICES.forEach((s, i) => {
  const card = document.createElement("article");
  card.className = "service";
  card.innerHTML = `
    <img class="service-img" src="/img/${IMAGES[i]}.webp" width="468" height="286" loading="lazy" alt="" />
    <div class="service-body">
      <h3></h3>
      <p></p>
      <a class="btn btn-wa btn-sm" target="_blank" rel="noopener">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3z"/></svg>
        <span class="long">Book on WhatsApp</span><span class="short">Book</span>
      </a>
    </div>`;
  card.querySelector("img").alt = s.name;
  card.querySelector("h3").textContent = s.name;
  card.querySelector("p").textContent = s.desc;
  card.querySelector("a").href = waUrl(s.msg + ENDING);
  grid.appendChild(card);
});

// ---- general WhatsApp buttons ----
document.querySelectorAll('[data-wa="general"]').forEach((a) => {
  a.href = waUrl(GENERAL_MSG);
  a.target = "_blank";
  a.rel = "noopener";
});

// ---- request form -> WhatsApp ----
const form = document.getElementById("requestForm");
const sel = document.getElementById("requestService");
sel.innerHTML = SERVICES.map((s) => `<option>${s.name}</option>`).join("") + "<option>Not sure / Consultation</option>";
form.date.min = new Date().toISOString().slice(0, 10);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const err = document.getElementById("requestError");
  if (form.name.value.trim().length < 2) { err.textContent = "Please enter your name."; return; }
  err.textContent = "";
  let dateText = "Any day";
  if (form.date.value) {
    const d = new Date(form.date.value + "T00:00:00");
    dateText = d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }
  const text =
    `Hi ${CLINIC}, I'd like to book an appointment.\n\n` +
    `Name: ${form.name.value.trim()}\n` +
    `Treatment: ${form.service.value}\n` +
    `Preferred date: ${dateText}\n` +
    `Preferred time: ${form.time.value}` +
    (form.notes.value.trim() ? `\nNotes: ${form.notes.value.trim()}` : "");
  window.open(waUrl(text), "_blank", "noopener");
});

// ---- nav + footer ----
document.getElementById("navToggle").addEventListener("click", () => document.getElementById("navLinks").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();
