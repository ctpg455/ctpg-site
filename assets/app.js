/* Renderização das listas do site a partir de assets/dados.js */
{
  const D = window.CTPG || {};
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const MES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  const parse = d => { const [y,m,dd] = String(d).split("-").map(Number); return new Date(y, (m||1)-1, dd||1); };
  const fmt = d => parse(d).toLocaleDateString("pt-BR", {day:"2-digit", month:"long", year:"numeric"});
  const silhueta = '<svg viewBox="0 0 150 180" aria-hidden="true"><rect width="150" height="180" fill="#efe8e1"/><circle cx="75" cy="68" r="30" fill="#c9bcb0"/><path d="M20 180c4-42 26-64 55-64s51 22 55 64z" fill="#c9bcb0"/></svg>';

  /* menu móvel */
  const burger = $(".burger"), nav = $(".nav");
  if (burger && nav) burger.addEventListener("click", () => {
    const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o);
  });

  /* aviso de dados de exemplo */
  const ex = D.exemplo === true ? null : (Array.isArray(D.exemplo) ? D.exemplo : []);
  document.querySelectorAll("[data-exemplo]").forEach(el => {
    if (ex && !ex.includes(el.dataset.exemplo)) return;
    el.innerHTML = '<span class="note">Conteúdo de exemplo — substitua em assets/dados.js</span>';
  });

  /* veneráveis */
  const vEl = $("#veneraveis");
  if (vEl) {
    const list = [...(D.veneraveis || [])].sort((a,b) => (b.atual - a.atual) || String(b.periodo).localeCompare(String(a.periodo)));
    vEl.innerHTML = list.length ? list.map(v => `
      <article class="card vm${v.atual ? " atual" : ""}">
        <div class="ph">${v.foto ? `<img src="${esc(v.foto)}" alt="Retrato de ${esc(v.nome)}" loading="lazy">` : silhueta}</div>
        <span class="period">${esc(v.periodo)}</span>
        <h3>${esc(v.nome)}</h3>
        ${v.atual ? '<span class="tag">Venerável Mestre em exercício</span>' : '<span class="meta">Ex-Venerável Mestre</span>'}
        ${v.nota ? `<p>${esc(v.nota)}</p>` : ""}
      </article>`).join("") : '<div class="empty">Galeria em preparação.</div>';
  }

  /* patrocinadores — página completa */
  const pEl = $("#patrocinadores");
  const niveis = [["ouro","Patrocinadores Ouro"],["prata","Patrocinadores Prata"],["apoio","Apoiadores"]];
  const sponCard = p => {
    const inner = `${p.logo ? `<img src="${esc(p.logo)}" alt="${esc(p.nome)}" loading="lazy">` : `<span class="logo-txt">${esc(p.nome)}</span>`}
      ${p.logo ? `<b>${esc(p.nome)}</b>` : ""}${p.descricao ? `<span class="small">${esc(p.descricao)}</span>` : ""}`;
    return p.site ? `<a class="spon" href="${esc(p.site)}" target="_blank" rel="noopener sponsored">${inner}</a>` : `<div class="spon">${inner}</div>`;
  };
  if (pEl) {
    const P = D.patrocinadores || [];
    pEl.innerHTML = P.length ? niveis.map(([k, t]) => {
      const g = P.filter(p => p.nivel === k);
      return g.length ? `<section class="tier ${k}"><h3>${t}</h3><div class="spons">${g.map(sponCard).join("")}</div></section>` : "";
    }).join("") : '<div class="empty">Seja o primeiro a apoiar a Loja.</div>';
  }
  /* faixa de patrocinadores na home */
  const mEl = $("#faixa-patrocinadores");
  if (mEl) {
    const P = (D.patrocinadores || []).filter(p => p.nivel !== "apoio");
    mEl.innerHTML = P.map(p => {
      const c = p.logo ? `<img src="${esc(p.logo)}" alt="${esc(p.nome)}" loading="lazy">` : esc(p.nome);
      return `<a href="${p.site ? esc(p.site) : "patrocinadores.html"}"${p.site ? ' target="_blank" rel="noopener sponsored"' : ""}>${c}</a>`;
    }).join("") || '<span class="small">Seja um apoiador da Loja.</span>';
  }

  /* negócios dos irmãos */
  const nEl = $("#negocios");
  if (nEl) {
    const N = D.negocios || [];
    const q = $("#busca"), f = $("#ramo");
    const ramos = [...new Set(N.map(n => n.ramo).filter(Boolean))].sort((a,b) => a.localeCompare(b, "pt-BR"));
    if (f) f.innerHTML = '<option value="">Todos os ramos</option>' + ramos.map(r => `<option>${esc(r)}</option>`).join("");
    const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const draw = () => {
      const t = norm(q ? q.value : ""), r = f ? f.value : "";
      const L = N.filter(n => (!r || n.ramo === r) && (!t || norm([n.empresa,n.irmao,n.ramo,n.cidade,n.descricao].join(" ")).includes(t)));
      nEl.innerHTML = L.length ? L.map(n => `
        <article class="card">
          ${n.logo ? `<img src="${esc(n.logo)}" alt="" style="max-height:56px;width:auto;margin-bottom:8px" loading="lazy">` : ""}
          <span class="tag">${esc(n.ramo)}</span>
          <h3>${esc(n.empresa)}</h3>
          <span class="meta">${esc(n.irmao)}${n.cidade ? " · " + esc(n.cidade) : ""}</span>
          ${n.descricao ? `<p>${esc(n.descricao)}</p>` : ""}
          <div class="links">
            ${n.site ? `<a href="${esc(n.site)}" target="_blank" rel="noopener">Site</a>` : ""}
            ${n.instagram ? `<a href="https://instagram.com/${esc(n.instagram.replace("@",""))}" target="_blank" rel="noopener">Instagram</a>` : ""}
            ${n.whatsapp ? `<a href="https://wa.me/55${esc(n.whatsapp.replace(/\D/g,""))}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
          </div>
        </article>`).join("") : '<div class="empty">Nenhuma empresa encontrada.</div>';
    };
    q && q.addEventListener("input", draw); f && f.addEventListener("change", draw); draw();
  }

  /* galeria */
  const gEl = $("#albuns"), aEl = $("#album"), lb = $(".lb");
  if (gEl) {
    const A = [...(D.albuns || [])].sort((a,b) => String(b.data).localeCompare(String(a.data)));
    let cur = [], idx = 0;
    const show = () => { const f = cur[idx]; lb.querySelector("img").src = f.src; lb.querySelector("img").alt = f.legenda || ""; lb.querySelector(".cap").textContent = `${f.legenda || ""}  ·  ${idx+1} / ${cur.length}`; };
    const open = i => { idx = i; show(); lb.classList.add("on"); lb.querySelector(".x").focus(); };
    const close = () => lb.classList.remove("on");
    lb.querySelector(".x").addEventListener("click", close);
    lb.querySelector(".p").addEventListener("click", () => { idx = (idx - 1 + cur.length) % cur.length; show(); });
    lb.querySelector(".n").addEventListener("click", () => { idx = (idx + 1) % cur.length; show(); });
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") lb.querySelector(".p").click();
      if (e.key === "ArrowRight") lb.querySelector(".n").click();
    });
    const list = () => {
      aEl.hidden = true; gEl.hidden = false;
      gEl.innerHTML = A.length ? A.map((a, i) => `
        <button class="album" data-i="${i}">
          <div class="cover"><img src="${esc(a.capa || (a.fotos[0]||{}).src)}" alt="" loading="lazy"></div>
          <div class="t"><b>${esc(a.titulo)}</b><span>${fmt(a.data)} · ${a.fotos.length} foto${a.fotos.length === 1 ? "" : "s"}</span></div>
        </button>`).join("") : '<div class="empty">Os primeiros álbuns serão publicados em breve.</div>';
    };
    const album = i => {
      const a = A[i]; if (!a) return list();
      cur = a.fotos; gEl.hidden = true; aEl.hidden = false;
      aEl.innerHTML = `<p><a href="#" id="voltar">← Todos os álbuns</a></p><h2>${esc(a.titulo)}</h2><p class="small">${fmt(a.data)}</p>
        <div class="photos">${a.fotos.map((f, j) => `<button data-j="${j}" aria-label="Ampliar foto ${j+1}"><img src="${esc(f.src)}" alt="${esc(f.legenda || a.titulo)}" loading="lazy"></button>`).join("")}</div>`;
      $("#voltar").addEventListener("click", e => { e.preventDefault(); history.replaceState(null, "", location.pathname); list(); });
      aEl.querySelectorAll("[data-j]").forEach(b => b.addEventListener("click", () => open(+b.dataset.j)));
      window.scrollTo({top: 0});
    };
    gEl.addEventListener("click", e => { const b = e.target.closest(".album"); if (b) { location.hash = "album-" + b.dataset.i; } });
    const route = () => { const m = location.hash.match(/^#album-(\d+)$/); m ? album(+m[1]) : list(); };
    window.addEventListener("hashchange", route); route();
  }

  /* eventos */
  const fut = $("#proximos"), pas = $("#anteriores");
  if (fut || pas) {
    const hoje = new Date(); hoje.setHours(0,0,0,0);
    const E = [...(D.eventos || [])];
    const row = e => { const d = parse(e.data); return `
      <div class="ev"><div class="d"><b>${String(d.getDate()).padStart(2,"0")}</b><span>${MES[d.getMonth()]} ${d.getFullYear()}</span></div>
      <div><h3>${esc(e.titulo)}</h3>${e.descricao ? `<p>${esc(e.descricao)}</p>` : ""}${e.publico ? '<span class="tag" style="display:inline-block;margin-top:6px">Aberto a familiares e convidados</span>' : ""}</div></div>`; };
    const F = E.filter(e => parse(e.data) >= hoje).sort((a,b) => a.data.localeCompare(b.data));
    const P = E.filter(e => parse(e.data) < hoje).sort((a,b) => b.data.localeCompare(a.data));
    if (fut) fut.innerHTML = F.length ? F.map(row).join("") : '<div class="empty">Nenhum evento público agendado no momento. Acompanhe a agenda abaixo.</div>';
    if (pas) pas.innerHTML = P.map(row).join("") || '<div class="empty">Sem registros.</div>';
  }

  /* copiar PIX */
  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Chave copiada ✓"; }
    catch { b.textContent = "Selecione e copie a chave acima"; }
    setTimeout(() => b.textContent = "Copiar chave PIX", 2500);
  }));

  /* player do hino */
  const pl = $("#player");
  if (pl && D.hinoAudio) {
    const au = pl.querySelector("audio"), bt = pl.querySelector(".play"), sk = pl.querySelector(".seek"), tm = pl.querySelector(".time");
    au.src = D.hinoAudio; pl.hidden = false;
    const mmss = s => isFinite(s) ? `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}` : "0:00";
    const upd = () => { tm.textContent = `${mmss(au.currentTime)} / ${mmss(au.duration)}`; if (au.duration) sk.value = au.currentTime / au.duration * 100; };
    bt.addEventListener("click", async () => {
      if (au.paused) { try { await au.play(); } catch { tm.textContent = "Não foi possível tocar o áudio"; } } else au.pause();
    });
    au.addEventListener("play", () => { pl.classList.add("on"); bt.setAttribute("aria-label", "Pausar o hino"); });
    au.addEventListener("pause", () => { pl.classList.remove("on"); bt.setAttribute("aria-label", "Ouvir o hino"); });
    au.addEventListener("timeupdate", upd); au.addEventListener("loadedmetadata", upd);
    au.addEventListener("ended", () => { au.currentTime = 0; upd(); });
    sk.addEventListener("input", () => { if (au.duration) au.currentTime = sk.value / 100 * au.duration; });
  }

  const y = $("#ano"); if (y) y.textContent = new Date().getFullYear();
}
