
// setiap mode menggunakan variable global
let a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
let cond = [true];

// untuk mathjax display mode
const _s = '<span class="m-d">\\[';
const _t = '\\]</span>';
const _b = '<span class="m-d">\\begin{align*}';
const _e = '\\end{align*}</span>';


const formInput = document.querySelector('.subject');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');
let tableArea = document.getElementById("tableArea");

const acakSoal = document.getElementById('acak-soal');
acakSoal.addEventListener('click', () => soalRandom(), false);

const buatSoal = document.getElementById('buat-soal');
buatSoal.addEventListener('click', latihan, false);

const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const lihatSolusi = document.getElementById('look');
lihatSolusi.addEventListener('click', bukaSolusi, false);

const btns = document.querySelectorAll('.btn-mode');
btns[0].addEventListener('click', openInput, false);
btns[1].addEventListener('click', openRandom, false);
btns[2].addEventListener('click', openLatihan, false);

btns.forEach(i => i.addEventListener('click', function() {
    const current = document.querySelector('.mode-active');
    current.className = current.className.replace(' mode-active', '');
    this.className += ' mode-active';
}))

const solveButton = document.getElementById("solve");
solveButton.addEventListener("click", () => solve(), false); 


// fokuskan kursor ke input berikutnya ketika enter ditekan
let inputAll = document.querySelectorAll('input');
for (let i = 0; i < inputAll.length; i++){
    inputAll[i].addEventListener('keydown', e => {
        if (e.keyCode !== 13) return;

        if (i < inputAll.length -1) {
            inputAll[i + 1].focus();
        } else {
            solveButton.focus();
            solve();
        }
    }, false);
}

// memeriksa batasan input dari user agar program valid
function cekBatasan() {
    if (cond.every(_ => _)) return true;

    output1.innerHTML = 'Input tidak valid. Periksa kembali batasan.';
    output2.style.display = 'none';
    return false;
}

function solveHandler() {
    soal();
    solusi();
    lihatSolusi.style.display = 'none';
    MathJax.typeset();
}

// membuka input field ketika user berganti mode ke 'solve'
function openInput() {
    formInput.style.display = 'block';
    acakSoal.style.display = 'none';
    buatSoal.style.display = 'none';
    solve();
}

// mode random untuk membuat soal random serta solusinya
function openRandom() {
    formInput.style.display = 'none';
    acakSoal.style.display = 'initial';
    buatSoal.style.display = 'none';
    lihatSolusi.style.display = 'none';
    output1.innerHTML = 'Tekan tombol untuk menampilkan soal dan solusi acak.';
    output2.innerHTML = '';
    if (tableArea != null) tableArea.style.display = 'none';
}

// mode latihan
function openLatihan() {
    formInput.style.display = 'none';
    acakSoal.style.display = 'none';
    buatSoal.style.display = 'initial';
    lihatSolusi.style.display = 'none';
    output1.innerHTML = 'Tekan tombol untuk membuat soal.';
    output2.innerHTML = '';
    if (tableArea != null) tableArea.style.display = 'none';
}

// menampilkan soal latihan
function latihan() {
    try {
        soalRandom();
    }
    finally {
        lihatSolusi.style.display = 'inline';
        output2.style.display = 'none';
        if (tableArea != null) tableArea.style.display = 'none';
    }
}

// menampilkan solusi pada mode latihan ketika user mengklik tombol 'lihat solusi'
function bukaSolusi() {
    output2.style.display = 'block';
    if (tableArea != null) tableArea.style.display = 'block';
    this.style.display = 'none'
}


// *** FUNCTION DAN CLASS UNTUK MENGERJAKAN SOAL DAN ALAT *** //


// tanda kurang secara default, misal pada persamaan lingkaran
function defMinus(x) {
    return x < 0 ? '+' + -x : '-' + x;
}

// tanda tambah secara default, misal pada polinomial
function defPlus(x) {
    return x < 0 ? '' + x : '+' + x;
}

// seperti defPlus() tapi tidak menampilkan 0
function defSign(x) {
    if (x > 0) return '+' + x;
    if (x < 0) return '' + x;
    return '';
}

