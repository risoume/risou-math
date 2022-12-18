
function soal() {
    const soal = `Tentukan pusat dan jari-jari lingkaran 
        $ ${ new Ling([a, b, c]).bentukUmum() } $.`;

    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let lingkaran = new Ling([a, b, c]);
    let [x, y] = lingkaran.pusat();
    let r2 = lingkaran.r2; // jari jari kuadrat
    let r = ''; // jari jari

    // akarkan jika jari jari bilangan kuadrat
    if (isSquare(r2.n / r2.d)) {
        r = '=' + Math.sqrt(r2.n / r2.d);
    } 

    // jika pembilang atau penyebut bilangan kuadrat
    // penyebut hanya mungkin 1, 2, 4. Jika 2, cek pembilang
    // jika 1, sudah melewati if di atas
    else if (isSquare(r2.n) || r2.d == 4) {
        let strNum = isSquare(r2.n) ? '' + Math.sqrt(r2.n) : `\\sqrt{${r2.n}}`;
        let strDen = r2.d == 4 ? '2' : `\\sqrt{2}`;
        r = `=\\frac{${strNum}}{${strDen}}`;
    }

    const solusi = `Titik pusat:
        ${_b} P &= \\left(-\\frac{A}{2}, -\\frac{B}{2}\\right)\\\\
        &= \\left( ${ x.tex() }, ${ y.tex() } \\right) ${_e}
        Jari-jari:
        ${_b}r &= \\sqrt{\\frac{A^2}{4} + \\frac{B^2}{4} - C}\\\\
        &= \\sqrt{\\frac{(${ frac(a) })^2}{4} + \\frac{(${ frac(b) })^2}{4}
        ${ new Frac(c).defMinus() }}\\\\
        &= \\sqrt{${ r2.tex() }} ${ r } ${_e}`;
  
    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => i.split('/').map(j => parseInt(j)));
    cond[1] = arr.length === 3;
    cond[2] = arr.every(i => i.every(j => !isNaN(j))); // cek bilangan bulat
    cond[3] = arr.every(i => i[1] !== 0); // penyebut tidak nol (jika ada)

    [a, b, c] = arr;

    try {
        cond[4] = new Frac(a).pangkat(2)
            .tambah( new Frac(b).pangkat(2) )
            .kurang( new Frac(c).kali(4) ) > 0;
    } catch {} // abaikan error ketika penyebut 0 karena akan diperiksa di cekBatasan()

    if(!cekBatasan()) return;
    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a, b, c di [-10, 10]
    */

    do {
        a = [intRandom(-10, 10)];
        b = [intRandom(-10, 10)];
        c = [intRandom(-10, 10)];
    } while (a*a + b*b - 4*c <= 0);

    solveHandler();
}

solve();