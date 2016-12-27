!function() {
    function t() {
        this._stack = new Uint32Array(816), this._sets = new Uint32Array(16), this._size = 16, 
        this._ptr = 0, this._headPos = 0, this._wcfg = new s();
    }
    var s = require("./config"), i = s.DAT_MASKS;
    t.prototype = {
        initFromGL: function(t) {
            this._ptr = 0, this._wcfg.fromGL(t), this._sets[0] = 0, this._stack.set(this._wcfg._dat);
        },
        push: function(t) {
            var s, h, _, e, o, n, r = this._ptr, c = this._sets[r++], a = t._set;
            for (r === this._size && this._grow(), c |= a, this._sets[r] = c, this._ptr = r, 
            s = 51 * r, h = this._stack, _ = t._dat, e = 0; e < 51; e++) o = i[e], n = 0 !== (a & o) ? _[e] : h[s + e - 51], 
            h[s + e] = n;
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
            this.copyConfig(s, t), this._headPos = s, s > 0 && (this._sets[s - 1] |= this._sets[s]), 
            this._sets[s] = 0;
        },
        patch: function(t, s) {
            this.copyConfig(this._ptr, this._wcfg), this._wcfg.patch(t, s);
        },
        copyConfig: function(t, s) {
            for (var i = s._dat, h = this._stack, _ = 0 | 51 * t, e = 0; e < 51; e++) i[e] = h[_ + e];
            s._set = this._sets[t];
        },
        _grow: function() {
            var t = this._size << 1, s = new Uint32Array(51 * t), i = new Uint32Array(t);
            s.set(this._stack, 0), i.set(this._sets, 0), this._stack = s, this._sets = i, this._size = t;
        }
    }, module.exports = t;
}();