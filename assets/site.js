document.querySelectorAll("[data-menu-button]").forEach((button) => {
  const menu = document.getElementById(button.getAttribute("aria-controls"));
  if (!menu) return;

  const close = () => {
    button.setAttribute("aria-expanded", "false");
    menu.dataset.open = "false";
  };

  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(next));
    menu.dataset.open = String(next);
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !menu.contains(event.target)) close();
  });
});

const enquiryForm = document.querySelector("[data-enquiry-form]");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const data = new FormData(enquiryForm);
    const subject = `FerryWellCo enquiry: ${data.get("scope")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company or app: ${data.get("company") || "Not supplied"}`,
      `Work email: ${data.get("email")}`,
      `Area: ${data.get("scope")}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    enquiryForm.querySelector("[data-form-status]").textContent = "Your email app will open with the enquiry ready to send.";
    window.location.href = `mailto:research@ferrywellco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const activateTab = (tab, focus = false) => {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  if (focus) tab.focus();
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});

const demo = document.querySelector("[data-demo]");
if (demo) {
  const form = demo.querySelector("form");
  const output = {
    kicker: demo.querySelector("[data-demo-kicker]"),
    heading: demo.querySelector("[data-demo-heading]"),
    summary: demo.querySelector("[data-demo-summary]"),
    questions: Array.from(demo.querySelectorAll("[data-demo-questions] li")),
  };
  const settings = {
    activity: {
      label: "Outdoor sport",
      activity: "outdoor session",
      heading: "What should this session plan take into account?",
      questions: [
        "Which time or place fits the activity?",
        "What context would participants want to understand?",
        "How can the plan remain flexible?",
      ],
    },
  };
  const conditionLabels = { heat: "Warmer outlook", air: "PM2.5 concern", none: "No particular signal" };
  const timingLabels = { earlier: "Earlier in the day", later: "Later in the day" };

  const update = () => {
    const data = new FormData(form);
    form.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.parentElement.dataset.selected = String(input.checked);
    });
    const context = data.get("context");
    const condition = data.get("condition");
    const timing = data.get("timing");
    const setting = settings[context];
    const when = timing === "earlier" ? "earlier" : "later";
    output.kicker.textContent = `${setting.label} · ${conditionLabels[condition]} · ${timingLabels[timing]}`;
    output.heading.textContent = setting.heading;
    if (condition === "heat") {
      output.summary.textContent = `A warmer outlook matters for a ${when} ${setting.activity}. Review the timing, the activity and the options available before setting the plan.`;
    } else if (condition === "air") {
      output.summary.textContent = `For a ${when} ${setting.activity}, look at the PM2.5 outlook for the location and compare any practical alternatives.`;
    } else {
      output.summary.textContent = `No heat or PM2.5 concern is selected for this ${when} ${setting.activity}. The location and activity still determine which information belongs in the plan.`;
    }
    output.questions.forEach((item, index) => { item.textContent = setting.questions[index]; });
  };
  form.addEventListener("change", update);
  update();
}

// Prefill the contact topic when a visitor follows a topic-specific invitation.
const scopeSelect = document.querySelector("#enquiry-scope");
if (scopeSelect) {
  const selectScope = (value) => {
    const option = Array.from(scopeSelect.options).find((item) => item.value === value);
    if (option) scopeSelect.value = option.value;
  };
  const requested = new URLSearchParams(window.location.search).get("scope");
  if (requested === "platform") selectScope("Platform integration");
  if (requested === "organisations") selectScope("Other enquiry");
  if (requested === "gotime-pilot") selectScope("Suggest GOTime for an app");
  document.querySelectorAll("[data-select-scope]").forEach((link) => {
    link.addEventListener("click", () => selectScope(link.dataset.selectScope));
  });
}

document.querySelectorAll("[data-linkedin-url]").forEach((person) => {
  const url = person.dataset.linkedinUrl;
  if (!url) return;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "www.linkedin.com") return;
    const link = document.createElement("a");
    link.href = parsed.href;
    link.textContent = "LinkedIn";
    link.rel = "noopener noreferrer";
    link.target = "_blank";
    link.className = "team-linkedin";
    person.append(link);
  } catch (_) {
    // A missing or malformed optional profile URL stays hidden.
  }
});
