import { f as K, a as X } from '../chunks/DrVC7uez.js';
import { i as G } from '../chunks/Ss1HFBS8.js';
import {
	h as oe,
	aa as ce,
	Q as J,
	T as ue,
	U as N,
	V as f,
	W as d,
	X as w,
	am as Q,
	_ as le,
	$ as ve,
	M as fe
} from '../chunks/v5j2BDPd.js';
import { s as Y, a as z, p as de } from '../chunks/Ba_0m-YY.js';
import { s as pe } from '../chunks/BoGVLIPu.js';
import { s as A } from '../chunks/CWB0CLVX.js';
function me(t, e, n, i, a) {
	oe && ce();
	var r = e.$$slots?.[n],
		s = !1;
	(r === !0 && ((r = e.children), (s = !0)), r === void 0 || r(t, s ? () => i : i));
}
const ge = () => {
		const t = pe;
		return {
			page: { subscribe: t.page.subscribe },
			navigating: { subscribe: t.navigating.subscribe },
			updated: t.updated
		};
	},
	ee = {
		subscribe(t) {
			return ge().page.subscribe(t);
		}
	};
var p,
	C,
	te,
	T,
	ne = -1,
	g = function (t) {
		addEventListener(
			'pageshow',
			function (e) {
				e.persisted && ((ne = e.timeStamp), t(e));
			},
			!0
		);
	},
	M = function () {
		return (
			window.performance &&
			performance.getEntriesByType &&
			performance.getEntriesByType('navigation')[0]
		);
	},
	x = function () {
		var t = M();
		return (t && t.activationStart) || 0;
	},
	l = function (t, e) {
		var n = M(),
			i = 'navigate';
		return (
			ne >= 0
				? (i = 'back-forward-cache')
				: n &&
					(document.prerendering || x() > 0
						? (i = 'prerender')
						: document.wasDiscarded
							? (i = 'restore')
							: n.type && (i = n.type.replace(/_/g, '-'))),
			{
				name: t,
				value: e === void 0 ? -1 : e,
				rating: 'good',
				delta: 0,
				entries: [],
				id: 'v3-'.concat(Date.now(), '-').concat(Math.floor(8999999999999 * Math.random()) + 1e12),
				navigationType: i
			}
		);
	},
	S = function (t, e, n) {
		try {
			if (PerformanceObserver.supportedEntryTypes.includes(t)) {
				var i = new PerformanceObserver(function (a) {
					Promise.resolve().then(function () {
						e(a.getEntries());
					});
				});
				return (i.observe(Object.assign({ type: t, buffered: !0 }, n || {})), i);
			}
		} catch {}
	},
	v = function (t, e, n, i) {
		var a, r;
		return function (s) {
			e.value >= 0 &&
				(s || i) &&
				((r = e.value - (a || 0)) || a === void 0) &&
				((a = e.value),
				(e.delta = r),
				(e.rating = (function (o, c) {
					return o > c[1] ? 'poor' : o > c[0] ? 'needs-improvement' : 'good';
				})(e.value, n)),
				t(e));
		};
	},
	$ = function (t) {
		requestAnimationFrame(function () {
			return requestAnimationFrame(function () {
				return t();
			});
		});
	},
	B = function (t) {
		var e = function (n) {
			(n.type !== 'pagehide' && document.visibilityState !== 'hidden') || t(n);
		};
		(addEventListener('visibilitychange', e, !0), addEventListener('pagehide', e, !0));
	},
	P = function (t) {
		var e = !1;
		return function (n) {
			e || (t(n), (e = !0));
		};
	},
	m = -1,
	H = function () {
		return document.visibilityState !== 'hidden' || document.prerendering ? 1 / 0 : 0;
	},
	L = function (t) {
		document.visibilityState === 'hidden' &&
			m > -1 &&
			((m = t.type === 'visibilitychange' ? t.timeStamp : 0), he());
	},
	q = function () {
		(addEventListener('visibilitychange', L, !0), addEventListener('prerenderingchange', L, !0));
	},
	he = function () {
		(removeEventListener('visibilitychange', L, !0),
			removeEventListener('prerenderingchange', L, !0));
	},
	F = function () {
		return (
			m < 0 &&
				((m = H()),
				q(),
				g(function () {
					setTimeout(function () {
						((m = H()), q());
					}, 0);
				})),
			{
				get firstHiddenTime() {
					return m;
				}
			}
		);
	},
	E = function (t) {
		document.prerendering
			? addEventListener(
					'prerenderingchange',
					function () {
						return t();
					},
					!0
				)
			: t();
	},
	O = [1800, 3e3],
	ae = function (t, e) {
		((e = e || {}),
			E(function () {
				var n,
					i = F(),
					a = l('FCP'),
					r = S('paint', function (s) {
						s.forEach(function (o) {
							o.name === 'first-contentful-paint' &&
								(r.disconnect(),
								o.startTime < i.firstHiddenTime &&
									((a.value = Math.max(o.startTime - x(), 0)), a.entries.push(o), n(!0)));
						});
					});
				r &&
					((n = v(t, a, O, e.reportAllChanges)),
					g(function (s) {
						((a = l('FCP')),
							(n = v(t, a, O, e.reportAllChanges)),
							$(function () {
								((a.value = performance.now() - s.timeStamp), n(!0));
							}));
					}));
			}));
	},
	V = [0.1, 0.25],
	ye = function (t, e) {
		((e = e || {}),
			ae(
				P(function () {
					var n,
						i = l('CLS', 0),
						a = 0,
						r = [],
						s = function (c) {
							(c.forEach(function (u) {
								if (!u.hadRecentInput) {
									var b = r[0],
										_ = r[r.length - 1];
									a && u.startTime - _.startTime < 1e3 && u.startTime - b.startTime < 5e3
										? ((a += u.value), r.push(u))
										: ((a = u.value), (r = [u]));
								}
							}),
								a > i.value && ((i.value = a), (i.entries = r), n()));
						},
						o = S('layout-shift', s);
					o &&
						((n = v(t, i, V, e.reportAllChanges)),
						B(function () {
							(s(o.takeRecords()), n(!0));
						}),
						g(function () {
							((a = 0),
								(i = l('CLS', 0)),
								(n = v(t, i, V, e.reportAllChanges)),
								$(function () {
									return n();
								}));
						}),
						setTimeout(n, 0));
				})
			));
	},
	y = { passive: !0, capture: !0 },
	Ce = new Date(),
	Z = function (t, e) {
		p || ((p = e), (C = t), (te = new Date()), ie(removeEventListener), re());
	},
	re = function () {
		if (C >= 0 && C < te - Ce) {
			var t = {
				entryType: 'first-input',
				name: p.type,
				target: p.target,
				cancelable: p.cancelable,
				startTime: p.timeStamp,
				processingStart: p.timeStamp + C
			};
			(T.forEach(function (e) {
				e(t);
			}),
				(T = []));
		}
	},
	be = function (t) {
		if (t.cancelable) {
			var e = (t.timeStamp > 1e12 ? new Date() : performance.now()) - t.timeStamp;
			t.type == 'pointerdown'
				? (function (n, i) {
						var a = function () {
								(Z(n, i), s());
							},
							r = function () {
								s();
							},
							s = function () {
								(removeEventListener('pointerup', a, y),
									removeEventListener('pointercancel', r, y));
							};
						(addEventListener('pointerup', a, y), addEventListener('pointercancel', r, y));
					})(e, t)
				: Z(e, t);
		}
	},
	ie = function (t) {
		['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(function (e) {
			return t(e, be, y);
		});
	},
	R = [100, 300],
	we = function (t, e) {
		((e = e || {}),
			E(function () {
				var n,
					i = F(),
					a = l('FID'),
					r = function (c) {
						c.startTime < i.firstHiddenTime &&
							((a.value = c.processingStart - c.startTime), a.entries.push(c), n(!0));
					},
					s = function (c) {
						c.forEach(r);
					},
					o = S('first-input', s);
				((n = v(t, a, R, e.reportAllChanges)),
					o &&
						B(
							P(function () {
								(s(o.takeRecords()), o.disconnect());
							})
						),
					o &&
						g(function () {
							var c;
							((a = l('FID')),
								(n = v(t, a, R, e.reportAllChanges)),
								(T = []),
								(C = -1),
								(p = null),
								ie(addEventListener),
								(c = r),
								T.push(c),
								re());
						}));
			}));
	},
	W = [2500, 4e3],
	k = {},
	Te = function (t, e) {
		((e = e || {}),
			E(function () {
				var n,
					i = F(),
					a = l('LCP'),
					r = function (c) {
						var u = c[c.length - 1];
						u &&
							u.startTime < i.firstHiddenTime &&
							((a.value = Math.max(u.startTime - x(), 0)), (a.entries = [u]), n());
					},
					s = S('largest-contentful-paint', r);
				if (s) {
					n = v(t, a, W, e.reportAllChanges);
					var o = P(function () {
						k[a.id] || (r(s.takeRecords()), s.disconnect(), (k[a.id] = !0), n(!0));
					});
					(['keydown', 'click'].forEach(function (c) {
						addEventListener(
							c,
							function () {
								return setTimeout(o, 0);
							},
							!0
						);
					}),
						B(o),
						g(function (c) {
							((a = l('LCP')),
								(n = v(t, a, W, e.reportAllChanges)),
								$(function () {
									((a.value = performance.now() - c.timeStamp), (k[a.id] = !0), n(!0));
								}));
						}));
				}
			}));
	},
	U = [800, 1800],
	Le = function t(e) {
		document.prerendering
			? E(function () {
					return t(e);
				})
			: document.readyState !== 'complete'
				? addEventListener(
						'load',
						function () {
							return t(e);
						},
						!0
					)
				: setTimeout(e, 0);
	},
	xe = function (t, e) {
		e = e || {};
		var n = l('TTFB'),
			i = v(t, n, U, e.reportAllChanges);
		Le(function () {
			var a = M();
			if (a) {
				var r = a.responseStart;
				if (r <= 0 || r > performance.now()) return;
				((n.value = Math.max(r - x(), 0)),
					(n.entries = [a]),
					i(!0),
					g(function () {
						((n = l('TTFB', 0)), (i = v(t, n, U, e.reportAllChanges))(!0));
					}));
			}
		});
	};
