(() => {
  const host = document.querySelector('[data-advisory]');
  if (!host) return;
  const scenarios = {
      hot: {
        tier: 'Shift this one', tierBg: '#f3d9cd', heroBg: '#f6e3d7',
        headline: 'Heat and ozone peak together at 18:00.',
        situation: 'Each is manageable on its own. Together they add up to more strain on the heart and lungs. Before 10:00 both are low.',
        why: [{ label: 'Hot', heat: true }, { label: 'High ozone', ozone: true }],
        tips: [
          { clock: true, text: 'Run before 10:00, on a quiet route. Morning traffic air is at its worst along main roads.' },
          { pace: true, text: 'Keeping 18:00? Run by effort, not pace. In heat your heart rate climbs at the same speed.' },
          { shade: true, text: 'A park will not lower ozone today. Shade will lower the heat.' }
        ],
        actions: true, moveLabel: 'Move run to 08:00', doneText: 'Run moved to 08:00',
        numbers: '18:00: 27°C, ozone high. 08:00: 21°C, ozone low. Sample values.'
      },
      route: {
        tier: 'Keep the time, change the route', tierBg: '#f5eadb', heroBg: '#f7efe4',
        headline: 'Traffic air is the issue today, not the time.',
        situation: 'Heat and ozone are low. Exhaust from rush-hour traffic is high along main roads, and it falls away within a street or two.',
        why: [{ label: 'Traffic fumes', air: true }, { label: 'Mild', heat: true }],
        tips: [
          { shade: true, text: 'Swap the main-road stretch for the river path. Avoiding the worst stretches can roughly halve the particles you breathe in.' },
          { clock: true, text: 'Shifting the time would change little today.' }
        ],
        actions: true, moveLabel: 'Use the river route', doneText: 'Route changed to the river path',
        numbers: '18:00: 19°C, ozone low, PM2.5 on the main road about twice the river path. Sample values.'
      },
      intensity: {
        tier: 'Keep the run, swap the session', tierBg: '#f5eadb', heroBg: '#f7efe4',
        headline: 'Ozone builds this afternoon. Hard efforts breathe in the most.',
        situation: 'Intervals move many times more air through your lungs than an easy jog, mostly through the mouth. Tonight suits an easy run; tomorrow morning suits the intervals.',
        why: [{ label: 'Ozone rising', ozone: true }, { label: 'Warm', heat: true }],
        tips: [
          { pace: true, text: 'Run tonight easy and conversational.' },
          { clock: true, text: 'Move the interval session to tomorrow before 10:00, when ozone is low.' }
        ],
        actions: true, moveLabel: 'Swap the two sessions', doneText: 'Intervals moved to Sunday 08:00',
        numbers: '18:00: 24°C, ozone moderate and rising. Sunday 08:00: 17°C, ozone low. Sample values.'
      },
      fine: {
        tier: 'Go as planned', tierBg: '#e5eadf', heroBg: '#eef1ea',
        headline: 'Hazy, but well worth the run.',
        situation: 'Air quality is moderate today. At levels like these, the benefits of a 30-minute run far outweigh the effect of the air you breathe.',
        why: [{ label: 'Moderate particles', air: true }, { label: 'Mild', heat: true }],
        tips: [
          { check: true, text: 'No change needed. Staying in would cost you more than the haze does.' }
        ],
        actions: false, moveLabel: '', doneText: '',
        numbers: '18:00: 18°C, PM2.5 20 µg/m³ (moderate for the Netherlands). Sample values.'
      }
    };
  const names = {hot:'A hot evening', route:'A busy-road route', intensity:'An interval session', fine:'A milder day'};
  let selected = 'hot';
  const choices = host.querySelectorAll('[data-scenario]');
  const card = host.querySelector('[data-advisory-card]');
  const status = host.querySelector('[data-advisory-status]');
  const plan = host.querySelector('[data-plan]');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const originalPlan = () => selected === 'intensity' ? 'Saturday · 18:00 · Intervals' : selected === 'route' ? 'Saturday · 18:00 · City route' : 'Saturday · 18:00 · Riverside run';
  function render() {
    const d = scenarios[selected];
    plan.textContent = originalPlan();
    status.textContent = '';
    choices.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.scenario === selected)));
    const tips = d.tips.map(t => {
      const icon = ['clock','pace','shade','check'].find(k => t[k]) || 'clock';
      return `<li><img src="assets/advisory/${icon}.svg" width="24" height="24" alt=""><span>${escape(t.text)}</span></li>`;
    }).join('');
    const keep = selected === 'route' ? 'Keep my route' : selected === 'intensity' ? 'Keep my sessions' : 'Keep 18:00';
    card.innerHTML = `<div class="advisory-heading"><img class="advisory-art" src="assets/advisory/${selected}.svg" width="88" height="88" alt=""><div><p class="advisory-tier">${escape(d.tier)}</p><h3>${escape(d.headline)}</h3></div></div>
      <p class="advisory-situation">${escape(d.situation)}</p>
      <div class="advisory-factors">${d.why.map(w=>`<span>${escape(w.label)}</span>`).join('')}</div>
      <div class="advisory-actions">${d.actions ? `<button type="button" data-move>${escape(d.moveLabel)}</button><button type="button" data-keep>${keep}</button>` : '<p class="advisory-calm">Your plan stays as it is.</p>'}</div>
      <details class="advisory-details"><summary>Options for this run</summary><ul>${tips}</ul></details>
      <details class="advisory-details"><summary>Show the readings</summary><p>${escape(d.numbers)}</p></details>`;
  }
  choices.forEach(button => button.addEventListener('click', () => { selected=button.dataset.scenario; render(); }));
  host.addEventListener('click', e => {
    const move=e.target.closest('[data-move]'), keep=e.target.closest('[data-keep]'), undo=e.target.closest('[data-undo]');
    if(undo) { render(); host.querySelector('[data-move]')?.focus(); return; }
    if(!move && !keep) return;
    if(move) {
      plan.textContent = {hot:'Saturday · 08:00 · Riverside run',route:'Saturday · 18:00 · River route',intensity:'Saturday · 18:00 · Easy run / Sunday · 08:00 · Intervals'}[selected];
      status.innerHTML = `<span>${escape(scenarios[selected].doneText)}</span> <button type="button" data-undo>Undo</button>`;
      move.disabled=true;
      move.textContent='Plan updated';
    } else {
      plan.textContent=originalPlan();
      status.innerHTML='<span>Original plan kept.</span> <button type="button" data-undo>Reset</button>';
      const button=host.querySelector('[data-move]');button.disabled=false;button.textContent=scenarios[selected].moveLabel;
    }
  });
  render();
})();
