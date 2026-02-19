import { f as Kh, a as Xh } from './DrVC7uez.js';
import { i as Qh } from './Ss1HFBS8.js';
import {
	Q as Jh,
	Z as Zh,
	U as td,
	k as ir,
	m as ed,
	V as nd,
	l as id,
	W as sd
} from './v5j2BDPd.js';
import { b as od } from './Ct5jITvR.js';
import { p as rd } from './Ba_0m-YY.js';
var sr = {};
const bl = { NODE_ADMIN: !1, SDK_VERSION: '${JSCORE_VERSION}' };
const w = function (n, t) {
		if (!n) throw Ke(t);
	},
	Ke = function (n) {
		return new Error('Firebase Database (' + bl.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + n);
	};
const yl = function (n) {
		const t = [];
		let e = 0;
		for (let i = 0; i < n.length; i++) {
			let s = n.charCodeAt(i);
			s < 128
				? (t[e++] = s)
				: s < 2048
					? ((t[e++] = (s >> 6) | 192), (t[e++] = (s & 63) | 128))
					: (s & 64512) === 55296 && i + 1 < n.length && (n.charCodeAt(i + 1) & 64512) === 56320
						? ((s = 65536 + ((s & 1023) << 10) + (n.charCodeAt(++i) & 1023)),
							(t[e++] = (s >> 18) | 240),
							(t[e++] = ((s >> 12) & 63) | 128),
							(t[e++] = ((s >> 6) & 63) | 128),
							(t[e++] = (s & 63) | 128))
						: ((t[e++] = (s >> 12) | 224),
							(t[e++] = ((s >> 6) & 63) | 128),
							(t[e++] = (s & 63) | 128));
		}
		return t;
	},
	ad = function (n) {
		const t = [];
		let e = 0,
			i = 0;
		for (; e < n.length; ) {
			const s = n[e++];
			if (s < 128) t[i++] = String.fromCharCode(s);
			else if (s > 191 && s < 224) {
				const o = n[e++];
				t[i++] = String.fromCharCode(((s & 31) << 6) | (o & 63));
			} else if (s > 239 && s < 365) {
				const o = n[e++],
					r = n[e++],
					a = n[e++],
					l = (((s & 7) << 18) | ((o & 63) << 12) | ((r & 63) << 6) | (a & 63)) - 65536;
				((t[i++] = String.fromCharCode(55296 + (l >> 10))),
					(t[i++] = String.fromCharCode(56320 + (l & 1023))));
			} else {
				const o = n[e++],
					r = n[e++];
				t[i++] = String.fromCharCode(((s & 15) << 12) | ((o & 63) << 6) | (r & 63));
			}
		}
		return t.join('');
	},
	oo = {
		byteToCharMap_: null,
		charToByteMap_: null,
		byteToCharMapWebSafe_: null,
		charToByteMapWebSafe_: null,
		ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
		get ENCODED_VALS() {
			return this.ENCODED_VALS_BASE + '+/=';
		},
		get ENCODED_VALS_WEBSAFE() {
			return this.ENCODED_VALS_BASE + '-_.';
		},
		HAS_NATIVE_SUPPORT: typeof atob == 'function',
		encodeByteArray(n, t) {
			if (!Array.isArray(n)) throw Error('encodeByteArray takes an array as a parameter');
			this.init_();
			const e = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
				i = [];
			for (let s = 0; s < n.length; s += 3) {
				const o = n[s],
					r = s + 1 < n.length,
					a = r ? n[s + 1] : 0,
					l = s + 2 < n.length,
					c = l ? n[s + 2] : 0,
					h = o >> 2,
					d = ((o & 3) << 4) | (a >> 4);
				let u = ((a & 15) << 2) | (c >> 6),
					f = c & 63;
				(l || ((f = 64), r || (u = 64)), i.push(e[h], e[d], e[u], e[f]));
			}
			return i.join('');
		},
		encodeString(n, t) {
			return this.HAS_NATIVE_SUPPORT && !t ? btoa(n) : this.encodeByteArray(yl(n), t);
		},
		decodeString(n, t) {
			return this.HAS_NATIVE_SUPPORT && !t ? atob(n) : ad(this.decodeStringToByteArray(n, t));
		},
		decodeStringToByteArray(n, t) {
			this.init_();
			const e = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
				i = [];
			for (let s = 0; s < n.length; ) {
				const o = e[n.charAt(s++)],
					a = s < n.length ? e[n.charAt(s)] : 0;
				++s;
				const c = s < n.length ? e[n.charAt(s)] : 64;
				++s;
				const d = s < n.length ? e[n.charAt(s)] : 64;
				if ((++s, o == null || a == null || c == null || d == null)) throw new ld();
				const u = (o << 2) | (a >> 4);
				if ((i.push(u), c !== 64)) {
					const f = ((a << 4) & 240) | (c >> 2);
					if ((i.push(f), d !== 64)) {
						const g = ((c << 6) & 192) | d;
						i.push(g);
					}
				}
			}
			return i;
		},
		init_() {
			if (!this.byteToCharMap_) {
				((this.byteToCharMap_ = {}),
					(this.charToByteMap_ = {}),
					(this.byteToCharMapWebSafe_ = {}),
					(this.charToByteMapWebSafe_ = {}));
				for (let n = 0; n < this.ENCODED_VALS.length; n++)
					((this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n)),
						(this.charToByteMap_[this.byteToCharMap_[n]] = n),
						(this.byteToCharMapWebSafe_[n] = this.ENCODED_VALS_WEBSAFE.charAt(n)),
						(this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n),
						n >= this.ENCODED_VALS_BASE.length &&
							((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n),
							(this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n)));
			}
		}
	};
class ld extends Error {
	constructor() {
		(super(...arguments), (this.name = 'DecodeBase64StringError'));
	}
}
const xl = function (n) {
		const t = yl(n);
		return oo.encodeByteArray(t, !0);
	},
	bi = function (n) {
		return xl(n).replace(/\./g, '');
	},
	Ds = function (n) {
		try {
			return oo.decodeString(n, !0);
		} catch (t) {
			console.error('base64Decode failed: ', t);
		}
		return null;
	};
function cd(n) {
	return vl(void 0, n);
}
function vl(n, t) {
	if (!(t instanceof Object)) return t;
	switch (t.constructor) {
		case Date:
			const e = t;
			return new Date(e.getTime());
		case Object:
			n === void 0 && (n = {});
			break;
		case Array:
			n = [];
			break;
		default:
			return t;
	}
	for (const e in t) !t.hasOwnProperty(e) || !hd(e) || (n[e] = vl(n[e], t[e]));
	return n;
}
function hd(n) {
	return n !== '__proto__';
}
function dd() {
	if (typeof self < 'u') return self;
	if (typeof window < 'u') return window;
	if (typeof global < 'u') return global;
	throw new Error('Unable to locate global object.');
}
const ud = () => dd().__FIREBASE_DEFAULTS__,
	fd = () => {
		if (typeof process > 'u' || typeof sr > 'u') return;
		const n = sr.__FIREBASE_DEFAULTS__;
		if (n) return JSON.parse(n);
	},
	gd = () => {
		if (typeof document > 'u') return;
		let n;
		try {
			n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
		} catch {
			return;
		}
		const t = n && Ds(n[1]);
		return t && JSON.parse(t);
	},
	wl = () => {
		try {
			return ud() || fd() || gd();
		} catch (n) {
			console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
			return;
		}
	},
	pd = (n) => {
		var t, e;
		return (e = (t = wl()) === null || t === void 0 ? void 0 : t.emulatorHosts) === null ||
			e === void 0
			? void 0
			: e[n];
	},
	md = (n) => {
		const t = pd(n);
		if (!t) return;
		const e = t.lastIndexOf(':');
		if (e <= 0 || e + 1 === t.length)
			throw new Error(`Invalid host ${t} with no separate hostname and port!`);
		const i = parseInt(t.substring(e + 1), 10);
		return t[0] === '[' ? [t.substring(1, e - 1), i] : [t.substring(0, e), i];
	},
	Cl = () => {
		var n;
		return (n = wl()) === null || n === void 0 ? void 0 : n.config;
	};
class ji {
	constructor() {
		((this.reject = () => {}),
			(this.resolve = () => {}),
			(this.promise = new Promise((t, e) => {
				((this.resolve = t), (this.reject = e));
			})));
	}
	wrapCallback(t) {
		return (e, i) => {
			(e ? this.reject(e) : this.resolve(i),
				typeof t == 'function' && (this.promise.catch(() => {}), t.length === 1 ? t(e) : t(e, i)));
		};
	}
}
function _d(n, t) {
	if (n.uid)
		throw new Error(
			'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
		);
	const e = { alg: 'none', type: 'JWT' },
		i = t || 'demo-project',
		s = n.iat || 0,
		o = n.sub || n.user_id;
	if (!o) throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
	const r = Object.assign(
		{
			iss: `https://securetoken.google.com/${i}`,
			aud: i,
			iat: s,
			exp: s + 3600,
			auth_time: s,
			sub: o,
			user_id: o,
			firebase: { sign_in_provider: 'custom', identities: {} }
		},
		n
	);
	return [bi(JSON.stringify(e)), bi(JSON.stringify(r)), ''].join('.');
}
function bd() {
	return typeof navigator < 'u' && typeof navigator.userAgent == 'string'
		? navigator.userAgent
		: '';
}
function Sl() {
	return (
		typeof window < 'u' &&
		!!(window.cordova || window.phonegap || window.PhoneGap) &&
		/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(bd())
	);
}
function yd() {
	return typeof navigator == 'object' && navigator.product === 'ReactNative';
}
function xd() {
	return bl.NODE_ADMIN === !0;
}
function vd() {
	try {
		return typeof indexedDB == 'object';
	} catch {
		return !1;
	}
}
function wd() {
	return new Promise((n, t) => {
		try {
			let e = !0;
			const i = 'validate-browser-context-for-indexeddb-analytics-module',
				s = self.indexedDB.open(i);
			((s.onsuccess = () => {
				(s.result.close(), e || self.indexedDB.deleteDatabase(i), n(!0));
			}),
				(s.onupgradeneeded = () => {
					e = !1;
				}),
				(s.onerror = () => {
					var o;
					t(((o = s.error) === null || o === void 0 ? void 0 : o.message) || '');
				}));
		} catch (e) {
			t(e);
		}
	});
}
const Cd = 'FirebaseError';
class jn extends Error {
	constructor(t, e, i) {
		(super(e),
			(this.code = t),
			(this.customData = i),
			(this.name = Cd),
			Object.setPrototypeOf(this, jn.prototype),
			Error.captureStackTrace && Error.captureStackTrace(this, El.prototype.create));
	}
}
class El {
	constructor(t, e, i) {
		((this.service = t), (this.serviceName = e), (this.errors = i));
	}
	create(t, ...e) {
		const i = e[0] || {},
			s = `${this.service}/${t}`,
			o = this.errors[t],
			r = o ? Sd(o, i) : 'Error',
			a = `${this.serviceName}: ${r} (${s}).`;
		return new jn(s, a, i);
	}
}
function Sd(n, t) {
	return n.replace(Ed, (e, i) => {
		const s = t[i];
		return s != null ? String(s) : `<${i}?>`;
	});
}
const Ed = /\{\$([^}]+)}/g;
function En(n) {
	return JSON.parse(n);
}
function tt(n) {
	return JSON.stringify(n);
}
const kl = function (n) {
		let t = {},
			e = {},
			i = {},
			s = '';
		try {
			const o = n.split('.');
			((t = En(Ds(o[0]) || '')), (e = En(Ds(o[1]) || '')), (s = o[2]), (i = e.d || {}), delete e.d);
		} catch {}
		return { header: t, claims: e, data: i, signature: s };
	},
	kd = function (n) {
		const t = kl(n),
			e = t.claims;
		return !!e && typeof e == 'object' && e.hasOwnProperty('iat');
	},
	Td = function (n) {
		const t = kl(n).claims;
		return typeof t == 'object' && t.admin === !0;
	};
function Ut(n, t) {
	return Object.prototype.hasOwnProperty.call(n, t);
}
function He(n, t) {
	if (Object.prototype.hasOwnProperty.call(n, t)) return n[t];
}
function or(n) {
	for (const t in n) if (Object.prototype.hasOwnProperty.call(n, t)) return !1;
	return !0;
}
function yi(n, t, e) {
	const i = {};
	for (const s in n) Object.prototype.hasOwnProperty.call(n, s) && (i[s] = t.call(e, n[s], s, n));
	return i;
}
function As(n, t) {
	if (n === t) return !0;
	const e = Object.keys(n),
		i = Object.keys(t);
	for (const s of e) {
		if (!i.includes(s)) return !1;
		const o = n[s],
			r = t[s];
		if (rr(o) && rr(r)) {
			if (!As(o, r)) return !1;
		} else if (o !== r) return !1;
	}
	for (const s of i) if (!e.includes(s)) return !1;
	return !0;
}
function rr(n) {
	return n !== null && typeof n == 'object';
}
function Id(n) {
	const t = [];
	for (const [e, i] of Object.entries(n))
		Array.isArray(i)
			? i.forEach((s) => {
					t.push(encodeURIComponent(e) + '=' + encodeURIComponent(s));
				})
			: t.push(encodeURIComponent(e) + '=' + encodeURIComponent(i));
	return t.length ? '&' + t.join('&') : '';
}
class Md {
	constructor() {
		((this.chain_ = []),
			(this.buf_ = []),
			(this.W_ = []),
			(this.pad_ = []),
			(this.inbuf_ = 0),
			(this.total_ = 0),
			(this.blockSize = 512 / 8),
			(this.pad_[0] = 128));
		for (let t = 1; t < this.blockSize; ++t) this.pad_[t] = 0;
		this.reset();
	}
	reset() {
		((this.chain_[0] = 1732584193),
			(this.chain_[1] = 4023233417),
			(this.chain_[2] = 2562383102),
			(this.chain_[3] = 271733878),
			(this.chain_[4] = 3285377520),
			(this.inbuf_ = 0),
			(this.total_ = 0));
	}
	compress_(t, e) {
		e || (e = 0);
		const i = this.W_;
		if (typeof t == 'string')
			for (let d = 0; d < 16; d++)
				((i[d] =
					(t.charCodeAt(e) << 24) |
					(t.charCodeAt(e + 1) << 16) |
					(t.charCodeAt(e + 2) << 8) |
					t.charCodeAt(e + 3)),
					(e += 4));
		else
			for (let d = 0; d < 16; d++)
				((i[d] = (t[e] << 24) | (t[e + 1] << 16) | (t[e + 2] << 8) | t[e + 3]), (e += 4));
		for (let d = 16; d < 80; d++) {
			const u = i[d - 3] ^ i[d - 8] ^ i[d - 14] ^ i[d - 16];
			i[d] = ((u << 1) | (u >>> 31)) & 4294967295;
		}
		let s = this.chain_[0],
			o = this.chain_[1],
			r = this.chain_[2],
			a = this.chain_[3],
			l = this.chain_[4],
			c,
			h;
		for (let d = 0; d < 80; d++) {
			d < 40
				? d < 20
					? ((c = a ^ (o & (r ^ a))), (h = 1518500249))
					: ((c = o ^ r ^ a), (h = 1859775393))
				: d < 60
					? ((c = (o & r) | (a & (o | r))), (h = 2400959708))
					: ((c = o ^ r ^ a), (h = 3395469782));
			const u = (((s << 5) | (s >>> 27)) + c + l + h + i[d]) & 4294967295;
			((l = a), (a = r), (r = ((o << 30) | (o >>> 2)) & 4294967295), (o = s), (s = u));
		}
		((this.chain_[0] = (this.chain_[0] + s) & 4294967295),
			(this.chain_[1] = (this.chain_[1] + o) & 4294967295),
			(this.chain_[2] = (this.chain_[2] + r) & 4294967295),
			(this.chain_[3] = (this.chain_[3] + a) & 4294967295),
			(this.chain_[4] = (this.chain_[4] + l) & 4294967295));
	}
	update(t, e) {
		if (t == null) return;
		e === void 0 && (e = t.length);
		const i = e - this.blockSize;
		let s = 0;
		const o = this.buf_;
		let r = this.inbuf_;
		for (; s < e; ) {
			if (r === 0) for (; s <= i; ) (this.compress_(t, s), (s += this.blockSize));
			if (typeof t == 'string') {
				for (; s < e; )
					if (((o[r] = t.charCodeAt(s)), ++r, ++s, r === this.blockSize)) {
						(this.compress_(o), (r = 0));
						break;
					}
			} else
				for (; s < e; )
					if (((o[r] = t[s]), ++r, ++s, r === this.blockSize)) {
						(this.compress_(o), (r = 0));
						break;
					}
		}
		((this.inbuf_ = r), (this.total_ += e));
	}
	digest() {
		const t = [];
		let e = this.total_ * 8;
		this.inbuf_ < 56
			? this.update(this.pad_, 56 - this.inbuf_)
			: this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
		for (let s = this.blockSize - 1; s >= 56; s--) ((this.buf_[s] = e & 255), (e /= 256));
		this.compress_(this.buf_);
		let i = 0;
		for (let s = 0; s < 5; s++)
			for (let o = 24; o >= 0; o -= 8) ((t[i] = (this.chain_[s] >> o) & 255), ++i);
		return t;
	}
}
function ro(n, t) {
	return `${n} failed: ${t} argument `;
}
const Pd = function (n) {
		const t = [];
		let e = 0;
		for (let i = 0; i < n.length; i++) {
			let s = n.charCodeAt(i);
			if (s >= 55296 && s <= 56319) {
				const o = s - 55296;
				(i++, w(i < n.length, 'Surrogate pair missing trail surrogate.'));
				const r = n.charCodeAt(i) - 56320;
				s = 65536 + (o << 10) + r;
			}
			s < 128
				? (t[e++] = s)
				: s < 2048
					? ((t[e++] = (s >> 6) | 192), (t[e++] = (s & 63) | 128))
					: s < 65536
						? ((t[e++] = (s >> 12) | 224),
							(t[e++] = ((s >> 6) & 63) | 128),
							(t[e++] = (s & 63) | 128))
						: ((t[e++] = (s >> 18) | 240),
							(t[e++] = ((s >> 12) & 63) | 128),
							(t[e++] = ((s >> 6) & 63) | 128),
							(t[e++] = (s & 63) | 128));
		}
		return t;
	},
	Ui = function (n) {
		let t = 0;
		for (let e = 0; e < n.length; e++) {
			const i = n.charCodeAt(e);
			i < 128 ? t++ : i < 2048 ? (t += 2) : i >= 55296 && i <= 56319 ? ((t += 4), e++) : (t += 3);
		}
		return t;
	};
function Xe(n) {
	return n && n._delegate ? n._delegate : n;
}
class kn {
	constructor(t, e, i) {
		((this.name = t),
			(this.instanceFactory = e),
			(this.type = i),
			(this.multipleInstances = !1),
			(this.serviceProps = {}),
			(this.instantiationMode = 'LAZY'),
			(this.onInstanceCreated = null));
	}
	setInstantiationMode(t) {
		return ((this.instantiationMode = t), this);
	}
	setMultipleInstances(t) {
		return ((this.multipleInstances = t), this);
	}
	setServiceProps(t) {
		return ((this.serviceProps = t), this);
	}
	setInstanceCreatedCallback(t) {
		return ((this.onInstanceCreated = t), this);
	}
}
const ge = '[DEFAULT]';
class Dd {
	constructor(t, e) {
		((this.name = t),
			(this.container = e),
			(this.component = null),
			(this.instances = new Map()),
			(this.instancesDeferred = new Map()),
			(this.instancesOptions = new Map()),
			(this.onInitCallbacks = new Map()));
	}
	get(t) {
		const e = this.normalizeInstanceIdentifier(t);
		if (!this.instancesDeferred.has(e)) {
			const i = new ji();
			if ((this.instancesDeferred.set(e, i), this.isInitialized(e) || this.shouldAutoInitialize()))
				try {
					const s = this.getOrInitializeService({ instanceIdentifier: e });
					s && i.resolve(s);
				} catch {}
		}
		return this.instancesDeferred.get(e).promise;
	}
	getImmediate(t) {
		var e;
		const i = this.normalizeInstanceIdentifier(t?.identifier),
			s = (e = t?.optional) !== null && e !== void 0 ? e : !1;
		if (this.isInitialized(i) || this.shouldAutoInitialize())
			try {
				return this.getOrInitializeService({ instanceIdentifier: i });
			} catch (o) {
				if (s) return null;
				throw o;
			}
		else {
			if (s) return null;
			throw Error(`Service ${this.name} is not available`);
		}
	}
	getComponent() {
		return this.component;
	}
	setComponent(t) {
		if (t.name !== this.name)
			throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
		if (this.component) throw Error(`Component for ${this.name} has already been provided`);
		if (((this.component = t), !!this.shouldAutoInitialize())) {
			if (Rd(t))
				try {
					this.getOrInitializeService({ instanceIdentifier: ge });
				} catch {}
			for (const [e, i] of this.instancesDeferred.entries()) {
				const s = this.normalizeInstanceIdentifier(e);
				try {
					const o = this.getOrInitializeService({ instanceIdentifier: s });
					i.resolve(o);
				} catch {}
			}
		}
	}
	clearInstance(t = ge) {
		(this.instancesDeferred.delete(t), this.instancesOptions.delete(t), this.instances.delete(t));
	}
	async delete() {
		const t = Array.from(this.instances.values());
		await Promise.all([
			...t.filter((e) => 'INTERNAL' in e).map((e) => e.INTERNAL.delete()),
			...t.filter((e) => '_delete' in e).map((e) => e._delete())
		]);
	}
	isComponentSet() {
		return this.component != null;
	}
	isInitialized(t = ge) {
		return this.instances.has(t);
	}
	getOptions(t = ge) {
		return this.instancesOptions.get(t) || {};
	}
	initialize(t = {}) {
		const { options: e = {} } = t,
			i = this.normalizeInstanceIdentifier(t.instanceIdentifier);
		if (this.isInitialized(i)) throw Error(`${this.name}(${i}) has already been initialized`);
		if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
		const s = this.getOrInitializeService({ instanceIdentifier: i, options: e });
		for (const [o, r] of this.instancesDeferred.entries()) {
			const a = this.normalizeInstanceIdentifier(o);
			i === a && r.resolve(s);
		}
		return s;
	}
	onInit(t, e) {
		var i;
		const s = this.normalizeInstanceIdentifier(e),
			o = (i = this.onInitCallbacks.get(s)) !== null && i !== void 0 ? i : new Set();
		(o.add(t), this.onInitCallbacks.set(s, o));
		const r = this.instances.get(s);
		return (
			r && t(r, s),
			() => {
				o.delete(t);
			}
		);
	}
	invokeOnInitCallbacks(t, e) {
		const i = this.onInitCallbacks.get(e);
		if (i)
			for (const s of i)
				try {
					s(t, e);
				} catch {}
	}
	getOrInitializeService({ instanceIdentifier: t, options: e = {} }) {
		let i = this.instances.get(t);
		if (
			!i &&
			this.component &&
			((i = this.component.instanceFactory(this.container, {
				instanceIdentifier: Ad(t),
				options: e
			})),
			this.instances.set(t, i),
			this.instancesOptions.set(t, e),
			this.invokeOnInitCallbacks(i, t),
			this.component.onInstanceCreated)
		)
			try {
				this.component.onInstanceCreated(this.container, t, i);
			} catch {}
		return i || null;
	}
	normalizeInstanceIdentifier(t = ge) {
		return this.component ? (this.component.multipleInstances ? t : ge) : t;
	}
	shouldAutoInitialize() {
		return !!this.component && this.component.instantiationMode !== 'EXPLICIT';
	}
}
function Ad(n) {
	return n === ge ? void 0 : n;
}
function Rd(n) {
	return n.instantiationMode === 'EAGER';
}
class Od {
	constructor(t) {
		((this.name = t), (this.providers = new Map()));
	}
	addComponent(t) {
		const e = this.getProvider(t.name);
		if (e.isComponentSet())
			throw new Error(`Component ${t.name} has already been registered with ${this.name}`);
		e.setComponent(t);
	}
	addOrOverwriteComponent(t) {
		(this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
			this.addComponent(t));
	}
	getProvider(t) {
		if (this.providers.has(t)) return this.providers.get(t);
		const e = new Dd(t, this);
		return (this.providers.set(t, e), e);
	}
	getProviders() {
		return Array.from(this.providers.values());
	}
}
var H;
(function (n) {
	((n[(n.DEBUG = 0)] = 'DEBUG'),
		(n[(n.VERBOSE = 1)] = 'VERBOSE'),
		(n[(n.INFO = 2)] = 'INFO'),
		(n[(n.WARN = 3)] = 'WARN'),
		(n[(n.ERROR = 4)] = 'ERROR'),
		(n[(n.SILENT = 5)] = 'SILENT'));
})(H || (H = {}));
const Nd = {
		debug: H.DEBUG,
		verbose: H.VERBOSE,
		info: H.INFO,
		warn: H.WARN,
		error: H.ERROR,
		silent: H.SILENT
	},
	Ld = H.INFO,
	Fd = {
		[H.DEBUG]: 'log',
		[H.VERBOSE]: 'log',
		[H.INFO]: 'info',
		[H.WARN]: 'warn',
		[H.ERROR]: 'error'
	},
	Bd = (n, t, ...e) => {
		if (t < n.logLevel) return;
		const i = new Date().toISOString(),
			s = Fd[t];
		if (s) console[s](`[${i}]  ${n.name}:`, ...e);
		else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
	};
class Tl {
	constructor(t) {
		((this.name = t),
			(this._logLevel = Ld),
			(this._logHandler = Bd),
			(this._userLogHandler = null));
	}
	get logLevel() {
		return this._logLevel;
	}
	set logLevel(t) {
		if (!(t in H)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
		this._logLevel = t;
	}
	setLogLevel(t) {
		this._logLevel = typeof t == 'string' ? Nd[t] : t;
	}
	get logHandler() {
		return this._logHandler;
	}
	set logHandler(t) {
		if (typeof t != 'function')
			throw new TypeError('Value assigned to `logHandler` must be a function');
		this._logHandler = t;
	}
	get userLogHandler() {
		return this._userLogHandler;
	}
	set userLogHandler(t) {
		this._userLogHandler = t;
	}
	debug(...t) {
		(this._userLogHandler && this._userLogHandler(this, H.DEBUG, ...t),
			this._logHandler(this, H.DEBUG, ...t));
	}
	log(...t) {
		(this._userLogHandler && this._userLogHandler(this, H.VERBOSE, ...t),
			this._logHandler(this, H.VERBOSE, ...t));
	}
	info(...t) {
		(this._userLogHandler && this._userLogHandler(this, H.INFO, ...t),
			this._logHandler(this, H.INFO, ...t));
	}
	warn(...t) {
		(this._userLogHandler && this._userLogHandler(this, H.WARN, ...t),
			this._logHandler(this, H.WARN, ...t));
	}
	error(...t) {
		(this._userLogHandler && this._userLogHandler(this, H.ERROR, ...t),
			this._logHandler(this, H.ERROR, ...t));
	}
}
const Wd = (n, t) => t.some((e) => n instanceof e);
let ar, lr;
function zd() {
	return ar || (ar = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function Vd() {
	return (
		lr ||
		(lr = [
			IDBCursor.prototype.advance,
			IDBCursor.prototype.continue,
			IDBCursor.prototype.continuePrimaryKey
		])
	);
}
const Il = new WeakMap(),
	Rs = new WeakMap(),
	Ml = new WeakMap(),
	as = new WeakMap(),
	ao = new WeakMap();
function Hd(n) {
	const t = new Promise((e, i) => {
		const s = () => {
				(n.removeEventListener('success', o), n.removeEventListener('error', r));
			},
			o = () => {
				(e(Xt(n.result)), s());
			},
			r = () => {
				(i(n.error), s());
			};
		(n.addEventListener('success', o), n.addEventListener('error', r));
	});
	return (
		t
			.then((e) => {
				e instanceof IDBCursor && Il.set(e, n);
			})
			.catch(() => {}),
		ao.set(t, n),
		t
	);
}
function jd(n) {
	if (Rs.has(n)) return;
	const t = new Promise((e, i) => {
		const s = () => {
				(n.removeEventListener('complete', o),
					n.removeEventListener('error', r),
					n.removeEventListener('abort', r));
			},
			o = () => {
				(e(), s());
			},
			r = () => {
				(i(n.error || new DOMException('AbortError', 'AbortError')), s());
			};
		(n.addEventListener('complete', o),
			n.addEventListener('error', r),
			n.addEventListener('abort', r));
	});
	Rs.set(n, t);
}
let Os = {
	get(n, t, e) {
		if (n instanceof IDBTransaction) {
			if (t === 'done') return Rs.get(n);
			if (t === 'objectStoreNames') return n.objectStoreNames || Ml.get(n);
			if (t === 'store')
				return e.objectStoreNames[1] ? void 0 : e.objectStore(e.objectStoreNames[0]);
		}
		return Xt(n[t]);
	},
	set(n, t, e) {
		return ((n[t] = e), !0);
	},
	has(n, t) {
		return n instanceof IDBTransaction && (t === 'done' || t === 'store') ? !0 : t in n;
	}
};
function Ud(n) {
	Os = n(Os);
}
function $d(n) {
	return n === IDBDatabase.prototype.transaction &&
		!('objectStoreNames' in IDBTransaction.prototype)
		? function (t, ...e) {
				const i = n.call(ls(this), t, ...e);
				return (Ml.set(i, t.sort ? t.sort() : [t]), Xt(i));
			}
		: Vd().includes(n)
			? function (...t) {
					return (n.apply(ls(this), t), Xt(Il.get(this)));
				}
			: function (...t) {
					return Xt(n.apply(ls(this), t));
				};
}
function Yd(n) {
	return typeof n == 'function'
		? $d(n)
		: (n instanceof IDBTransaction && jd(n), Wd(n, zd()) ? new Proxy(n, Os) : n);
}
function Xt(n) {
	if (n instanceof IDBRequest) return Hd(n);
	if (as.has(n)) return as.get(n);
	const t = Yd(n);
	return (t !== n && (as.set(n, t), ao.set(t, n)), t);
}
const ls = (n) => ao.get(n);
function Gd(n, t, { blocked: e, upgrade: i, blocking: s, terminated: o } = {}) {
	const r = indexedDB.open(n, t),
		a = Xt(r);
	return (
		i &&
			r.addEventListener('upgradeneeded', (l) => {
				i(Xt(r.result), l.oldVersion, l.newVersion, Xt(r.transaction), l);
			}),
		e && r.addEventListener('blocked', (l) => e(l.oldVersion, l.newVersion, l)),
		a
			.then((l) => {
				(o && l.addEventListener('close', () => o()),
					s && l.addEventListener('versionchange', (c) => s(c.oldVersion, c.newVersion, c)));
			})
			.catch(() => {}),
		a
	);
}
const qd = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
	Kd = ['put', 'add', 'delete', 'clear'],
	cs = new Map();
function cr(n, t) {
	if (!(n instanceof IDBDatabase && !(t in n) && typeof t == 'string')) return;
	if (cs.get(t)) return cs.get(t);
	const e = t.replace(/FromIndex$/, ''),
		i = t !== e,
		s = Kd.includes(e);
	if (!(e in (i ? IDBIndex : IDBObjectStore).prototype) || !(s || qd.includes(e))) return;
	const o = async function (r, ...a) {
		const l = this.transaction(r, s ? 'readwrite' : 'readonly');
		let c = l.store;
		return (i && (c = c.index(a.shift())), (await Promise.all([c[e](...a), s && l.done]))[0]);
	};
	return (cs.set(t, o), o);
}
Ud((n) => ({
	...n,
	get: (t, e, i) => cr(t, e) || n.get(t, e, i),
	has: (t, e) => !!cr(t, e) || n.has(t, e)
}));
class Xd {
	constructor(t) {
		this.container = t;
	}
	getPlatformInfoString() {
		return this.container
			.getProviders()
			.map((e) => {
				if (Qd(e)) {
					const i = e.getImmediate();
					return `${i.library}/${i.version}`;
				} else return null;
			})
			.filter((e) => e)
			.join(' ');
	}
}
function Qd(n) {
	const t = n.getComponent();
	return t?.type === 'VERSION';
}
const Ns = '@firebase/app',
	hr = '0.10.16';
const Ht = new Tl('@firebase/app'),
	Jd = '@firebase/app-compat',
	Zd = '@firebase/analytics-compat',
	tu = '@firebase/analytics',
	eu = '@firebase/app-check-compat',
	nu = '@firebase/app-check',
	iu = '@firebase/auth',
	su = '@firebase/auth-compat',
	ou = '@firebase/database',
	ru = '@firebase/data-connect',
	au = '@firebase/database-compat',
	lu = '@firebase/functions',
	cu = '@firebase/functions-compat',
	hu = '@firebase/installations',
	du = '@firebase/installations-compat',
	uu = '@firebase/messaging',
	fu = '@firebase/messaging-compat',
	gu = '@firebase/performance',
	pu = '@firebase/performance-compat',
	mu = '@firebase/remote-config',
	_u = '@firebase/remote-config-compat',
	bu = '@firebase/storage',
	yu = '@firebase/storage-compat',
	xu = '@firebase/firestore',
	vu = '@firebase/vertexai',
	wu = '@firebase/firestore-compat',
	Cu = 'firebase',
	Su = '11.0.2';
const Ls = '[DEFAULT]',
	Eu = {
		[Ns]: 'fire-core',
		[Jd]: 'fire-core-compat',
		[tu]: 'fire-analytics',
		[Zd]: 'fire-analytics-compat',
		[nu]: 'fire-app-check',
		[eu]: 'fire-app-check-compat',
		[iu]: 'fire-auth',
		[su]: 'fire-auth-compat',
		[ou]: 'fire-rtdb',
		[ru]: 'fire-data-connect',
		[au]: 'fire-rtdb-compat',
		[lu]: 'fire-fn',
		[cu]: 'fire-fn-compat',
		[hu]: 'fire-iid',
		[du]: 'fire-iid-compat',
		[uu]: 'fire-fcm',
		[fu]: 'fire-fcm-compat',
		[gu]: 'fire-perf',
		[pu]: 'fire-perf-compat',
		[mu]: 'fire-rc',
		[_u]: 'fire-rc-compat',
		[bu]: 'fire-gcs',
		[yu]: 'fire-gcs-compat',
		[xu]: 'fire-fst',
		[wu]: 'fire-fst-compat',
		[vu]: 'fire-vertex',
		'fire-js': 'fire-js',
		[Cu]: 'fire-js-all'
	};
const xi = new Map(),
	ku = new Map(),
	Fs = new Map();
function dr(n, t) {
	try {
		n.container.addComponent(t);
	} catch (e) {
		Ht.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`, e);
	}
}
function vi(n) {
	const t = n.name;
	if (Fs.has(t)) return (Ht.debug(`There were multiple attempts to register component ${t}.`), !1);
	Fs.set(t, n);
	for (const e of xi.values()) dr(e, n);
	for (const e of ku.values()) dr(e, n);
	return !0;
}
function Tu(n, t) {
	const e = n.container.getProvider('heartbeat').getImmediate({ optional: !0 });
	return (e && e.triggerHeartbeat(), n.container.getProvider(t));
}
const Iu = {
		'no-app': "No Firebase App '{$appName}' has been created - call initializeApp() first",
		'bad-app-name': "Illegal App name: '{$appName}'",
		'duplicate-app':
			"Firebase App named '{$appName}' already exists with different options or config",
		'app-deleted': "Firebase App named '{$appName}' already deleted",
		'server-app-deleted': 'Firebase Server App has been deleted',
		'no-options': 'Need to provide options, when not being deployed to hosting via source.',
		'invalid-app-argument':
			'firebase.{$appName}() takes either no argument or a Firebase App instance.',
		'invalid-log-argument': 'First argument to `onLog` must be null or a function.',
		'idb-open': 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-get': 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-set': 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
		'idb-delete':
			'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.',
		'finalization-registry-not-supported':
			'FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.',
		'invalid-server-app-environment': 'FirebaseServerApp is not for use in browser environments.'
	},
	Qt = new El('app', 'Firebase', Iu);
class Mu {
	constructor(t, e, i) {
		((this._isDeleted = !1),
			(this._options = Object.assign({}, t)),
			(this._config = Object.assign({}, e)),
			(this._name = e.name),
			(this._automaticDataCollectionEnabled = e.automaticDataCollectionEnabled),
			(this._container = i),
			this.container.addComponent(new kn('app', () => this, 'PUBLIC')));
	}
	get automaticDataCollectionEnabled() {
		return (this.checkDestroyed(), this._automaticDataCollectionEnabled);
	}
	set automaticDataCollectionEnabled(t) {
		(this.checkDestroyed(), (this._automaticDataCollectionEnabled = t));
	}
	get name() {
		return (this.checkDestroyed(), this._name);
	}
	get options() {
		return (this.checkDestroyed(), this._options);
	}
	get config() {
		return (this.checkDestroyed(), this._config);
	}
	get container() {
		return this._container;
	}
	get isDeleted() {
		return this._isDeleted;
	}
	set isDeleted(t) {
		this._isDeleted = t;
	}
	checkDestroyed() {
		if (this.isDeleted) throw Qt.create('app-deleted', { appName: this._name });
	}
}
const Pu = Su;
function Pl(n, t = {}) {
	let e = n;
	typeof t != 'object' && (t = { name: t });
	const i = Object.assign({ name: Ls, automaticDataCollectionEnabled: !1 }, t),
		s = i.name;
	if (typeof s != 'string' || !s) throw Qt.create('bad-app-name', { appName: String(s) });
	if ((e || (e = Cl()), !e)) throw Qt.create('no-options');
	const o = xi.get(s);
	if (o) {
		if (As(e, o.options) && As(i, o.config)) return o;
		throw Qt.create('duplicate-app', { appName: s });
	}
	const r = new Od(s);
	for (const l of Fs.values()) r.addComponent(l);
	const a = new Mu(e, i, r);
	return (xi.set(s, a), a);
}
function Du(n = Ls) {
	const t = xi.get(n);
	if (!t && n === Ls && Cl()) return Pl();
	if (!t) throw Qt.create('no-app', { appName: n });
	return t;
}
function Be(n, t, e) {
	var i;
	let s = (i = Eu[n]) !== null && i !== void 0 ? i : n;
	e && (s += `-${e}`);
	const o = s.match(/\s|\//),
		r = t.match(/\s|\//);
	if (o || r) {
		const a = [`Unable to register library "${s}" with version "${t}":`];
		(o && a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
			o && r && a.push('and'),
			r && a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
			Ht.warn(a.join(' ')));
		return;
	}
	vi(new kn(`${s}-version`, () => ({ library: s, version: t }), 'VERSION'));
}
const Au = 'firebase-heartbeat-database',
	Ru = 1,
	Tn = 'firebase-heartbeat-store';
let hs = null;
function Dl() {
	return (
		hs ||
			(hs = Gd(Au, Ru, {
				upgrade: (n, t) => {
					switch (t) {
						case 0:
							try {
								n.createObjectStore(Tn);
							} catch (e) {
								console.warn(e);
							}
					}
				}
			}).catch((n) => {
				throw Qt.create('idb-open', { originalErrorMessage: n.message });
			})),
		hs
	);
}
async function Ou(n) {
	try {
		const e = (await Dl()).transaction(Tn),
			i = await e.objectStore(Tn).get(Al(n));
		return (await e.done, i);
	} catch (t) {
		if (t instanceof jn) Ht.warn(t.message);
		else {
			const e = Qt.create('idb-get', { originalErrorMessage: t?.message });
			Ht.warn(e.message);
		}
	}
}
async function ur(n, t) {
	try {
		const i = (await Dl()).transaction(Tn, 'readwrite');
		(await i.objectStore(Tn).put(t, Al(n)), await i.done);
	} catch (e) {
		if (e instanceof jn) Ht.warn(e.message);
		else {
			const i = Qt.create('idb-set', { originalErrorMessage: e?.message });
			Ht.warn(i.message);
		}
	}
}
function Al(n) {
	return `${n.name}!${n.options.appId}`;
}
const Nu = 1024,
	Lu = 720 * 60 * 60 * 1e3;
class Fu {
	constructor(t) {
		((this.container = t), (this._heartbeatsCache = null));
		const e = this.container.getProvider('app').getImmediate();
		((this._storage = new Wu(e)),
			(this._heartbeatsCachePromise = this._storage
				.read()
				.then((i) => ((this._heartbeatsCache = i), i))));
	}
	async triggerHeartbeat() {
		var t, e;
		try {
			const s = this.container
					.getProvider('platform-logger')
					.getImmediate()
					.getPlatformInfoString(),
				o = fr();
			return (((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) ==
				null &&
				((this._heartbeatsCache = await this._heartbeatsCachePromise),
				((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null)) ||
				this._heartbeatsCache.lastSentHeartbeatDate === o ||
				this._heartbeatsCache.heartbeats.some((r) => r.date === o)
				? void 0
				: (this._heartbeatsCache.heartbeats.push({ date: o, agent: s }),
					(this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((r) => {
						const a = new Date(r.date).valueOf();
						return Date.now() - a <= Lu;
					})),
					this._storage.overwrite(this._heartbeatsCache));
		} catch (i) {
			Ht.warn(i);
		}
	}
	async getHeartbeatsHeader() {
		var t;
		try {
			if (
				(this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
				((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null ||
					this._heartbeatsCache.heartbeats.length === 0)
			)
				return '';
			const e = fr(),
				{ heartbeatsToSend: i, unsentEntries: s } = Bu(this._heartbeatsCache.heartbeats),
				o = bi(JSON.stringify({ version: 2, heartbeats: i }));
			return (
				(this._heartbeatsCache.lastSentHeartbeatDate = e),
				s.length > 0
					? ((this._heartbeatsCache.heartbeats = s),
						await this._storage.overwrite(this._heartbeatsCache))
					: ((this._heartbeatsCache.heartbeats = []),
						this._storage.overwrite(this._heartbeatsCache)),
				o
			);
		} catch (e) {
			return (Ht.warn(e), '');
		}
	}
}
function fr() {
	return new Date().toISOString().substring(0, 10);
}
function Bu(n, t = Nu) {
	const e = [];
	let i = n.slice();
	for (const s of n) {
		const o = e.find((r) => r.agent === s.agent);
		if (o) {
			if ((o.dates.push(s.date), gr(e) > t)) {
				o.dates.pop();
				break;
			}
		} else if ((e.push({ agent: s.agent, dates: [s.date] }), gr(e) > t)) {
			e.pop();
			break;
		}
		i = i.slice(1);
	}
	return { heartbeatsToSend: e, unsentEntries: i };
}
class Wu {
	constructor(t) {
		((this.app = t), (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()));
	}
	async runIndexedDBEnvironmentCheck() {
		return vd()
			? wd()
					.then(() => !0)
					.catch(() => !1)
			: !1;
	}
	async read() {
		if (await this._canUseIndexedDBPromise) {
			const e = await Ou(this.app);
			return e?.heartbeats ? e : { heartbeats: [] };
		} else return { heartbeats: [] };
	}
	async overwrite(t) {
		var e;
		if (await this._canUseIndexedDBPromise) {
			const s = await this.read();
			return ur(this.app, {
				lastSentHeartbeatDate:
					(e = t.lastSentHeartbeatDate) !== null && e !== void 0 ? e : s.lastSentHeartbeatDate,
				heartbeats: t.heartbeats
			});
		} else return;
	}
	async add(t) {
		var e;
		if (await this._canUseIndexedDBPromise) {
			const s = await this.read();
			return ur(this.app, {
				lastSentHeartbeatDate:
					(e = t.lastSentHeartbeatDate) !== null && e !== void 0 ? e : s.lastSentHeartbeatDate,
				heartbeats: [...s.heartbeats, ...t.heartbeats]
			});
		} else return;
	}
}
function gr(n) {
	return bi(JSON.stringify({ version: 2, heartbeats: n })).length;
}
function zu(n) {
	(vi(new kn('platform-logger', (t) => new Xd(t), 'PRIVATE')),
		vi(new kn('heartbeat', (t) => new Fu(t), 'PRIVATE')),
		Be(Ns, hr, n),
		Be(Ns, hr, 'esm2017'),
		Be('fire-js', ''));
}
zu('');
var Vu = 'firebase',
	Hu = '11.0.2';
Be(Vu, Hu, 'app');
var pr = {};
const mr = '@firebase/database',
	_r = '1.0.10';
let Rl = '';
function ju(n) {
	Rl = n;
}
class Uu {
	constructor(t) {
		((this.domStorage_ = t), (this.prefix_ = 'firebase:'));
	}
	set(t, e) {
		e == null
			? this.domStorage_.removeItem(this.prefixedName_(t))
			: this.domStorage_.setItem(this.prefixedName_(t), tt(e));
	}
	get(t) {
		const e = this.domStorage_.getItem(this.prefixedName_(t));
		return e == null ? null : En(e);
	}
	remove(t) {
		this.domStorage_.removeItem(this.prefixedName_(t));
	}
	prefixedName_(t) {
		return this.prefix_ + t;
	}
	toString() {
		return this.domStorage_.toString();
	}
}
class $u {
	constructor() {
		((this.cache_ = {}), (this.isInMemoryStorage = !0));
	}
	set(t, e) {
		e == null ? delete this.cache_[t] : (this.cache_[t] = e);
	}
	get(t) {
		return Ut(this.cache_, t) ? this.cache_[t] : null;
	}
	remove(t) {
		delete this.cache_[t];
	}
}
const Ol = function (n) {
		try {
			if (typeof window < 'u' && typeof window[n] < 'u') {
				const t = window[n];
				return (
					t.setItem('firebase:sentinel', 'cache'),
					t.removeItem('firebase:sentinel'),
					new Uu(t)
				);
			}
		} catch {}
		return new $u();
	},
	xe = Ol('localStorage'),
	Yu = Ol('sessionStorage');
const We = new Tl('@firebase/database'),
	Gu = (function () {
		let n = 1;
		return function () {
			return n++;
		};
	})(),
	Nl = function (n) {
		const t = Pd(n),
			e = new Md();
		e.update(t);
		const i = e.digest();
		return oo.encodeByteArray(i);
	},
	Un = function (...n) {
		let t = '';
		for (let e = 0; e < n.length; e++) {
			const i = n[e];
			(Array.isArray(i) || (i && typeof i == 'object' && typeof i.length == 'number')
				? (t += Un.apply(null, i))
				: typeof i == 'object'
					? (t += tt(i))
					: (t += i),
				(t += ' '));
		}
		return t;
	};
let mn = null,
	br = !0;
const qu = function (n, t) {
		(w(!0, "Can't turn on custom loggers persistently."),
			(We.logLevel = H.VERBOSE),
			(mn = We.log.bind(We)));
	},
	ht = function (...n) {
		if ((br === !0 && ((br = !1), mn === null && Yu.get('logging_enabled') === !0 && qu()), mn)) {
			const t = Un.apply(null, n);
			mn(t);
		}
	},
	$n = function (n) {
		return function (...t) {
			ht(n, ...t);
		};
	},
	Bs = function (...n) {
		const t = 'FIREBASE INTERNAL ERROR: ' + Un(...n);
		We.error(t);
	},
	jt = function (...n) {
		const t = `FIREBASE FATAL ERROR: ${Un(...n)}`;
		throw (We.error(t), new Error(t));
	},
	_t = function (...n) {
		const t = 'FIREBASE WARNING: ' + Un(...n);
		We.warn(t);
	},
	Ku = function () {
		typeof window < 'u' &&
			window.location &&
			window.location.protocol &&
			window.location.protocol.indexOf('https:') !== -1 &&
			_t(
				'Insecure Firebase access from a secure page. Please use https in calls to new Firebase().'
			);
	},
	Ll = function (n) {
		return (
			typeof n == 'number' &&
			(n !== n || n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY)
		);
	},
	Xu = function (n) {
		if (document.readyState === 'complete') n();
		else {
			let t = !1;
			const e = function () {
				if (!document.body) {
					setTimeout(e, Math.floor(10));
					return;
				}
				t || ((t = !0), n());
			};
			document.addEventListener
				? (document.addEventListener('DOMContentLoaded', e, !1),
					window.addEventListener('load', e, !1))
				: document.attachEvent &&
					(document.attachEvent('onreadystatechange', () => {
						document.readyState === 'complete' && e();
					}),
					window.attachEvent('onload', e));
		}
	},
	je = '[MIN_NAME]',
	Se = '[MAX_NAME]',
	Qe = function (n, t) {
		if (n === t) return 0;
		if (n === je || t === Se) return -1;
		if (t === je || n === Se) return 1;
		{
			const e = yr(n),
				i = yr(t);
			return e !== null
				? i !== null
					? e - i === 0
						? n.length - t.length
						: e - i
					: -1
				: i !== null
					? 1
					: n < t
						? -1
						: 1;
		}
	},
	Qu = function (n, t) {
		return n === t ? 0 : n < t ? -1 : 1;
	},
	nn = function (n, t) {
		if (t && n in t) return t[n];
		throw new Error('Missing required key (' + n + ') in object: ' + tt(t));
	},
	lo = function (n) {
		if (typeof n != 'object' || n === null) return tt(n);
		const t = [];
		for (const i in n) t.push(i);
		t.sort();
		let e = '{';
		for (let i = 0; i < t.length; i++)
			(i !== 0 && (e += ','), (e += tt(t[i])), (e += ':'), (e += lo(n[t[i]])));
		return ((e += '}'), e);
	},
	Fl = function (n, t) {
		const e = n.length;
		if (e <= t) return [n];
		const i = [];
		for (let s = 0; s < e; s += t)
			s + t > e ? i.push(n.substring(s, e)) : i.push(n.substring(s, s + t));
		return i;
	};
function bt(n, t) {
	for (const e in n) n.hasOwnProperty(e) && t(e, n[e]);
}
const Bl = function (n) {
		w(!Ll(n), 'Invalid JSON number');
		const t = 11,
			e = 52,
			i = (1 << (t - 1)) - 1;
		let s, o, r, a, l;
		n === 0
			? ((o = 0), (r = 0), (s = 1 / n === -1 / 0 ? 1 : 0))
			: ((s = n < 0),
				(n = Math.abs(n)),
				n >= Math.pow(2, 1 - i)
					? ((a = Math.min(Math.floor(Math.log(n) / Math.LN2), i)),
						(o = a + i),
						(r = Math.round(n * Math.pow(2, e - a) - Math.pow(2, e))))
					: ((o = 0), (r = Math.round(n / Math.pow(2, 1 - i - e)))));
		const c = [];
		for (l = e; l; l -= 1) (c.push(r % 2 ? 1 : 0), (r = Math.floor(r / 2)));
		for (l = t; l; l -= 1) (c.push(o % 2 ? 1 : 0), (o = Math.floor(o / 2)));
		(c.push(s ? 1 : 0), c.reverse());
		const h = c.join('');
		let d = '';
		for (l = 0; l < 64; l += 8) {
			let u = parseInt(h.substr(l, 8), 2).toString(16);
			(u.length === 1 && (u = '0' + u), (d = d + u));
		}
		return d.toLowerCase();
	},
	Ju = function () {
		return !!(
			typeof window == 'object' &&
			window.chrome &&
			window.chrome.extension &&
			!/^chrome/.test(window.location.href)
		);
	},
	Zu = function () {
		return typeof Windows == 'object' && typeof Windows.UI == 'object';
	};
function tf(n, t) {
	let e = 'Unknown Error';
	n === 'too_big'
		? (e =
				'The data requested exceeds the maximum size that can be accessed with a single request.')
		: n === 'permission_denied'
			? (e = "Client doesn't have permission to access the desired data.")
			: n === 'unavailable' && (e = 'The service is unavailable');
	const i = new Error(n + ' at ' + t._path.toString() + ': ' + e);
	return ((i.code = n.toUpperCase()), i);
}
const ef = new RegExp('^-?(0*)\\d{1,10}$'),
	nf = -2147483648,
	sf = 2147483647,
	yr = function (n) {
		if (ef.test(n)) {
			const t = Number(n);
			if (t >= nf && t <= sf) return t;
		}
		return null;
	},
	Je = function (n) {
		try {
			n();
		} catch (t) {
			setTimeout(() => {
				const e = t.stack || '';
				throw (_t('Exception was thrown by user callback.', e), t);
			}, Math.floor(0));
		}
	},
	of = function () {
		return (
			((typeof window == 'object' && window.navigator && window.navigator.userAgent) || '').search(
				/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i
			) >= 0
		);
	},
	_n = function (n, t) {
		const e = setTimeout(n, t);
		return (
			typeof e == 'number' && typeof Deno < 'u' && Deno.unrefTimer
				? Deno.unrefTimer(e)
				: typeof e == 'object' && e.unref && e.unref(),
			e
		);
	};
class rf {
	constructor(t, e) {
		((this.appName_ = t),
			(this.appCheckProvider = e),
			(this.appCheck = e?.getImmediate({ optional: !0 })),
			this.appCheck || e?.get().then((i) => (this.appCheck = i)));
	}
	getToken(t) {
		return this.appCheck
			? this.appCheck.getToken(t)
			: new Promise((e, i) => {
					setTimeout(() => {
						this.appCheck ? this.getToken(t).then(e, i) : e(null);
					}, 0);
				});
	}
	addTokenChangeListener(t) {
		var e;
		(e = this.appCheckProvider) === null ||
			e === void 0 ||
			e.get().then((i) => i.addTokenListener(t));
	}
	notifyForInvalidToken() {
		_t(
			`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`
		);
	}
}
class af {
	constructor(t, e, i) {
		((this.appName_ = t),
			(this.firebaseOptions_ = e),
			(this.authProvider_ = i),
			(this.auth_ = null),
			(this.auth_ = i.getImmediate({ optional: !0 })),
			this.auth_ || i.onInit((s) => (this.auth_ = s)));
	}
	getToken(t) {
		return this.auth_
			? this.auth_
					.getToken(t)
					.catch((e) =>
						e && e.code === 'auth/token-not-initialized'
							? (ht('Got auth/token-not-initialized error.  Treating as null token.'), null)
							: Promise.reject(e)
					)
			: new Promise((e, i) => {
					setTimeout(() => {
						this.auth_ ? this.getToken(t).then(e, i) : e(null);
					}, 0);
				});
	}
	addTokenChangeListener(t) {
		this.auth_
			? this.auth_.addAuthTokenListener(t)
			: this.authProvider_.get().then((e) => e.addAuthTokenListener(t));
	}
	removeTokenChangeListener(t) {
		this.authProvider_.get().then((e) => e.removeAuthTokenListener(t));
	}
	notifyForInvalidToken() {
		let t =
			'Provided authentication credentials for the app named "' +
			this.appName_ +
			'" are invalid. This usually indicates your app was not initialized correctly. ';
		('credential' in this.firebaseOptions_
			? (t +=
					'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
			: 'serviceAccount' in this.firebaseOptions_
				? (t +=
						'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.')
				: (t +=
						'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.'),
			_t(t));
	}
}
class pi {
	constructor(t) {
		this.accessToken = t;
	}
	getToken(t) {
		return Promise.resolve({ accessToken: this.accessToken });
	}
	addTokenChangeListener(t) {
		t(this.accessToken);
	}
	removeTokenChangeListener(t) {}
	notifyForInvalidToken() {}
}
pi.OWNER = 'owner';
const co = '5',
	Wl = 'v',
	zl = 's',
	Vl = 'r',
	Hl = 'f',
	jl = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,
	Ul = 'ls',
	$l = 'p',
	Ws = 'ac',
	Yl = 'websocket',
	Gl = 'long_polling';
class ql {
	constructor(t, e, i, s, o = !1, r = '', a = !1, l = !1) {
		((this.secure = e),
			(this.namespace = i),
			(this.webSocketOnly = s),
			(this.nodeAdmin = o),
			(this.persistenceKey = r),
			(this.includeNamespaceInQueryParams = a),
			(this.isUsingEmulator = l),
			(this._host = t.toLowerCase()),
			(this._domain = this._host.substr(this._host.indexOf('.') + 1)),
			(this.internalHost = xe.get('host:' + t) || this._host));
	}
	isCacheableHost() {
		return this.internalHost.substr(0, 2) === 's-';
	}
	isCustomHost() {
		return this._domain !== 'firebaseio.com' && this._domain !== 'firebaseio-demo.com';
	}
	get host() {
		return this._host;
	}
	set host(t) {
		t !== this.internalHost &&
			((this.internalHost = t),
			this.isCacheableHost() && xe.set('host:' + this._host, this.internalHost));
	}
	toString() {
		let t = this.toURLString();
		return (this.persistenceKey && (t += '<' + this.persistenceKey + '>'), t);
	}
	toURLString() {
		const t = this.secure ? 'https://' : 'http://',
			e = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : '';
		return `${t}${this.host}/${e}`;
	}
}
function lf(n) {
	return n.host !== n.internalHost || n.isCustomHost() || n.includeNamespaceInQueryParams;
}
function Kl(n, t, e) {
	(w(typeof t == 'string', 'typeof type must == string'),
		w(typeof e == 'object', 'typeof params must == object'));
	let i;
	if (t === Yl) i = (n.secure ? 'wss://' : 'ws://') + n.internalHost + '/.ws?';
	else if (t === Gl) i = (n.secure ? 'https://' : 'http://') + n.internalHost + '/.lp?';
	else throw new Error('Unknown connection type: ' + t);
	lf(n) && (e.ns = n.namespace);
	const s = [];
	return (
		bt(e, (o, r) => {
			s.push(o + '=' + r);
		}),
		i + s.join('&')
	);
}
class cf {
	constructor() {
		this.counters_ = {};
	}
	incrementCounter(t, e = 1) {
		(Ut(this.counters_, t) || (this.counters_[t] = 0), (this.counters_[t] += e));
	}
	get() {
		return cd(this.counters_);
	}
}
const ds = {},
	us = {};
function ho(n) {
	const t = n.toString();
	return (ds[t] || (ds[t] = new cf()), ds[t]);
}
function hf(n, t) {
	const e = n.toString();
	return (us[e] || (us[e] = t()), us[e]);
}
class df {
	constructor(t) {
		((this.onMessage_ = t),
			(this.pendingResponses = []),
			(this.currentResponseNum = 0),
			(this.closeAfterResponse = -1),
			(this.onClose = null));
	}
	closeAfter(t, e) {
		((this.closeAfterResponse = t),
			(this.onClose = e),
			this.closeAfterResponse < this.currentResponseNum && (this.onClose(), (this.onClose = null)));
	}
	handleResponse(t, e) {
		for (this.pendingResponses[t] = e; this.pendingResponses[this.currentResponseNum]; ) {
			const i = this.pendingResponses[this.currentResponseNum];
			delete this.pendingResponses[this.currentResponseNum];
			for (let s = 0; s < i.length; ++s)
				i[s] &&
					Je(() => {
						this.onMessage_(i[s]);
					});
			if (this.currentResponseNum === this.closeAfterResponse) {
				this.onClose && (this.onClose(), (this.onClose = null));
				break;
			}
			this.currentResponseNum++;
		}
	}
}
const xr = 'start',
	uf = 'close',
	ff = 'pLPCommand',
	gf = 'pRTLPCB',
	Xl = 'id',
	Ql = 'pw',
	Jl = 'ser',
	pf = 'cb',
	mf = 'seg',
	_f = 'ts',
	bf = 'd',
	yf = 'dframe',
	Zl = 1870,
	tc = 30,
	xf = Zl - tc,
	vf = 25e3,
	wf = 3e4;
class Fe {
	constructor(t, e, i, s, o, r, a) {
		((this.connId = t),
			(this.repoInfo = e),
			(this.applicationId = i),
			(this.appCheckToken = s),
			(this.authToken = o),
			(this.transportSessionId = r),
			(this.lastSessionId = a),
			(this.bytesSent = 0),
			(this.bytesReceived = 0),
			(this.everConnected_ = !1),
			(this.log_ = $n(t)),
			(this.stats_ = ho(e)),
			(this.urlFn = (l) => (this.appCheckToken && (l[Ws] = this.appCheckToken), Kl(e, Gl, l))));
	}
	open(t, e) {
		((this.curSegmentNum = 0),
			(this.onDisconnect_ = e),
			(this.myPacketOrderer = new df(t)),
			(this.isClosed_ = !1),
			(this.connectTimeoutTimer_ = setTimeout(() => {
				(this.log_('Timed out trying to connect.'),
					this.onClosed_(),
					(this.connectTimeoutTimer_ = null));
			}, Math.floor(wf))),
			Xu(() => {
				if (this.isClosed_) return;
				this.scriptTagHolder = new uo(
					(...o) => {
						const [r, a, l, c, h] = o;
						if ((this.incrementIncomingBytes_(o), !!this.scriptTagHolder))
							if (
								(this.connectTimeoutTimer_ &&
									(clearTimeout(this.connectTimeoutTimer_), (this.connectTimeoutTimer_ = null)),
								(this.everConnected_ = !0),
								r === xr)
							)
								((this.id = a), (this.password = l));
							else if (r === uf)
								a
									? ((this.scriptTagHolder.sendNewPolls = !1),
										this.myPacketOrderer.closeAfter(a, () => {
											this.onClosed_();
										}))
									: this.onClosed_();
							else throw new Error('Unrecognized command received: ' + r);
					},
					(...o) => {
						const [r, a] = o;
						(this.incrementIncomingBytes_(o), this.myPacketOrderer.handleResponse(r, a));
					},
					() => {
						this.onClosed_();
					},
					this.urlFn
				);
				const i = {};
				((i[xr] = 't'),
					(i[Jl] = Math.floor(Math.random() * 1e8)),
					this.scriptTagHolder.uniqueCallbackIdentifier &&
						(i[pf] = this.scriptTagHolder.uniqueCallbackIdentifier),
					(i[Wl] = co),
					this.transportSessionId && (i[zl] = this.transportSessionId),
					this.lastSessionId && (i[Ul] = this.lastSessionId),
					this.applicationId && (i[$l] = this.applicationId),
					this.appCheckToken && (i[Ws] = this.appCheckToken),
					typeof location < 'u' && location.hostname && jl.test(location.hostname) && (i[Vl] = Hl));
				const s = this.urlFn(i);
				(this.log_('Connecting via long-poll to ' + s), this.scriptTagHolder.addTag(s, () => {}));
			}));
	}
	start() {
		(this.scriptTagHolder.startLongPoll(this.id, this.password),
			this.addDisconnectPingFrame(this.id, this.password));
	}
	static forceAllow() {
		Fe.forceAllow_ = !0;
	}
	static forceDisallow() {
		Fe.forceDisallow_ = !0;
	}
	static isAvailable() {
		return Fe.forceAllow_
			? !0
			: !Fe.forceDisallow_ &&
					typeof document < 'u' &&
					document.createElement != null &&
					!Ju() &&
					!Zu();
	}
	markConnectionHealthy() {}
	shutdown_() {
		((this.isClosed_ = !0),
			this.scriptTagHolder && (this.scriptTagHolder.close(), (this.scriptTagHolder = null)),
			this.myDisconnFrame &&
				(document.body.removeChild(this.myDisconnFrame), (this.myDisconnFrame = null)),
			this.connectTimeoutTimer_ &&
				(clearTimeout(this.connectTimeoutTimer_), (this.connectTimeoutTimer_ = null)));
	}
	onClosed_() {
		this.isClosed_ ||
			(this.log_('Longpoll is closing itself'),
			this.shutdown_(),
			this.onDisconnect_ && (this.onDisconnect_(this.everConnected_), (this.onDisconnect_ = null)));
	}
	close() {
		this.isClosed_ || (this.log_('Longpoll is being closed.'), this.shutdown_());
	}
	send(t) {
		const e = tt(t);
		((this.bytesSent += e.length), this.stats_.incrementCounter('bytes_sent', e.length));
		const i = xl(e),
			s = Fl(i, xf);
		for (let o = 0; o < s.length; o++)
			(this.scriptTagHolder.enqueueSegment(this.curSegmentNum, s.length, s[o]),
				this.curSegmentNum++);
	}
	addDisconnectPingFrame(t, e) {
		this.myDisconnFrame = document.createElement('iframe');
		const i = {};
		((i[yf] = 't'),
			(i[Xl] = t),
			(i[Ql] = e),
			(this.myDisconnFrame.src = this.urlFn(i)),
			(this.myDisconnFrame.style.display = 'none'),
			document.body.appendChild(this.myDisconnFrame));
	}
	incrementIncomingBytes_(t) {
		const e = tt(t).length;
		((this.bytesReceived += e), this.stats_.incrementCounter('bytes_received', e));
	}
}
class uo {
	constructor(t, e, i, s) {
		((this.onDisconnect = i),
			(this.urlFn = s),
			(this.outstandingRequests = new Set()),
			(this.pendingSegs = []),
			(this.currentSerial = Math.floor(Math.random() * 1e8)),
			(this.sendNewPolls = !0));
		{
			((this.uniqueCallbackIdentifier = Gu()),
				(window[ff + this.uniqueCallbackIdentifier] = t),
				(window[gf + this.uniqueCallbackIdentifier] = e),
				(this.myIFrame = uo.createIFrame_()));
			let o = '';
			this.myIFrame.src &&
				this.myIFrame.src.substr(0, 11) === 'javascript:' &&
				(o = '<script>document.domain="' + document.domain + '";<\/script>');
			const r = '<html><body>' + o + '</body></html>';
			try {
				(this.myIFrame.doc.open(), this.myIFrame.doc.write(r), this.myIFrame.doc.close());
			} catch (a) {
				(ht('frame writing exception'), a.stack && ht(a.stack), ht(a));
			}
		}
	}
	static createIFrame_() {
		const t = document.createElement('iframe');
		if (((t.style.display = 'none'), document.body)) {
			document.body.appendChild(t);
			try {
				t.contentWindow.document || ht('No IE domain setting required');
			} catch {
				const i = document.domain;
				t.src =
					"javascript:void((function(){document.open();document.domain='" +
					i +
					"';document.close();})())";
			}
		} else
			throw 'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';
		return (
			t.contentDocument
				? (t.doc = t.contentDocument)
				: t.contentWindow
					? (t.doc = t.contentWindow.document)
					: t.document && (t.doc = t.document),
			t
		);
	}
	close() {
		((this.alive = !1),
			this.myIFrame &&
				((this.myIFrame.doc.body.textContent = ''),
				setTimeout(() => {
					this.myIFrame !== null &&
						(document.body.removeChild(this.myIFrame), (this.myIFrame = null));
				}, Math.floor(0))));
		const t = this.onDisconnect;
		t && ((this.onDisconnect = null), t());
	}
	startLongPoll(t, e) {
		for (this.myID = t, this.myPW = e, this.alive = !0; this.newRequest_(); );
	}
	newRequest_() {
		if (
			this.alive &&
			this.sendNewPolls &&
			this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)
		) {
			this.currentSerial++;
			const t = {};
			((t[Xl] = this.myID), (t[Ql] = this.myPW), (t[Jl] = this.currentSerial));
			let e = this.urlFn(t),
				i = '',
				s = 0;
			for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + tc + i.length <= Zl; ) {
				const r = this.pendingSegs.shift();
				((i =
					i + '&' + mf + s + '=' + r.seg + '&' + _f + s + '=' + r.ts + '&' + bf + s + '=' + r.d),
					s++);
			}
			return ((e = e + i), this.addLongPollTag_(e, this.currentSerial), !0);
		} else return !1;
	}
	enqueueSegment(t, e, i) {
		(this.pendingSegs.push({ seg: t, ts: e, d: i }), this.alive && this.newRequest_());
	}
	addLongPollTag_(t, e) {
		this.outstandingRequests.add(e);
		const i = () => {
				(this.outstandingRequests.delete(e), this.newRequest_());
			},
			s = setTimeout(i, Math.floor(vf)),
			o = () => {
				(clearTimeout(s), i());
			};
		this.addTag(t, o);
	}
	addTag(t, e) {
		setTimeout(() => {
			try {
				if (!this.sendNewPolls) return;
				const i = this.myIFrame.doc.createElement('script');
				((i.type = 'text/javascript'),
					(i.async = !0),
					(i.src = t),
					(i.onload = i.onreadystatechange =
						function () {
							const s = i.readyState;
							(!s || s === 'loaded' || s === 'complete') &&
								((i.onload = i.onreadystatechange = null),
								i.parentNode && i.parentNode.removeChild(i),
								e());
						}),
					(i.onerror = () => {
						(ht('Long-poll script failed to load: ' + t), (this.sendNewPolls = !1), this.close());
					}),
					this.myIFrame.doc.body.appendChild(i));
			} catch {}
		}, Math.floor(1));
	}
}
const Cf = 16384,
	Sf = 45e3;
let wi = null;
typeof MozWebSocket < 'u' ? (wi = MozWebSocket) : typeof WebSocket < 'u' && (wi = WebSocket);
class St {
	constructor(t, e, i, s, o, r, a) {
		((this.connId = t),
			(this.applicationId = i),
			(this.appCheckToken = s),
			(this.authToken = o),
			(this.keepaliveTimer = null),
			(this.frames = null),
			(this.totalFrames = 0),
			(this.bytesSent = 0),
			(this.bytesReceived = 0),
			(this.log_ = $n(this.connId)),
			(this.stats_ = ho(e)),
			(this.connURL = St.connectionURL_(e, r, a, s, i)),
			(this.nodeAdmin = e.nodeAdmin));
	}
	static connectionURL_(t, e, i, s, o) {
		const r = {};
		return (
			(r[Wl] = co),
			typeof location < 'u' && location.hostname && jl.test(location.hostname) && (r[Vl] = Hl),
			e && (r[zl] = e),
			i && (r[Ul] = i),
			s && (r[Ws] = s),
			o && (r[$l] = o),
			Kl(t, Yl, r)
		);
	}
	open(t, e) {
		((this.onDisconnect = e),
			(this.onMessage = t),
			this.log_('Websocket connecting to ' + this.connURL),
			(this.everConnected_ = !1),
			xe.set('previous_websocket_failure', !0));
		try {
			let i;
			(xd(), (this.mySock = new wi(this.connURL, [], i)));
		} catch (i) {
			this.log_('Error instantiating WebSocket.');
			const s = i.message || i.data;
			(s && this.log_(s), this.onClosed_());
			return;
		}
		((this.mySock.onopen = () => {
			(this.log_('Websocket connected.'), (this.everConnected_ = !0));
		}),
			(this.mySock.onclose = () => {
				(this.log_('Websocket connection was disconnected.'),
					(this.mySock = null),
					this.onClosed_());
			}),
			(this.mySock.onmessage = (i) => {
				this.handleIncomingFrame(i);
			}),
			(this.mySock.onerror = (i) => {
				this.log_('WebSocket error.  Closing connection.');
				const s = i.message || i.data;
				(s && this.log_(s), this.onClosed_());
			}));
	}
	start() {}
	static forceDisallow() {
		St.forceDisallow_ = !0;
	}
	static isAvailable() {
		let t = !1;
		if (typeof navigator < 'u' && navigator.userAgent) {
			const e = /Android ([0-9]{0,}\.[0-9]{0,})/,
				i = navigator.userAgent.match(e);
			i && i.length > 1 && parseFloat(i[1]) < 4.4 && (t = !0);
		}
		return !t && wi !== null && !St.forceDisallow_;
	}
	static previouslyFailed() {
		return xe.isInMemoryStorage || xe.get('previous_websocket_failure') === !0;
	}
	markConnectionHealthy() {
		xe.remove('previous_websocket_failure');
	}
	appendFrame_(t) {
		if ((this.frames.push(t), this.frames.length === this.totalFrames)) {
			const e = this.frames.join('');
			this.frames = null;
			const i = En(e);
			this.onMessage(i);
		}
	}
	handleNewFrameCount_(t) {
		((this.totalFrames = t), (this.frames = []));
	}
	extractFrameCount_(t) {
		if ((w(this.frames === null, 'We already have a frame buffer'), t.length <= 6)) {
			const e = Number(t);
			if (!isNaN(e)) return (this.handleNewFrameCount_(e), null);
		}
		return (this.handleNewFrameCount_(1), t);
	}
	handleIncomingFrame(t) {
		if (this.mySock === null) return;
		const e = t.data;
		if (
			((this.bytesReceived += e.length),
			this.stats_.incrementCounter('bytes_received', e.length),
			this.resetKeepAlive(),
			this.frames !== null)
		)
			this.appendFrame_(e);
		else {
			const i = this.extractFrameCount_(e);
			i !== null && this.appendFrame_(i);
		}
	}
	send(t) {
		this.resetKeepAlive();
		const e = tt(t);
		((this.bytesSent += e.length), this.stats_.incrementCounter('bytes_sent', e.length));
		const i = Fl(e, Cf);
		i.length > 1 && this.sendString_(String(i.length));
		for (let s = 0; s < i.length; s++) this.sendString_(i[s]);
	}
	shutdown_() {
		((this.isClosed_ = !0),
			this.keepaliveTimer && (clearInterval(this.keepaliveTimer), (this.keepaliveTimer = null)),
			this.mySock && (this.mySock.close(), (this.mySock = null)));
	}
	onClosed_() {
		this.isClosed_ ||
			(this.log_('WebSocket is closing itself'),
			this.shutdown_(),
			this.onDisconnect && (this.onDisconnect(this.everConnected_), (this.onDisconnect = null)));
	}
	close() {
		this.isClosed_ || (this.log_('WebSocket is being closed'), this.shutdown_());
	}
	resetKeepAlive() {
		(clearInterval(this.keepaliveTimer),
			(this.keepaliveTimer = setInterval(() => {
				(this.mySock && this.sendString_('0'), this.resetKeepAlive());
			}, Math.floor(Sf))));
	}
	sendString_(t) {
		try {
			this.mySock.send(t);
		} catch (e) {
			(this.log_(
				'Exception thrown from WebSocket.send():',
				e.message || e.data,
				'Closing connection.'
			),
				setTimeout(this.onClosed_.bind(this), 0));
		}
	}
}
St.responsesRequiredToBeHealthy = 2;
St.healthyTimeout = 3e4;
class In {
	static get ALL_TRANSPORTS() {
		return [Fe, St];
	}
	static get IS_TRANSPORT_INITIALIZED() {
		return this.globalTransportInitialized_;
	}
	constructor(t) {
		this.initTransports_(t);
	}
	initTransports_(t) {
		const e = St && St.isAvailable();
		let i = e && !St.previouslyFailed();
		if (
			(t.webSocketOnly &&
				(e || _t("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),
				(i = !0)),
			i)
		)
			this.transports_ = [St];
		else {
			const s = (this.transports_ = []);
			for (const o of In.ALL_TRANSPORTS) o && o.isAvailable() && s.push(o);
			In.globalTransportInitialized_ = !0;
		}
	}
	initialTransport() {
		if (this.transports_.length > 0) return this.transports_[0];
		throw new Error('No transports available');
	}
	upgradeTransport() {
		return this.transports_.length > 1 ? this.transports_[1] : null;
	}
}
In.globalTransportInitialized_ = !1;
const Ef = 6e4,
	kf = 5e3,
	Tf = 10 * 1024,
	If = 100 * 1024,
	fs = 't',
	vr = 'd',
	Mf = 's',
	wr = 'r',
	Pf = 'e',
	Cr = 'o',
	Sr = 'a',
	Er = 'n',
	kr = 'p',
	Df = 'h';
class Af {
	constructor(t, e, i, s, o, r, a, l, c, h) {
		((this.id = t),
			(this.repoInfo_ = e),
			(this.applicationId_ = i),
			(this.appCheckToken_ = s),
			(this.authToken_ = o),
			(this.onMessage_ = r),
			(this.onReady_ = a),
			(this.onDisconnect_ = l),
			(this.onKill_ = c),
			(this.lastSessionId = h),
			(this.connectionCount = 0),
			(this.pendingDataMessages = []),
			(this.state_ = 0),
			(this.log_ = $n('c:' + this.id + ':')),
			(this.transportManager_ = new In(e)),
			this.log_('Connection created'),
			this.start_());
	}
	start_() {
		const t = this.transportManager_.initialTransport();
		((this.conn_ = new t(
			this.nextTransportId_(),
			this.repoInfo_,
			this.applicationId_,
			this.appCheckToken_,
			this.authToken_,
			null,
			this.lastSessionId
		)),
			(this.primaryResponsesRequired_ = t.responsesRequiredToBeHealthy || 0));
		const e = this.connReceiver_(this.conn_),
			i = this.disconnReceiver_(this.conn_);
		((this.tx_ = this.conn_),
			(this.rx_ = this.conn_),
			(this.secondaryConn_ = null),
			(this.isHealthy_ = !1),
			setTimeout(() => {
				this.conn_ && this.conn_.open(e, i);
			}, Math.floor(0)));
		const s = t.healthyTimeout || 0;
		s > 0 &&
			(this.healthyTimeout_ = _n(() => {
				((this.healthyTimeout_ = null),
					this.isHealthy_ ||
						(this.conn_ && this.conn_.bytesReceived > If
							? (this.log_(
									'Connection exceeded healthy timeout but has received ' +
										this.conn_.bytesReceived +
										' bytes.  Marking connection healthy.'
								),
								(this.isHealthy_ = !0),
								this.conn_.markConnectionHealthy())
							: this.conn_ && this.conn_.bytesSent > Tf
								? this.log_(
										'Connection exceeded healthy timeout but has sent ' +
											this.conn_.bytesSent +
											' bytes.  Leaving connection alive.'
									)
								: (this.log_('Closing unhealthy connection after timeout.'), this.close())));
			}, Math.floor(s)));
	}
	nextTransportId_() {
		return 'c:' + this.id + ':' + this.connectionCount++;
	}
	disconnReceiver_(t) {
		return (e) => {
			t === this.conn_
				? this.onConnectionLost_(e)
				: t === this.secondaryConn_
					? (this.log_('Secondary connection lost.'), this.onSecondaryConnectionLost_())
					: this.log_('closing an old connection');
		};
	}
	connReceiver_(t) {
		return (e) => {
			this.state_ !== 2 &&
				(t === this.rx_
					? this.onPrimaryMessageReceived_(e)
					: t === this.secondaryConn_
						? this.onSecondaryMessageReceived_(e)
						: this.log_('message on old connection'));
		};
	}
	sendRequest(t) {
		const e = { t: 'd', d: t };
		this.sendData_(e);
	}
	tryCleanupConnection() {
		this.tx_ === this.secondaryConn_ &&
			this.rx_ === this.secondaryConn_ &&
			(this.log_('cleaning up and promoting a connection: ' + this.secondaryConn_.connId),
			(this.conn_ = this.secondaryConn_),
			(this.secondaryConn_ = null));
	}
	onSecondaryControl_(t) {
		if (fs in t) {
			const e = t[fs];
			e === Sr
				? this.upgradeIfSecondaryHealthy_()
				: e === wr
					? (this.log_('Got a reset on secondary, closing it'),
						this.secondaryConn_.close(),
						(this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) && this.close())
					: e === Cr &&
						(this.log_('got pong on secondary.'),
						this.secondaryResponsesRequired_--,
						this.upgradeIfSecondaryHealthy_());
		}
	}
	onSecondaryMessageReceived_(t) {
		const e = nn('t', t),
			i = nn('d', t);
		if (e === 'c') this.onSecondaryControl_(i);
		else if (e === 'd') this.pendingDataMessages.push(i);
		else throw new Error('Unknown protocol layer: ' + e);
	}
	upgradeIfSecondaryHealthy_() {
		this.secondaryResponsesRequired_ <= 0
			? (this.log_('Secondary connection is healthy.'),
				(this.isHealthy_ = !0),
				this.secondaryConn_.markConnectionHealthy(),
				this.proceedWithUpgrade_())
			: (this.log_('sending ping on secondary.'),
				this.secondaryConn_.send({ t: 'c', d: { t: kr, d: {} } }));
	}
	proceedWithUpgrade_() {
		(this.secondaryConn_.start(),
			this.log_('sending client ack on secondary'),
			this.secondaryConn_.send({ t: 'c', d: { t: Sr, d: {} } }),
			this.log_('Ending transmission on primary'),
			this.conn_.send({ t: 'c', d: { t: Er, d: {} } }),
			(this.tx_ = this.secondaryConn_),
			this.tryCleanupConnection());
	}
	onPrimaryMessageReceived_(t) {
		const e = nn('t', t),
			i = nn('d', t);
		e === 'c' ? this.onControl_(i) : e === 'd' && this.onDataMessage_(i);
	}
	onDataMessage_(t) {
		(this.onPrimaryResponse_(), this.onMessage_(t));
	}
	onPrimaryResponse_() {
		this.isHealthy_ ||
			(this.primaryResponsesRequired_--,
			this.primaryResponsesRequired_ <= 0 &&
				(this.log_('Primary connection is healthy.'),
				(this.isHealthy_ = !0),
				this.conn_.markConnectionHealthy()));
	}
	onControl_(t) {
		const e = nn(fs, t);
		if (vr in t) {
			const i = t[vr];
			if (e === Df) {
				const s = Object.assign({}, i);
				(this.repoInfo_.isUsingEmulator && (s.h = this.repoInfo_.host), this.onHandshake_(s));
			} else if (e === Er) {
				(this.log_('recvd end transmission on primary'), (this.rx_ = this.secondaryConn_));
				for (let s = 0; s < this.pendingDataMessages.length; ++s)
					this.onDataMessage_(this.pendingDataMessages[s]);
				((this.pendingDataMessages = []), this.tryCleanupConnection());
			} else
				e === Mf
					? this.onConnectionShutdown_(i)
					: e === wr
						? this.onReset_(i)
						: e === Pf
							? Bs('Server Error: ' + i)
							: e === Cr
								? (this.log_('got pong on primary.'),
									this.onPrimaryResponse_(),
									this.sendPingOnPrimaryIfNecessary_())
								: Bs('Unknown control packet command: ' + e);
		}
	}
	onHandshake_(t) {
		const e = t.ts,
			i = t.v,
			s = t.h;
		((this.sessionId = t.s),
			(this.repoInfo_.host = s),
			this.state_ === 0 &&
				(this.conn_.start(),
				this.onConnectionEstablished_(this.conn_, e),
				co !== i && _t('Protocol version mismatch detected'),
				this.tryStartUpgrade_()));
	}
	tryStartUpgrade_() {
		const t = this.transportManager_.upgradeTransport();
		t && this.startUpgrade_(t);
	}
	startUpgrade_(t) {
		((this.secondaryConn_ = new t(
			this.nextTransportId_(),
			this.repoInfo_,
			this.applicationId_,
			this.appCheckToken_,
			this.authToken_,
			this.sessionId
		)),
			(this.secondaryResponsesRequired_ = t.responsesRequiredToBeHealthy || 0));
		const e = this.connReceiver_(this.secondaryConn_),
			i = this.disconnReceiver_(this.secondaryConn_);
		(this.secondaryConn_.open(e, i),
			_n(() => {
				this.secondaryConn_ &&
					(this.log_('Timed out trying to upgrade.'), this.secondaryConn_.close());
			}, Math.floor(Ef)));
	}
	onReset_(t) {
		(this.log_('Reset packet received.  New host: ' + t),
			(this.repoInfo_.host = t),
			this.state_ === 1 ? this.close() : (this.closeConnections_(), this.start_()));
	}
	onConnectionEstablished_(t, e) {
		(this.log_('Realtime connection established.'),
			(this.conn_ = t),
			(this.state_ = 1),
			this.onReady_ && (this.onReady_(e, this.sessionId), (this.onReady_ = null)),
			this.primaryResponsesRequired_ === 0
				? (this.log_('Primary connection is healthy.'), (this.isHealthy_ = !0))
				: _n(() => {
						this.sendPingOnPrimaryIfNecessary_();
					}, Math.floor(kf)));
	}
	sendPingOnPrimaryIfNecessary_() {
		!this.isHealthy_ &&
			this.state_ === 1 &&
			(this.log_('sending ping on primary.'), this.sendData_({ t: 'c', d: { t: kr, d: {} } }));
	}
	onSecondaryConnectionLost_() {
		const t = this.secondaryConn_;
		((this.secondaryConn_ = null), (this.tx_ === t || this.rx_ === t) && this.close());
	}
	onConnectionLost_(t) {
		((this.conn_ = null),
			!t && this.state_ === 0
				? (this.log_('Realtime connection failed.'),
					this.repoInfo_.isCacheableHost() &&
						(xe.remove('host:' + this.repoInfo_.host),
						(this.repoInfo_.internalHost = this.repoInfo_.host)))
				: this.state_ === 1 && this.log_('Realtime connection lost.'),
			this.close());
	}
	onConnectionShutdown_(t) {
		(this.log_('Connection shutdown command received. Shutting down...'),
			this.onKill_ && (this.onKill_(t), (this.onKill_ = null)),
			(this.onDisconnect_ = null),
			this.close());
	}
	sendData_(t) {
		if (this.state_ !== 1) throw 'Connection is not connected';
		this.tx_.send(t);
	}
	close() {
		this.state_ !== 2 &&
			(this.log_('Closing realtime connection.'),
			(this.state_ = 2),
			this.closeConnections_(),
			this.onDisconnect_ && (this.onDisconnect_(), (this.onDisconnect_ = null)));
	}
	closeConnections_() {
		(this.log_('Shutting down all connections'),
			this.conn_ && (this.conn_.close(), (this.conn_ = null)),
			this.secondaryConn_ && (this.secondaryConn_.close(), (this.secondaryConn_ = null)),
			this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_), (this.healthyTimeout_ = null)));
	}
}
class ec {
	put(t, e, i, s) {}
	merge(t, e, i, s) {}
	refreshAuthToken(t) {}
	refreshAppCheckToken(t) {}
	onDisconnectPut(t, e, i) {}
	onDisconnectMerge(t, e, i) {}
	onDisconnectCancel(t, e) {}
	reportStats(t) {}
}
class nc {
	constructor(t) {
		((this.allowedEvents_ = t),
			(this.listeners_ = {}),
			w(Array.isArray(t) && t.length > 0, 'Requires a non-empty array'));
	}
	trigger(t, ...e) {
		if (Array.isArray(this.listeners_[t])) {
			const i = [...this.listeners_[t]];
			for (let s = 0; s < i.length; s++) i[s].callback.apply(i[s].context, e);
		}
	}
	on(t, e, i) {
		(this.validateEventType_(t),
			(this.listeners_[t] = this.listeners_[t] || []),
			this.listeners_[t].push({ callback: e, context: i }));
		const s = this.getInitialEvent(t);
		s && e.apply(i, s);
	}
	off(t, e, i) {
		this.validateEventType_(t);
		const s = this.listeners_[t] || [];
		for (let o = 0; o < s.length; o++)
			if (s[o].callback === e && (!i || i === s[o].context)) {
				s.splice(o, 1);
				return;
			}
	}
	validateEventType_(t) {
		w(
			this.allowedEvents_.find((e) => e === t),
			'Unknown event: ' + t
		);
	}
}
class Ci extends nc {
	static getInstance() {
		return new Ci();
	}
	constructor() {
		(super(['online']),
			(this.online_ = !0),
			typeof window < 'u' &&
				typeof window.addEventListener < 'u' &&
				!Sl() &&
				(window.addEventListener(
					'online',
					() => {
						this.online_ || ((this.online_ = !0), this.trigger('online', !0));
					},
					!1
				),
				window.addEventListener(
					'offline',
					() => {
						this.online_ && ((this.online_ = !1), this.trigger('online', !1));
					},
					!1
				)));
	}
	getInitialEvent(t) {
		return (w(t === 'online', 'Unknown event type: ' + t), [this.online_]);
	}
	currentlyOnline() {
		return this.online_;
	}
}
const Tr = 32,
	Ir = 768;
class z {
	constructor(t, e) {
		if (e === void 0) {
			this.pieces_ = t.split('/');
			let i = 0;
			for (let s = 0; s < this.pieces_.length; s++)
				this.pieces_[s].length > 0 && ((this.pieces_[i] = this.pieces_[s]), i++);
			((this.pieces_.length = i), (this.pieceNum_ = 0));
		} else ((this.pieces_ = t), (this.pieceNum_ = e));
	}
	toString() {
		let t = '';
		for (let e = this.pieceNum_; e < this.pieces_.length; e++)
			this.pieces_[e] !== '' && (t += '/' + this.pieces_[e]);
		return t || '/';
	}
}
function F() {
	return new z('');
}
function R(n) {
	return n.pieceNum_ >= n.pieces_.length ? null : n.pieces_[n.pieceNum_];
}
function ee(n) {
	return n.pieces_.length - n.pieceNum_;
}
function j(n) {
	let t = n.pieceNum_;
	return (t < n.pieces_.length && t++, new z(n.pieces_, t));
}
function ic(n) {
	return n.pieceNum_ < n.pieces_.length ? n.pieces_[n.pieces_.length - 1] : null;
}
function Rf(n) {
	let t = '';
	for (let e = n.pieceNum_; e < n.pieces_.length; e++)
		n.pieces_[e] !== '' && (t += '/' + encodeURIComponent(String(n.pieces_[e])));
	return t || '/';
}
function sc(n, t = 0) {
	return n.pieces_.slice(n.pieceNum_ + t);
}
function oc(n) {
	if (n.pieceNum_ >= n.pieces_.length) return null;
	const t = [];
	for (let e = n.pieceNum_; e < n.pieces_.length - 1; e++) t.push(n.pieces_[e]);
	return new z(t, 0);
}
function et(n, t) {
	const e = [];
	for (let i = n.pieceNum_; i < n.pieces_.length; i++) e.push(n.pieces_[i]);
	if (t instanceof z) for (let i = t.pieceNum_; i < t.pieces_.length; i++) e.push(t.pieces_[i]);
	else {
		const i = t.split('/');
		for (let s = 0; s < i.length; s++) i[s].length > 0 && e.push(i[s]);
	}
	return new z(e, 0);
}
function A(n) {
	return n.pieceNum_ >= n.pieces_.length;
}
function ft(n, t) {
	const e = R(n),
		i = R(t);
	if (e === null) return t;
	if (e === i) return ft(j(n), j(t));
	throw new Error('INTERNAL ERROR: innerPath (' + t + ') is not within outerPath (' + n + ')');
}
function rc(n, t) {
	if (ee(n) !== ee(t)) return !1;
	for (let e = n.pieceNum_, i = t.pieceNum_; e <= n.pieces_.length; e++, i++)
		if (n.pieces_[e] !== t.pieces_[i]) return !1;
	return !0;
}
function Et(n, t) {
	let e = n.pieceNum_,
		i = t.pieceNum_;
	if (ee(n) > ee(t)) return !1;
	for (; e < n.pieces_.length; ) {
		if (n.pieces_[e] !== t.pieces_[i]) return !1;
		(++e, ++i);
	}
	return !0;
}
class Of {
	constructor(t, e) {
		((this.errorPrefix_ = e),
			(this.parts_ = sc(t, 0)),
			(this.byteLength_ = Math.max(1, this.parts_.length)));
		for (let i = 0; i < this.parts_.length; i++) this.byteLength_ += Ui(this.parts_[i]);
		ac(this);
	}
}
function Nf(n, t) {
	(n.parts_.length > 0 && (n.byteLength_ += 1), n.parts_.push(t), (n.byteLength_ += Ui(t)), ac(n));
}
function Lf(n) {
	const t = n.parts_.pop();
	((n.byteLength_ -= Ui(t)), n.parts_.length > 0 && (n.byteLength_ -= 1));
}
function ac(n) {
	if (n.byteLength_ > Ir)
		throw new Error(
			n.errorPrefix_ + 'has a key path longer than ' + Ir + ' bytes (' + n.byteLength_ + ').'
		);
	if (n.parts_.length > Tr)
		throw new Error(
			n.errorPrefix_ +
				'path specified exceeds the maximum depth that can be written (' +
				Tr +
				') or object contains a cycle ' +
				pe(n)
		);
}
function pe(n) {
	return n.parts_.length === 0 ? '' : "in property '" + n.parts_.join('.') + "'";
}
class fo extends nc {
	static getInstance() {
		return new fo();
	}
	constructor() {
		super(['visible']);
		let t, e;
		(typeof document < 'u' &&
			typeof document.addEventListener < 'u' &&
			(typeof document.hidden < 'u'
				? ((e = 'visibilitychange'), (t = 'hidden'))
				: typeof document.mozHidden < 'u'
					? ((e = 'mozvisibilitychange'), (t = 'mozHidden'))
					: typeof document.msHidden < 'u'
						? ((e = 'msvisibilitychange'), (t = 'msHidden'))
						: typeof document.webkitHidden < 'u' &&
							((e = 'webkitvisibilitychange'), (t = 'webkitHidden'))),
			(this.visible_ = !0),
			e &&
				document.addEventListener(
					e,
					() => {
						const i = !document[t];
						i !== this.visible_ && ((this.visible_ = i), this.trigger('visible', i));
					},
					!1
				));
	}
	getInitialEvent(t) {
		return (w(t === 'visible', 'Unknown event type: ' + t), [this.visible_]);
	}
}
const sn = 1e3,
	Ff = 300 * 1e3,
	Mr = 30 * 1e3,
	Bf = 1.3,
	Wf = 3e4,
	zf = 'server_kill',
	Pr = 3;
class Vt extends ec {
	constructor(t, e, i, s, o, r, a, l) {
		if (
			(super(),
			(this.repoInfo_ = t),
			(this.applicationId_ = e),
			(this.onDataUpdate_ = i),
			(this.onConnectStatus_ = s),
			(this.onServerInfoUpdate_ = o),
			(this.authTokenProvider_ = r),
			(this.appCheckTokenProvider_ = a),
			(this.authOverride_ = l),
			(this.id = Vt.nextPersistentConnectionId_++),
			(this.log_ = $n('p:' + this.id + ':')),
			(this.interruptReasons_ = {}),
			(this.listens = new Map()),
			(this.outstandingPuts_ = []),
			(this.outstandingGets_ = []),
			(this.outstandingPutCount_ = 0),
			(this.outstandingGetCount_ = 0),
			(this.onDisconnectRequestQueue_ = []),
			(this.connected_ = !1),
			(this.reconnectDelay_ = sn),
			(this.maxReconnectDelay_ = Ff),
			(this.securityDebugCallback_ = null),
			(this.lastSessionId = null),
			(this.establishConnectionTimer_ = null),
			(this.visible_ = !1),
			(this.requestCBHash_ = {}),
			(this.requestNumber_ = 0),
			(this.realtime_ = null),
			(this.authToken_ = null),
			(this.appCheckToken_ = null),
			(this.forceTokenRefresh_ = !1),
			(this.invalidAuthTokenCount_ = 0),
			(this.invalidAppCheckTokenCount_ = 0),
			(this.firstConnection_ = !0),
			(this.lastConnectionAttemptTime_ = null),
			(this.lastConnectionEstablishedTime_ = null),
			l)
		)
			throw new Error(
				'Auth override specified in options, but not supported on non Node.js platforms'
			);
		(fo.getInstance().on('visible', this.onVisible_, this),
			t.host.indexOf('fblocal') === -1 && Ci.getInstance().on('online', this.onOnline_, this));
	}
	sendRequest(t, e, i) {
		const s = ++this.requestNumber_,
			o = { r: s, a: t, b: e };
		(this.log_(tt(o)),
			w(this.connected_, "sendRequest call when we're not connected not allowed."),
			this.realtime_.sendRequest(o),
			i && (this.requestCBHash_[s] = i));
	}
	get(t) {
		this.initConnection_();
		const e = new ji(),
			s = {
				action: 'g',
				request: { p: t._path.toString(), q: t._queryObject },
				onComplete: (r) => {
					const a = r.d;
					r.s === 'ok' ? e.resolve(a) : e.reject(a);
				}
			};
		(this.outstandingGets_.push(s), this.outstandingGetCount_++);
		const o = this.outstandingGets_.length - 1;
		return (this.connected_ && this.sendGet_(o), e.promise);
	}
	listen(t, e, i, s) {
		this.initConnection_();
		const o = t._queryIdentifier,
			r = t._path.toString();
		(this.log_('Listen called for ' + r + ' ' + o),
			this.listens.has(r) || this.listens.set(r, new Map()),
			w(
				t._queryParams.isDefault() || !t._queryParams.loadsAllData(),
				'listen() called for non-default but complete query'
			),
			w(!this.listens.get(r).has(o), 'listen() called twice for same path/queryId.'));
		const a = { onComplete: s, hashFn: e, query: t, tag: i };
		(this.listens.get(r).set(o, a), this.connected_ && this.sendListen_(a));
	}
	sendGet_(t) {
		const e = this.outstandingGets_[t];
		this.sendRequest('g', e.request, (i) => {
			(delete this.outstandingGets_[t],
				this.outstandingGetCount_--,
				this.outstandingGetCount_ === 0 && (this.outstandingGets_ = []),
				e.onComplete && e.onComplete(i));
		});
	}
	sendListen_(t) {
		const e = t.query,
			i = e._path.toString(),
			s = e._queryIdentifier;
		this.log_('Listen on ' + i + ' for ' + s);
		const o = { p: i },
			r = 'q';
		(t.tag && ((o.q = e._queryObject), (o.t = t.tag)),
			(o.h = t.hashFn()),
			this.sendRequest(r, o, (a) => {
				const l = a.d,
					c = a.s;
				(Vt.warnOnListenWarnings_(l, e),
					(this.listens.get(i) && this.listens.get(i).get(s)) === t &&
						(this.log_('listen response', a),
						c !== 'ok' && this.removeListen_(i, s),
						t.onComplete && t.onComplete(c, l)));
			}));
	}
	static warnOnListenWarnings_(t, e) {
		if (t && typeof t == 'object' && Ut(t, 'w')) {
			const i = He(t, 'w');
			if (Array.isArray(i) && ~i.indexOf('no_index')) {
				const s = '".indexOn": "' + e._queryParams.getIndex().toString() + '"',
					o = e._path.toString();
				_t(
					`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`
				);
			}
		}
	}
	refreshAuthToken(t) {
		((this.authToken_ = t),
			this.log_('Auth token refreshed'),
			this.authToken_
				? this.tryAuth()
				: this.connected_ && this.sendRequest('unauth', {}, () => {}),
			this.reduceReconnectDelayIfAdminCredential_(t));
	}
	reduceReconnectDelayIfAdminCredential_(t) {
		((t && t.length === 40) || Td(t)) &&
			(this.log_('Admin auth credential detected.  Reducing max reconnect time.'),
			(this.maxReconnectDelay_ = Mr));
	}
	refreshAppCheckToken(t) {
		((this.appCheckToken_ = t),
			this.log_('App check token refreshed'),
			this.appCheckToken_
				? this.tryAppCheck()
				: this.connected_ && this.sendRequest('unappeck', {}, () => {}));
	}
	tryAuth() {
		if (this.connected_ && this.authToken_) {
			const t = this.authToken_,
				e = kd(t) ? 'auth' : 'gauth',
				i = { cred: t };
			(this.authOverride_ === null
				? (i.noauth = !0)
				: typeof this.authOverride_ == 'object' && (i.authvar = this.authOverride_),
				this.sendRequest(e, i, (s) => {
					const o = s.s,
						r = s.d || 'error';
					this.authToken_ === t &&
						(o === 'ok' ? (this.invalidAuthTokenCount_ = 0) : this.onAuthRevoked_(o, r));
				}));
		}
	}
	tryAppCheck() {
		this.connected_ &&
			this.appCheckToken_ &&
			this.sendRequest('appcheck', { token: this.appCheckToken_ }, (t) => {
				const e = t.s,
					i = t.d || 'error';
				e === 'ok' ? (this.invalidAppCheckTokenCount_ = 0) : this.onAppCheckRevoked_(e, i);
			});
	}
	unlisten(t, e) {
		const i = t._path.toString(),
			s = t._queryIdentifier;
		(this.log_('Unlisten called for ' + i + ' ' + s),
			w(
				t._queryParams.isDefault() || !t._queryParams.loadsAllData(),
				'unlisten() called for non-default but complete query'
			),
			this.removeListen_(i, s) && this.connected_ && this.sendUnlisten_(i, s, t._queryObject, e));
	}
	sendUnlisten_(t, e, i, s) {
		this.log_('Unlisten on ' + t + ' for ' + e);
		const o = { p: t },
			r = 'n';
		(s && ((o.q = i), (o.t = s)), this.sendRequest(r, o));
	}
	onDisconnectPut(t, e, i) {
		(this.initConnection_(),
			this.connected_
				? this.sendOnDisconnect_('o', t, e, i)
				: this.onDisconnectRequestQueue_.push({
						pathString: t,
						action: 'o',
						data: e,
						onComplete: i
					}));
	}
	onDisconnectMerge(t, e, i) {
		(this.initConnection_(),
			this.connected_
				? this.sendOnDisconnect_('om', t, e, i)
				: this.onDisconnectRequestQueue_.push({
						pathString: t,
						action: 'om',
						data: e,
						onComplete: i
					}));
	}
	onDisconnectCancel(t, e) {
		(this.initConnection_(),
			this.connected_
				? this.sendOnDisconnect_('oc', t, null, e)
				: this.onDisconnectRequestQueue_.push({
						pathString: t,
						action: 'oc',
						data: null,
						onComplete: e
					}));
	}
	sendOnDisconnect_(t, e, i, s) {
		const o = { p: e, d: i };
		(this.log_('onDisconnect ' + t, o),
			this.sendRequest(t, o, (r) => {
				s &&
					setTimeout(() => {
						s(r.s, r.d);
					}, Math.floor(0));
			}));
	}
	put(t, e, i, s) {
		this.putInternal('p', t, e, i, s);
	}
	merge(t, e, i, s) {
		this.putInternal('m', t, e, i, s);
	}
	putInternal(t, e, i, s, o) {
		this.initConnection_();
		const r = { p: e, d: i };
		(o !== void 0 && (r.h = o),
			this.outstandingPuts_.push({ action: t, request: r, onComplete: s }),
			this.outstandingPutCount_++);
		const a = this.outstandingPuts_.length - 1;
		this.connected_ ? this.sendPut_(a) : this.log_('Buffering put: ' + e);
	}
	sendPut_(t) {
		const e = this.outstandingPuts_[t].action,
			i = this.outstandingPuts_[t].request,
			s = this.outstandingPuts_[t].onComplete;
		((this.outstandingPuts_[t].queued = this.connected_),
			this.sendRequest(e, i, (o) => {
				(this.log_(e + ' response', o),
					delete this.outstandingPuts_[t],
					this.outstandingPutCount_--,
					this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []),
					s && s(o.s, o.d));
			}));
	}
	reportStats(t) {
		if (this.connected_) {
			const e = { c: t };
			(this.log_('reportStats', e),
				this.sendRequest('s', e, (i) => {
					if (i.s !== 'ok') {
						const o = i.d;
						this.log_('reportStats', 'Error sending stats: ' + o);
					}
				}));
		}
	}
	onDataMessage_(t) {
		if ('r' in t) {
			this.log_('from server: ' + tt(t));
			const e = t.r,
				i = this.requestCBHash_[e];
			i && (delete this.requestCBHash_[e], i(t.b));
		} else {
			if ('error' in t) throw 'A server-side error has occurred: ' + t.error;
			'a' in t && this.onDataPush_(t.a, t.b);
		}
	}
	onDataPush_(t, e) {
		(this.log_('handleServerMessage', t, e),
			t === 'd'
				? this.onDataUpdate_(e.p, e.d, !1, e.t)
				: t === 'm'
					? this.onDataUpdate_(e.p, e.d, !0, e.t)
					: t === 'c'
						? this.onListenRevoked_(e.p, e.q)
						: t === 'ac'
							? this.onAuthRevoked_(e.s, e.d)
							: t === 'apc'
								? this.onAppCheckRevoked_(e.s, e.d)
								: t === 'sd'
									? this.onSecurityDebugPacket_(e)
									: Bs(
											'Unrecognized action received from server: ' +
												tt(t) +
												`
Are you using the latest client?`
										));
	}
	onReady_(t, e) {
		(this.log_('connection ready'),
			(this.connected_ = !0),
			(this.lastConnectionEstablishedTime_ = new Date().getTime()),
			this.handleTimestamp_(t),
			(this.lastSessionId = e),
			this.firstConnection_ && this.sendConnectStats_(),
			this.restoreState_(),
			(this.firstConnection_ = !1),
			this.onConnectStatus_(!0));
	}
	scheduleConnect_(t) {
		(w(!this.realtime_, "Scheduling a connect when we're already connected/ing?"),
			this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_),
			(this.establishConnectionTimer_ = setTimeout(() => {
				((this.establishConnectionTimer_ = null), this.establishConnection_());
			}, Math.floor(t))));
	}
	initConnection_() {
		!this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0);
	}
	onVisible_(t) {
		(t &&
			!this.visible_ &&
			this.reconnectDelay_ === this.maxReconnectDelay_ &&
			(this.log_('Window became visible.  Reducing delay.'),
			(this.reconnectDelay_ = sn),
			this.realtime_ || this.scheduleConnect_(0)),
			(this.visible_ = t));
	}
	onOnline_(t) {
		t
			? (this.log_('Browser went online.'),
				(this.reconnectDelay_ = sn),
				this.realtime_ || this.scheduleConnect_(0))
			: (this.log_('Browser went offline.  Killing connection.'),
				this.realtime_ && this.realtime_.close());
	}
	onRealtimeDisconnect_() {
		if (
			(this.log_('data client disconnected'),
			(this.connected_ = !1),
			(this.realtime_ = null),
			this.cancelSentTransactions_(),
			(this.requestCBHash_ = {}),
			this.shouldReconnect_())
		) {
			this.visible_
				? this.lastConnectionEstablishedTime_ &&
					(new Date().getTime() - this.lastConnectionEstablishedTime_ > Wf &&
						(this.reconnectDelay_ = sn),
					(this.lastConnectionEstablishedTime_ = null))
				: (this.log_("Window isn't visible.  Delaying reconnect."),
					(this.reconnectDelay_ = this.maxReconnectDelay_),
					(this.lastConnectionAttemptTime_ = new Date().getTime()));
			const t = new Date().getTime() - this.lastConnectionAttemptTime_;
			let e = Math.max(0, this.reconnectDelay_ - t);
			((e = Math.random() * e),
				this.log_('Trying to reconnect in ' + e + 'ms'),
				this.scheduleConnect_(e),
				(this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * Bf)));
		}
		this.onConnectStatus_(!1);
	}
	async establishConnection_() {
		if (this.shouldReconnect_()) {
			(this.log_('Making a connection attempt'),
				(this.lastConnectionAttemptTime_ = new Date().getTime()),
				(this.lastConnectionEstablishedTime_ = null));
			const t = this.onDataMessage_.bind(this),
				e = this.onReady_.bind(this),
				i = this.onRealtimeDisconnect_.bind(this),
				s = this.id + ':' + Vt.nextConnectionId_++,
				o = this.lastSessionId;
			let r = !1,
				a = null;
			const l = function () {
					a ? a.close() : ((r = !0), i());
				},
				c = function (d) {
					(w(a, "sendRequest call when we're not connected not allowed."), a.sendRequest(d));
				};
			this.realtime_ = { close: l, sendRequest: c };
			const h = this.forceTokenRefresh_;
			this.forceTokenRefresh_ = !1;
			try {
				const [d, u] = await Promise.all([
					this.authTokenProvider_.getToken(h),
					this.appCheckTokenProvider_.getToken(h)
				]);
				r
					? ht('getToken() completed but was canceled')
					: (ht('getToken() completed. Creating connection.'),
						(this.authToken_ = d && d.accessToken),
						(this.appCheckToken_ = u && u.token),
						(a = new Af(
							s,
							this.repoInfo_,
							this.applicationId_,
							this.appCheckToken_,
							this.authToken_,
							t,
							e,
							i,
							(f) => {
								(_t(f + ' (' + this.repoInfo_.toString() + ')'), this.interrupt(zf));
							},
							o
						)));
			} catch (d) {
				(this.log_('Failed to get token: ' + d), r || (this.repoInfo_.nodeAdmin && _t(d), l()));
			}
		}
	}
	interrupt(t) {
		(ht('Interrupting connection for reason: ' + t),
			(this.interruptReasons_[t] = !0),
			this.realtime_
				? this.realtime_.close()
				: (this.establishConnectionTimer_ &&
						(clearTimeout(this.establishConnectionTimer_), (this.establishConnectionTimer_ = null)),
					this.connected_ && this.onRealtimeDisconnect_()));
	}
	resume(t) {
		(ht('Resuming connection for reason: ' + t),
			delete this.interruptReasons_[t],
			or(this.interruptReasons_) &&
				((this.reconnectDelay_ = sn), this.realtime_ || this.scheduleConnect_(0)));
	}
	handleTimestamp_(t) {
		const e = t - new Date().getTime();
		this.onServerInfoUpdate_({ serverTimeOffset: e });
	}
	cancelSentTransactions_() {
		for (let t = 0; t < this.outstandingPuts_.length; t++) {
			const e = this.outstandingPuts_[t];
			e &&
				'h' in e.request &&
				e.queued &&
				(e.onComplete && e.onComplete('disconnect'),
				delete this.outstandingPuts_[t],
				this.outstandingPutCount_--);
		}
		this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []);
	}
	onListenRevoked_(t, e) {
		let i;
		e ? (i = e.map((o) => lo(o)).join('$')) : (i = 'default');
		const s = this.removeListen_(t, i);
		s && s.onComplete && s.onComplete('permission_denied');
	}
	removeListen_(t, e) {
		const i = new z(t).toString();
		let s;
		if (this.listens.has(i)) {
			const o = this.listens.get(i);
			((s = o.get(e)), o.delete(e), o.size === 0 && this.listens.delete(i));
		} else s = void 0;
		return s;
	}
	onAuthRevoked_(t, e) {
		(ht('Auth token revoked: ' + t + '/' + e),
			(this.authToken_ = null),
			(this.forceTokenRefresh_ = !0),
			this.realtime_.close(),
			(t === 'invalid_token' || t === 'permission_denied') &&
				(this.invalidAuthTokenCount_++,
				this.invalidAuthTokenCount_ >= Pr &&
					((this.reconnectDelay_ = Mr), this.authTokenProvider_.notifyForInvalidToken())));
	}
	onAppCheckRevoked_(t, e) {
		(ht('App check token revoked: ' + t + '/' + e),
			(this.appCheckToken_ = null),
			(this.forceTokenRefresh_ = !0),
			(t === 'invalid_token' || t === 'permission_denied') &&
				(this.invalidAppCheckTokenCount_++,
				this.invalidAppCheckTokenCount_ >= Pr &&
					this.appCheckTokenProvider_.notifyForInvalidToken()));
	}
	onSecurityDebugPacket_(t) {
		this.securityDebugCallback_
			? this.securityDebugCallback_(t)
			: 'msg' in t &&
				console.log(
					'FIREBASE: ' +
						t.msg.replace(
							`
`,
							`
FIREBASE: `
						)
				);
	}
	restoreState_() {
		(this.tryAuth(), this.tryAppCheck());
		for (const t of this.listens.values()) for (const e of t.values()) this.sendListen_(e);
		for (let t = 0; t < this.outstandingPuts_.length; t++)
			this.outstandingPuts_[t] && this.sendPut_(t);
		for (; this.onDisconnectRequestQueue_.length; ) {
			const t = this.onDisconnectRequestQueue_.shift();
			this.sendOnDisconnect_(t.action, t.pathString, t.data, t.onComplete);
		}
		for (let t = 0; t < this.outstandingGets_.length; t++)
			this.outstandingGets_[t] && this.sendGet_(t);
	}
	sendConnectStats_() {
		const t = {};
		let e = 'js';
		((t['sdk.' + e + '.' + Rl.replace(/\./g, '-')] = 1),
			Sl() ? (t['framework.cordova'] = 1) : yd() && (t['framework.reactnative'] = 1),
			this.reportStats(t));
	}
	shouldReconnect_() {
		const t = Ci.getInstance().currentlyOnline();
		return or(this.interruptReasons_) && t;
	}
}
Vt.nextPersistentConnectionId_ = 0;
Vt.nextConnectionId_ = 0;
class D {
	constructor(t, e) {
		((this.name = t), (this.node = e));
	}
	static Wrap(t, e) {
		return new D(t, e);
	}
}
class $i {
	getCompare() {
		return this.compare.bind(this);
	}
	indexedValueChanged(t, e) {
		const i = new D(je, t),
			s = new D(je, e);
		return this.compare(i, s) !== 0;
	}
	minPost() {
		return D.MIN;
	}
}
let Zn;
class lc extends $i {
	static get __EMPTY_NODE() {
		return Zn;
	}
	static set __EMPTY_NODE(t) {
		Zn = t;
	}
	compare(t, e) {
		return Qe(t.name, e.name);
	}
	isDefinedOn(t) {
		throw Ke('KeyIndex.isDefinedOn not expected to be called.');
	}
	indexedValueChanged(t, e) {
		return !1;
	}
	minPost() {
		return D.MIN;
	}
	maxPost() {
		return new D(Se, Zn);
	}
	makePost(t, e) {
		return (w(typeof t == 'string', 'KeyIndex indexValue must always be a string.'), new D(t, Zn));
	}
	toString() {
		return '.key';
	}
}
const ze = new lc();
class ti {
	constructor(t, e, i, s, o = null) {
		((this.isReverse_ = s), (this.resultGenerator_ = o), (this.nodeStack_ = []));
		let r = 1;
		for (; !t.isEmpty(); )
			if (((t = t), (r = e ? i(t.key, e) : 1), s && (r *= -1), r < 0))
				this.isReverse_ ? (t = t.left) : (t = t.right);
			else if (r === 0) {
				this.nodeStack_.push(t);
				break;
			} else (this.nodeStack_.push(t), this.isReverse_ ? (t = t.right) : (t = t.left));
	}
	getNext() {
		if (this.nodeStack_.length === 0) return null;
		let t = this.nodeStack_.pop(),
			e;
		if (
			(this.resultGenerator_
				? (e = this.resultGenerator_(t.key, t.value))
				: (e = { key: t.key, value: t.value }),
			this.isReverse_)
		)
			for (t = t.left; !t.isEmpty(); ) (this.nodeStack_.push(t), (t = t.right));
		else for (t = t.right; !t.isEmpty(); ) (this.nodeStack_.push(t), (t = t.left));
		return e;
	}
	hasNext() {
		return this.nodeStack_.length > 0;
	}
	peek() {
		if (this.nodeStack_.length === 0) return null;
		const t = this.nodeStack_[this.nodeStack_.length - 1];
		return this.resultGenerator_
			? this.resultGenerator_(t.key, t.value)
			: { key: t.key, value: t.value };
	}
}
class st {
	constructor(t, e, i, s, o) {
		((this.key = t),
			(this.value = e),
			(this.color = i ?? st.RED),
			(this.left = s ?? mt.EMPTY_NODE),
			(this.right = o ?? mt.EMPTY_NODE));
	}
	copy(t, e, i, s, o) {
		return new st(t ?? this.key, e ?? this.value, i ?? this.color, s ?? this.left, o ?? this.right);
	}
	count() {
		return this.left.count() + 1 + this.right.count();
	}
	isEmpty() {
		return !1;
	}
	inorderTraversal(t) {
		return (
			this.left.inorderTraversal(t) || !!t(this.key, this.value) || this.right.inorderTraversal(t)
		);
	}
	reverseTraversal(t) {
		return (
			this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
		);
	}
	min_() {
		return this.left.isEmpty() ? this : this.left.min_();
	}
	minKey() {
		return this.min_().key;
	}
	maxKey() {
		return this.right.isEmpty() ? this.key : this.right.maxKey();
	}
	insert(t, e, i) {
		let s = this;
		const o = i(t, s.key);
		return (
			o < 0
				? (s = s.copy(null, null, null, s.left.insert(t, e, i), null))
				: o === 0
					? (s = s.copy(null, e, null, null, null))
					: (s = s.copy(null, null, null, null, s.right.insert(t, e, i))),
			s.fixUp_()
		);
	}
	removeMin_() {
		if (this.left.isEmpty()) return mt.EMPTY_NODE;
		let t = this;
		return (
			!t.left.isRed_() && !t.left.left.isRed_() && (t = t.moveRedLeft_()),
			(t = t.copy(null, null, null, t.left.removeMin_(), null)),
			t.fixUp_()
		);
	}
	remove(t, e) {
		let i, s;
		if (((i = this), e(t, i.key) < 0))
			(!i.left.isEmpty() && !i.left.isRed_() && !i.left.left.isRed_() && (i = i.moveRedLeft_()),
				(i = i.copy(null, null, null, i.left.remove(t, e), null)));
		else {
			if (
				(i.left.isRed_() && (i = i.rotateRight_()),
				!i.right.isEmpty() &&
					!i.right.isRed_() &&
					!i.right.left.isRed_() &&
					(i = i.moveRedRight_()),
				e(t, i.key) === 0)
			) {
				if (i.right.isEmpty()) return mt.EMPTY_NODE;
				((s = i.right.min_()), (i = i.copy(s.key, s.value, null, null, i.right.removeMin_())));
			}
			i = i.copy(null, null, null, null, i.right.remove(t, e));
		}
		return i.fixUp_();
	}
	isRed_() {
		return this.color;
	}
	fixUp_() {
		let t = this;
		return (
			t.right.isRed_() && !t.left.isRed_() && (t = t.rotateLeft_()),
			t.left.isRed_() && t.left.left.isRed_() && (t = t.rotateRight_()),
			t.left.isRed_() && t.right.isRed_() && (t = t.colorFlip_()),
			t
		);
	}
	moveRedLeft_() {
		let t = this.colorFlip_();
		return (
			t.right.left.isRed_() &&
				((t = t.copy(null, null, null, null, t.right.rotateRight_())),
				(t = t.rotateLeft_()),
				(t = t.colorFlip_())),
			t
		);
	}
	moveRedRight_() {
		let t = this.colorFlip_();
		return (t.left.left.isRed_() && ((t = t.rotateRight_()), (t = t.colorFlip_())), t);
	}
	rotateLeft_() {
		const t = this.copy(null, null, st.RED, null, this.right.left);
		return this.right.copy(null, null, this.color, t, null);
	}
	rotateRight_() {
		const t = this.copy(null, null, st.RED, this.left.right, null);
		return this.left.copy(null, null, this.color, null, t);
	}
	colorFlip_() {
		const t = this.left.copy(null, null, !this.left.color, null, null),
			e = this.right.copy(null, null, !this.right.color, null, null);
		return this.copy(null, null, !this.color, t, e);
	}
	checkMaxDepth_() {
		const t = this.check_();
		return Math.pow(2, t) <= this.count() + 1;
	}
	check_() {
		if (this.isRed_() && this.left.isRed_())
			throw new Error('Red node has red child(' + this.key + ',' + this.value + ')');
		if (this.right.isRed_())
			throw new Error('Right child of (' + this.key + ',' + this.value + ') is red');
		const t = this.left.check_();
		if (t !== this.right.check_()) throw new Error('Black depths differ');
		return t + (this.isRed_() ? 0 : 1);
	}
}
st.RED = !0;
st.BLACK = !1;
class Vf {
	copy(t, e, i, s, o) {
		return this;
	}
	insert(t, e, i) {
		return new st(t, e, null);
	}
	remove(t, e) {
		return this;
	}
	count() {
		return 0;
	}
	isEmpty() {
		return !0;
	}
	inorderTraversal(t) {
		return !1;
	}
	reverseTraversal(t) {
		return !1;
	}
	minKey() {
		return null;
	}
	maxKey() {
		return null;
	}
	check_() {
		return 0;
	}
	isRed_() {
		return !1;
	}
}
class mt {
	constructor(t, e = mt.EMPTY_NODE) {
		((this.comparator_ = t), (this.root_ = e));
	}
	insert(t, e) {
		return new mt(
			this.comparator_,
			this.root_.insert(t, e, this.comparator_).copy(null, null, st.BLACK, null, null)
		);
	}
	remove(t) {
		return new mt(
			this.comparator_,
			this.root_.remove(t, this.comparator_).copy(null, null, st.BLACK, null, null)
		);
	}
	get(t) {
		let e,
			i = this.root_;
		for (; !i.isEmpty(); ) {
			if (((e = this.comparator_(t, i.key)), e === 0)) return i.value;
			e < 0 ? (i = i.left) : e > 0 && (i = i.right);
		}
		return null;
	}
	getPredecessorKey(t) {
		let e,
			i = this.root_,
			s = null;
		for (; !i.isEmpty(); )
			if (((e = this.comparator_(t, i.key)), e === 0)) {
				if (i.left.isEmpty()) return s ? s.key : null;
				for (i = i.left; !i.right.isEmpty(); ) i = i.right;
				return i.key;
			} else e < 0 ? (i = i.left) : e > 0 && ((s = i), (i = i.right));
		throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');
	}
	isEmpty() {
		return this.root_.isEmpty();
	}
	count() {
		return this.root_.count();
	}
	minKey() {
		return this.root_.minKey();
	}
	maxKey() {
		return this.root_.maxKey();
	}
	inorderTraversal(t) {
		return this.root_.inorderTraversal(t);
	}
	reverseTraversal(t) {
		return this.root_.reverseTraversal(t);
	}
	getIterator(t) {
		return new ti(this.root_, null, this.comparator_, !1, t);
	}
	getIteratorFrom(t, e) {
		return new ti(this.root_, t, this.comparator_, !1, e);
	}
	getReverseIteratorFrom(t, e) {
		return new ti(this.root_, t, this.comparator_, !0, e);
	}
	getReverseIterator(t) {
		return new ti(this.root_, null, this.comparator_, !0, t);
	}
}
mt.EMPTY_NODE = new Vf();
function Hf(n, t) {
	return Qe(n.name, t.name);
}
function go(n, t) {
	return Qe(n, t);
}
let zs;
function jf(n) {
	zs = n;
}
const cc = function (n) {
		return typeof n == 'number' ? 'number:' + Bl(n) : 'string:' + n;
	},
	hc = function (n) {
		if (n.isLeafNode()) {
			const t = n.val();
			w(
				typeof t == 'string' || typeof t == 'number' || (typeof t == 'object' && Ut(t, '.sv')),
				'Priority must be a string or number.'
			);
		} else w(n === zs || n.isEmpty(), 'priority of unexpected type.');
		w(n === zs || n.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
	};
let Dr;
class it {
	static set __childrenNodeConstructor(t) {
		Dr = t;
	}
	static get __childrenNodeConstructor() {
		return Dr;
	}
	constructor(t, e = it.__childrenNodeConstructor.EMPTY_NODE) {
		((this.value_ = t),
			(this.priorityNode_ = e),
			(this.lazyHash_ = null),
			w(
				this.value_ !== void 0 && this.value_ !== null,
				"LeafNode shouldn't be created with null/undefined value."
			),
			hc(this.priorityNode_));
	}
	isLeafNode() {
		return !0;
	}
	getPriority() {
		return this.priorityNode_;
	}
	updatePriority(t) {
		return new it(this.value_, t);
	}
	getImmediateChild(t) {
		return t === '.priority' ? this.priorityNode_ : it.__childrenNodeConstructor.EMPTY_NODE;
	}
	getChild(t) {
		return A(t)
			? this
			: R(t) === '.priority'
				? this.priorityNode_
				: it.__childrenNodeConstructor.EMPTY_NODE;
	}
	hasChild() {
		return !1;
	}
	getPredecessorChildName(t, e) {
		return null;
	}
	updateImmediateChild(t, e) {
		return t === '.priority'
			? this.updatePriority(e)
			: e.isEmpty() && t !== '.priority'
				? this
				: it.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t, e).updatePriority(
						this.priorityNode_
					);
	}
	updateChild(t, e) {
		const i = R(t);
		return i === null
			? e
			: e.isEmpty() && i !== '.priority'
				? this
				: (w(i !== '.priority' || ee(t) === 1, '.priority must be the last token in a path'),
					this.updateImmediateChild(
						i,
						it.__childrenNodeConstructor.EMPTY_NODE.updateChild(j(t), e)
					));
	}
	isEmpty() {
		return !1;
	}
	numChildren() {
		return 0;
	}
	forEachChild(t, e) {
		return !1;
	}
	val(t) {
		return t && !this.getPriority().isEmpty()
			? { '.value': this.getValue(), '.priority': this.getPriority().val() }
			: this.getValue();
	}
	hash() {
		if (this.lazyHash_ === null) {
			let t = '';
			this.priorityNode_.isEmpty() || (t += 'priority:' + cc(this.priorityNode_.val()) + ':');
			const e = typeof this.value_;
			((t += e + ':'),
				e === 'number' ? (t += Bl(this.value_)) : (t += this.value_),
				(this.lazyHash_ = Nl(t)));
		}
		return this.lazyHash_;
	}
	getValue() {
		return this.value_;
	}
	compareTo(t) {
		return t === it.__childrenNodeConstructor.EMPTY_NODE
			? 1
			: t instanceof it.__childrenNodeConstructor
				? -1
				: (w(t.isLeafNode(), 'Unknown node type'), this.compareToLeafNode_(t));
	}
	compareToLeafNode_(t) {
		const e = typeof t.value_,
			i = typeof this.value_,
			s = it.VALUE_TYPE_ORDER.indexOf(e),
			o = it.VALUE_TYPE_ORDER.indexOf(i);
		return (
			w(s >= 0, 'Unknown leaf type: ' + e),
			w(o >= 0, 'Unknown leaf type: ' + i),
			s === o
				? i === 'object'
					? 0
					: this.value_ < t.value_
						? -1
						: this.value_ === t.value_
							? 0
							: 1
				: o - s
		);
	}
	withIndex() {
		return this;
	}
	isIndexed() {
		return !0;
	}
	equals(t) {
		if (t === this) return !0;
		if (t.isLeafNode()) {
			const e = t;
			return this.value_ === e.value_ && this.priorityNode_.equals(e.priorityNode_);
		} else return !1;
	}
}
it.VALUE_TYPE_ORDER = ['object', 'boolean', 'number', 'string'];
let dc, uc;
function Uf(n) {
	dc = n;
}
function $f(n) {
	uc = n;
}
class Yf extends $i {
	compare(t, e) {
		const i = t.node.getPriority(),
			s = e.node.getPriority(),
			o = i.compareTo(s);
		return o === 0 ? Qe(t.name, e.name) : o;
	}
	isDefinedOn(t) {
		return !t.getPriority().isEmpty();
	}
	indexedValueChanged(t, e) {
		return !t.getPriority().equals(e.getPriority());
	}
	minPost() {
		return D.MIN;
	}
	maxPost() {
		return new D(Se, new it('[PRIORITY-POST]', uc));
	}
	makePost(t, e) {
		const i = dc(t);
		return new D(e, new it('[PRIORITY-POST]', i));
	}
	toString() {
		return '.priority';
	}
}
const X = new Yf();
const Gf = Math.log(2);
class qf {
	constructor(t) {
		const e = (o) => parseInt(Math.log(o) / Gf, 10),
			i = (o) => parseInt(Array(o + 1).join('1'), 2);
		((this.count = e(t + 1)), (this.current_ = this.count - 1));
		const s = i(this.count);
		this.bits_ = (t + 1) & s;
	}
	nextBitIsOne() {
		const t = !(this.bits_ & (1 << this.current_));
		return (this.current_--, t);
	}
}
const Si = function (n, t, e, i) {
	n.sort(t);
	const s = function (l, c) {
			const h = c - l;
			let d, u;
			if (h === 0) return null;
			if (h === 1) return ((d = n[l]), (u = e ? e(d) : d), new st(u, d.node, st.BLACK, null, null));
			{
				const f = parseInt(h / 2, 10) + l,
					g = s(l, f),
					p = s(f + 1, c);
				return ((d = n[f]), (u = e ? e(d) : d), new st(u, d.node, st.BLACK, g, p));
			}
		},
		o = function (l) {
			let c = null,
				h = null,
				d = n.length;
			const u = function (g, p) {
					const m = d - g,
						_ = d;
					d -= g;
					const b = s(m + 1, _),
						x = n[m],
						v = e ? e(x) : x;
					f(new st(v, x.node, p, null, b));
				},
				f = function (g) {
					c ? ((c.left = g), (c = g)) : ((h = g), (c = g));
				};
			for (let g = 0; g < l.count; ++g) {
				const p = l.nextBitIsOne(),
					m = Math.pow(2, l.count - (g + 1));
				p ? u(m, st.BLACK) : (u(m, st.BLACK), u(m, st.RED));
			}
			return h;
		},
		r = new qf(n.length),
		a = o(r);
	return new mt(i || t, a);
};
let gs;
const Re = {};
class Ft {
	static get Default() {
		return (
			w(Re && X, 'ChildrenNode.ts has not been loaded'),
			(gs = gs || new Ft({ '.priority': Re }, { '.priority': X })),
			gs
		);
	}
	constructor(t, e) {
		((this.indexes_ = t), (this.indexSet_ = e));
	}
	get(t) {
		const e = He(this.indexes_, t);
		if (!e) throw new Error('No index defined for ' + t);
		return e instanceof mt ? e : null;
	}
	hasIndex(t) {
		return Ut(this.indexSet_, t.toString());
	}
	addIndex(t, e) {
		w(t !== ze, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
		const i = [];
		let s = !1;
		const o = e.getIterator(D.Wrap);
		let r = o.getNext();
		for (; r; ) ((s = s || t.isDefinedOn(r.node)), i.push(r), (r = o.getNext()));
		let a;
		s ? (a = Si(i, t.getCompare())) : (a = Re);
		const l = t.toString(),
			c = Object.assign({}, this.indexSet_);
		c[l] = t;
		const h = Object.assign({}, this.indexes_);
		return ((h[l] = a), new Ft(h, c));
	}
	addToIndexes(t, e) {
		const i = yi(this.indexes_, (s, o) => {
			const r = He(this.indexSet_, o);
			if ((w(r, 'Missing index implementation for ' + o), s === Re))
				if (r.isDefinedOn(t.node)) {
					const a = [],
						l = e.getIterator(D.Wrap);
					let c = l.getNext();
					for (; c; ) (c.name !== t.name && a.push(c), (c = l.getNext()));
					return (a.push(t), Si(a, r.getCompare()));
				} else return Re;
			else {
				const a = e.get(t.name);
				let l = s;
				return (a && (l = l.remove(new D(t.name, a))), l.insert(t, t.node));
			}
		});
		return new Ft(i, this.indexSet_);
	}
	removeFromIndexes(t, e) {
		const i = yi(this.indexes_, (s) => {
			if (s === Re) return s;
			{
				const o = e.get(t.name);
				return o ? s.remove(new D(t.name, o)) : s;
			}
		});
		return new Ft(i, this.indexSet_);
	}
}
let on;
class T {
	static get EMPTY_NODE() {
		return on || (on = new T(new mt(go), null, Ft.Default));
	}
	constructor(t, e, i) {
		((this.children_ = t),
			(this.priorityNode_ = e),
			(this.indexMap_ = i),
			(this.lazyHash_ = null),
			this.priorityNode_ && hc(this.priorityNode_),
			this.children_.isEmpty() &&
				w(
					!this.priorityNode_ || this.priorityNode_.isEmpty(),
					'An empty node cannot have a priority'
				));
	}
	isLeafNode() {
		return !1;
	}
	getPriority() {
		return this.priorityNode_ || on;
	}
	updatePriority(t) {
		return this.children_.isEmpty() ? this : new T(this.children_, t, this.indexMap_);
	}
	getImmediateChild(t) {
		if (t === '.priority') return this.getPriority();
		{
			const e = this.children_.get(t);
			return e === null ? on : e;
		}
	}
	getChild(t) {
		const e = R(t);
		return e === null ? this : this.getImmediateChild(e).getChild(j(t));
	}
	hasChild(t) {
		return this.children_.get(t) !== null;
	}
	updateImmediateChild(t, e) {
		if ((w(e, 'We should always be passing snapshot nodes'), t === '.priority'))
			return this.updatePriority(e);
		{
			const i = new D(t, e);
			let s, o;
			e.isEmpty()
				? ((s = this.children_.remove(t)),
					(o = this.indexMap_.removeFromIndexes(i, this.children_)))
				: ((s = this.children_.insert(t, e)), (o = this.indexMap_.addToIndexes(i, this.children_)));
			const r = s.isEmpty() ? on : this.priorityNode_;
			return new T(s, r, o);
		}
	}
	updateChild(t, e) {
		const i = R(t);
		if (i === null) return e;
		{
			w(R(t) !== '.priority' || ee(t) === 1, '.priority must be the last token in a path');
			const s = this.getImmediateChild(i).updateChild(j(t), e);
			return this.updateImmediateChild(i, s);
		}
	}
	isEmpty() {
		return this.children_.isEmpty();
	}
	numChildren() {
		return this.children_.count();
	}
	val(t) {
		if (this.isEmpty()) return null;
		const e = {};
		let i = 0,
			s = 0,
			o = !0;
		if (
			(this.forEachChild(X, (r, a) => {
				((e[r] = a.val(t)),
					i++,
					o && T.INTEGER_REGEXP_.test(r) ? (s = Math.max(s, Number(r))) : (o = !1));
			}),
			!t && o && s < 2 * i)
		) {
			const r = [];
			for (const a in e) r[a] = e[a];
			return r;
		} else
			return (t && !this.getPriority().isEmpty() && (e['.priority'] = this.getPriority().val()), e);
	}
	hash() {
		if (this.lazyHash_ === null) {
			let t = '';
			(this.getPriority().isEmpty() || (t += 'priority:' + cc(this.getPriority().val()) + ':'),
				this.forEachChild(X, (e, i) => {
					const s = i.hash();
					s !== '' && (t += ':' + e + ':' + s);
				}),
				(this.lazyHash_ = t === '' ? '' : Nl(t)));
		}
		return this.lazyHash_;
	}
	getPredecessorChildName(t, e, i) {
		const s = this.resolveIndex_(i);
		if (s) {
			const o = s.getPredecessorKey(new D(t, e));
			return o ? o.name : null;
		} else return this.children_.getPredecessorKey(t);
	}
	getFirstChildName(t) {
		const e = this.resolveIndex_(t);
		if (e) {
			const i = e.minKey();
			return i && i.name;
		} else return this.children_.minKey();
	}
	getFirstChild(t) {
		const e = this.getFirstChildName(t);
		return e ? new D(e, this.children_.get(e)) : null;
	}
	getLastChildName(t) {
		const e = this.resolveIndex_(t);
		if (e) {
			const i = e.maxKey();
			return i && i.name;
		} else return this.children_.maxKey();
	}
	getLastChild(t) {
		const e = this.getLastChildName(t);
		return e ? new D(e, this.children_.get(e)) : null;
	}
	forEachChild(t, e) {
		const i = this.resolveIndex_(t);
		return i ? i.inorderTraversal((s) => e(s.name, s.node)) : this.children_.inorderTraversal(e);
	}
	getIterator(t) {
		return this.getIteratorFrom(t.minPost(), t);
	}
	getIteratorFrom(t, e) {
		const i = this.resolveIndex_(e);
		if (i) return i.getIteratorFrom(t, (s) => s);
		{
			const s = this.children_.getIteratorFrom(t.name, D.Wrap);
			let o = s.peek();
			for (; o != null && e.compare(o, t) < 0; ) (s.getNext(), (o = s.peek()));
			return s;
		}
	}
	getReverseIterator(t) {
		return this.getReverseIteratorFrom(t.maxPost(), t);
	}
	getReverseIteratorFrom(t, e) {
		const i = this.resolveIndex_(e);
		if (i) return i.getReverseIteratorFrom(t, (s) => s);
		{
			const s = this.children_.getReverseIteratorFrom(t.name, D.Wrap);
			let o = s.peek();
			for (; o != null && e.compare(o, t) > 0; ) (s.getNext(), (o = s.peek()));
			return s;
		}
	}
	compareTo(t) {
		return this.isEmpty()
			? t.isEmpty()
				? 0
				: -1
			: t.isLeafNode() || t.isEmpty()
				? 1
				: t === Yn
					? -1
					: 0;
	}
	withIndex(t) {
		if (t === ze || this.indexMap_.hasIndex(t)) return this;
		{
			const e = this.indexMap_.addIndex(t, this.children_);
			return new T(this.children_, this.priorityNode_, e);
		}
	}
	isIndexed(t) {
		return t === ze || this.indexMap_.hasIndex(t);
	}
	equals(t) {
		if (t === this) return !0;
		if (t.isLeafNode()) return !1;
		{
			const e = t;
			if (this.getPriority().equals(e.getPriority()))
				if (this.children_.count() === e.children_.count()) {
					const i = this.getIterator(X),
						s = e.getIterator(X);
					let o = i.getNext(),
						r = s.getNext();
					for (; o && r; ) {
						if (o.name !== r.name || !o.node.equals(r.node)) return !1;
						((o = i.getNext()), (r = s.getNext()));
					}
					return o === null && r === null;
				} else return !1;
			else return !1;
		}
	}
	resolveIndex_(t) {
		return t === ze ? null : this.indexMap_.get(t.toString());
	}
}
T.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class Kf extends T {
	constructor() {
		super(new mt(go), T.EMPTY_NODE, Ft.Default);
	}
	compareTo(t) {
		return t === this ? 0 : 1;
	}
	equals(t) {
		return t === this;
	}
	getPriority() {
		return this;
	}
	getImmediateChild(t) {
		return T.EMPTY_NODE;
	}
	isEmpty() {
		return !1;
	}
}
const Yn = new Kf();
Object.defineProperties(D, {
	MIN: { value: new D(je, T.EMPTY_NODE) },
	MAX: { value: new D(Se, Yn) }
});
lc.__EMPTY_NODE = T.EMPTY_NODE;
it.__childrenNodeConstructor = T;
jf(Yn);
$f(Yn);
const Xf = !0;
function ot(n, t = null) {
	if (n === null) return T.EMPTY_NODE;
	if (
		(typeof n == 'object' && '.priority' in n && (t = n['.priority']),
		w(
			t === null ||
				typeof t == 'string' ||
				typeof t == 'number' ||
				(typeof t == 'object' && '.sv' in t),
			'Invalid priority type found: ' + typeof t
		),
		typeof n == 'object' && '.value' in n && n['.value'] !== null && (n = n['.value']),
		typeof n != 'object' || '.sv' in n)
	) {
		const e = n;
		return new it(e, ot(t));
	}
	if (!(n instanceof Array) && Xf) {
		const e = [];
		let i = !1;
		if (
			(bt(n, (r, a) => {
				if (r.substring(0, 1) !== '.') {
					const l = ot(a);
					l.isEmpty() || ((i = i || !l.getPriority().isEmpty()), e.push(new D(r, l)));
				}
			}),
			e.length === 0)
		)
			return T.EMPTY_NODE;
		const o = Si(e, Hf, (r) => r.name, go);
		if (i) {
			const r = Si(e, X.getCompare());
			return new T(o, ot(t), new Ft({ '.priority': r }, { '.priority': X }));
		} else return new T(o, ot(t), Ft.Default);
	} else {
		let e = T.EMPTY_NODE;
		return (
			bt(n, (i, s) => {
				if (Ut(n, i) && i.substring(0, 1) !== '.') {
					const o = ot(s);
					(o.isLeafNode() || !o.isEmpty()) && (e = e.updateImmediateChild(i, o));
				}
			}),
			e.updatePriority(ot(t))
		);
	}
}
Uf(ot);
class Qf extends $i {
	constructor(t) {
		(super(),
			(this.indexPath_ = t),
			w(!A(t) && R(t) !== '.priority', "Can't create PathIndex with empty path or .priority key"));
	}
	extractChild(t) {
		return t.getChild(this.indexPath_);
	}
	isDefinedOn(t) {
		return !t.getChild(this.indexPath_).isEmpty();
	}
	compare(t, e) {
		const i = this.extractChild(t.node),
			s = this.extractChild(e.node),
			o = i.compareTo(s);
		return o === 0 ? Qe(t.name, e.name) : o;
	}
	makePost(t, e) {
		const i = ot(t),
			s = T.EMPTY_NODE.updateChild(this.indexPath_, i);
		return new D(e, s);
	}
	maxPost() {
		const t = T.EMPTY_NODE.updateChild(this.indexPath_, Yn);
		return new D(Se, t);
	}
	toString() {
		return sc(this.indexPath_, 0).join('/');
	}
}
class Jf extends $i {
	compare(t, e) {
		const i = t.node.compareTo(e.node);
		return i === 0 ? Qe(t.name, e.name) : i;
	}
	isDefinedOn(t) {
		return !0;
	}
	indexedValueChanged(t, e) {
		return !t.equals(e);
	}
	minPost() {
		return D.MIN;
	}
	maxPost() {
		return D.MAX;
	}
	makePost(t, e) {
		const i = ot(t);
		return new D(e, i);
	}
	toString() {
		return '.value';
	}
}
const Zf = new Jf();
function fc(n) {
	return { type: 'value', snapshotNode: n };
}
function Ue(n, t) {
	return { type: 'child_added', snapshotNode: t, childName: n };
}
function Mn(n, t) {
	return { type: 'child_removed', snapshotNode: t, childName: n };
}
function Pn(n, t, e) {
	return { type: 'child_changed', snapshotNode: t, childName: n, oldSnap: e };
}
function tg(n, t) {
	return { type: 'child_moved', snapshotNode: t, childName: n };
}
class po {
	constructor(t) {
		this.index_ = t;
	}
	updateChild(t, e, i, s, o, r) {
		w(t.isIndexed(this.index_), 'A node must be indexed if only a child is updated');
		const a = t.getImmediateChild(e);
		return (a.getChild(s).equals(i.getChild(s)) && a.isEmpty() === i.isEmpty()) ||
			(r != null &&
				(i.isEmpty()
					? t.hasChild(e)
						? r.trackChildChange(Mn(e, a))
						: w(
								t.isLeafNode(),
								'A child remove without an old child only makes sense on a leaf node'
							)
					: a.isEmpty()
						? r.trackChildChange(Ue(e, i))
						: r.trackChildChange(Pn(e, i, a))),
			t.isLeafNode() && i.isEmpty())
			? t
			: t.updateImmediateChild(e, i).withIndex(this.index_);
	}
	updateFullNode(t, e, i) {
		return (
			i != null &&
				(t.isLeafNode() ||
					t.forEachChild(X, (s, o) => {
						e.hasChild(s) || i.trackChildChange(Mn(s, o));
					}),
				e.isLeafNode() ||
					e.forEachChild(X, (s, o) => {
						if (t.hasChild(s)) {
							const r = t.getImmediateChild(s);
							r.equals(o) || i.trackChildChange(Pn(s, o, r));
						} else i.trackChildChange(Ue(s, o));
					})),
			e.withIndex(this.index_)
		);
	}
	updatePriority(t, e) {
		return t.isEmpty() ? T.EMPTY_NODE : t.updatePriority(e);
	}
	filtersNodes() {
		return !1;
	}
	getIndexedFilter() {
		return this;
	}
	getIndex() {
		return this.index_;
	}
}
class Dn {
	constructor(t) {
		((this.indexedFilter_ = new po(t.getIndex())),
			(this.index_ = t.getIndex()),
			(this.startPost_ = Dn.getStartPost_(t)),
			(this.endPost_ = Dn.getEndPost_(t)),
			(this.startIsInclusive_ = !t.startAfterSet_),
			(this.endIsInclusive_ = !t.endBeforeSet_));
	}
	getStartPost() {
		return this.startPost_;
	}
	getEndPost() {
		return this.endPost_;
	}
	matches(t) {
		const e = this.startIsInclusive_
				? this.index_.compare(this.getStartPost(), t) <= 0
				: this.index_.compare(this.getStartPost(), t) < 0,
			i = this.endIsInclusive_
				? this.index_.compare(t, this.getEndPost()) <= 0
				: this.index_.compare(t, this.getEndPost()) < 0;
		return e && i;
	}
	updateChild(t, e, i, s, o, r) {
		return (
			this.matches(new D(e, i)) || (i = T.EMPTY_NODE),
			this.indexedFilter_.updateChild(t, e, i, s, o, r)
		);
	}
	updateFullNode(t, e, i) {
		e.isLeafNode() && (e = T.EMPTY_NODE);
		let s = e.withIndex(this.index_);
		s = s.updatePriority(T.EMPTY_NODE);
		const o = this;
		return (
			e.forEachChild(X, (r, a) => {
				o.matches(new D(r, a)) || (s = s.updateImmediateChild(r, T.EMPTY_NODE));
			}),
			this.indexedFilter_.updateFullNode(t, s, i)
		);
	}
	updatePriority(t, e) {
		return t;
	}
	filtersNodes() {
		return !0;
	}
	getIndexedFilter() {
		return this.indexedFilter_;
	}
	getIndex() {
		return this.index_;
	}
	static getStartPost_(t) {
		if (t.hasStart()) {
			const e = t.getIndexStartName();
			return t.getIndex().makePost(t.getIndexStartValue(), e);
		} else return t.getIndex().minPost();
	}
	static getEndPost_(t) {
		if (t.hasEnd()) {
			const e = t.getIndexEndName();
			return t.getIndex().makePost(t.getIndexEndValue(), e);
		} else return t.getIndex().maxPost();
	}
}
class eg {
	constructor(t) {
		((this.withinDirectionalStart = (e) =>
			this.reverse_ ? this.withinEndPost(e) : this.withinStartPost(e)),
			(this.withinDirectionalEnd = (e) =>
				this.reverse_ ? this.withinStartPost(e) : this.withinEndPost(e)),
			(this.withinStartPost = (e) => {
				const i = this.index_.compare(this.rangedFilter_.getStartPost(), e);
				return this.startIsInclusive_ ? i <= 0 : i < 0;
			}),
			(this.withinEndPost = (e) => {
				const i = this.index_.compare(e, this.rangedFilter_.getEndPost());
				return this.endIsInclusive_ ? i <= 0 : i < 0;
			}),
			(this.rangedFilter_ = new Dn(t)),
			(this.index_ = t.getIndex()),
			(this.limit_ = t.getLimit()),
			(this.reverse_ = !t.isViewFromLeft()),
			(this.startIsInclusive_ = !t.startAfterSet_),
			(this.endIsInclusive_ = !t.endBeforeSet_));
	}
	updateChild(t, e, i, s, o, r) {
		return (
			this.rangedFilter_.matches(new D(e, i)) || (i = T.EMPTY_NODE),
			t.getImmediateChild(e).equals(i)
				? t
				: t.numChildren() < this.limit_
					? this.rangedFilter_.getIndexedFilter().updateChild(t, e, i, s, o, r)
					: this.fullLimitUpdateChild_(t, e, i, o, r)
		);
	}
	updateFullNode(t, e, i) {
		let s;
		if (e.isLeafNode() || e.isEmpty()) s = T.EMPTY_NODE.withIndex(this.index_);
		else if (this.limit_ * 2 < e.numChildren() && e.isIndexed(this.index_)) {
			s = T.EMPTY_NODE.withIndex(this.index_);
			let o;
			this.reverse_
				? (o = e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_))
				: (o = e.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_));
			let r = 0;
			for (; o.hasNext() && r < this.limit_; ) {
				const a = o.getNext();
				if (this.withinDirectionalStart(a))
					if (this.withinDirectionalEnd(a)) ((s = s.updateImmediateChild(a.name, a.node)), r++);
					else break;
				else continue;
			}
		} else {
			((s = e.withIndex(this.index_)), (s = s.updatePriority(T.EMPTY_NODE)));
			let o;
			this.reverse_ ? (o = s.getReverseIterator(this.index_)) : (o = s.getIterator(this.index_));
			let r = 0;
			for (; o.hasNext(); ) {
				const a = o.getNext();
				r < this.limit_ && this.withinDirectionalStart(a) && this.withinDirectionalEnd(a)
					? r++
					: (s = s.updateImmediateChild(a.name, T.EMPTY_NODE));
			}
		}
		return this.rangedFilter_.getIndexedFilter().updateFullNode(t, s, i);
	}
	updatePriority(t, e) {
		return t;
	}
	filtersNodes() {
		return !0;
	}
	getIndexedFilter() {
		return this.rangedFilter_.getIndexedFilter();
	}
	getIndex() {
		return this.index_;
	}
	fullLimitUpdateChild_(t, e, i, s, o) {
		let r;
		if (this.reverse_) {
			const d = this.index_.getCompare();
			r = (u, f) => d(f, u);
		} else r = this.index_.getCompare();
		const a = t;
		w(a.numChildren() === this.limit_, '');
		const l = new D(e, i),
			c = this.reverse_ ? a.getFirstChild(this.index_) : a.getLastChild(this.index_),
			h = this.rangedFilter_.matches(l);
		if (a.hasChild(e)) {
			const d = a.getImmediateChild(e);
			let u = s.getChildAfterChild(this.index_, c, this.reverse_);
			for (; u != null && (u.name === e || a.hasChild(u.name)); )
				u = s.getChildAfterChild(this.index_, u, this.reverse_);
			const f = u == null ? 1 : r(u, l);
			if (h && !i.isEmpty() && f >= 0)
				return (o?.trackChildChange(Pn(e, i, d)), a.updateImmediateChild(e, i));
			{
				o?.trackChildChange(Mn(e, d));
				const p = a.updateImmediateChild(e, T.EMPTY_NODE);
				return u != null && this.rangedFilter_.matches(u)
					? (o?.trackChildChange(Ue(u.name, u.node)), p.updateImmediateChild(u.name, u.node))
					: p;
			}
		} else
			return i.isEmpty()
				? t
				: h && r(c, l) >= 0
					? (o != null && (o.trackChildChange(Mn(c.name, c.node)), o.trackChildChange(Ue(e, i))),
						a.updateImmediateChild(e, i).updateImmediateChild(c.name, T.EMPTY_NODE))
					: t;
	}
}
class mo {
	constructor() {
		((this.limitSet_ = !1),
			(this.startSet_ = !1),
			(this.startNameSet_ = !1),
			(this.startAfterSet_ = !1),
			(this.endSet_ = !1),
			(this.endNameSet_ = !1),
			(this.endBeforeSet_ = !1),
			(this.limit_ = 0),
			(this.viewFrom_ = ''),
			(this.indexStartValue_ = null),
			(this.indexStartName_ = ''),
			(this.indexEndValue_ = null),
			(this.indexEndName_ = ''),
			(this.index_ = X));
	}
	hasStart() {
		return this.startSet_;
	}
	isViewFromLeft() {
		return this.viewFrom_ === '' ? this.startSet_ : this.viewFrom_ === 'l';
	}
	getIndexStartValue() {
		return (w(this.startSet_, 'Only valid if start has been set'), this.indexStartValue_);
	}
	getIndexStartName() {
		return (
			w(this.startSet_, 'Only valid if start has been set'),
			this.startNameSet_ ? this.indexStartName_ : je
		);
	}
	hasEnd() {
		return this.endSet_;
	}
	getIndexEndValue() {
		return (w(this.endSet_, 'Only valid if end has been set'), this.indexEndValue_);
	}
	getIndexEndName() {
		return (
			w(this.endSet_, 'Only valid if end has been set'),
			this.endNameSet_ ? this.indexEndName_ : Se
		);
	}
	hasLimit() {
		return this.limitSet_;
	}
	hasAnchoredLimit() {
		return this.limitSet_ && this.viewFrom_ !== '';
	}
	getLimit() {
		return (w(this.limitSet_, 'Only valid if limit has been set'), this.limit_);
	}
	getIndex() {
		return this.index_;
	}
	loadsAllData() {
		return !(this.startSet_ || this.endSet_ || this.limitSet_);
	}
	isDefault() {
		return this.loadsAllData() && this.index_ === X;
	}
	copy() {
		const t = new mo();
		return (
			(t.limitSet_ = this.limitSet_),
			(t.limit_ = this.limit_),
			(t.startSet_ = this.startSet_),
			(t.startAfterSet_ = this.startAfterSet_),
			(t.indexStartValue_ = this.indexStartValue_),
			(t.startNameSet_ = this.startNameSet_),
			(t.indexStartName_ = this.indexStartName_),
			(t.endSet_ = this.endSet_),
			(t.endBeforeSet_ = this.endBeforeSet_),
			(t.indexEndValue_ = this.indexEndValue_),
			(t.endNameSet_ = this.endNameSet_),
			(t.indexEndName_ = this.indexEndName_),
			(t.index_ = this.index_),
			(t.viewFrom_ = this.viewFrom_),
			t
		);
	}
}
function ng(n) {
	return n.loadsAllData() ? new po(n.getIndex()) : n.hasLimit() ? new eg(n) : new Dn(n);
}
function Ar(n) {
	const t = {};
	if (n.isDefault()) return t;
	let e;
	if (
		(n.index_ === X
			? (e = '$priority')
			: n.index_ === Zf
				? (e = '$value')
				: n.index_ === ze
					? (e = '$key')
					: (w(n.index_ instanceof Qf, 'Unrecognized index type!'), (e = n.index_.toString())),
		(t.orderBy = tt(e)),
		n.startSet_)
	) {
		const i = n.startAfterSet_ ? 'startAfter' : 'startAt';
		((t[i] = tt(n.indexStartValue_)), n.startNameSet_ && (t[i] += ',' + tt(n.indexStartName_)));
	}
	if (n.endSet_) {
		const i = n.endBeforeSet_ ? 'endBefore' : 'endAt';
		((t[i] = tt(n.indexEndValue_)), n.endNameSet_ && (t[i] += ',' + tt(n.indexEndName_)));
	}
	return (
		n.limitSet_ && (n.isViewFromLeft() ? (t.limitToFirst = n.limit_) : (t.limitToLast = n.limit_)),
		t
	);
}
function Rr(n) {
	const t = {};
	if (
		(n.startSet_ &&
			((t.sp = n.indexStartValue_),
			n.startNameSet_ && (t.sn = n.indexStartName_),
			(t.sin = !n.startAfterSet_)),
		n.endSet_ &&
			((t.ep = n.indexEndValue_),
			n.endNameSet_ && (t.en = n.indexEndName_),
			(t.ein = !n.endBeforeSet_)),
		n.limitSet_)
	) {
		t.l = n.limit_;
		let e = n.viewFrom_;
		(e === '' && (n.isViewFromLeft() ? (e = 'l') : (e = 'r')), (t.vf = e));
	}
	return (n.index_ !== X && (t.i = n.index_.toString()), t);
}
class Ei extends ec {
	reportStats(t) {
		throw new Error('Method not implemented.');
	}
	static getListenId_(t, e) {
		return e !== void 0
			? 'tag$' + e
			: (w(t._queryParams.isDefault(), "should have a tag if it's not a default query."),
				t._path.toString());
	}
	constructor(t, e, i, s) {
		(super(),
			(this.repoInfo_ = t),
			(this.onDataUpdate_ = e),
			(this.authTokenProvider_ = i),
			(this.appCheckTokenProvider_ = s),
			(this.log_ = $n('p:rest:')),
			(this.listens_ = {}));
	}
	listen(t, e, i, s) {
		const o = t._path.toString();
		this.log_('Listen called for ' + o + ' ' + t._queryIdentifier);
		const r = Ei.getListenId_(t, i),
			a = {};
		this.listens_[r] = a;
		const l = Ar(t._queryParams);
		this.restRequest_(o + '.json', l, (c, h) => {
			let d = h;
			if (
				(c === 404 && ((d = null), (c = null)),
				c === null && this.onDataUpdate_(o, d, !1, i),
				He(this.listens_, r) === a)
			) {
				let u;
				(c ? (c === 401 ? (u = 'permission_denied') : (u = 'rest_error:' + c)) : (u = 'ok'),
					s(u, null));
			}
		});
	}
	unlisten(t, e) {
		const i = Ei.getListenId_(t, e);
		delete this.listens_[i];
	}
	get(t) {
		const e = Ar(t._queryParams),
			i = t._path.toString(),
			s = new ji();
		return (
			this.restRequest_(i + '.json', e, (o, r) => {
				let a = r;
				(o === 404 && ((a = null), (o = null)),
					o === null ? (this.onDataUpdate_(i, a, !1, null), s.resolve(a)) : s.reject(new Error(a)));
			}),
			s.promise
		);
	}
	refreshAuthToken(t) {}
	restRequest_(t, e = {}, i) {
		return (
			(e.format = 'export'),
			Promise.all([
				this.authTokenProvider_.getToken(!1),
				this.appCheckTokenProvider_.getToken(!1)
			]).then(([s, o]) => {
				(s && s.accessToken && (e.auth = s.accessToken), o && o.token && (e.ac = o.token));
				const r =
					(this.repoInfo_.secure ? 'https://' : 'http://') +
					this.repoInfo_.host +
					t +
					'?ns=' +
					this.repoInfo_.namespace +
					Id(e);
				this.log_('Sending REST request for ' + r);
				const a = new XMLHttpRequest();
				((a.onreadystatechange = () => {
					if (i && a.readyState === 4) {
						this.log_(
							'REST Response for ' + r + ' received. status:',
							a.status,
							'response:',
							a.responseText
						);
						let l = null;
						if (a.status >= 200 && a.status < 300) {
							try {
								l = En(a.responseText);
							} catch {
								_t('Failed to parse JSON response for ' + r + ': ' + a.responseText);
							}
							i(null, l);
						} else
							(a.status !== 401 &&
								a.status !== 404 &&
								_t('Got unsuccessful REST response for ' + r + ' Status: ' + a.status),
								i(a.status));
						i = null;
					}
				}),
					a.open('GET', r, !0),
					a.send());
			})
		);
	}
}
class ig {
	constructor() {
		this.rootNode_ = T.EMPTY_NODE;
	}
	getNode(t) {
		return this.rootNode_.getChild(t);
	}
	updateSnapshot(t, e) {
		this.rootNode_ = this.rootNode_.updateChild(t, e);
	}
}
function ki() {
	return { value: null, children: new Map() };
}
function gc(n, t, e) {
	if (A(t)) ((n.value = e), n.children.clear());
	else if (n.value !== null) n.value = n.value.updateChild(t, e);
	else {
		const i = R(t);
		n.children.has(i) || n.children.set(i, ki());
		const s = n.children.get(i);
		((t = j(t)), gc(s, t, e));
	}
}
function Vs(n, t, e) {
	n.value !== null
		? e(t, n.value)
		: sg(n, (i, s) => {
				const o = new z(t.toString() + '/' + i);
				Vs(s, o, e);
			});
}
function sg(n, t) {
	n.children.forEach((e, i) => {
		t(i, e);
	});
}
class og {
	constructor(t) {
		((this.collection_ = t), (this.last_ = null));
	}
	get() {
		const t = this.collection_.get(),
			e = Object.assign({}, t);
		return (
			this.last_ &&
				bt(this.last_, (i, s) => {
					e[i] = e[i] - s;
				}),
			(this.last_ = t),
			e
		);
	}
}
const Or = 10 * 1e3,
	rg = 30 * 1e3,
	ag = 300 * 1e3;
class lg {
	constructor(t, e) {
		((this.server_ = e), (this.statsToReport_ = {}), (this.statsListener_ = new og(t)));
		const i = Or + (rg - Or) * Math.random();
		_n(this.reportStats_.bind(this), Math.floor(i));
	}
	reportStats_() {
		const t = this.statsListener_.get(),
			e = {};
		let i = !1;
		(bt(t, (s, o) => {
			o > 0 && Ut(this.statsToReport_, s) && ((e[s] = o), (i = !0));
		}),
			i && this.server_.reportStats(e),
			_n(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * ag)));
	}
}
var kt;
(function (n) {
	((n[(n.OVERWRITE = 0)] = 'OVERWRITE'),
		(n[(n.MERGE = 1)] = 'MERGE'),
		(n[(n.ACK_USER_WRITE = 2)] = 'ACK_USER_WRITE'),
		(n[(n.LISTEN_COMPLETE = 3)] = 'LISTEN_COMPLETE'));
})(kt || (kt = {}));
function pc() {
	return { fromUser: !0, fromServer: !1, queryId: null, tagged: !1 };
}
function _o() {
	return { fromUser: !1, fromServer: !0, queryId: null, tagged: !1 };
}
function bo(n) {
	return { fromUser: !1, fromServer: !0, queryId: n, tagged: !0 };
}
class Ti {
	constructor(t, e, i) {
		((this.path = t),
			(this.affectedTree = e),
			(this.revert = i),
			(this.type = kt.ACK_USER_WRITE),
			(this.source = pc()));
	}
	operationForChild(t) {
		if (A(this.path)) {
			if (this.affectedTree.value != null)
				return (
					w(
						this.affectedTree.children.isEmpty(),
						'affectedTree should not have overlapping affected paths.'
					),
					this
				);
			{
				const e = this.affectedTree.subtree(new z(t));
				return new Ti(F(), e, this.revert);
			}
		} else
			return (
				w(R(this.path) === t, 'operationForChild called for unrelated child.'),
				new Ti(j(this.path), this.affectedTree, this.revert)
			);
	}
}
class An {
	constructor(t, e) {
		((this.source = t), (this.path = e), (this.type = kt.LISTEN_COMPLETE));
	}
	operationForChild(t) {
		return A(this.path) ? new An(this.source, F()) : new An(this.source, j(this.path));
	}
}
class Ee {
	constructor(t, e, i) {
		((this.source = t), (this.path = e), (this.snap = i), (this.type = kt.OVERWRITE));
	}
	operationForChild(t) {
		return A(this.path)
			? new Ee(this.source, F(), this.snap.getImmediateChild(t))
			: new Ee(this.source, j(this.path), this.snap);
	}
}
class Rn {
	constructor(t, e, i) {
		((this.source = t), (this.path = e), (this.children = i), (this.type = kt.MERGE));
	}
	operationForChild(t) {
		if (A(this.path)) {
			const e = this.children.subtree(new z(t));
			return e.isEmpty()
				? null
				: e.value
					? new Ee(this.source, F(), e.value)
					: new Rn(this.source, F(), e);
		} else
			return (
				w(R(this.path) === t, "Can't get a merge for a child not on the path of the operation"),
				new Rn(this.source, j(this.path), this.children)
			);
	}
	toString() {
		return (
			'Operation(' +
			this.path +
			': ' +
			this.source.toString() +
			' merge: ' +
			this.children.toString() +
			')'
		);
	}
}
class ne {
	constructor(t, e, i) {
		((this.node_ = t), (this.fullyInitialized_ = e), (this.filtered_ = i));
	}
	isFullyInitialized() {
		return this.fullyInitialized_;
	}
	isFiltered() {
		return this.filtered_;
	}
	isCompleteForPath(t) {
		if (A(t)) return this.isFullyInitialized() && !this.filtered_;
		const e = R(t);
		return this.isCompleteForChild(e);
	}
	isCompleteForChild(t) {
		return (this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(t);
	}
	getNode() {
		return this.node_;
	}
}
class cg {
	constructor(t) {
		((this.query_ = t), (this.index_ = this.query_._queryParams.getIndex()));
	}
}
function hg(n, t, e, i) {
	const s = [],
		o = [];
	return (
		t.forEach((r) => {
			r.type === 'child_changed' &&
				n.index_.indexedValueChanged(r.oldSnap, r.snapshotNode) &&
				o.push(tg(r.childName, r.snapshotNode));
		}),
		rn(n, s, 'child_removed', t, i, e),
		rn(n, s, 'child_added', t, i, e),
		rn(n, s, 'child_moved', o, i, e),
		rn(n, s, 'child_changed', t, i, e),
		rn(n, s, 'value', t, i, e),
		s
	);
}
function rn(n, t, e, i, s, o) {
	const r = i.filter((a) => a.type === e);
	(r.sort((a, l) => ug(n, a, l)),
		r.forEach((a) => {
			const l = dg(n, a, o);
			s.forEach((c) => {
				c.respondsTo(a.type) && t.push(c.createEvent(l, n.query_));
			});
		}));
}
function dg(n, t, e) {
	return (
		t.type === 'value' ||
			t.type === 'child_removed' ||
			(t.prevName = e.getPredecessorChildName(t.childName, t.snapshotNode, n.index_)),
		t
	);
}
function ug(n, t, e) {
	if (t.childName == null || e.childName == null) throw Ke('Should only compare child_ events.');
	const i = new D(t.childName, t.snapshotNode),
		s = new D(e.childName, e.snapshotNode);
	return n.index_.compare(i, s);
}
function Yi(n, t) {
	return { eventCache: n, serverCache: t };
}
function bn(n, t, e, i) {
	return Yi(new ne(t, e, i), n.serverCache);
}
function mc(n, t, e, i) {
	return Yi(n.eventCache, new ne(t, e, i));
}
function Ii(n) {
	return n.eventCache.isFullyInitialized() ? n.eventCache.getNode() : null;
}
function ke(n) {
	return n.serverCache.isFullyInitialized() ? n.serverCache.getNode() : null;
}
let ps;
const fg = () => (ps || (ps = new mt(Qu)), ps);
class U {
	static fromObject(t) {
		let e = new U(null);
		return (
			bt(t, (i, s) => {
				e = e.set(new z(i), s);
			}),
			e
		);
	}
	constructor(t, e = fg()) {
		((this.value = t), (this.children = e));
	}
	isEmpty() {
		return this.value === null && this.children.isEmpty();
	}
	findRootMostMatchingPathAndValue(t, e) {
		if (this.value != null && e(this.value)) return { path: F(), value: this.value };
		if (A(t)) return null;
		{
			const i = R(t),
				s = this.children.get(i);
			if (s !== null) {
				const o = s.findRootMostMatchingPathAndValue(j(t), e);
				return o != null ? { path: et(new z(i), o.path), value: o.value } : null;
			} else return null;
		}
	}
	findRootMostValueAndPath(t) {
		return this.findRootMostMatchingPathAndValue(t, () => !0);
	}
	subtree(t) {
		if (A(t)) return this;
		{
			const e = R(t),
				i = this.children.get(e);
			return i !== null ? i.subtree(j(t)) : new U(null);
		}
	}
	set(t, e) {
		if (A(t)) return new U(e, this.children);
		{
			const i = R(t),
				o = (this.children.get(i) || new U(null)).set(j(t), e),
				r = this.children.insert(i, o);
			return new U(this.value, r);
		}
	}
	remove(t) {
		if (A(t)) return this.children.isEmpty() ? new U(null) : new U(null, this.children);
		{
			const e = R(t),
				i = this.children.get(e);
			if (i) {
				const s = i.remove(j(t));
				let o;
				return (
					s.isEmpty() ? (o = this.children.remove(e)) : (o = this.children.insert(e, s)),
					this.value === null && o.isEmpty() ? new U(null) : new U(this.value, o)
				);
			} else return this;
		}
	}
	get(t) {
		if (A(t)) return this.value;
		{
			const e = R(t),
				i = this.children.get(e);
			return i ? i.get(j(t)) : null;
		}
	}
	setTree(t, e) {
		if (A(t)) return e;
		{
			const i = R(t),
				o = (this.children.get(i) || new U(null)).setTree(j(t), e);
			let r;
			return (
				o.isEmpty() ? (r = this.children.remove(i)) : (r = this.children.insert(i, o)),
				new U(this.value, r)
			);
		}
	}
	fold(t) {
		return this.fold_(F(), t);
	}
	fold_(t, e) {
		const i = {};
		return (
			this.children.inorderTraversal((s, o) => {
				i[s] = o.fold_(et(t, s), e);
			}),
			e(t, this.value, i)
		);
	}
	findOnPath(t, e) {
		return this.findOnPath_(t, F(), e);
	}
	findOnPath_(t, e, i) {
		const s = this.value ? i(e, this.value) : !1;
		if (s) return s;
		if (A(t)) return null;
		{
			const o = R(t),
				r = this.children.get(o);
			return r ? r.findOnPath_(j(t), et(e, o), i) : null;
		}
	}
	foreachOnPath(t, e) {
		return this.foreachOnPath_(t, F(), e);
	}
	foreachOnPath_(t, e, i) {
		if (A(t)) return this;
		{
			this.value && i(e, this.value);
			const s = R(t),
				o = this.children.get(s);
			return o ? o.foreachOnPath_(j(t), et(e, s), i) : new U(null);
		}
	}
	foreach(t) {
		this.foreach_(F(), t);
	}
	foreach_(t, e) {
		(this.children.inorderTraversal((i, s) => {
			s.foreach_(et(t, i), e);
		}),
			this.value && e(t, this.value));
	}
	foreachChild(t) {
		this.children.inorderTraversal((e, i) => {
			i.value && t(e, i.value);
		});
	}
}
class It {
	constructor(t) {
		this.writeTree_ = t;
	}
	static empty() {
		return new It(new U(null));
	}
}
function yn(n, t, e) {
	if (A(t)) return new It(new U(e));
	{
		const i = n.writeTree_.findRootMostValueAndPath(t);
		if (i != null) {
			const s = i.path;
			let o = i.value;
			const r = ft(s, t);
			return ((o = o.updateChild(r, e)), new It(n.writeTree_.set(s, o)));
		} else {
			const s = new U(e),
				o = n.writeTree_.setTree(t, s);
			return new It(o);
		}
	}
}
function Nr(n, t, e) {
	let i = n;
	return (
		bt(e, (s, o) => {
			i = yn(i, et(t, s), o);
		}),
		i
	);
}
function Lr(n, t) {
	if (A(t)) return It.empty();
	{
		const e = n.writeTree_.setTree(t, new U(null));
		return new It(e);
	}
}
function Hs(n, t) {
	return Me(n, t) != null;
}
function Me(n, t) {
	const e = n.writeTree_.findRootMostValueAndPath(t);
	return e != null ? n.writeTree_.get(e.path).getChild(ft(e.path, t)) : null;
}
function Fr(n) {
	const t = [],
		e = n.writeTree_.value;
	return (
		e != null
			? e.isLeafNode() ||
				e.forEachChild(X, (i, s) => {
					t.push(new D(i, s));
				})
			: n.writeTree_.children.inorderTraversal((i, s) => {
					s.value != null && t.push(new D(i, s.value));
				}),
		t
	);
}
function Jt(n, t) {
	if (A(t)) return n;
	{
		const e = Me(n, t);
		return e != null ? new It(new U(e)) : new It(n.writeTree_.subtree(t));
	}
}
function js(n) {
	return n.writeTree_.isEmpty();
}
function $e(n, t) {
	return _c(F(), n.writeTree_, t);
}
function _c(n, t, e) {
	if (t.value != null) return e.updateChild(n, t.value);
	{
		let i = null;
		return (
			t.children.inorderTraversal((s, o) => {
				s === '.priority'
					? (w(o.value !== null, 'Priority writes must always be leaf nodes'), (i = o.value))
					: (e = _c(et(n, s), o, e));
			}),
			!e.getChild(n).isEmpty() && i !== null && (e = e.updateChild(et(n, '.priority'), i)),
			e
		);
	}
}
function Gi(n, t) {
	return vc(t, n);
}
function gg(n, t, e, i, s) {
	(w(i > n.lastWriteId, 'Stacking an older write on top of newer ones'),
		s === void 0 && (s = !0),
		n.allWrites.push({ path: t, snap: e, writeId: i, visible: s }),
		s && (n.visibleWrites = yn(n.visibleWrites, t, e)),
		(n.lastWriteId = i));
}
function pg(n, t) {
	for (let e = 0; e < n.allWrites.length; e++) {
		const i = n.allWrites[e];
		if (i.writeId === t) return i;
	}
	return null;
}
function mg(n, t) {
	const e = n.allWrites.findIndex((a) => a.writeId === t);
	w(e >= 0, 'removeWrite called with nonexistent writeId.');
	const i = n.allWrites[e];
	n.allWrites.splice(e, 1);
	let s = i.visible,
		o = !1,
		r = n.allWrites.length - 1;
	for (; s && r >= 0; ) {
		const a = n.allWrites[r];
		(a.visible && (r >= e && _g(a, i.path) ? (s = !1) : Et(i.path, a.path) && (o = !0)), r--);
	}
	if (s) {
		if (o) return (bg(n), !0);
		if (i.snap) n.visibleWrites = Lr(n.visibleWrites, i.path);
		else {
			const a = i.children;
			bt(a, (l) => {
				n.visibleWrites = Lr(n.visibleWrites, et(i.path, l));
			});
		}
		return !0;
	} else return !1;
}
function _g(n, t) {
	if (n.snap) return Et(n.path, t);
	for (const e in n.children) if (n.children.hasOwnProperty(e) && Et(et(n.path, e), t)) return !0;
	return !1;
}
function bg(n) {
	((n.visibleWrites = bc(n.allWrites, yg, F())),
		n.allWrites.length > 0
			? (n.lastWriteId = n.allWrites[n.allWrites.length - 1].writeId)
			: (n.lastWriteId = -1));
}
function yg(n) {
	return n.visible;
}
function bc(n, t, e) {
	let i = It.empty();
	for (let s = 0; s < n.length; ++s) {
		const o = n[s];
		if (t(o)) {
			const r = o.path;
			let a;
			if (o.snap)
				Et(e, r)
					? ((a = ft(e, r)), (i = yn(i, a, o.snap)))
					: Et(r, e) && ((a = ft(r, e)), (i = yn(i, F(), o.snap.getChild(a))));
			else if (o.children) {
				if (Et(e, r)) ((a = ft(e, r)), (i = Nr(i, a, o.children)));
				else if (Et(r, e))
					if (((a = ft(r, e)), A(a))) i = Nr(i, F(), o.children);
					else {
						const l = He(o.children, R(a));
						if (l) {
							const c = l.getChild(j(a));
							i = yn(i, F(), c);
						}
					}
			} else throw Ke('WriteRecord should have .snap or .children');
		}
	}
	return i;
}
function yc(n, t, e, i, s) {
	if (!i && !s) {
		const o = Me(n.visibleWrites, t);
		if (o != null) return o;
		{
			const r = Jt(n.visibleWrites, t);
			if (js(r)) return e;
			if (e == null && !Hs(r, F())) return null;
			{
				const a = e || T.EMPTY_NODE;
				return $e(r, a);
			}
		}
	} else {
		const o = Jt(n.visibleWrites, t);
		if (!s && js(o)) return e;
		if (!s && e == null && !Hs(o, F())) return null;
		{
			const r = function (c) {
					return (
						(c.visible || s) && (!i || !~i.indexOf(c.writeId)) && (Et(c.path, t) || Et(t, c.path))
					);
				},
				a = bc(n.allWrites, r, t),
				l = e || T.EMPTY_NODE;
			return $e(a, l);
		}
	}
}
function xg(n, t, e) {
	let i = T.EMPTY_NODE;
	const s = Me(n.visibleWrites, t);
	if (s)
		return (
			s.isLeafNode() ||
				s.forEachChild(X, (o, r) => {
					i = i.updateImmediateChild(o, r);
				}),
			i
		);
	if (e) {
		const o = Jt(n.visibleWrites, t);
		return (
			e.forEachChild(X, (r, a) => {
				const l = $e(Jt(o, new z(r)), a);
				i = i.updateImmediateChild(r, l);
			}),
			Fr(o).forEach((r) => {
				i = i.updateImmediateChild(r.name, r.node);
			}),
			i
		);
	} else {
		const o = Jt(n.visibleWrites, t);
		return (
			Fr(o).forEach((r) => {
				i = i.updateImmediateChild(r.name, r.node);
			}),
			i
		);
	}
}
function vg(n, t, e, i, s) {
	w(i || s, 'Either existingEventSnap or existingServerSnap must exist');
	const o = et(t, e);
	if (Hs(n.visibleWrites, o)) return null;
	{
		const r = Jt(n.visibleWrites, o);
		return js(r) ? s.getChild(e) : $e(r, s.getChild(e));
	}
}
function wg(n, t, e, i) {
	const s = et(t, e),
		o = Me(n.visibleWrites, s);
	if (o != null) return o;
	if (i.isCompleteForChild(e)) {
		const r = Jt(n.visibleWrites, s);
		return $e(r, i.getNode().getImmediateChild(e));
	} else return null;
}
function Cg(n, t) {
	return Me(n.visibleWrites, t);
}
function Sg(n, t, e, i, s, o, r) {
	let a;
	const l = Jt(n.visibleWrites, t),
		c = Me(l, F());
	if (c != null) a = c;
	else if (e != null) a = $e(l, e);
	else return [];
	if (((a = a.withIndex(r)), !a.isEmpty() && !a.isLeafNode())) {
		const h = [],
			d = r.getCompare(),
			u = o ? a.getReverseIteratorFrom(i, r) : a.getIteratorFrom(i, r);
		let f = u.getNext();
		for (; f && h.length < s; ) (d(f, i) !== 0 && h.push(f), (f = u.getNext()));
		return h;
	} else return [];
}
function Eg() {
	return { visibleWrites: It.empty(), allWrites: [], lastWriteId: -1 };
}
function Mi(n, t, e, i) {
	return yc(n.writeTree, n.treePath, t, e, i);
}
function yo(n, t) {
	return xg(n.writeTree, n.treePath, t);
}
function Br(n, t, e, i) {
	return vg(n.writeTree, n.treePath, t, e, i);
}
function Pi(n, t) {
	return Cg(n.writeTree, et(n.treePath, t));
}
function kg(n, t, e, i, s, o) {
	return Sg(n.writeTree, n.treePath, t, e, i, s, o);
}
function xo(n, t, e) {
	return wg(n.writeTree, n.treePath, t, e);
}
function xc(n, t) {
	return vc(et(n.treePath, t), n.writeTree);
}
function vc(n, t) {
	return { treePath: n, writeTree: t };
}
class Tg {
	constructor() {
		this.changeMap = new Map();
	}
	trackChildChange(t) {
		const e = t.type,
			i = t.childName;
		(w(
			e === 'child_added' || e === 'child_changed' || e === 'child_removed',
			'Only child changes supported for tracking'
		),
			w(i !== '.priority', 'Only non-priority child changes can be tracked.'));
		const s = this.changeMap.get(i);
		if (s) {
			const o = s.type;
			if (e === 'child_added' && o === 'child_removed')
				this.changeMap.set(i, Pn(i, t.snapshotNode, s.snapshotNode));
			else if (e === 'child_removed' && o === 'child_added') this.changeMap.delete(i);
			else if (e === 'child_removed' && o === 'child_changed')
				this.changeMap.set(i, Mn(i, s.oldSnap));
			else if (e === 'child_changed' && o === 'child_added')
				this.changeMap.set(i, Ue(i, t.snapshotNode));
			else if (e === 'child_changed' && o === 'child_changed')
				this.changeMap.set(i, Pn(i, t.snapshotNode, s.oldSnap));
			else throw Ke('Illegal combination of changes: ' + t + ' occurred after ' + s);
		} else this.changeMap.set(i, t);
	}
	getChanges() {
		return Array.from(this.changeMap.values());
	}
}
class Ig {
	getCompleteChild(t) {
		return null;
	}
	getChildAfterChild(t, e, i) {
		return null;
	}
}
const wc = new Ig();
class vo {
	constructor(t, e, i = null) {
		((this.writes_ = t), (this.viewCache_ = e), (this.optCompleteServerCache_ = i));
	}
	getCompleteChild(t) {
		const e = this.viewCache_.eventCache;
		if (e.isCompleteForChild(t)) return e.getNode().getImmediateChild(t);
		{
			const i =
				this.optCompleteServerCache_ != null
					? new ne(this.optCompleteServerCache_, !0, !1)
					: this.viewCache_.serverCache;
			return xo(this.writes_, t, i);
		}
	}
	getChildAfterChild(t, e, i) {
		const s =
				this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : ke(this.viewCache_),
			o = kg(this.writes_, s, e, 1, i, t);
		return o.length === 0 ? null : o[0];
	}
}
function Mg(n) {
	return { filter: n };
}
function Pg(n, t) {
	(w(t.eventCache.getNode().isIndexed(n.filter.getIndex()), 'Event snap not indexed'),
		w(t.serverCache.getNode().isIndexed(n.filter.getIndex()), 'Server snap not indexed'));
}
function Dg(n, t, e, i, s) {
	const o = new Tg();
	let r, a;
	if (e.type === kt.OVERWRITE) {
		const c = e;
		c.source.fromUser
			? (r = Us(n, t, c.path, c.snap, i, s, o))
			: (w(c.source.fromServer, 'Unknown source.'),
				(a = c.source.tagged || (t.serverCache.isFiltered() && !A(c.path))),
				(r = Di(n, t, c.path, c.snap, i, s, a, o)));
	} else if (e.type === kt.MERGE) {
		const c = e;
		c.source.fromUser
			? (r = Rg(n, t, c.path, c.children, i, s, o))
			: (w(c.source.fromServer, 'Unknown source.'),
				(a = c.source.tagged || t.serverCache.isFiltered()),
				(r = $s(n, t, c.path, c.children, i, s, a, o)));
	} else if (e.type === kt.ACK_USER_WRITE) {
		const c = e;
		c.revert ? (r = Lg(n, t, c.path, i, s, o)) : (r = Og(n, t, c.path, c.affectedTree, i, s, o));
	} else if (e.type === kt.LISTEN_COMPLETE) r = Ng(n, t, e.path, i, o);
	else throw Ke('Unknown operation type: ' + e.type);
	const l = o.getChanges();
	return (Ag(t, r, l), { viewCache: r, changes: l });
}
function Ag(n, t, e) {
	const i = t.eventCache;
	if (i.isFullyInitialized()) {
		const s = i.getNode().isLeafNode() || i.getNode().isEmpty(),
			o = Ii(n);
		(e.length > 0 ||
			!n.eventCache.isFullyInitialized() ||
			(s && !i.getNode().equals(o)) ||
			!i.getNode().getPriority().equals(o.getPriority())) &&
			e.push(fc(Ii(t)));
	}
}
function Cc(n, t, e, i, s, o) {
	const r = t.eventCache;
	if (Pi(i, e) != null) return t;
	{
		let a, l;
		if (A(e))
			if (
				(w(
					t.serverCache.isFullyInitialized(),
					'If change path is empty, we must have complete server data'
				),
				t.serverCache.isFiltered())
			) {
				const c = ke(t),
					h = c instanceof T ? c : T.EMPTY_NODE,
					d = yo(i, h);
				a = n.filter.updateFullNode(t.eventCache.getNode(), d, o);
			} else {
				const c = Mi(i, ke(t));
				a = n.filter.updateFullNode(t.eventCache.getNode(), c, o);
			}
		else {
			const c = R(e);
			if (c === '.priority') {
				w(ee(e) === 1, "Can't have a priority with additional path components");
				const h = r.getNode();
				l = t.serverCache.getNode();
				const d = Br(i, e, h, l);
				d != null ? (a = n.filter.updatePriority(h, d)) : (a = r.getNode());
			} else {
				const h = j(e);
				let d;
				if (r.isCompleteForChild(c)) {
					l = t.serverCache.getNode();
					const u = Br(i, e, r.getNode(), l);
					u != null
						? (d = r.getNode().getImmediateChild(c).updateChild(h, u))
						: (d = r.getNode().getImmediateChild(c));
				} else d = xo(i, c, t.serverCache);
				d != null ? (a = n.filter.updateChild(r.getNode(), c, d, h, s, o)) : (a = r.getNode());
			}
		}
		return bn(t, a, r.isFullyInitialized() || A(e), n.filter.filtersNodes());
	}
}
function Di(n, t, e, i, s, o, r, a) {
	const l = t.serverCache;
	let c;
	const h = r ? n.filter : n.filter.getIndexedFilter();
	if (A(e)) c = h.updateFullNode(l.getNode(), i, null);
	else if (h.filtersNodes() && !l.isFiltered()) {
		const f = l.getNode().updateChild(e, i);
		c = h.updateFullNode(l.getNode(), f, null);
	} else {
		const f = R(e);
		if (!l.isCompleteForPath(e) && ee(e) > 1) return t;
		const g = j(e),
			m = l.getNode().getImmediateChild(f).updateChild(g, i);
		f === '.priority'
			? (c = h.updatePriority(l.getNode(), m))
			: (c = h.updateChild(l.getNode(), f, m, g, wc, null));
	}
	const d = mc(t, c, l.isFullyInitialized() || A(e), h.filtersNodes()),
		u = new vo(s, d, o);
	return Cc(n, d, e, s, u, a);
}
function Us(n, t, e, i, s, o, r) {
	const a = t.eventCache;
	let l, c;
	const h = new vo(s, t, o);
	if (A(e))
		((c = n.filter.updateFullNode(t.eventCache.getNode(), i, r)),
			(l = bn(t, c, !0, n.filter.filtersNodes())));
	else {
		const d = R(e);
		if (d === '.priority')
			((c = n.filter.updatePriority(t.eventCache.getNode(), i)),
				(l = bn(t, c, a.isFullyInitialized(), a.isFiltered())));
		else {
			const u = j(e),
				f = a.getNode().getImmediateChild(d);
			let g;
			if (A(u)) g = i;
			else {
				const p = h.getCompleteChild(d);
				p != null
					? ic(u) === '.priority' && p.getChild(oc(u)).isEmpty()
						? (g = p)
						: (g = p.updateChild(u, i))
					: (g = T.EMPTY_NODE);
			}
			if (f.equals(g)) l = t;
			else {
				const p = n.filter.updateChild(a.getNode(), d, g, u, h, r);
				l = bn(t, p, a.isFullyInitialized(), n.filter.filtersNodes());
			}
		}
	}
	return l;
}
function Wr(n, t) {
	return n.eventCache.isCompleteForChild(t);
}
function Rg(n, t, e, i, s, o, r) {
	let a = t;
	return (
		i.foreach((l, c) => {
			const h = et(e, l);
			Wr(t, R(h)) && (a = Us(n, a, h, c, s, o, r));
		}),
		i.foreach((l, c) => {
			const h = et(e, l);
			Wr(t, R(h)) || (a = Us(n, a, h, c, s, o, r));
		}),
		a
	);
}
function zr(n, t, e) {
	return (
		e.foreach((i, s) => {
			t = t.updateChild(i, s);
		}),
		t
	);
}
function $s(n, t, e, i, s, o, r, a) {
	if (t.serverCache.getNode().isEmpty() && !t.serverCache.isFullyInitialized()) return t;
	let l = t,
		c;
	A(e) ? (c = i) : (c = new U(null).setTree(e, i));
	const h = t.serverCache.getNode();
	return (
		c.children.inorderTraversal((d, u) => {
			if (h.hasChild(d)) {
				const f = t.serverCache.getNode().getImmediateChild(d),
					g = zr(n, f, u);
				l = Di(n, l, new z(d), g, s, o, r, a);
			}
		}),
		c.children.inorderTraversal((d, u) => {
			const f = !t.serverCache.isCompleteForChild(d) && u.value === null;
			if (!h.hasChild(d) && !f) {
				const g = t.serverCache.getNode().getImmediateChild(d),
					p = zr(n, g, u);
				l = Di(n, l, new z(d), p, s, o, r, a);
			}
		}),
		l
	);
}
function Og(n, t, e, i, s, o, r) {
	if (Pi(s, e) != null) return t;
	const a = t.serverCache.isFiltered(),
		l = t.serverCache;
	if (i.value != null) {
		if ((A(e) && l.isFullyInitialized()) || l.isCompleteForPath(e))
			return Di(n, t, e, l.getNode().getChild(e), s, o, a, r);
		if (A(e)) {
			let c = new U(null);
			return (
				l.getNode().forEachChild(ze, (h, d) => {
					c = c.set(new z(h), d);
				}),
				$s(n, t, e, c, s, o, a, r)
			);
		} else return t;
	} else {
		let c = new U(null);
		return (
			i.foreach((h, d) => {
				const u = et(e, h);
				l.isCompleteForPath(u) && (c = c.set(h, l.getNode().getChild(u)));
			}),
			$s(n, t, e, c, s, o, a, r)
		);
	}
}
function Ng(n, t, e, i, s) {
	const o = t.serverCache,
		r = mc(t, o.getNode(), o.isFullyInitialized() || A(e), o.isFiltered());
	return Cc(n, r, e, i, wc, s);
}
function Lg(n, t, e, i, s, o) {
	let r;
	if (Pi(i, e) != null) return t;
	{
		const a = new vo(i, t, s),
			l = t.eventCache.getNode();
		let c;
		if (A(e) || R(e) === '.priority') {
			let h;
			if (t.serverCache.isFullyInitialized()) h = Mi(i, ke(t));
			else {
				const d = t.serverCache.getNode();
				(w(d instanceof T, 'serverChildren would be complete if leaf node'), (h = yo(i, d)));
			}
			((h = h), (c = n.filter.updateFullNode(l, h, o)));
		} else {
			const h = R(e);
			let d = xo(i, h, t.serverCache);
			(d == null && t.serverCache.isCompleteForChild(h) && (d = l.getImmediateChild(h)),
				d != null
					? (c = n.filter.updateChild(l, h, d, j(e), a, o))
					: t.eventCache.getNode().hasChild(h)
						? (c = n.filter.updateChild(l, h, T.EMPTY_NODE, j(e), a, o))
						: (c = l),
				c.isEmpty() &&
					t.serverCache.isFullyInitialized() &&
					((r = Mi(i, ke(t))), r.isLeafNode() && (c = n.filter.updateFullNode(c, r, o))));
		}
		return (
			(r = t.serverCache.isFullyInitialized() || Pi(i, F()) != null),
			bn(t, c, r, n.filter.filtersNodes())
		);
	}
}
class Fg {
	constructor(t, e) {
		((this.query_ = t), (this.eventRegistrations_ = []));
		const i = this.query_._queryParams,
			s = new po(i.getIndex()),
			o = ng(i);
		this.processor_ = Mg(o);
		const r = e.serverCache,
			a = e.eventCache,
			l = s.updateFullNode(T.EMPTY_NODE, r.getNode(), null),
			c = o.updateFullNode(T.EMPTY_NODE, a.getNode(), null),
			h = new ne(l, r.isFullyInitialized(), s.filtersNodes()),
			d = new ne(c, a.isFullyInitialized(), o.filtersNodes());
		((this.viewCache_ = Yi(d, h)), (this.eventGenerator_ = new cg(this.query_)));
	}
	get query() {
		return this.query_;
	}
}
function Bg(n) {
	return n.viewCache_.serverCache.getNode();
}
function Wg(n) {
	return Ii(n.viewCache_);
}
function zg(n, t) {
	const e = ke(n.viewCache_);
	return e &&
		(n.query._queryParams.loadsAllData() || (!A(t) && !e.getImmediateChild(R(t)).isEmpty()))
		? e.getChild(t)
		: null;
}
function Vr(n) {
	return n.eventRegistrations_.length === 0;
}
function Vg(n, t) {
	n.eventRegistrations_.push(t);
}
function Hr(n, t, e) {
	const i = [];
	if (e) {
		w(t == null, 'A cancel should cancel all event registrations.');
		const s = n.query._path;
		n.eventRegistrations_.forEach((o) => {
			const r = o.createCancelEvent(e, s);
			r && i.push(r);
		});
	}
	if (t) {
		let s = [];
		for (let o = 0; o < n.eventRegistrations_.length; ++o) {
			const r = n.eventRegistrations_[o];
			if (!r.matches(t)) s.push(r);
			else if (t.hasAnyCallback()) {
				s = s.concat(n.eventRegistrations_.slice(o + 1));
				break;
			}
		}
		n.eventRegistrations_ = s;
	} else n.eventRegistrations_ = [];
	return i;
}
function jr(n, t, e, i) {
	t.type === kt.MERGE &&
		t.source.queryId !== null &&
		(w(ke(n.viewCache_), 'We should always have a full cache before handling merges'),
		w(Ii(n.viewCache_), 'Missing event cache, even though we have a server cache'));
	const s = n.viewCache_,
		o = Dg(n.processor_, s, t, e, i);
	return (
		Pg(n.processor_, o.viewCache),
		w(
			o.viewCache.serverCache.isFullyInitialized() || !s.serverCache.isFullyInitialized(),
			'Once a server snap is complete, it should never go back'
		),
		(n.viewCache_ = o.viewCache),
		Sc(n, o.changes, o.viewCache.eventCache.getNode(), null)
	);
}
function Hg(n, t) {
	const e = n.viewCache_.eventCache,
		i = [];
	return (
		e.getNode().isLeafNode() ||
			e.getNode().forEachChild(X, (o, r) => {
				i.push(Ue(o, r));
			}),
		e.isFullyInitialized() && i.push(fc(e.getNode())),
		Sc(n, i, e.getNode(), t)
	);
}
function Sc(n, t, e, i) {
	const s = i ? [i] : n.eventRegistrations_;
	return hg(n.eventGenerator_, t, e, s);
}
let Ai;
class Ec {
	constructor() {
		this.views = new Map();
	}
}
function jg(n) {
	(w(!Ai, '__referenceConstructor has already been defined'), (Ai = n));
}
function Ug() {
	return (w(Ai, 'Reference.ts has not been loaded'), Ai);
}
function $g(n) {
	return n.views.size === 0;
}
function wo(n, t, e, i) {
	const s = t.source.queryId;
	if (s !== null) {
		const o = n.views.get(s);
		return (w(o != null, 'SyncTree gave us an op for an invalid query.'), jr(o, t, e, i));
	} else {
		let o = [];
		for (const r of n.views.values()) o = o.concat(jr(r, t, e, i));
		return o;
	}
}
function kc(n, t, e, i, s) {
	const o = t._queryIdentifier,
		r = n.views.get(o);
	if (!r) {
		let a = Mi(e, s ? i : null),
			l = !1;
		a ? (l = !0) : i instanceof T ? ((a = yo(e, i)), (l = !1)) : ((a = T.EMPTY_NODE), (l = !1));
		const c = Yi(new ne(a, l, !1), new ne(i, s, !1));
		return new Fg(t, c);
	}
	return r;
}
function Yg(n, t, e, i, s, o) {
	const r = kc(n, t, i, s, o);
	return (
		n.views.has(t._queryIdentifier) || n.views.set(t._queryIdentifier, r),
		Vg(r, e),
		Hg(r, e)
	);
}
function Gg(n, t, e, i) {
	const s = t._queryIdentifier,
		o = [];
	let r = [];
	const a = ie(n);
	if (s === 'default')
		for (const [l, c] of n.views.entries())
			((r = r.concat(Hr(c, e, i))),
				Vr(c) && (n.views.delete(l), c.query._queryParams.loadsAllData() || o.push(c.query)));
	else {
		const l = n.views.get(s);
		l &&
			((r = r.concat(Hr(l, e, i))),
			Vr(l) && (n.views.delete(s), l.query._queryParams.loadsAllData() || o.push(l.query)));
	}
	return (a && !ie(n) && o.push(new (Ug())(t._repo, t._path)), { removed: o, events: r });
}
function Tc(n) {
	const t = [];
	for (const e of n.views.values()) e.query._queryParams.loadsAllData() || t.push(e);
	return t;
}
function Zt(n, t) {
	let e = null;
	for (const i of n.views.values()) e = e || zg(i, t);
	return e;
}
function Ic(n, t) {
	if (t._queryParams.loadsAllData()) return qi(n);
	{
		const i = t._queryIdentifier;
		return n.views.get(i);
	}
}
function Mc(n, t) {
	return Ic(n, t) != null;
}
function ie(n) {
	return qi(n) != null;
}
function qi(n) {
	for (const t of n.views.values()) if (t.query._queryParams.loadsAllData()) return t;
	return null;
}
let Ri;
function qg(n) {
	(w(!Ri, '__referenceConstructor has already been defined'), (Ri = n));
}
function Kg() {
	return (w(Ri, 'Reference.ts has not been loaded'), Ri);
}
let Xg = 1;
class Ur {
	constructor(t) {
		((this.listenProvider_ = t),
			(this.syncPointTree_ = new U(null)),
			(this.pendingWriteTree_ = Eg()),
			(this.tagToQueryMap = new Map()),
			(this.queryToTagMap = new Map()));
	}
}
function Pc(n, t, e, i, s) {
	return (gg(n.pendingWriteTree_, t, e, i, s), s ? qn(n, new Ee(pc(), t, e)) : []);
}
function ve(n, t, e = !1) {
	const i = pg(n.pendingWriteTree_, t);
	if (mg(n.pendingWriteTree_, t)) {
		let o = new U(null);
		return (
			i.snap != null
				? (o = o.set(F(), !0))
				: bt(i.children, (r) => {
						o = o.set(new z(r), !0);
					}),
			qn(n, new Ti(i.path, o, e))
		);
	} else return [];
}
function Gn(n, t, e) {
	return qn(n, new Ee(_o(), t, e));
}
function Qg(n, t, e) {
	const i = U.fromObject(e);
	return qn(n, new Rn(_o(), t, i));
}
function Jg(n, t) {
	return qn(n, new An(_o(), t));
}
function Zg(n, t, e) {
	const i = So(n, e);
	if (i) {
		const s = Eo(i),
			o = s.path,
			r = s.queryId,
			a = ft(o, t),
			l = new An(bo(r), a);
		return ko(n, o, l);
	} else return [];
}
function Dc(n, t, e, i, s = !1) {
	const o = t._path,
		r = n.syncPointTree_.get(o);
	let a = [];
	if (r && (t._queryIdentifier === 'default' || Mc(r, t))) {
		const l = Gg(r, t, e, i);
		$g(r) && (n.syncPointTree_ = n.syncPointTree_.remove(o));
		const c = l.removed;
		if (((a = l.events), !s)) {
			const h = c.findIndex((u) => u._queryParams.loadsAllData()) !== -1,
				d = n.syncPointTree_.findOnPath(o, (u, f) => ie(f));
			if (h && !d) {
				const u = n.syncPointTree_.subtree(o);
				if (!u.isEmpty()) {
					const f = ip(u);
					for (let g = 0; g < f.length; ++g) {
						const p = f[g],
							m = p.query,
							_ = Nc(n, p);
						n.listenProvider_.startListening(xn(m), On(n, m), _.hashFn, _.onComplete);
					}
				}
			}
			!d &&
				c.length > 0 &&
				!i &&
				(h
					? n.listenProvider_.stopListening(xn(t), null)
					: c.forEach((u) => {
							const f = n.queryToTagMap.get(Ki(u));
							n.listenProvider_.stopListening(xn(u), f);
						}));
		}
		sp(n, c);
	}
	return a;
}
function Ac(n, t, e, i) {
	const s = So(n, i);
	if (s != null) {
		const o = Eo(s),
			r = o.path,
			a = o.queryId,
			l = ft(r, t),
			c = new Ee(bo(a), l, e);
		return ko(n, r, c);
	} else return [];
}
function tp(n, t, e, i) {
	const s = So(n, i);
	if (s) {
		const o = Eo(s),
			r = o.path,
			a = o.queryId,
			l = ft(r, t),
			c = U.fromObject(e),
			h = new Rn(bo(a), l, c);
		return ko(n, r, h);
	} else return [];
}
function ep(n, t, e, i = !1) {
	const s = t._path;
	let o = null,
		r = !1;
	n.syncPointTree_.foreachOnPath(s, (u, f) => {
		const g = ft(u, s);
		((o = o || Zt(f, g)), (r = r || ie(f)));
	});
	let a = n.syncPointTree_.get(s);
	a
		? ((r = r || ie(a)), (o = o || Zt(a, F())))
		: ((a = new Ec()), (n.syncPointTree_ = n.syncPointTree_.set(s, a)));
	let l;
	o != null
		? (l = !0)
		: ((l = !1),
			(o = T.EMPTY_NODE),
			n.syncPointTree_.subtree(s).foreachChild((f, g) => {
				const p = Zt(g, F());
				p && (o = o.updateImmediateChild(f, p));
			}));
	const c = Mc(a, t);
	if (!c && !t._queryParams.loadsAllData()) {
		const u = Ki(t);
		w(!n.queryToTagMap.has(u), 'View does not exist, but we have a tag');
		const f = op();
		(n.queryToTagMap.set(u, f), n.tagToQueryMap.set(f, u));
	}
	const h = Gi(n.pendingWriteTree_, s);
	let d = Yg(a, t, e, h, o, l);
	if (!c && !r && !i) {
		const u = Ic(a, t);
		d = d.concat(rp(n, t, u));
	}
	return d;
}
function Co(n, t, e) {
	const s = n.pendingWriteTree_,
		o = n.syncPointTree_.findOnPath(t, (r, a) => {
			const l = ft(r, t),
				c = Zt(a, l);
			if (c) return c;
		});
	return yc(s, t, o, e, !0);
}
function np(n, t) {
	const e = t._path;
	let i = null;
	n.syncPointTree_.foreachOnPath(e, (c, h) => {
		const d = ft(c, e);
		i = i || Zt(h, d);
	});
	let s = n.syncPointTree_.get(e);
	s ? (i = i || Zt(s, F())) : ((s = new Ec()), (n.syncPointTree_ = n.syncPointTree_.set(e, s)));
	const o = i != null,
		r = o ? new ne(i, !0, !1) : null,
		a = Gi(n.pendingWriteTree_, t._path),
		l = kc(s, t, a, o ? r.getNode() : T.EMPTY_NODE, o);
	return Wg(l);
}
function qn(n, t) {
	return Rc(t, n.syncPointTree_, null, Gi(n.pendingWriteTree_, F()));
}
function Rc(n, t, e, i) {
	if (A(n.path)) return Oc(n, t, e, i);
	{
		const s = t.get(F());
		e == null && s != null && (e = Zt(s, F()));
		let o = [];
		const r = R(n.path),
			a = n.operationForChild(r),
			l = t.children.get(r);
		if (l && a) {
			const c = e ? e.getImmediateChild(r) : null,
				h = xc(i, r);
			o = o.concat(Rc(a, l, c, h));
		}
		return (s && (o = o.concat(wo(s, n, i, e))), o);
	}
}
function Oc(n, t, e, i) {
	const s = t.get(F());
	e == null && s != null && (e = Zt(s, F()));
	let o = [];
	return (
		t.children.inorderTraversal((r, a) => {
			const l = e ? e.getImmediateChild(r) : null,
				c = xc(i, r),
				h = n.operationForChild(r);
			h && (o = o.concat(Oc(h, a, l, c)));
		}),
		s && (o = o.concat(wo(s, n, i, e))),
		o
	);
}
function Nc(n, t) {
	const e = t.query,
		i = On(n, e);
	return {
		hashFn: () => (Bg(t) || T.EMPTY_NODE).hash(),
		onComplete: (s) => {
			if (s === 'ok') return i ? Zg(n, e._path, i) : Jg(n, e._path);
			{
				const o = tf(s, e);
				return Dc(n, e, null, o);
			}
		}
	};
}
function On(n, t) {
	const e = Ki(t);
	return n.queryToTagMap.get(e);
}
function Ki(n) {
	return n._path.toString() + '$' + n._queryIdentifier;
}
function So(n, t) {
	return n.tagToQueryMap.get(t);
}
function Eo(n) {
	const t = n.indexOf('$');
	return (
		w(t !== -1 && t < n.length - 1, 'Bad queryKey.'),
		{ queryId: n.substr(t + 1), path: new z(n.substr(0, t)) }
	);
}
function ko(n, t, e) {
	const i = n.syncPointTree_.get(t);
	w(i, "Missing sync point for query tag that we're tracking");
	const s = Gi(n.pendingWriteTree_, t);
	return wo(i, e, s, null);
}
function ip(n) {
	return n.fold((t, e, i) => {
		if (e && ie(e)) return [qi(e)];
		{
			let s = [];
			return (
				e && (s = Tc(e)),
				bt(i, (o, r) => {
					s = s.concat(r);
				}),
				s
			);
		}
	});
}
function xn(n) {
	return n._queryParams.loadsAllData() && !n._queryParams.isDefault()
		? new (Kg())(n._repo, n._path)
		: n;
}
function sp(n, t) {
	for (let e = 0; e < t.length; ++e) {
		const i = t[e];
		if (!i._queryParams.loadsAllData()) {
			const s = Ki(i),
				o = n.queryToTagMap.get(s);
			(n.queryToTagMap.delete(s), n.tagToQueryMap.delete(o));
		}
	}
}
function op() {
	return Xg++;
}
function rp(n, t, e) {
	const i = t._path,
		s = On(n, t),
		o = Nc(n, e),
		r = n.listenProvider_.startListening(xn(t), s, o.hashFn, o.onComplete),
		a = n.syncPointTree_.subtree(i);
	if (s) w(!ie(a.value), "If we're adding a query, it shouldn't be shadowed");
	else {
		const l = a.fold((c, h, d) => {
			if (!A(c) && h && ie(h)) return [qi(h).query];
			{
				let u = [];
				return (
					h && (u = u.concat(Tc(h).map((f) => f.query))),
					bt(d, (f, g) => {
						u = u.concat(g);
					}),
					u
				);
			}
		});
		for (let c = 0; c < l.length; ++c) {
			const h = l[c];
			n.listenProvider_.stopListening(xn(h), On(n, h));
		}
	}
	return r;
}
class To {
	constructor(t) {
		this.node_ = t;
	}
	getImmediateChild(t) {
		const e = this.node_.getImmediateChild(t);
		return new To(e);
	}
	node() {
		return this.node_;
	}
}
class Io {
	constructor(t, e) {
		((this.syncTree_ = t), (this.path_ = e));
	}
	getImmediateChild(t) {
		const e = et(this.path_, t);
		return new Io(this.syncTree_, e);
	}
	node() {
		return Co(this.syncTree_, this.path_);
	}
}
const ap = function (n) {
		return ((n = n || {}), (n.timestamp = n.timestamp || new Date().getTime()), n);
	},
	$r = function (n, t, e) {
		if (!n || typeof n != 'object') return n;
		if ((w('.sv' in n, 'Unexpected leaf node or priority contents'), typeof n['.sv'] == 'string'))
			return lp(n['.sv'], t, e);
		if (typeof n['.sv'] == 'object') return cp(n['.sv'], t);
		w(!1, 'Unexpected server value: ' + JSON.stringify(n, null, 2));
	},
	lp = function (n, t, e) {
		switch (n) {
			case 'timestamp':
				return e.timestamp;
			default:
				w(!1, 'Unexpected server value: ' + n);
		}
	},
	cp = function (n, t, e) {
		n.hasOwnProperty('increment') ||
			w(!1, 'Unexpected server value: ' + JSON.stringify(n, null, 2));
		const i = n.increment;
		typeof i != 'number' && w(!1, 'Unexpected increment value: ' + i);
		const s = t.node();
		if (
			(w(s !== null && typeof s < 'u', 'Expected ChildrenNode.EMPTY_NODE for nulls'),
			!s.isLeafNode())
		)
			return i;
		const r = s.getValue();
		return typeof r != 'number' ? i : r + i;
	},
	hp = function (n, t, e, i) {
		return Mo(t, new Io(e, n), i);
	},
	Lc = function (n, t, e) {
		return Mo(n, new To(t), e);
	};
function Mo(n, t, e) {
	const i = n.getPriority().val(),
		s = $r(i, t.getImmediateChild('.priority'), e);
	let o;
	if (n.isLeafNode()) {
		const r = n,
			a = $r(r.getValue(), t, e);
		return a !== r.getValue() || s !== r.getPriority().val() ? new it(a, ot(s)) : n;
	} else {
		const r = n;
		return (
			(o = r),
			s !== r.getPriority().val() && (o = o.updatePriority(new it(s))),
			r.forEachChild(X, (a, l) => {
				const c = Mo(l, t.getImmediateChild(a), e);
				c !== l && (o = o.updateImmediateChild(a, c));
			}),
			o
		);
	}
}
class Po {
	constructor(t = '', e = null, i = { children: {}, childCount: 0 }) {
		((this.name = t), (this.parent = e), (this.node = i));
	}
}
function Do(n, t) {
	let e = t instanceof z ? t : new z(t),
		i = n,
		s = R(e);
	for (; s !== null; ) {
		const o = He(i.node.children, s) || { children: {}, childCount: 0 };
		((i = new Po(s, i, o)), (e = j(e)), (s = R(e)));
	}
	return i;
}
function Ze(n) {
	return n.node.value;
}
function Fc(n, t) {
	((n.node.value = t), Ys(n));
}
function Bc(n) {
	return n.node.childCount > 0;
}
function dp(n) {
	return Ze(n) === void 0 && !Bc(n);
}
function Xi(n, t) {
	bt(n.node.children, (e, i) => {
		t(new Po(e, n, i));
	});
}
function Wc(n, t, e, i) {
	(e && t(n),
		Xi(n, (s) => {
			Wc(s, t, !0);
		}));
}
function up(n, t, e) {
	let i = n.parent;
	for (; i !== null; ) {
		if (t(i)) return !0;
		i = i.parent;
	}
	return !1;
}
function Kn(n) {
	return new z(n.parent === null ? n.name : Kn(n.parent) + '/' + n.name);
}
function Ys(n) {
	n.parent !== null && fp(n.parent, n.name, n);
}
function fp(n, t, e) {
	const i = dp(e),
		s = Ut(n.node.children, t);
	i && s
		? (delete n.node.children[t], n.node.childCount--, Ys(n))
		: !i && !s && ((n.node.children[t] = e.node), n.node.childCount++, Ys(n));
}
const gp = /[\[\].#$\/\u0000-\u001F\u007F]/,
	pp = /[\[\].#$\u0000-\u001F\u007F]/,
	ms = 10 * 1024 * 1024,
	zc = function (n) {
		return typeof n == 'string' && n.length !== 0 && !gp.test(n);
	},
	Vc = function (n) {
		return typeof n == 'string' && n.length !== 0 && !pp.test(n);
	},
	mp = function (n) {
		return (n && (n = n.replace(/^\/*\.info(\/|$)/, '/')), Vc(n));
	},
	_p = function (n, t, e, i) {
		Ao(ro(n, 'value'), t, e);
	},
	Ao = function (n, t, e) {
		const i = e instanceof z ? new Of(e, n) : e;
		if (t === void 0) throw new Error(n + 'contains undefined ' + pe(i));
		if (typeof t == 'function')
			throw new Error(n + 'contains a function ' + pe(i) + ' with contents = ' + t.toString());
		if (Ll(t)) throw new Error(n + 'contains ' + t.toString() + ' ' + pe(i));
		if (typeof t == 'string' && t.length > ms / 3 && Ui(t) > ms)
			throw new Error(
				n +
					'contains a string greater than ' +
					ms +
					' utf8 bytes ' +
					pe(i) +
					" ('" +
					t.substring(0, 50) +
					"...')"
			);
		if (t && typeof t == 'object') {
			let s = !1,
				o = !1;
			if (
				(bt(t, (r, a) => {
					if (r === '.value') s = !0;
					else if (r !== '.priority' && r !== '.sv' && ((o = !0), !zc(r)))
						throw new Error(
							n +
								' contains an invalid key (' +
								r +
								') ' +
								pe(i) +
								`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`
						);
					(Nf(i, r), Ao(n, a, i), Lf(i));
				}),
				s && o)
			)
				throw new Error(
					n + ' contains ".value" child ' + pe(i) + ' in addition to actual children.'
				);
		}
	},
	Hc = function (n, t, e, i) {
		if (!Vc(e))
			throw new Error(
				ro(n, t) +
					'was an invalid path = "' +
					e +
					`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`
			);
	},
	bp = function (n, t, e, i) {
		(e && (e = e.replace(/^\/*\.info(\/|$)/, '/')), Hc(n, t, e));
	},
	jc = function (n, t) {
		if (R(t) === '.info') throw new Error(n + " failed = Can't modify data under /.info/");
	},
	yp = function (n, t) {
		const e = t.path.toString();
		if (
			typeof t.repoInfo.host != 'string' ||
			t.repoInfo.host.length === 0 ||
			(!zc(t.repoInfo.namespace) && t.repoInfo.host.split(':')[0] !== 'localhost') ||
			(e.length !== 0 && !mp(e))
		)
			throw new Error(
				ro(n, 'url') +
					`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`
			);
	};
class xp {
	constructor() {
		((this.eventLists_ = []), (this.recursionDepth_ = 0));
	}
}
function Uc(n, t) {
	let e = null;
	for (let i = 0; i < t.length; i++) {
		const s = t[i],
			o = s.getPath();
		(e !== null && !rc(o, e.path) && (n.eventLists_.push(e), (e = null)),
			e === null && (e = { events: [], path: o }),
			e.events.push(s));
	}
	e && n.eventLists_.push(e);
}
function At(n, t, e) {
	(Uc(n, e), vp(n, (i) => Et(i, t) || Et(t, i)));
}
function vp(n, t) {
	n.recursionDepth_++;
	let e = !0;
	for (let i = 0; i < n.eventLists_.length; i++) {
		const s = n.eventLists_[i];
		if (s) {
			const o = s.path;
			t(o) ? (wp(n.eventLists_[i]), (n.eventLists_[i] = null)) : (e = !1);
		}
	}
	(e && (n.eventLists_ = []), n.recursionDepth_--);
}
function wp(n) {
	for (let t = 0; t < n.events.length; t++) {
		const e = n.events[t];
		if (e !== null) {
			n.events[t] = null;
			const i = e.getEventRunner();
			(mn && ht('event: ' + e.toString()), Je(i));
		}
	}
}
const Cp = 'repo_interrupt',
	Sp = 25;
class Ep {
	constructor(t, e, i, s) {
		((this.repoInfo_ = t),
			(this.forceRestClient_ = e),
			(this.authTokenProvider_ = i),
			(this.appCheckProvider_ = s),
			(this.dataUpdateCount = 0),
			(this.statsListener_ = null),
			(this.eventQueue_ = new xp()),
			(this.nextWriteId_ = 1),
			(this.interceptServerDataCallback_ = null),
			(this.onDisconnect_ = ki()),
			(this.transactionQueueTree_ = new Po()),
			(this.persistentConnection_ = null),
			(this.key = this.repoInfo_.toURLString()));
	}
	toString() {
		return (this.repoInfo_.secure ? 'https://' : 'http://') + this.repoInfo_.host;
	}
}
function kp(n, t, e) {
	if (((n.stats_ = ho(n.repoInfo_)), n.forceRestClient_ || of()))
		((n.server_ = new Ei(
			n.repoInfo_,
			(i, s, o, r) => {
				Yr(n, i, s, o, r);
			},
			n.authTokenProvider_,
			n.appCheckProvider_
		)),
			setTimeout(() => Gr(n, !0), 0));
	else {
		if (typeof e < 'u' && e !== null) {
			if (typeof e != 'object')
				throw new Error('Only objects are supported for option databaseAuthVariableOverride');
			try {
				tt(e);
			} catch (i) {
				throw new Error('Invalid authOverride provided: ' + i);
			}
		}
		((n.persistentConnection_ = new Vt(
			n.repoInfo_,
			t,
			(i, s, o, r) => {
				Yr(n, i, s, o, r);
			},
			(i) => {
				Gr(n, i);
			},
			(i) => {
				Ip(n, i);
			},
			n.authTokenProvider_,
			n.appCheckProvider_,
			e
		)),
			(n.server_ = n.persistentConnection_));
	}
	(n.authTokenProvider_.addTokenChangeListener((i) => {
		n.server_.refreshAuthToken(i);
	}),
		n.appCheckProvider_.addTokenChangeListener((i) => {
			n.server_.refreshAppCheckToken(i.token);
		}),
		(n.statsReporter_ = hf(n.repoInfo_, () => new lg(n.stats_, n.server_))),
		(n.infoData_ = new ig()),
		(n.infoSyncTree_ = new Ur({
			startListening: (i, s, o, r) => {
				let a = [];
				const l = n.infoData_.getNode(i._path);
				return (
					l.isEmpty() ||
						((a = Gn(n.infoSyncTree_, i._path, l)),
						setTimeout(() => {
							r('ok');
						}, 0)),
					a
				);
			},
			stopListening: () => {}
		})),
		Oo(n, 'connected', !1),
		(n.serverSyncTree_ = new Ur({
			startListening: (i, s, o, r) => (
				n.server_.listen(i, o, s, (a, l) => {
					const c = r(a, l);
					At(n.eventQueue_, i._path, c);
				}),
				[]
			),
			stopListening: (i, s) => {
				n.server_.unlisten(i, s);
			}
		})));
}
function Tp(n) {
	const e = n.infoData_.getNode(new z('.info/serverTimeOffset')).val() || 0;
	return new Date().getTime() + e;
}
function Ro(n) {
	return ap({ timestamp: Tp(n) });
}
function Yr(n, t, e, i, s) {
	n.dataUpdateCount++;
	const o = new z(t);
	e = n.interceptServerDataCallback_ ? n.interceptServerDataCallback_(t, e) : e;
	let r = [];
	if (s)
		if (i) {
			const l = yi(e, (c) => ot(c));
			r = tp(n.serverSyncTree_, o, l, s);
		} else {
			const l = ot(e);
			r = Ac(n.serverSyncTree_, o, l, s);
		}
	else if (i) {
		const l = yi(e, (c) => ot(c));
		r = Qg(n.serverSyncTree_, o, l);
	} else {
		const l = ot(e);
		r = Gn(n.serverSyncTree_, o, l);
	}
	let a = o;
	(r.length > 0 && (a = Ji(n, o)), At(n.eventQueue_, a, r));
}
function Gr(n, t) {
	(Oo(n, 'connected', t), t === !1 && Dp(n));
}
function Ip(n, t) {
	bt(t, (e, i) => {
		Oo(n, e, i);
	});
}
function Oo(n, t, e) {
	const i = new z('/.info/' + t),
		s = ot(e);
	n.infoData_.updateSnapshot(i, s);
	const o = Gn(n.infoSyncTree_, i, s);
	At(n.eventQueue_, i, o);
}
function $c(n) {
	return n.nextWriteId_++;
}
function Mp(n, t, e) {
	const i = np(n.serverSyncTree_, t);
	return i != null
		? Promise.resolve(i)
		: n.server_.get(t).then(
				(s) => {
					const o = ot(s).withIndex(t._queryParams.getIndex());
					ep(n.serverSyncTree_, t, e, !0);
					let r;
					if (t._queryParams.loadsAllData()) r = Gn(n.serverSyncTree_, t._path, o);
					else {
						const a = On(n.serverSyncTree_, t);
						r = Ac(n.serverSyncTree_, t._path, o, a);
					}
					return (At(n.eventQueue_, t._path, r), Dc(n.serverSyncTree_, t, e, null, !0), o);
				},
				(s) => (Qi(n, 'get for query ' + tt(t) + ' failed: ' + s), Promise.reject(new Error(s)))
			);
}
function Pp(n, t, e, i, s) {
	Qi(n, 'set', { path: t.toString(), value: e, priority: i });
	const o = Ro(n),
		r = ot(e, i),
		a = Co(n.serverSyncTree_, t),
		l = Lc(r, a, o),
		c = $c(n),
		h = Pc(n.serverSyncTree_, t, l, c, !0);
	(Uc(n.eventQueue_, h),
		n.server_.put(t.toString(), r.val(!0), (u, f) => {
			const g = u === 'ok';
			g || _t('set at ' + t + ' failed: ' + u);
			const p = ve(n.serverSyncTree_, c, !g);
			(At(n.eventQueue_, t, p), Rp(n, s, u, f));
		}));
	const d = Xc(n, t);
	(Ji(n, d), At(n.eventQueue_, d, []));
}
function Dp(n) {
	Qi(n, 'onDisconnectEvents');
	const t = Ro(n),
		e = ki();
	Vs(n.onDisconnect_, F(), (s, o) => {
		const r = hp(s, o, n.serverSyncTree_, t);
		gc(e, s, r);
	});
	let i = [];
	(Vs(e, F(), (s, o) => {
		i = i.concat(Gn(n.serverSyncTree_, s, o));
		const r = Xc(n, s);
		Ji(n, r);
	}),
		(n.onDisconnect_ = ki()),
		At(n.eventQueue_, F(), i));
}
function Ap(n) {
	n.persistentConnection_ && n.persistentConnection_.interrupt(Cp);
}
function Qi(n, ...t) {
	let e = '';
	(n.persistentConnection_ && (e = n.persistentConnection_.id + ':'), ht(e, ...t));
}
function Rp(n, t, e, i) {
	t &&
		Je(() => {
			if (e === 'ok') t(null);
			else {
				const s = (e || 'error').toUpperCase();
				let o = s;
				i && (o += ': ' + i);
				const r = new Error(o);
				((r.code = s), t(r));
			}
		});
}
function Yc(n, t, e) {
	return Co(n.serverSyncTree_, t, e) || T.EMPTY_NODE;
}
function No(n, t = n.transactionQueueTree_) {
	if ((t || Zi(n, t), Ze(t))) {
		const e = qc(n, t);
		(w(e.length > 0, 'Sending zero length transaction queue'),
			e.every((s) => s.status === 0) && Op(n, Kn(t), e));
	} else
		Bc(t) &&
			Xi(t, (e) => {
				No(n, e);
			});
}
function Op(n, t, e) {
	const i = e.map((c) => c.currentWriteId),
		s = Yc(n, t, i);
	let o = s;
	const r = s.hash();
	for (let c = 0; c < e.length; c++) {
		const h = e[c];
		(w(h.status === 0, 'tryToSendTransactionQueue_: items in queue should all be run.'),
			(h.status = 1),
			h.retryCount++);
		const d = ft(t, h.path);
		o = o.updateChild(d, h.currentOutputSnapshotRaw);
	}
	const a = o.val(!0),
		l = t;
	n.server_.put(
		l.toString(),
		a,
		(c) => {
			Qi(n, 'transaction put response', { path: l.toString(), status: c });
			let h = [];
			if (c === 'ok') {
				const d = [];
				for (let u = 0; u < e.length; u++)
					((e[u].status = 2),
						(h = h.concat(ve(n.serverSyncTree_, e[u].currentWriteId))),
						e[u].onComplete &&
							d.push(() => e[u].onComplete(null, !0, e[u].currentOutputSnapshotResolved)),
						e[u].unwatcher());
				(Zi(n, Do(n.transactionQueueTree_, t)),
					No(n, n.transactionQueueTree_),
					At(n.eventQueue_, t, h));
				for (let u = 0; u < d.length; u++) Je(d[u]);
			} else {
				if (c === 'datastale')
					for (let d = 0; d < e.length; d++)
						e[d].status === 3 ? (e[d].status = 4) : (e[d].status = 0);
				else {
					_t('transaction at ' + l.toString() + ' failed: ' + c);
					for (let d = 0; d < e.length; d++) ((e[d].status = 4), (e[d].abortReason = c));
				}
				Ji(n, t);
			}
		},
		r
	);
}
function Ji(n, t) {
	const e = Gc(n, t),
		i = Kn(e),
		s = qc(n, e);
	return (Np(n, s, i), i);
}
function Np(n, t, e) {
	if (t.length === 0) return;
	const i = [];
	let s = [];
	const r = t.filter((a) => a.status === 0).map((a) => a.currentWriteId);
	for (let a = 0; a < t.length; a++) {
		const l = t[a],
			c = ft(e, l.path);
		let h = !1,
			d;
		if (
			(w(c !== null, 'rerunTransactionsUnderNode_: relativePath should not be null.'),
			l.status === 4)
		)
			((h = !0), (d = l.abortReason), (s = s.concat(ve(n.serverSyncTree_, l.currentWriteId, !0))));
		else if (l.status === 0)
			if (l.retryCount >= Sp)
				((h = !0), (d = 'maxretry'), (s = s.concat(ve(n.serverSyncTree_, l.currentWriteId, !0))));
			else {
				const u = Yc(n, l.path, r);
				l.currentInputSnapshot = u;
				const f = t[a].update(u.val());
				if (f !== void 0) {
					Ao('transaction failed: Data returned ', f, l.path);
					let g = ot(f);
					(typeof f == 'object' && f != null && Ut(f, '.priority')) ||
						(g = g.updatePriority(u.getPriority()));
					const m = l.currentWriteId,
						_ = Ro(n),
						b = Lc(g, u, _);
					((l.currentOutputSnapshotRaw = g),
						(l.currentOutputSnapshotResolved = b),
						(l.currentWriteId = $c(n)),
						r.splice(r.indexOf(m), 1),
						(s = s.concat(Pc(n.serverSyncTree_, l.path, b, l.currentWriteId, l.applyLocally))),
						(s = s.concat(ve(n.serverSyncTree_, m, !0))));
				} else
					((h = !0), (d = 'nodata'), (s = s.concat(ve(n.serverSyncTree_, l.currentWriteId, !0))));
			}
		(At(n.eventQueue_, e, s),
			(s = []),
			h &&
				((t[a].status = 2),
				(function (u) {
					setTimeout(u, Math.floor(0));
				})(t[a].unwatcher),
				t[a].onComplete &&
					(d === 'nodata'
						? i.push(() => t[a].onComplete(null, !1, t[a].currentInputSnapshot))
						: i.push(() => t[a].onComplete(new Error(d), !1, null)))));
	}
	Zi(n, n.transactionQueueTree_);
	for (let a = 0; a < i.length; a++) Je(i[a]);
	No(n, n.transactionQueueTree_);
}
function Gc(n, t) {
	let e,
		i = n.transactionQueueTree_;
	for (e = R(t); e !== null && Ze(i) === void 0; ) ((i = Do(i, e)), (t = j(t)), (e = R(t)));
	return i;
}
function qc(n, t) {
	const e = [];
	return (Kc(n, t, e), e.sort((i, s) => i.order - s.order), e);
}
function Kc(n, t, e) {
	const i = Ze(t);
	if (i) for (let s = 0; s < i.length; s++) e.push(i[s]);
	Xi(t, (s) => {
		Kc(n, s, e);
	});
}
function Zi(n, t) {
	const e = Ze(t);
	if (e) {
		let i = 0;
		for (let s = 0; s < e.length; s++) e[s].status !== 2 && ((e[i] = e[s]), i++);
		((e.length = i), Fc(t, e.length > 0 ? e : void 0));
	}
	Xi(t, (i) => {
		Zi(n, i);
	});
}
function Xc(n, t) {
	const e = Kn(Gc(n, t)),
		i = Do(n.transactionQueueTree_, t);
	return (
		up(i, (s) => {
			_s(n, s);
		}),
		_s(n, i),
		Wc(i, (s) => {
			_s(n, s);
		}),
		e
	);
}
function _s(n, t) {
	const e = Ze(t);
	if (e) {
		const i = [];
		let s = [],
			o = -1;
		for (let r = 0; r < e.length; r++)
			e[r].status === 3 ||
				(e[r].status === 1
					? (w(o === r - 1, 'All SENT items should be at beginning of queue.'),
						(o = r),
						(e[r].status = 3),
						(e[r].abortReason = 'set'))
					: (w(e[r].status === 0, 'Unexpected transaction status in abort'),
						e[r].unwatcher(),
						(s = s.concat(ve(n.serverSyncTree_, e[r].currentWriteId, !0))),
						e[r].onComplete && i.push(e[r].onComplete.bind(null, new Error('set'), !1, null))));
		(o === -1 ? Fc(t, void 0) : (e.length = o + 1), At(n.eventQueue_, Kn(t), s));
		for (let r = 0; r < i.length; r++) Je(i[r]);
	}
}
function Lp(n) {
	let t = '';
	const e = n.split('/');
	for (let i = 0; i < e.length; i++)
		if (e[i].length > 0) {
			let s = e[i];
			try {
				s = decodeURIComponent(s.replace(/\+/g, ' '));
			} catch {}
			t += '/' + s;
		}
	return t;
}
function Fp(n) {
	const t = {};
	n.charAt(0) === '?' && (n = n.substring(1));
	for (const e of n.split('&')) {
		if (e.length === 0) continue;
		const i = e.split('=');
		i.length === 2
			? (t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]))
			: _t(`Invalid query segment '${e}' in query '${n}'`);
	}
	return t;
}
const qr = function (n, t) {
		const e = Bp(n),
			i = e.namespace;
		(e.domain === 'firebase.com' &&
			jt(e.host + ' is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead'),
			(!i || i === 'undefined') &&
				e.domain !== 'localhost' &&
				jt('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com'),
			e.secure || Ku());
		const s = e.scheme === 'ws' || e.scheme === 'wss';
		return {
			repoInfo: new ql(e.host, e.secure, i, s, t, '', i !== e.subdomain),
			path: new z(e.pathString)
		};
	},
	Bp = function (n) {
		let t = '',
			e = '',
			i = '',
			s = '',
			o = '',
			r = !0,
			a = 'https',
			l = 443;
		if (typeof n == 'string') {
			let c = n.indexOf('//');
			c >= 0 && ((a = n.substring(0, c - 1)), (n = n.substring(c + 2)));
			let h = n.indexOf('/');
			h === -1 && (h = n.length);
			let d = n.indexOf('?');
			(d === -1 && (d = n.length),
				(t = n.substring(0, Math.min(h, d))),
				h < d && (s = Lp(n.substring(h, d))));
			const u = Fp(n.substring(Math.min(n.length, d)));
			((c = t.indexOf(':')),
				c >= 0
					? ((r = a === 'https' || a === 'wss'), (l = parseInt(t.substring(c + 1), 10)))
					: (c = t.length));
			const f = t.slice(0, c);
			if (f.toLowerCase() === 'localhost') e = 'localhost';
			else if (f.split('.').length <= 2) e = f;
			else {
				const g = t.indexOf('.');
				((i = t.substring(0, g).toLowerCase()), (e = t.substring(g + 1)), (o = i));
			}
			'ns' in u && (o = u.ns);
		}
		return {
			host: t,
			port: l,
			domain: e,
			subdomain: i,
			secure: r,
			scheme: a,
			pathString: s,
			namespace: o
		};
	};
class Wp {
	constructor(t, e, i, s) {
		((this.eventType = t), (this.eventRegistration = e), (this.snapshot = i), (this.prevName = s));
	}
	getPath() {
		const t = this.snapshot.ref;
		return this.eventType === 'value' ? t._path : t.parent._path;
	}
	getEventType() {
		return this.eventType;
	}
	getEventRunner() {
		return this.eventRegistration.getEventRunner(this);
	}
	toString() {
		return this.getPath().toString() + ':' + this.eventType + ':' + tt(this.snapshot.exportVal());
	}
}
class zp {
	constructor(t, e, i) {
		((this.eventRegistration = t), (this.error = e), (this.path = i));
	}
	getPath() {
		return this.path;
	}
	getEventType() {
		return 'cancel';
	}
	getEventRunner() {
		return this.eventRegistration.getEventRunner(this);
	}
	toString() {
		return this.path.toString() + ':cancel';
	}
}
class Vp {
	constructor(t, e) {
		((this.snapshotCallback = t), (this.cancelCallback = e));
	}
	onValue(t, e) {
		this.snapshotCallback.call(null, t, e);
	}
	onCancel(t) {
		return (
			w(this.hasCancelCallback, 'Raising a cancel event on a listener with no cancel callback'),
			this.cancelCallback.call(null, t)
		);
	}
	get hasCancelCallback() {
		return !!this.cancelCallback;
	}
	matches(t) {
		return (
			this.snapshotCallback === t.snapshotCallback ||
			(this.snapshotCallback.userCallback !== void 0 &&
				this.snapshotCallback.userCallback === t.snapshotCallback.userCallback &&
				this.snapshotCallback.context === t.snapshotCallback.context)
		);
	}
}
class Lo {
	constructor(t, e, i, s) {
		((this._repo = t), (this._path = e), (this._queryParams = i), (this._orderByCalled = s));
	}
	get key() {
		return A(this._path) ? null : ic(this._path);
	}
	get ref() {
		return new $t(this._repo, this._path);
	}
	get _queryIdentifier() {
		const t = Rr(this._queryParams),
			e = lo(t);
		return e === '{}' ? 'default' : e;
	}
	get _queryObject() {
		return Rr(this._queryParams);
	}
	isEqual(t) {
		if (((t = Xe(t)), !(t instanceof Lo))) return !1;
		const e = this._repo === t._repo,
			i = rc(this._path, t._path),
			s = this._queryIdentifier === t._queryIdentifier;
		return e && i && s;
	}
	toJSON() {
		return this.toString();
	}
	toString() {
		return this._repo.toString() + Rf(this._path);
	}
}
class $t extends Lo {
	constructor(t, e) {
		super(t, e, new mo(), !1);
	}
	get parent() {
		const t = oc(this._path);
		return t === null ? null : new $t(this._repo, t);
	}
	get root() {
		let t = this;
		for (; t.parent !== null; ) t = t.parent;
		return t;
	}
}
class Nn {
	constructor(t, e, i) {
		((this._node = t), (this.ref = e), (this._index = i));
	}
	get priority() {
		return this._node.getPriority().val();
	}
	get key() {
		return this.ref.key;
	}
	get size() {
		return this._node.numChildren();
	}
	child(t) {
		const e = new z(t),
			i = Oi(this.ref, t);
		return new Nn(this._node.getChild(e), i, X);
	}
	exists() {
		return !this._node.isEmpty();
	}
	exportVal() {
		return this._node.val(!0);
	}
	forEach(t) {
		return this._node.isLeafNode()
			? !1
			: !!this._node.forEachChild(this._index, (i, s) => t(new Nn(s, Oi(this.ref, i), X)));
	}
	hasChild(t) {
		const e = new z(t);
		return !this._node.getChild(e).isEmpty();
	}
	hasChildren() {
		return this._node.isLeafNode() ? !1 : !this._node.isEmpty();
	}
	toJSON() {
		return this.exportVal();
	}
	val() {
		return this._node.val();
	}
}
function be(n, t) {
	return ((n = Xe(n)), n._checkNotDeleted('ref'), t !== void 0 ? Oi(n._root, t) : n._root);
}
function Oi(n, t) {
	return (
		(n = Xe(n)),
		R(n._path) === null ? bp('child', 'path', t) : Hc('child', 'path', t),
		new $t(n._repo, et(n._path, t))
	);
}
function Tv(n) {
	return (jc('remove', n._path), Le(n, null));
}
function Le(n, t) {
	((n = Xe(n)), jc('set', n._path), _p('set', t, n._path));
	const e = new ji();
	return (
		Pp(
			n._repo,
			n._path,
			t,
			null,
			e.wrapCallback(() => {})
		),
		e.promise
	);
}
function Qc(n) {
	n = Xe(n);
	const t = new Vp(() => {}),
		e = new Fo(t);
	return Mp(n._repo, n, e).then(
		(i) => new Nn(i, new $t(n._repo, n._path), n._queryParams.getIndex())
	);
}
class Fo {
	constructor(t) {
		this.callbackContext = t;
	}
	respondsTo(t) {
		return t === 'value';
	}
	createEvent(t, e) {
		const i = e._queryParams.getIndex();
		return new Wp('value', this, new Nn(t.snapshotNode, new $t(e._repo, e._path), i));
	}
	getEventRunner(t) {
		return t.getEventType() === 'cancel'
			? () => this.callbackContext.onCancel(t.error)
			: () => this.callbackContext.onValue(t.snapshot, null);
	}
	createCancelEvent(t, e) {
		return this.callbackContext.hasCancelCallback ? new zp(this, t, e) : null;
	}
	matches(t) {
		return t instanceof Fo
			? !t.callbackContext || !this.callbackContext
				? !0
				: t.callbackContext.matches(this.callbackContext)
			: !1;
	}
	hasAnyCallback() {
		return this.callbackContext !== null;
	}
}
jg($t);
qg($t);
const Hp = 'FIREBASE_DATABASE_EMULATOR_HOST',
	Gs = {};
let jp = !1;
function Up(n, t, e, i) {
	((n.repoInfo_ = new ql(
		`${t}:${e}`,
		!1,
		n.repoInfo_.namespace,
		n.repoInfo_.webSocketOnly,
		n.repoInfo_.nodeAdmin,
		n.repoInfo_.persistenceKey,
		n.repoInfo_.includeNamespaceInQueryParams,
		!0
	)),
		i && (n.authTokenProvider_ = i));
}
function $p(n, t, e, i, s) {
	let o = i || n.options.databaseURL;
	o === void 0 &&
		(n.options.projectId ||
			jt(
				"Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
			),
		ht('Using default host for project ', n.options.projectId),
		(o = `${n.options.projectId}-default-rtdb.firebaseio.com`));
	let r = qr(o, s),
		a = r.repoInfo,
		l;
	(typeof process < 'u' && pr && (l = pr[Hp]),
		l
			? ((o = `http://${l}?ns=${a.namespace}`), (r = qr(o, s)), (a = r.repoInfo))
			: r.repoInfo.secure);
	const c = new af(n.name, n.options, t);
	(yp('Invalid Firebase Database URL', r),
		A(r.path) ||
			jt(
				'Database URL must point to the root of a Firebase Database (not including a child path).'
			));
	const h = Gp(a, n, c, new rf(n.name, e));
	return new qp(h, n);
}
function Yp(n, t) {
	const e = Gs[t];
	((!e || e[n.key] !== n) && jt(`Database ${t}(${n.repoInfo_}) has already been deleted.`),
		Ap(n),
		delete e[n.key]);
}
function Gp(n, t, e, i) {
	let s = Gs[t.name];
	s || ((s = {}), (Gs[t.name] = s));
	let o = s[n.toURLString()];
	return (
		o &&
			jt(
				'Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.'
			),
		(o = new Ep(n, jp, e, i)),
		(s[n.toURLString()] = o),
		o
	);
}
class qp {
	constructor(t, e) {
		((this._repoInternal = t),
			(this.app = e),
			(this.type = 'database'),
			(this._instanceStarted = !1));
	}
	get _repo() {
		return (
			this._instanceStarted ||
				(kp(
					this._repoInternal,
					this.app.options.appId,
					this.app.options.databaseAuthVariableOverride
				),
				(this._instanceStarted = !0)),
			this._repoInternal
		);
	}
	get _root() {
		return (
			this._rootInternal || (this._rootInternal = new $t(this._repo, F())),
			this._rootInternal
		);
	}
	_delete() {
		return (
			this._rootInternal !== null &&
				(Yp(this._repo, this.app.name), (this._repoInternal = null), (this._rootInternal = null)),
			Promise.resolve()
		);
	}
	_checkNotDeleted(t) {
		this._rootInternal === null && jt('Cannot call ' + t + ' on a deleted database.');
	}
}
function Kp(n = Du(), t) {
	const e = Tu(n, 'database').getImmediate({ identifier: t });
	if (!e._instanceStarted) {
		const i = md('database');
		i && Xp(e, ...i);
	}
	return e;
}
function Xp(n, t, e, i = {}) {
	((n = Xe(n)),
		n._checkNotDeleted('useEmulator'),
		n._instanceStarted &&
			jt('Cannot call useEmulator() after instance has already been initialized.'));
	const s = n._repoInternal;
	let o;
	if (s.repoInfo_.nodeAdmin)
		(i.mockUserToken &&
			jt(
				'mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'
			),
			(o = new pi(pi.OWNER)));
	else if (i.mockUserToken) {
		const r =
			typeof i.mockUserToken == 'string'
				? i.mockUserToken
				: _d(i.mockUserToken, n.app.options.projectId);
		o = new pi(r);
	}
	Up(s, t, e, o);
}
function Qp(n) {
	(ju(Pu),
		vi(
			new kn(
				'database',
				(t, { instanceIdentifier: e }) => {
					const i = t.getProvider('app').getImmediate(),
						s = t.getProvider('auth-internal'),
						o = t.getProvider('app-check-internal');
					return $p(i, s, o, e);
				},
				'PUBLIC'
			).setMultipleInstances(!0)
		),
		Be(mr, _r, n),
		Be(mr, _r, 'esm2017'));
}
Vt.prototype.simpleListen = function (n, t) {
	this.sendRequest('q', { p: n }, t);
};
Vt.prototype.echo = function (n, t) {
	this.sendRequest('echo', { d: n }, t);
};
Qp();
const Jp = {
		apiKey: 'AIzaSyCtSxk7kAxROQVaCU9nTyh0YFy0eSbpZpo',
		authDomain: 'who-knows-who-98da7.firebaseapp.com',
		databaseURL: 'https://who-knows-who-98da7-default-rtdb.firebaseio.com',
		projectId: 'who-knows-who-98da7',
		storageBucket: 'who-knows-who-98da7.firebasestorage.app',
		messagingSenderId: '1098159458396',
		appId: '1:1098159458396:web:18bec54c2f30a16192be99',
		measurementId: 'G-R6WJY9RSD3'
	},
	Zp = Pl(Jp),
	ye = Kp(Zp);
async function Iv(n) {
	try {
		(await Le(be(ye, `gamecode/${n}/questions`), {}),
			await Le(be(ye, `gamecode/${n}/scores`), {}),
			await Le(be(ye, `gamecode/${n}/players`), {}),
			await Le(be(ye, `gamecode/${n}/answeredPlayers`), {}),
			await Le(be(ye, `gamecode/${n}/currentAnswerer`), {}));
	} catch (t) {
		console.error('Error initializing game database:', t);
	}
}
async function tm(n = 'exampleGame') {
	try {
		const t = `gamecode/${n}/scores`,
			e = await Qc(Oi(be(ye), t));
		return e.exists() ? e.val() : (console.warn('No scores found in database'), {});
	} catch (t) {
		throw (console.error('Error fetching scores:', t), t);
	}
}
async function Mv(n) {
	try {
		const t = be(ye, `gamecode/${n}`),
			e = await Qc(t);
		return e.exists() ? e.val() : null;
	} catch (t) {
		return (console.error('Error getting game state:', t), null);
	}
}
function Xn(n) {
	return (n + 0.5) | 0;
}
const Gt = (n, t, e) => Math.max(Math.min(n, e), t);
function un(n) {
	return Gt(Xn(n * 2.55), 0, 255);
}
function te(n) {
	return Gt(Xn(n * 255), 0, 255);
}
function Lt(n) {
	return Gt(Xn(n / 2.55) / 100, 0, 1);
}
function Kr(n) {
	return Gt(Xn(n * 100), 0, 100);
}
const wt = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		A: 10,
		B: 11,
		C: 12,
		D: 13,
		E: 14,
		F: 15,
		a: 10,
		b: 11,
		c: 12,
		d: 13,
		e: 14,
		f: 15
	},
	qs = [...'0123456789ABCDEF'],
	em = (n) => qs[n & 15],
	nm = (n) => qs[(n & 240) >> 4] + qs[n & 15],
	ei = (n) => (n & 240) >> 4 === (n & 15),
	im = (n) => ei(n.r) && ei(n.g) && ei(n.b) && ei(n.a);
function sm(n) {
	var t = n.length,
		e;
	return (
		n[0] === '#' &&
			(t === 4 || t === 5
				? (e = {
						r: 255 & (wt[n[1]] * 17),
						g: 255 & (wt[n[2]] * 17),
						b: 255 & (wt[n[3]] * 17),
						a: t === 5 ? wt[n[4]] * 17 : 255
					})
				: (t === 7 || t === 9) &&
					(e = {
						r: (wt[n[1]] << 4) | wt[n[2]],
						g: (wt[n[3]] << 4) | wt[n[4]],
						b: (wt[n[5]] << 4) | wt[n[6]],
						a: t === 9 ? (wt[n[7]] << 4) | wt[n[8]] : 255
					})),
		e
	);
}
const om = (n, t) => (n < 255 ? t(n) : '');
function rm(n) {
	var t = im(n) ? em : nm;
	return n ? '#' + t(n.r) + t(n.g) + t(n.b) + om(n.a, t) : void 0;
}
const am =
	/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Jc(n, t, e) {
	const i = t * Math.min(e, 1 - e),
		s = (o, r = (o + n / 30) % 12) => e - i * Math.max(Math.min(r - 3, 9 - r, 1), -1);
	return [s(0), s(8), s(4)];
}
function lm(n, t, e) {
	const i = (s, o = (s + n / 60) % 6) => e - e * t * Math.max(Math.min(o, 4 - o, 1), 0);
	return [i(5), i(3), i(1)];
}
function cm(n, t, e) {
	const i = Jc(n, 1, 0.5);
	let s;
	for (t + e > 1 && ((s = 1 / (t + e)), (t *= s), (e *= s)), s = 0; s < 3; s++)
		((i[s] *= 1 - t - e), (i[s] += t));
	return i;
}
function hm(n, t, e, i, s) {
	return n === s ? (t - e) / i + (t < e ? 6 : 0) : t === s ? (e - n) / i + 2 : (n - t) / i + 4;
}
function Bo(n) {
	const e = n.r / 255,
		i = n.g / 255,
		s = n.b / 255,
		o = Math.max(e, i, s),
		r = Math.min(e, i, s),
		a = (o + r) / 2;
	let l, c, h;
	return (
		o !== r &&
			((h = o - r),
			(c = a > 0.5 ? h / (2 - o - r) : h / (o + r)),
			(l = hm(e, i, s, h, o)),
			(l = l * 60 + 0.5)),
		[l | 0, c || 0, a]
	);
}
function Wo(n, t, e, i) {
	return (Array.isArray(t) ? n(t[0], t[1], t[2]) : n(t, e, i)).map(te);
}
function zo(n, t, e) {
	return Wo(Jc, n, t, e);
}
function dm(n, t, e) {
	return Wo(cm, n, t, e);
}
function um(n, t, e) {
	return Wo(lm, n, t, e);
}
function Zc(n) {
	return ((n % 360) + 360) % 360;
}
function fm(n) {
	const t = am.exec(n);
	let e = 255,
		i;
	if (!t) return;
	t[5] !== i && (e = t[6] ? un(+t[5]) : te(+t[5]));
	const s = Zc(+t[2]),
		o = +t[3] / 100,
		r = +t[4] / 100;
	return (
		t[1] === 'hwb' ? (i = dm(s, o, r)) : t[1] === 'hsv' ? (i = um(s, o, r)) : (i = zo(s, o, r)),
		{ r: i[0], g: i[1], b: i[2], a: e }
	);
}
function gm(n, t) {
	var e = Bo(n);
	((e[0] = Zc(e[0] + t)), (e = zo(e)), (n.r = e[0]), (n.g = e[1]), (n.b = e[2]));
}
function pm(n) {
	if (!n) return;
	const t = Bo(n),
		e = t[0],
		i = Kr(t[1]),
		s = Kr(t[2]);
	return n.a < 255 ? `hsla(${e}, ${i}%, ${s}%, ${Lt(n.a)})` : `hsl(${e}, ${i}%, ${s}%)`;
}
const Xr = {
		x: 'dark',
		Z: 'light',
		Y: 're',
		X: 'blu',
		W: 'gr',
		V: 'medium',
		U: 'slate',
		A: 'ee',
		T: 'ol',
		S: 'or',
		B: 'ra',
		C: 'lateg',
		D: 'ights',
		R: 'in',
		Q: 'turquois',
		E: 'hi',
		P: 'ro',
		O: 'al',
		N: 'le',
		M: 'de',
		L: 'yello',
		F: 'en',
		K: 'ch',
		G: 'arks',
		H: 'ea',
		I: 'ightg',
		J: 'wh'
	},
	Qr = {
		OiceXe: 'f0f8ff',
		antiquewEte: 'faebd7',
		aqua: 'ffff',
		aquamarRe: '7fffd4',
		azuY: 'f0ffff',
		beige: 'f5f5dc',
		bisque: 'ffe4c4',
		black: '0',
		blanKedOmond: 'ffebcd',
		Xe: 'ff',
		XeviTet: '8a2be2',
		bPwn: 'a52a2a',
		burlywood: 'deb887',
		caMtXe: '5f9ea0',
		KartYuse: '7fff00',
		KocTate: 'd2691e',
		cSO: 'ff7f50',
		cSnflowerXe: '6495ed',
		cSnsilk: 'fff8dc',
		crimson: 'dc143c',
		cyan: 'ffff',
		xXe: '8b',
		xcyan: '8b8b',
		xgTMnPd: 'b8860b',
		xWay: 'a9a9a9',
		xgYF: '6400',
		xgYy: 'a9a9a9',
		xkhaki: 'bdb76b',
		xmagFta: '8b008b',
		xTivegYF: '556b2f',
		xSange: 'ff8c00',
		xScEd: '9932cc',
		xYd: '8b0000',
		xsOmon: 'e9967a',
		xsHgYF: '8fbc8f',
		xUXe: '483d8b',
		xUWay: '2f4f4f',
		xUgYy: '2f4f4f',
		xQe: 'ced1',
		xviTet: '9400d3',
		dAppRk: 'ff1493',
		dApskyXe: 'bfff',
		dimWay: '696969',
		dimgYy: '696969',
		dodgerXe: '1e90ff',
		fiYbrick: 'b22222',
		flSOwEte: 'fffaf0',
		foYstWAn: '228b22',
		fuKsia: 'ff00ff',
		gaRsbSo: 'dcdcdc',
		ghostwEte: 'f8f8ff',
		gTd: 'ffd700',
		gTMnPd: 'daa520',
		Way: '808080',
		gYF: '8000',
		gYFLw: 'adff2f',
		gYy: '808080',
		honeyMw: 'f0fff0',
		hotpRk: 'ff69b4',
		RdianYd: 'cd5c5c',
		Rdigo: '4b0082',
		ivSy: 'fffff0',
		khaki: 'f0e68c',
		lavFMr: 'e6e6fa',
		lavFMrXsh: 'fff0f5',
		lawngYF: '7cfc00',
		NmoncEffon: 'fffacd',
		ZXe: 'add8e6',
		ZcSO: 'f08080',
		Zcyan: 'e0ffff',
		ZgTMnPdLw: 'fafad2',
		ZWay: 'd3d3d3',
		ZgYF: '90ee90',
		ZgYy: 'd3d3d3',
		ZpRk: 'ffb6c1',
		ZsOmon: 'ffa07a',
		ZsHgYF: '20b2aa',
		ZskyXe: '87cefa',
		ZUWay: '778899',
		ZUgYy: '778899',
		ZstAlXe: 'b0c4de',
		ZLw: 'ffffe0',
		lime: 'ff00',
		limegYF: '32cd32',
		lRF: 'faf0e6',
		magFta: 'ff00ff',
		maPon: '800000',
		VaquamarRe: '66cdaa',
		VXe: 'cd',
		VScEd: 'ba55d3',
		VpurpN: '9370db',
		VsHgYF: '3cb371',
		VUXe: '7b68ee',
		VsprRggYF: 'fa9a',
		VQe: '48d1cc',
		VviTetYd: 'c71585',
		midnightXe: '191970',
		mRtcYam: 'f5fffa',
		mistyPse: 'ffe4e1',
		moccasR: 'ffe4b5',
		navajowEte: 'ffdead',
		navy: '80',
		Tdlace: 'fdf5e6',
		Tive: '808000',
		TivedBb: '6b8e23',
		Sange: 'ffa500',
		SangeYd: 'ff4500',
		ScEd: 'da70d6',
		pOegTMnPd: 'eee8aa',
		pOegYF: '98fb98',
		pOeQe: 'afeeee',
		pOeviTetYd: 'db7093',
		papayawEp: 'ffefd5',
		pHKpuff: 'ffdab9',
		peru: 'cd853f',
		pRk: 'ffc0cb',
		plum: 'dda0dd',
		powMrXe: 'b0e0e6',
		purpN: '800080',
		YbeccapurpN: '663399',
		Yd: 'ff0000',
		Psybrown: 'bc8f8f',
		PyOXe: '4169e1',
		saddNbPwn: '8b4513',
		sOmon: 'fa8072',
		sandybPwn: 'f4a460',
		sHgYF: '2e8b57',
		sHshell: 'fff5ee',
		siFna: 'a0522d',
		silver: 'c0c0c0',
		skyXe: '87ceeb',
		UXe: '6a5acd',
		UWay: '708090',
		UgYy: '708090',
		snow: 'fffafa',
		sprRggYF: 'ff7f',
		stAlXe: '4682b4',
		tan: 'd2b48c',
		teO: '8080',
		tEstN: 'd8bfd8',
		tomato: 'ff6347',
		Qe: '40e0d0',
		viTet: 'ee82ee',
		JHt: 'f5deb3',
		wEte: 'ffffff',
		wEtesmoke: 'f5f5f5',
		Lw: 'ffff00',
		LwgYF: '9acd32'
	};
function mm() {
	const n = {},
		t = Object.keys(Qr),
		e = Object.keys(Xr);
	let i, s, o, r, a;
	for (i = 0; i < t.length; i++) {
		for (r = a = t[i], s = 0; s < e.length; s++) ((o = e[s]), (a = a.replace(o, Xr[o])));
		((o = parseInt(Qr[r], 16)), (n[a] = [(o >> 16) & 255, (o >> 8) & 255, o & 255]));
	}
	return n;
}
let ni;
function _m(n) {
	ni || ((ni = mm()), (ni.transparent = [0, 0, 0, 0]));
	const t = ni[n.toLowerCase()];
	return t && { r: t[0], g: t[1], b: t[2], a: t.length === 4 ? t[3] : 255 };
}
const bm =
	/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function ym(n) {
	const t = bm.exec(n);
	let e = 255,
		i,
		s,
		o;
	if (t) {
		if (t[7] !== i) {
			const r = +t[7];
			e = t[8] ? un(r) : Gt(r * 255, 0, 255);
		}
		return (
			(i = +t[1]),
			(s = +t[3]),
			(o = +t[5]),
			(i = 255 & (t[2] ? un(i) : Gt(i, 0, 255))),
			(s = 255 & (t[4] ? un(s) : Gt(s, 0, 255))),
			(o = 255 & (t[6] ? un(o) : Gt(o, 0, 255))),
			{ r: i, g: s, b: o, a: e }
		);
	}
}
function xm(n) {
	return (
		n && (n.a < 255 ? `rgba(${n.r}, ${n.g}, ${n.b}, ${Lt(n.a)})` : `rgb(${n.r}, ${n.g}, ${n.b})`)
	);
}
const bs = (n) => (n <= 0.0031308 ? n * 12.92 : Math.pow(n, 1 / 2.4) * 1.055 - 0.055),
	Oe = (n) => (n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4));
function vm(n, t, e) {
	const i = Oe(Lt(n.r)),
		s = Oe(Lt(n.g)),
		o = Oe(Lt(n.b));
	return {
		r: te(bs(i + e * (Oe(Lt(t.r)) - i))),
		g: te(bs(s + e * (Oe(Lt(t.g)) - s))),
		b: te(bs(o + e * (Oe(Lt(t.b)) - o))),
		a: n.a + e * (t.a - n.a)
	};
}
function ii(n, t, e) {
	if (n) {
		let i = Bo(n);
		((i[t] = Math.max(0, Math.min(i[t] + i[t] * e, t === 0 ? 360 : 1))),
			(i = zo(i)),
			(n.r = i[0]),
			(n.g = i[1]),
			(n.b = i[2]));
	}
}
function th(n, t) {
	return n && Object.assign(t || {}, n);
}
function Jr(n) {
	var t = { r: 0, g: 0, b: 0, a: 255 };
	return (
		Array.isArray(n)
			? n.length >= 3 &&
				((t = { r: n[0], g: n[1], b: n[2], a: 255 }), n.length > 3 && (t.a = te(n[3])))
			: ((t = th(n, { r: 0, g: 0, b: 0, a: 1 })), (t.a = te(t.a))),
		t
	);
}
function wm(n) {
	return n.charAt(0) === 'r' ? ym(n) : fm(n);
}
class Ln {
	constructor(t) {
		if (t instanceof Ln) return t;
		const e = typeof t;
		let i;
		(e === 'object' ? (i = Jr(t)) : e === 'string' && (i = sm(t) || _m(t) || wm(t)),
			(this._rgb = i),
			(this._valid = !!i));
	}
	get valid() {
		return this._valid;
	}
	get rgb() {
		var t = th(this._rgb);
		return (t && (t.a = Lt(t.a)), t);
	}
	set rgb(t) {
		this._rgb = Jr(t);
	}
	rgbString() {
		return this._valid ? xm(this._rgb) : void 0;
	}
	hexString() {
		return this._valid ? rm(this._rgb) : void 0;
	}
	hslString() {
		return this._valid ? pm(this._rgb) : void 0;
	}
	mix(t, e) {
		if (t) {
			const i = this.rgb,
				s = t.rgb;
			let o;
			const r = e === o ? 0.5 : e,
				a = 2 * r - 1,
				l = i.a - s.a,
				c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
			((o = 1 - c),
				(i.r = 255 & (c * i.r + o * s.r + 0.5)),
				(i.g = 255 & (c * i.g + o * s.g + 0.5)),
				(i.b = 255 & (c * i.b + o * s.b + 0.5)),
				(i.a = r * i.a + (1 - r) * s.a),
				(this.rgb = i));
		}
		return this;
	}
	interpolate(t, e) {
		return (t && (this._rgb = vm(this._rgb, t._rgb, e)), this);
	}
	clone() {
		return new Ln(this.rgb);
	}
	alpha(t) {
		return ((this._rgb.a = te(t)), this);
	}
	clearer(t) {
		const e = this._rgb;
		return ((e.a *= 1 - t), this);
	}
	greyscale() {
		const t = this._rgb,
			e = Xn(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
		return ((t.r = t.g = t.b = e), this);
	}
	opaquer(t) {
		const e = this._rgb;
		return ((e.a *= 1 + t), this);
	}
	negate() {
		const t = this._rgb;
		return ((t.r = 255 - t.r), (t.g = 255 - t.g), (t.b = 255 - t.b), this);
	}
	lighten(t) {
		return (ii(this._rgb, 2, t), this);
	}
	darken(t) {
		return (ii(this._rgb, 2, -t), this);
	}
	saturate(t) {
		return (ii(this._rgb, 1, t), this);
	}
	desaturate(t) {
		return (ii(this._rgb, 1, -t), this);
	}
	rotate(t) {
		return (gm(this._rgb, t), this);
	}
}
function Rt() {}
const Cm = (() => {
	let n = 0;
	return () => n++;
})();
function L(n) {
	return n == null;
}
function q(n) {
	if (Array.isArray && Array.isArray(n)) return !0;
	const t = Object.prototype.toString.call(n);
	return t.slice(0, 7) === '[object' && t.slice(-6) === 'Array]';
}
function O(n) {
	return n !== null && Object.prototype.toString.call(n) === '[object Object]';
}
function Q(n) {
	return (typeof n == 'number' || n instanceof Number) && isFinite(+n);
}
function xt(n, t) {
	return Q(n) ? n : t;
}
function I(n, t) {
	return typeof n > 'u' ? t : n;
}
const Sm = (n, t) => (typeof n == 'string' && n.endsWith('%') ? parseFloat(n) / 100 : +n / t),
	eh = (n, t) => (typeof n == 'string' && n.endsWith('%') ? (parseFloat(n) / 100) * t : +n);
function V(n, t, e) {
	if (n && typeof n.call == 'function') return n.apply(e, t);
}
function B(n, t, e, i) {
	let s, o, r;
	if (q(n)) for (o = n.length, s = 0; s < o; s++) t.call(e, n[s], s);
	else if (O(n)) for (r = Object.keys(n), o = r.length, s = 0; s < o; s++) t.call(e, n[r[s]], r[s]);
}
function Ni(n, t) {
	let e, i, s, o;
	if (!n || !t || n.length !== t.length) return !1;
	for (e = 0, i = n.length; e < i; ++e)
		if (((s = n[e]), (o = t[e]), s.datasetIndex !== o.datasetIndex || s.index !== o.index))
			return !1;
	return !0;
}
function Li(n) {
	if (q(n)) return n.map(Li);
	if (O(n)) {
		const t = Object.create(null),
			e = Object.keys(n),
			i = e.length;
		let s = 0;
		for (; s < i; ++s) t[e[s]] = Li(n[e[s]]);
		return t;
	}
	return n;
}
function nh(n) {
	return ['__proto__', 'prototype', 'constructor'].indexOf(n) === -1;
}
function Em(n, t, e, i) {
	if (!nh(n)) return;
	const s = t[n],
		o = e[n];
	O(s) && O(o) ? Fn(s, o, i) : (t[n] = Li(o));
}
function Fn(n, t, e) {
	const i = q(t) ? t : [t],
		s = i.length;
	if (!O(n)) return n;
	e = e || {};
	const o = e.merger || Em;
	let r;
	for (let a = 0; a < s; ++a) {
		if (((r = i[a]), !O(r))) continue;
		const l = Object.keys(r);
		for (let c = 0, h = l.length; c < h; ++c) o(l[c], n, r, e);
	}
	return n;
}
function vn(n, t) {
	return Fn(n, t, { merger: km });
}
function km(n, t, e) {
	if (!nh(n)) return;
	const i = t[n],
		s = e[n];
	O(i) && O(s) ? vn(i, s) : Object.prototype.hasOwnProperty.call(t, n) || (t[n] = Li(s));
}
const Zr = { '': (n) => n, x: (n) => n.x, y: (n) => n.y };
function Tm(n) {
	const t = n.split('.'),
		e = [];
	let i = '';
	for (const s of t)
		((i += s), i.endsWith('\\') ? (i = i.slice(0, -1) + '.') : (e.push(i), (i = '')));
	return e;
}
function Im(n) {
	const t = Tm(n);
	return (e) => {
		for (const i of t) {
			if (i === '') break;
			e = e && e[i];
		}
		return e;
	};
}
function se(n, t) {
	return (Zr[t] || (Zr[t] = Im(t)))(n);
}
function Vo(n) {
	return n.charAt(0).toUpperCase() + n.slice(1);
}
const Bn = (n) => typeof n < 'u',
	oe = (n) => typeof n == 'function',
	ta = (n, t) => {
		if (n.size !== t.size) return !1;
		for (const e of n) if (!t.has(e)) return !1;
		return !0;
	};
function Mm(n) {
	return n.type === 'mouseup' || n.type === 'click' || n.type === 'contextmenu';
}
const Y = Math.PI,
	$ = 2 * Y,
	Pm = $ + Y,
	Fi = Number.POSITIVE_INFINITY,
	Dm = Y / 180,
	Z = Y / 2,
	he = Y / 4,
	ea = (Y * 2) / 3,
	qt = Math.log10,
	Dt = Math.sign;
function wn(n, t, e) {
	return Math.abs(n - t) < e;
}
function na(n) {
	const t = Math.round(n);
	n = wn(n, t, n / 1e3) ? t : n;
	const e = Math.pow(10, Math.floor(qt(n))),
		i = n / e;
	return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e;
}
function Am(n) {
	const t = [],
		e = Math.sqrt(n);
	let i;
	for (i = 1; i < e; i++) n % i === 0 && (t.push(i), t.push(n / i));
	return (e === (e | 0) && t.push(e), t.sort((s, o) => s - o).pop(), t);
}
function Ye(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function Rm(n, t) {
	const e = Math.round(n);
	return e - t <= n && e + t >= n;
}
function ih(n, t, e) {
	let i, s, o;
	for (i = 0, s = n.length; i < s; i++)
		((o = n[i][e]), isNaN(o) || ((t.min = Math.min(t.min, o)), (t.max = Math.max(t.max, o))));
}
function Tt(n) {
	return n * (Y / 180);
}
function Ho(n) {
	return n * (180 / Y);
}
function ia(n) {
	if (!Q(n)) return;
	let t = 1,
		e = 0;
	for (; Math.round(n * t) / t !== n; ) ((t *= 10), e++);
	return e;
}
function sh(n, t) {
	const e = t.x - n.x,
		i = t.y - n.y,
		s = Math.sqrt(e * e + i * i);
	let o = Math.atan2(i, e);
	return (o < -0.5 * Y && (o += $), { angle: o, distance: s });
}
function Ks(n, t) {
	return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2));
}
function Om(n, t) {
	return ((n - t + Pm) % $) - Y;
}
function vt(n) {
	return ((n % $) + $) % $;
}
function Wn(n, t, e, i) {
	const s = vt(n),
		o = vt(t),
		r = vt(e),
		a = vt(o - s),
		l = vt(r - s),
		c = vt(s - o),
		h = vt(s - r);
	return s === o || s === r || (i && o === r) || (a > l && c < h);
}
function rt(n, t, e) {
	return Math.max(t, Math.min(e, n));
}
function Nm(n) {
	return rt(n, -32768, 32767);
}
function Bt(n, t, e, i = 1e-6) {
	return n >= Math.min(t, e) - i && n <= Math.max(t, e) + i;
}
function jo(n, t, e) {
	e = e || ((r) => n[r] < t);
	let i = n.length - 1,
		s = 0,
		o;
	for (; i - s > 1; ) ((o = (s + i) >> 1), e(o) ? (s = o) : (i = o));
	return { lo: s, hi: i };
}
const Wt = (n, t, e, i) =>
		jo(
			n,
			e,
			i
				? (s) => {
						const o = n[s][t];
						return o < e || (o === e && n[s + 1][t] === e);
					}
				: (s) => n[s][t] < e
		),
	Lm = (n, t, e) => jo(n, e, (i) => n[i][t] >= e);
function Fm(n, t, e) {
	let i = 0,
		s = n.length;
	for (; i < s && n[i] < t; ) i++;
	for (; s > i && n[s - 1] > e; ) s--;
	return i > 0 || s < n.length ? n.slice(i, s) : n;
}
const oh = ['push', 'pop', 'shift', 'splice', 'unshift'];
function Bm(n, t) {
	if (n._chartjs) {
		n._chartjs.listeners.push(t);
		return;
	}
	(Object.defineProperty(n, '_chartjs', {
		configurable: !0,
		enumerable: !1,
		value: { listeners: [t] }
	}),
		oh.forEach((e) => {
			const i = '_onData' + Vo(e),
				s = n[e];
			Object.defineProperty(n, e, {
				configurable: !0,
				enumerable: !1,
				value(...o) {
					const r = s.apply(this, o);
					return (
						n._chartjs.listeners.forEach((a) => {
							typeof a[i] == 'function' && a[i](...o);
						}),
						r
					);
				}
			});
		}));
}
function sa(n, t) {
	const e = n._chartjs;
	if (!e) return;
	const i = e.listeners,
		s = i.indexOf(t);
	(s !== -1 && i.splice(s, 1),
		!(i.length > 0) &&
			(oh.forEach((o) => {
				delete n[o];
			}),
			delete n._chartjs));
}
function rh(n) {
	const t = new Set(n);
	return t.size === n.length ? n : Array.from(t);
}
const ah = (function () {
	return typeof window > 'u'
		? function (n) {
				return n();
			}
		: window.requestAnimationFrame;
})();
function lh(n, t) {
	let e = [],
		i = !1;
	return function (...s) {
		((e = s),
			i ||
				((i = !0),
				ah.call(window, () => {
					((i = !1), n.apply(t, e));
				})));
	};
}
function Wm(n, t) {
	let e;
	return function (...i) {
		return (t ? (clearTimeout(e), (e = setTimeout(n, t, i))) : n.apply(this, i), t);
	};
}
const Uo = (n) => (n === 'start' ? 'left' : n === 'end' ? 'right' : 'center'),
	ct = (n, t, e) => (n === 'start' ? t : n === 'end' ? e : (t + e) / 2),
	zm = (n, t, e, i) => (n === (i ? 'left' : 'right') ? e : n === 'center' ? (t + e) / 2 : t);
function ch(n, t, e) {
	const i = t.length;
	let s = 0,
		o = i;
	if (n._sorted) {
		const { iScale: r, _parsed: a } = n,
			l = r.axis,
			{ min: c, max: h, minDefined: d, maxDefined: u } = r.getUserBounds();
		(d && (s = rt(Math.min(Wt(a, l, c).lo, e ? i : Wt(t, l, r.getPixelForValue(c)).lo), 0, i - 1)),
			u
				? (o =
						rt(
							Math.max(
								Wt(a, r.axis, h, !0).hi + 1,
								e ? 0 : Wt(t, l, r.getPixelForValue(h), !0).hi + 1
							),
							s,
							i
						) - s)
				: (o = i - s));
	}
	return { start: s, count: o };
}
function hh(n) {
	const { xScale: t, yScale: e, _scaleRanges: i } = n,
		s = { xmin: t.min, xmax: t.max, ymin: e.min, ymax: e.max };
	if (!i) return ((n._scaleRanges = s), !0);
	const o = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== e.min || i.ymax !== e.max;
	return (Object.assign(i, s), o);
}
const si = (n) => n === 0 || n === 1,
	oa = (n, t, e) => -(Math.pow(2, 10 * (n -= 1)) * Math.sin(((n - t) * $) / e)),
	ra = (n, t, e) => Math.pow(2, -10 * n) * Math.sin(((n - t) * $) / e) + 1,
	Cn = {
		linear: (n) => n,
		easeInQuad: (n) => n * n,
		easeOutQuad: (n) => -n * (n - 2),
		easeInOutQuad: (n) => ((n /= 0.5) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1)),
		easeInCubic: (n) => n * n * n,
		easeOutCubic: (n) => (n -= 1) * n * n + 1,
		easeInOutCubic: (n) => ((n /= 0.5) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2)),
		easeInQuart: (n) => n * n * n * n,
		easeOutQuart: (n) => -((n -= 1) * n * n * n - 1),
		easeInOutQuart: (n) =>
			(n /= 0.5) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2),
		easeInQuint: (n) => n * n * n * n * n,
		easeOutQuint: (n) => (n -= 1) * n * n * n * n + 1,
		easeInOutQuint: (n) =>
			(n /= 0.5) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2),
		easeInSine: (n) => -Math.cos(n * Z) + 1,
		easeOutSine: (n) => Math.sin(n * Z),
		easeInOutSine: (n) => -0.5 * (Math.cos(Y * n) - 1),
		easeInExpo: (n) => (n === 0 ? 0 : Math.pow(2, 10 * (n - 1))),
		easeOutExpo: (n) => (n === 1 ? 1 : -Math.pow(2, -10 * n) + 1),
		easeInOutExpo: (n) =>
			si(n)
				? n
				: n < 0.5
					? 0.5 * Math.pow(2, 10 * (n * 2 - 1))
					: 0.5 * (-Math.pow(2, -10 * (n * 2 - 1)) + 2),
		easeInCirc: (n) => (n >= 1 ? n : -(Math.sqrt(1 - n * n) - 1)),
		easeOutCirc: (n) => Math.sqrt(1 - (n -= 1) * n),
		easeInOutCirc: (n) =>
			(n /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1),
		easeInElastic: (n) => (si(n) ? n : oa(n, 0.075, 0.3)),
		easeOutElastic: (n) => (si(n) ? n : ra(n, 0.075, 0.3)),
		easeInOutElastic(n) {
			return si(n)
				? n
				: n < 0.5
					? 0.5 * oa(n * 2, 0.1125, 0.45)
					: 0.5 + 0.5 * ra(n * 2 - 1, 0.1125, 0.45);
		},
		easeInBack(n) {
			return n * n * ((1.70158 + 1) * n - 1.70158);
		},
		easeOutBack(n) {
			return (n -= 1) * n * ((1.70158 + 1) * n + 1.70158) + 1;
		},
		easeInOutBack(n) {
			let t = 1.70158;
			return (n /= 0.5) < 1
				? 0.5 * (n * n * (((t *= 1.525) + 1) * n - t))
				: 0.5 * ((n -= 2) * n * (((t *= 1.525) + 1) * n + t) + 2);
		},
		easeInBounce: (n) => 1 - Cn.easeOutBounce(1 - n),
		easeOutBounce(n) {
			return n < 1 / 2.75
				? 7.5625 * n * n
				: n < 2 / 2.75
					? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75
					: n < 2.5 / 2.75
						? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375
						: 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
		},
		easeInOutBounce: (n) =>
			n < 0.5 ? Cn.easeInBounce(n * 2) * 0.5 : Cn.easeOutBounce(n * 2 - 1) * 0.5 + 0.5
	};
function $o(n) {
	if (n && typeof n == 'object') {
		const t = n.toString();
		return t === '[object CanvasPattern]' || t === '[object CanvasGradient]';
	}
	return !1;
}
function aa(n) {
	return $o(n) ? n : new Ln(n);
}
function ys(n) {
	return $o(n) ? n : new Ln(n).saturate(0.5).darken(0.1).hexString();
}
const Vm = ['x', 'y', 'borderWidth', 'radius', 'tension'],
	Hm = ['color', 'borderColor', 'backgroundColor'];
function jm(n) {
	(n.set('animation', {
		delay: void 0,
		duration: 1e3,
		easing: 'easeOutQuart',
		fn: void 0,
		from: void 0,
		loop: void 0,
		to: void 0,
		type: void 0
	}),
		n.describe('animation', {
			_fallback: !1,
			_indexable: !1,
			_scriptable: (t) => t !== 'onProgress' && t !== 'onComplete' && t !== 'fn'
		}),
		n.set('animations', {
			colors: { type: 'color', properties: Hm },
			numbers: { type: 'number', properties: Vm }
		}),
		n.describe('animations', { _fallback: 'animation' }),
		n.set('transitions', {
			active: { animation: { duration: 400 } },
			resize: { animation: { duration: 0 } },
			show: {
				animations: { colors: { from: 'transparent' }, visible: { type: 'boolean', duration: 0 } }
			},
			hide: {
				animations: {
					colors: { to: 'transparent' },
					visible: { type: 'boolean', easing: 'linear', fn: (t) => t | 0 }
				}
			}
		}));
}
function Um(n) {
	n.set('layout', { autoPadding: !0, padding: { top: 0, right: 0, bottom: 0, left: 0 } });
}
const la = new Map();
function $m(n, t) {
	t = t || {};
	const e = n + JSON.stringify(t);
	let i = la.get(e);
	return (i || ((i = new Intl.NumberFormat(n, t)), la.set(e, i)), i);
}
function Qn(n, t, e) {
	return $m(t, e).format(n);
}
const dh = {
	values(n) {
		return q(n) ? n : '' + n;
	},
	numeric(n, t, e) {
		if (n === 0) return '0';
		const i = this.chart.options.locale;
		let s,
			o = n;
		if (e.length > 1) {
			const c = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
			((c < 1e-4 || c > 1e15) && (s = 'scientific'), (o = Ym(n, e)));
		}
		const r = qt(Math.abs(o)),
			a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0),
			l = { notation: s, minimumFractionDigits: a, maximumFractionDigits: a };
		return (Object.assign(l, this.options.ticks.format), Qn(n, i, l));
	},
	logarithmic(n, t, e) {
		if (n === 0) return '0';
		const i = e[t].significand || n / Math.pow(10, Math.floor(qt(n)));
		return [1, 2, 3, 5, 10, 15].includes(i) || t > 0.8 * e.length
			? dh.numeric.call(this, n, t, e)
			: '';
	}
};
function Ym(n, t) {
	let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
	return (Math.abs(e) >= 1 && n !== Math.floor(n) && (e = n - Math.floor(n)), e);
}
var ts = { formatters: dh };
function Gm(n) {
	(n.set('scale', {
		display: !0,
		offset: !1,
		reverse: !1,
		beginAtZero: !1,
		bounds: 'ticks',
		clip: !0,
		grace: 0,
		grid: {
			display: !0,
			lineWidth: 1,
			drawOnChartArea: !0,
			drawTicks: !0,
			tickLength: 8,
			tickWidth: (t, e) => e.lineWidth,
			tickColor: (t, e) => e.color,
			offset: !1
		},
		border: { display: !0, dash: [], dashOffset: 0, width: 1 },
		title: { display: !1, text: '', padding: { top: 4, bottom: 4 } },
		ticks: {
			minRotation: 0,
			maxRotation: 50,
			mirror: !1,
			textStrokeWidth: 0,
			textStrokeColor: '',
			padding: 3,
			display: !0,
			autoSkip: !0,
			autoSkipPadding: 3,
			labelOffset: 0,
			callback: ts.formatters.values,
			minor: {},
			major: {},
			align: 'center',
			crossAlign: 'near',
			showLabelBackdrop: !1,
			backdropColor: 'rgba(255, 255, 255, 0.75)',
			backdropPadding: 2
		}
	}),
		n.route('scale.ticks', 'color', '', 'color'),
		n.route('scale.grid', 'color', '', 'borderColor'),
		n.route('scale.border', 'color', '', 'borderColor'),
		n.route('scale.title', 'color', '', 'color'),
		n.describe('scale', {
			_fallback: !1,
			_scriptable: (t) =>
				!t.startsWith('before') && !t.startsWith('after') && t !== 'callback' && t !== 'parser',
			_indexable: (t) => t !== 'borderDash' && t !== 'tickBorderDash' && t !== 'dash'
		}),
		n.describe('scales', { _fallback: 'scale' }),
		n.describe('scale.ticks', {
			_scriptable: (t) => t !== 'backdropPadding' && t !== 'callback',
			_indexable: (t) => t !== 'backdropPadding'
		}));
}
const Te = Object.create(null),
	Xs = Object.create(null);
function Sn(n, t) {
	if (!t) return n;
	const e = t.split('.');
	for (let i = 0, s = e.length; i < s; ++i) {
		const o = e[i];
		n = n[o] || (n[o] = Object.create(null));
	}
	return n;
}
function xs(n, t, e) {
	return typeof t == 'string' ? Fn(Sn(n, t), e) : Fn(Sn(n, ''), t);
}
class qm {
	constructor(t, e) {
		((this.animation = void 0),
			(this.backgroundColor = 'rgba(0,0,0,0.1)'),
			(this.borderColor = 'rgba(0,0,0,0.1)'),
			(this.color = '#666'),
			(this.datasets = {}),
			(this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio()),
			(this.elements = {}),
			(this.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove']),
			(this.font = {
				family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				size: 12,
				style: 'normal',
				lineHeight: 1.2,
				weight: null
			}),
			(this.hover = {}),
			(this.hoverBackgroundColor = (i, s) => ys(s.backgroundColor)),
			(this.hoverBorderColor = (i, s) => ys(s.borderColor)),
			(this.hoverColor = (i, s) => ys(s.color)),
			(this.indexAxis = 'x'),
			(this.interaction = { mode: 'nearest', intersect: !0, includeInvisible: !1 }),
			(this.maintainAspectRatio = !0),
			(this.onHover = null),
			(this.onClick = null),
			(this.parsing = !0),
			(this.plugins = {}),
			(this.responsive = !0),
			(this.scale = void 0),
			(this.scales = {}),
			(this.showLine = !0),
			(this.drawActiveElementsOnTop = !0),
			this.describe(t),
			this.apply(e));
	}
	set(t, e) {
		return xs(this, t, e);
	}
	get(t) {
		return Sn(this, t);
	}
	describe(t, e) {
		return xs(Xs, t, e);
	}
	override(t, e) {
		return xs(Te, t, e);
	}
	route(t, e, i, s) {
		const o = Sn(this, t),
			r = Sn(this, i),
			a = '_' + e;
		Object.defineProperties(o, {
			[a]: { value: o[e], writable: !0 },
			[e]: {
				enumerable: !0,
				get() {
					const l = this[a],
						c = r[s];
					return O(l) ? Object.assign({}, c, l) : I(l, c);
				},
				set(l) {
					this[a] = l;
				}
			}
		});
	}
	apply(t) {
		t.forEach((e) => e(this));
	}
}
var K = new qm(
	{
		_scriptable: (n) => !n.startsWith('on'),
		_indexable: (n) => n !== 'events',
		hover: { _fallback: 'interaction' },
		interaction: { _scriptable: !1, _indexable: !1 }
	},
	[jm, Um, Gm]
);
function Km(n) {
	return !n || L(n.size) || L(n.family)
		? null
		: (n.style ? n.style + ' ' : '') + (n.weight ? n.weight + ' ' : '') + n.size + 'px ' + n.family;
}
function Bi(n, t, e, i, s) {
	let o = t[s];
	return (o || ((o = t[s] = n.measureText(s).width), e.push(s)), o > i && (i = o), i);
}
function Xm(n, t, e, i) {
	i = i || {};
	let s = (i.data = i.data || {}),
		o = (i.garbageCollect = i.garbageCollect || []);
	(i.font !== t && ((s = i.data = {}), (o = i.garbageCollect = []), (i.font = t)),
		n.save(),
		(n.font = t));
	let r = 0;
	const a = e.length;
	let l, c, h, d, u;
	for (l = 0; l < a; l++)
		if (((d = e[l]), d != null && !q(d))) r = Bi(n, s, o, r, d);
		else if (q(d))
			for (c = 0, h = d.length; c < h; c++)
				((u = d[c]), u != null && !q(u) && (r = Bi(n, s, o, r, u)));
	n.restore();
	const f = o.length / 2;
	if (f > e.length) {
		for (l = 0; l < f; l++) delete s[o[l]];
		o.splice(0, f);
	}
	return r;
}
function de(n, t, e) {
	const i = n.currentDevicePixelRatio,
		s = e !== 0 ? Math.max(e / 2, 0.5) : 0;
	return Math.round((t - s) * i) / i + s;
}
function ca(n, t) {
	(!t && !n) ||
		((t = t || n.getContext('2d')),
		t.save(),
		t.resetTransform(),
		t.clearRect(0, 0, n.width, n.height),
		t.restore());
}
function Qs(n, t, e, i) {
	uh(n, t, e, i, null);
}
function uh(n, t, e, i, s) {
	let o, r, a, l, c, h, d, u;
	const f = t.pointStyle,
		g = t.rotation,
		p = t.radius;
	let m = (g || 0) * Dm;
	if (
		f &&
		typeof f == 'object' &&
		((o = f.toString()), o === '[object HTMLImageElement]' || o === '[object HTMLCanvasElement]')
	) {
		(n.save(),
			n.translate(e, i),
			n.rotate(m),
			n.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height),
			n.restore());
		return;
	}
	if (!(isNaN(p) || p <= 0)) {
		switch ((n.beginPath(), f)) {
			default:
				(s ? n.ellipse(e, i, s / 2, p, 0, 0, $) : n.arc(e, i, p, 0, $), n.closePath());
				break;
			case 'triangle':
				((h = s ? s / 2 : p),
					n.moveTo(e + Math.sin(m) * h, i - Math.cos(m) * p),
					(m += ea),
					n.lineTo(e + Math.sin(m) * h, i - Math.cos(m) * p),
					(m += ea),
					n.lineTo(e + Math.sin(m) * h, i - Math.cos(m) * p),
					n.closePath());
				break;
			case 'rectRounded':
				((c = p * 0.516),
					(l = p - c),
					(r = Math.cos(m + he) * l),
					(d = Math.cos(m + he) * (s ? s / 2 - c : l)),
					(a = Math.sin(m + he) * l),
					(u = Math.sin(m + he) * (s ? s / 2 - c : l)),
					n.arc(e - d, i - a, c, m - Y, m - Z),
					n.arc(e + u, i - r, c, m - Z, m),
					n.arc(e + d, i + a, c, m, m + Z),
					n.arc(e - u, i + r, c, m + Z, m + Y),
					n.closePath());
				break;
			case 'rect':
				if (!g) {
					((l = Math.SQRT1_2 * p), (h = s ? s / 2 : l), n.rect(e - h, i - l, 2 * h, 2 * l));
					break;
				}
				m += he;
			case 'rectRot':
				((d = Math.cos(m) * (s ? s / 2 : p)),
					(r = Math.cos(m) * p),
					(a = Math.sin(m) * p),
					(u = Math.sin(m) * (s ? s / 2 : p)),
					n.moveTo(e - d, i - a),
					n.lineTo(e + u, i - r),
					n.lineTo(e + d, i + a),
					n.lineTo(e - u, i + r),
					n.closePath());
				break;
			case 'crossRot':
				m += he;
			case 'cross':
				((d = Math.cos(m) * (s ? s / 2 : p)),
					(r = Math.cos(m) * p),
					(a = Math.sin(m) * p),
					(u = Math.sin(m) * (s ? s / 2 : p)),
					n.moveTo(e - d, i - a),
					n.lineTo(e + d, i + a),
					n.moveTo(e + u, i - r),
					n.lineTo(e - u, i + r));
				break;
			case 'star':
				((d = Math.cos(m) * (s ? s / 2 : p)),
					(r = Math.cos(m) * p),
					(a = Math.sin(m) * p),
					(u = Math.sin(m) * (s ? s / 2 : p)),
					n.moveTo(e - d, i - a),
					n.lineTo(e + d, i + a),
					n.moveTo(e + u, i - r),
					n.lineTo(e - u, i + r),
					(m += he),
					(d = Math.cos(m) * (s ? s / 2 : p)),
					(r = Math.cos(m) * p),
					(a = Math.sin(m) * p),
					(u = Math.sin(m) * (s ? s / 2 : p)),
					n.moveTo(e - d, i - a),
					n.lineTo(e + d, i + a),
					n.moveTo(e + u, i - r),
					n.lineTo(e - u, i + r));
				break;
			case 'line':
				((r = s ? s / 2 : Math.cos(m) * p),
					(a = Math.sin(m) * p),
					n.moveTo(e - r, i - a),
					n.lineTo(e + r, i + a));
				break;
			case 'dash':
				(n.moveTo(e, i), n.lineTo(e + Math.cos(m) * (s ? s / 2 : p), i + Math.sin(m) * p));
				break;
			case !1:
				n.closePath();
				break;
		}
		(n.fill(), t.borderWidth > 0 && n.stroke());
	}
}
function zt(n, t, e) {
	return (
		(e = e || 0.5),
		!t || (n && n.x > t.left - e && n.x < t.right + e && n.y > t.top - e && n.y < t.bottom + e)
	);
}
function es(n, t) {
	(n.save(), n.beginPath(), n.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), n.clip());
}
function ns(n) {
	n.restore();
}
function Qm(n, t, e, i, s) {
	if (!t) return n.lineTo(e.x, e.y);
	if (s === 'middle') {
		const o = (t.x + e.x) / 2;
		(n.lineTo(o, t.y), n.lineTo(o, e.y));
	} else (s === 'after') != !!i ? n.lineTo(t.x, e.y) : n.lineTo(e.x, t.y);
	n.lineTo(e.x, e.y);
}
function Jm(n, t, e, i) {
	if (!t) return n.lineTo(e.x, e.y);
	n.bezierCurveTo(
		i ? t.cp1x : t.cp2x,
		i ? t.cp1y : t.cp2y,
		i ? e.cp2x : e.cp1x,
		i ? e.cp2y : e.cp1y,
		e.x,
		e.y
	);
}
function Zm(n, t) {
	(t.translation && n.translate(t.translation[0], t.translation[1]),
		L(t.rotation) || n.rotate(t.rotation),
		t.color && (n.fillStyle = t.color),
		t.textAlign && (n.textAlign = t.textAlign),
		t.textBaseline && (n.textBaseline = t.textBaseline));
}
function t_(n, t, e, i, s) {
	if (s.strikethrough || s.underline) {
		const o = n.measureText(i),
			r = t - o.actualBoundingBoxLeft,
			a = t + o.actualBoundingBoxRight,
			l = e - o.actualBoundingBoxAscent,
			c = e + o.actualBoundingBoxDescent,
			h = s.strikethrough ? (l + c) / 2 : c;
		((n.strokeStyle = n.fillStyle),
			n.beginPath(),
			(n.lineWidth = s.decorationWidth || 2),
			n.moveTo(r, h),
			n.lineTo(a, h),
			n.stroke());
	}
}
function e_(n, t) {
	const e = n.fillStyle;
	((n.fillStyle = t.color), n.fillRect(t.left, t.top, t.width, t.height), (n.fillStyle = e));
}
function Ie(n, t, e, i, s, o = {}) {
	const r = q(t) ? t : [t],
		a = o.strokeWidth > 0 && o.strokeColor !== '';
	let l, c;
	for (n.save(), n.font = s.string, Zm(n, o), l = 0; l < r.length; ++l)
		((c = r[l]),
			o.backdrop && e_(n, o.backdrop),
			a &&
				(o.strokeColor && (n.strokeStyle = o.strokeColor),
				L(o.strokeWidth) || (n.lineWidth = o.strokeWidth),
				n.strokeText(c, e, i, o.maxWidth)),
			n.fillText(c, e, i, o.maxWidth),
			t_(n, e, i, c, o),
			(i += Number(s.lineHeight)));
	n.restore();
}
function zn(n, t) {
	const { x: e, y: i, w: s, h: o, radius: r } = t;
	(n.arc(e + r.topLeft, i + r.topLeft, r.topLeft, 1.5 * Y, Y, !0),
		n.lineTo(e, i + o - r.bottomLeft),
		n.arc(e + r.bottomLeft, i + o - r.bottomLeft, r.bottomLeft, Y, Z, !0),
		n.lineTo(e + s - r.bottomRight, i + o),
		n.arc(e + s - r.bottomRight, i + o - r.bottomRight, r.bottomRight, Z, 0, !0),
		n.lineTo(e + s, i + r.topRight),
		n.arc(e + s - r.topRight, i + r.topRight, r.topRight, 0, -Z, !0),
		n.lineTo(e + r.topLeft, i));
}
const n_ = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
	i_ = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function s_(n, t) {
	const e = ('' + n).match(n_);
	if (!e || e[1] === 'normal') return t * 1.2;
	switch (((n = +e[2]), e[3])) {
		case 'px':
			return n;
		case '%':
			n /= 100;
			break;
	}
	return t * n;
}
const o_ = (n) => +n || 0;
function Yo(n, t) {
	const e = {},
		i = O(t),
		s = i ? Object.keys(t) : t,
		o = O(n) ? (i ? (r) => I(n[r], n[t[r]]) : (r) => n[r]) : () => n;
	for (const r of s) e[r] = o_(o(r));
	return e;
}
function fh(n) {
	return Yo(n, { top: 'y', right: 'x', bottom: 'y', left: 'x' });
}
function we(n) {
	return Yo(n, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
}
function ut(n) {
	const t = fh(n);
	return ((t.width = t.left + t.right), (t.height = t.top + t.bottom), t);
}
function nt(n, t) {
	((n = n || {}), (t = t || K.font));
	let e = I(n.size, t.size);
	typeof e == 'string' && (e = parseInt(e, 10));
	let i = I(n.style, t.style);
	i &&
		!('' + i).match(i_) &&
		(console.warn('Invalid font style specified: "' + i + '"'), (i = void 0));
	const s = {
		family: I(n.family, t.family),
		lineHeight: s_(I(n.lineHeight, t.lineHeight), e),
		size: e,
		style: i,
		weight: I(n.weight, t.weight),
		string: ''
	};
	return ((s.string = Km(s)), s);
}
function fn(n, t, e, i) {
	let s, o, r;
	for (s = 0, o = n.length; s < o; ++s) if (((r = n[s]), r !== void 0 && r !== void 0)) return r;
}
function r_(n, t, e) {
	const { min: i, max: s } = n,
		o = eh(t, (s - i) / 2),
		r = (a, l) => (e && a === 0 ? 0 : a + l);
	return { min: r(i, -Math.abs(o)), max: r(s, o) };
}
function re(n, t) {
	return Object.assign(Object.create(n), t);
}
function Go(n, t = [''], e, i, s = () => n[0]) {
	const o = e || n;
	typeof i > 'u' && (i = _h('_fallback', n));
	const r = {
		[Symbol.toStringTag]: 'Object',
		_cacheable: !0,
		_scopes: n,
		_rootScopes: o,
		_fallback: i,
		_getTarget: s,
		override: (a) => Go([a, ...n], t, o, i)
	};
	return new Proxy(r, {
		deleteProperty(a, l) {
			return (delete a[l], delete a._keys, delete n[0][l], !0);
		},
		get(a, l) {
			return ph(a, l, () => g_(l, t, n, a));
		},
		getOwnPropertyDescriptor(a, l) {
			return Reflect.getOwnPropertyDescriptor(a._scopes[0], l);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(n[0]);
		},
		has(a, l) {
			return da(a).includes(l);
		},
		ownKeys(a) {
			return da(a);
		},
		set(a, l, c) {
			const h = a._storage || (a._storage = s());
			return ((a[l] = h[l] = c), delete a._keys, !0);
		}
	});
}
function Ge(n, t, e, i) {
	const s = {
		_cacheable: !1,
		_proxy: n,
		_context: t,
		_subProxy: e,
		_stack: new Set(),
		_descriptors: gh(n, i),
		setContext: (o) => Ge(n, o, e, i),
		override: (o) => Ge(n.override(o), t, e, i)
	};
	return new Proxy(s, {
		deleteProperty(o, r) {
			return (delete o[r], delete n[r], !0);
		},
		get(o, r, a) {
			return ph(o, r, () => l_(o, r, a));
		},
		getOwnPropertyDescriptor(o, r) {
			return o._descriptors.allKeys
				? Reflect.has(n, r)
					? { enumerable: !0, configurable: !0 }
					: void 0
				: Reflect.getOwnPropertyDescriptor(n, r);
		},
		getPrototypeOf() {
			return Reflect.getPrototypeOf(n);
		},
		has(o, r) {
			return Reflect.has(n, r);
		},
		ownKeys() {
			return Reflect.ownKeys(n);
		},
		set(o, r, a) {
			return ((n[r] = a), delete o[r], !0);
		}
	});
}
function gh(n, t = { scriptable: !0, indexable: !0 }) {
	const { _scriptable: e = t.scriptable, _indexable: i = t.indexable, _allKeys: s = t.allKeys } = n;
	return {
		allKeys: s,
		scriptable: e,
		indexable: i,
		isScriptable: oe(e) ? e : () => e,
		isIndexable: oe(i) ? i : () => i
	};
}
const a_ = (n, t) => (n ? n + Vo(t) : t),
	qo = (n, t) =>
		O(t) && n !== 'adapters' && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function ph(n, t, e) {
	if (Object.prototype.hasOwnProperty.call(n, t) || t === 'constructor') return n[t];
	const i = e();
	return ((n[t] = i), i);
}
function l_(n, t, e) {
	const { _proxy: i, _context: s, _subProxy: o, _descriptors: r } = n;
	let a = i[t];
	return (
		oe(a) && r.isScriptable(t) && (a = c_(t, a, n, e)),
		q(a) && a.length && (a = h_(t, a, n, r.isIndexable)),
		qo(t, a) && (a = Ge(a, s, o && o[t], r)),
		a
	);
}
function c_(n, t, e, i) {
	const { _proxy: s, _context: o, _subProxy: r, _stack: a } = e;
	if (a.has(n)) throw new Error('Recursion detected: ' + Array.from(a).join('->') + '->' + n);
	a.add(n);
	let l = t(o, r || i);
	return (a.delete(n), qo(n, l) && (l = Ko(s._scopes, s, n, l)), l);
}
function h_(n, t, e, i) {
	const { _proxy: s, _context: o, _subProxy: r, _descriptors: a } = e;
	if (typeof o.index < 'u' && i(n)) return t[o.index % t.length];
	if (O(t[0])) {
		const l = t,
			c = s._scopes.filter((h) => h !== l);
		t = [];
		for (const h of l) {
			const d = Ko(c, s, n, h);
			t.push(Ge(d, o, r && r[n], a));
		}
	}
	return t;
}
function mh(n, t, e) {
	return oe(n) ? n(t, e) : n;
}
const d_ = (n, t) => (n === !0 ? t : typeof n == 'string' ? se(t, n) : void 0);
function u_(n, t, e, i, s) {
	for (const o of t) {
		const r = d_(e, o);
		if (r) {
			n.add(r);
			const a = mh(r._fallback, e, s);
			if (typeof a < 'u' && a !== e && a !== i) return a;
		} else if (r === !1 && typeof i < 'u' && e !== i) return null;
	}
	return !1;
}
function Ko(n, t, e, i) {
	const s = t._rootScopes,
		o = mh(t._fallback, e, i),
		r = [...n, ...s],
		a = new Set();
	a.add(i);
	let l = ha(a, r, e, o || e, i);
	return l === null || (typeof o < 'u' && o !== e && ((l = ha(a, r, o, l, i)), l === null))
		? !1
		: Go(Array.from(a), [''], s, o, () => f_(t, e, i));
}
function ha(n, t, e, i, s) {
	for (; e; ) e = u_(n, t, e, i, s);
	return e;
}
function f_(n, t, e) {
	const i = n._getTarget();
	t in i || (i[t] = {});
	const s = i[t];
	return q(s) && O(e) ? e : s || {};
}
function g_(n, t, e, i) {
	let s;
	for (const o of t)
		if (((s = _h(a_(o, n), e)), typeof s < 'u')) return qo(n, s) ? Ko(e, i, n, s) : s;
}
function _h(n, t) {
	for (const e of t) {
		if (!e) continue;
		const i = e[n];
		if (typeof i < 'u') return i;
	}
}
function da(n) {
	let t = n._keys;
	return (t || (t = n._keys = p_(n._scopes)), t);
}
function p_(n) {
	const t = new Set();
	for (const e of n) for (const i of Object.keys(e).filter((s) => !s.startsWith('_'))) t.add(i);
	return Array.from(t);
}
function bh(n, t, e, i) {
	const { iScale: s } = n,
		{ key: o = 'r' } = this._parsing,
		r = new Array(i);
	let a, l, c, h;
	for (a = 0, l = i; a < l; ++a) ((c = a + e), (h = t[c]), (r[a] = { r: s.parse(se(h, o), c) }));
	return r;
}
const m_ = Number.EPSILON || 1e-14,
	qe = (n, t) => t < n.length && !n[t].skip && n[t],
	yh = (n) => (n === 'x' ? 'y' : 'x');
function __(n, t, e, i) {
	const s = n.skip ? t : n,
		o = t,
		r = e.skip ? t : e,
		a = Ks(o, s),
		l = Ks(r, o);
	let c = a / (a + l),
		h = l / (a + l);
	((c = isNaN(c) ? 0 : c), (h = isNaN(h) ? 0 : h));
	const d = i * c,
		u = i * h;
	return {
		previous: { x: o.x - d * (r.x - s.x), y: o.y - d * (r.y - s.y) },
		next: { x: o.x + u * (r.x - s.x), y: o.y + u * (r.y - s.y) }
	};
}
function b_(n, t, e) {
	const i = n.length;
	let s,
		o,
		r,
		a,
		l,
		c = qe(n, 0);
	for (let h = 0; h < i - 1; ++h)
		if (((l = c), (c = qe(n, h + 1)), !(!l || !c))) {
			if (wn(t[h], 0, m_)) {
				e[h] = e[h + 1] = 0;
				continue;
			}
			((s = e[h] / t[h]),
				(o = e[h + 1] / t[h]),
				(a = Math.pow(s, 2) + Math.pow(o, 2)),
				!(a <= 9) && ((r = 3 / Math.sqrt(a)), (e[h] = s * r * t[h]), (e[h + 1] = o * r * t[h])));
		}
}
function y_(n, t, e = 'x') {
	const i = yh(e),
		s = n.length;
	let o,
		r,
		a,
		l = qe(n, 0);
	for (let c = 0; c < s; ++c) {
		if (((r = a), (a = l), (l = qe(n, c + 1)), !a)) continue;
		const h = a[e],
			d = a[i];
		(r && ((o = (h - r[e]) / 3), (a[`cp1${e}`] = h - o), (a[`cp1${i}`] = d - o * t[c])),
			l && ((o = (l[e] - h) / 3), (a[`cp2${e}`] = h + o), (a[`cp2${i}`] = d + o * t[c])));
	}
}
function x_(n, t = 'x') {
	const e = yh(t),
		i = n.length,
		s = Array(i).fill(0),
		o = Array(i);
	let r,
		a,
		l,
		c = qe(n, 0);
	for (r = 0; r < i; ++r)
		if (((a = l), (l = c), (c = qe(n, r + 1)), !!l)) {
			if (c) {
				const h = c[t] - l[t];
				s[r] = h !== 0 ? (c[e] - l[e]) / h : 0;
			}
			o[r] = a ? (c ? (Dt(s[r - 1]) !== Dt(s[r]) ? 0 : (s[r - 1] + s[r]) / 2) : s[r - 1]) : s[r];
		}
	(b_(n, s, o), y_(n, o, t));
}
function oi(n, t, e) {
	return Math.max(Math.min(n, e), t);
}
function v_(n, t) {
	let e,
		i,
		s,
		o,
		r,
		a = zt(n[0], t);
	for (e = 0, i = n.length; e < i; ++e)
		((r = o),
			(o = a),
			(a = e < i - 1 && zt(n[e + 1], t)),
			o &&
				((s = n[e]),
				r && ((s.cp1x = oi(s.cp1x, t.left, t.right)), (s.cp1y = oi(s.cp1y, t.top, t.bottom))),
				a && ((s.cp2x = oi(s.cp2x, t.left, t.right)), (s.cp2y = oi(s.cp2y, t.top, t.bottom)))));
}
function w_(n, t, e, i, s) {
	let o, r, a, l;
	if ((t.spanGaps && (n = n.filter((c) => !c.skip)), t.cubicInterpolationMode === 'monotone'))
		x_(n, s);
	else {
		let c = i ? n[n.length - 1] : n[0];
		for (o = 0, r = n.length; o < r; ++o)
			((a = n[o]),
				(l = __(c, a, n[Math.min(o + 1, r - (i ? 0 : 1)) % r], t.tension)),
				(a.cp1x = l.previous.x),
				(a.cp1y = l.previous.y),
				(a.cp2x = l.next.x),
				(a.cp2y = l.next.y),
				(c = a));
	}
	t.capBezierPoints && v_(n, e);
}
function Xo() {
	return typeof window < 'u' && typeof document < 'u';
}
function Qo(n) {
	let t = n.parentNode;
	return (t && t.toString() === '[object ShadowRoot]' && (t = t.host), t);
}
function Wi(n, t, e) {
	let i;
	return (
		typeof n == 'string'
			? ((i = parseInt(n, 10)), n.indexOf('%') !== -1 && (i = (i / 100) * t.parentNode[e]))
			: (i = n),
		i
	);
}
const is = (n) => n.ownerDocument.defaultView.getComputedStyle(n, null);
function C_(n, t) {
	return is(n).getPropertyValue(t);
}
const S_ = ['top', 'right', 'bottom', 'left'];
function Ce(n, t, e) {
	const i = {};
	e = e ? '-' + e : '';
	for (let s = 0; s < 4; s++) {
		const o = S_[s];
		i[o] = parseFloat(n[t + '-' + o + e]) || 0;
	}
	return ((i.width = i.left + i.right), (i.height = i.top + i.bottom), i);
}
const E_ = (n, t, e) => (n > 0 || t > 0) && (!e || !e.shadowRoot);
function k_(n, t) {
	const e = n.touches,
		i = e && e.length ? e[0] : n,
		{ offsetX: s, offsetY: o } = i;
	let r = !1,
		a,
		l;
	if (E_(s, o, n.target)) ((a = s), (l = o));
	else {
		const c = t.getBoundingClientRect();
		((a = i.clientX - c.left), (l = i.clientY - c.top), (r = !0));
	}
	return { x: a, y: l, box: r };
}
function me(n, t) {
	if ('native' in n) return n;
	const { canvas: e, currentDevicePixelRatio: i } = t,
		s = is(e),
		o = s.boxSizing === 'border-box',
		r = Ce(s, 'padding'),
		a = Ce(s, 'border', 'width'),
		{ x: l, y: c, box: h } = k_(n, e),
		d = r.left + (h && a.left),
		u = r.top + (h && a.top);
	let { width: f, height: g } = t;
	return (
		o && ((f -= r.width + a.width), (g -= r.height + a.height)),
		{ x: Math.round((((l - d) / f) * e.width) / i), y: Math.round((((c - u) / g) * e.height) / i) }
	);
}
function T_(n, t, e) {
	let i, s;
	if (t === void 0 || e === void 0) {
		const o = n && Qo(n);
		if (!o) ((t = n.clientWidth), (e = n.clientHeight));
		else {
			const r = o.getBoundingClientRect(),
				a = is(o),
				l = Ce(a, 'border', 'width'),
				c = Ce(a, 'padding');
			((t = r.width - c.width - l.width),
				(e = r.height - c.height - l.height),
				(i = Wi(a.maxWidth, o, 'clientWidth')),
				(s = Wi(a.maxHeight, o, 'clientHeight')));
		}
	}
	return { width: t, height: e, maxWidth: i || Fi, maxHeight: s || Fi };
}
const ri = (n) => Math.round(n * 10) / 10;
function I_(n, t, e, i) {
	const s = is(n),
		o = Ce(s, 'margin'),
		r = Wi(s.maxWidth, n, 'clientWidth') || Fi,
		a = Wi(s.maxHeight, n, 'clientHeight') || Fi,
		l = T_(n, t, e);
	let { width: c, height: h } = l;
	if (s.boxSizing === 'content-box') {
		const u = Ce(s, 'border', 'width'),
			f = Ce(s, 'padding');
		((c -= f.width + u.width), (h -= f.height + u.height));
	}
	return (
		(c = Math.max(0, c - o.width)),
		(h = Math.max(0, i ? c / i : h - o.height)),
		(c = ri(Math.min(c, r, l.maxWidth))),
		(h = ri(Math.min(h, a, l.maxHeight))),
		c && !h && (h = ri(c / 2)),
		(t !== void 0 || e !== void 0) &&
			i &&
			l.height &&
			h > l.height &&
			((h = l.height), (c = ri(Math.floor(h * i)))),
		{ width: c, height: h }
	);
}
function ua(n, t, e) {
	const i = t || 1,
		s = Math.floor(n.height * i),
		o = Math.floor(n.width * i);
	((n.height = Math.floor(n.height)), (n.width = Math.floor(n.width)));
	const r = n.canvas;
	return (
		r.style &&
			(e || (!r.style.height && !r.style.width)) &&
			((r.style.height = `${n.height}px`), (r.style.width = `${n.width}px`)),
		n.currentDevicePixelRatio !== i || r.height !== s || r.width !== o
			? ((n.currentDevicePixelRatio = i),
				(r.height = s),
				(r.width = o),
				n.ctx.setTransform(i, 0, 0, i, 0, 0),
				!0)
			: !1
	);
}
const M_ = (function () {
	let n = !1;
	try {
		const t = {
			get passive() {
				return ((n = !0), !1);
			}
		};
		Xo() && (window.addEventListener('test', null, t), window.removeEventListener('test', null, t));
	} catch {}
	return n;
})();
function fa(n, t) {
	const e = C_(n, t),
		i = e && e.match(/^(\d+)(\.\d+)?px$/);
	return i ? +i[1] : void 0;
}
function _e(n, t, e, i) {
	return { x: n.x + e * (t.x - n.x), y: n.y + e * (t.y - n.y) };
}
function P_(n, t, e, i) {
	return {
		x: n.x + e * (t.x - n.x),
		y:
			i === 'middle'
				? e < 0.5
					? n.y
					: t.y
				: i === 'after'
					? e < 1
						? n.y
						: t.y
					: e > 0
						? t.y
						: n.y
	};
}
function D_(n, t, e, i) {
	const s = { x: n.cp2x, y: n.cp2y },
		o = { x: t.cp1x, y: t.cp1y },
		r = _e(n, s, e),
		a = _e(s, o, e),
		l = _e(o, t, e),
		c = _e(r, a, e),
		h = _e(a, l, e);
	return _e(c, h, e);
}
const A_ = function (n, t) {
		return {
			x(e) {
				return n + n + t - e;
			},
			setWidth(e) {
				t = e;
			},
			textAlign(e) {
				return e === 'center' ? e : e === 'right' ? 'left' : 'right';
			},
			xPlus(e, i) {
				return e - i;
			},
			leftForLtr(e, i) {
				return e - i;
			}
		};
	},
	R_ = function () {
		return {
			x(n) {
				return n;
			},
			setWidth(n) {},
			textAlign(n) {
				return n;
			},
			xPlus(n, t) {
				return n + t;
			},
			leftForLtr(n, t) {
				return n;
			}
		};
	};
function Ve(n, t, e) {
	return n ? A_(t, e) : R_();
}
function xh(n, t) {
	let e, i;
	(t === 'ltr' || t === 'rtl') &&
		((e = n.canvas.style),
		(i = [e.getPropertyValue('direction'), e.getPropertyPriority('direction')]),
		e.setProperty('direction', t, 'important'),
		(n.prevTextDirection = i));
}
function vh(n, t) {
	t !== void 0 && (delete n.prevTextDirection, n.canvas.style.setProperty('direction', t[0], t[1]));
}
function wh(n) {
	return n === 'angle'
		? { between: Wn, compare: Om, normalize: vt }
		: { between: Bt, compare: (t, e) => t - e, normalize: (t) => t };
}
function ga({ start: n, end: t, count: e, loop: i, style: s }) {
	return { start: n % e, end: t % e, loop: i && (t - n + 1) % e === 0, style: s };
}
function O_(n, t, e) {
	const { property: i, start: s, end: o } = e,
		{ between: r, normalize: a } = wh(i),
		l = t.length;
	let { start: c, end: h, loop: d } = n,
		u,
		f;
	if (d) {
		for (c += l, h += l, u = 0, f = l; u < f && r(a(t[c % l][i]), s, o); ++u) (c--, h--);
		((c %= l), (h %= l));
	}
	return (h < c && (h += l), { start: c, end: h, loop: d, style: n.style });
}
function Ch(n, t, e) {
	if (!e) return [n];
	const { property: i, start: s, end: o } = e,
		r = t.length,
		{ compare: a, between: l, normalize: c } = wh(i),
		{ start: h, end: d, loop: u, style: f } = O_(n, t, e),
		g = [];
	let p = !1,
		m = null,
		_,
		b,
		x;
	const v = () => l(s, x, _) && a(s, x) !== 0,
		y = () => a(o, _) === 0 || l(o, x, _),
		C = () => p || v(),
		S = () => !p || y();
	for (let E = h, k = h; E <= d; ++E)
		((b = t[E % r]),
			!b.skip &&
				((_ = c(b[i])),
				_ !== x &&
					((p = l(_, s, o)),
					m === null && C() && (m = a(_, s) === 0 ? E : k),
					m !== null &&
						S() &&
						(g.push(ga({ start: m, end: E, loop: u, count: r, style: f })), (m = null)),
					(k = E),
					(x = _))));
	return (m !== null && g.push(ga({ start: m, end: d, loop: u, count: r, style: f })), g);
}
function Sh(n, t) {
	const e = [],
		i = n.segments;
	for (let s = 0; s < i.length; s++) {
		const o = Ch(i[s], n.points, t);
		o.length && e.push(...o);
	}
	return e;
}
function N_(n, t, e, i) {
	let s = 0,
		o = t - 1;
	if (e && !i) for (; s < t && !n[s].skip; ) s++;
	for (; s < t && n[s].skip; ) s++;
	for (s %= t, e && (o += s); o > s && n[o % t].skip; ) o--;
	return ((o %= t), { start: s, end: o });
}
function L_(n, t, e, i) {
	const s = n.length,
		o = [];
	let r = t,
		a = n[t],
		l;
	for (l = t + 1; l <= e; ++l) {
		const c = n[l % s];
		(c.skip || c.stop
			? a.skip ||
				((i = !1), o.push({ start: t % s, end: (l - 1) % s, loop: i }), (t = r = c.stop ? l : null))
			: ((r = l), a.skip && (t = l)),
			(a = c));
	}
	return (r !== null && o.push({ start: t % s, end: r % s, loop: i }), o);
}
function F_(n, t) {
	const e = n.points,
		i = n.options.spanGaps,
		s = e.length;
	if (!s) return [];
	const o = !!n._loop,
		{ start: r, end: a } = N_(e, s, o, i);
	if (i === !0) return pa(n, [{ start: r, end: a, loop: o }], e, t);
	const l = a < r ? a + s : a,
		c = !!n._fullLoop && r === 0 && a === s - 1;
	return pa(n, L_(e, r, l, c), e, t);
}
function pa(n, t, e, i) {
	return !i || !i.setContext || !e ? t : B_(n, t, e, i);
}
function B_(n, t, e, i) {
	const s = n._chart.getContext(),
		o = ma(n.options),
		{
			_datasetIndex: r,
			options: { spanGaps: a }
		} = n,
		l = e.length,
		c = [];
	let h = o,
		d = t[0].start,
		u = d;
	function f(g, p, m, _) {
		const b = a ? -1 : 1;
		if (g !== p) {
			for (g += l; e[g % l].skip; ) g -= b;
			for (; e[p % l].skip; ) p += b;
			g % l !== p % l &&
				(c.push({ start: g % l, end: p % l, loop: m, style: _ }), (h = _), (d = p % l));
		}
	}
	for (const g of t) {
		d = a ? d : g.start;
		let p = e[d % l],
			m;
		for (u = d + 1; u <= g.end; u++) {
			const _ = e[u % l];
			((m = ma(
				i.setContext(
					re(s, {
						type: 'segment',
						p0: p,
						p1: _,
						p0DataIndex: (u - 1) % l,
						p1DataIndex: u % l,
						datasetIndex: r
					})
				)
			)),
				W_(m, h) && f(d, u - 1, g.loop, h),
				(p = _),
				(h = m));
		}
		d < u - 1 && f(d, u - 1, g.loop, h);
	}
	return c;
}
function ma(n) {
	return {
		backgroundColor: n.backgroundColor,
		borderCapStyle: n.borderCapStyle,
		borderDash: n.borderDash,
		borderDashOffset: n.borderDashOffset,
		borderJoinStyle: n.borderJoinStyle,
		borderWidth: n.borderWidth,
		borderColor: n.borderColor
	};
}
function W_(n, t) {
	if (!t) return !1;
	const e = [],
		i = function (s, o) {
			return $o(o) ? (e.includes(o) || e.push(o), e.indexOf(o)) : o;
		};
	return JSON.stringify(n, i) !== JSON.stringify(t, i);
}
class z_ {
	constructor() {
		((this._request = null),
			(this._charts = new Map()),
			(this._running = !1),
			(this._lastDate = void 0));
	}
	_notify(t, e, i, s) {
		const o = e.listeners[s],
			r = e.duration;
		o.forEach((a) =>
			a({ chart: t, initial: e.initial, numSteps: r, currentStep: Math.min(i - e.start, r) })
		);
	}
	_refresh() {
		this._request ||
			((this._running = !0),
			(this._request = ah.call(window, () => {
				(this._update(), (this._request = null), this._running && this._refresh());
			})));
	}
	_update(t = Date.now()) {
		let e = 0;
		(this._charts.forEach((i, s) => {
			if (!i.running || !i.items.length) return;
			const o = i.items;
			let r = o.length - 1,
				a = !1,
				l;
			for (; r >= 0; --r)
				((l = o[r]),
					l._active
						? (l._total > i.duration && (i.duration = l._total), l.tick(t), (a = !0))
						: ((o[r] = o[o.length - 1]), o.pop()));
			(a && (s.draw(), this._notify(s, i, t, 'progress')),
				o.length || ((i.running = !1), this._notify(s, i, t, 'complete'), (i.initial = !1)),
				(e += o.length));
		}),
			(this._lastDate = t),
			e === 0 && (this._running = !1));
	}
	_getAnims(t) {
		const e = this._charts;
		let i = e.get(t);
		return (
			i ||
				((i = { running: !1, initial: !0, items: [], listeners: { complete: [], progress: [] } }),
				e.set(t, i)),
			i
		);
	}
	listen(t, e, i) {
		this._getAnims(t).listeners[e].push(i);
	}
	add(t, e) {
		!e || !e.length || this._getAnims(t).items.push(...e);
	}
	has(t) {
		return this._getAnims(t).items.length > 0;
	}
	start(t) {
		const e = this._charts.get(t);
		e &&
			((e.running = !0),
			(e.start = Date.now()),
			(e.duration = e.items.reduce((i, s) => Math.max(i, s._duration), 0)),
			this._refresh());
	}
	running(t) {
		if (!this._running) return !1;
		const e = this._charts.get(t);
		return !(!e || !e.running || !e.items.length);
	}
	stop(t) {
		const e = this._charts.get(t);
		if (!e || !e.items.length) return;
		const i = e.items;
		let s = i.length - 1;
		for (; s >= 0; --s) i[s].cancel();
		((e.items = []), this._notify(t, e, Date.now(), 'complete'));
	}
	remove(t) {
		return this._charts.delete(t);
	}
}
var Ot = new z_();
const _a = 'transparent',
	V_ = {
		boolean(n, t, e) {
			return e > 0.5 ? t : n;
		},
		color(n, t, e) {
			const i = aa(n || _a),
				s = i.valid && aa(t || _a);
			return s && s.valid ? s.mix(i, e).hexString() : t;
		},
		number(n, t, e) {
			return n + (t - n) * e;
		}
	};
class H_ {
	constructor(t, e, i, s) {
		const o = e[i];
		s = fn([t.to, s, o, t.from]);
		const r = fn([t.from, o, s]);
		((this._active = !0),
			(this._fn = t.fn || V_[t.type || typeof r]),
			(this._easing = Cn[t.easing] || Cn.linear),
			(this._start = Math.floor(Date.now() + (t.delay || 0))),
			(this._duration = this._total = Math.floor(t.duration)),
			(this._loop = !!t.loop),
			(this._target = e),
			(this._prop = i),
			(this._from = r),
			(this._to = s),
			(this._promises = void 0));
	}
	active() {
		return this._active;
	}
	update(t, e, i) {
		if (this._active) {
			this._notify(!1);
			const s = this._target[this._prop],
				o = i - this._start,
				r = this._duration - o;
			((this._start = i),
				(this._duration = Math.floor(Math.max(r, t.duration))),
				(this._total += o),
				(this._loop = !!t.loop),
				(this._to = fn([t.to, e, s, t.from])),
				(this._from = fn([t.from, s, e])));
		}
	}
	cancel() {
		this._active && (this.tick(Date.now()), (this._active = !1), this._notify(!1));
	}
	tick(t) {
		const e = t - this._start,
			i = this._duration,
			s = this._prop,
			o = this._from,
			r = this._loop,
			a = this._to;
		let l;
		if (((this._active = o !== a && (r || e < i)), !this._active)) {
			((this._target[s] = a), this._notify(!0));
			return;
		}
		if (e < 0) {
			this._target[s] = o;
			return;
		}
		((l = (e / i) % 2),
			(l = r && l > 1 ? 2 - l : l),
			(l = this._easing(Math.min(1, Math.max(0, l)))),
			(this._target[s] = this._fn(o, a, l)));
	}
	wait() {
		const t = this._promises || (this._promises = []);
		return new Promise((e, i) => {
			t.push({ res: e, rej: i });
		});
	}
	_notify(t) {
		const e = t ? 'res' : 'rej',
			i = this._promises || [];
		for (let s = 0; s < i.length; s++) i[s][e]();
	}
}
class Eh {
	constructor(t, e) {
		((this._chart = t), (this._properties = new Map()), this.configure(e));
	}
	configure(t) {
		if (!O(t)) return;
		const e = Object.keys(K.animation),
			i = this._properties;
		Object.getOwnPropertyNames(t).forEach((s) => {
			const o = t[s];
			if (!O(o)) return;
			const r = {};
			for (const a of e) r[a] = o[a];
			((q(o.properties) && o.properties) || [s]).forEach((a) => {
				(a === s || !i.has(a)) && i.set(a, r);
			});
		});
	}
	_animateOptions(t, e) {
		const i = e.options,
			s = U_(t, i);
		if (!s) return [];
		const o = this._createAnimations(s, i);
		return (
			i.$shared &&
				j_(t.options.$animations, i).then(
					() => {
						t.options = i;
					},
					() => {}
				),
			o
		);
	}
	_createAnimations(t, e) {
		const i = this._properties,
			s = [],
			o = t.$animations || (t.$animations = {}),
			r = Object.keys(e),
			a = Date.now();
		let l;
		for (l = r.length - 1; l >= 0; --l) {
			const c = r[l];
			if (c.charAt(0) === '$') continue;
			if (c === 'options') {
				s.push(...this._animateOptions(t, e));
				continue;
			}
			const h = e[c];
			let d = o[c];
			const u = i.get(c);
			if (d)
				if (u && d.active()) {
					d.update(u, h, a);
					continue;
				} else d.cancel();
			if (!u || !u.duration) {
				t[c] = h;
				continue;
			}
			((o[c] = d = new H_(u, t, c, h)), s.push(d));
		}
		return s;
	}
	update(t, e) {
		if (this._properties.size === 0) {
			Object.assign(t, e);
			return;
		}
		const i = this._createAnimations(t, e);
		if (i.length) return (Ot.add(this._chart, i), !0);
	}
}
function j_(n, t) {
	const e = [],
		i = Object.keys(t);
	for (let s = 0; s < i.length; s++) {
		const o = n[i[s]];
		o && o.active() && e.push(o.wait());
	}
	return Promise.all(e);
}
function U_(n, t) {
	if (!t) return;
	let e = n.options;
	if (!e) {
		n.options = t;
		return;
	}
	return (e.$shared && (n.options = e = Object.assign({}, e, { $shared: !1, $animations: {} })), e);
}
function ba(n, t) {
	const e = (n && n.options) || {},
		i = e.reverse,
		s = e.min === void 0 ? t : 0,
		o = e.max === void 0 ? t : 0;
	return { start: i ? o : s, end: i ? s : o };
}
function $_(n, t, e) {
	if (e === !1) return !1;
	const i = ba(n, e),
		s = ba(t, e);
	return { top: s.end, right: i.end, bottom: s.start, left: i.start };
}
function Y_(n) {
	let t, e, i, s;
	return (
		O(n) ? ((t = n.top), (e = n.right), (i = n.bottom), (s = n.left)) : (t = e = i = s = n),
		{ top: t, right: e, bottom: i, left: s, disabled: n === !1 }
	);
}
function kh(n, t) {
	const e = [],
		i = n._getSortedDatasetMetas(t);
	let s, o;
	for (s = 0, o = i.length; s < o; ++s) e.push(i[s].index);
	return e;
}
function ya(n, t, e, i = {}) {
	const s = n.keys,
		o = i.mode === 'single';
	let r, a, l, c;
	if (t === null) return;
	let h = !1;
	for (r = 0, a = s.length; r < a; ++r) {
		if (((l = +s[r]), l === e)) {
			if (((h = !0), i.all)) continue;
			break;
		}
		((c = n.values[l]), Q(c) && (o || t === 0 || Dt(t) === Dt(c)) && (t += c));
	}
	return !h && !i.all ? 0 : t;
}
function G_(n, t) {
	const { iScale: e, vScale: i } = t,
		s = e.axis === 'x' ? 'x' : 'y',
		o = i.axis === 'x' ? 'x' : 'y',
		r = Object.keys(n),
		a = new Array(r.length);
	let l, c, h;
	for (l = 0, c = r.length; l < c; ++l) ((h = r[l]), (a[l] = { [s]: h, [o]: n[h] }));
	return a;
}
function vs(n, t) {
	const e = n && n.options.stacked;
	return e || (e === void 0 && t.stack !== void 0);
}
function q_(n, t, e) {
	return `${n.id}.${t.id}.${e.stack || e.type}`;
}
function K_(n) {
	const { min: t, max: e, minDefined: i, maxDefined: s } = n.getUserBounds();
	return { min: i ? t : Number.NEGATIVE_INFINITY, max: s ? e : Number.POSITIVE_INFINITY };
}
function X_(n, t, e) {
	const i = n[t] || (n[t] = {});
	return i[e] || (i[e] = {});
}
function xa(n, t, e, i) {
	for (const s of t.getMatchingVisibleMetas(i).reverse()) {
		const o = n[s.index];
		if ((e && o > 0) || (!e && o < 0)) return s.index;
	}
	return null;
}
function va(n, t) {
	const { chart: e, _cachedMeta: i } = n,
		s = e._stacks || (e._stacks = {}),
		{ iScale: o, vScale: r, index: a } = i,
		l = o.axis,
		c = r.axis,
		h = q_(o, r, i),
		d = t.length;
	let u;
	for (let f = 0; f < d; ++f) {
		const g = t[f],
			{ [l]: p, [c]: m } = g,
			_ = g._stacks || (g._stacks = {});
		((u = _[c] = X_(s, h, p)),
			(u[a] = m),
			(u._top = xa(u, r, !0, i.type)),
			(u._bottom = xa(u, r, !1, i.type)));
		const b = u._visualValues || (u._visualValues = {});
		b[a] = m;
	}
}
function ws(n, t) {
	const e = n.scales;
	return Object.keys(e)
		.filter((i) => e[i].axis === t)
		.shift();
}
function Q_(n, t) {
	return re(n, {
		active: !1,
		dataset: void 0,
		datasetIndex: t,
		index: t,
		mode: 'default',
		type: 'dataset'
	});
}
function J_(n, t, e) {
	return re(n, {
		active: !1,
		dataIndex: t,
		parsed: void 0,
		raw: void 0,
		element: e,
		index: t,
		mode: 'default',
		type: 'data'
	});
}
function an(n, t) {
	const e = n.controller.index,
		i = n.vScale && n.vScale.axis;
	if (i) {
		t = t || n._parsed;
		for (const s of t) {
			const o = s._stacks;
			if (!o || o[i] === void 0 || o[i][e] === void 0) return;
			(delete o[i][e],
				o[i]._visualValues !== void 0 &&
					o[i]._visualValues[e] !== void 0 &&
					delete o[i]._visualValues[e]);
		}
	}
}
const Cs = (n) => n === 'reset' || n === 'none',
	wa = (n, t) => (t ? n : Object.assign({}, n)),
	Z_ = (n, t, e) => n && !t.hidden && t._stacked && { keys: kh(e, !0), values: null };
class ae {
	static defaults = {};
	static datasetElementType = null;
	static dataElementType = null;
	constructor(t, e) {
		((this.chart = t),
			(this._ctx = t.ctx),
			(this.index = e),
			(this._cachedDataOpts = {}),
			(this._cachedMeta = this.getMeta()),
			(this._type = this._cachedMeta.type),
			(this.options = void 0),
			(this._parsing = !1),
			(this._data = void 0),
			(this._objectData = void 0),
			(this._sharedOptions = void 0),
			(this._drawStart = void 0),
			(this._drawCount = void 0),
			(this.enableOptionSharing = !1),
			(this.supportsDecimation = !1),
			(this.$context = void 0),
			(this._syncList = []),
			(this.datasetElementType = new.target.datasetElementType),
			(this.dataElementType = new.target.dataElementType),
			this.initialize());
	}
	initialize() {
		const t = this._cachedMeta;
		(this.configure(),
			this.linkScales(),
			(t._stacked = vs(t.vScale, t)),
			this.addElements(),
			this.options.fill &&
				!this.chart.isPluginEnabled('filler') &&
				console.warn(
					"Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options"
				));
	}
	updateIndex(t) {
		(this.index !== t && an(this._cachedMeta), (this.index = t));
	}
	linkScales() {
		const t = this.chart,
			e = this._cachedMeta,
			i = this.getDataset(),
			s = (d, u, f, g) => (d === 'x' ? u : d === 'r' ? g : f),
			o = (e.xAxisID = I(i.xAxisID, ws(t, 'x'))),
			r = (e.yAxisID = I(i.yAxisID, ws(t, 'y'))),
			a = (e.rAxisID = I(i.rAxisID, ws(t, 'r'))),
			l = e.indexAxis,
			c = (e.iAxisID = s(l, o, r, a)),
			h = (e.vAxisID = s(l, r, o, a));
		((e.xScale = this.getScaleForId(o)),
			(e.yScale = this.getScaleForId(r)),
			(e.rScale = this.getScaleForId(a)),
			(e.iScale = this.getScaleForId(c)),
			(e.vScale = this.getScaleForId(h)));
	}
	getDataset() {
		return this.chart.data.datasets[this.index];
	}
	getMeta() {
		return this.chart.getDatasetMeta(this.index);
	}
	getScaleForId(t) {
		return this.chart.scales[t];
	}
	_getOtherScale(t) {
		const e = this._cachedMeta;
		return t === e.iScale ? e.vScale : e.iScale;
	}
	reset() {
		this._update('reset');
	}
	_destroy() {
		const t = this._cachedMeta;
		(this._data && sa(this._data, this), t._stacked && an(t));
	}
	_dataCheck() {
		const t = this.getDataset(),
			e = t.data || (t.data = []),
			i = this._data;
		if (O(e)) {
			const s = this._cachedMeta;
			this._data = G_(e, s);
		} else if (i !== e) {
			if (i) {
				sa(i, this);
				const s = this._cachedMeta;
				(an(s), (s._parsed = []));
			}
			(e && Object.isExtensible(e) && Bm(e, this), (this._syncList = []), (this._data = e));
		}
	}
	addElements() {
		const t = this._cachedMeta;
		(this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType()));
	}
	buildOrUpdateElements(t) {
		const e = this._cachedMeta,
			i = this.getDataset();
		let s = !1;
		this._dataCheck();
		const o = e._stacked;
		((e._stacked = vs(e.vScale, e)),
			e.stack !== i.stack && ((s = !0), an(e), (e.stack = i.stack)),
			this._resyncElements(t),
			(s || o !== e._stacked) && (va(this, e._parsed), (e._stacked = vs(e.vScale, e))));
	}
	configure() {
		const t = this.chart.config,
			e = t.datasetScopeKeys(this._type),
			i = t.getOptionScopes(this.getDataset(), e, !0);
		((this.options = t.createResolver(i, this.getContext())),
			(this._parsing = this.options.parsing),
			(this._cachedDataOpts = {}));
	}
	parse(t, e) {
		const { _cachedMeta: i, _data: s } = this,
			{ iScale: o, _stacked: r } = i,
			a = o.axis;
		let l = t === 0 && e === s.length ? !0 : i._sorted,
			c = t > 0 && i._parsed[t - 1],
			h,
			d,
			u;
		if (this._parsing === !1) ((i._parsed = s), (i._sorted = !0), (u = s));
		else {
			q(s[t])
				? (u = this.parseArrayData(i, s, t, e))
				: O(s[t])
					? (u = this.parseObjectData(i, s, t, e))
					: (u = this.parsePrimitiveData(i, s, t, e));
			const f = () => d[a] === null || (c && d[a] < c[a]);
			for (h = 0; h < e; ++h) ((i._parsed[h + t] = d = u[h]), l && (f() && (l = !1), (c = d)));
			i._sorted = l;
		}
		r && va(this, u);
	}
	parsePrimitiveData(t, e, i, s) {
		const { iScale: o, vScale: r } = t,
			a = o.axis,
			l = r.axis,
			c = o.getLabels(),
			h = o === r,
			d = new Array(s);
		let u, f, g;
		for (u = 0, f = s; u < f; ++u)
			((g = u + i), (d[u] = { [a]: h || o.parse(c[g], g), [l]: r.parse(e[g], g) }));
		return d;
	}
	parseArrayData(t, e, i, s) {
		const { xScale: o, yScale: r } = t,
			a = new Array(s);
		let l, c, h, d;
		for (l = 0, c = s; l < c; ++l)
			((h = l + i), (d = e[h]), (a[l] = { x: o.parse(d[0], h), y: r.parse(d[1], h) }));
		return a;
	}
	parseObjectData(t, e, i, s) {
		const { xScale: o, yScale: r } = t,
			{ xAxisKey: a = 'x', yAxisKey: l = 'y' } = this._parsing,
			c = new Array(s);
		let h, d, u, f;
		for (h = 0, d = s; h < d; ++h)
			((u = h + i), (f = e[u]), (c[h] = { x: o.parse(se(f, a), u), y: r.parse(se(f, l), u) }));
		return c;
	}
	getParsed(t) {
		return this._cachedMeta._parsed[t];
	}
	getDataElement(t) {
		return this._cachedMeta.data[t];
	}
	applyStack(t, e, i) {
		const s = this.chart,
			o = this._cachedMeta,
			r = e[t.axis],
			a = { keys: kh(s, !0), values: e._stacks[t.axis]._visualValues };
		return ya(a, r, o.index, { mode: i });
	}
	updateRangeFromParsed(t, e, i, s) {
		const o = i[e.axis];
		let r = o === null ? NaN : o;
		const a = s && i._stacks[e.axis];
		(s && a && ((s.values = a), (r = ya(s, o, this._cachedMeta.index))),
			(t.min = Math.min(t.min, r)),
			(t.max = Math.max(t.max, r)));
	}
	getMinMax(t, e) {
		const i = this._cachedMeta,
			s = i._parsed,
			o = i._sorted && t === i.iScale,
			r = s.length,
			a = this._getOtherScale(t),
			l = Z_(e, i, this.chart),
			c = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
			{ min: h, max: d } = K_(a);
		let u, f;
		function g() {
			f = s[u];
			const p = f[a.axis];
			return !Q(f[t.axis]) || h > p || d < p;
		}
		for (u = 0; u < r && !(!g() && (this.updateRangeFromParsed(c, t, f, l), o)); ++u);
		if (o) {
			for (u = r - 1; u >= 0; --u)
				if (!g()) {
					this.updateRangeFromParsed(c, t, f, l);
					break;
				}
		}
		return c;
	}
	getAllParsedValues(t) {
		const e = this._cachedMeta._parsed,
			i = [];
		let s, o, r;
		for (s = 0, o = e.length; s < o; ++s) ((r = e[s][t.axis]), Q(r) && i.push(r));
		return i;
	}
	getMaxOverflow() {
		return !1;
	}
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			i = e.iScale,
			s = e.vScale,
			o = this.getParsed(t);
		return {
			label: i ? '' + i.getLabelForValue(o[i.axis]) : '',
			value: s ? '' + s.getLabelForValue(o[s.axis]) : ''
		};
	}
	_update(t) {
		const e = this._cachedMeta;
		(this.update(t || 'default'),
			(e._clip = Y_(I(this.options.clip, $_(e.xScale, e.yScale, this.getMaxOverflow())))));
	}
	update(t) {}
	draw() {
		const t = this._ctx,
			e = this.chart,
			i = this._cachedMeta,
			s = i.data || [],
			o = e.chartArea,
			r = [],
			a = this._drawStart || 0,
			l = this._drawCount || s.length - a,
			c = this.options.drawActiveElementsOnTop;
		let h;
		for (i.dataset && i.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
			const d = s[h];
			d.hidden || (d.active && c ? r.push(d) : d.draw(t, o));
		}
		for (h = 0; h < r.length; ++h) r[h].draw(t, o);
	}
	getStyle(t, e) {
		const i = e ? 'active' : 'default';
		return t === void 0 && this._cachedMeta.dataset
			? this.resolveDatasetElementOptions(i)
			: this.resolveDataElementOptions(t || 0, i);
	}
	getContext(t, e, i) {
		const s = this.getDataset();
		let o;
		if (t >= 0 && t < this._cachedMeta.data.length) {
			const r = this._cachedMeta.data[t];
			((o = r.$context || (r.$context = J_(this.getContext(), t, r))),
				(o.parsed = this.getParsed(t)),
				(o.raw = s.data[t]),
				(o.index = o.dataIndex = t));
		} else
			((o = this.$context || (this.$context = Q_(this.chart.getContext(), this.index))),
				(o.dataset = s),
				(o.index = o.datasetIndex = this.index));
		return ((o.active = !!e), (o.mode = i), o);
	}
	resolveDatasetElementOptions(t) {
		return this._resolveElementOptions(this.datasetElementType.id, t);
	}
	resolveDataElementOptions(t, e) {
		return this._resolveElementOptions(this.dataElementType.id, e, t);
	}
	_resolveElementOptions(t, e = 'default', i) {
		const s = e === 'active',
			o = this._cachedDataOpts,
			r = t + '-' + e,
			a = o[r],
			l = this.enableOptionSharing && Bn(i);
		if (a) return wa(a, l);
		const c = this.chart.config,
			h = c.datasetElementScopeKeys(this._type, t),
			d = s ? [`${t}Hover`, 'hover', t, ''] : [t, ''],
			u = c.getOptionScopes(this.getDataset(), h),
			f = Object.keys(K.elements[t]),
			g = () => this.getContext(i, s, e),
			p = c.resolveNamedOptions(u, f, g, d);
		return (p.$shared && ((p.$shared = l), (o[r] = Object.freeze(wa(p, l)))), p);
	}
	_resolveAnimations(t, e, i) {
		const s = this.chart,
			o = this._cachedDataOpts,
			r = `animation-${e}`,
			a = o[r];
		if (a) return a;
		let l;
		if (s.options.animation !== !1) {
			const h = this.chart.config,
				d = h.datasetAnimationScopeKeys(this._type, e),
				u = h.getOptionScopes(this.getDataset(), d);
			l = h.createResolver(u, this.getContext(t, i, e));
		}
		const c = new Eh(s, l && l.animations);
		return (l && l._cacheable && (o[r] = Object.freeze(c)), c);
	}
	getSharedOptions(t) {
		if (t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
	}
	includeOptions(t, e) {
		return !e || Cs(t) || this.chart._animationsDisabled;
	}
	_getSharedOptions(t, e) {
		const i = this.resolveDataElementOptions(t, e),
			s = this._sharedOptions,
			o = this.getSharedOptions(i),
			r = this.includeOptions(e, o) || o !== s;
		return (this.updateSharedOptions(o, e, i), { sharedOptions: o, includeOptions: r });
	}
	updateElement(t, e, i, s) {
		Cs(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i);
	}
	updateSharedOptions(t, e, i) {
		t && !Cs(e) && this._resolveAnimations(void 0, e).update(t, i);
	}
	_setStyle(t, e, i, s) {
		t.active = s;
		const o = this.getStyle(e, s);
		this._resolveAnimations(e, i, s).update(t, { options: (!s && this.getSharedOptions(o)) || o });
	}
	removeHoverStyle(t, e, i) {
		this._setStyle(t, i, 'active', !1);
	}
	setHoverStyle(t, e, i) {
		this._setStyle(t, i, 'active', !0);
	}
	_removeDatasetHoverStyle() {
		const t = this._cachedMeta.dataset;
		t && this._setStyle(t, void 0, 'active', !1);
	}
	_setDatasetHoverStyle() {
		const t = this._cachedMeta.dataset;
		t && this._setStyle(t, void 0, 'active', !0);
	}
	_resyncElements(t) {
		const e = this._data,
			i = this._cachedMeta.data;
		for (const [a, l, c] of this._syncList) this[a](l, c);
		this._syncList = [];
		const s = i.length,
			o = e.length,
			r = Math.min(o, s);
		(r && this.parse(0, r),
			o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o));
	}
	_insertElements(t, e, i = !0) {
		const s = this._cachedMeta,
			o = s.data,
			r = t + e;
		let a;
		const l = (c) => {
			for (c.length += e, a = c.length - 1; a >= r; a--) c[a] = c[a - e];
		};
		for (l(o), a = t; a < r; ++a) o[a] = new this.dataElementType();
		(this._parsing && l(s._parsed), this.parse(t, e), i && this.updateElements(o, t, e, 'reset'));
	}
	updateElements(t, e, i, s) {}
	_removeElements(t, e) {
		const i = this._cachedMeta;
		if (this._parsing) {
			const s = i._parsed.splice(t, e);
			i._stacked && an(i, s);
		}
		i.data.splice(t, e);
	}
	_sync(t) {
		if (this._parsing) this._syncList.push(t);
		else {
			const [e, i, s] = t;
			this[e](i, s);
		}
		this.chart._dataChanges.push([this.index, ...t]);
	}
	_onDataPush() {
		const t = arguments.length;
		this._sync(['_insertElements', this.getDataset().data.length - t, t]);
	}
	_onDataPop() {
		this._sync(['_removeElements', this._cachedMeta.data.length - 1, 1]);
	}
	_onDataShift() {
		this._sync(['_removeElements', 0, 1]);
	}
	_onDataSplice(t, e) {
		e && this._sync(['_removeElements', t, e]);
		const i = arguments.length - 2;
		i && this._sync(['_insertElements', t, i]);
	}
	_onDataUnshift() {
		this._sync(['_insertElements', 0, arguments.length]);
	}
}
function tb(n, t) {
	if (!n._cache.$bar) {
		const e = n.getMatchingVisibleMetas(t);
		let i = [];
		for (let s = 0, o = e.length; s < o; s++) i = i.concat(e[s].controller.getAllParsedValues(n));
		n._cache.$bar = rh(i.sort((s, o) => s - o));
	}
	return n._cache.$bar;
}
function eb(n) {
	const t = n.iScale,
		e = tb(t, n.type);
	let i = t._length,
		s,
		o,
		r,
		a;
	const l = () => {
		r === 32767 || r === -32768 || (Bn(a) && (i = Math.min(i, Math.abs(r - a) || i)), (a = r));
	};
	for (s = 0, o = e.length; s < o; ++s) ((r = t.getPixelForValue(e[s])), l());
	for (a = void 0, s = 0, o = t.ticks.length; s < o; ++s) ((r = t.getPixelForTick(s)), l());
	return i;
}
function nb(n, t, e, i) {
	const s = e.barThickness;
	let o, r;
	return (
		L(s) ? ((o = t.min * e.categoryPercentage), (r = e.barPercentage)) : ((o = s * i), (r = 1)),
		{ chunk: o / i, ratio: r, start: t.pixels[n] - o / 2 }
	);
}
function ib(n, t, e, i) {
	const s = t.pixels,
		o = s[n];
	let r = n > 0 ? s[n - 1] : null,
		a = n < s.length - 1 ? s[n + 1] : null;
	const l = e.categoryPercentage;
	(r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r));
	const c = o - ((o - Math.min(r, a)) / 2) * l;
	return { chunk: ((Math.abs(a - r) / 2) * l) / i, ratio: e.barPercentage, start: c };
}
function sb(n, t, e, i) {
	const s = e.parse(n[0], i),
		o = e.parse(n[1], i),
		r = Math.min(s, o),
		a = Math.max(s, o);
	let l = r,
		c = a;
	(Math.abs(r) > Math.abs(a) && ((l = a), (c = r)),
		(t[e.axis] = c),
		(t._custom = { barStart: l, barEnd: c, start: s, end: o, min: r, max: a }));
}
function Th(n, t, e, i) {
	return (q(n) ? sb(n, t, e, i) : (t[e.axis] = e.parse(n, i)), t);
}
function Ca(n, t, e, i) {
	const s = n.iScale,
		o = n.vScale,
		r = s.getLabels(),
		a = s === o,
		l = [];
	let c, h, d, u;
	for (c = e, h = e + i; c < h; ++c)
		((u = t[c]), (d = {}), (d[s.axis] = a || s.parse(r[c], c)), l.push(Th(u, d, o, c)));
	return l;
}
function Ss(n) {
	return n && n.barStart !== void 0 && n.barEnd !== void 0;
}
function ob(n, t, e) {
	return n !== 0 ? Dt(n) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function rb(n) {
	let t, e, i, s, o;
	return (
		n.horizontal
			? ((t = n.base > n.x), (e = 'left'), (i = 'right'))
			: ((t = n.base < n.y), (e = 'bottom'), (i = 'top')),
		t ? ((s = 'end'), (o = 'start')) : ((s = 'start'), (o = 'end')),
		{ start: e, end: i, reverse: t, top: s, bottom: o }
	);
}
function ab(n, t, e, i) {
	let s = t.borderSkipped;
	const o = {};
	if (!s) {
		n.borderSkipped = o;
		return;
	}
	if (s === !0) {
		n.borderSkipped = { top: !0, right: !0, bottom: !0, left: !0 };
		return;
	}
	const { start: r, end: a, reverse: l, top: c, bottom: h } = rb(n);
	(s === 'middle' &&
		e &&
		((n.enableBorderRadius = !0),
		(e._top || 0) === i
			? (s = c)
			: (e._bottom || 0) === i
				? (s = h)
				: ((o[Sa(h, r, a, l)] = !0), (s = c))),
		(o[Sa(s, r, a, l)] = !0),
		(n.borderSkipped = o));
}
function Sa(n, t, e, i) {
	return (i ? ((n = lb(n, t, e)), (n = Ea(n, e, t))) : (n = Ea(n, t, e)), n);
}
function lb(n, t, e) {
	return n === t ? e : n === e ? t : n;
}
function Ea(n, t, e) {
	return n === 'start' ? t : n === 'end' ? e : n;
}
function cb(n, { inflateAmount: t }, e) {
	n.inflateAmount = t === 'auto' ? (e === 1 ? 0.33 : 0) : t;
}
class hb extends ae {
	static id = 'bar';
	static defaults = {
		datasetElementType: !1,
		dataElementType: 'bar',
		categoryPercentage: 0.8,
		barPercentage: 0.9,
		grouped: !0,
		animations: { numbers: { type: 'number', properties: ['x', 'y', 'base', 'width', 'height'] } }
	};
	static overrides = {
		scales: {
			_index_: { type: 'category', offset: !0, grid: { offset: !0 } },
			_value_: { type: 'linear', beginAtZero: !0 }
		}
	};
	parsePrimitiveData(t, e, i, s) {
		return Ca(t, e, i, s);
	}
	parseArrayData(t, e, i, s) {
		return Ca(t, e, i, s);
	}
	parseObjectData(t, e, i, s) {
		const { iScale: o, vScale: r } = t,
			{ xAxisKey: a = 'x', yAxisKey: l = 'y' } = this._parsing,
			c = o.axis === 'x' ? a : l,
			h = r.axis === 'x' ? a : l,
			d = [];
		let u, f, g, p;
		for (u = i, f = i + s; u < f; ++u)
			((p = e[u]), (g = {}), (g[o.axis] = o.parse(se(p, c), u)), d.push(Th(se(p, h), g, r, u)));
		return d;
	}
	updateRangeFromParsed(t, e, i, s) {
		super.updateRangeFromParsed(t, e, i, s);
		const o = i._custom;
		o &&
			e === this._cachedMeta.vScale &&
			((t.min = Math.min(t.min, o.min)), (t.max = Math.max(t.max, o.max)));
	}
	getMaxOverflow() {
		return 0;
	}
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			{ iScale: i, vScale: s } = e,
			o = this.getParsed(t),
			r = o._custom,
			a = Ss(r) ? '[' + r.start + ', ' + r.end + ']' : '' + s.getLabelForValue(o[s.axis]);
		return { label: '' + i.getLabelForValue(o[i.axis]), value: a };
	}
	initialize() {
		((this.enableOptionSharing = !0), super.initialize());
		const t = this._cachedMeta;
		t.stack = this.getDataset().stack;
	}
	update(t) {
		const e = this._cachedMeta;
		this.updateElements(e.data, 0, e.data.length, t);
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			{
				index: r,
				_cachedMeta: { vScale: a }
			} = this,
			l = a.getBasePixel(),
			c = a.isHorizontal(),
			h = this._getRuler(),
			{ sharedOptions: d, includeOptions: u } = this._getSharedOptions(e, s);
		for (let f = e; f < e + i; f++) {
			const g = this.getParsed(f),
				p = o || L(g[a.axis]) ? { base: l, head: l } : this._calculateBarValuePixels(f),
				m = this._calculateBarIndexPixels(f, h),
				_ = (g._stacks || {})[a.axis],
				b = {
					horizontal: c,
					base: p.base,
					enableBorderRadius: !_ || Ss(g._custom) || r === _._top || r === _._bottom,
					x: c ? p.head : m.center,
					y: c ? m.center : p.head,
					height: c ? m.size : Math.abs(p.size),
					width: c ? Math.abs(p.size) : m.size
				};
			u && (b.options = d || this.resolveDataElementOptions(f, t[f].active ? 'active' : s));
			const x = b.options || t[f].options;
			(ab(b, x, _, r), cb(b, x, h.ratio), this.updateElement(t[f], f, b, s));
		}
	}
	_getStacks(t, e) {
		const { iScale: i } = this._cachedMeta,
			s = i.getMatchingVisibleMetas(this._type).filter((h) => h.controller.options.grouped),
			o = i.options.stacked,
			r = [],
			a = this._cachedMeta.controller.getParsed(e),
			l = a && a[i.axis],
			c = (h) => {
				const d = h._parsed.find((f) => f[i.axis] === l),
					u = d && d[h.vScale.axis];
				if (L(u) || isNaN(u)) return !0;
			};
		for (const h of s)
			if (
				!(e !== void 0 && c(h)) &&
				((o === !1 || r.indexOf(h.stack) === -1 || (o === void 0 && h.stack === void 0)) &&
					r.push(h.stack),
				h.index === t)
			)
				break;
		return (r.length || r.push(void 0), r);
	}
	_getStackCount(t) {
		return this._getStacks(void 0, t).length;
	}
	_getStackIndex(t, e, i) {
		const s = this._getStacks(t, i),
			o = e !== void 0 ? s.indexOf(e) : -1;
		return o === -1 ? s.length - 1 : o;
	}
	_getRuler() {
		const t = this.options,
			e = this._cachedMeta,
			i = e.iScale,
			s = [];
		let o, r;
		for (o = 0, r = e.data.length; o < r; ++o)
			s.push(i.getPixelForValue(this.getParsed(o)[i.axis], o));
		const a = t.barThickness;
		return {
			min: a || eb(e),
			pixels: s,
			start: i._startPixel,
			end: i._endPixel,
			stackCount: this._getStackCount(),
			scale: i,
			grouped: t.grouped,
			ratio: a ? 1 : t.categoryPercentage * t.barPercentage
		};
	}
	_calculateBarValuePixels(t) {
		const {
				_cachedMeta: { vScale: e, _stacked: i, index: s },
				options: { base: o, minBarLength: r }
			} = this,
			a = o || 0,
			l = this.getParsed(t),
			c = l._custom,
			h = Ss(c);
		let d = l[e.axis],
			u = 0,
			f = i ? this.applyStack(e, l, i) : d,
			g,
			p;
		(f !== d && ((u = f - d), (f = d)),
			h &&
				((d = c.barStart),
				(f = c.barEnd - c.barStart),
				d !== 0 && Dt(d) !== Dt(c.barEnd) && (u = 0),
				(u += d)));
		const m = !L(o) && !h ? o : u;
		let _ = e.getPixelForValue(m);
		if (
			(this.chart.getDataVisibility(t) ? (g = e.getPixelForValue(u + f)) : (g = _),
			(p = g - _),
			Math.abs(p) < r)
		) {
			((p = ob(p, e, a) * r), d === a && (_ -= p / 2));
			const b = e.getPixelForDecimal(0),
				x = e.getPixelForDecimal(1),
				v = Math.min(b, x),
				y = Math.max(b, x);
			((_ = Math.max(Math.min(_, y), v)),
				(g = _ + p),
				i &&
					!h &&
					(l._stacks[e.axis]._visualValues[s] = e.getValueForPixel(g) - e.getValueForPixel(_)));
		}
		if (_ === e.getPixelForValue(a)) {
			const b = (Dt(p) * e.getLineWidthForValue(a)) / 2;
			((_ += b), (p -= b));
		}
		return { size: p, base: _, head: g, center: g + p / 2 };
	}
	_calculateBarIndexPixels(t, e) {
		const i = e.scale,
			s = this.options,
			o = s.skipNull,
			r = I(s.maxBarThickness, 1 / 0);
		let a, l;
		if (e.grouped) {
			const c = o ? this._getStackCount(t) : e.stackCount,
				h = s.barThickness === 'flex' ? ib(t, e, s, c) : nb(t, e, s, c),
				d = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
			((a = h.start + h.chunk * d + h.chunk / 2), (l = Math.min(r, h.chunk * h.ratio)));
		} else
			((a = i.getPixelForValue(this.getParsed(t)[i.axis], t)), (l = Math.min(r, e.min * e.ratio)));
		return { base: a - l / 2, head: a + l / 2, center: a, size: l };
	}
	draw() {
		const t = this._cachedMeta,
			e = t.vScale,
			i = t.data,
			s = i.length;
		let o = 0;
		for (; o < s; ++o) this.getParsed(o)[e.axis] !== null && !i[o].hidden && i[o].draw(this._ctx);
	}
}
class db extends ae {
	static id = 'bubble';
	static defaults = {
		datasetElementType: !1,
		dataElementType: 'point',
		animations: { numbers: { type: 'number', properties: ['x', 'y', 'borderWidth', 'radius'] } }
	};
	static overrides = { scales: { x: { type: 'linear' }, y: { type: 'linear' } } };
	initialize() {
		((this.enableOptionSharing = !0), super.initialize());
	}
	parsePrimitiveData(t, e, i, s) {
		const o = super.parsePrimitiveData(t, e, i, s);
		for (let r = 0; r < o.length; r++) o[r]._custom = this.resolveDataElementOptions(r + i).radius;
		return o;
	}
	parseArrayData(t, e, i, s) {
		const o = super.parseArrayData(t, e, i, s);
		for (let r = 0; r < o.length; r++) {
			const a = e[i + r];
			o[r]._custom = I(a[2], this.resolveDataElementOptions(r + i).radius);
		}
		return o;
	}
	parseObjectData(t, e, i, s) {
		const o = super.parseObjectData(t, e, i, s);
		for (let r = 0; r < o.length; r++) {
			const a = e[i + r];
			o[r]._custom = I(a && a.r && +a.r, this.resolveDataElementOptions(r + i).radius);
		}
		return o;
	}
	getMaxOverflow() {
		const t = this._cachedMeta.data;
		let e = 0;
		for (let i = t.length - 1; i >= 0; --i)
			e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2);
		return e > 0 && e;
	}
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			i = this.chart.data.labels || [],
			{ xScale: s, yScale: o } = e,
			r = this.getParsed(t),
			a = s.getLabelForValue(r.x),
			l = o.getLabelForValue(r.y),
			c = r._custom;
		return { label: i[t] || '', value: '(' + a + ', ' + l + (c ? ', ' + c : '') + ')' };
	}
	update(t) {
		const e = this._cachedMeta.data;
		this.updateElements(e, 0, e.length, t);
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			{ iScale: r, vScale: a } = this._cachedMeta,
			{ sharedOptions: l, includeOptions: c } = this._getSharedOptions(e, s),
			h = r.axis,
			d = a.axis;
		for (let u = e; u < e + i; u++) {
			const f = t[u],
				g = !o && this.getParsed(u),
				p = {},
				m = (p[h] = o ? r.getPixelForDecimal(0.5) : r.getPixelForValue(g[h])),
				_ = (p[d] = o ? a.getBasePixel() : a.getPixelForValue(g[d]));
			((p.skip = isNaN(m) || isNaN(_)),
				c &&
					((p.options = l || this.resolveDataElementOptions(u, f.active ? 'active' : s)),
					o && (p.options.radius = 0)),
				this.updateElement(f, u, p, s));
		}
	}
	resolveDataElementOptions(t, e) {
		const i = this.getParsed(t);
		let s = super.resolveDataElementOptions(t, e);
		s.$shared && (s = Object.assign({}, s, { $shared: !1 }));
		const o = s.radius;
		return (e !== 'active' && (s.radius = 0), (s.radius += I(i && i._custom, o)), s);
	}
}
function ub(n, t, e) {
	let i = 1,
		s = 1,
		o = 0,
		r = 0;
	if (t < $) {
		const a = n,
			l = a + t,
			c = Math.cos(a),
			h = Math.sin(a),
			d = Math.cos(l),
			u = Math.sin(l),
			f = (x, v, y) => (Wn(x, a, l, !0) ? 1 : Math.max(v, v * e, y, y * e)),
			g = (x, v, y) => (Wn(x, a, l, !0) ? -1 : Math.min(v, v * e, y, y * e)),
			p = f(0, c, d),
			m = f(Z, h, u),
			_ = g(Y, c, d),
			b = g(Y + Z, h, u);
		((i = (p - _) / 2), (s = (m - b) / 2), (o = -(p + _) / 2), (r = -(m + b) / 2));
	}
	return { ratioX: i, ratioY: s, offsetX: o, offsetY: r };
}
class Jo extends ae {
	static id = 'doughnut';
	static defaults = {
		datasetElementType: !1,
		dataElementType: 'arc',
		animation: { animateRotate: !0, animateScale: !1 },
		animations: {
			numbers: {
				type: 'number',
				properties: [
					'circumference',
					'endAngle',
					'innerRadius',
					'outerRadius',
					'startAngle',
					'x',
					'y',
					'offset',
					'borderWidth',
					'spacing'
				]
			}
		},
		cutout: '50%',
		rotation: 0,
		circumference: 360,
		radius: '100%',
		spacing: 0,
		indexAxis: 'r'
	};
	static descriptors = {
		_scriptable: (t) => t !== 'spacing',
		_indexable: (t) =>
			t !== 'spacing' && !t.startsWith('borderDash') && !t.startsWith('hoverBorderDash')
	};
	static overrides = {
		aspectRatio: 1,
		plugins: {
			legend: {
				labels: {
					generateLabels(t) {
						const e = t.data;
						if (e.labels.length && e.datasets.length) {
							const {
								labels: { pointStyle: i, color: s }
							} = t.legend.options;
							return e.labels.map((o, r) => {
								const l = t.getDatasetMeta(0).controller.getStyle(r);
								return {
									text: o,
									fillStyle: l.backgroundColor,
									strokeStyle: l.borderColor,
									fontColor: s,
									lineWidth: l.borderWidth,
									pointStyle: i,
									hidden: !t.getDataVisibility(r),
									index: r
								};
							});
						}
						return [];
					}
				},
				onClick(t, e, i) {
					(i.chart.toggleDataVisibility(e.index), i.chart.update());
				}
			}
		}
	};
	constructor(t, e) {
		(super(t, e),
			(this.enableOptionSharing = !0),
			(this.innerRadius = void 0),
			(this.outerRadius = void 0),
			(this.offsetX = void 0),
			(this.offsetY = void 0));
	}
	linkScales() {}
	parse(t, e) {
		const i = this.getDataset().data,
			s = this._cachedMeta;
		if (this._parsing === !1) s._parsed = i;
		else {
			let o = (l) => +i[l];
			if (O(i[t])) {
				const { key: l = 'value' } = this._parsing;
				o = (c) => +se(i[c], l);
			}
			let r, a;
			for (r = t, a = t + e; r < a; ++r) s._parsed[r] = o(r);
		}
	}
	_getRotation() {
		return Tt(this.options.rotation - 90);
	}
	_getCircumference() {
		return Tt(this.options.circumference);
	}
	_getRotationExtents() {
		let t = $,
			e = -$;
		for (let i = 0; i < this.chart.data.datasets.length; ++i)
			if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
				const s = this.chart.getDatasetMeta(i).controller,
					o = s._getRotation(),
					r = s._getCircumference();
				((t = Math.min(t, o)), (e = Math.max(e, o + r)));
			}
		return { rotation: t, circumference: e - t };
	}
	update(t) {
		const e = this.chart,
			{ chartArea: i } = e,
			s = this._cachedMeta,
			o = s.data,
			r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
			a = Math.max((Math.min(i.width, i.height) - r) / 2, 0),
			l = Math.min(Sm(this.options.cutout, a), 1),
			c = this._getRingWeight(this.index),
			{ circumference: h, rotation: d } = this._getRotationExtents(),
			{ ratioX: u, ratioY: f, offsetX: g, offsetY: p } = ub(d, h, l),
			m = (i.width - r) / u,
			_ = (i.height - r) / f,
			b = Math.max(Math.min(m, _) / 2, 0),
			x = eh(this.options.radius, b),
			v = Math.max(x * l, 0),
			y = (x - v) / this._getVisibleDatasetWeightTotal();
		((this.offsetX = g * x),
			(this.offsetY = p * x),
			(s.total = this.calculateTotal()),
			(this.outerRadius = x - y * this._getRingWeightOffset(this.index)),
			(this.innerRadius = Math.max(this.outerRadius - y * c, 0)),
			this.updateElements(o, 0, o.length, t));
	}
	_circumference(t, e) {
		const i = this.options,
			s = this._cachedMeta,
			o = this._getCircumference();
		return (e && i.animation.animateRotate) ||
			!this.chart.getDataVisibility(t) ||
			s._parsed[t] === null ||
			s.data[t].hidden
			? 0
			: this.calculateCircumference((s._parsed[t] * o) / $);
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			r = this.chart,
			a = r.chartArea,
			c = r.options.animation,
			h = (a.left + a.right) / 2,
			d = (a.top + a.bottom) / 2,
			u = o && c.animateScale,
			f = u ? 0 : this.innerRadius,
			g = u ? 0 : this.outerRadius,
			{ sharedOptions: p, includeOptions: m } = this._getSharedOptions(e, s);
		let _ = this._getRotation(),
			b;
		for (b = 0; b < e; ++b) _ += this._circumference(b, o);
		for (b = e; b < e + i; ++b) {
			const x = this._circumference(b, o),
				v = t[b],
				y = {
					x: h + this.offsetX,
					y: d + this.offsetY,
					startAngle: _,
					endAngle: _ + x,
					circumference: x,
					outerRadius: g,
					innerRadius: f
				};
			(m && (y.options = p || this.resolveDataElementOptions(b, v.active ? 'active' : s)),
				(_ += x),
				this.updateElement(v, b, y, s));
		}
	}
	calculateTotal() {
		const t = this._cachedMeta,
			e = t.data;
		let i = 0,
			s;
		for (s = 0; s < e.length; s++) {
			const o = t._parsed[s];
			o !== null &&
				!isNaN(o) &&
				this.chart.getDataVisibility(s) &&
				!e[s].hidden &&
				(i += Math.abs(o));
		}
		return i;
	}
	calculateCircumference(t) {
		const e = this._cachedMeta.total;
		return e > 0 && !isNaN(t) ? $ * (Math.abs(t) / e) : 0;
	}
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			i = this.chart,
			s = i.data.labels || [],
			o = Qn(e._parsed[t], i.options.locale);
		return { label: s[t] || '', value: o };
	}
	getMaxBorderWidth(t) {
		let e = 0;
		const i = this.chart;
		let s, o, r, a, l;
		if (!t) {
			for (s = 0, o = i.data.datasets.length; s < o; ++s)
				if (i.isDatasetVisible(s)) {
					((r = i.getDatasetMeta(s)), (t = r.data), (a = r.controller));
					break;
				}
		}
		if (!t) return 0;
		for (s = 0, o = t.length; s < o; ++s)
			((l = a.resolveDataElementOptions(s)),
				l.borderAlign !== 'inner' &&
					(e = Math.max(e, l.borderWidth || 0, l.hoverBorderWidth || 0)));
		return e;
	}
	getMaxOffset(t) {
		let e = 0;
		for (let i = 0, s = t.length; i < s; ++i) {
			const o = this.resolveDataElementOptions(i);
			e = Math.max(e, o.offset || 0, o.hoverOffset || 0);
		}
		return e;
	}
	_getRingWeightOffset(t) {
		let e = 0;
		for (let i = 0; i < t; ++i) this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
		return e;
	}
	_getRingWeight(t) {
		return Math.max(I(this.chart.data.datasets[t].weight, 1), 0);
	}
	_getVisibleDatasetWeightTotal() {
		return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
	}
}
class fb extends ae {
	static id = 'line';
	static defaults = {
		datasetElementType: 'line',
		dataElementType: 'point',
		showLine: !0,
		spanGaps: !1
	};
	static overrides = { scales: { _index_: { type: 'category' }, _value_: { type: 'linear' } } };
	initialize() {
		((this.enableOptionSharing = !0), (this.supportsDecimation = !0), super.initialize());
	}
	update(t) {
		const e = this._cachedMeta,
			{ dataset: i, data: s = [], _dataset: o } = e,
			r = this.chart._animationsDisabled;
		let { start: a, count: l } = ch(e, s, r);
		((this._drawStart = a),
			(this._drawCount = l),
			hh(e) && ((a = 0), (l = s.length)),
			(i._chart = this.chart),
			(i._datasetIndex = this.index),
			(i._decimated = !!o._decimated),
			(i.points = s));
		const c = this.resolveDatasetElementOptions(t);
		(this.options.showLine || (c.borderWidth = 0),
			(c.segment = this.options.segment),
			this.updateElement(i, void 0, { animated: !r, options: c }, t),
			this.updateElements(s, a, l, t));
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			{ iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta,
			{ sharedOptions: h, includeOptions: d } = this._getSharedOptions(e, s),
			u = r.axis,
			f = a.axis,
			{ spanGaps: g, segment: p } = this.options,
			m = Ye(g) ? g : Number.POSITIVE_INFINITY,
			_ = this.chart._animationsDisabled || o || s === 'none',
			b = e + i,
			x = t.length;
		let v = e > 0 && this.getParsed(e - 1);
		for (let y = 0; y < x; ++y) {
			const C = t[y],
				S = _ ? C : {};
			if (y < e || y >= b) {
				S.skip = !0;
				continue;
			}
			const E = this.getParsed(y),
				k = L(E[f]),
				M = (S[u] = r.getPixelForValue(E[u], y)),
				P = (S[f] =
					o || k ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, E, l) : E[f], y));
			((S.skip = isNaN(M) || isNaN(P) || k),
				(S.stop = y > 0 && Math.abs(E[u] - v[u]) > m),
				p && ((S.parsed = E), (S.raw = c.data[y])),
				d && (S.options = h || this.resolveDataElementOptions(y, C.active ? 'active' : s)),
				_ || this.updateElement(C, y, S, s),
				(v = E));
		}
	}
	getMaxOverflow() {
		const t = this._cachedMeta,
			e = t.dataset,
			i = (e.options && e.options.borderWidth) || 0,
			s = t.data || [];
		if (!s.length) return i;
		const o = s[0].size(this.resolveDataElementOptions(0)),
			r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
		return Math.max(i, o, r) / 2;
	}
	draw() {
		const t = this._cachedMeta;
		(t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw());
	}
}
class Ih extends ae {
	static id = 'polarArea';
	static defaults = {
		dataElementType: 'arc',
		animation: { animateRotate: !0, animateScale: !0 },
		animations: {
			numbers: {
				type: 'number',
				properties: ['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius']
			}
		},
		indexAxis: 'r',
		startAngle: 0
	};
	static overrides = {
		aspectRatio: 1,
		plugins: {
			legend: {
				labels: {
					generateLabels(t) {
						const e = t.data;
						if (e.labels.length && e.datasets.length) {
							const {
								labels: { pointStyle: i, color: s }
							} = t.legend.options;
							return e.labels.map((o, r) => {
								const l = t.getDatasetMeta(0).controller.getStyle(r);
								return {
									text: o,
									fillStyle: l.backgroundColor,
									strokeStyle: l.borderColor,
									fontColor: s,
									lineWidth: l.borderWidth,
									pointStyle: i,
									hidden: !t.getDataVisibility(r),
									index: r
								};
							});
						}
						return [];
					}
				},
				onClick(t, e, i) {
					(i.chart.toggleDataVisibility(e.index), i.chart.update());
				}
			}
		},
		scales: {
			r: {
				type: 'radialLinear',
				angleLines: { display: !1 },
				beginAtZero: !0,
				grid: { circular: !0 },
				pointLabels: { display: !1 },
				startAngle: 0
			}
		}
	};
	constructor(t, e) {
		(super(t, e), (this.innerRadius = void 0), (this.outerRadius = void 0));
	}
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			i = this.chart,
			s = i.data.labels || [],
			o = Qn(e._parsed[t].r, i.options.locale);
		return { label: s[t] || '', value: o };
	}
	parseObjectData(t, e, i, s) {
		return bh.bind(this)(t, e, i, s);
	}
	update(t) {
		const e = this._cachedMeta.data;
		(this._updateRadius(), this.updateElements(e, 0, e.length, t));
	}
	getMinMax() {
		const t = this._cachedMeta,
			e = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
		return (
			t.data.forEach((i, s) => {
				const o = this.getParsed(s).r;
				!isNaN(o) &&
					this.chart.getDataVisibility(s) &&
					(o < e.min && (e.min = o), o > e.max && (e.max = o));
			}),
			e
		);
	}
	_updateRadius() {
		const t = this.chart,
			e = t.chartArea,
			i = t.options,
			s = Math.min(e.right - e.left, e.bottom - e.top),
			o = Math.max(s / 2, 0),
			r = Math.max(i.cutoutPercentage ? (o / 100) * i.cutoutPercentage : 1, 0),
			a = (o - r) / t.getVisibleDatasetCount();
		((this.outerRadius = o - a * this.index), (this.innerRadius = this.outerRadius - a));
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			r = this.chart,
			l = r.options.animation,
			c = this._cachedMeta.rScale,
			h = c.xCenter,
			d = c.yCenter,
			u = c.getIndexAngle(0) - 0.5 * Y;
		let f = u,
			g;
		const p = 360 / this.countVisibleElements();
		for (g = 0; g < e; ++g) f += this._computeAngle(g, s, p);
		for (g = e; g < e + i; g++) {
			const m = t[g];
			let _ = f,
				b = f + this._computeAngle(g, s, p),
				x = r.getDataVisibility(g) ? c.getDistanceFromCenterForValue(this.getParsed(g).r) : 0;
			((f = b), o && (l.animateScale && (x = 0), l.animateRotate && (_ = b = u)));
			const v = {
				x: h,
				y: d,
				innerRadius: 0,
				outerRadius: x,
				startAngle: _,
				endAngle: b,
				options: this.resolveDataElementOptions(g, m.active ? 'active' : s)
			};
			this.updateElement(m, g, v, s);
		}
	}
	countVisibleElements() {
		const t = this._cachedMeta;
		let e = 0;
		return (
			t.data.forEach((i, s) => {
				!isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && e++;
			}),
			e
		);
	}
	_computeAngle(t, e, i) {
		return this.chart.getDataVisibility(t)
			? Tt(this.resolveDataElementOptions(t, e).angle || i)
			: 0;
	}
}
class gb extends Jo {
	static id = 'pie';
	static defaults = { cutout: 0, rotation: 0, circumference: 360, radius: '100%' };
}
class pb extends ae {
	static id = 'radar';
	static defaults = {
		datasetElementType: 'line',
		dataElementType: 'point',
		indexAxis: 'r',
		showLine: !0,
		elements: { line: { fill: 'start' } }
	};
	static overrides = { aspectRatio: 1, scales: { r: { type: 'radialLinear' } } };
	getLabelAndValue(t) {
		const e = this._cachedMeta.vScale,
			i = this.getParsed(t);
		return { label: e.getLabels()[t], value: '' + e.getLabelForValue(i[e.axis]) };
	}
	parseObjectData(t, e, i, s) {
		return bh.bind(this)(t, e, i, s);
	}
	update(t) {
		const e = this._cachedMeta,
			i = e.dataset,
			s = e.data || [],
			o = e.iScale.getLabels();
		if (((i.points = s), t !== 'resize')) {
			const r = this.resolveDatasetElementOptions(t);
			this.options.showLine || (r.borderWidth = 0);
			const a = { _loop: !0, _fullLoop: o.length === s.length, options: r };
			this.updateElement(i, void 0, a, t);
		}
		this.updateElements(s, 0, s.length, t);
	}
	updateElements(t, e, i, s) {
		const o = this._cachedMeta.rScale,
			r = s === 'reset';
		for (let a = e; a < e + i; a++) {
			const l = t[a],
				c = this.resolveDataElementOptions(a, l.active ? 'active' : s),
				h = o.getPointPositionForValue(a, this.getParsed(a).r),
				d = r ? o.xCenter : h.x,
				u = r ? o.yCenter : h.y,
				f = { x: d, y: u, angle: h.angle, skip: isNaN(d) || isNaN(u), options: c };
			this.updateElement(l, a, f, s);
		}
	}
}
class mb extends ae {
	static id = 'scatter';
	static defaults = { datasetElementType: !1, dataElementType: 'point', showLine: !1, fill: !1 };
	static overrides = {
		interaction: { mode: 'point' },
		scales: { x: { type: 'linear' }, y: { type: 'linear' } }
	};
	getLabelAndValue(t) {
		const e = this._cachedMeta,
			i = this.chart.data.labels || [],
			{ xScale: s, yScale: o } = e,
			r = this.getParsed(t),
			a = s.getLabelForValue(r.x),
			l = o.getLabelForValue(r.y);
		return { label: i[t] || '', value: '(' + a + ', ' + l + ')' };
	}
	update(t) {
		const e = this._cachedMeta,
			{ data: i = [] } = e,
			s = this.chart._animationsDisabled;
		let { start: o, count: r } = ch(e, i, s);
		if (
			((this._drawStart = o),
			(this._drawCount = r),
			hh(e) && ((o = 0), (r = i.length)),
			this.options.showLine)
		) {
			this.datasetElementType || this.addElements();
			const { dataset: a, _dataset: l } = e;
			((a._chart = this.chart),
				(a._datasetIndex = this.index),
				(a._decimated = !!l._decimated),
				(a.points = i));
			const c = this.resolveDatasetElementOptions(t);
			((c.segment = this.options.segment),
				this.updateElement(a, void 0, { animated: !s, options: c }, t));
		} else this.datasetElementType && (delete e.dataset, (this.datasetElementType = !1));
		this.updateElements(i, o, r, t);
	}
	addElements() {
		const { showLine: t } = this.options;
		(!this.datasetElementType &&
			t &&
			(this.datasetElementType = this.chart.registry.getElement('line')),
			super.addElements());
	}
	updateElements(t, e, i, s) {
		const o = s === 'reset',
			{ iScale: r, vScale: a, _stacked: l, _dataset: c } = this._cachedMeta,
			h = this.resolveDataElementOptions(e, s),
			d = this.getSharedOptions(h),
			u = this.includeOptions(s, d),
			f = r.axis,
			g = a.axis,
			{ spanGaps: p, segment: m } = this.options,
			_ = Ye(p) ? p : Number.POSITIVE_INFINITY,
			b = this.chart._animationsDisabled || o || s === 'none';
		let x = e > 0 && this.getParsed(e - 1);
		for (let v = e; v < e + i; ++v) {
			const y = t[v],
				C = this.getParsed(v),
				S = b ? y : {},
				E = L(C[g]),
				k = (S[f] = r.getPixelForValue(C[f], v)),
				M = (S[g] =
					o || E ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, C, l) : C[g], v));
			((S.skip = isNaN(k) || isNaN(M) || E),
				(S.stop = v > 0 && Math.abs(C[f] - x[f]) > _),
				m && ((S.parsed = C), (S.raw = c.data[v])),
				u && (S.options = d || this.resolveDataElementOptions(v, y.active ? 'active' : s)),
				b || this.updateElement(y, v, S, s),
				(x = C));
		}
		this.updateSharedOptions(d, s, h);
	}
	getMaxOverflow() {
		const t = this._cachedMeta,
			e = t.data || [];
		if (!this.options.showLine) {
			let a = 0;
			for (let l = e.length - 1; l >= 0; --l)
				a = Math.max(a, e[l].size(this.resolveDataElementOptions(l)) / 2);
			return a > 0 && a;
		}
		const i = t.dataset,
			s = (i.options && i.options.borderWidth) || 0;
		if (!e.length) return s;
		const o = e[0].size(this.resolveDataElementOptions(0)),
			r = e[e.length - 1].size(this.resolveDataElementOptions(e.length - 1));
		return Math.max(s, o, r) / 2;
	}
}
var _b = Object.freeze({
	__proto__: null,
	BarController: hb,
	BubbleController: db,
	DoughnutController: Jo,
	LineController: fb,
	PieController: gb,
	PolarAreaController: Ih,
	RadarController: pb,
	ScatterController: mb
});
function ue() {
	throw new Error(
		'This method is not implemented: Check that a complete date adapter is provided.'
	);
}
class Zo {
	static override(t) {
		Object.assign(Zo.prototype, t);
	}
	options;
	constructor(t) {
		this.options = t || {};
	}
	init() {}
	formats() {
		return ue();
	}
	parse() {
		return ue();
	}
	format() {
		return ue();
	}
	add() {
		return ue();
	}
	diff() {
		return ue();
	}
	startOf() {
		return ue();
	}
	endOf() {
		return ue();
	}
}
var bb = { _date: Zo };
function yb(n, t, e, i) {
	const { controller: s, data: o, _sorted: r } = n,
		a = s._cachedMeta.iScale;
	if (a && t === a.axis && t !== 'r' && r && o.length) {
		const l = a._reversePixels ? Lm : Wt;
		if (i) {
			if (s._sharedOptions) {
				const c = o[0],
					h = typeof c.getRange == 'function' && c.getRange(t);
				if (h) {
					const d = l(o, t, e - h),
						u = l(o, t, e + h);
					return { lo: d.lo, hi: u.hi };
				}
			}
		} else return l(o, t, e);
	}
	return { lo: 0, hi: o.length - 1 };
}
function ss(n, t, e, i, s) {
	const o = n.getSortedVisibleDatasetMetas(),
		r = e[t];
	for (let a = 0, l = o.length; a < l; ++a) {
		const { index: c, data: h } = o[a],
			{ lo: d, hi: u } = yb(o[a], t, r, s);
		for (let f = d; f <= u; ++f) {
			const g = h[f];
			g.skip || i(g, c, f);
		}
	}
}
function xb(n) {
	const t = n.indexOf('x') !== -1,
		e = n.indexOf('y') !== -1;
	return function (i, s) {
		const o = t ? Math.abs(i.x - s.x) : 0,
			r = e ? Math.abs(i.y - s.y) : 0;
		return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2));
	};
}
function Es(n, t, e, i, s) {
	const o = [];
	return (
		(!s && !n.isPointInArea(t)) ||
			ss(
				n,
				e,
				t,
				function (a, l, c) {
					(!s && !zt(a, n.chartArea, 0)) ||
						(a.inRange(t.x, t.y, i) && o.push({ element: a, datasetIndex: l, index: c }));
				},
				!0
			),
		o
	);
}
function vb(n, t, e, i) {
	let s = [];
	function o(r, a, l) {
		const { startAngle: c, endAngle: h } = r.getProps(['startAngle', 'endAngle'], i),
			{ angle: d } = sh(r, { x: t.x, y: t.y });
		Wn(d, c, h) && s.push({ element: r, datasetIndex: a, index: l });
	}
	return (ss(n, e, t, o), s);
}
function wb(n, t, e, i, s, o) {
	let r = [];
	const a = xb(e);
	let l = Number.POSITIVE_INFINITY;
	function c(h, d, u) {
		const f = h.inRange(t.x, t.y, s);
		if (i && !f) return;
		const g = h.getCenterPoint(s);
		if (!(!!o || n.isPointInArea(g)) && !f) return;
		const m = a(t, g);
		m < l
			? ((r = [{ element: h, datasetIndex: d, index: u }]), (l = m))
			: m === l && r.push({ element: h, datasetIndex: d, index: u });
	}
	return (ss(n, e, t, c), r);
}
function ks(n, t, e, i, s, o) {
	return !o && !n.isPointInArea(t) ? [] : e === 'r' && !i ? vb(n, t, e, s) : wb(n, t, e, i, s, o);
}
function ka(n, t, e, i, s) {
	const o = [],
		r = e === 'x' ? 'inXRange' : 'inYRange';
	let a = !1;
	return (
		ss(n, e, t, (l, c, h) => {
			l[r] &&
				l[r](t[e], s) &&
				(o.push({ element: l, datasetIndex: c, index: h }), (a = a || l.inRange(t.x, t.y, s)));
		}),
		i && !a ? [] : o
	);
}
var Cb = {
	modes: {
		index(n, t, e, i) {
			const s = me(t, n),
				o = e.axis || 'x',
				r = e.includeInvisible || !1,
				a = e.intersect ? Es(n, s, o, i, r) : ks(n, s, o, !1, i, r),
				l = [];
			return a.length
				? (n.getSortedVisibleDatasetMetas().forEach((c) => {
						const h = a[0].index,
							d = c.data[h];
						d && !d.skip && l.push({ element: d, datasetIndex: c.index, index: h });
					}),
					l)
				: [];
		},
		dataset(n, t, e, i) {
			const s = me(t, n),
				o = e.axis || 'xy',
				r = e.includeInvisible || !1;
			let a = e.intersect ? Es(n, s, o, i, r) : ks(n, s, o, !1, i, r);
			if (a.length > 0) {
				const l = a[0].datasetIndex,
					c = n.getDatasetMeta(l).data;
				a = [];
				for (let h = 0; h < c.length; ++h) a.push({ element: c[h], datasetIndex: l, index: h });
			}
			return a;
		},
		point(n, t, e, i) {
			const s = me(t, n),
				o = e.axis || 'xy',
				r = e.includeInvisible || !1;
			return Es(n, s, o, i, r);
		},
		nearest(n, t, e, i) {
			const s = me(t, n),
				o = e.axis || 'xy',
				r = e.includeInvisible || !1;
			return ks(n, s, o, e.intersect, i, r);
		},
		x(n, t, e, i) {
			const s = me(t, n);
			return ka(n, s, 'x', e.intersect, i);
		},
		y(n, t, e, i) {
			const s = me(t, n);
			return ka(n, s, 'y', e.intersect, i);
		}
	}
};
const Mh = ['left', 'top', 'right', 'bottom'];
function ln(n, t) {
	return n.filter((e) => e.pos === t);
}
function Ta(n, t) {
	return n.filter((e) => Mh.indexOf(e.pos) === -1 && e.box.axis === t);
}
function cn(n, t) {
	return n.sort((e, i) => {
		const s = t ? i : e,
			o = t ? e : i;
		return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
	});
}
function Sb(n) {
	const t = [];
	let e, i, s, o, r, a;
	for (e = 0, i = (n || []).length; e < i; ++e)
		((s = n[e]),
			({
				position: o,
				options: { stack: r, stackWeight: a = 1 }
			} = s),
			t.push({
				index: e,
				box: s,
				pos: o,
				horizontal: s.isHorizontal(),
				weight: s.weight,
				stack: r && o + r,
				stackWeight: a
			}));
	return t;
}
function Eb(n) {
	const t = {};
	for (const e of n) {
		const { stack: i, pos: s, stackWeight: o } = e;
		if (!i || !Mh.includes(s)) continue;
		const r = t[i] || (t[i] = { count: 0, placed: 0, weight: 0, size: 0 });
		(r.count++, (r.weight += o));
	}
	return t;
}
function kb(n, t) {
	const e = Eb(n),
		{ vBoxMaxWidth: i, hBoxMaxHeight: s } = t;
	let o, r, a;
	for (o = 0, r = n.length; o < r; ++o) {
		a = n[o];
		const { fullSize: l } = a.box,
			c = e[a.stack],
			h = c && a.stackWeight / c.weight;
		a.horizontal
			? ((a.width = h ? h * i : l && t.availableWidth), (a.height = s))
			: ((a.width = i), (a.height = h ? h * s : l && t.availableHeight));
	}
	return e;
}
function Tb(n) {
	const t = Sb(n),
		e = cn(
			t.filter((c) => c.box.fullSize),
			!0
		),
		i = cn(ln(t, 'left'), !0),
		s = cn(ln(t, 'right')),
		o = cn(ln(t, 'top'), !0),
		r = cn(ln(t, 'bottom')),
		a = Ta(t, 'x'),
		l = Ta(t, 'y');
	return {
		fullSize: e,
		leftAndTop: i.concat(o),
		rightAndBottom: s.concat(l).concat(r).concat(a),
		chartArea: ln(t, 'chartArea'),
		vertical: i.concat(s).concat(l),
		horizontal: o.concat(r).concat(a)
	};
}
function Ia(n, t, e, i) {
	return Math.max(n[e], t[e]) + Math.max(n[i], t[i]);
}
function Ph(n, t) {
	((n.top = Math.max(n.top, t.top)),
		(n.left = Math.max(n.left, t.left)),
		(n.bottom = Math.max(n.bottom, t.bottom)),
		(n.right = Math.max(n.right, t.right)));
}
function Ib(n, t, e, i) {
	const { pos: s, box: o } = e,
		r = n.maxPadding;
	if (!O(s)) {
		e.size && (n[s] -= e.size);
		const d = i[e.stack] || { size: 0, count: 1 };
		((d.size = Math.max(d.size, e.horizontal ? o.height : o.width)),
			(e.size = d.size / d.count),
			(n[s] += e.size));
	}
	o.getPadding && Ph(r, o.getPadding());
	const a = Math.max(0, t.outerWidth - Ia(r, n, 'left', 'right')),
		l = Math.max(0, t.outerHeight - Ia(r, n, 'top', 'bottom')),
		c = a !== n.w,
		h = l !== n.h;
	return ((n.w = a), (n.h = l), e.horizontal ? { same: c, other: h } : { same: h, other: c });
}
function Mb(n) {
	const t = n.maxPadding;
	function e(i) {
		const s = Math.max(t[i] - n[i], 0);
		return ((n[i] += s), s);
	}
	((n.y += e('top')), (n.x += e('left')), e('right'), e('bottom'));
}
function Pb(n, t) {
	const e = t.maxPadding;
	function i(s) {
		const o = { left: 0, top: 0, right: 0, bottom: 0 };
		return (
			s.forEach((r) => {
				o[r] = Math.max(t[r], e[r]);
			}),
			o
		);
	}
	return i(n ? ['left', 'right'] : ['top', 'bottom']);
}
function gn(n, t, e, i) {
	const s = [];
	let o, r, a, l, c, h;
	for (o = 0, r = n.length, c = 0; o < r; ++o) {
		((a = n[o]), (l = a.box), l.update(a.width || t.w, a.height || t.h, Pb(a.horizontal, t)));
		const { same: d, other: u } = Ib(t, e, a, i);
		((c |= d && s.length), (h = h || u), l.fullSize || s.push(a));
	}
	return (c && gn(s, t, e, i)) || h;
}
function ai(n, t, e, i, s) {
	((n.top = e), (n.left = t), (n.right = t + i), (n.bottom = e + s), (n.width = i), (n.height = s));
}
function Ma(n, t, e, i) {
	const s = e.padding;
	let { x: o, y: r } = t;
	for (const a of n) {
		const l = a.box,
			c = i[a.stack] || { placed: 0, weight: 1 },
			h = a.stackWeight / c.weight || 1;
		if (a.horizontal) {
			const d = t.w * h,
				u = c.size || l.height;
			(Bn(c.start) && (r = c.start),
				l.fullSize
					? ai(l, s.left, r, e.outerWidth - s.right - s.left, u)
					: ai(l, t.left + c.placed, r, d, u),
				(c.start = r),
				(c.placed += d),
				(r = l.bottom));
		} else {
			const d = t.h * h,
				u = c.size || l.width;
			(Bn(c.start) && (o = c.start),
				l.fullSize
					? ai(l, o, s.top, u, e.outerHeight - s.bottom - s.top)
					: ai(l, o, t.top + c.placed, u, d),
				(c.start = o),
				(c.placed += d),
				(o = l.right));
		}
	}
	((t.x = o), (t.y = r));
}
var dt = {
	addBox(n, t) {
		(n.boxes || (n.boxes = []),
			(t.fullSize = t.fullSize || !1),
			(t.position = t.position || 'top'),
			(t.weight = t.weight || 0),
			(t._layers =
				t._layers ||
				function () {
					return [
						{
							z: 0,
							draw(e) {
								t.draw(e);
							}
						}
					];
				}),
			n.boxes.push(t));
	},
	removeBox(n, t) {
		const e = n.boxes ? n.boxes.indexOf(t) : -1;
		e !== -1 && n.boxes.splice(e, 1);
	},
	configure(n, t, e) {
		((t.fullSize = e.fullSize), (t.position = e.position), (t.weight = e.weight));
	},
	update(n, t, e, i) {
		if (!n) return;
		const s = ut(n.options.layout.padding),
			o = Math.max(t - s.width, 0),
			r = Math.max(e - s.height, 0),
			a = Tb(n.boxes),
			l = a.vertical,
			c = a.horizontal;
		B(n.boxes, (p) => {
			typeof p.beforeLayout == 'function' && p.beforeLayout();
		});
		const h =
				l.reduce((p, m) => (m.box.options && m.box.options.display === !1 ? p : p + 1), 0) || 1,
			d = Object.freeze({
				outerWidth: t,
				outerHeight: e,
				padding: s,
				availableWidth: o,
				availableHeight: r,
				vBoxMaxWidth: o / 2 / h,
				hBoxMaxHeight: r / 2
			}),
			u = Object.assign({}, s);
		Ph(u, ut(i));
		const f = Object.assign({ maxPadding: u, w: o, h: r, x: s.left, y: s.top }, s),
			g = kb(l.concat(c), d);
		(gn(a.fullSize, f, d, g),
			gn(l, f, d, g),
			gn(c, f, d, g) && gn(l, f, d, g),
			Mb(f),
			Ma(a.leftAndTop, f, d, g),
			(f.x += f.w),
			(f.y += f.h),
			Ma(a.rightAndBottom, f, d, g),
			(n.chartArea = {
				left: f.left,
				top: f.top,
				right: f.left + f.w,
				bottom: f.top + f.h,
				height: f.h,
				width: f.w
			}),
			B(a.chartArea, (p) => {
				const m = p.box;
				(Object.assign(m, n.chartArea),
					m.update(f.w, f.h, { left: 0, top: 0, right: 0, bottom: 0 }));
			}));
	}
};
class Dh {
	acquireContext(t, e) {}
	releaseContext(t) {
		return !1;
	}
	addEventListener(t, e, i) {}
	removeEventListener(t, e, i) {}
	getDevicePixelRatio() {
		return 1;
	}
	getMaximumSize(t, e, i, s) {
		return (
			(e = Math.max(0, e || t.width)),
			(i = i || t.height),
			{ width: e, height: Math.max(0, s ? Math.floor(e / s) : i) }
		);
	}
	isAttached(t) {
		return !0;
	}
	updateConfig(t) {}
}
class Db extends Dh {
	acquireContext(t) {
		return (t && t.getContext && t.getContext('2d')) || null;
	}
	updateConfig(t) {
		t.options.animation = !1;
	}
}
const mi = '$chartjs',
	Ab = {
		touchstart: 'mousedown',
		touchmove: 'mousemove',
		touchend: 'mouseup',
		pointerenter: 'mouseenter',
		pointerdown: 'mousedown',
		pointermove: 'mousemove',
		pointerup: 'mouseup',
		pointerleave: 'mouseout',
		pointerout: 'mouseout'
	},
	Pa = (n) => n === null || n === '';
function Rb(n, t) {
	const e = n.style,
		i = n.getAttribute('height'),
		s = n.getAttribute('width');
	if (
		((n[mi] = {
			initial: {
				height: i,
				width: s,
				style: { display: e.display, height: e.height, width: e.width }
			}
		}),
		(e.display = e.display || 'block'),
		(e.boxSizing = e.boxSizing || 'border-box'),
		Pa(s))
	) {
		const o = fa(n, 'width');
		o !== void 0 && (n.width = o);
	}
	if (Pa(i))
		if (n.style.height === '') n.height = n.width / (t || 2);
		else {
			const o = fa(n, 'height');
			o !== void 0 && (n.height = o);
		}
	return n;
}
const Ah = M_ ? { passive: !0 } : !1;
function Ob(n, t, e) {
	n && n.addEventListener(t, e, Ah);
}
function Nb(n, t, e) {
	n && n.canvas && n.canvas.removeEventListener(t, e, Ah);
}
function Lb(n, t) {
	const e = Ab[n.type] || n.type,
		{ x: i, y: s } = me(n, t);
	return { type: e, chart: t, native: n, x: i !== void 0 ? i : null, y: s !== void 0 ? s : null };
}
function zi(n, t) {
	for (const e of n) if (e === t || e.contains(t)) return !0;
}
function Fb(n, t, e) {
	const i = n.canvas,
		s = new MutationObserver((o) => {
			let r = !1;
			for (const a of o) ((r = r || zi(a.addedNodes, i)), (r = r && !zi(a.removedNodes, i)));
			r && e();
		});
	return (s.observe(document, { childList: !0, subtree: !0 }), s);
}
function Bb(n, t, e) {
	const i = n.canvas,
		s = new MutationObserver((o) => {
			let r = !1;
			for (const a of o) ((r = r || zi(a.removedNodes, i)), (r = r && !zi(a.addedNodes, i)));
			r && e();
		});
	return (s.observe(document, { childList: !0, subtree: !0 }), s);
}
const Vn = new Map();
let Da = 0;
function Rh() {
	const n = window.devicePixelRatio;
	n !== Da &&
		((Da = n),
		Vn.forEach((t, e) => {
			e.currentDevicePixelRatio !== n && t();
		}));
}
function Wb(n, t) {
	(Vn.size || window.addEventListener('resize', Rh), Vn.set(n, t));
}
function zb(n) {
	(Vn.delete(n), Vn.size || window.removeEventListener('resize', Rh));
}
function Vb(n, t, e) {
	const i = n.canvas,
		s = i && Qo(i);
	if (!s) return;
	const o = lh((a, l) => {
			const c = s.clientWidth;
			(e(a, l), c < s.clientWidth && e());
		}, window),
		r = new ResizeObserver((a) => {
			const l = a[0],
				c = l.contentRect.width,
				h = l.contentRect.height;
			(c === 0 && h === 0) || o(c, h);
		});
	return (r.observe(s), Wb(n, o), r);
}
function Ts(n, t, e) {
	(e && e.disconnect(), t === 'resize' && zb(n));
}
function Hb(n, t, e) {
	const i = n.canvas,
		s = lh((o) => {
			n.ctx !== null && e(Lb(o, n));
		}, n);
	return (Ob(i, t, s), s);
}
class jb extends Dh {
	acquireContext(t, e) {
		const i = t && t.getContext && t.getContext('2d');
		return i && i.canvas === t ? (Rb(t, e), i) : null;
	}
	releaseContext(t) {
		const e = t.canvas;
		if (!e[mi]) return !1;
		const i = e[mi].initial;
		['height', 'width'].forEach((o) => {
			const r = i[o];
			L(r) ? e.removeAttribute(o) : e.setAttribute(o, r);
		});
		const s = i.style || {};
		return (
			Object.keys(s).forEach((o) => {
				e.style[o] = s[o];
			}),
			(e.width = e.width),
			delete e[mi],
			!0
		);
	}
	addEventListener(t, e, i) {
		this.removeEventListener(t, e);
		const s = t.$proxies || (t.$proxies = {}),
			r = { attach: Fb, detach: Bb, resize: Vb }[e] || Hb;
		s[e] = r(t, e, i);
	}
	removeEventListener(t, e) {
		const i = t.$proxies || (t.$proxies = {}),
			s = i[e];
		if (!s) return;
		((({ attach: Ts, detach: Ts, resize: Ts })[e] || Nb)(t, e, s), (i[e] = void 0));
	}
	getDevicePixelRatio() {
		return window.devicePixelRatio;
	}
	getMaximumSize(t, e, i, s) {
		return I_(t, e, i, s);
	}
	isAttached(t) {
		const e = t && Qo(t);
		return !!(e && e.isConnected);
	}
}
function Ub(n) {
	return !Xo() || (typeof OffscreenCanvas < 'u' && n instanceof OffscreenCanvas) ? Db : jb;
}
class Yt {
	static defaults = {};
	static defaultRoutes = void 0;
	x;
	y;
	active = !1;
	options;
	$animations;
	tooltipPosition(t) {
		const { x: e, y: i } = this.getProps(['x', 'y'], t);
		return { x: e, y: i };
	}
	hasValue() {
		return Ye(this.x) && Ye(this.y);
	}
	getProps(t, e) {
		const i = this.$animations;
		if (!e || !i) return this;
		const s = {};
		return (
			t.forEach((o) => {
				s[o] = i[o] && i[o].active() ? i[o]._to : this[o];
			}),
			s
		);
	}
}
function $b(n, t) {
	const e = n.options.ticks,
		i = Yb(n),
		s = Math.min(e.maxTicksLimit || i, i),
		o = e.major.enabled ? qb(t) : [],
		r = o.length,
		a = o[0],
		l = o[r - 1],
		c = [];
	if (r > s) return (Kb(t, c, o, r / s), c);
	const h = Gb(o, t, s);
	if (r > 0) {
		let d, u;
		const f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
		for (li(t, c, h, L(f) ? 0 : a - f, a), d = 0, u = r - 1; d < u; d++)
			li(t, c, h, o[d], o[d + 1]);
		return (li(t, c, h, l, L(f) ? t.length : l + f), c);
	}
	return (li(t, c, h), c);
}
function Yb(n) {
	const t = n.options.offset,
		e = n._tickSize(),
		i = n._length / e + (t ? 0 : 1),
		s = n._maxLength / e;
	return Math.floor(Math.min(i, s));
}
function Gb(n, t, e) {
	const i = Xb(n),
		s = t.length / e;
	if (!i) return Math.max(s, 1);
	const o = Am(i);
	for (let r = 0, a = o.length - 1; r < a; r++) {
		const l = o[r];
		if (l > s) return l;
	}
	return Math.max(s, 1);
}
function qb(n) {
	const t = [];
	let e, i;
	for (e = 0, i = n.length; e < i; e++) n[e].major && t.push(e);
	return t;
}
function Kb(n, t, e, i) {
	let s = 0,
		o = e[0],
		r;
	for (i = Math.ceil(i), r = 0; r < n.length; r++) r === o && (t.push(n[r]), s++, (o = e[s * i]));
}
function li(n, t, e, i, s) {
	const o = I(i, 0),
		r = Math.min(I(s, n.length), n.length);
	let a = 0,
		l,
		c,
		h;
	for (e = Math.ceil(e), s && ((l = s - i), (e = l / Math.floor(l / e))), h = o; h < 0; )
		(a++, (h = Math.round(o + a * e)));
	for (c = Math.max(o, 0); c < r; c++) c === h && (t.push(n[c]), a++, (h = Math.round(o + a * e)));
}
function Xb(n) {
	const t = n.length;
	let e, i;
	if (t < 2) return !1;
	for (i = n[0], e = 1; e < t; ++e) if (n[e] - n[e - 1] !== i) return !1;
	return i;
}
const Qb = (n) => (n === 'left' ? 'right' : n === 'right' ? 'left' : n),
	Aa = (n, t, e) => (t === 'top' || t === 'left' ? n[t] + e : n[t] - e),
	Ra = (n, t) => Math.min(t || n, n);
function Oa(n, t) {
	const e = [],
		i = n.length / t,
		s = n.length;
	let o = 0;
	for (; o < s; o += i) e.push(n[Math.floor(o)]);
	return e;
}
function Jb(n, t, e) {
	const i = n.ticks.length,
		s = Math.min(t, i - 1),
		o = n._startPixel,
		r = n._endPixel,
		a = 1e-6;
	let l = n.getPixelForTick(s),
		c;
	if (
		!(
			e &&
			(i === 1
				? (c = Math.max(l - o, r - l))
				: t === 0
					? (c = (n.getPixelForTick(1) - l) / 2)
					: (c = (l - n.getPixelForTick(s - 1)) / 2),
			(l += s < t ? c : -c),
			l < o - a || l > r + a)
		)
	)
		return l;
}
function Zb(n, t) {
	B(n, (e) => {
		const i = e.gc,
			s = i.length / 2;
		let o;
		if (s > t) {
			for (o = 0; o < s; ++o) delete e.data[i[o]];
			i.splice(0, s);
		}
	});
}
function hn(n) {
	return n.drawTicks ? n.tickLength : 0;
}
function Na(n, t) {
	if (!n.display) return 0;
	const e = nt(n.font, t),
		i = ut(n.padding);
	return (q(n.text) ? n.text.length : 1) * e.lineHeight + i.height;
}
function ty(n, t) {
	return re(n, { scale: t, type: 'scale' });
}
function ey(n, t, e) {
	return re(n, { tick: e, index: t, type: 'tick' });
}
function ny(n, t, e) {
	let i = Uo(n);
	return (((e && t !== 'right') || (!e && t === 'right')) && (i = Qb(i)), i);
}
function iy(n, t, e, i) {
	const { top: s, left: o, bottom: r, right: a, chart: l } = n,
		{ chartArea: c, scales: h } = l;
	let d = 0,
		u,
		f,
		g;
	const p = r - s,
		m = a - o;
	if (n.isHorizontal()) {
		if (((f = ct(i, o, a)), O(e))) {
			const _ = Object.keys(e)[0],
				b = e[_];
			g = h[_].getPixelForValue(b) + p - t;
		} else e === 'center' ? (g = (c.bottom + c.top) / 2 + p - t) : (g = Aa(n, e, t));
		u = a - o;
	} else {
		if (O(e)) {
			const _ = Object.keys(e)[0],
				b = e[_];
			f = h[_].getPixelForValue(b) - m + t;
		} else e === 'center' ? (f = (c.left + c.right) / 2 - m + t) : (f = Aa(n, e, t));
		((g = ct(i, r, s)), (d = e === 'left' ? -Z : Z));
	}
	return { titleX: f, titleY: g, maxWidth: u, rotation: d };
}
class Pe extends Yt {
	constructor(t) {
		(super(),
			(this.id = t.id),
			(this.type = t.type),
			(this.options = void 0),
			(this.ctx = t.ctx),
			(this.chart = t.chart),
			(this.top = void 0),
			(this.bottom = void 0),
			(this.left = void 0),
			(this.right = void 0),
			(this.width = void 0),
			(this.height = void 0),
			(this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
			(this.maxWidth = void 0),
			(this.maxHeight = void 0),
			(this.paddingTop = void 0),
			(this.paddingBottom = void 0),
			(this.paddingLeft = void 0),
			(this.paddingRight = void 0),
			(this.axis = void 0),
			(this.labelRotation = void 0),
			(this.min = void 0),
			(this.max = void 0),
			(this._range = void 0),
			(this.ticks = []),
			(this._gridLineItems = null),
			(this._labelItems = null),
			(this._labelSizes = null),
			(this._length = 0),
			(this._maxLength = 0),
			(this._longestTextCache = {}),
			(this._startPixel = void 0),
			(this._endPixel = void 0),
			(this._reversePixels = !1),
			(this._userMax = void 0),
			(this._userMin = void 0),
			(this._suggestedMax = void 0),
			(this._suggestedMin = void 0),
			(this._ticksLength = 0),
			(this._borderValue = 0),
			(this._cache = {}),
			(this._dataLimitsCached = !1),
			(this.$context = void 0));
	}
	init(t) {
		((this.options = t.setContext(this.getContext())),
			(this.axis = t.axis),
			(this._userMin = this.parse(t.min)),
			(this._userMax = this.parse(t.max)),
			(this._suggestedMin = this.parse(t.suggestedMin)),
			(this._suggestedMax = this.parse(t.suggestedMax)));
	}
	parse(t, e) {
		return t;
	}
	getUserBounds() {
		let { _userMin: t, _userMax: e, _suggestedMin: i, _suggestedMax: s } = this;
		return (
			(t = xt(t, Number.POSITIVE_INFINITY)),
			(e = xt(e, Number.NEGATIVE_INFINITY)),
			(i = xt(i, Number.POSITIVE_INFINITY)),
			(s = xt(s, Number.NEGATIVE_INFINITY)),
			{ min: xt(t, i), max: xt(e, s), minDefined: Q(t), maxDefined: Q(e) }
		);
	}
	getMinMax(t) {
		let { min: e, max: i, minDefined: s, maxDefined: o } = this.getUserBounds(),
			r;
		if (s && o) return { min: e, max: i };
		const a = this.getMatchingVisibleMetas();
		for (let l = 0, c = a.length; l < c; ++l)
			((r = a[l].controller.getMinMax(this, t)),
				s || (e = Math.min(e, r.min)),
				o || (i = Math.max(i, r.max)));
		return (
			(e = o && e > i ? i : e),
			(i = s && e > i ? e : i),
			{ min: xt(e, xt(i, e)), max: xt(i, xt(e, i)) }
		);
	}
	getPadding() {
		return {
			left: this.paddingLeft || 0,
			top: this.paddingTop || 0,
			right: this.paddingRight || 0,
			bottom: this.paddingBottom || 0
		};
	}
	getTicks() {
		return this.ticks;
	}
	getLabels() {
		const t = this.chart.data;
		return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
	}
	getLabelItems(t = this.chart.chartArea) {
		return this._labelItems || (this._labelItems = this._computeLabelItems(t));
	}
	beforeLayout() {
		((this._cache = {}), (this._dataLimitsCached = !1));
	}
	beforeUpdate() {
		V(this.options.beforeUpdate, [this]);
	}
	update(t, e, i) {
		const { beginAtZero: s, grace: o, ticks: r } = this.options,
			a = r.sampleSize;
		(this.beforeUpdate(),
			(this.maxWidth = t),
			(this.maxHeight = e),
			(this._margins = i = Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
			(this.ticks = null),
			(this._labelSizes = null),
			(this._gridLineItems = null),
			(this._labelItems = null),
			this.beforeSetDimensions(),
			this.setDimensions(),
			this.afterSetDimensions(),
			(this._maxLength = this.isHorizontal()
				? this.width + i.left + i.right
				: this.height + i.top + i.bottom),
			this._dataLimitsCached ||
				(this.beforeDataLimits(),
				this.determineDataLimits(),
				this.afterDataLimits(),
				(this._range = r_(this, o, s)),
				(this._dataLimitsCached = !0)),
			this.beforeBuildTicks(),
			(this.ticks = this.buildTicks() || []),
			this.afterBuildTicks());
		const l = a < this.ticks.length;
		(this._convertTicksToLabels(l ? Oa(this.ticks, a) : this.ticks),
			this.configure(),
			this.beforeCalculateLabelRotation(),
			this.calculateLabelRotation(),
			this.afterCalculateLabelRotation(),
			r.display &&
				(r.autoSkip || r.source === 'auto') &&
				((this.ticks = $b(this, this.ticks)), (this._labelSizes = null), this.afterAutoSkip()),
			l && this._convertTicksToLabels(this.ticks),
			this.beforeFit(),
			this.fit(),
			this.afterFit(),
			this.afterUpdate());
	}
	configure() {
		let t = this.options.reverse,
			e,
			i;
		(this.isHorizontal()
			? ((e = this.left), (i = this.right))
			: ((e = this.top), (i = this.bottom), (t = !t)),
			(this._startPixel = e),
			(this._endPixel = i),
			(this._reversePixels = t),
			(this._length = i - e),
			(this._alignToPixels = this.options.alignToPixels));
	}
	afterUpdate() {
		V(this.options.afterUpdate, [this]);
	}
	beforeSetDimensions() {
		V(this.options.beforeSetDimensions, [this]);
	}
	setDimensions() {
		(this.isHorizontal()
			? ((this.width = this.maxWidth), (this.left = 0), (this.right = this.width))
			: ((this.height = this.maxHeight), (this.top = 0), (this.bottom = this.height)),
			(this.paddingLeft = 0),
			(this.paddingTop = 0),
			(this.paddingRight = 0),
			(this.paddingBottom = 0));
	}
	afterSetDimensions() {
		V(this.options.afterSetDimensions, [this]);
	}
	_callHooks(t) {
		(this.chart.notifyPlugins(t, this.getContext()), V(this.options[t], [this]));
	}
	beforeDataLimits() {
		this._callHooks('beforeDataLimits');
	}
	determineDataLimits() {}
	afterDataLimits() {
		this._callHooks('afterDataLimits');
	}
	beforeBuildTicks() {
		this._callHooks('beforeBuildTicks');
	}
	buildTicks() {
		return [];
	}
	afterBuildTicks() {
		this._callHooks('afterBuildTicks');
	}
	beforeTickToLabelConversion() {
		V(this.options.beforeTickToLabelConversion, [this]);
	}
	generateTickLabels(t) {
		const e = this.options.ticks;
		let i, s, o;
		for (i = 0, s = t.length; i < s; i++)
			((o = t[i]), (o.label = V(e.callback, [o.value, i, t], this)));
	}
	afterTickToLabelConversion() {
		V(this.options.afterTickToLabelConversion, [this]);
	}
	beforeCalculateLabelRotation() {
		V(this.options.beforeCalculateLabelRotation, [this]);
	}
	calculateLabelRotation() {
		const t = this.options,
			e = t.ticks,
			i = Ra(this.ticks.length, t.ticks.maxTicksLimit),
			s = e.minRotation || 0,
			o = e.maxRotation;
		let r = s,
			a,
			l,
			c;
		if (!this._isVisible() || !e.display || s >= o || i <= 1 || !this.isHorizontal()) {
			this.labelRotation = s;
			return;
		}
		const h = this._getLabelSizes(),
			d = h.widest.width,
			u = h.highest.height,
			f = rt(this.chart.width - d, 0, this.maxWidth);
		((a = t.offset ? this.maxWidth / i : f / (i - 1)),
			d + 6 > a &&
				((a = f / (i - (t.offset ? 0.5 : 1))),
				(l = this.maxHeight - hn(t.grid) - e.padding - Na(t.title, this.chart.options.font)),
				(c = Math.sqrt(d * d + u * u)),
				(r = Ho(
					Math.min(
						Math.asin(rt((h.highest.height + 6) / a, -1, 1)),
						Math.asin(rt(l / c, -1, 1)) - Math.asin(rt(u / c, -1, 1))
					)
				)),
				(r = Math.max(s, Math.min(o, r)))),
			(this.labelRotation = r));
	}
	afterCalculateLabelRotation() {
		V(this.options.afterCalculateLabelRotation, [this]);
	}
	afterAutoSkip() {}
	beforeFit() {
		V(this.options.beforeFit, [this]);
	}
	fit() {
		const t = { width: 0, height: 0 },
			{
				chart: e,
				options: { ticks: i, title: s, grid: o }
			} = this,
			r = this._isVisible(),
			a = this.isHorizontal();
		if (r) {
			const l = Na(s, e.options.font);
			if (
				(a
					? ((t.width = this.maxWidth), (t.height = hn(o) + l))
					: ((t.height = this.maxHeight), (t.width = hn(o) + l)),
				i.display && this.ticks.length)
			) {
				const { first: c, last: h, widest: d, highest: u } = this._getLabelSizes(),
					f = i.padding * 2,
					g = Tt(this.labelRotation),
					p = Math.cos(g),
					m = Math.sin(g);
				if (a) {
					const _ = i.mirror ? 0 : m * d.width + p * u.height;
					t.height = Math.min(this.maxHeight, t.height + _ + f);
				} else {
					const _ = i.mirror ? 0 : p * d.width + m * u.height;
					t.width = Math.min(this.maxWidth, t.width + _ + f);
				}
				this._calculatePadding(c, h, m, p);
			}
		}
		(this._handleMargins(),
			a
				? ((this.width = this._length = e.width - this._margins.left - this._margins.right),
					(this.height = t.height))
				: ((this.width = t.width),
					(this.height = this._length = e.height - this._margins.top - this._margins.bottom)));
	}
	_calculatePadding(t, e, i, s) {
		const {
				ticks: { align: o, padding: r },
				position: a
			} = this.options,
			l = this.labelRotation !== 0,
			c = a !== 'top' && this.axis === 'x';
		if (this.isHorizontal()) {
			const h = this.getPixelForTick(0) - this.left,
				d = this.right - this.getPixelForTick(this.ticks.length - 1);
			let u = 0,
				f = 0;
			(l
				? c
					? ((u = s * t.width), (f = i * e.height))
					: ((u = i * t.height), (f = s * e.width))
				: o === 'start'
					? (f = e.width)
					: o === 'end'
						? (u = t.width)
						: o !== 'inner' && ((u = t.width / 2), (f = e.width / 2)),
				(this.paddingLeft = Math.max(((u - h + r) * this.width) / (this.width - h), 0)),
				(this.paddingRight = Math.max(((f - d + r) * this.width) / (this.width - d), 0)));
		} else {
			let h = e.height / 2,
				d = t.height / 2;
			(o === 'start' ? ((h = 0), (d = t.height)) : o === 'end' && ((h = e.height), (d = 0)),
				(this.paddingTop = h + r),
				(this.paddingBottom = d + r));
		}
	}
	_handleMargins() {
		this._margins &&
			((this._margins.left = Math.max(this.paddingLeft, this._margins.left)),
			(this._margins.top = Math.max(this.paddingTop, this._margins.top)),
			(this._margins.right = Math.max(this.paddingRight, this._margins.right)),
			(this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom)));
	}
	afterFit() {
		V(this.options.afterFit, [this]);
	}
	isHorizontal() {
		const { axis: t, position: e } = this.options;
		return e === 'top' || e === 'bottom' || t === 'x';
	}
	isFullSize() {
		return this.options.fullSize;
	}
	_convertTicksToLabels(t) {
		(this.beforeTickToLabelConversion(), this.generateTickLabels(t));
		let e, i;
		for (e = 0, i = t.length; e < i; e++) L(t[e].label) && (t.splice(e, 1), i--, e--);
		this.afterTickToLabelConversion();
	}
	_getLabelSizes() {
		let t = this._labelSizes;
		if (!t) {
			const e = this.options.ticks.sampleSize;
			let i = this.ticks;
			(e < i.length && (i = Oa(i, e)),
				(this._labelSizes = t =
					this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit)));
		}
		return t;
	}
	_computeLabelSizes(t, e, i) {
		const { ctx: s, _longestTextCache: o } = this,
			r = [],
			a = [],
			l = Math.floor(e / Ra(e, i));
		let c = 0,
			h = 0,
			d,
			u,
			f,
			g,
			p,
			m,
			_,
			b,
			x,
			v,
			y;
		for (d = 0; d < e; d += l) {
			if (
				((g = t[d].label),
				(p = this._resolveTickFontOptions(d)),
				(s.font = m = p.string),
				(_ = o[m] = o[m] || { data: {}, gc: [] }),
				(b = p.lineHeight),
				(x = v = 0),
				!L(g) && !q(g))
			)
				((x = Bi(s, _.data, _.gc, x, g)), (v = b));
			else if (q(g))
				for (u = 0, f = g.length; u < f; ++u)
					((y = g[u]), !L(y) && !q(y) && ((x = Bi(s, _.data, _.gc, x, y)), (v += b)));
			(r.push(x), a.push(v), (c = Math.max(x, c)), (h = Math.max(v, h)));
		}
		Zb(o, e);
		const C = r.indexOf(c),
			S = a.indexOf(h),
			E = (k) => ({ width: r[k] || 0, height: a[k] || 0 });
		return { first: E(0), last: E(e - 1), widest: E(C), highest: E(S), widths: r, heights: a };
	}
	getLabelForValue(t) {
		return t;
	}
	getPixelForValue(t, e) {
		return NaN;
	}
	getValueForPixel(t) {}
	getPixelForTick(t) {
		const e = this.ticks;
		return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
	}
	getPixelForDecimal(t) {
		this._reversePixels && (t = 1 - t);
		const e = this._startPixel + t * this._length;
		return Nm(this._alignToPixels ? de(this.chart, e, 0) : e);
	}
	getDecimalForPixel(t) {
		const e = (t - this._startPixel) / this._length;
		return this._reversePixels ? 1 - e : e;
	}
	getBasePixel() {
		return this.getPixelForValue(this.getBaseValue());
	}
	getBaseValue() {
		const { min: t, max: e } = this;
		return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
	}
	getContext(t) {
		const e = this.ticks || [];
		if (t >= 0 && t < e.length) {
			const i = e[t];
			return i.$context || (i.$context = ey(this.getContext(), t, i));
		}
		return this.$context || (this.$context = ty(this.chart.getContext(), this));
	}
	_tickSize() {
		const t = this.options.ticks,
			e = Tt(this.labelRotation),
			i = Math.abs(Math.cos(e)),
			s = Math.abs(Math.sin(e)),
			o = this._getLabelSizes(),
			r = t.autoSkipPadding || 0,
			a = o ? o.widest.width + r : 0,
			l = o ? o.highest.height + r : 0;
		return this.isHorizontal() ? (l * i > a * s ? a / i : l / s) : l * s < a * i ? l / i : a / s;
	}
	_isVisible() {
		const t = this.options.display;
		return t !== 'auto' ? !!t : this.getMatchingVisibleMetas().length > 0;
	}
	_computeGridLineItems(t) {
		const e = this.axis,
			i = this.chart,
			s = this.options,
			{ grid: o, position: r, border: a } = s,
			l = o.offset,
			c = this.isHorizontal(),
			d = this.ticks.length + (l ? 1 : 0),
			u = hn(o),
			f = [],
			g = a.setContext(this.getContext()),
			p = g.display ? g.width : 0,
			m = p / 2,
			_ = function (G) {
				return de(i, G, p);
			};
		let b, x, v, y, C, S, E, k, M, P, N, at;
		if (r === 'top')
			((b = _(this.bottom)),
				(S = this.bottom - u),
				(k = b - m),
				(P = _(t.top) + m),
				(at = t.bottom));
		else if (r === 'bottom')
			((b = _(this.top)), (P = t.top), (at = _(t.bottom) - m), (S = b + m), (k = this.top + u));
		else if (r === 'left')
			((b = _(this.right)), (C = this.right - u), (E = b - m), (M = _(t.left) + m), (N = t.right));
		else if (r === 'right')
			((b = _(this.left)), (M = t.left), (N = _(t.right) - m), (C = b + m), (E = this.left + u));
		else if (e === 'x') {
			if (r === 'center') b = _((t.top + t.bottom) / 2 + 0.5);
			else if (O(r)) {
				const G = Object.keys(r)[0],
					J = r[G];
				b = _(this.chart.scales[G].getPixelForValue(J));
			}
			((P = t.top), (at = t.bottom), (S = b + m), (k = S + u));
		} else if (e === 'y') {
			if (r === 'center') b = _((t.left + t.right) / 2);
			else if (O(r)) {
				const G = Object.keys(r)[0],
					J = r[G];
				b = _(this.chart.scales[G].getPixelForValue(J));
			}
			((C = b - m), (E = C - u), (M = t.left), (N = t.right));
		}
		const yt = I(s.ticks.maxTicksLimit, d),
			W = Math.max(1, Math.ceil(d / yt));
		for (x = 0; x < d; x += W) {
			const G = this.getContext(x),
				J = o.setContext(G),
				Ct = a.setContext(G),
				lt = J.lineWidth,
				De = J.color,
				Jn = Ct.dash || [],
				Ae = Ct.dashOffset,
				tn = J.tickWidth,
				le = J.tickColor,
				en = J.tickBorderDash || [],
				ce = J.tickBorderDashOffset;
			((v = Jb(this, x, l)),
				v !== void 0 &&
					((y = de(i, v, lt)),
					c ? (C = E = M = N = y) : (S = k = P = at = y),
					f.push({
						tx1: C,
						ty1: S,
						tx2: E,
						ty2: k,
						x1: M,
						y1: P,
						x2: N,
						y2: at,
						width: lt,
						color: De,
						borderDash: Jn,
						borderDashOffset: Ae,
						tickWidth: tn,
						tickColor: le,
						tickBorderDash: en,
						tickBorderDashOffset: ce
					})));
		}
		return ((this._ticksLength = d), (this._borderValue = b), f);
	}
	_computeLabelItems(t) {
		const e = this.axis,
			i = this.options,
			{ position: s, ticks: o } = i,
			r = this.isHorizontal(),
			a = this.ticks,
			{ align: l, crossAlign: c, padding: h, mirror: d } = o,
			u = hn(i.grid),
			f = u + h,
			g = d ? -h : f,
			p = -Tt(this.labelRotation),
			m = [];
		let _,
			b,
			x,
			v,
			y,
			C,
			S,
			E,
			k,
			M,
			P,
			N,
			at = 'middle';
		if (s === 'top') ((C = this.bottom - g), (S = this._getXAxisLabelAlignment()));
		else if (s === 'bottom') ((C = this.top + g), (S = this._getXAxisLabelAlignment()));
		else if (s === 'left') {
			const W = this._getYAxisLabelAlignment(u);
			((S = W.textAlign), (y = W.x));
		} else if (s === 'right') {
			const W = this._getYAxisLabelAlignment(u);
			((S = W.textAlign), (y = W.x));
		} else if (e === 'x') {
			if (s === 'center') C = (t.top + t.bottom) / 2 + f;
			else if (O(s)) {
				const W = Object.keys(s)[0],
					G = s[W];
				C = this.chart.scales[W].getPixelForValue(G) + f;
			}
			S = this._getXAxisLabelAlignment();
		} else if (e === 'y') {
			if (s === 'center') y = (t.left + t.right) / 2 - f;
			else if (O(s)) {
				const W = Object.keys(s)[0],
					G = s[W];
				y = this.chart.scales[W].getPixelForValue(G);
			}
			S = this._getYAxisLabelAlignment(u).textAlign;
		}
		e === 'y' && (l === 'start' ? (at = 'top') : l === 'end' && (at = 'bottom'));
		const yt = this._getLabelSizes();
		for (_ = 0, b = a.length; _ < b; ++_) {
			((x = a[_]), (v = x.label));
			const W = o.setContext(this.getContext(_));
			((E = this.getPixelForTick(_) + o.labelOffset),
				(k = this._resolveTickFontOptions(_)),
				(M = k.lineHeight),
				(P = q(v) ? v.length : 1));
			const G = P / 2,
				J = W.color,
				Ct = W.textStrokeColor,
				lt = W.textStrokeWidth;
			let De = S;
			r
				? ((y = E),
					S === 'inner' &&
						(_ === b - 1
							? (De = this.options.reverse ? 'left' : 'right')
							: _ === 0
								? (De = this.options.reverse ? 'right' : 'left')
								: (De = 'center')),
					s === 'top'
						? c === 'near' || p !== 0
							? (N = -P * M + M / 2)
							: c === 'center'
								? (N = -yt.highest.height / 2 - G * M + M)
								: (N = -yt.highest.height + M / 2)
						: c === 'near' || p !== 0
							? (N = M / 2)
							: c === 'center'
								? (N = yt.highest.height / 2 - G * M)
								: (N = yt.highest.height - P * M),
					d && (N *= -1),
					p !== 0 && !W.showLabelBackdrop && (y += (M / 2) * Math.sin(p)))
				: ((C = E), (N = ((1 - P) * M) / 2));
			let Jn;
			if (W.showLabelBackdrop) {
				const Ae = ut(W.backdropPadding),
					tn = yt.heights[_],
					le = yt.widths[_];
				let en = N - Ae.top,
					ce = 0 - Ae.left;
				switch (at) {
					case 'middle':
						en -= tn / 2;
						break;
					case 'bottom':
						en -= tn;
						break;
				}
				switch (S) {
					case 'center':
						ce -= le / 2;
						break;
					case 'right':
						ce -= le;
						break;
					case 'inner':
						_ === b - 1 ? (ce -= le) : _ > 0 && (ce -= le / 2);
						break;
				}
				Jn = {
					left: ce,
					top: en,
					width: le + Ae.width,
					height: tn + Ae.height,
					color: W.backdropColor
				};
			}
			m.push({
				label: v,
				font: k,
				textOffset: N,
				options: {
					rotation: p,
					color: J,
					strokeColor: Ct,
					strokeWidth: lt,
					textAlign: De,
					textBaseline: at,
					translation: [y, C],
					backdrop: Jn
				}
			});
		}
		return m;
	}
	_getXAxisLabelAlignment() {
		const { position: t, ticks: e } = this.options;
		if (-Tt(this.labelRotation)) return t === 'top' ? 'left' : 'right';
		let s = 'center';
		return (
			e.align === 'start'
				? (s = 'left')
				: e.align === 'end'
					? (s = 'right')
					: e.align === 'inner' && (s = 'inner'),
			s
		);
	}
	_getYAxisLabelAlignment(t) {
		const {
				position: e,
				ticks: { crossAlign: i, mirror: s, padding: o }
			} = this.options,
			r = this._getLabelSizes(),
			a = t + o,
			l = r.widest.width;
		let c, h;
		return (
			e === 'left'
				? s
					? ((h = this.right + o),
						i === 'near'
							? (c = 'left')
							: i === 'center'
								? ((c = 'center'), (h += l / 2))
								: ((c = 'right'), (h += l)))
					: ((h = this.right - a),
						i === 'near'
							? (c = 'right')
							: i === 'center'
								? ((c = 'center'), (h -= l / 2))
								: ((c = 'left'), (h = this.left)))
				: e === 'right'
					? s
						? ((h = this.left + o),
							i === 'near'
								? (c = 'right')
								: i === 'center'
									? ((c = 'center'), (h -= l / 2))
									: ((c = 'left'), (h -= l)))
						: ((h = this.left + a),
							i === 'near'
								? (c = 'left')
								: i === 'center'
									? ((c = 'center'), (h += l / 2))
									: ((c = 'right'), (h = this.right)))
					: (c = 'right'),
			{ textAlign: c, x: h }
		);
	}
	_computeLabelArea() {
		if (this.options.ticks.mirror) return;
		const t = this.chart,
			e = this.options.position;
		if (e === 'left' || e === 'right')
			return { top: 0, left: this.left, bottom: t.height, right: this.right };
		if (e === 'top' || e === 'bottom')
			return { top: this.top, left: 0, bottom: this.bottom, right: t.width };
	}
	drawBackground() {
		const {
			ctx: t,
			options: { backgroundColor: e },
			left: i,
			top: s,
			width: o,
			height: r
		} = this;
		e && (t.save(), (t.fillStyle = e), t.fillRect(i, s, o, r), t.restore());
	}
	getLineWidthForValue(t) {
		const e = this.options.grid;
		if (!this._isVisible() || !e.display) return 0;
		const s = this.ticks.findIndex((o) => o.value === t);
		return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0;
	}
	drawGrid(t) {
		const e = this.options.grid,
			i = this.ctx,
			s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
		let o, r;
		const a = (l, c, h) => {
			!h.width ||
				!h.color ||
				(i.save(),
				(i.lineWidth = h.width),
				(i.strokeStyle = h.color),
				i.setLineDash(h.borderDash || []),
				(i.lineDashOffset = h.borderDashOffset),
				i.beginPath(),
				i.moveTo(l.x, l.y),
				i.lineTo(c.x, c.y),
				i.stroke(),
				i.restore());
		};
		if (e.display)
			for (o = 0, r = s.length; o < r; ++o) {
				const l = s[o];
				(e.drawOnChartArea && a({ x: l.x1, y: l.y1 }, { x: l.x2, y: l.y2 }, l),
					e.drawTicks &&
						a(
							{ x: l.tx1, y: l.ty1 },
							{ x: l.tx2, y: l.ty2 },
							{
								color: l.tickColor,
								width: l.tickWidth,
								borderDash: l.tickBorderDash,
								borderDashOffset: l.tickBorderDashOffset
							}
						));
			}
	}
	drawBorder() {
		const {
				chart: t,
				ctx: e,
				options: { border: i, grid: s }
			} = this,
			o = i.setContext(this.getContext()),
			r = i.display ? o.width : 0;
		if (!r) return;
		const a = s.setContext(this.getContext(0)).lineWidth,
			l = this._borderValue;
		let c, h, d, u;
		(this.isHorizontal()
			? ((c = de(t, this.left, r) - r / 2), (h = de(t, this.right, a) + a / 2), (d = u = l))
			: ((d = de(t, this.top, r) - r / 2), (u = de(t, this.bottom, a) + a / 2), (c = h = l)),
			e.save(),
			(e.lineWidth = o.width),
			(e.strokeStyle = o.color),
			e.beginPath(),
			e.moveTo(c, d),
			e.lineTo(h, u),
			e.stroke(),
			e.restore());
	}
	drawLabels(t) {
		if (!this.options.ticks.display) return;
		const i = this.ctx,
			s = this._computeLabelArea();
		s && es(i, s);
		const o = this.getLabelItems(t);
		for (const r of o) {
			const a = r.options,
				l = r.font,
				c = r.label,
				h = r.textOffset;
			Ie(i, c, 0, h, l, a);
		}
		s && ns(i);
	}
	drawTitle() {
		const {
			ctx: t,
			options: { position: e, title: i, reverse: s }
		} = this;
		if (!i.display) return;
		const o = nt(i.font),
			r = ut(i.padding),
			a = i.align;
		let l = o.lineHeight / 2;
		e === 'bottom' || e === 'center' || O(e)
			? ((l += r.bottom), q(i.text) && (l += o.lineHeight * (i.text.length - 1)))
			: (l += r.top);
		const { titleX: c, titleY: h, maxWidth: d, rotation: u } = iy(this, l, e, a);
		Ie(t, i.text, 0, 0, o, {
			color: i.color,
			maxWidth: d,
			rotation: u,
			textAlign: ny(a, e, s),
			textBaseline: 'middle',
			translation: [c, h]
		});
	}
	draw(t) {
		this._isVisible() &&
			(this.drawBackground(),
			this.drawGrid(t),
			this.drawBorder(),
			this.drawTitle(),
			this.drawLabels(t));
	}
	_layers() {
		const t = this.options,
			e = (t.ticks && t.ticks.z) || 0,
			i = I(t.grid && t.grid.z, -1),
			s = I(t.border && t.border.z, 0);
		return !this._isVisible() || this.draw !== Pe.prototype.draw
			? [
					{
						z: e,
						draw: (o) => {
							this.draw(o);
						}
					}
				]
			: [
					{
						z: i,
						draw: (o) => {
							(this.drawBackground(), this.drawGrid(o), this.drawTitle());
						}
					},
					{
						z: s,
						draw: () => {
							this.drawBorder();
						}
					},
					{
						z: e,
						draw: (o) => {
							this.drawLabels(o);
						}
					}
				];
	}
	getMatchingVisibleMetas(t) {
		const e = this.chart.getSortedVisibleDatasetMetas(),
			i = this.axis + 'AxisID',
			s = [];
		let o, r;
		for (o = 0, r = e.length; o < r; ++o) {
			const a = e[o];
			a[i] === this.id && (!t || a.type === t) && s.push(a);
		}
		return s;
	}
	_resolveTickFontOptions(t) {
		const e = this.options.ticks.setContext(this.getContext(t));
		return nt(e.font);
	}
	_maxDigits() {
		const t = this._resolveTickFontOptions(0).lineHeight;
		return (this.isHorizontal() ? this.width : this.height) / t;
	}
}
class ci {
	constructor(t, e, i) {
		((this.type = t), (this.scope = e), (this.override = i), (this.items = Object.create(null)));
	}
	isForType(t) {
		return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
	}
	register(t) {
		const e = Object.getPrototypeOf(t);
		let i;
		ry(e) && (i = this.register(e));
		const s = this.items,
			o = t.id,
			r = this.scope + '.' + o;
		if (!o) throw new Error('class does not have id: ' + t);
		return (o in s || ((s[o] = t), sy(t, r, i), this.override && K.override(t.id, t.overrides)), r);
	}
	get(t) {
		return this.items[t];
	}
	unregister(t) {
		const e = this.items,
			i = t.id,
			s = this.scope;
		(i in e && delete e[i], s && i in K[s] && (delete K[s][i], this.override && delete Te[i]));
	}
}
function sy(n, t, e) {
	const i = Fn(Object.create(null), [e ? K.get(e) : {}, K.get(t), n.defaults]);
	(K.set(t, i),
		n.defaultRoutes && oy(t, n.defaultRoutes),
		n.descriptors && K.describe(t, n.descriptors));
}
function oy(n, t) {
	Object.keys(t).forEach((e) => {
		const i = e.split('.'),
			s = i.pop(),
			o = [n].concat(i).join('.'),
			r = t[e].split('.'),
			a = r.pop(),
			l = r.join('.');
		K.route(o, s, l, a);
	});
}
function ry(n) {
	return 'id' in n && 'defaults' in n;
}
class ay {
	constructor() {
		((this.controllers = new ci(ae, 'datasets', !0)),
			(this.elements = new ci(Yt, 'elements')),
			(this.plugins = new ci(Object, 'plugins')),
			(this.scales = new ci(Pe, 'scales')),
			(this._typedRegistries = [this.controllers, this.scales, this.elements]));
	}
	add(...t) {
		this._each('register', t);
	}
	remove(...t) {
		this._each('unregister', t);
	}
	addControllers(...t) {
		this._each('register', t, this.controllers);
	}
	addElements(...t) {
		this._each('register', t, this.elements);
	}
	addPlugins(...t) {
		this._each('register', t, this.plugins);
	}
	addScales(...t) {
		this._each('register', t, this.scales);
	}
	getController(t) {
		return this._get(t, this.controllers, 'controller');
	}
	getElement(t) {
		return this._get(t, this.elements, 'element');
	}
	getPlugin(t) {
		return this._get(t, this.plugins, 'plugin');
	}
	getScale(t) {
		return this._get(t, this.scales, 'scale');
	}
	removeControllers(...t) {
		this._each('unregister', t, this.controllers);
	}
	removeElements(...t) {
		this._each('unregister', t, this.elements);
	}
	removePlugins(...t) {
		this._each('unregister', t, this.plugins);
	}
	removeScales(...t) {
		this._each('unregister', t, this.scales);
	}
	_each(t, e, i) {
		[...e].forEach((s) => {
			const o = i || this._getRegistryForType(s);
			i || o.isForType(s) || (o === this.plugins && s.id)
				? this._exec(t, o, s)
				: B(s, (r) => {
						const a = i || this._getRegistryForType(r);
						this._exec(t, a, r);
					});
		});
	}
	_exec(t, e, i) {
		const s = Vo(t);
		(V(i['before' + s], [], i), e[t](i), V(i['after' + s], [], i));
	}
	_getRegistryForType(t) {
		for (let e = 0; e < this._typedRegistries.length; e++) {
			const i = this._typedRegistries[e];
			if (i.isForType(t)) return i;
		}
		return this.plugins;
	}
	_get(t, e, i) {
		const s = e.get(t);
		if (s === void 0) throw new Error('"' + t + '" is not a registered ' + i + '.');
		return s;
	}
}
var Pt = new ay();
class ly {
	constructor() {
		this._init = [];
	}
	notify(t, e, i, s) {
		e === 'beforeInit' &&
			((this._init = this._createDescriptors(t, !0)), this._notify(this._init, t, 'install'));
		const o = s ? this._descriptors(t).filter(s) : this._descriptors(t),
			r = this._notify(o, t, e, i);
		return (
			e === 'afterDestroy' &&
				(this._notify(o, t, 'stop'), this._notify(this._init, t, 'uninstall')),
			r
		);
	}
	_notify(t, e, i, s) {
		s = s || {};
		for (const o of t) {
			const r = o.plugin,
				a = r[i],
				l = [e, s, o.options];
			if (V(a, l, r) === !1 && s.cancelable) return !1;
		}
		return !0;
	}
	invalidate() {
		L(this._cache) || ((this._oldCache = this._cache), (this._cache = void 0));
	}
	_descriptors(t) {
		if (this._cache) return this._cache;
		const e = (this._cache = this._createDescriptors(t));
		return (this._notifyStateChanges(t), e);
	}
	_createDescriptors(t, e) {
		const i = t && t.config,
			s = I(i.options && i.options.plugins, {}),
			o = cy(i);
		return s === !1 && !e ? [] : dy(t, o, s, e);
	}
	_notifyStateChanges(t) {
		const e = this._oldCache || [],
			i = this._cache,
			s = (o, r) => o.filter((a) => !r.some((l) => a.plugin.id === l.plugin.id));
		(this._notify(s(e, i), t, 'stop'), this._notify(s(i, e), t, 'start'));
	}
}
function cy(n) {
	const t = {},
		e = [],
		i = Object.keys(Pt.plugins.items);
	for (let o = 0; o < i.length; o++) e.push(Pt.getPlugin(i[o]));
	const s = n.plugins || [];
	for (let o = 0; o < s.length; o++) {
		const r = s[o];
		e.indexOf(r) === -1 && (e.push(r), (t[r.id] = !0));
	}
	return { plugins: e, localIds: t };
}
function hy(n, t) {
	return !t && n === !1 ? null : n === !0 ? {} : n;
}
function dy(n, { plugins: t, localIds: e }, i, s) {
	const o = [],
		r = n.getContext();
	for (const a of t) {
		const l = a.id,
			c = hy(i[l], s);
		c !== null && o.push({ plugin: a, options: uy(n.config, { plugin: a, local: e[l] }, c, r) });
	}
	return o;
}
function uy(n, { plugin: t, local: e }, i, s) {
	const o = n.pluginScopeKeys(t),
		r = n.getOptionScopes(i, o);
	return (
		e && t.defaults && r.push(t.defaults),
		n.createResolver(r, s, [''], { scriptable: !1, indexable: !1, allKeys: !0 })
	);
}
function Js(n, t) {
	const e = K.datasets[n] || {};
	return ((t.datasets || {})[n] || {}).indexAxis || t.indexAxis || e.indexAxis || 'x';
}
function fy(n, t) {
	let e = n;
	return (n === '_index_' ? (e = t) : n === '_value_' && (e = t === 'x' ? 'y' : 'x'), e);
}
function gy(n, t) {
	return n === t ? '_index_' : '_value_';
}
function La(n) {
	if (n === 'x' || n === 'y' || n === 'r') return n;
}
function py(n) {
	if (n === 'top' || n === 'bottom') return 'x';
	if (n === 'left' || n === 'right') return 'y';
}
function Zs(n, ...t) {
	if (La(n)) return n;
	for (const e of t) {
		const i = e.axis || py(e.position) || (n.length > 1 && La(n[0].toLowerCase()));
		if (i) return i;
	}
	throw new Error(
		`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`
	);
}
function Fa(n, t, e) {
	if (e[t + 'AxisID'] === n) return { axis: t };
}
function my(n, t) {
	if (t.data && t.data.datasets) {
		const e = t.data.datasets.filter((i) => i.xAxisID === n || i.yAxisID === n);
		if (e.length) return Fa(n, 'x', e[0]) || Fa(n, 'y', e[0]);
	}
	return {};
}
function _y(n, t) {
	const e = Te[n.type] || { scales: {} },
		i = t.scales || {},
		s = Js(n.type, t),
		o = Object.create(null);
	return (
		Object.keys(i).forEach((r) => {
			const a = i[r];
			if (!O(a)) return console.error(`Invalid scale configuration for scale: ${r}`);
			if (a._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
			const l = Zs(r, a, my(r, n), K.scales[a.type]),
				c = gy(l, s),
				h = e.scales || {};
			o[r] = vn(Object.create(null), [{ axis: l }, a, h[l], h[c]]);
		}),
		n.data.datasets.forEach((r) => {
			const a = r.type || n.type,
				l = r.indexAxis || Js(a, t),
				h = (Te[a] || {}).scales || {};
			Object.keys(h).forEach((d) => {
				const u = fy(d, l),
					f = r[u + 'AxisID'] || u;
				((o[f] = o[f] || Object.create(null)), vn(o[f], [{ axis: u }, i[f], h[d]]));
			});
		}),
		Object.keys(o).forEach((r) => {
			const a = o[r];
			vn(a, [K.scales[a.type], K.scale]);
		}),
		o
	);
}
function Oh(n) {
	const t = n.options || (n.options = {});
	((t.plugins = I(t.plugins, {})), (t.scales = _y(n, t)));
}
function Nh(n) {
	return ((n = n || {}), (n.datasets = n.datasets || []), (n.labels = n.labels || []), n);
}
function by(n) {
	return ((n = n || {}), (n.data = Nh(n.data)), Oh(n), n);
}
const Ba = new Map(),
	Lh = new Set();
function hi(n, t) {
	let e = Ba.get(n);
	return (e || ((e = t()), Ba.set(n, e), Lh.add(e)), e);
}
const dn = (n, t, e) => {
	const i = se(t, e);
	i !== void 0 && n.add(i);
};
class yy {
	constructor(t) {
		((this._config = by(t)), (this._scopeCache = new Map()), (this._resolverCache = new Map()));
	}
	get platform() {
		return this._config.platform;
	}
	get type() {
		return this._config.type;
	}
	set type(t) {
		this._config.type = t;
	}
	get data() {
		return this._config.data;
	}
	set data(t) {
		this._config.data = Nh(t);
	}
	get options() {
		return this._config.options;
	}
	set options(t) {
		this._config.options = t;
	}
	get plugins() {
		return this._config.plugins;
	}
	update() {
		const t = this._config;
		(this.clearCache(), Oh(t));
	}
	clearCache() {
		(this._scopeCache.clear(), this._resolverCache.clear());
	}
	datasetScopeKeys(t) {
		return hi(t, () => [[`datasets.${t}`, '']]);
	}
	datasetAnimationScopeKeys(t, e) {
		return hi(`${t}.transition.${e}`, () => [
			[`datasets.${t}.transitions.${e}`, `transitions.${e}`],
			[`datasets.${t}`, '']
		]);
	}
	datasetElementScopeKeys(t, e) {
		return hi(`${t}-${e}`, () => [
			[`datasets.${t}.elements.${e}`, `datasets.${t}`, `elements.${e}`, '']
		]);
	}
	pluginScopeKeys(t) {
		const e = t.id,
			i = this.type;
		return hi(`${i}-plugin-${e}`, () => [[`plugins.${e}`, ...(t.additionalOptionScopes || [])]]);
	}
	_cachedScopes(t, e) {
		const i = this._scopeCache;
		let s = i.get(t);
		return ((!s || e) && ((s = new Map()), i.set(t, s)), s);
	}
	getOptionScopes(t, e, i) {
		const { options: s, type: o } = this,
			r = this._cachedScopes(t, i),
			a = r.get(e);
		if (a) return a;
		const l = new Set();
		e.forEach((h) => {
			(t && (l.add(t), h.forEach((d) => dn(l, t, d))),
				h.forEach((d) => dn(l, s, d)),
				h.forEach((d) => dn(l, Te[o] || {}, d)),
				h.forEach((d) => dn(l, K, d)),
				h.forEach((d) => dn(l, Xs, d)));
		});
		const c = Array.from(l);
		return (c.length === 0 && c.push(Object.create(null)), Lh.has(e) && r.set(e, c), c);
	}
	chartOptionScopes() {
		const { options: t, type: e } = this;
		return [t, Te[e] || {}, K.datasets[e] || {}, { type: e }, K, Xs];
	}
	resolveNamedOptions(t, e, i, s = ['']) {
		const o = { $shared: !0 },
			{ resolver: r, subPrefixes: a } = Wa(this._resolverCache, t, s);
		let l = r;
		if (vy(r, e)) {
			((o.$shared = !1), (i = oe(i) ? i() : i));
			const c = this.createResolver(t, i, a);
			l = Ge(r, i, c);
		}
		for (const c of e) o[c] = l[c];
		return o;
	}
	createResolver(t, e, i = [''], s) {
		const { resolver: o } = Wa(this._resolverCache, t, i);
		return O(e) ? Ge(o, e, void 0, s) : o;
	}
}
function Wa(n, t, e) {
	let i = n.get(t);
	i || ((i = new Map()), n.set(t, i));
	const s = e.join();
	let o = i.get(s);
	return (
		o ||
			((o = {
				resolver: Go(t, e),
				subPrefixes: e.filter((a) => !a.toLowerCase().includes('hover'))
			}),
			i.set(s, o)),
		o
	);
}
const xy = (n) => O(n) && Object.getOwnPropertyNames(n).some((t) => oe(n[t]));
function vy(n, t) {
	const { isScriptable: e, isIndexable: i } = gh(n);
	for (const s of t) {
		const o = e(s),
			r = i(s),
			a = (r || o) && n[s];
		if ((o && (oe(a) || xy(a))) || (r && q(a))) return !0;
	}
	return !1;
}
var wy = '4.4.7';
const Cy = ['top', 'bottom', 'left', 'right', 'chartArea'];
function za(n, t) {
	return n === 'top' || n === 'bottom' || (Cy.indexOf(n) === -1 && t === 'x');
}
function Va(n, t) {
	return function (e, i) {
		return e[n] === i[n] ? e[t] - i[t] : e[n] - i[n];
	};
}
function Ha(n) {
	const t = n.chart,
		e = t.options.animation;
	(t.notifyPlugins('afterRender'), V(e && e.onComplete, [n], t));
}
function Sy(n) {
	const t = n.chart,
		e = t.options.animation;
	V(e && e.onProgress, [n], t);
}
function Fh(n) {
	return (
		Xo() && typeof n == 'string' ? (n = document.getElementById(n)) : n && n.length && (n = n[0]),
		n && n.canvas && (n = n.canvas),
		n
	);
}
const _i = {},
	ja = (n) => {
		const t = Fh(n);
		return Object.values(_i)
			.filter((e) => e.canvas === t)
			.pop();
	};
function Ey(n, t, e) {
	const i = Object.keys(n);
	for (const s of i) {
		const o = +s;
		if (o >= t) {
			const r = n[s];
			(delete n[s], (e > 0 || o > t) && (n[o + e] = r));
		}
	}
}
function ky(n, t, e, i) {
	return !e || n.type === 'mouseout' ? null : i ? t : n;
}
function di(n, t, e) {
	return n.options.clip ? n[e] : t[e];
}
function Ty(n, t) {
	const { xScale: e, yScale: i } = n;
	return e && i
		? {
				left: di(e, t, 'left'),
				right: di(e, t, 'right'),
				top: di(i, t, 'top'),
				bottom: di(i, t, 'bottom')
			}
		: t;
}
class tr {
	static defaults = K;
	static instances = _i;
	static overrides = Te;
	static registry = Pt;
	static version = wy;
	static getChart = ja;
	static register(...t) {
		(Pt.add(...t), Ua());
	}
	static unregister(...t) {
		(Pt.remove(...t), Ua());
	}
	constructor(t, e) {
		const i = (this.config = new yy(e)),
			s = Fh(t),
			o = ja(s);
		if (o)
			throw new Error(
				"Canvas is already in use. Chart with ID '" +
					o.id +
					"' must be destroyed before the canvas with ID '" +
					o.canvas.id +
					"' can be reused."
			);
		const r = i.createResolver(i.chartOptionScopes(), this.getContext());
		((this.platform = new (i.platform || Ub(s))()), this.platform.updateConfig(i));
		const a = this.platform.acquireContext(s, r.aspectRatio),
			l = a && a.canvas,
			c = l && l.height,
			h = l && l.width;
		if (
			((this.id = Cm()),
			(this.ctx = a),
			(this.canvas = l),
			(this.width = h),
			(this.height = c),
			(this._options = r),
			(this._aspectRatio = this.aspectRatio),
			(this._layers = []),
			(this._metasets = []),
			(this._stacks = void 0),
			(this.boxes = []),
			(this.currentDevicePixelRatio = void 0),
			(this.chartArea = void 0),
			(this._active = []),
			(this._lastEvent = void 0),
			(this._listeners = {}),
			(this._responsiveListeners = void 0),
			(this._sortedMetasets = []),
			(this.scales = {}),
			(this._plugins = new ly()),
			(this.$proxies = {}),
			(this._hiddenIndices = {}),
			(this.attached = !1),
			(this._animationsDisabled = void 0),
			(this.$context = void 0),
			(this._doResize = Wm((d) => this.update(d), r.resizeDelay || 0)),
			(this._dataChanges = []),
			(_i[this.id] = this),
			!a || !l)
		) {
			console.error("Failed to create chart: can't acquire context from the given item");
			return;
		}
		(Ot.listen(this, 'complete', Ha),
			Ot.listen(this, 'progress', Sy),
			this._initialize(),
			this.attached && this.update());
	}
	get aspectRatio() {
		const {
			options: { aspectRatio: t, maintainAspectRatio: e },
			width: i,
			height: s,
			_aspectRatio: o
		} = this;
		return L(t) ? (e && o ? o : s ? i / s : null) : t;
	}
	get data() {
		return this.config.data;
	}
	set data(t) {
		this.config.data = t;
	}
	get options() {
		return this._options;
	}
	set options(t) {
		this.config.options = t;
	}
	get registry() {
		return Pt;
	}
	_initialize() {
		return (
			this.notifyPlugins('beforeInit'),
			this.options.responsive ? this.resize() : ua(this, this.options.devicePixelRatio),
			this.bindEvents(),
			this.notifyPlugins('afterInit'),
			this
		);
	}
	clear() {
		return (ca(this.canvas, this.ctx), this);
	}
	stop() {
		return (Ot.stop(this), this);
	}
	resize(t, e) {
		Ot.running(this) ? (this._resizeBeforeDraw = { width: t, height: e }) : this._resize(t, e);
	}
	_resize(t, e) {
		const i = this.options,
			s = this.canvas,
			o = i.maintainAspectRatio && this.aspectRatio,
			r = this.platform.getMaximumSize(s, t, e, o),
			a = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
			l = this.width ? 'resize' : 'attach';
		((this.width = r.width),
			(this.height = r.height),
			(this._aspectRatio = this.aspectRatio),
			ua(this, a, !0) &&
				(this.notifyPlugins('resize', { size: r }),
				V(i.onResize, [this, r], this),
				this.attached && this._doResize(l) && this.render()));
	}
	ensureScalesHaveIDs() {
		const e = this.options.scales || {};
		B(e, (i, s) => {
			i.id = s;
		});
	}
	buildOrUpdateScales() {
		const t = this.options,
			e = t.scales,
			i = this.scales,
			s = Object.keys(i).reduce((r, a) => ((r[a] = !1), r), {});
		let o = [];
		(e &&
			(o = o.concat(
				Object.keys(e).map((r) => {
					const a = e[r],
						l = Zs(r, a),
						c = l === 'r',
						h = l === 'x';
					return {
						options: a,
						dposition: c ? 'chartArea' : h ? 'bottom' : 'left',
						dtype: c ? 'radialLinear' : h ? 'category' : 'linear'
					};
				})
			)),
			B(o, (r) => {
				const a = r.options,
					l = a.id,
					c = Zs(l, a),
					h = I(a.type, r.dtype);
				((a.position === void 0 || za(a.position, c) !== za(r.dposition)) &&
					(a.position = r.dposition),
					(s[l] = !0));
				let d = null;
				if (l in i && i[l].type === h) d = i[l];
				else {
					const u = Pt.getScale(h);
					((d = new u({ id: l, type: h, ctx: this.ctx, chart: this })), (i[d.id] = d));
				}
				d.init(a, t);
			}),
			B(s, (r, a) => {
				r || delete i[a];
			}),
			B(i, (r) => {
				(dt.configure(this, r, r.options), dt.addBox(this, r));
			}));
	}
	_updateMetasets() {
		const t = this._metasets,
			e = this.data.datasets.length,
			i = t.length;
		if ((t.sort((s, o) => s.index - o.index), i > e)) {
			for (let s = e; s < i; ++s) this._destroyDatasetMeta(s);
			t.splice(e, i - e);
		}
		this._sortedMetasets = t.slice(0).sort(Va('order', 'index'));
	}
	_removeUnreferencedMetasets() {
		const {
			_metasets: t,
			data: { datasets: e }
		} = this;
		(t.length > e.length && delete this._stacks,
			t.forEach((i, s) => {
				e.filter((o) => o === i._dataset).length === 0 && this._destroyDatasetMeta(s);
			}));
	}
	buildOrUpdateControllers() {
		const t = [],
			e = this.data.datasets;
		let i, s;
		for (this._removeUnreferencedMetasets(), i = 0, s = e.length; i < s; i++) {
			const o = e[i];
			let r = this.getDatasetMeta(i);
			const a = o.type || this.config.type;
			if (
				(r.type && r.type !== a && (this._destroyDatasetMeta(i), (r = this.getDatasetMeta(i))),
				(r.type = a),
				(r.indexAxis = o.indexAxis || Js(a, this.options)),
				(r.order = o.order || 0),
				(r.index = i),
				(r.label = '' + o.label),
				(r.visible = this.isDatasetVisible(i)),
				r.controller)
			)
				(r.controller.updateIndex(i), r.controller.linkScales());
			else {
				const l = Pt.getController(a),
					{ datasetElementType: c, dataElementType: h } = K.datasets[a];
				(Object.assign(l, {
					dataElementType: Pt.getElement(h),
					datasetElementType: c && Pt.getElement(c)
				}),
					(r.controller = new l(this, i)),
					t.push(r.controller));
			}
		}
		return (this._updateMetasets(), t);
	}
	_resetElements() {
		B(
			this.data.datasets,
			(t, e) => {
				this.getDatasetMeta(e).controller.reset();
			},
			this
		);
	}
	reset() {
		(this._resetElements(), this.notifyPlugins('reset'));
	}
	update(t) {
		const e = this.config;
		e.update();
		const i = (this._options = e.createResolver(e.chartOptionScopes(), this.getContext())),
			s = (this._animationsDisabled = !i.animation);
		if (
			(this._updateScales(),
			this._checkEventBindings(),
			this._updateHiddenIndices(),
			this._plugins.invalidate(),
			this.notifyPlugins('beforeUpdate', { mode: t, cancelable: !0 }) === !1)
		)
			return;
		const o = this.buildOrUpdateControllers();
		this.notifyPlugins('beforeElementsUpdate');
		let r = 0;
		for (let c = 0, h = this.data.datasets.length; c < h; c++) {
			const { controller: d } = this.getDatasetMeta(c),
				u = !s && o.indexOf(d) === -1;
			(d.buildOrUpdateElements(u), (r = Math.max(+d.getMaxOverflow(), r)));
		}
		((r = this._minPadding = i.layout.autoPadding ? r : 0),
			this._updateLayout(r),
			s ||
				B(o, (c) => {
					c.reset();
				}),
			this._updateDatasets(t),
			this.notifyPlugins('afterUpdate', { mode: t }),
			this._layers.sort(Va('z', '_idx')));
		const { _active: a, _lastEvent: l } = this;
		(l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render());
	}
	_updateScales() {
		(B(this.scales, (t) => {
			dt.removeBox(this, t);
		}),
			this.ensureScalesHaveIDs(),
			this.buildOrUpdateScales());
	}
	_checkEventBindings() {
		const t = this.options,
			e = new Set(Object.keys(this._listeners)),
			i = new Set(t.events);
		(!ta(e, i) || !!this._responsiveListeners !== t.responsive) &&
			(this.unbindEvents(), this.bindEvents());
	}
	_updateHiddenIndices() {
		const { _hiddenIndices: t } = this,
			e = this._getUniformDataChanges() || [];
		for (const { method: i, start: s, count: o } of e) {
			const r = i === '_removeElements' ? -o : o;
			Ey(t, s, r);
		}
	}
	_getUniformDataChanges() {
		const t = this._dataChanges;
		if (!t || !t.length) return;
		this._dataChanges = [];
		const e = this.data.datasets.length,
			i = (o) =>
				new Set(t.filter((r) => r[0] === o).map((r, a) => a + ',' + r.splice(1).join(','))),
			s = i(0);
		for (let o = 1; o < e; o++) if (!ta(s, i(o))) return;
		return Array.from(s)
			.map((o) => o.split(','))
			.map((o) => ({ method: o[1], start: +o[2], count: +o[3] }));
	}
	_updateLayout(t) {
		if (this.notifyPlugins('beforeLayout', { cancelable: !0 }) === !1) return;
		dt.update(this, this.width, this.height, t);
		const e = this.chartArea,
			i = e.width <= 0 || e.height <= 0;
		((this._layers = []),
			B(
				this.boxes,
				(s) => {
					(i && s.position === 'chartArea') ||
						(s.configure && s.configure(), this._layers.push(...s._layers()));
				},
				this
			),
			this._layers.forEach((s, o) => {
				s._idx = o;
			}),
			this.notifyPlugins('afterLayout'));
	}
	_updateDatasets(t) {
		if (this.notifyPlugins('beforeDatasetsUpdate', { mode: t, cancelable: !0 }) !== !1) {
			for (let e = 0, i = this.data.datasets.length; e < i; ++e)
				this.getDatasetMeta(e).controller.configure();
			for (let e = 0, i = this.data.datasets.length; e < i; ++e)
				this._updateDataset(e, oe(t) ? t({ datasetIndex: e }) : t);
			this.notifyPlugins('afterDatasetsUpdate', { mode: t });
		}
	}
	_updateDataset(t, e) {
		const i = this.getDatasetMeta(t),
			s = { meta: i, index: t, mode: e, cancelable: !0 };
		this.notifyPlugins('beforeDatasetUpdate', s) !== !1 &&
			(i.controller._update(e), (s.cancelable = !1), this.notifyPlugins('afterDatasetUpdate', s));
	}
	render() {
		this.notifyPlugins('beforeRender', { cancelable: !0 }) !== !1 &&
			(Ot.has(this)
				? this.attached && !Ot.running(this) && Ot.start(this)
				: (this.draw(), Ha({ chart: this })));
	}
	draw() {
		let t;
		if (this._resizeBeforeDraw) {
			const { width: i, height: s } = this._resizeBeforeDraw;
			((this._resizeBeforeDraw = null), this._resize(i, s));
		}
		if (
			(this.clear(),
			this.width <= 0 ||
				this.height <= 0 ||
				this.notifyPlugins('beforeDraw', { cancelable: !0 }) === !1)
		)
			return;
		const e = this._layers;
		for (t = 0; t < e.length && e[t].z <= 0; ++t) e[t].draw(this.chartArea);
		for (this._drawDatasets(); t < e.length; ++t) e[t].draw(this.chartArea);
		this.notifyPlugins('afterDraw');
	}
	_getSortedDatasetMetas(t) {
		const e = this._sortedMetasets,
			i = [];
		let s, o;
		for (s = 0, o = e.length; s < o; ++s) {
			const r = e[s];
			(!t || r.visible) && i.push(r);
		}
		return i;
	}
	getSortedVisibleDatasetMetas() {
		return this._getSortedDatasetMetas(!0);
	}
	_drawDatasets() {
		if (this.notifyPlugins('beforeDatasetsDraw', { cancelable: !0 }) === !1) return;
		const t = this.getSortedVisibleDatasetMetas();
		for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
		this.notifyPlugins('afterDatasetsDraw');
	}
	_drawDataset(t) {
		const e = this.ctx,
			i = t._clip,
			s = !i.disabled,
			o = Ty(t, this.chartArea),
			r = { meta: t, index: t.index, cancelable: !0 };
		this.notifyPlugins('beforeDatasetDraw', r) !== !1 &&
			(s &&
				es(e, {
					left: i.left === !1 ? 0 : o.left - i.left,
					right: i.right === !1 ? this.width : o.right + i.right,
					top: i.top === !1 ? 0 : o.top - i.top,
					bottom: i.bottom === !1 ? this.height : o.bottom + i.bottom
				}),
			t.controller.draw(),
			s && ns(e),
			(r.cancelable = !1),
			this.notifyPlugins('afterDatasetDraw', r));
	}
	isPointInArea(t) {
		return zt(t, this.chartArea, this._minPadding);
	}
	getElementsAtEventForMode(t, e, i, s) {
		const o = Cb.modes[e];
		return typeof o == 'function' ? o(this, t, i, s) : [];
	}
	getDatasetMeta(t) {
		const e = this.data.datasets[t],
			i = this._metasets;
		let s = i.filter((o) => o && o._dataset === e).pop();
		return (
			s ||
				((s = {
					type: null,
					data: [],
					dataset: null,
					controller: null,
					hidden: null,
					xAxisID: null,
					yAxisID: null,
					order: (e && e.order) || 0,
					index: t,
					_dataset: e,
					_parsed: [],
					_sorted: !1
				}),
				i.push(s)),
			s
		);
	}
	getContext() {
		return this.$context || (this.$context = re(null, { chart: this, type: 'chart' }));
	}
	getVisibleDatasetCount() {
		return this.getSortedVisibleDatasetMetas().length;
	}
	isDatasetVisible(t) {
		const e = this.data.datasets[t];
		if (!e) return !1;
		const i = this.getDatasetMeta(t);
		return typeof i.hidden == 'boolean' ? !i.hidden : !e.hidden;
	}
	setDatasetVisibility(t, e) {
		const i = this.getDatasetMeta(t);
		i.hidden = !e;
	}
	toggleDataVisibility(t) {
		this._hiddenIndices[t] = !this._hiddenIndices[t];
	}
	getDataVisibility(t) {
		return !this._hiddenIndices[t];
	}
	_updateVisibility(t, e, i) {
		const s = i ? 'show' : 'hide',
			o = this.getDatasetMeta(t),
			r = o.controller._resolveAnimations(void 0, s);
		Bn(e)
			? ((o.data[e].hidden = !i), this.update())
			: (this.setDatasetVisibility(t, i),
				r.update(o, { visible: i }),
				this.update((a) => (a.datasetIndex === t ? s : void 0)));
	}
	hide(t, e) {
		this._updateVisibility(t, e, !1);
	}
	show(t, e) {
		this._updateVisibility(t, e, !0);
	}
	_destroyDatasetMeta(t) {
		const e = this._metasets[t];
		(e && e.controller && e.controller._destroy(), delete this._metasets[t]);
	}
	_stop() {
		let t, e;
		for (this.stop(), Ot.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
			this._destroyDatasetMeta(t);
	}
	destroy() {
		this.notifyPlugins('beforeDestroy');
		const { canvas: t, ctx: e } = this;
		(this._stop(),
			this.config.clearCache(),
			t &&
				(this.unbindEvents(),
				ca(t, e),
				this.platform.releaseContext(e),
				(this.canvas = null),
				(this.ctx = null)),
			delete _i[this.id],
			this.notifyPlugins('afterDestroy'));
	}
	toBase64Image(...t) {
		return this.canvas.toDataURL(...t);
	}
	bindEvents() {
		(this.bindUserEvents(),
			this.options.responsive ? this.bindResponsiveEvents() : (this.attached = !0));
	}
	bindUserEvents() {
		const t = this._listeners,
			e = this.platform,
			i = (o, r) => {
				(e.addEventListener(this, o, r), (t[o] = r));
			},
			s = (o, r, a) => {
				((o.offsetX = r), (o.offsetY = a), this._eventHandler(o));
			};
		B(this.options.events, (o) => i(o, s));
	}
	bindResponsiveEvents() {
		this._responsiveListeners || (this._responsiveListeners = {});
		const t = this._responsiveListeners,
			e = this.platform,
			i = (l, c) => {
				(e.addEventListener(this, l, c), (t[l] = c));
			},
			s = (l, c) => {
				t[l] && (e.removeEventListener(this, l, c), delete t[l]);
			},
			o = (l, c) => {
				this.canvas && this.resize(l, c);
			};
		let r;
		const a = () => {
			(s('attach', a), (this.attached = !0), this.resize(), i('resize', o), i('detach', r));
		};
		((r = () => {
			((this.attached = !1), s('resize', o), this._stop(), this._resize(0, 0), i('attach', a));
		}),
			e.isAttached(this.canvas) ? a() : r());
	}
	unbindEvents() {
		(B(this._listeners, (t, e) => {
			this.platform.removeEventListener(this, e, t);
		}),
			(this._listeners = {}),
			B(this._responsiveListeners, (t, e) => {
				this.platform.removeEventListener(this, e, t);
			}),
			(this._responsiveListeners = void 0));
	}
	updateHoverStyle(t, e, i) {
		const s = i ? 'set' : 'remove';
		let o, r, a, l;
		for (
			e === 'dataset' &&
				((o = this.getDatasetMeta(t[0].datasetIndex)),
				o.controller['_' + s + 'DatasetHoverStyle']()),
				a = 0,
				l = t.length;
			a < l;
			++a
		) {
			r = t[a];
			const c = r && this.getDatasetMeta(r.datasetIndex).controller;
			c && c[s + 'HoverStyle'](r.element, r.datasetIndex, r.index);
		}
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(t) {
		const e = this._active || [],
			i = t.map(({ datasetIndex: o, index: r }) => {
				const a = this.getDatasetMeta(o);
				if (!a) throw new Error('No dataset found at index ' + o);
				return { datasetIndex: o, element: a.data[r], index: r };
			});
		!Ni(i, e) && ((this._active = i), (this._lastEvent = null), this._updateHoverStyles(i, e));
	}
	notifyPlugins(t, e, i) {
		return this._plugins.notify(this, t, e, i);
	}
	isPluginEnabled(t) {
		return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
	}
	_updateHoverStyles(t, e, i) {
		const s = this.options.hover,
			o = (l, c) =>
				l.filter((h) => !c.some((d) => h.datasetIndex === d.datasetIndex && h.index === d.index)),
			r = o(e, t),
			a = i ? t : o(t, e);
		(r.length && this.updateHoverStyle(r, s.mode, !1),
			a.length && s.mode && this.updateHoverStyle(a, s.mode, !0));
	}
	_eventHandler(t, e) {
		const i = { event: t, replay: e, cancelable: !0, inChartArea: this.isPointInArea(t) },
			s = (r) => (r.options.events || this.options.events).includes(t.native.type);
		if (this.notifyPlugins('beforeEvent', i, s) === !1) return;
		const o = this._handleEvent(t, e, i.inChartArea);
		return (
			(i.cancelable = !1),
			this.notifyPlugins('afterEvent', i, s),
			(o || i.changed) && this.render(),
			this
		);
	}
	_handleEvent(t, e, i) {
		const { _active: s = [], options: o } = this,
			r = e,
			a = this._getActiveElements(t, s, i, r),
			l = Mm(t),
			c = ky(t, this._lastEvent, i, l);
		i &&
			((this._lastEvent = null),
			V(o.onHover, [t, a, this], this),
			l && V(o.onClick, [t, a, this], this));
		const h = !Ni(a, s);
		return (
			(h || e) && ((this._active = a), this._updateHoverStyles(a, s, e)),
			(this._lastEvent = c),
			h
		);
	}
	_getActiveElements(t, e, i, s) {
		if (t.type === 'mouseout') return [];
		if (!i) return e;
		const o = this.options.hover;
		return this.getElementsAtEventForMode(t, o.mode, o, s);
	}
}
function Ua() {
	return B(tr.instances, (n) => n._plugins.invalidate());
}
function Iy(n, t, e) {
	const { startAngle: i, pixelMargin: s, x: o, y: r, outerRadius: a, innerRadius: l } = t;
	let c = s / a;
	(n.beginPath(),
		n.arc(o, r, a, i - c, e + c),
		l > s ? ((c = s / l), n.arc(o, r, l, e + c, i - c, !0)) : n.arc(o, r, s, e + Z, i - Z),
		n.closePath(),
		n.clip());
}
function My(n) {
	return Yo(n, ['outerStart', 'outerEnd', 'innerStart', 'innerEnd']);
}
function Py(n, t, e, i) {
	const s = My(n.options.borderRadius),
		o = (e - t) / 2,
		r = Math.min(o, (i * t) / 2),
		a = (l) => {
			const c = ((e - Math.min(o, l)) * i) / 2;
			return rt(l, 0, Math.min(o, c));
		};
	return {
		outerStart: a(s.outerStart),
		outerEnd: a(s.outerEnd),
		innerStart: rt(s.innerStart, 0, r),
		innerEnd: rt(s.innerEnd, 0, r)
	};
}
function Ne(n, t, e, i) {
	return { x: e + n * Math.cos(t), y: i + n * Math.sin(t) };
}
function Vi(n, t, e, i, s, o) {
	const { x: r, y: a, startAngle: l, pixelMargin: c, innerRadius: h } = t,
		d = Math.max(t.outerRadius + i + e - c, 0),
		u = h > 0 ? h + i + e + c : 0;
	let f = 0;
	const g = s - l;
	if (i) {
		const W = h > 0 ? h - i : 0,
			G = d > 0 ? d - i : 0,
			J = (W + G) / 2,
			Ct = J !== 0 ? (g * J) / (J + i) : g;
		f = (g - Ct) / 2;
	}
	const p = Math.max(0.001, g * d - e / Y) / d,
		m = (g - p) / 2,
		_ = l + m + f,
		b = s - m - f,
		{ outerStart: x, outerEnd: v, innerStart: y, innerEnd: C } = Py(t, u, d, b - _),
		S = d - x,
		E = d - v,
		k = _ + x / S,
		M = b - v / E,
		P = u + y,
		N = u + C,
		at = _ + y / P,
		yt = b - C / N;
	if ((n.beginPath(), o)) {
		const W = (k + M) / 2;
		if ((n.arc(r, a, d, k, W), n.arc(r, a, d, W, M), v > 0)) {
			const lt = Ne(E, M, r, a);
			n.arc(lt.x, lt.y, v, M, b + Z);
		}
		const G = Ne(N, b, r, a);
		if ((n.lineTo(G.x, G.y), C > 0)) {
			const lt = Ne(N, yt, r, a);
			n.arc(lt.x, lt.y, C, b + Z, yt + Math.PI);
		}
		const J = (b - C / u + (_ + y / u)) / 2;
		if ((n.arc(r, a, u, b - C / u, J, !0), n.arc(r, a, u, J, _ + y / u, !0), y > 0)) {
			const lt = Ne(P, at, r, a);
			n.arc(lt.x, lt.y, y, at + Math.PI, _ - Z);
		}
		const Ct = Ne(S, _, r, a);
		if ((n.lineTo(Ct.x, Ct.y), x > 0)) {
			const lt = Ne(S, k, r, a);
			n.arc(lt.x, lt.y, x, _ - Z, k);
		}
	} else {
		n.moveTo(r, a);
		const W = Math.cos(k) * d + r,
			G = Math.sin(k) * d + a;
		n.lineTo(W, G);
		const J = Math.cos(M) * d + r,
			Ct = Math.sin(M) * d + a;
		n.lineTo(J, Ct);
	}
	n.closePath();
}
function Dy(n, t, e, i, s) {
	const { fullCircles: o, startAngle: r, circumference: a } = t;
	let l = t.endAngle;
	if (o) {
		Vi(n, t, e, i, l, s);
		for (let c = 0; c < o; ++c) n.fill();
		isNaN(a) || (l = r + (a % $ || $));
	}
	return (Vi(n, t, e, i, l, s), n.fill(), l);
}
function Ay(n, t, e, i, s) {
	const { fullCircles: o, startAngle: r, circumference: a, options: l } = t,
		{ borderWidth: c, borderJoinStyle: h, borderDash: d, borderDashOffset: u } = l,
		f = l.borderAlign === 'inner';
	if (!c) return;
	(n.setLineDash(d || []),
		(n.lineDashOffset = u),
		f
			? ((n.lineWidth = c * 2), (n.lineJoin = h || 'round'))
			: ((n.lineWidth = c), (n.lineJoin = h || 'bevel')));
	let g = t.endAngle;
	if (o) {
		Vi(n, t, e, i, g, s);
		for (let p = 0; p < o; ++p) n.stroke();
		isNaN(a) || (g = r + (a % $ || $));
	}
	(f && Iy(n, t, g), o || (Vi(n, t, e, i, g, s), n.stroke()));
}
class Ry extends Yt {
	static id = 'arc';
	static defaults = {
		borderAlign: 'center',
		borderColor: '#fff',
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: void 0,
		borderRadius: 0,
		borderWidth: 2,
		offset: 0,
		spacing: 0,
		angle: void 0,
		circular: !0
	};
	static defaultRoutes = { backgroundColor: 'backgroundColor' };
	static descriptors = { _scriptable: !0, _indexable: (t) => t !== 'borderDash' };
	circumference;
	endAngle;
	fullCircles;
	innerRadius;
	outerRadius;
	pixelMargin;
	startAngle;
	constructor(t) {
		(super(),
			(this.options = void 0),
			(this.circumference = void 0),
			(this.startAngle = void 0),
			(this.endAngle = void 0),
			(this.innerRadius = void 0),
			(this.outerRadius = void 0),
			(this.pixelMargin = 0),
			(this.fullCircles = 0),
			t && Object.assign(this, t));
	}
	inRange(t, e, i) {
		const s = this.getProps(['x', 'y'], i),
			{ angle: o, distance: r } = sh(s, { x: t, y: e }),
			{
				startAngle: a,
				endAngle: l,
				innerRadius: c,
				outerRadius: h,
				circumference: d
			} = this.getProps(
				['startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'],
				i
			),
			u = (this.options.spacing + this.options.borderWidth) / 2,
			f = I(d, l - a),
			g = Wn(o, a, l) && a !== l,
			p = f >= $ || g,
			m = Bt(r, c + u, h + u);
		return p && m;
	}
	getCenterPoint(t) {
		const {
				x: e,
				y: i,
				startAngle: s,
				endAngle: o,
				innerRadius: r,
				outerRadius: a
			} = this.getProps(['x', 'y', 'startAngle', 'endAngle', 'innerRadius', 'outerRadius'], t),
			{ offset: l, spacing: c } = this.options,
			h = (s + o) / 2,
			d = (r + a + c + l) / 2;
		return { x: e + Math.cos(h) * d, y: i + Math.sin(h) * d };
	}
	tooltipPosition(t) {
		return this.getCenterPoint(t);
	}
	draw(t) {
		const { options: e, circumference: i } = this,
			s = (e.offset || 0) / 4,
			o = (e.spacing || 0) / 2,
			r = e.circular;
		if (
			((this.pixelMargin = e.borderAlign === 'inner' ? 0.33 : 0),
			(this.fullCircles = i > $ ? Math.floor(i / $) : 0),
			i === 0 || this.innerRadius < 0 || this.outerRadius < 0)
		)
			return;
		t.save();
		const a = (this.startAngle + this.endAngle) / 2;
		t.translate(Math.cos(a) * s, Math.sin(a) * s);
		const l = 1 - Math.sin(Math.min(Y, i || 0)),
			c = s * l;
		((t.fillStyle = e.backgroundColor),
			(t.strokeStyle = e.borderColor),
			Dy(t, this, c, o, r),
			Ay(t, this, c, o, r),
			t.restore());
	}
}
function Bh(n, t, e = t) {
	((n.lineCap = I(e.borderCapStyle, t.borderCapStyle)),
		n.setLineDash(I(e.borderDash, t.borderDash)),
		(n.lineDashOffset = I(e.borderDashOffset, t.borderDashOffset)),
		(n.lineJoin = I(e.borderJoinStyle, t.borderJoinStyle)),
		(n.lineWidth = I(e.borderWidth, t.borderWidth)),
		(n.strokeStyle = I(e.borderColor, t.borderColor)));
}
function Oy(n, t, e) {
	n.lineTo(e.x, e.y);
}
function Ny(n) {
	return n.stepped ? Qm : n.tension || n.cubicInterpolationMode === 'monotone' ? Jm : Oy;
}
function Wh(n, t, e = {}) {
	const i = n.length,
		{ start: s = 0, end: o = i - 1 } = e,
		{ start: r, end: a } = t,
		l = Math.max(s, r),
		c = Math.min(o, a),
		h = (s < r && o < r) || (s > a && o > a);
	return { count: i, start: l, loop: t.loop, ilen: c < l && !h ? i + c - l : c - l };
}
function Ly(n, t, e, i) {
	const { points: s, options: o } = t,
		{ count: r, start: a, loop: l, ilen: c } = Wh(s, e, i),
		h = Ny(o);
	let { move: d = !0, reverse: u } = i || {},
		f,
		g,
		p;
	for (f = 0; f <= c; ++f)
		((g = s[(a + (u ? c - f : f)) % r]),
			!g.skip && (d ? (n.moveTo(g.x, g.y), (d = !1)) : h(n, p, g, u, o.stepped), (p = g)));
	return (l && ((g = s[(a + (u ? c : 0)) % r]), h(n, p, g, u, o.stepped)), !!l);
}
function Fy(n, t, e, i) {
	const s = t.points,
		{ count: o, start: r, ilen: a } = Wh(s, e, i),
		{ move: l = !0, reverse: c } = i || {};
	let h = 0,
		d = 0,
		u,
		f,
		g,
		p,
		m,
		_;
	const b = (v) => (r + (c ? a - v : v)) % o,
		x = () => {
			p !== m && (n.lineTo(h, m), n.lineTo(h, p), n.lineTo(h, _));
		};
	for (l && ((f = s[b(0)]), n.moveTo(f.x, f.y)), u = 0; u <= a; ++u) {
		if (((f = s[b(u)]), f.skip)) continue;
		const v = f.x,
			y = f.y,
			C = v | 0;
		(C === g
			? (y < p ? (p = y) : y > m && (m = y), (h = (d * h + v) / ++d))
			: (x(), n.lineTo(v, y), (g = C), (d = 0), (p = m = y)),
			(_ = y));
	}
	x();
}
function to(n) {
	const t = n.options,
		e = t.borderDash && t.borderDash.length;
	return !n._decimated &&
		!n._loop &&
		!t.tension &&
		t.cubicInterpolationMode !== 'monotone' &&
		!t.stepped &&
		!e
		? Fy
		: Ly;
}
function By(n) {
	return n.stepped ? P_ : n.tension || n.cubicInterpolationMode === 'monotone' ? D_ : _e;
}
function Wy(n, t, e, i) {
	let s = t._path;
	(s || ((s = t._path = new Path2D()), t.path(s, e, i) && s.closePath()),
		Bh(n, t.options),
		n.stroke(s));
}
function zy(n, t, e, i) {
	const { segments: s, options: o } = t,
		r = to(t);
	for (const a of s)
		(Bh(n, o, a.style),
			n.beginPath(),
			r(n, t, a, { start: e, end: e + i - 1 }) && n.closePath(),
			n.stroke());
}
const Vy = typeof Path2D == 'function';
function Hy(n, t, e, i) {
	Vy && !t.options.segment ? Wy(n, t, e, i) : zy(n, t, e, i);
}
class os extends Yt {
	static id = 'line';
	static defaults = {
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0,
		borderJoinStyle: 'miter',
		borderWidth: 3,
		capBezierPoints: !0,
		cubicInterpolationMode: 'default',
		fill: !1,
		spanGaps: !1,
		stepped: !1,
		tension: 0
	};
	static defaultRoutes = { backgroundColor: 'backgroundColor', borderColor: 'borderColor' };
	static descriptors = { _scriptable: !0, _indexable: (t) => t !== 'borderDash' && t !== 'fill' };
	constructor(t) {
		(super(),
			(this.animated = !0),
			(this.options = void 0),
			(this._chart = void 0),
			(this._loop = void 0),
			(this._fullLoop = void 0),
			(this._path = void 0),
			(this._points = void 0),
			(this._segments = void 0),
			(this._decimated = !1),
			(this._pointsUpdated = !1),
			(this._datasetIndex = void 0),
			t && Object.assign(this, t));
	}
	updateControlPoints(t, e) {
		const i = this.options;
		if (
			(i.tension || i.cubicInterpolationMode === 'monotone') &&
			!i.stepped &&
			!this._pointsUpdated
		) {
			const s = i.spanGaps ? this._loop : this._fullLoop;
			(w_(this._points, i, t, s, e), (this._pointsUpdated = !0));
		}
	}
	set points(t) {
		((this._points = t), delete this._segments, delete this._path, (this._pointsUpdated = !1));
	}
	get points() {
		return this._points;
	}
	get segments() {
		return this._segments || (this._segments = F_(this, this.options.segment));
	}
	first() {
		const t = this.segments,
			e = this.points;
		return t.length && e[t[0].start];
	}
	last() {
		const t = this.segments,
			e = this.points,
			i = t.length;
		return i && e[t[i - 1].end];
	}
	interpolate(t, e) {
		const i = this.options,
			s = t[e],
			o = this.points,
			r = Sh(this, { property: e, start: s, end: s });
		if (!r.length) return;
		const a = [],
			l = By(i);
		let c, h;
		for (c = 0, h = r.length; c < h; ++c) {
			const { start: d, end: u } = r[c],
				f = o[d],
				g = o[u];
			if (f === g) {
				a.push(f);
				continue;
			}
			const p = Math.abs((s - f[e]) / (g[e] - f[e])),
				m = l(f, g, p, i.stepped);
			((m[e] = t[e]), a.push(m));
		}
		return a.length === 1 ? a[0] : a;
	}
	pathSegment(t, e, i) {
		return to(this)(t, this, e, i);
	}
	path(t, e, i) {
		const s = this.segments,
			o = to(this);
		let r = this._loop;
		((e = e || 0), (i = i || this.points.length - e));
		for (const a of s) r &= o(t, this, a, { start: e, end: e + i - 1 });
		return !!r;
	}
	draw(t, e, i, s) {
		const o = this.options || {};
		((this.points || []).length && o.borderWidth && (t.save(), Hy(t, this, i, s), t.restore()),
			this.animated && ((this._pointsUpdated = !1), (this._path = void 0)));
	}
}
function $a(n, t, e, i) {
	const s = n.options,
		{ [e]: o } = n.getProps([e], i);
	return Math.abs(t - o) < s.radius + s.hitRadius;
}
class jy extends Yt {
	static id = 'point';
	parsed;
	skip;
	stop;
	static defaults = {
		borderWidth: 1,
		hitRadius: 1,
		hoverBorderWidth: 1,
		hoverRadius: 4,
		pointStyle: 'circle',
		radius: 3,
		rotation: 0
	};
	static defaultRoutes = { backgroundColor: 'backgroundColor', borderColor: 'borderColor' };
	constructor(t) {
		(super(),
			(this.options = void 0),
			(this.parsed = void 0),
			(this.skip = void 0),
			(this.stop = void 0),
			t && Object.assign(this, t));
	}
	inRange(t, e, i) {
		const s = this.options,
			{ x: o, y: r } = this.getProps(['x', 'y'], i);
		return Math.pow(t - o, 2) + Math.pow(e - r, 2) < Math.pow(s.hitRadius + s.radius, 2);
	}
	inXRange(t, e) {
		return $a(this, t, 'x', e);
	}
	inYRange(t, e) {
		return $a(this, t, 'y', e);
	}
	getCenterPoint(t) {
		const { x: e, y: i } = this.getProps(['x', 'y'], t);
		return { x: e, y: i };
	}
	size(t) {
		t = t || this.options || {};
		let e = t.radius || 0;
		e = Math.max(e, (e && t.hoverRadius) || 0);
		const i = (e && t.borderWidth) || 0;
		return (e + i) * 2;
	}
	draw(t, e) {
		const i = this.options;
		this.skip ||
			i.radius < 0.1 ||
			!zt(this, e, this.size(i) / 2) ||
			((t.strokeStyle = i.borderColor),
			(t.lineWidth = i.borderWidth),
			(t.fillStyle = i.backgroundColor),
			Qs(t, i, this.x, this.y));
	}
	getRange() {
		const t = this.options || {};
		return t.radius + t.hitRadius;
	}
}
function zh(n, t) {
	const {
		x: e,
		y: i,
		base: s,
		width: o,
		height: r
	} = n.getProps(['x', 'y', 'base', 'width', 'height'], t);
	let a, l, c, h, d;
	return (
		n.horizontal
			? ((d = r / 2), (a = Math.min(e, s)), (l = Math.max(e, s)), (c = i - d), (h = i + d))
			: ((d = o / 2), (a = e - d), (l = e + d), (c = Math.min(i, s)), (h = Math.max(i, s))),
		{ left: a, top: c, right: l, bottom: h }
	);
}
function Kt(n, t, e, i) {
	return n ? 0 : rt(t, e, i);
}
function Uy(n, t, e) {
	const i = n.options.borderWidth,
		s = n.borderSkipped,
		o = fh(i);
	return {
		t: Kt(s.top, o.top, 0, e),
		r: Kt(s.right, o.right, 0, t),
		b: Kt(s.bottom, o.bottom, 0, e),
		l: Kt(s.left, o.left, 0, t)
	};
}
function $y(n, t, e) {
	const { enableBorderRadius: i } = n.getProps(['enableBorderRadius']),
		s = n.options.borderRadius,
		o = we(s),
		r = Math.min(t, e),
		a = n.borderSkipped,
		l = i || O(s);
	return {
		topLeft: Kt(!l || a.top || a.left, o.topLeft, 0, r),
		topRight: Kt(!l || a.top || a.right, o.topRight, 0, r),
		bottomLeft: Kt(!l || a.bottom || a.left, o.bottomLeft, 0, r),
		bottomRight: Kt(!l || a.bottom || a.right, o.bottomRight, 0, r)
	};
}
function Yy(n) {
	const t = zh(n),
		e = t.right - t.left,
		i = t.bottom - t.top,
		s = Uy(n, e / 2, i / 2),
		o = $y(n, e / 2, i / 2);
	return {
		outer: { x: t.left, y: t.top, w: e, h: i, radius: o },
		inner: {
			x: t.left + s.l,
			y: t.top + s.t,
			w: e - s.l - s.r,
			h: i - s.t - s.b,
			radius: {
				topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
				topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
				bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
				bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
			}
		}
	};
}
function Is(n, t, e, i) {
	const s = t === null,
		o = e === null,
		a = n && !(s && o) && zh(n, i);
	return a && (s || Bt(t, a.left, a.right)) && (o || Bt(e, a.top, a.bottom));
}
function Gy(n) {
	return n.topLeft || n.topRight || n.bottomLeft || n.bottomRight;
}
function qy(n, t) {
	n.rect(t.x, t.y, t.w, t.h);
}
function Ms(n, t, e = {}) {
	const i = n.x !== e.x ? -t : 0,
		s = n.y !== e.y ? -t : 0,
		o = (n.x + n.w !== e.x + e.w ? t : 0) - i,
		r = (n.y + n.h !== e.y + e.h ? t : 0) - s;
	return { x: n.x + i, y: n.y + s, w: n.w + o, h: n.h + r, radius: n.radius };
}
class Ky extends Yt {
	static id = 'bar';
	static defaults = {
		borderSkipped: 'start',
		borderWidth: 0,
		borderRadius: 0,
		inflateAmount: 'auto',
		pointStyle: void 0
	};
	static defaultRoutes = { backgroundColor: 'backgroundColor', borderColor: 'borderColor' };
	constructor(t) {
		(super(),
			(this.options = void 0),
			(this.horizontal = void 0),
			(this.base = void 0),
			(this.width = void 0),
			(this.height = void 0),
			(this.inflateAmount = void 0),
			t && Object.assign(this, t));
	}
	draw(t) {
		const {
				inflateAmount: e,
				options: { borderColor: i, backgroundColor: s }
			} = this,
			{ inner: o, outer: r } = Yy(this),
			a = Gy(r.radius) ? zn : qy;
		(t.save(),
			(r.w !== o.w || r.h !== o.h) &&
				(t.beginPath(),
				a(t, Ms(r, e, o)),
				t.clip(),
				a(t, Ms(o, -e, r)),
				(t.fillStyle = i),
				t.fill('evenodd')),
			t.beginPath(),
			a(t, Ms(o, e)),
			(t.fillStyle = s),
			t.fill(),
			t.restore());
	}
	inRange(t, e, i) {
		return Is(this, t, e, i);
	}
	inXRange(t, e) {
		return Is(this, t, null, e);
	}
	inYRange(t, e) {
		return Is(this, null, t, e);
	}
	getCenterPoint(t) {
		const {
			x: e,
			y: i,
			base: s,
			horizontal: o
		} = this.getProps(['x', 'y', 'base', 'horizontal'], t);
		return { x: o ? (e + s) / 2 : e, y: o ? i : (i + s) / 2 };
	}
	getRange(t) {
		return t === 'x' ? this.width / 2 : this.height / 2;
	}
}
var Xy = Object.freeze({
	__proto__: null,
	ArcElement: Ry,
	BarElement: Ky,
	LineElement: os,
	PointElement: jy
});
const eo = [
		'rgb(54, 162, 235)',
		'rgb(255, 99, 132)',
		'rgb(255, 159, 64)',
		'rgb(255, 205, 86)',
		'rgb(75, 192, 192)',
		'rgb(153, 102, 255)',
		'rgb(201, 203, 207)'
	],
	Ya = eo.map((n) => n.replace('rgb(', 'rgba(').replace(')', ', 0.5)'));
function Vh(n) {
	return eo[n % eo.length];
}
function Hh(n) {
	return Ya[n % Ya.length];
}
function Qy(n, t) {
	return ((n.borderColor = Vh(t)), (n.backgroundColor = Hh(t)), ++t);
}
function Jy(n, t) {
	return ((n.backgroundColor = n.data.map(() => Vh(t++))), t);
}
function Zy(n, t) {
	return ((n.backgroundColor = n.data.map(() => Hh(t++))), t);
}
function tx(n) {
	let t = 0;
	return (e, i) => {
		const s = n.getDatasetMeta(i).controller;
		s instanceof Jo ? (t = Jy(e, t)) : s instanceof Ih ? (t = Zy(e, t)) : s && (t = Qy(e, t));
	};
}
function Ga(n) {
	let t;
	for (t in n) if (n[t].borderColor || n[t].backgroundColor) return !0;
	return !1;
}
function ex(n) {
	return n && (n.borderColor || n.backgroundColor);
}
function nx() {
	return K.borderColor !== 'rgba(0,0,0,0.1)' || K.backgroundColor !== 'rgba(0,0,0,0.1)';
}
var ix = {
	id: 'colors',
	defaults: { enabled: !0, forceOverride: !1 },
	beforeLayout(n, t, e) {
		if (!e.enabled) return;
		const {
				data: { datasets: i },
				options: s
			} = n.config,
			{ elements: o } = s,
			r = Ga(i) || ex(s) || (o && Ga(o)) || nx();
		if (!e.forceOverride && r) return;
		const a = tx(n);
		i.forEach(a);
	}
};
function sx(n, t, e, i, s) {
	const o = s.samples || i;
	if (o >= e) return n.slice(t, t + e);
	const r = [],
		a = (e - 2) / (o - 2);
	let l = 0;
	const c = t + e - 1;
	let h = t,
		d,
		u,
		f,
		g,
		p;
	for (r[l++] = n[h], d = 0; d < o - 2; d++) {
		let m = 0,
			_ = 0,
			b;
		const x = Math.floor((d + 1) * a) + 1 + t,
			v = Math.min(Math.floor((d + 2) * a) + 1, e) + t,
			y = v - x;
		for (b = x; b < v; b++) ((m += n[b].x), (_ += n[b].y));
		((m /= y), (_ /= y));
		const C = Math.floor(d * a) + 1 + t,
			S = Math.min(Math.floor((d + 1) * a) + 1, e) + t,
			{ x: E, y: k } = n[h];
		for (f = g = -1, b = C; b < S; b++)
			((g = 0.5 * Math.abs((E - m) * (n[b].y - k) - (E - n[b].x) * (_ - k))),
				g > f && ((f = g), (u = n[b]), (p = b)));
		((r[l++] = u), (h = p));
	}
	return ((r[l++] = n[c]), r);
}
function ox(n, t, e, i) {
	let s = 0,
		o = 0,
		r,
		a,
		l,
		c,
		h,
		d,
		u,
		f,
		g,
		p;
	const m = [],
		_ = t + e - 1,
		b = n[t].x,
		v = n[_].x - b;
	for (r = t; r < t + e; ++r) {
		((a = n[r]), (l = ((a.x - b) / v) * i), (c = a.y));
		const y = l | 0;
		if (y === h)
			(c < g ? ((g = c), (d = r)) : c > p && ((p = c), (u = r)), (s = (o * s + a.x) / ++o));
		else {
			const C = r - 1;
			if (!L(d) && !L(u)) {
				const S = Math.min(d, u),
					E = Math.max(d, u);
				(S !== f && S !== C && m.push({ ...n[S], x: s }),
					E !== f && E !== C && m.push({ ...n[E], x: s }));
			}
			(r > 0 && C !== f && m.push(n[C]), m.push(a), (h = y), (o = 0), (g = p = c), (d = u = f = r));
		}
	}
	return m;
}
function jh(n) {
	if (n._decimated) {
		const t = n._data;
		(delete n._decimated,
			delete n._data,
			Object.defineProperty(n, 'data', {
				configurable: !0,
				enumerable: !0,
				writable: !0,
				value: t
			}));
	}
}
function qa(n) {
	n.data.datasets.forEach((t) => {
		jh(t);
	});
}
function rx(n, t) {
	const e = t.length;
	let i = 0,
		s;
	const { iScale: o } = n,
		{ min: r, max: a, minDefined: l, maxDefined: c } = o.getUserBounds();
	return (
		l && (i = rt(Wt(t, o.axis, r).lo, 0, e - 1)),
		c ? (s = rt(Wt(t, o.axis, a).hi + 1, i, e) - i) : (s = e - i),
		{ start: i, count: s }
	);
}
var ax = {
	id: 'decimation',
	defaults: { algorithm: 'min-max', enabled: !1 },
	beforeElementsUpdate: (n, t, e) => {
		if (!e.enabled) {
			qa(n);
			return;
		}
		const i = n.width;
		n.data.datasets.forEach((s, o) => {
			const { _data: r, indexAxis: a } = s,
				l = n.getDatasetMeta(o),
				c = r || s.data;
			if (fn([a, n.options.indexAxis]) === 'y' || !l.controller.supportsDecimation) return;
			const h = n.scales[l.xAxisID];
			if ((h.type !== 'linear' && h.type !== 'time') || n.options.parsing) return;
			let { start: d, count: u } = rx(l, c);
			const f = e.threshold || 4 * i;
			if (u <= f) {
				jh(s);
				return;
			}
			L(r) &&
				((s._data = c),
				delete s.data,
				Object.defineProperty(s, 'data', {
					configurable: !0,
					enumerable: !0,
					get: function () {
						return this._decimated;
					},
					set: function (p) {
						this._data = p;
					}
				}));
			let g;
			switch (e.algorithm) {
				case 'lttb':
					g = sx(c, d, u, i, e);
					break;
				case 'min-max':
					g = ox(c, d, u, i);
					break;
				default:
					throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`);
			}
			s._decimated = g;
		});
	},
	destroy(n) {
		qa(n);
	}
};
function lx(n, t, e) {
	const i = n.segments,
		s = n.points,
		o = t.points,
		r = [];
	for (const a of i) {
		let { start: l, end: c } = a;
		c = er(l, c, s);
		const h = no(e, s[l], s[c], a.loop);
		if (!t.segments) {
			r.push({ source: a, target: h, start: s[l], end: s[c] });
			continue;
		}
		const d = Sh(t, h);
		for (const u of d) {
			const f = no(e, o[u.start], o[u.end], u.loop),
				g = Ch(a, s, f);
			for (const p of g)
				r.push({
					source: p,
					target: u,
					start: { [e]: Ka(h, f, 'start', Math.max) },
					end: { [e]: Ka(h, f, 'end', Math.min) }
				});
		}
	}
	return r;
}
function no(n, t, e, i) {
	if (i) return;
	let s = t[n],
		o = e[n];
	return (n === 'angle' && ((s = vt(s)), (o = vt(o))), { property: n, start: s, end: o });
}
function cx(n, t) {
	const { x: e = null, y: i = null } = n || {},
		s = t.points,
		o = [];
	return (
		t.segments.forEach(({ start: r, end: a }) => {
			a = er(r, a, s);
			const l = s[r],
				c = s[a];
			i !== null
				? (o.push({ x: l.x, y: i }), o.push({ x: c.x, y: i }))
				: e !== null && (o.push({ x: e, y: l.y }), o.push({ x: e, y: c.y }));
		}),
		o
	);
}
function er(n, t, e) {
	for (; t > n; t--) {
		const i = e[t];
		if (!isNaN(i.x) && !isNaN(i.y)) break;
	}
	return t;
}
function Ka(n, t, e, i) {
	return n && t ? i(n[e], t[e]) : n ? n[e] : t ? t[e] : 0;
}
function Uh(n, t) {
	let e = [],
		i = !1;
	return (
		q(n) ? ((i = !0), (e = n)) : (e = cx(n, t)),
		e.length ? new os({ points: e, options: { tension: 0 }, _loop: i, _fullLoop: i }) : null
	);
}
function Xa(n) {
	return n && n.fill !== !1;
}
function hx(n, t, e) {
	let s = n[t].fill;
	const o = [t];
	let r;
	if (!e) return s;
	for (; s !== !1 && o.indexOf(s) === -1; ) {
		if (!Q(s)) return s;
		if (((r = n[s]), !r)) return !1;
		if (r.visible) return s;
		(o.push(s), (s = r.fill));
	}
	return !1;
}
function dx(n, t, e) {
	const i = px(n);
	if (O(i)) return isNaN(i.value) ? !1 : i;
	let s = parseFloat(i);
	return Q(s) && Math.floor(s) === s
		? ux(i[0], t, s, e)
		: ['origin', 'start', 'end', 'stack', 'shape'].indexOf(i) >= 0 && i;
}
function ux(n, t, e, i) {
	return ((n === '-' || n === '+') && (e = t + e), e === t || e < 0 || e >= i ? !1 : e);
}
function fx(n, t) {
	let e = null;
	return (
		n === 'start'
			? (e = t.bottom)
			: n === 'end'
				? (e = t.top)
				: O(n)
					? (e = t.getPixelForValue(n.value))
					: t.getBasePixel && (e = t.getBasePixel()),
		e
	);
}
function gx(n, t, e) {
	let i;
	return (
		n === 'start'
			? (i = e)
			: n === 'end'
				? (i = t.options.reverse ? t.min : t.max)
				: O(n)
					? (i = n.value)
					: (i = t.getBaseValue()),
		i
	);
}
function px(n) {
	const t = n.options,
		e = t.fill;
	let i = I(e && e.target, e);
	return (
		i === void 0 && (i = !!t.backgroundColor),
		i === !1 || i === null ? !1 : i === !0 ? 'origin' : i
	);
}
function mx(n) {
	const { scale: t, index: e, line: i } = n,
		s = [],
		o = i.segments,
		r = i.points,
		a = _x(t, e);
	a.push(Uh({ x: null, y: t.bottom }, i));
	for (let l = 0; l < o.length; l++) {
		const c = o[l];
		for (let h = c.start; h <= c.end; h++) bx(s, r[h], a);
	}
	return new os({ points: s, options: {} });
}
function _x(n, t) {
	const e = [],
		i = n.getMatchingVisibleMetas('line');
	for (let s = 0; s < i.length; s++) {
		const o = i[s];
		if (o.index === t) break;
		o.hidden || e.unshift(o.dataset);
	}
	return e;
}
function bx(n, t, e) {
	const i = [];
	for (let s = 0; s < e.length; s++) {
		const o = e[s],
			{ first: r, last: a, point: l } = yx(o, t, 'x');
		if (!(!l || (r && a))) {
			if (r) i.unshift(l);
			else if ((n.push(l), !a)) break;
		}
	}
	n.push(...i);
}
function yx(n, t, e) {
	const i = n.interpolate(t, e);
	if (!i) return {};
	const s = i[e],
		o = n.segments,
		r = n.points;
	let a = !1,
		l = !1;
	for (let c = 0; c < o.length; c++) {
		const h = o[c],
			d = r[h.start][e],
			u = r[h.end][e];
		if (Bt(s, d, u)) {
			((a = s === d), (l = s === u));
			break;
		}
	}
	return { first: a, last: l, point: i };
}
class $h {
	constructor(t) {
		((this.x = t.x), (this.y = t.y), (this.radius = t.radius));
	}
	pathSegment(t, e, i) {
		const { x: s, y: o, radius: r } = this;
		return ((e = e || { start: 0, end: $ }), t.arc(s, o, r, e.end, e.start, !0), !i.bounds);
	}
	interpolate(t) {
		const { x: e, y: i, radius: s } = this,
			o = t.angle;
		return { x: e + Math.cos(o) * s, y: i + Math.sin(o) * s, angle: o };
	}
}
function xx(n) {
	const { chart: t, fill: e, line: i } = n;
	if (Q(e)) return vx(t, e);
	if (e === 'stack') return mx(n);
	if (e === 'shape') return !0;
	const s = wx(n);
	return s instanceof $h ? s : Uh(s, i);
}
function vx(n, t) {
	const e = n.getDatasetMeta(t);
	return e && n.isDatasetVisible(t) ? e.dataset : null;
}
function wx(n) {
	return (n.scale || {}).getPointPositionForValue ? Sx(n) : Cx(n);
}
function Cx(n) {
	const { scale: t = {}, fill: e } = n,
		i = fx(e, t);
	if (Q(i)) {
		const s = t.isHorizontal();
		return { x: s ? i : null, y: s ? null : i };
	}
	return null;
}
function Sx(n) {
	const { scale: t, fill: e } = n,
		i = t.options,
		s = t.getLabels().length,
		o = i.reverse ? t.max : t.min,
		r = gx(e, t, o),
		a = [];
	if (i.grid.circular) {
		const l = t.getPointPositionForValue(0, o);
		return new $h({ x: l.x, y: l.y, radius: t.getDistanceFromCenterForValue(r) });
	}
	for (let l = 0; l < s; ++l) a.push(t.getPointPositionForValue(l, r));
	return a;
}
function Ps(n, t, e) {
	const i = xx(t),
		{ line: s, scale: o, axis: r } = t,
		a = s.options,
		l = a.fill,
		c = a.backgroundColor,
		{ above: h = c, below: d = c } = l || {};
	i &&
		s.points.length &&
		(es(n, e),
		Ex(n, { line: s, target: i, above: h, below: d, area: e, scale: o, axis: r }),
		ns(n));
}
function Ex(n, t) {
	const { line: e, target: i, above: s, below: o, area: r, scale: a } = t,
		l = e._loop ? 'angle' : t.axis;
	(n.save(),
		l === 'x' &&
			o !== s &&
			(Qa(n, i, r.top),
			Ja(n, { line: e, target: i, color: s, scale: a, property: l }),
			n.restore(),
			n.save(),
			Qa(n, i, r.bottom)),
		Ja(n, { line: e, target: i, color: o, scale: a, property: l }),
		n.restore());
}
function Qa(n, t, e) {
	const { segments: i, points: s } = t;
	let o = !0,
		r = !1;
	n.beginPath();
	for (const a of i) {
		const { start: l, end: c } = a,
			h = s[l],
			d = s[er(l, c, s)];
		(o ? (n.moveTo(h.x, h.y), (o = !1)) : (n.lineTo(h.x, e), n.lineTo(h.x, h.y)),
			(r = !!t.pathSegment(n, a, { move: r })),
			r ? n.closePath() : n.lineTo(d.x, e));
	}
	(n.lineTo(t.first().x, e), n.closePath(), n.clip());
}
function Ja(n, t) {
	const { line: e, target: i, property: s, color: o, scale: r } = t,
		a = lx(e, i, s);
	for (const { source: l, target: c, start: h, end: d } of a) {
		const { style: { backgroundColor: u = o } = {} } = l,
			f = i !== !0;
		(n.save(), (n.fillStyle = u), kx(n, r, f && no(s, h, d)), n.beginPath());
		const g = !!e.pathSegment(n, l);
		let p;
		if (f) {
			g ? n.closePath() : Za(n, i, d, s);
			const m = !!i.pathSegment(n, c, { move: g, reverse: !0 });
			((p = g && m), p || Za(n, i, h, s));
		}
		(n.closePath(), n.fill(p ? 'evenodd' : 'nonzero'), n.restore());
	}
}
function kx(n, t, e) {
	const { top: i, bottom: s } = t.chart.chartArea,
		{ property: o, start: r, end: a } = e || {};
	o === 'x' && (n.beginPath(), n.rect(r, i, a - r, s - i), n.clip());
}
function Za(n, t, e, i) {
	const s = t.interpolate(e, i);
	s && n.lineTo(s.x, s.y);
}
var Tx = {
	id: 'filler',
	afterDatasetsUpdate(n, t, e) {
		const i = (n.data.datasets || []).length,
			s = [];
		let o, r, a, l;
		for (r = 0; r < i; ++r)
			((o = n.getDatasetMeta(r)),
				(a = o.dataset),
				(l = null),
				a &&
					a.options &&
					a instanceof os &&
					(l = {
						visible: n.isDatasetVisible(r),
						index: r,
						fill: dx(a, r, i),
						chart: n,
						axis: o.controller.options.indexAxis,
						scale: o.vScale,
						line: a
					}),
				(o.$filler = l),
				s.push(l));
		for (r = 0; r < i; ++r)
			((l = s[r]), !(!l || l.fill === !1) && (l.fill = hx(s, r, e.propagate)));
	},
	beforeDraw(n, t, e) {
		const i = e.drawTime === 'beforeDraw',
			s = n.getSortedVisibleDatasetMetas(),
			o = n.chartArea;
		for (let r = s.length - 1; r >= 0; --r) {
			const a = s[r].$filler;
			a && (a.line.updateControlPoints(o, a.axis), i && a.fill && Ps(n.ctx, a, o));
		}
	},
	beforeDatasetsDraw(n, t, e) {
		if (e.drawTime !== 'beforeDatasetsDraw') return;
		const i = n.getSortedVisibleDatasetMetas();
		for (let s = i.length - 1; s >= 0; --s) {
			const o = i[s].$filler;
			Xa(o) && Ps(n.ctx, o, n.chartArea);
		}
	},
	beforeDatasetDraw(n, t, e) {
		const i = t.meta.$filler;
		!Xa(i) || e.drawTime !== 'beforeDatasetDraw' || Ps(n.ctx, i, n.chartArea);
	},
	defaults: { propagate: !0, drawTime: 'beforeDatasetDraw' }
};
const tl = (n, t) => {
		let { boxHeight: e = t, boxWidth: i = t } = n;
		return (
			n.usePointStyle && ((e = Math.min(e, t)), (i = n.pointStyleWidth || Math.min(i, t))),
			{ boxWidth: i, boxHeight: e, itemHeight: Math.max(t, e) }
		);
	},
	Ix = (n, t) =>
		n !== null && t !== null && n.datasetIndex === t.datasetIndex && n.index === t.index;
class el extends Yt {
	constructor(t) {
		(super(),
			(this._added = !1),
			(this.legendHitBoxes = []),
			(this._hoveredItem = null),
			(this.doughnutMode = !1),
			(this.chart = t.chart),
			(this.options = t.options),
			(this.ctx = t.ctx),
			(this.legendItems = void 0),
			(this.columnSizes = void 0),
			(this.lineWidths = void 0),
			(this.maxHeight = void 0),
			(this.maxWidth = void 0),
			(this.top = void 0),
			(this.bottom = void 0),
			(this.left = void 0),
			(this.right = void 0),
			(this.height = void 0),
			(this.width = void 0),
			(this._margins = void 0),
			(this.position = void 0),
			(this.weight = void 0),
			(this.fullSize = void 0));
	}
	update(t, e, i) {
		((this.maxWidth = t),
			(this.maxHeight = e),
			(this._margins = i),
			this.setDimensions(),
			this.buildLabels(),
			this.fit());
	}
	setDimensions() {
		this.isHorizontal()
			? ((this.width = this.maxWidth), (this.left = this._margins.left), (this.right = this.width))
			: ((this.height = this.maxHeight),
				(this.top = this._margins.top),
				(this.bottom = this.height));
	}
	buildLabels() {
		const t = this.options.labels || {};
		let e = V(t.generateLabels, [this.chart], this) || [];
		(t.filter && (e = e.filter((i) => t.filter(i, this.chart.data))),
			t.sort && (e = e.sort((i, s) => t.sort(i, s, this.chart.data))),
			this.options.reverse && e.reverse(),
			(this.legendItems = e));
	}
	fit() {
		const { options: t, ctx: e } = this;
		if (!t.display) {
			this.width = this.height = 0;
			return;
		}
		const i = t.labels,
			s = nt(i.font),
			o = s.size,
			r = this._computeTitleHeight(),
			{ boxWidth: a, itemHeight: l } = tl(i, o);
		let c, h;
		((e.font = s.string),
			this.isHorizontal()
				? ((c = this.maxWidth), (h = this._fitRows(r, o, a, l) + 10))
				: ((h = this.maxHeight), (c = this._fitCols(r, s, a, l) + 10)),
			(this.width = Math.min(c, t.maxWidth || this.maxWidth)),
			(this.height = Math.min(h, t.maxHeight || this.maxHeight)));
	}
	_fitRows(t, e, i, s) {
		const {
				ctx: o,
				maxWidth: r,
				options: {
					labels: { padding: a }
				}
			} = this,
			l = (this.legendHitBoxes = []),
			c = (this.lineWidths = [0]),
			h = s + a;
		let d = t;
		((o.textAlign = 'left'), (o.textBaseline = 'middle'));
		let u = -1,
			f = -h;
		return (
			this.legendItems.forEach((g, p) => {
				const m = i + e / 2 + o.measureText(g.text).width;
				((p === 0 || c[c.length - 1] + m + 2 * a > r) &&
					((d += h), (c[c.length - (p > 0 ? 0 : 1)] = 0), (f += h), u++),
					(l[p] = { left: 0, top: f, row: u, width: m, height: s }),
					(c[c.length - 1] += m + a));
			}),
			d
		);
	}
	_fitCols(t, e, i, s) {
		const {
				ctx: o,
				maxHeight: r,
				options: {
					labels: { padding: a }
				}
			} = this,
			l = (this.legendHitBoxes = []),
			c = (this.columnSizes = []),
			h = r - t;
		let d = a,
			u = 0,
			f = 0,
			g = 0,
			p = 0;
		return (
			this.legendItems.forEach((m, _) => {
				const { itemWidth: b, itemHeight: x } = Mx(i, e, o, m, s);
				(_ > 0 &&
					f + x + 2 * a > h &&
					((d += u + a), c.push({ width: u, height: f }), (g += u + a), p++, (u = f = 0)),
					(l[_] = { left: g, top: f, col: p, width: b, height: x }),
					(u = Math.max(u, b)),
					(f += x + a));
			}),
			(d += u),
			c.push({ width: u, height: f }),
			d
		);
	}
	adjustHitBoxes() {
		if (!this.options.display) return;
		const t = this._computeTitleHeight(),
			{
				legendHitBoxes: e,
				options: {
					align: i,
					labels: { padding: s },
					rtl: o
				}
			} = this,
			r = Ve(o, this.left, this.width);
		if (this.isHorizontal()) {
			let a = 0,
				l = ct(i, this.left + s, this.right - this.lineWidths[a]);
			for (const c of e)
				(a !== c.row && ((a = c.row), (l = ct(i, this.left + s, this.right - this.lineWidths[a]))),
					(c.top += this.top + t + s),
					(c.left = r.leftForLtr(r.x(l), c.width)),
					(l += c.width + s));
		} else {
			let a = 0,
				l = ct(i, this.top + t + s, this.bottom - this.columnSizes[a].height);
			for (const c of e)
				(c.col !== a &&
					((a = c.col), (l = ct(i, this.top + t + s, this.bottom - this.columnSizes[a].height))),
					(c.top = l),
					(c.left += this.left + s),
					(c.left = r.leftForLtr(r.x(c.left), c.width)),
					(l += c.height + s));
		}
	}
	isHorizontal() {
		return this.options.position === 'top' || this.options.position === 'bottom';
	}
	draw() {
		if (this.options.display) {
			const t = this.ctx;
			(es(t, this), this._draw(), ns(t));
		}
	}
	_draw() {
		const { options: t, columnSizes: e, lineWidths: i, ctx: s } = this,
			{ align: o, labels: r } = t,
			a = K.color,
			l = Ve(t.rtl, this.left, this.width),
			c = nt(r.font),
			{ padding: h } = r,
			d = c.size,
			u = d / 2;
		let f;
		(this.drawTitle(),
			(s.textAlign = l.textAlign('left')),
			(s.textBaseline = 'middle'),
			(s.lineWidth = 0.5),
			(s.font = c.string));
		const { boxWidth: g, boxHeight: p, itemHeight: m } = tl(r, d),
			_ = function (C, S, E) {
				if (isNaN(g) || g <= 0 || isNaN(p) || p < 0) return;
				s.save();
				const k = I(E.lineWidth, 1);
				if (
					((s.fillStyle = I(E.fillStyle, a)),
					(s.lineCap = I(E.lineCap, 'butt')),
					(s.lineDashOffset = I(E.lineDashOffset, 0)),
					(s.lineJoin = I(E.lineJoin, 'miter')),
					(s.lineWidth = k),
					(s.strokeStyle = I(E.strokeStyle, a)),
					s.setLineDash(I(E.lineDash, [])),
					r.usePointStyle)
				) {
					const M = {
							radius: (p * Math.SQRT2) / 2,
							pointStyle: E.pointStyle,
							rotation: E.rotation,
							borderWidth: k
						},
						P = l.xPlus(C, g / 2),
						N = S + u;
					uh(s, M, P, N, r.pointStyleWidth && g);
				} else {
					const M = S + Math.max((d - p) / 2, 0),
						P = l.leftForLtr(C, g),
						N = we(E.borderRadius);
					(s.beginPath(),
						Object.values(N).some((at) => at !== 0)
							? zn(s, { x: P, y: M, w: g, h: p, radius: N })
							: s.rect(P, M, g, p),
						s.fill(),
						k !== 0 && s.stroke());
				}
				s.restore();
			},
			b = function (C, S, E) {
				Ie(s, E.text, C, S + m / 2, c, {
					strikethrough: E.hidden,
					textAlign: l.textAlign(E.textAlign)
				});
			},
			x = this.isHorizontal(),
			v = this._computeTitleHeight();
		(x
			? (f = { x: ct(o, this.left + h, this.right - i[0]), y: this.top + h + v, line: 0 })
			: (f = { x: this.left + h, y: ct(o, this.top + v + h, this.bottom - e[0].height), line: 0 }),
			xh(this.ctx, t.textDirection));
		const y = m + h;
		(this.legendItems.forEach((C, S) => {
			((s.strokeStyle = C.fontColor), (s.fillStyle = C.fontColor));
			const E = s.measureText(C.text).width,
				k = l.textAlign(C.textAlign || (C.textAlign = r.textAlign)),
				M = g + u + E;
			let P = f.x,
				N = f.y;
			(l.setWidth(this.width),
				x
					? S > 0 &&
						P + M + h > this.right &&
						((N = f.y += y), f.line++, (P = f.x = ct(o, this.left + h, this.right - i[f.line])))
					: S > 0 &&
						N + y > this.bottom &&
						((P = f.x = P + e[f.line].width + h),
						f.line++,
						(N = f.y = ct(o, this.top + v + h, this.bottom - e[f.line].height))));
			const at = l.x(P);
			if ((_(at, N, C), (P = zm(k, P + g + u, x ? P + M : this.right, t.rtl)), b(l.x(P), N, C), x))
				f.x += M + h;
			else if (typeof C.text != 'string') {
				const yt = c.lineHeight;
				f.y += Yh(C, yt) + h;
			} else f.y += y;
		}),
			vh(this.ctx, t.textDirection));
	}
	drawTitle() {
		const t = this.options,
			e = t.title,
			i = nt(e.font),
			s = ut(e.padding);
		if (!e.display) return;
		const o = Ve(t.rtl, this.left, this.width),
			r = this.ctx,
			a = e.position,
			l = i.size / 2,
			c = s.top + l;
		let h,
			d = this.left,
			u = this.width;
		if (this.isHorizontal())
			((u = Math.max(...this.lineWidths)),
				(h = this.top + c),
				(d = ct(t.align, d, this.right - u)));
		else {
			const g = this.columnSizes.reduce((p, m) => Math.max(p, m.height), 0);
			h =
				c + ct(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight());
		}
		const f = ct(a, d, d + u);
		((r.textAlign = o.textAlign(Uo(a))),
			(r.textBaseline = 'middle'),
			(r.strokeStyle = e.color),
			(r.fillStyle = e.color),
			(r.font = i.string),
			Ie(r, e.text, f, h, i));
	}
	_computeTitleHeight() {
		const t = this.options.title,
			e = nt(t.font),
			i = ut(t.padding);
		return t.display ? e.lineHeight + i.height : 0;
	}
	_getLegendItemAt(t, e) {
		let i, s, o;
		if (Bt(t, this.left, this.right) && Bt(e, this.top, this.bottom)) {
			for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
				if (((s = o[i]), Bt(t, s.left, s.left + s.width) && Bt(e, s.top, s.top + s.height)))
					return this.legendItems[i];
		}
		return null;
	}
	handleEvent(t) {
		const e = this.options;
		if (!Ax(t.type, e)) return;
		const i = this._getLegendItemAt(t.x, t.y);
		if (t.type === 'mousemove' || t.type === 'mouseout') {
			const s = this._hoveredItem,
				o = Ix(s, i);
			(s && !o && V(e.onLeave, [t, s, this], this),
				(this._hoveredItem = i),
				i && !o && V(e.onHover, [t, i, this], this));
		} else i && V(e.onClick, [t, i, this], this);
	}
}
function Mx(n, t, e, i, s) {
	const o = Px(i, n, t, e),
		r = Dx(s, i, t.lineHeight);
	return { itemWidth: o, itemHeight: r };
}
function Px(n, t, e, i) {
	let s = n.text;
	return (
		s && typeof s != 'string' && (s = s.reduce((o, r) => (o.length > r.length ? o : r))),
		t + e.size / 2 + i.measureText(s).width
	);
}
function Dx(n, t, e) {
	let i = n;
	return (typeof t.text != 'string' && (i = Yh(t, e)), i);
}
function Yh(n, t) {
	const e = n.text ? n.text.length : 0;
	return t * e;
}
function Ax(n, t) {
	return !!(
		((n === 'mousemove' || n === 'mouseout') && (t.onHover || t.onLeave)) ||
		(t.onClick && (n === 'click' || n === 'mouseup'))
	);
}
var Rx = {
	id: 'legend',
	_element: el,
	start(n, t, e) {
		const i = (n.legend = new el({ ctx: n.ctx, options: e, chart: n }));
		(dt.configure(n, i, e), dt.addBox(n, i));
	},
	stop(n) {
		(dt.removeBox(n, n.legend), delete n.legend);
	},
	beforeUpdate(n, t, e) {
		const i = n.legend;
		(dt.configure(n, i, e), (i.options = e));
	},
	afterUpdate(n) {
		const t = n.legend;
		(t.buildLabels(), t.adjustHitBoxes());
	},
	afterEvent(n, t) {
		t.replay || n.legend.handleEvent(t.event);
	},
	defaults: {
		display: !0,
		position: 'top',
		align: 'center',
		fullSize: !0,
		reverse: !1,
		weight: 1e3,
		onClick(n, t, e) {
			const i = t.datasetIndex,
				s = e.chart;
			s.isDatasetVisible(i) ? (s.hide(i), (t.hidden = !0)) : (s.show(i), (t.hidden = !1));
		},
		onHover: null,
		onLeave: null,
		labels: {
			color: (n) => n.chart.options.color,
			boxWidth: 40,
			padding: 10,
			generateLabels(n) {
				const t = n.data.datasets,
					{
						labels: {
							usePointStyle: e,
							pointStyle: i,
							textAlign: s,
							color: o,
							useBorderRadius: r,
							borderRadius: a
						}
					} = n.legend.options;
				return n._getSortedDatasetMetas().map((l) => {
					const c = l.controller.getStyle(e ? 0 : void 0),
						h = ut(c.borderWidth);
					return {
						text: t[l.index].label,
						fillStyle: c.backgroundColor,
						fontColor: o,
						hidden: !l.visible,
						lineCap: c.borderCapStyle,
						lineDash: c.borderDash,
						lineDashOffset: c.borderDashOffset,
						lineJoin: c.borderJoinStyle,
						lineWidth: (h.width + h.height) / 4,
						strokeStyle: c.borderColor,
						pointStyle: i || c.pointStyle,
						rotation: c.rotation,
						textAlign: s || c.textAlign,
						borderRadius: r && (a || c.borderRadius),
						datasetIndex: l.index
					};
				}, this);
			}
		},
		title: { color: (n) => n.chart.options.color, display: !1, position: 'center', text: '' }
	},
	descriptors: {
		_scriptable: (n) => !n.startsWith('on'),
		labels: { _scriptable: (n) => !['generateLabels', 'filter', 'sort'].includes(n) }
	}
};
class nr extends Yt {
	constructor(t) {
		(super(),
			(this.chart = t.chart),
			(this.options = t.options),
			(this.ctx = t.ctx),
			(this._padding = void 0),
			(this.top = void 0),
			(this.bottom = void 0),
			(this.left = void 0),
			(this.right = void 0),
			(this.width = void 0),
			(this.height = void 0),
			(this.position = void 0),
			(this.weight = void 0),
			(this.fullSize = void 0));
	}
	update(t, e) {
		const i = this.options;
		if (((this.left = 0), (this.top = 0), !i.display)) {
			this.width = this.height = this.right = this.bottom = 0;
			return;
		}
		((this.width = this.right = t), (this.height = this.bottom = e));
		const s = q(i.text) ? i.text.length : 1;
		this._padding = ut(i.padding);
		const o = s * nt(i.font).lineHeight + this._padding.height;
		this.isHorizontal() ? (this.height = o) : (this.width = o);
	}
	isHorizontal() {
		const t = this.options.position;
		return t === 'top' || t === 'bottom';
	}
	_drawArgs(t) {
		const { top: e, left: i, bottom: s, right: o, options: r } = this,
			a = r.align;
		let l = 0,
			c,
			h,
			d;
		return (
			this.isHorizontal()
				? ((h = ct(a, i, o)), (d = e + t), (c = o - i))
				: (r.position === 'left'
						? ((h = i + t), (d = ct(a, s, e)), (l = Y * -0.5))
						: ((h = o - t), (d = ct(a, e, s)), (l = Y * 0.5)),
					(c = s - e)),
			{ titleX: h, titleY: d, maxWidth: c, rotation: l }
		);
	}
	draw() {
		const t = this.ctx,
			e = this.options;
		if (!e.display) return;
		const i = nt(e.font),
			o = i.lineHeight / 2 + this._padding.top,
			{ titleX: r, titleY: a, maxWidth: l, rotation: c } = this._drawArgs(o);
		Ie(t, e.text, 0, 0, i, {
			color: e.color,
			maxWidth: l,
			rotation: c,
			textAlign: Uo(e.align),
			textBaseline: 'middle',
			translation: [r, a]
		});
	}
}
function Ox(n, t) {
	const e = new nr({ ctx: n.ctx, options: t, chart: n });
	(dt.configure(n, e, t), dt.addBox(n, e), (n.titleBlock = e));
}
var Nx = {
	id: 'title',
	_element: nr,
	start(n, t, e) {
		Ox(n, e);
	},
	stop(n) {
		const t = n.titleBlock;
		(dt.removeBox(n, t), delete n.titleBlock);
	},
	beforeUpdate(n, t, e) {
		const i = n.titleBlock;
		(dt.configure(n, i, e), (i.options = e));
	},
	defaults: {
		align: 'center',
		display: !1,
		font: { weight: 'bold' },
		fullSize: !0,
		padding: 10,
		position: 'top',
		text: '',
		weight: 2e3
	},
	defaultRoutes: { color: 'color' },
	descriptors: { _scriptable: !0, _indexable: !1 }
};
const ui = new WeakMap();
var Lx = {
	id: 'subtitle',
	start(n, t, e) {
		const i = new nr({ ctx: n.ctx, options: e, chart: n });
		(dt.configure(n, i, e), dt.addBox(n, i), ui.set(n, i));
	},
	stop(n) {
		(dt.removeBox(n, ui.get(n)), ui.delete(n));
	},
	beforeUpdate(n, t, e) {
		const i = ui.get(n);
		(dt.configure(n, i, e), (i.options = e));
	},
	defaults: {
		align: 'center',
		display: !1,
		font: { weight: 'normal' },
		fullSize: !0,
		padding: 0,
		position: 'top',
		text: '',
		weight: 1500
	},
	defaultRoutes: { color: 'color' },
	descriptors: { _scriptable: !0, _indexable: !1 }
};
const pn = {
	average(n) {
		if (!n.length) return !1;
		let t,
			e,
			i = new Set(),
			s = 0,
			o = 0;
		for (t = 0, e = n.length; t < e; ++t) {
			const a = n[t].element;
			if (a && a.hasValue()) {
				const l = a.tooltipPosition();
				(i.add(l.x), (s += l.y), ++o);
			}
		}
		return o === 0 || i.size === 0 ? !1 : { x: [...i].reduce((a, l) => a + l) / i.size, y: s / o };
	},
	nearest(n, t) {
		if (!n.length) return !1;
		let e = t.x,
			i = t.y,
			s = Number.POSITIVE_INFINITY,
			o,
			r,
			a;
		for (o = 0, r = n.length; o < r; ++o) {
			const l = n[o].element;
			if (l && l.hasValue()) {
				const c = l.getCenterPoint(),
					h = Ks(t, c);
				h < s && ((s = h), (a = l));
			}
		}
		if (a) {
			const l = a.tooltipPosition();
			((e = l.x), (i = l.y));
		}
		return { x: e, y: i };
	}
};
function Mt(n, t) {
	return (t && (q(t) ? Array.prototype.push.apply(n, t) : n.push(t)), n);
}
function Nt(n) {
	return (typeof n == 'string' || n instanceof String) &&
		n.indexOf(`
`) > -1
		? n.split(`
`)
		: n;
}
function Fx(n, t) {
	const { element: e, datasetIndex: i, index: s } = t,
		o = n.getDatasetMeta(i).controller,
		{ label: r, value: a } = o.getLabelAndValue(s);
	return {
		chart: n,
		label: r,
		parsed: o.getParsed(s),
		raw: n.data.datasets[i].data[s],
		formattedValue: a,
		dataset: o.getDataset(),
		dataIndex: s,
		datasetIndex: i,
		element: e
	};
}
function nl(n, t) {
	const e = n.chart.ctx,
		{ body: i, footer: s, title: o } = n,
		{ boxWidth: r, boxHeight: a } = t,
		l = nt(t.bodyFont),
		c = nt(t.titleFont),
		h = nt(t.footerFont),
		d = o.length,
		u = s.length,
		f = i.length,
		g = ut(t.padding);
	let p = g.height,
		m = 0,
		_ = i.reduce((v, y) => v + y.before.length + y.lines.length + y.after.length, 0);
	if (
		((_ += n.beforeBody.length + n.afterBody.length),
		d && (p += d * c.lineHeight + (d - 1) * t.titleSpacing + t.titleMarginBottom),
		_)
	) {
		const v = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
		p += f * v + (_ - f) * l.lineHeight + (_ - 1) * t.bodySpacing;
	}
	u && (p += t.footerMarginTop + u * h.lineHeight + (u - 1) * t.footerSpacing);
	let b = 0;
	const x = function (v) {
		m = Math.max(m, e.measureText(v).width + b);
	};
	return (
		e.save(),
		(e.font = c.string),
		B(n.title, x),
		(e.font = l.string),
		B(n.beforeBody.concat(n.afterBody), x),
		(b = t.displayColors ? r + 2 + t.boxPadding : 0),
		B(i, (v) => {
			(B(v.before, x), B(v.lines, x), B(v.after, x));
		}),
		(b = 0),
		(e.font = h.string),
		B(n.footer, x),
		e.restore(),
		(m += g.width),
		{ width: m, height: p }
	);
}
function Bx(n, t) {
	const { y: e, height: i } = t;
	return e < i / 2 ? 'top' : e > n.height - i / 2 ? 'bottom' : 'center';
}
function Wx(n, t, e, i) {
	const { x: s, width: o } = i,
		r = e.caretSize + e.caretPadding;
	if ((n === 'left' && s + o + r > t.width) || (n === 'right' && s - o - r < 0)) return !0;
}
function zx(n, t, e, i) {
	const { x: s, width: o } = e,
		{
			width: r,
			chartArea: { left: a, right: l }
		} = n;
	let c = 'center';
	return (
		i === 'center'
			? (c = s <= (a + l) / 2 ? 'left' : 'right')
			: s <= o / 2
				? (c = 'left')
				: s >= r - o / 2 && (c = 'right'),
		Wx(c, n, t, e) && (c = 'center'),
		c
	);
}
function il(n, t, e) {
	const i = e.yAlign || t.yAlign || Bx(n, e);
	return { xAlign: e.xAlign || t.xAlign || zx(n, t, e, i), yAlign: i };
}
function Vx(n, t) {
	let { x: e, width: i } = n;
	return (t === 'right' ? (e -= i) : t === 'center' && (e -= i / 2), e);
}
function Hx(n, t, e) {
	let { y: i, height: s } = n;
	return (t === 'top' ? (i += e) : t === 'bottom' ? (i -= s + e) : (i -= s / 2), i);
}
function sl(n, t, e, i) {
	const { caretSize: s, caretPadding: o, cornerRadius: r } = n,
		{ xAlign: a, yAlign: l } = e,
		c = s + o,
		{ topLeft: h, topRight: d, bottomLeft: u, bottomRight: f } = we(r);
	let g = Vx(t, a);
	const p = Hx(t, l, c);
	return (
		l === 'center'
			? a === 'left'
				? (g += c)
				: a === 'right' && (g -= c)
			: a === 'left'
				? (g -= Math.max(h, u) + s)
				: a === 'right' && (g += Math.max(d, f) + s),
		{ x: rt(g, 0, i.width - t.width), y: rt(p, 0, i.height - t.height) }
	);
}
function fi(n, t, e) {
	const i = ut(e.padding);
	return t === 'center'
		? n.x + n.width / 2
		: t === 'right'
			? n.x + n.width - i.right
			: n.x + i.left;
}
function ol(n) {
	return Mt([], Nt(n));
}
function jx(n, t, e) {
	return re(n, { tooltip: t, tooltipItems: e, type: 'tooltip' });
}
function rl(n, t) {
	const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
	return e ? n.override(e) : n;
}
const Gh = {
	beforeTitle: Rt,
	title(n) {
		if (n.length > 0) {
			const t = n[0],
				e = t.chart.data.labels,
				i = e ? e.length : 0;
			if (this && this.options && this.options.mode === 'dataset') return t.dataset.label || '';
			if (t.label) return t.label;
			if (i > 0 && t.dataIndex < i) return e[t.dataIndex];
		}
		return '';
	},
	afterTitle: Rt,
	beforeBody: Rt,
	beforeLabel: Rt,
	label(n) {
		if (this && this.options && this.options.mode === 'dataset')
			return n.label + ': ' + n.formattedValue || n.formattedValue;
		let t = n.dataset.label || '';
		t && (t += ': ');
		const e = n.formattedValue;
		return (L(e) || (t += e), t);
	},
	labelColor(n) {
		const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
		return {
			borderColor: e.borderColor,
			backgroundColor: e.backgroundColor,
			borderWidth: e.borderWidth,
			borderDash: e.borderDash,
			borderDashOffset: e.borderDashOffset,
			borderRadius: 0
		};
	},
	labelTextColor() {
		return this.options.bodyColor;
	},
	labelPointStyle(n) {
		const e = n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);
		return { pointStyle: e.pointStyle, rotation: e.rotation };
	},
	afterLabel: Rt,
	afterBody: Rt,
	beforeFooter: Rt,
	footer: Rt,
	afterFooter: Rt
};
function gt(n, t, e, i) {
	const s = n[t].call(e, i);
	return typeof s > 'u' ? Gh[t].call(e, i) : s;
}
class al extends Yt {
	static positioners = pn;
	constructor(t) {
		(super(),
			(this.opacity = 0),
			(this._active = []),
			(this._eventPosition = void 0),
			(this._size = void 0),
			(this._cachedAnimations = void 0),
			(this._tooltipItems = []),
			(this.$animations = void 0),
			(this.$context = void 0),
			(this.chart = t.chart),
			(this.options = t.options),
			(this.dataPoints = void 0),
			(this.title = void 0),
			(this.beforeBody = void 0),
			(this.body = void 0),
			(this.afterBody = void 0),
			(this.footer = void 0),
			(this.xAlign = void 0),
			(this.yAlign = void 0),
			(this.x = void 0),
			(this.y = void 0),
			(this.height = void 0),
			(this.width = void 0),
			(this.caretX = void 0),
			(this.caretY = void 0),
			(this.labelColors = void 0),
			(this.labelPointStyles = void 0),
			(this.labelTextColors = void 0));
	}
	initialize(t) {
		((this.options = t), (this._cachedAnimations = void 0), (this.$context = void 0));
	}
	_resolveAnimations() {
		const t = this._cachedAnimations;
		if (t) return t;
		const e = this.chart,
			i = this.options.setContext(this.getContext()),
			s = i.enabled && e.options.animation && i.animations,
			o = new Eh(this.chart, s);
		return (s._cacheable && (this._cachedAnimations = Object.freeze(o)), o);
	}
	getContext() {
		return this.$context || (this.$context = jx(this.chart.getContext(), this, this._tooltipItems));
	}
	getTitle(t, e) {
		const { callbacks: i } = e,
			s = gt(i, 'beforeTitle', this, t),
			o = gt(i, 'title', this, t),
			r = gt(i, 'afterTitle', this, t);
		let a = [];
		return ((a = Mt(a, Nt(s))), (a = Mt(a, Nt(o))), (a = Mt(a, Nt(r))), a);
	}
	getBeforeBody(t, e) {
		return ol(gt(e.callbacks, 'beforeBody', this, t));
	}
	getBody(t, e) {
		const { callbacks: i } = e,
			s = [];
		return (
			B(t, (o) => {
				const r = { before: [], lines: [], after: [] },
					a = rl(i, o);
				(Mt(r.before, Nt(gt(a, 'beforeLabel', this, o))),
					Mt(r.lines, gt(a, 'label', this, o)),
					Mt(r.after, Nt(gt(a, 'afterLabel', this, o))),
					s.push(r));
			}),
			s
		);
	}
	getAfterBody(t, e) {
		return ol(gt(e.callbacks, 'afterBody', this, t));
	}
	getFooter(t, e) {
		const { callbacks: i } = e,
			s = gt(i, 'beforeFooter', this, t),
			o = gt(i, 'footer', this, t),
			r = gt(i, 'afterFooter', this, t);
		let a = [];
		return ((a = Mt(a, Nt(s))), (a = Mt(a, Nt(o))), (a = Mt(a, Nt(r))), a);
	}
	_createItems(t) {
		const e = this._active,
			i = this.chart.data,
			s = [],
			o = [],
			r = [];
		let a = [],
			l,
			c;
		for (l = 0, c = e.length; l < c; ++l) a.push(Fx(this.chart, e[l]));
		return (
			t.filter && (a = a.filter((h, d, u) => t.filter(h, d, u, i))),
			t.itemSort && (a = a.sort((h, d) => t.itemSort(h, d, i))),
			B(a, (h) => {
				const d = rl(t.callbacks, h);
				(s.push(gt(d, 'labelColor', this, h)),
					o.push(gt(d, 'labelPointStyle', this, h)),
					r.push(gt(d, 'labelTextColor', this, h)));
			}),
			(this.labelColors = s),
			(this.labelPointStyles = o),
			(this.labelTextColors = r),
			(this.dataPoints = a),
			a
		);
	}
	update(t, e) {
		const i = this.options.setContext(this.getContext()),
			s = this._active;
		let o,
			r = [];
		if (!s.length) this.opacity !== 0 && (o = { opacity: 0 });
		else {
			const a = pn[i.position].call(this, s, this._eventPosition);
			((r = this._createItems(i)),
				(this.title = this.getTitle(r, i)),
				(this.beforeBody = this.getBeforeBody(r, i)),
				(this.body = this.getBody(r, i)),
				(this.afterBody = this.getAfterBody(r, i)),
				(this.footer = this.getFooter(r, i)));
			const l = (this._size = nl(this, i)),
				c = Object.assign({}, a, l),
				h = il(this.chart, i, c),
				d = sl(i, c, h, this.chart);
			((this.xAlign = h.xAlign),
				(this.yAlign = h.yAlign),
				(o = {
					opacity: 1,
					x: d.x,
					y: d.y,
					width: l.width,
					height: l.height,
					caretX: a.x,
					caretY: a.y
				}));
		}
		((this._tooltipItems = r),
			(this.$context = void 0),
			o && this._resolveAnimations().update(this, o),
			t && i.external && i.external.call(this, { chart: this.chart, tooltip: this, replay: e }));
	}
	drawCaret(t, e, i, s) {
		const o = this.getCaretPosition(t, i, s);
		(e.lineTo(o.x1, o.y1), e.lineTo(o.x2, o.y2), e.lineTo(o.x3, o.y3));
	}
	getCaretPosition(t, e, i) {
		const { xAlign: s, yAlign: o } = this,
			{ caretSize: r, cornerRadius: a } = i,
			{ topLeft: l, topRight: c, bottomLeft: h, bottomRight: d } = we(a),
			{ x: u, y: f } = t,
			{ width: g, height: p } = e;
		let m, _, b, x, v, y;
		return (
			o === 'center'
				? ((v = f + p / 2),
					s === 'left'
						? ((m = u), (_ = m - r), (x = v + r), (y = v - r))
						: ((m = u + g), (_ = m + r), (x = v - r), (y = v + r)),
					(b = m))
				: (s === 'left'
						? (_ = u + Math.max(l, h) + r)
						: s === 'right'
							? (_ = u + g - Math.max(c, d) - r)
							: (_ = this.caretX),
					o === 'top'
						? ((x = f), (v = x - r), (m = _ - r), (b = _ + r))
						: ((x = f + p), (v = x + r), (m = _ + r), (b = _ - r)),
					(y = x)),
			{ x1: m, x2: _, x3: b, y1: x, y2: v, y3: y }
		);
	}
	drawTitle(t, e, i) {
		const s = this.title,
			o = s.length;
		let r, a, l;
		if (o) {
			const c = Ve(i.rtl, this.x, this.width);
			for (
				t.x = fi(this, i.titleAlign, i),
					e.textAlign = c.textAlign(i.titleAlign),
					e.textBaseline = 'middle',
					r = nt(i.titleFont),
					a = i.titleSpacing,
					e.fillStyle = i.titleColor,
					e.font = r.string,
					l = 0;
				l < o;
				++l
			)
				(e.fillText(s[l], c.x(t.x), t.y + r.lineHeight / 2),
					(t.y += r.lineHeight + a),
					l + 1 === o && (t.y += i.titleMarginBottom - a));
		}
	}
	_drawColorBox(t, e, i, s, o) {
		const r = this.labelColors[i],
			a = this.labelPointStyles[i],
			{ boxHeight: l, boxWidth: c } = o,
			h = nt(o.bodyFont),
			d = fi(this, 'left', o),
			u = s.x(d),
			f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0,
			g = e.y + f;
		if (o.usePointStyle) {
			const p = {
					radius: Math.min(c, l) / 2,
					pointStyle: a.pointStyle,
					rotation: a.rotation,
					borderWidth: 1
				},
				m = s.leftForLtr(u, c) + c / 2,
				_ = g + l / 2;
			((t.strokeStyle = o.multiKeyBackground),
				(t.fillStyle = o.multiKeyBackground),
				Qs(t, p, m, _),
				(t.strokeStyle = r.borderColor),
				(t.fillStyle = r.backgroundColor),
				Qs(t, p, m, _));
		} else {
			((t.lineWidth = O(r.borderWidth)
				? Math.max(...Object.values(r.borderWidth))
				: r.borderWidth || 1),
				(t.strokeStyle = r.borderColor),
				t.setLineDash(r.borderDash || []),
				(t.lineDashOffset = r.borderDashOffset || 0));
			const p = s.leftForLtr(u, c),
				m = s.leftForLtr(s.xPlus(u, 1), c - 2),
				_ = we(r.borderRadius);
			Object.values(_).some((b) => b !== 0)
				? (t.beginPath(),
					(t.fillStyle = o.multiKeyBackground),
					zn(t, { x: p, y: g, w: c, h: l, radius: _ }),
					t.fill(),
					t.stroke(),
					(t.fillStyle = r.backgroundColor),
					t.beginPath(),
					zn(t, { x: m, y: g + 1, w: c - 2, h: l - 2, radius: _ }),
					t.fill())
				: ((t.fillStyle = o.multiKeyBackground),
					t.fillRect(p, g, c, l),
					t.strokeRect(p, g, c, l),
					(t.fillStyle = r.backgroundColor),
					t.fillRect(m, g + 1, c - 2, l - 2));
		}
		t.fillStyle = this.labelTextColors[i];
	}
	drawBody(t, e, i) {
		const { body: s } = this,
			{
				bodySpacing: o,
				bodyAlign: r,
				displayColors: a,
				boxHeight: l,
				boxWidth: c,
				boxPadding: h
			} = i,
			d = nt(i.bodyFont);
		let u = d.lineHeight,
			f = 0;
		const g = Ve(i.rtl, this.x, this.width),
			p = function (E) {
				(e.fillText(E, g.x(t.x + f), t.y + u / 2), (t.y += u + o));
			},
			m = g.textAlign(r);
		let _, b, x, v, y, C, S;
		for (
			e.textAlign = r,
				e.textBaseline = 'middle',
				e.font = d.string,
				t.x = fi(this, m, i),
				e.fillStyle = i.bodyColor,
				B(this.beforeBody, p),
				f = a && m !== 'right' ? (r === 'center' ? c / 2 + h : c + 2 + h) : 0,
				v = 0,
				C = s.length;
			v < C;
			++v
		) {
			for (
				_ = s[v],
					b = this.labelTextColors[v],
					e.fillStyle = b,
					B(_.before, p),
					x = _.lines,
					a && x.length && (this._drawColorBox(e, t, v, g, i), (u = Math.max(d.lineHeight, l))),
					y = 0,
					S = x.length;
				y < S;
				++y
			)
				(p(x[y]), (u = d.lineHeight));
			B(_.after, p);
		}
		((f = 0), (u = d.lineHeight), B(this.afterBody, p), (t.y -= o));
	}
	drawFooter(t, e, i) {
		const s = this.footer,
			o = s.length;
		let r, a;
		if (o) {
			const l = Ve(i.rtl, this.x, this.width);
			for (
				t.x = fi(this, i.footerAlign, i),
					t.y += i.footerMarginTop,
					e.textAlign = l.textAlign(i.footerAlign),
					e.textBaseline = 'middle',
					r = nt(i.footerFont),
					e.fillStyle = i.footerColor,
					e.font = r.string,
					a = 0;
				a < o;
				++a
			)
				(e.fillText(s[a], l.x(t.x), t.y + r.lineHeight / 2),
					(t.y += r.lineHeight + i.footerSpacing));
		}
	}
	drawBackground(t, e, i, s) {
		const { xAlign: o, yAlign: r } = this,
			{ x: a, y: l } = t,
			{ width: c, height: h } = i,
			{ topLeft: d, topRight: u, bottomLeft: f, bottomRight: g } = we(s.cornerRadius);
		((e.fillStyle = s.backgroundColor),
			(e.strokeStyle = s.borderColor),
			(e.lineWidth = s.borderWidth),
			e.beginPath(),
			e.moveTo(a + d, l),
			r === 'top' && this.drawCaret(t, e, i, s),
			e.lineTo(a + c - u, l),
			e.quadraticCurveTo(a + c, l, a + c, l + u),
			r === 'center' && o === 'right' && this.drawCaret(t, e, i, s),
			e.lineTo(a + c, l + h - g),
			e.quadraticCurveTo(a + c, l + h, a + c - g, l + h),
			r === 'bottom' && this.drawCaret(t, e, i, s),
			e.lineTo(a + f, l + h),
			e.quadraticCurveTo(a, l + h, a, l + h - f),
			r === 'center' && o === 'left' && this.drawCaret(t, e, i, s),
			e.lineTo(a, l + d),
			e.quadraticCurveTo(a, l, a + d, l),
			e.closePath(),
			e.fill(),
			s.borderWidth > 0 && e.stroke());
	}
	_updateAnimationTarget(t) {
		const e = this.chart,
			i = this.$animations,
			s = i && i.x,
			o = i && i.y;
		if (s || o) {
			const r = pn[t.position].call(this, this._active, this._eventPosition);
			if (!r) return;
			const a = (this._size = nl(this, t)),
				l = Object.assign({}, r, this._size),
				c = il(e, t, l),
				h = sl(t, l, c, e);
			(s._to !== h.x || o._to !== h.y) &&
				((this.xAlign = c.xAlign),
				(this.yAlign = c.yAlign),
				(this.width = a.width),
				(this.height = a.height),
				(this.caretX = r.x),
				(this.caretY = r.y),
				this._resolveAnimations().update(this, h));
		}
	}
	_willRender() {
		return !!this.opacity;
	}
	draw(t) {
		const e = this.options.setContext(this.getContext());
		let i = this.opacity;
		if (!i) return;
		this._updateAnimationTarget(e);
		const s = { width: this.width, height: this.height },
			o = { x: this.x, y: this.y };
		i = Math.abs(i) < 0.001 ? 0 : i;
		const r = ut(e.padding),
			a =
				this.title.length ||
				this.beforeBody.length ||
				this.body.length ||
				this.afterBody.length ||
				this.footer.length;
		e.enabled &&
			a &&
			(t.save(),
			(t.globalAlpha = i),
			this.drawBackground(o, t, s, e),
			xh(t, e.textDirection),
			(o.y += r.top),
			this.drawTitle(o, t, e),
			this.drawBody(o, t, e),
			this.drawFooter(o, t, e),
			vh(t, e.textDirection),
			t.restore());
	}
	getActiveElements() {
		return this._active || [];
	}
	setActiveElements(t, e) {
		const i = this._active,
			s = t.map(({ datasetIndex: a, index: l }) => {
				const c = this.chart.getDatasetMeta(a);
				if (!c) throw new Error('Cannot find a dataset at index ' + a);
				return { datasetIndex: a, element: c.data[l], index: l };
			}),
			o = !Ni(i, s),
			r = this._positionChanged(s, e);
		(o || r) &&
			((this._active = s),
			(this._eventPosition = e),
			(this._ignoreReplayEvents = !0),
			this.update(!0));
	}
	handleEvent(t, e, i = !0) {
		if (e && this._ignoreReplayEvents) return !1;
		this._ignoreReplayEvents = !1;
		const s = this.options,
			o = this._active || [],
			r = this._getActiveElements(t, o, e, i),
			a = this._positionChanged(r, t),
			l = e || !Ni(r, o) || a;
		return (
			l &&
				((this._active = r),
				(s.enabled || s.external) &&
					((this._eventPosition = { x: t.x, y: t.y }), this.update(!0, e))),
			l
		);
	}
	_getActiveElements(t, e, i, s) {
		const o = this.options;
		if (t.type === 'mouseout') return [];
		if (!s)
			return e.filter(
				(a) =>
					this.chart.data.datasets[a.datasetIndex] &&
					this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0
			);
		const r = this.chart.getElementsAtEventForMode(t, o.mode, o, i);
		return (o.reverse && r.reverse(), r);
	}
	_positionChanged(t, e) {
		const { caretX: i, caretY: s, options: o } = this,
			r = pn[o.position].call(this, t, e);
		return r !== !1 && (i !== r.x || s !== r.y);
	}
}
var Ux = {
		id: 'tooltip',
		_element: al,
		positioners: pn,
		afterInit(n, t, e) {
			e && (n.tooltip = new al({ chart: n, options: e }));
		},
		beforeUpdate(n, t, e) {
			n.tooltip && n.tooltip.initialize(e);
		},
		reset(n, t, e) {
			n.tooltip && n.tooltip.initialize(e);
		},
		afterDraw(n) {
			const t = n.tooltip;
			if (t && t._willRender()) {
				const e = { tooltip: t };
				if (n.notifyPlugins('beforeTooltipDraw', { ...e, cancelable: !0 }) === !1) return;
				(t.draw(n.ctx), n.notifyPlugins('afterTooltipDraw', e));
			}
		},
		afterEvent(n, t) {
			if (n.tooltip) {
				const e = t.replay;
				n.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
			}
		},
		defaults: {
			enabled: !0,
			external: null,
			position: 'average',
			backgroundColor: 'rgba(0,0,0,0.8)',
			titleColor: '#fff',
			titleFont: { weight: 'bold' },
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleAlign: 'left',
			bodyColor: '#fff',
			bodySpacing: 2,
			bodyFont: {},
			bodyAlign: 'left',
			footerColor: '#fff',
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFont: { weight: 'bold' },
			footerAlign: 'left',
			padding: 6,
			caretPadding: 2,
			caretSize: 5,
			cornerRadius: 6,
			boxHeight: (n, t) => t.bodyFont.size,
			boxWidth: (n, t) => t.bodyFont.size,
			multiKeyBackground: '#fff',
			displayColors: !0,
			boxPadding: 0,
			borderColor: 'rgba(0,0,0,0)',
			borderWidth: 0,
			animation: { duration: 400, easing: 'easeOutQuart' },
			animations: {
				numbers: { type: 'number', properties: ['x', 'y', 'width', 'height', 'caretX', 'caretY'] },
				opacity: { easing: 'linear', duration: 200 }
			},
			callbacks: Gh
		},
		defaultRoutes: { bodyFont: 'font', footerFont: 'font', titleFont: 'font' },
		descriptors: {
			_scriptable: (n) => n !== 'filter' && n !== 'itemSort' && n !== 'external',
			_indexable: !1,
			callbacks: { _scriptable: !1, _indexable: !1 },
			animation: { _fallback: !1 },
			animations: { _fallback: 'animation' }
		},
		additionalOptionScopes: ['interaction']
	},
	$x = Object.freeze({
		__proto__: null,
		Colors: ix,
		Decimation: ax,
		Filler: Tx,
		Legend: Rx,
		SubTitle: Lx,
		Title: Nx,
		Tooltip: Ux
	});
const Yx = (n, t, e, i) => (
	typeof t == 'string'
		? ((e = n.push(t) - 1), i.unshift({ index: e, label: t }))
		: isNaN(t) && (e = null),
	e
);
function Gx(n, t, e, i) {
	const s = n.indexOf(t);
	if (s === -1) return Yx(n, t, e, i);
	const o = n.lastIndexOf(t);
	return s !== o ? e : s;
}
const qx = (n, t) => (n === null ? null : rt(Math.round(n), 0, t));
function ll(n) {
	const t = this.getLabels();
	return n >= 0 && n < t.length ? t[n] : n;
}
class Kx extends Pe {
	static id = 'category';
	static defaults = { ticks: { callback: ll } };
	constructor(t) {
		(super(t), (this._startValue = void 0), (this._valueRange = 0), (this._addedLabels = []));
	}
	init(t) {
		const e = this._addedLabels;
		if (e.length) {
			const i = this.getLabels();
			for (const { index: s, label: o } of e) i[s] === o && i.splice(s, 1);
			this._addedLabels = [];
		}
		super.init(t);
	}
	parse(t, e) {
		if (L(t)) return null;
		const i = this.getLabels();
		return (
			(e = isFinite(e) && i[e] === t ? e : Gx(i, t, I(e, t), this._addedLabels)),
			qx(e, i.length - 1)
		);
	}
	determineDataLimits() {
		const { minDefined: t, maxDefined: e } = this.getUserBounds();
		let { min: i, max: s } = this.getMinMax(!0);
		(this.options.bounds === 'ticks' && (t || (i = 0), e || (s = this.getLabels().length - 1)),
			(this.min = i),
			(this.max = s));
	}
	buildTicks() {
		const t = this.min,
			e = this.max,
			i = this.options.offset,
			s = [];
		let o = this.getLabels();
		((o = t === 0 && e === o.length - 1 ? o : o.slice(t, e + 1)),
			(this._valueRange = Math.max(o.length - (i ? 0 : 1), 1)),
			(this._startValue = this.min - (i ? 0.5 : 0)));
		for (let r = t; r <= e; r++) s.push({ value: r });
		return s;
	}
	getLabelForValue(t) {
		return ll.call(this, t);
	}
	configure() {
		(super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels));
	}
	getPixelForValue(t) {
		return (
			typeof t != 'number' && (t = this.parse(t)),
			t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
		);
	}
	getPixelForTick(t) {
		const e = this.ticks;
		return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
	}
	getValueForPixel(t) {
		return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
	}
	getBasePixel() {
		return this.bottom;
	}
}
function Xx(n, t) {
	const e = [],
		{
			bounds: s,
			step: o,
			min: r,
			max: a,
			precision: l,
			count: c,
			maxTicks: h,
			maxDigits: d,
			includeBounds: u
		} = n,
		f = o || 1,
		g = h - 1,
		{ min: p, max: m } = t,
		_ = !L(r),
		b = !L(a),
		x = !L(c),
		v = (m - p) / (d + 1);
	let y = na((m - p) / g / f) * f,
		C,
		S,
		E,
		k;
	if (y < 1e-14 && !_ && !b) return [{ value: p }, { value: m }];
	((k = Math.ceil(m / y) - Math.floor(p / y)),
		k > g && (y = na((k * y) / g / f) * f),
		L(l) || ((C = Math.pow(10, l)), (y = Math.ceil(y * C) / C)),
		s === 'ticks' ? ((S = Math.floor(p / y) * y), (E = Math.ceil(m / y) * y)) : ((S = p), (E = m)),
		_ && b && o && Rm((a - r) / o, y / 1e3)
			? ((k = Math.round(Math.min((a - r) / y, h))), (y = (a - r) / k), (S = r), (E = a))
			: x
				? ((S = _ ? r : S), (E = b ? a : E), (k = c - 1), (y = (E - S) / k))
				: ((k = (E - S) / y),
					wn(k, Math.round(k), y / 1e3) ? (k = Math.round(k)) : (k = Math.ceil(k))));
	const M = Math.max(ia(y), ia(S));
	((C = Math.pow(10, L(l) ? M : l)), (S = Math.round(S * C) / C), (E = Math.round(E * C) / C));
	let P = 0;
	for (
		_ &&
		(u && S !== r
			? (e.push({ value: r }),
				S < r && P++,
				wn(Math.round((S + P * y) * C) / C, r, cl(r, v, n)) && P++)
			: S < r && P++);
		P < k;
		++P
	) {
		const N = Math.round((S + P * y) * C) / C;
		if (b && N > a) break;
		e.push({ value: N });
	}
	return (
		b && u && E !== a
			? e.length && wn(e[e.length - 1].value, a, cl(a, v, n))
				? (e[e.length - 1].value = a)
				: e.push({ value: a })
			: (!b || E === a) && e.push({ value: E }),
		e
	);
}
function cl(n, t, { horizontal: e, minRotation: i }) {
	const s = Tt(i),
		o = (e ? Math.sin(s) : Math.cos(s)) || 0.001,
		r = 0.75 * t * ('' + n).length;
	return Math.min(t / o, r);
}
class Hi extends Pe {
	constructor(t) {
		(super(t),
			(this.start = void 0),
			(this.end = void 0),
			(this._startValue = void 0),
			(this._endValue = void 0),
			(this._valueRange = 0));
	}
	parse(t, e) {
		return L(t) || ((typeof t == 'number' || t instanceof Number) && !isFinite(+t)) ? null : +t;
	}
	handleTickRangeOptions() {
		const { beginAtZero: t } = this.options,
			{ minDefined: e, maxDefined: i } = this.getUserBounds();
		let { min: s, max: o } = this;
		const r = (l) => (s = e ? s : l),
			a = (l) => (o = i ? o : l);
		if (t) {
			const l = Dt(s),
				c = Dt(o);
			l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0);
		}
		if (s === o) {
			let l = o === 0 ? 1 : Math.abs(o * 0.05);
			(a(o + l), t || r(s - l));
		}
		((this.min = s), (this.max = o));
	}
	getTickLimit() {
		const t = this.options.ticks;
		let { maxTicksLimit: e, stepSize: i } = t,
			s;
		return (
			i
				? ((s = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1),
					s > 1e3 &&
						(console.warn(
							`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`
						),
						(s = 1e3)))
				: ((s = this.computeTickLimit()), (e = e || 11)),
			e && (s = Math.min(e, s)),
			s
		);
	}
	computeTickLimit() {
		return Number.POSITIVE_INFINITY;
	}
	buildTicks() {
		const t = this.options,
			e = t.ticks;
		let i = this.getTickLimit();
		i = Math.max(2, i);
		const s = {
				maxTicks: i,
				bounds: t.bounds,
				min: t.min,
				max: t.max,
				precision: e.precision,
				step: e.stepSize,
				count: e.count,
				maxDigits: this._maxDigits(),
				horizontal: this.isHorizontal(),
				minRotation: e.minRotation || 0,
				includeBounds: e.includeBounds !== !1
			},
			o = this._range || this,
			r = Xx(s, o);
		return (
			t.bounds === 'ticks' && ih(r, this, 'value'),
			t.reverse
				? (r.reverse(), (this.start = this.max), (this.end = this.min))
				: ((this.start = this.min), (this.end = this.max)),
			r
		);
	}
	configure() {
		const t = this.ticks;
		let e = this.min,
			i = this.max;
		if ((super.configure(), this.options.offset && t.length)) {
			const s = (i - e) / Math.max(t.length - 1, 1) / 2;
			((e -= s), (i += s));
		}
		((this._startValue = e), (this._endValue = i), (this._valueRange = i - e));
	}
	getLabelForValue(t) {
		return Qn(t, this.chart.options.locale, this.options.ticks.format);
	}
}
class Qx extends Hi {
	static id = 'linear';
	static defaults = { ticks: { callback: ts.formatters.numeric } };
	determineDataLimits() {
		const { min: t, max: e } = this.getMinMax(!0);
		((this.min = Q(t) ? t : 0), (this.max = Q(e) ? e : 1), this.handleTickRangeOptions());
	}
	computeTickLimit() {
		const t = this.isHorizontal(),
			e = t ? this.width : this.height,
			i = Tt(this.options.ticks.minRotation),
			s = (t ? Math.sin(i) : Math.cos(i)) || 0.001,
			o = this._resolveTickFontOptions(0);
		return Math.ceil(e / Math.min(40, o.lineHeight / s));
	}
	getPixelForValue(t) {
		return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
	}
	getValueForPixel(t) {
		return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
	}
}
const Hn = (n) => Math.floor(qt(n)),
	fe = (n, t) => Math.pow(10, Hn(n) + t);
function hl(n) {
	return n / Math.pow(10, Hn(n)) === 1;
}
function dl(n, t, e) {
	const i = Math.pow(10, e),
		s = Math.floor(n / i);
	return Math.ceil(t / i) - s;
}
function Jx(n, t) {
	const e = t - n;
	let i = Hn(e);
	for (; dl(n, t, i) > 10; ) i++;
	for (; dl(n, t, i) < 10; ) i--;
	return Math.min(i, Hn(n));
}
function Zx(n, { min: t, max: e }) {
	t = xt(n.min, t);
	const i = [],
		s = Hn(t);
	let o = Jx(t, e),
		r = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
	const a = Math.pow(10, o),
		l = s > o ? Math.pow(10, s) : 0,
		c = Math.round((t - l) * r) / r,
		h = Math.floor((t - l) / a / 10) * a * 10;
	let d = Math.floor((c - h) / Math.pow(10, o)),
		u = xt(n.min, Math.round((l + h + d * Math.pow(10, o)) * r) / r);
	for (; u < e; )
		(i.push({ value: u, major: hl(u), significand: d }),
			d >= 10 ? (d = d < 15 ? 15 : 20) : d++,
			d >= 20 && (o++, (d = 2), (r = o >= 0 ? 1 : r)),
			(u = Math.round((l + h + d * Math.pow(10, o)) * r) / r));
	const f = xt(n.max, u);
	return (i.push({ value: f, major: hl(f), significand: d }), i);
}
class tv extends Pe {
	static id = 'logarithmic';
	static defaults = { ticks: { callback: ts.formatters.logarithmic, major: { enabled: !0 } } };
	constructor(t) {
		(super(t),
			(this.start = void 0),
			(this.end = void 0),
			(this._startValue = void 0),
			(this._valueRange = 0));
	}
	parse(t, e) {
		const i = Hi.prototype.parse.apply(this, [t, e]);
		if (i === 0) {
			this._zero = !0;
			return;
		}
		return Q(i) && i > 0 ? i : null;
	}
	determineDataLimits() {
		const { min: t, max: e } = this.getMinMax(!0);
		((this.min = Q(t) ? Math.max(0, t) : null),
			(this.max = Q(e) ? Math.max(0, e) : null),
			this.options.beginAtZero && (this._zero = !0),
			this._zero &&
				this.min !== this._suggestedMin &&
				!Q(this._userMin) &&
				(this.min = t === fe(this.min, 0) ? fe(this.min, -1) : fe(this.min, 0)),
			this.handleTickRangeOptions());
	}
	handleTickRangeOptions() {
		const { minDefined: t, maxDefined: e } = this.getUserBounds();
		let i = this.min,
			s = this.max;
		const o = (a) => (i = t ? i : a),
			r = (a) => (s = e ? s : a);
		(i === s && (i <= 0 ? (o(1), r(10)) : (o(fe(i, -1)), r(fe(s, 1)))),
			i <= 0 && o(fe(s, -1)),
			s <= 0 && r(fe(i, 1)),
			(this.min = i),
			(this.max = s));
	}
	buildTicks() {
		const t = this.options,
			e = { min: this._userMin, max: this._userMax },
			i = Zx(e, this);
		return (
			t.bounds === 'ticks' && ih(i, this, 'value'),
			t.reverse
				? (i.reverse(), (this.start = this.max), (this.end = this.min))
				: ((this.start = this.min), (this.end = this.max)),
			i
		);
	}
	getLabelForValue(t) {
		return t === void 0 ? '0' : Qn(t, this.chart.options.locale, this.options.ticks.format);
	}
	configure() {
		const t = this.min;
		(super.configure(), (this._startValue = qt(t)), (this._valueRange = qt(this.max) - qt(t)));
	}
	getPixelForValue(t) {
		return (
			(t === void 0 || t === 0) && (t = this.min),
			t === null || isNaN(t)
				? NaN
				: this.getPixelForDecimal(
						t === this.min ? 0 : (qt(t) - this._startValue) / this._valueRange
					)
		);
	}
	getValueForPixel(t) {
		const e = this.getDecimalForPixel(t);
		return Math.pow(10, this._startValue + e * this._valueRange);
	}
}
function io(n) {
	const t = n.ticks;
	if (t.display && n.display) {
		const e = ut(t.backdropPadding);
		return I(t.font && t.font.size, K.font.size) + e.height;
	}
	return 0;
}
function ev(n, t, e) {
	return ((e = q(e) ? e : [e]), { w: Xm(n, t.string, e), h: e.length * t.lineHeight });
}
function ul(n, t, e, i, s) {
	return n === i || n === s
		? { start: t - e / 2, end: t + e / 2 }
		: n < i || n > s
			? { start: t - e, end: t }
			: { start: t, end: t + e };
}
function nv(n) {
	const t = {
			l: n.left + n._padding.left,
			r: n.right - n._padding.right,
			t: n.top + n._padding.top,
			b: n.bottom - n._padding.bottom
		},
		e = Object.assign({}, t),
		i = [],
		s = [],
		o = n._pointLabels.length,
		r = n.options.pointLabels,
		a = r.centerPointLabels ? Y / o : 0;
	for (let l = 0; l < o; l++) {
		const c = r.setContext(n.getPointLabelContext(l));
		s[l] = c.padding;
		const h = n.getPointPosition(l, n.drawingArea + s[l], a),
			d = nt(c.font),
			u = ev(n.ctx, d, n._pointLabels[l]);
		i[l] = u;
		const f = vt(n.getIndexAngle(l) + a),
			g = Math.round(Ho(f)),
			p = ul(g, h.x, u.w, 0, 180),
			m = ul(g, h.y, u.h, 90, 270);
		iv(e, t, f, p, m);
	}
	(n.setCenterPoint(t.l - e.l, e.r - t.r, t.t - e.t, e.b - t.b),
		(n._pointLabelItems = rv(n, i, s)));
}
function iv(n, t, e, i, s) {
	const o = Math.abs(Math.sin(e)),
		r = Math.abs(Math.cos(e));
	let a = 0,
		l = 0;
	(i.start < t.l
		? ((a = (t.l - i.start) / o), (n.l = Math.min(n.l, t.l - a)))
		: i.end > t.r && ((a = (i.end - t.r) / o), (n.r = Math.max(n.r, t.r + a))),
		s.start < t.t
			? ((l = (t.t - s.start) / r), (n.t = Math.min(n.t, t.t - l)))
			: s.end > t.b && ((l = (s.end - t.b) / r), (n.b = Math.max(n.b, t.b + l))));
}
function sv(n, t, e) {
	const i = n.drawingArea,
		{ extra: s, additionalAngle: o, padding: r, size: a } = e,
		l = n.getPointPosition(t, i + s + r, o),
		c = Math.round(Ho(vt(l.angle + Z))),
		h = cv(l.y, a.h, c),
		d = av(c),
		u = lv(l.x, a.w, d);
	return {
		visible: !0,
		x: l.x,
		y: h,
		textAlign: d,
		left: u,
		top: h,
		right: u + a.w,
		bottom: h + a.h
	};
}
function ov(n, t) {
	if (!t) return !0;
	const { left: e, top: i, right: s, bottom: o } = n;
	return !(
		zt({ x: e, y: i }, t) ||
		zt({ x: e, y: o }, t) ||
		zt({ x: s, y: i }, t) ||
		zt({ x: s, y: o }, t)
	);
}
function rv(n, t, e) {
	const i = [],
		s = n._pointLabels.length,
		o = n.options,
		{ centerPointLabels: r, display: a } = o.pointLabels,
		l = { extra: io(o) / 2, additionalAngle: r ? Y / s : 0 };
	let c;
	for (let h = 0; h < s; h++) {
		((l.padding = e[h]), (l.size = t[h]));
		const d = sv(n, h, l);
		(i.push(d), a === 'auto' && ((d.visible = ov(d, c)), d.visible && (c = d)));
	}
	return i;
}
function av(n) {
	return n === 0 || n === 180 ? 'center' : n < 180 ? 'left' : 'right';
}
function lv(n, t, e) {
	return (e === 'right' ? (n -= t) : e === 'center' && (n -= t / 2), n);
}
function cv(n, t, e) {
	return (e === 90 || e === 270 ? (n -= t / 2) : (e > 270 || e < 90) && (n -= t), n);
}
function hv(n, t, e) {
	const { left: i, top: s, right: o, bottom: r } = e,
		{ backdropColor: a } = t;
	if (!L(a)) {
		const l = we(t.borderRadius),
			c = ut(t.backdropPadding);
		n.fillStyle = a;
		const h = i - c.left,
			d = s - c.top,
			u = o - i + c.width,
			f = r - s + c.height;
		Object.values(l).some((g) => g !== 0)
			? (n.beginPath(), zn(n, { x: h, y: d, w: u, h: f, radius: l }), n.fill())
			: n.fillRect(h, d, u, f);
	}
}
function dv(n, t) {
	const {
		ctx: e,
		options: { pointLabels: i }
	} = n;
	for (let s = t - 1; s >= 0; s--) {
		const o = n._pointLabelItems[s];
		if (!o.visible) continue;
		const r = i.setContext(n.getPointLabelContext(s));
		hv(e, r, o);
		const a = nt(r.font),
			{ x: l, y: c, textAlign: h } = o;
		Ie(e, n._pointLabels[s], l, c + a.lineHeight / 2, a, {
			color: r.color,
			textAlign: h,
			textBaseline: 'middle'
		});
	}
}
function qh(n, t, e, i) {
	const { ctx: s } = n;
	if (e) s.arc(n.xCenter, n.yCenter, t, 0, $);
	else {
		let o = n.getPointPosition(0, t);
		s.moveTo(o.x, o.y);
		for (let r = 1; r < i; r++) ((o = n.getPointPosition(r, t)), s.lineTo(o.x, o.y));
	}
}
function uv(n, t, e, i, s) {
	const o = n.ctx,
		r = t.circular,
		{ color: a, lineWidth: l } = t;
	(!r && !i) ||
		!a ||
		!l ||
		e < 0 ||
		(o.save(),
		(o.strokeStyle = a),
		(o.lineWidth = l),
		o.setLineDash(s.dash || []),
		(o.lineDashOffset = s.dashOffset),
		o.beginPath(),
		qh(n, e, r, i),
		o.closePath(),
		o.stroke(),
		o.restore());
}
function fv(n, t, e) {
	return re(n, { label: e, index: t, type: 'pointLabel' });
}
class gv extends Hi {
	static id = 'radialLinear';
	static defaults = {
		display: !0,
		animate: !0,
		position: 'chartArea',
		angleLines: { display: !0, lineWidth: 1, borderDash: [], borderDashOffset: 0 },
		grid: { circular: !1 },
		startAngle: 0,
		ticks: { showLabelBackdrop: !0, callback: ts.formatters.numeric },
		pointLabels: {
			backdropColor: void 0,
			backdropPadding: 2,
			display: !0,
			font: { size: 10 },
			callback(t) {
				return t;
			},
			padding: 5,
			centerPointLabels: !1
		}
	};
	static defaultRoutes = {
		'angleLines.color': 'borderColor',
		'pointLabels.color': 'color',
		'ticks.color': 'color'
	};
	static descriptors = { angleLines: { _fallback: 'grid' } };
	constructor(t) {
		(super(t),
			(this.xCenter = void 0),
			(this.yCenter = void 0),
			(this.drawingArea = void 0),
			(this._pointLabels = []),
			(this._pointLabelItems = []));
	}
	setDimensions() {
		const t = (this._padding = ut(io(this.options) / 2)),
			e = (this.width = this.maxWidth - t.width),
			i = (this.height = this.maxHeight - t.height);
		((this.xCenter = Math.floor(this.left + e / 2 + t.left)),
			(this.yCenter = Math.floor(this.top + i / 2 + t.top)),
			(this.drawingArea = Math.floor(Math.min(e, i) / 2)));
	}
	determineDataLimits() {
		const { min: t, max: e } = this.getMinMax(!1);
		((this.min = Q(t) && !isNaN(t) ? t : 0),
			(this.max = Q(e) && !isNaN(e) ? e : 0),
			this.handleTickRangeOptions());
	}
	computeTickLimit() {
		return Math.ceil(this.drawingArea / io(this.options));
	}
	generateTickLabels(t) {
		(Hi.prototype.generateTickLabels.call(this, t),
			(this._pointLabels = this.getLabels()
				.map((e, i) => {
					const s = V(this.options.pointLabels.callback, [e, i], this);
					return s || s === 0 ? s : '';
				})
				.filter((e, i) => this.chart.getDataVisibility(i))));
	}
	fit() {
		const t = this.options;
		t.display && t.pointLabels.display ? nv(this) : this.setCenterPoint(0, 0, 0, 0);
	}
	setCenterPoint(t, e, i, s) {
		((this.xCenter += Math.floor((t - e) / 2)),
			(this.yCenter += Math.floor((i - s) / 2)),
			(this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, i, s))));
	}
	getIndexAngle(t) {
		const e = $ / (this._pointLabels.length || 1),
			i = this.options.startAngle || 0;
		return vt(t * e + Tt(i));
	}
	getDistanceFromCenterForValue(t) {
		if (L(t)) return NaN;
		const e = this.drawingArea / (this.max - this.min);
		return this.options.reverse ? (this.max - t) * e : (t - this.min) * e;
	}
	getValueForDistanceFromCenter(t) {
		if (L(t)) return NaN;
		const e = t / (this.drawingArea / (this.max - this.min));
		return this.options.reverse ? this.max - e : this.min + e;
	}
	getPointLabelContext(t) {
		const e = this._pointLabels || [];
		if (t >= 0 && t < e.length) {
			const i = e[t];
			return fv(this.getContext(), t, i);
		}
	}
	getPointPosition(t, e, i = 0) {
		const s = this.getIndexAngle(t) - Z + i;
		return { x: Math.cos(s) * e + this.xCenter, y: Math.sin(s) * e + this.yCenter, angle: s };
	}
	getPointPositionForValue(t, e) {
		return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
	}
	getBasePosition(t) {
		return this.getPointPositionForValue(t || 0, this.getBaseValue());
	}
	getPointLabelPosition(t) {
		const { left: e, top: i, right: s, bottom: o } = this._pointLabelItems[t];
		return { left: e, top: i, right: s, bottom: o };
	}
	drawBackground() {
		const {
			backgroundColor: t,
			grid: { circular: e }
		} = this.options;
		if (t) {
			const i = this.ctx;
			(i.save(),
				i.beginPath(),
				qh(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length),
				i.closePath(),
				(i.fillStyle = t),
				i.fill(),
				i.restore());
		}
	}
	drawGrid() {
		const t = this.ctx,
			e = this.options,
			{ angleLines: i, grid: s, border: o } = e,
			r = this._pointLabels.length;
		let a, l, c;
		if (
			(e.pointLabels.display && dv(this, r),
			s.display &&
				this.ticks.forEach((h, d) => {
					if (d !== 0 || (d === 0 && this.min < 0)) {
						l = this.getDistanceFromCenterForValue(h.value);
						const u = this.getContext(d),
							f = s.setContext(u),
							g = o.setContext(u);
						uv(this, f, l, r, g);
					}
				}),
			i.display)
		) {
			for (t.save(), a = r - 1; a >= 0; a--) {
				const h = i.setContext(this.getPointLabelContext(a)),
					{ color: d, lineWidth: u } = h;
				!u ||
					!d ||
					((t.lineWidth = u),
					(t.strokeStyle = d),
					t.setLineDash(h.borderDash),
					(t.lineDashOffset = h.borderDashOffset),
					(l = this.getDistanceFromCenterForValue(e.reverse ? this.min : this.max)),
					(c = this.getPointPosition(a, l)),
					t.beginPath(),
					t.moveTo(this.xCenter, this.yCenter),
					t.lineTo(c.x, c.y),
					t.stroke());
			}
			t.restore();
		}
	}
	drawBorder() {}
	drawLabels() {
		const t = this.ctx,
			e = this.options,
			i = e.ticks;
		if (!i.display) return;
		const s = this.getIndexAngle(0);
		let o, r;
		(t.save(),
			t.translate(this.xCenter, this.yCenter),
			t.rotate(s),
			(t.textAlign = 'center'),
			(t.textBaseline = 'middle'),
			this.ticks.forEach((a, l) => {
				if (l === 0 && this.min >= 0 && !e.reverse) return;
				const c = i.setContext(this.getContext(l)),
					h = nt(c.font);
				if (((o = this.getDistanceFromCenterForValue(this.ticks[l].value)), c.showLabelBackdrop)) {
					((t.font = h.string),
						(r = t.measureText(a.label).width),
						(t.fillStyle = c.backdropColor));
					const d = ut(c.backdropPadding);
					t.fillRect(-r / 2 - d.left, -o - h.size / 2 - d.top, r + d.width, h.size + d.height);
				}
				Ie(t, a.label, 0, -o, h, {
					color: c.color,
					strokeColor: c.textStrokeColor,
					strokeWidth: c.textStrokeWidth
				});
			}),
			t.restore());
	}
	drawTitle() {}
}
const rs = {
		millisecond: { common: !0, size: 1, steps: 1e3 },
		second: { common: !0, size: 1e3, steps: 60 },
		minute: { common: !0, size: 6e4, steps: 60 },
		hour: { common: !0, size: 36e5, steps: 24 },
		day: { common: !0, size: 864e5, steps: 30 },
		week: { common: !1, size: 6048e5, steps: 4 },
		month: { common: !0, size: 2628e6, steps: 12 },
		quarter: { common: !1, size: 7884e6, steps: 4 },
		year: { common: !0, size: 3154e7 }
	},
	pt = Object.keys(rs);
function fl(n, t) {
	return n - t;
}
function gl(n, t) {
	if (L(t)) return null;
	const e = n._adapter,
		{ parser: i, round: s, isoWeekday: o } = n._parseOpts;
	let r = t;
	return (
		typeof i == 'function' && (r = i(r)),
		Q(r) || (r = typeof i == 'string' ? e.parse(r, i) : e.parse(r)),
		r === null
			? null
			: (s &&
					(r = s === 'week' && (Ye(o) || o === !0) ? e.startOf(r, 'isoWeek', o) : e.startOf(r, s)),
				+r)
	);
}
function pl(n, t, e, i) {
	const s = pt.length;
	for (let o = pt.indexOf(n); o < s - 1; ++o) {
		const r = rs[pt[o]],
			a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
		if (r.common && Math.ceil((e - t) / (a * r.size)) <= i) return pt[o];
	}
	return pt[s - 1];
}
function pv(n, t, e, i, s) {
	for (let o = pt.length - 1; o >= pt.indexOf(e); o--) {
		const r = pt[o];
		if (rs[r].common && n._adapter.diff(s, i, r) >= t - 1) return r;
	}
	return pt[e ? pt.indexOf(e) : 0];
}
function mv(n) {
	for (let t = pt.indexOf(n) + 1, e = pt.length; t < e; ++t) if (rs[pt[t]].common) return pt[t];
}
function ml(n, t, e) {
	if (!e) n[t] = !0;
	else if (e.length) {
		const { lo: i, hi: s } = jo(e, t),
			o = e[i] >= t ? e[i] : e[s];
		n[o] = !0;
	}
}
function _v(n, t, e, i) {
	const s = n._adapter,
		o = +s.startOf(t[0].value, i),
		r = t[t.length - 1].value;
	let a, l;
	for (a = o; a <= r; a = +s.add(a, 1, i)) ((l = e[a]), l >= 0 && (t[l].major = !0));
	return t;
}
function _l(n, t, e) {
	const i = [],
		s = {},
		o = t.length;
	let r, a;
	for (r = 0; r < o; ++r) ((a = t[r]), (s[a] = r), i.push({ value: a, major: !1 }));
	return o === 0 || !e ? i : _v(n, i, s, e);
}
class so extends Pe {
	static id = 'time';
	static defaults = {
		bounds: 'data',
		adapters: {},
		time: {
			parser: !1,
			unit: !1,
			round: !1,
			isoWeekday: !1,
			minUnit: 'millisecond',
			displayFormats: {}
		},
		ticks: { source: 'auto', callback: !1, major: { enabled: !1 } }
	};
	constructor(t) {
		(super(t),
			(this._cache = { data: [], labels: [], all: [] }),
			(this._unit = 'day'),
			(this._majorUnit = void 0),
			(this._offsets = {}),
			(this._normalized = !1),
			(this._parseOpts = void 0));
	}
	init(t, e = {}) {
		const i = t.time || (t.time = {}),
			s = (this._adapter = new bb._date(t.adapters.date));
		(s.init(e),
			vn(i.displayFormats, s.formats()),
			(this._parseOpts = { parser: i.parser, round: i.round, isoWeekday: i.isoWeekday }),
			super.init(t),
			(this._normalized = e.normalized));
	}
	parse(t, e) {
		return t === void 0 ? null : gl(this, t);
	}
	beforeLayout() {
		(super.beforeLayout(), (this._cache = { data: [], labels: [], all: [] }));
	}
	determineDataLimits() {
		const t = this.options,
			e = this._adapter,
			i = t.time.unit || 'day';
		let { min: s, max: o, minDefined: r, maxDefined: a } = this.getUserBounds();
		function l(c) {
			(!r && !isNaN(c.min) && (s = Math.min(s, c.min)),
				!a && !isNaN(c.max) && (o = Math.max(o, c.max)));
		}
		((!r || !a) &&
			(l(this._getLabelBounds()),
			(t.bounds !== 'ticks' || t.ticks.source !== 'labels') && l(this.getMinMax(!1))),
			(s = Q(s) && !isNaN(s) ? s : +e.startOf(Date.now(), i)),
			(o = Q(o) && !isNaN(o) ? o : +e.endOf(Date.now(), i) + 1),
			(this.min = Math.min(s, o - 1)),
			(this.max = Math.max(s + 1, o)));
	}
	_getLabelBounds() {
		const t = this.getLabelTimestamps();
		let e = Number.POSITIVE_INFINITY,
			i = Number.NEGATIVE_INFINITY;
		return (t.length && ((e = t[0]), (i = t[t.length - 1])), { min: e, max: i });
	}
	buildTicks() {
		const t = this.options,
			e = t.time,
			i = t.ticks,
			s = i.source === 'labels' ? this.getLabelTimestamps() : this._generate();
		t.bounds === 'ticks' &&
			s.length &&
			((this.min = this._userMin || s[0]), (this.max = this._userMax || s[s.length - 1]));
		const o = this.min,
			r = this.max,
			a = Fm(s, o, r);
		return (
			(this._unit =
				e.unit ||
				(i.autoSkip
					? pl(e.minUnit, this.min, this.max, this._getLabelCapacity(o))
					: pv(this, a.length, e.minUnit, this.min, this.max))),
			(this._majorUnit = !i.major.enabled || this._unit === 'year' ? void 0 : mv(this._unit)),
			this.initOffsets(s),
			t.reverse && a.reverse(),
			_l(this, a, this._majorUnit)
		);
	}
	afterAutoSkip() {
		this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
	}
	initOffsets(t = []) {
		let e = 0,
			i = 0,
			s,
			o;
		this.options.offset &&
			t.length &&
			((s = this.getDecimalForValue(t[0])),
			t.length === 1 ? (e = 1 - s) : (e = (this.getDecimalForValue(t[1]) - s) / 2),
			(o = this.getDecimalForValue(t[t.length - 1])),
			t.length === 1 ? (i = o) : (i = (o - this.getDecimalForValue(t[t.length - 2])) / 2));
		const r = t.length < 3 ? 0.5 : 0.25;
		((e = rt(e, 0, r)),
			(i = rt(i, 0, r)),
			(this._offsets = { start: e, end: i, factor: 1 / (e + 1 + i) }));
	}
	_generate() {
		const t = this._adapter,
			e = this.min,
			i = this.max,
			s = this.options,
			o = s.time,
			r = o.unit || pl(o.minUnit, e, i, this._getLabelCapacity(e)),
			a = I(s.ticks.stepSize, 1),
			l = r === 'week' ? o.isoWeekday : !1,
			c = Ye(l) || l === !0,
			h = {};
		let d = e,
			u,
			f;
		if (
			(c && (d = +t.startOf(d, 'isoWeek', l)),
			(d = +t.startOf(d, c ? 'day' : r)),
			t.diff(i, e, r) > 1e5 * a)
		)
			throw new Error(e + ' and ' + i + ' are too far apart with stepSize of ' + a + ' ' + r);
		const g = s.ticks.source === 'data' && this.getDataTimestamps();
		for (u = d, f = 0; u < i; u = +t.add(u, a, r), f++) ml(h, u, g);
		return (
			(u === i || s.bounds === 'ticks' || f === 1) && ml(h, u, g),
			Object.keys(h)
				.sort(fl)
				.map((p) => +p)
		);
	}
	getLabelForValue(t) {
		const e = this._adapter,
			i = this.options.time;
		return i.tooltipFormat ? e.format(t, i.tooltipFormat) : e.format(t, i.displayFormats.datetime);
	}
	format(t, e) {
		const s = this.options.time.displayFormats,
			o = this._unit,
			r = e || s[o];
		return this._adapter.format(t, r);
	}
	_tickFormatFunction(t, e, i, s) {
		const o = this.options,
			r = o.ticks.callback;
		if (r) return V(r, [t, e, i], this);
		const a = o.time.displayFormats,
			l = this._unit,
			c = this._majorUnit,
			h = l && a[l],
			d = c && a[c],
			u = i[e],
			f = c && d && u && u.major;
		return this._adapter.format(t, s || (f ? d : h));
	}
	generateTickLabels(t) {
		let e, i, s;
		for (e = 0, i = t.length; e < i; ++e)
			((s = t[e]), (s.label = this._tickFormatFunction(s.value, e, t)));
	}
	getDecimalForValue(t) {
		return t === null ? NaN : (t - this.min) / (this.max - this.min);
	}
	getPixelForValue(t) {
		const e = this._offsets,
			i = this.getDecimalForValue(t);
		return this.getPixelForDecimal((e.start + i) * e.factor);
	}
	getValueForPixel(t) {
		const e = this._offsets,
			i = this.getDecimalForPixel(t) / e.factor - e.end;
		return this.min + i * (this.max - this.min);
	}
	_getLabelSize(t) {
		const e = this.options.ticks,
			i = this.ctx.measureText(t).width,
			s = Tt(this.isHorizontal() ? e.maxRotation : e.minRotation),
			o = Math.cos(s),
			r = Math.sin(s),
			a = this._resolveTickFontOptions(0).size;
		return { w: i * o + a * r, h: i * r + a * o };
	}
	_getLabelCapacity(t) {
		const e = this.options.time,
			i = e.displayFormats,
			s = i[e.unit] || i.millisecond,
			o = this._tickFormatFunction(t, 0, _l(this, [t], this._majorUnit), s),
			r = this._getLabelSize(o),
			a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
		return a > 0 ? a : 1;
	}
	getDataTimestamps() {
		let t = this._cache.data || [],
			e,
			i;
		if (t.length) return t;
		const s = this.getMatchingVisibleMetas();
		if (this._normalized && s.length)
			return (this._cache.data = s[0].controller.getAllParsedValues(this));
		for (e = 0, i = s.length; e < i; ++e) t = t.concat(s[e].controller.getAllParsedValues(this));
		return (this._cache.data = this.normalize(t));
	}
	getLabelTimestamps() {
		const t = this._cache.labels || [];
		let e, i;
		if (t.length) return t;
		const s = this.getLabels();
		for (e = 0, i = s.length; e < i; ++e) t.push(gl(this, s[e]));
		return (this._cache.labels = this._normalized ? t : this.normalize(t));
	}
	normalize(t) {
		return rh(t.sort(fl));
	}
}
function gi(n, t, e) {
	let i = 0,
		s = n.length - 1,
		o,
		r,
		a,
		l;
	e
		? (t >= n[i].pos && t <= n[s].pos && ({ lo: i, hi: s } = Wt(n, 'pos', t)),
			({ pos: o, time: a } = n[i]),
			({ pos: r, time: l } = n[s]))
		: (t >= n[i].time && t <= n[s].time && ({ lo: i, hi: s } = Wt(n, 'time', t)),
			({ time: o, pos: a } = n[i]),
			({ time: r, pos: l } = n[s]));
	const c = r - o;
	return c ? a + ((l - a) * (t - o)) / c : a;
}
class bv extends so {
	static id = 'timeseries';
	static defaults = so.defaults;
	constructor(t) {
		(super(t), (this._table = []), (this._minPos = void 0), (this._tableRange = void 0));
	}
	initOffsets() {
		const t = this._getTimestampsForTable(),
			e = (this._table = this.buildLookupTable(t));
		((this._minPos = gi(e, this.min)),
			(this._tableRange = gi(e, this.max) - this._minPos),
			super.initOffsets(t));
	}
	buildLookupTable(t) {
		const { min: e, max: i } = this,
			s = [],
			o = [];
		let r, a, l, c, h;
		for (r = 0, a = t.length; r < a; ++r) ((c = t[r]), c >= e && c <= i && s.push(c));
		if (s.length < 2)
			return [
				{ time: e, pos: 0 },
				{ time: i, pos: 1 }
			];
		for (r = 0, a = s.length; r < a; ++r)
			((h = s[r + 1]),
				(l = s[r - 1]),
				(c = s[r]),
				Math.round((h + l) / 2) !== c && o.push({ time: c, pos: r / (a - 1) }));
		return o;
	}
	_generate() {
		const t = this.min,
			e = this.max;
		let i = super.getDataTimestamps();
		return (
			(!i.includes(t) || !i.length) && i.splice(0, 0, t),
			(!i.includes(e) || i.length === 1) && i.push(e),
			i.sort((s, o) => s - o)
		);
	}
	_getTimestampsForTable() {
		let t = this._cache.all || [];
		if (t.length) return t;
		const e = this.getDataTimestamps(),
			i = this.getLabelTimestamps();
		return (
			e.length && i.length ? (t = this.normalize(e.concat(i))) : (t = e.length ? e : i),
			(t = this._cache.all = t),
			t
		);
	}
	getDecimalForValue(t) {
		return (gi(this._table, t) - this._minPos) / this._tableRange;
	}
	getValueForPixel(t) {
		const e = this._offsets,
			i = this.getDecimalForPixel(t) / e.factor - e.end;
		return gi(this._table, i * this._tableRange + this._minPos, !0);
	}
}
var yv = Object.freeze({
	__proto__: null,
	CategoryScale: Kx,
	LinearScale: Qx,
	LogarithmicScale: tv,
	RadialLinearScale: gv,
	TimeScale: so,
	TimeSeriesScale: bv
});
const xv = [_b, Xy, $x, yv];
tr.register(...xv);
var vv = Kh('<div class="chart-container svelte-nj2w34"><canvas></canvas></div>');
function Pv(n, t) {
	Jh(t, !1);
	let e = ed(),
		i = {},
		s = rd(t, 'gameCode', 8);
	(Zh(async () => {
		try {
			i = await tm(s());
		} catch (c) {
			console.error('Error fetching scores:', c);
		}
		const a = Object.keys(i),
			l = a.map((c, h) => {
				const d = a.map((u) => (c === u ? 100 : i[c][u].accuracyPercentage));
				return {
					label: c,
					data: d,
					borderColor: `hsl(${(h * 360) / a.length}, 70%, 50%)`,
					backgroundColor: `hsl(${(h * 360) / a.length}, 70%, 50%)`,
					pointRadius: 6,
					tension: 0.1
				};
			});
		new tr(ir(e), {
			type: 'line',
			data: { labels: a, datasets: l },
			options: {
				responsive: !0,
				plugins: { title: { display: !0, text: 'How well each player knows each other player' } },
				scales: {
					y: { beginAtZero: !0, max: 100, title: { display: !0, text: 'Accuracy Percentage' } }
				}
			}
		});
	}),
		Qh());
	var o = vv(),
		r = nd(o);
	(od(
		r,
		(a) => id(e, a),
		() => ir(e)
	),
		sd(o),
		Xh(n, o),
		td());
}
export { Pv as G, Tv as a, Mv as b, ye as d, Qc as g, Iv as i, be as r };