// mengambil bilangan bulat acak a dengan x <= a <= y
function intRandom(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function gcdN(arr) {
    arr = arr.map(i => Math.abs(i));
    arr.sort((a, b) => a - b);
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(arr[i], result);
        if (result === 1) break;
    }
    return result;
}

function isSquare(x) {
    return Number.isInteger(Math.sqrt(x));
}

// objek lingkaran: input dapat berupa pusat lingkaran, radius, dan radius kuadrat
// atau array [A, B, C] pada persamaan x^2+y^2+Ax+By+C=0
// dalam bilangan bulat atau pecahan
class Ling {
    constructor(a, b, r, r2) {

        // jika a array yang memuat nilai A, B, C pada persamaan x^2+y^2+Ax+By+C=0
        if (typeof a == "object" && a.length == 3) {
            let [A, B, C] = a;

            this.a = new Frac(A).kali(-0.5);
            this.b = new Frac(B).kali(-0.5);
            this.r2 = new Frac(A).pangkat(2).bagi(4)
                .tambah( new Frac(B).pangkat(2).bagi(4) )
                .kurang( new Frac(C) );
        }
        
        // jika diberikan pusat lingkaran, radius, dan radius kuadrat
        else {
            this.a = new Frac(a);
            this.b = new Frac(b);
            this.r = new Frac(r);
            this.r2 = r2 == undefined ? this.r.pangkat(2) : new Frac(r2);
        }
        
        this.aSign = this.a.defMinus();
        this.bSign = this.b.defMinus();
        this.ASign = this.a.kali(-2).signCoef('x');
        this.BSign = this.b.kali(-2).signCoef('y');

        this.C = this.a.pangkat(2)
            .tambah( this.b.pangkat(2) )
            .kurang( this.r2 );

        this.CSign = this.C.n ? this.C.defPlus() : '';
    }

    pusat() {
        return [this.a, this.b];
    }

    posisiTitik(_x, _y) {
        let x = new Frac(_x);
        let y = new Frac(_y);
        let subs = x.kurang(this.a).pangkat(2)
            .tambah( y.kurang(this.b).pangkat(2) );

        if (subs > this.r2) return 'di luar';
        if (subs < this.r2) return 'di dalam';
        return 'pada';
    }

    // persamaan lingkaran (x-a)^2 + (y-b)^2 = r^2
    bentukStandar() {
        this.strA = this.a.n ? `\\left(x ${this.aSign}\\right)^2` : 'x^2';
        this.strB = this.b.n ? `\\left(y ${this.bSign}\\right)^2` : 'y^2';
        return `${this.strA} + ${this.strB} = ${this.r2.tex()}`;
    }

    // persamaan lingkaran x^2 + y^2 + Ax + By + C = 0
    bentukUmum() {
        return `x^2 + y^2 ${this.ASign} ${this.BSign} ${this.CSign} = 0`;
    }
}

// objek pecahan (Fraction) dan operasinya
// menerima argumen bilangan bulat, 2 bilangan bulat, atau array 2 bilangan bulat
class Frac {
    constructor(n, d = 1) {
        if (d === 0) throw 'Invalid argument';
        if (typeof n == 'object') return new Frac(n[0], n[1]);

        this.n = d > 0 ? n : -n;
        this.d = d > 0 ? d : -d;

        this.reduksi();
    }

    komponen() {
        return [this.n, this.d];
    }

    // menyederhanakan: 4/6 -> 2/3, 4/2 -> 2, 0,5/2 -> 1/4
    reduksi() {
        if (Number.isInteger(this.n) && Number.isInteger(this.d)) {
            let g = gcd(Math.abs(this.n), Math.abs(this.d));
            this.n /= g;
            this.d /= g;
        } else {
            this.n * 10;
            this.d * 10;
            this.reduksi();
        }
    }

    tambah(x) {
        if (x instanceof Frac) {
            let g = gcdN([this.d, x.d]);
            return new Frac(
                this.n * (x.d / g) + x.n * (this.d / g),
                this.d * (x.d / g)
            );
        } else {
            return new Frac(this.n + x * this.d, this.d);
        }
    }