const j = 'https://vitals.vercel-analytics.com/v1/vitals';
function Se() {
	return navigator?.connection?.effectiveType ?? '';
}
function h(t, e) {
	const n = Object.entries(e.params).reduce((r, [s, o]) => r.replace(o, `[${s}]`), e.path),
		i = {
			dsn: e.analyticsId,
			id: t.id,
			page: n,
			href: location.href,
			event_name: t.name,
			value: t.value.toString(),
			speed: Se()
		};
	e.debug && console.log('[Web Vitals]', t.name, JSON.stringify(i, null, 2));
	const a = new Blob([new URLSearchParams(i).toString()], {
		type: 'application/x-www-form-urlencoded'
	});
	navigator.sendBeacon
		? navigator.sendBeacon(j, a)
		: fetch(j, { body: a, method: 'POST', credentials: 'omit', keepalive: !0 });
}
function Ee(t) {
	try {
		(console.log(`[Web Vitals] for page ${t.path}`),
			we((e) => h(e, t)),
			xe((e) => h(e, t)),
			Te((e) => h(e, t)),
			ye((e) => h(e, t)),
			ae((e) => h(e, t)));
	} catch (e) {
		console.error(`[Web Vitals] for page ${t.path}`, e);
	}
}
const _e =
		"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.1566,22.8189c-10.4-14.8851-30.94-19.2971-45.7914-9.8348L22.2825,29.6078A29.9234,29.9234,0,0,0,8.7639,49.6506a31.5136,31.5136,0,0,0,3.1076,20.2318A30.0061,30.0061,0,0,0,7.3953,81.0653a31.8886,31.8886,0,0,0,5.4473,24.1157c10.4022,14.8865,30.9423,19.2966,45.7914,9.8348L84.7167,98.3921A29.9177,29.9177,0,0,0,98.2353,78.3493,31.5263,31.5263,0,0,0,95.13,58.117a30,30,0,0,0,4.4743-11.1824,31.88,31.88,0,0,0-5.4473-24.1157'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.8171,106.5815A20.7182,20.7182,0,0,1,23.58,98.3389a19.1739,19.1739,0,0,1-3.2766-14.5025,18.1886,18.1886,0,0,1,.6233-2.4357l.4912-1.4978,1.3363.9815a33.6443,33.6443,0,0,0,10.203,5.0978l.9694.2941-.0893.9675a5.8474,5.8474,0,0,0,1.052,3.8781,6.2389,6.2389,0,0,0,6.6952,2.485,5.7449,5.7449,0,0,0,1.6021-.7041L69.27,76.281a5.4306,5.4306,0,0,0,2.4506-3.631,5.7948,5.7948,0,0,0-.9875-4.3712,6.2436,6.2436,0,0,0-6.6978-2.4864,5.7427,5.7427,0,0,0-1.6.7036l-9.9532,6.3449a19.0329,19.0329,0,0,1-5.2965,2.3259,20.7181,20.7181,0,0,1-22.2368-8.2427,19.1725,19.1725,0,0,1-3.2766-14.5024,17.9885,17.9885,0,0,1,8.13-12.0513L55.8833,23.7472a19.0038,19.0038,0,0,1,5.3-2.3287A20.7182,20.7182,0,0,1,83.42,29.6611a19.1739,19.1739,0,0,1,3.2766,14.5025,18.4,18.4,0,0,1-.6233,2.4357l-.4912,1.4978-1.3356-.98a33.6175,33.6175,0,0,0-10.2037-5.1l-.9694-.2942.0893-.9675a5.8588,5.8588,0,0,0-1.052-3.878,6.2389,6.2389,0,0,0-6.6952-2.485,5.7449,5.7449,0,0,0-1.6021.7041L37.73,51.719a5.4218,5.4218,0,0,0-2.4487,3.63,5.7862,5.7862,0,0,0,.9856,4.3717,6.2437,6.2437,0,0,0,6.6978,2.4864,5.7652,5.7652,0,0,0,1.602-.7041l9.9519-6.3425a18.978,18.978,0,0,1,5.2959-2.3278,20.7181,20.7181,0,0,1,22.2368,8.2427,19.1725,19.1725,0,0,1,3.2766,14.5024,17.9977,17.9977,0,0,1-8.13,12.0532L51.1167,104.2528a19.0038,19.0038,0,0,1-5.3,2.3287'%20style='fill:%23fff'/%3e%3c/svg%3e",
	Ae =
		"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='-3%20-3%2030%2030'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M12%202C6.47715%202%202%206.47715%202%2012C2%2017.5229%206.47715%2022%2012%2022C17.5229%2022%2022%2017.5229%2022%2012C22%206.47715%2017.5229%202%2012%202ZM0%2012C0%205.3726%205.3726%200%2012%200C18.6274%200%2024%205.3726%2024%2012C24%2018.6274%2018.6274%2024%2012%2024C5.3726%2024%200%2018.6274%200%2012Z'%20fill='rgba(0,0,0,0.7)'%20stroke='none'%20/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.59162%2022.7357C9.49492%2022.6109%209.49492%2021.4986%209.59162%2019.399C8.55572%2019.4347%207.90122%2019.3628%207.62812%2019.1833C7.21852%2018.9139%206.80842%2018.0833%206.44457%2017.4979C6.08072%2016.9125%205.27312%2016.8199%204.94702%2016.6891C4.62091%2016.5582%204.53905%2016.0247%205.84562%2016.4282C7.15222%2016.8316%207.21592%2017.9303%207.62812%2018.1872C8.04032%2018.4441%209.02572%2018.3317%209.47242%2018.1259C9.91907%2017.9201%209.88622%2017.1538%209.96587%2016.8503C10.0666%2016.5669%209.71162%2016.5041%209.70382%2016.5018C9.26777%2016.5018%206.97697%2016.0036%206.34772%2013.7852C5.71852%2011.5669%206.52907%2010.117%206.96147%209.49369C7.24972%209.07814%207.22422%208.19254%206.88497%206.83679C8.11677%206.67939%209.06732%207.06709%209.73672%207.99999C9.73737%208.00534%2010.6143%207.47854%2012.0001%207.47854C13.386%207.47854%2013.8777%207.90764%2014.2571%207.99999C14.6365%208.09234%2014.94%206.36699%2017.2834%206.83679C16.7942%207.79839%2016.3844%208.99999%2016.6972%209.49369C17.0099%209.98739%2018.2372%2011.5573%2017.4833%2013.7852C16.9807%2015.2706%2015.9927%2016.1761%2014.5192%2016.5018C14.3502%2016.5557%2014.2658%2016.6427%2014.2658%2016.7627C14.2658%2016.9427%2014.4942%2016.9624%2014.8233%2017.8058C15.0426%2018.368%2015.0585%2019.9739%2014.8708%2022.6234C14.3953%2022.7445%2014.0254%2022.8257%2013.7611%2022.8673C13.2924%2022.9409%2012.7835%2022.9822%2012.2834%2022.9982C11.7834%2023.0141%2011.6098%2023.0123%2010.9185%2022.948C10.4577%2022.9051%2010.0154%2022.8343%209.59162%2022.7357Z'%20fill='rgba(0,0,0,0.7)'%20stroke='none'%20/%3e%3c/svg%3e";
