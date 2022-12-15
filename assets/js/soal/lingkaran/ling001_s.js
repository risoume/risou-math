
function soal() {
    const soal = `Tentukan bentuk umum persamaan lingkaran yang berpusat di
        $( ${frac(a)}, ${frac(b)} )$ dan berjari-jari $ ${frac(c)} $.`;
    
    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    const solusi = `Persamaan lingkaran dengan pusat $(a,b)$ dan jari-jari $r$ adalah
        ${_s}(x-a)^2 + (y-b)^2 = r^2\\]
        \\[x^2 + y^2 - 2ax - 2by + a^2 + b^2 - r^2 = 0${_t}
        Jadi bentuk umum persamaannya adalah
        ${_s} ${ new Ling(a, b, c).bentukStandar() } \\]
        \\[ ${ new Ling(a, b, c).bentukUmum() } ${_t}`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    let arr = input1.value.split(',').map(i => i.split('/').map(j => parseInt(j)));
    cond[1] = arr.length === 3;
    cond[2] = arr.every(i => i.every(j => !isNaN(j)));
    cond[3] = arr.every(i => i[1] !== 0); // penyebut tidak nol (jika ada)
    
    [a, b, c] = arr;
    cond[4] = c[1] ? c[0] * c[1] > 0 : c[0] > 0;  // jari jari positif

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
            a, b di [-10, 10]
            c di [2,10]
    */

    a = [intRandom(-10, 10)];
    b = [intRandom(-10, 10)];
    c = [intRandom(2, 10)];

    solveHandler()
}

solve();