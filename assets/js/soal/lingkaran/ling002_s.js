
function soal() {
    const soal = `Tentukan persamaan lingkaran yang berpusat di $(${a},${b})$ dan melalui titik $(${c},${d})$.`;
    
    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let r2 = (c - a)*(c - a) + (d - b)*(d - b);
    let aSign = defMinus(a);
    let bSign = defMinus(b);

    const solusi = `Jari-jarinya adalah
        ${_b}r &= \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\\\
        &= \\sqrt{(${c} ${aSign})^2 + (${d} ${bSign})^2}\\\\
        &= \\sqrt{${r2}}${_e}
        Maka persamaannya adalah
        ${_s} ${ new Lingkaran(a, b, Math.sqrt(r2), r2).bentukStandarTex() } \\]
        \\[ ${ new Lingkaran(a, b, Math.sqrt(r2), r2).bentukUmumTex() } ${_t}`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => parseInt(i));
    cond[1] = arr.length === 4;
    cond[2] = arr.every(i => !isNaN(i)); // cek bilangan bulat
    
    [a, b, c, d] = arr;
    cond[3] = (a !== c) || (b !== d); // r tidak 0

    if (cond.some(_ => !_)) {
        output1.innerHTML = 'Input tidak valid. Periksa kembali batasan.';
        output2.style.display = 'none';
        return;
    }

    solveHandler()
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a, b, c, d di [-5, 6]
    */

    a = intRandom(-5, 6);
    b = intRandom(-5, 6);
    c = intRandom(-5, 6);
    d = intRandom(-5, 6);
    if (a === c && b === d) d++; // agar r tidak 0

    solveHandler()
}

solve();