    kurang(x) {
        if (x instanceof Frac)
            return this.tambah(x.kali(-1));
        else
            return this.tambah(-x)
    }

    kali(x) {
        if (x instanceof Frac)
            return new Frac(this.n * x.n, this.d * x.d);
        else
            return new Frac(this.n * x, this.d);
    }

    // input x, output 1/x
    reci() {
        return new Frac(this.d, this.n);
    }

    bagi(x) {
        if (x instanceof Frac)
            return this.kali(x.reci());
        else
            return this.kali(new Frac(1, x));
    }

    pangkat(k) {
        if (k < 0) return this.reci().pangkat(-k);
        if (k == 1) return this;
        return new Frac(this.n ** k, this.d ** k);
    }

    tex() {
        if (!this.n) return '0';
        if (this.d == 1) return this.n + '';
        if (this.n < 0) return `-\\frac{${ -this.n }}{${ this.d }}`;
        return `\\frac{${ this.n }}{${ this.d }}`;
    }

    // menampilkan pecahan a seperti pada (x-a)
    defMinus() {
        if (this.n < 0)
            return '+' + new Frac(-this.n, this.d).tex();
        else
            return '-' + this.tex();
    }

    // menampilkan pecahan a seperti pada (x+a)
    defPlus() {
        if (this.n < 0)
            return '-' + new Frac(-this.n, this.d).tex();
        else
            return '+' + this.tex();
    }

    // seperti defPlus() tapi tidak menampilkan 0
    defSign() {
        if (this.n > 0) return '+' + this.tex();
        if (this.n < 0) return '-' + new Frac(-this.n, this.d).tex();
        return '';
    }

    // mengabungkan koefisien dg variabel, misal signCoef(-4/3, 'z') => \frac{-4}{3}z
    signCoef(x) {
        if (this.n == 0) return '';
        if (this.n == 1 && this.d == 1) return '+' + x;
        if (this.n == -1 && this.d == 1) return '-' + x;
        if (this.n < 0) return '-' + new Frac(-this.n, this.d).tex() + x;
        return '+' + this.tex() + x;
    }

    valueOf() {
        return this.n / this.d;
    }

    // memeriksa apakah 2 pecahan sama
    isEqual(x) {
        return this.n === x.n && this.d === x.d;
    }
}

// shortcut untuk membuat pecahan dalam latex dari array input
function frac(a) {
    return new Frac(a).tex();
}

class Garis {
    constructor(a, b, c) {
        if (a === 0 && b === 0) throw 'Invalid argument';
        
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // persamaan garis ax + by + c = 0
    bentukUmum() {
        if (this.a == 0 && this.c == 0)
            return `y=0`;

        if (this.b == 0 && this.c == 0)
            return `x=0`;

        if (this.a !== 0)
            return `${sign1Coef(this.a, 'x')} ${signCoef(this.b, 'y')} ${defSign(this.c)} = 0`;
        
        return `${sign1Coef(this.b, 'y')} ${defSign(this.c)} = 0`;
    }
}

// mengabungkan koefisien dg variabelnya, misal signCoef(-4/3, 'z') => \frac{-4}{3}z
function signCoef(a, x) {
    if (a instanceof Frac) {
        if (a.n == 0) return '';
        if (a.n == 1 && a.d == 1) return '+' + x;
        if (a.n == -1 && a.d == 1) return '-' + x;
        if (a.n < 0) return '-' + new Frac(-a.n, a.d).tex() + x;
        return '+' + a.tex() + x;
    } else {
        if (a == 0) return '';
        if (a == 1) return '+' + x;
        if (a == -1) return '-' + x;
        if (a < 0) return a + 'x';
        return '+' + a + x;
    }
}

// seperti signCoef() tapi tidak menampilkan tanda tambah karena merupakan suku pertama
function sign1Coef(a, x) {
    if (a === 0) return '';
    if (a === 1) return x;
    if (a === -1) return '-' + x;
    return a + x;
}
