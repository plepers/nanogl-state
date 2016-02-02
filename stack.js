!function() {
    function t() {
        this._stack = new Uint32Array(816), this._sets = new Uint32Array(16), this._tmpDat = new Uint32Array(51), 
        this._size = 16, this._ptr = 0, this._headPos = 0, this._wcfg = new s();
    }
    var s = require("./config"), i = s.DAT_MASKS;
    t.prototype = {
        initFromGL: function(t) {
            this._ptr = 0, this._wcfg.fromGL(t), this._sets[0] = 0, this._stack.set(this._wcfg._dat);
        },
        push: function(t) {
            var s, h, _, e, n, r, o, a = this._ptr, c = this._sets[a++], f = t._set;
            for (a == this._size && this._grow(), c |= f, this._sets[a] = c, this._ptr = a, 
            s = 51 * a, h = this._stack, _ = t._dat, e = this._tmpDat, n = 0; 51 > n; n++) r = i[n], 
            o = 0 !== (f & r) ? _[n] : h[s + n - 51], e[n] = o;
            h.set(e, s);
        },
        pop: function() {
            var t = --this._ptr;
            this._headPos > t && (this._sets[t] |= this._sets[t + 1], this._headPos = t);
        },
        flush: function() {
            for (;this._ptr > 0; ) this.pop();
        },
        commit: function(t) {
            var s = this._ptr;
            this.copyConfig(s, t), this._headPos = s, this._sets[s - 1] |= this._sets[s], this._sets[s] = 0;
        },
        patch: function(t, s) {
            this.copyConfig(this._ptr, this._wcfg), this._wcfg.patch(t, s);
        },
        copyConfig: function(t, s) {
            var i = new Uint32Array(this._stack.buffer, 204 * t, 51);
            s._dat.set(i), s._set = this._sets[t];
        },
        _grow: function() {
            var t = this._size << 1, s = new Uint32Array(51 * t), i = new Uint32Array(t);
            s.set(this._stack, 0), i.set(this._sets, 0), this._stack = s, this._sets = i, this._size = t;
        }
    }, module.exports = t;
}();