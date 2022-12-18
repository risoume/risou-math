
function soal() {
    const soal = `Tentukan persamaan lingkaran yang berpusat di
        $( ${frac(a)}, ${frac(b)} )$ dan melalui titik $( ${frac(c)}, ${frac(d)} )$.`;
    
    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let ca = new Frac(c).kurang( new Frac(a) ).pangkat(2);
    let db = new Frac(d).kurang( new Frac(b) ).pangkat(2);
    let r2 = ca.tambah(db);

    let aSign = new Frac(a).defMinus();
    let bSign = new Frac(b).defMinus();

    const solusi = `Jari-jarinya adalah
        ${_b}r &= \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\\\
        &= \\sqrt{\\left( ${ frac(c)} ${aSign} \\right)^2 + \\left( ${frac(d)} ${bSign} \\right)^2}\\\\
        &= \\sqrt{${r2.tex()}}${_e}
        Maka persamaannya adalah
        ${_s} ${ new Ling(a, b, 1, r2.komponen()).bentukStandar() } \\]
        \\[ ${ new Ling(a, b, 1, r2.komponen()).bentukUmum() } ${_t}`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => i.split('/').map(j => parseInt(j)));
    cond[1] = arr.length === 4;
    cond[2] = arr.every(i => i.every(j => !isNaN(j)));
    cond[3] = arr.every(i => i[1] !== 0); // penyebut tidak nol (jika ada)

    [a, b, c, d] = arr;

    try {
        cond[4] = !(new Frac(a).isEqual(new Frac(c)))
            || !(new Frac(b).isEqual(new Frac(d))); // jari jari tidak 0
    } catch {} // abaikan error ketika penyebut 0 karena akan diperiksa di cekBatasan()

    if(!cekBatasan()) return;
    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a, b, c, d di [-5, 6]
    */

    a = [intRandom(-5, 6)];
    b = [intRandom(-5, 6)];
    c = [intRandom(-5, 6)];
    d = [intRandom(-5, 6)];
    if (a === c && b === d) d++; // agar r tidak 0

    solveHandler();
}

solve();