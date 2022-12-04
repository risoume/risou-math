
// every mode changes the global variables
let a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
let cond = [true];

// handling mathjax overflow and display mode
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


//  focus to next input
let inputAll = document.querySelectorAll('input');
for (let i = 0; i < inputAll.length; i++){
    inputAll[i].addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            if (i < inputAll.length -1) {
                inputAll[i + 1].focus();
            } else {
                solveButton.focus();
                solve();
            }
        }
    }, false);
}

function solveHandler() {
    soal();
    solusi();
    lihatSolusi.style.display = 'none';
    MathJax.typeset();
}

// open the input field when user switches the mode to 'solve'
function openInput() {
    formInput.style.display = 'block';
    acakSoal.style.display = 'none';
    buatSoal.style.display = 'none';
    solve();
}

// random mode
function openRandom() {
    formInput.style.display = 'none';
    acakSoal.style.display = 'initial';
    buatSoal.style.display = 'none';
    lihatSolusi.style.display = 'none';
    output1.innerHTML = 'Tekan tombol untuk menampilkan soal dan solusi acak.';
    output2.innerHTML = '';
    if (tableArea != null) tableArea.style.display = 'none';
}

// latihan mode (exercise)
function openLatihan() {
    formInput.style.display = 'none';
    acakSoal.style.display = 'none';
    buatSoal.style.display = 'initial';
    lihatSolusi.style.display = 'none';
    output1.innerHTML = 'Tekan tombol untuk membuat soal.';
    output2.innerHTML = '';
    if (tableArea != null) tableArea.style.display = 'none';
}

// display exercise problem
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

// display the solution in latihan mode when 'lihat solusi' button is clicked
function bukaSolusi() {
    output2.style.display = 'block';
    if (tableArea != null) tableArea.style.display = 'block';
    this.style.display = 'none'
}

// functions and classes for solving the problems

// minus sign by default
// ex: equation of circle (x defMinus(a))^2 + (y defMinus(b))^2 = r^2
// substituting a=-2, b=3 gives (x+2)^2 + (y-3)^2 = r^2
function defMinus(x) {
    return x < 0 ? '+' + String(-x) : '-' + String(x);
}

// plus sign by default
// ex: equation of line ax defPlus(b)y defPlus(c) = 0
// substituting  a=-2, b=-2, c=3 gives -2x-2y+3=0
function defPlus(x) {
    return x < 0 ? String(x) : '+' + String(x);
}

// get a random integer a with x <= a <= y
function intRandom(x, y) {
    return Math.floor(Math.random() * (y - x + 1) + x);
}

// accept only integer inputs
class Lingkaran {
    constructor(a, b, r, r2) {
        this.a = a;
        this.b = b;
        this.r = r;
        this.r2 = (r2 == undefined) ? r*r : r2;

        this.C = this.a*this.a + this.b*this.b - this.r2;
        this.CSign = this.C ? defPlus(this.C) : '';
        this.aSign = defMinus(this.a);
        this.bSign = defMinus(this.b);
        this.ASign = this.a ? defMinus(2*this.a) + 'x' : '';
        this.BSign = this.b ? defMinus(2*this.b) + 'y' : '';
    }
    bentukStandarTex() {
        this.strA = this.a ? `(x ${this.aSign})^2` : 'x^2';
        this.strB = this.b ? `(y ${this.bSign})^2` : 'y^2';
        return `${this.strA} + ${this.strB} = ${this.r2}`;
    }
    bentukUmumTex() {
        return `x^2 + y^2 ${this.ASign} ${this.BSign} ${this.CSign} = 0`;
    }
}
