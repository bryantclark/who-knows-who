import {
	a0 as u,
	a1 as v,
	a2 as d,
	a3 as k,
	a4 as l,
	a5 as _,
	h as o,
	a6 as g,
	a7 as y,
	a8 as T,
	a9 as m,
	aa as A,
	ab as S,
	ac as E,
	ad as w,
	ae as M,
	af as F,
	ag as b,
	ah as R,
	ai as x,
	y as B,
	q as D,
	S as N
} from './v5j2BDPd.js';
class q {
	anchor;
	#s = new Map();
	#t = new Map();
	#e = new Map();
	#a = new Set();
	#i = !0;
	constructor(e, t = !0) {
		((this.anchor = e), (this.#i = t));
	}
	#r = () => {
		var e = u;
		if (this.#s.has(e)) {
			var t = this.#s.get(e),
				a = this.#t.get(t);
			if (a) (v(a), this.#a.delete(t));
			else {
				var i = this.#e.get(t);
				i &&
					(this.#t.set(t, i.effect),
					this.#e.delete(t),
					i.fragment.lastChild.remove(),
					this.anchor.before(i.fragment),
					(a = i.effect));
			}
			for (const [s, r] of this.#s) {
				if ((this.#s.delete(s), s === e)) break;
				const f = this.#e.get(r);
				f && (d(f.effect), this.#e.delete(r));
			}
			for (const [s, r] of this.#t) {
				if (s === t || this.#a.has(s)) continue;
				const f = () => {
					if (Array.from(this.#s.values()).includes(s)) {
						var n = document.createDocumentFragment();
						(y(r, n), n.append(l()), this.#e.set(s, { effect: r, fragment: n }));
					} else d(r);
					(this.#a.delete(s), this.#t.delete(s));
				};
				this.#i || !a ? (this.#a.add(s), k(r, f, !1)) : f();
			}
		}
	};
	#f = (e) => {
		this.#s.delete(e);
		const t = Array.from(this.#s.values());
		for (const [a, i] of this.#e) t.includes(a) || (d(i.effect), this.#e.delete(a));
	};
	ensure(e, t) {
		var a = u,
			i = T();
		if (t && !this.#t.has(e) && !this.#e.has(e))
			if (i) {
				var s = document.createDocumentFragment(),
					r = l();
				(s.append(r), this.#e.set(e, { effect: _(() => t(r)), fragment: s }));
			} else
				this.#t.set(
					e,
					_(() => t(this.anchor))
				);
		if ((this.#s.set(a, e), i)) {
			for (const [f, c] of this.#t)
				f === e ? a.skipped_effects.delete(c) : a.skipped_effects.add(c);
			for (const [f, c] of this.#e)
				f === e ? a.skipped_effects.delete(c.effect) : a.skipped_effects.add(c.effect);
			(a.oncommit(this.#r), a.ondiscard(this.#f));
		} else (o && (this.anchor = g), this.#r());
	}
}
function L(h, e, t = !1) {
	o && A();
	var a = new q(h),
		i = t ? S : 0;
	function s(r, f) {
		if (o) {
			const n = E(h) === w;
			if (r === n) {
				var c = M();
				(F(c), (a.anchor = c), b(!1), a.ensure(r, f), b(!0));
				return;
			}
		}
		a.ensure(r, f);
	}
	m(() => {
		var r = !1;
		(e((f, c = !0) => {
			((r = !0), s(c, f));
		}),
			r || s(!1, null));
	}, i);
}
function p(h, e) {
	return h === e || h?.[N] === e;
}
function O(h = {}, e, t, a) {
	return (
		R(() => {
			var i, s;
			return (
				x(() => {
					((i = s),
						(s = []),
						B(() => {
							h !== t(...s) && (e(h, ...s), i && p(t(...i), h) && e(null, ...i));
						}));
				}),
				() => {
					D(() => {
						s && p(t(...s), h) && e(null, ...s);
					});
				}
			);
		}),
		h
	);
}
export { q as B, O as b, L as i };