var ke = K(
	'<header class="svelte-vny38x"><div class="corner svelte-vny38x"><a href="https://kit.svelte.dev" class="svelte-vny38x"><img alt="SvelteKit" class="svelte-vny38x"/></a></div> <nav class="svelte-vny38x"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-vny38x"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-vny38x"></path></svg> <ul class="svelte-vny38x"><li class="svelte-vny38x"><a href="/" class="svelte-vny38x">Home</a></li></ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-vny38x"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-vny38x"></path></svg></nav> <div class="corner svelte-vny38x"><a href="https://github.com/eengineerc" class="svelte-vny38x"><img alt="GitHub" class="svelte-vny38x"/></a></div></header>'
);
function Me(t, e) {
	J(e, !1);
	const n = () => z(ee, '$page', i),
		[i, a] = Y();
	G();
	var r = ke(),
		s = f(r),
		o = f(s),
		c = f(o);
	(d(o), d(s));
	var u = w(s, 2),
		b = w(f(u), 2),
		_ = f(b);
	(d(b), Q(2), d(u));
	var D = w(u, 2),
		I = f(D),
		se = f(I);
	(d(I),
		d(D),
		d(r),
		ue(() => {
			(A(c, 'src', _e),
				A(_, 'aria-current', n().url.pathname === '/' ? 'page' : void 0),
				A(se, 'src', Ae));
		}),
		X(t, r),
		N(),
		a());
}
var $e = K(
	'<div class="app svelte-12qhfyh"><!> <main class="svelte-12qhfyh"><!></main> <footer class="svelte-12qhfyh"><p>visit <a href="https://kit.svelte.dev" class="svelte-12qhfyh">kit.svelte.dev</a> to learn SvelteKit</p></footer></div>'
);
function qe(t, e) {
	J(e, !1);
	const n = () => z(ee, '$page', i),
		[i, a] = Y();
	let r = de(e, 'data', 8);
	(le(
		() => (fe(r()), n()),
		() => {
			r()?.analyticsId &&
				Ee({ path: n().url.pathname, params: n().params, analyticsId: r().analyticsId });
		}
	),
		ve(),
		G());
	var s = $e(),
		o = f(s);
	Me(o, {});
	var c = w(o, 2),
		u = f(c);
	(me(u, e, 'default', {}), d(c), Q(2), d(s), X(t, s), N(), a());
}
export { qe as component };
