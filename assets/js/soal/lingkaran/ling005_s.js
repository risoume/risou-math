
function soal() {
    const soal = `Tentukan posisi titik $( ${frac(a)}, ${frac(b)} )$ terhadap lingkaran
        $${ new Ling(c, d, 1, e).bentukStandar() }$`;

    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let fa = new Frac(a);
    let fb = new Frac(b);
    let fc = new Frac(c);
    let fd = new Frac(d);
    let fe = new Frac(e);

    let subs = fa.kurang(fc).pangkat(2)
        .tambah( fb.kurang(fd).pangkat(2) );

    let sign = (subs > fe) ? '>' : (subs < fe) ? '<' : '=';
    let str = new Ling(c, d, 1, e).posisiTitik(a, b);

    const solusi = `Substitusi titik tersebut ke dalam persamaaan, diperoleh
        ${_s} \\left( ${frac(a)} ${ fc.kali(-1).defSign() } \\right)^2
        + \\left( ${frac(b)} ${ fd.kali(-1).defSign() } \\right)^2
        = ${subs.tex()} ${sign} ${frac(e)} ${_t}
        Jadi titik $( ${frac(a)}, ${frac(b)} )$ terletak ${str} lingkaran.`;
        
    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => i.split('/').map(j => parseInt(j)));
    cond[1] = arr.length === 5;
    cond[2] = arr.every(i => i.every(j => !isNaN(j)));
    cond[3] = arr.every(i => i[1] !== 0); // penyebut tidak nol (jika ada)

    [a, b, c, d, e] = arr;

    try {
        cond[4] = new Frac(e) > 0;
    } catch {} // abaikan error ketika penyebut 0 karena akan diperiksa di cekBatasan()

    if(!cekBatasan()) return;
    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a, b, c, d di [-6, 6]
            e di [2,100]
    */

    a = [intRandom(-6, 6)];
    b = [intRandom(-6, 6)];
    c = [intRandom(-6, 6)];
    d = [intRandom(-6, 6)];
    e = [intRandom(2, 100)];

    solveHandler();
}

solve();