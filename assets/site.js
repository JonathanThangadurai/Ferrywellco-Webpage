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
    operations: {
      label: "Site operations",
      activity: "outdoor task",
      heading: "What should the site team review before this task?",
      questions: [
        "Which part of the task is most exposed?",
        "What timing or site controls are realistic within existing guidance?",
        "How will the team record and revisit its decision?",
      ],
    },
    activity: {
      label: "Outdoor sport",
      activity: "outdoor session",
      heading: "What should this activity plan take into account?",
      questions: [
        "Which time or place fits the activity?",
        "What context would participants want to understand?",
        "How can the plan remain flexible?",
      ],
    },
    platform: {
      label: "Digital service",
      activity: "planned outing",
      heading: "What information belongs in the planning screen?",
      questions: [
        "At what point would a user make this decision?",
        "Which conditions can the service explain clearly?",
        "How would the team test whether this feature helps?",
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
