
function soal() {
    const soal = `Tentukan posisi titik $( ${frac(a)}, ${frac(b)} )$ terhadap lingkaran
        $${ new Ling([c, d, e]).bentukUmum() }$.`;

    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let fa = new Frac(a);
    let fb = new Frac(b);
    let fc = new Frac(c);
    let fd = new Frac(d);
    let fe = new Frac(e);

    let subs = fa.pangkat(2)
        .tambah( fb.pangkat(2) )
        .tambah( fa.kali(fc) )
        .tambah( fb.kali(fd) )
        .tambah( fe );

    let sign = (subs > 0) ? '>' : (subs < 0) ? '<' : '=';
    let str = new Ling([c, d, e]).posisiTitik(a, b);

    const solusi = `Substitusi titik tersebut ke dalam persamaaan, diperoleh
        ${_s} \\left( ${frac(a)} \\right)^2 + \\left( ${frac(b)} \\right)^2
        ${ fc.defPlus() } \\left( ${frac(a)} \\right)
        ${ fd.defPlus() } \\left( ${frac(b)} \\right)
        ${ fe.defPlus() } = ${ subs.tex() } ${sign} 0 ${_t}                             
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
        cond[4] = new Frac(c).pangkat(2)
            .tambah( new Frac(d).pangkat(2) )
            .kurang( new Frac(e).kali(4) ) > 0;
    } catch {} // abaikan error ketika penyebut 0 karena akan diperiksa di cekBatasan()

    if(!cekBatasan()) return;
    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a, b di [-6, 6]
            c, d di [-8, 6]
            e di [-12, 6]
    */

    a = [intRandom(-6, 6)];
    b = [intRandom(-6, 6)];

    do {
        c = [intRandom(-8, 6)];
        d = [intRandom(-8, 6)];
        e = [intRandom(-12, 6)];
    } while (c*c + d*d - 4*e <= 0);

    solveHandler();
}

solve();