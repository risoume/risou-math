
function soal() {
    const soal = `Tentukan persamaan lingkaran yang berpusat di $(${a}, ${b})$
        dan menyinggung garis $${ new Garis(c, d, e).bentukUmum() }$.`;
    
    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let num = (c * a) + (d * b) + e; // pembilang
    let den = (c*c) + (d*d); // penyebut

    let radiusAbs = `\\frac{${num}}{\\sqrt{${den}}}`;
    let radius = '';

    if (isSquare(den)) {
        let denNew = Math.sqrt(den);
        radiusAbs = `\\frac{${num}}{${denNew}}`;

        if (num % denNew === 0) {
            radius = '=' + Math.abs(num / denNew);
        }
    }

    const solusi = `Panjang jari-jari adalah jarak titik $( ${a}, ${b} )$ ke garis
        $${ new Garis(c, d, e).bentukUmum() }$, yaitu
        ${_b}r &= \\left| \\frac{ ${c} (${a}) ${defPlus(d)} (${b}) ${defPlus(e)} }
        { \\sqrt{(${c})^2 + (${d})^2} } \\right|\\\\
        &= \\left| ${radiusAbs} \\right| ${radius} \\\\${_e}
        Jadi persamaan lingkarannya adalah
        ${_s} ${ new Ling(a, b, 1, [num*num, den]).bentukStandar() } \\]
        \\[ ${ new Ling(a, b, 1, [num*num, den]).bentukUmum() } ${_t}`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => parseInt(i));
    cond[1] = arr.length === 5;
    cond[2] = arr.every(i => !isNaN(i)); // cek bilangan bulat
    
    [a, b, c, d, e] = arr;
    cond[3] = (c !== 0) || (d !== 0);

    // sederhanakan persamaan garis
    let g = gcdN([c, d, e]);
    if (g !== 1) [c, d, e] = [c/g, d/g, e/g];

    if (cond.some(_ => !_)) {
        output1.innerHTML = 'Input tidak valid. Periksa kembali batasan.';
        output2.style.display = 'none';
        return;
    }

    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            c, d tidak keduanya nol
            a, b, c, d di [-5, 6]
            e di [-10,15]
    */

    a = intRandom(-5, 6);
    b = intRandom(-5, 6);
    e = intRandom(-10, 15);

    do {
        c = intRandom(-5, 6);
        d = intRandom(-5, 6);
    } while (c == 0 && d == 0);

    let g = gcdN([c, d, e]);
    if (g !== 1) [c, d, e] = [c/g, d/g, e/g];

    solveHandler();
}

solve();