
function soal() {
    const soal = `Konversi bilangan $${a}$ ke dalam basis $${b}$.`;

    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let num = a;
    let str = '';

    while (a !== 0) {
        let rem = a % b;
        let quot = Math.floor(a / b);
        str += `${a} &= ${quot} \\times ${b} + \\textbf{ ${ rem.toString(b).toUpperCase() } } \\\\`;
        a = quot;
    }

    const solusi = `${_b} ${str} ${_e}
        Diperoleh $${num} = ( \\text{${ num.toString(b).toUpperCase() }} )_{${b}} $`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    a = parseInt(input1.value);
    b = parseInt(input2.value);
    cond[1] = !isNaN(a);
    cond[2] = !isNaN(b);
    cond[3] = a > 0; // bilangan asli
    cond[4] = b >= 2 && b <= 36;

    if(!cekBatasan()) return;
    solveHandler();
}

function soalRandom() {
    /*  
        Batasan untuk soal random:
            a di [12, 100]
            b di {2, 3, 4, 6, 8, 12, 16}
    */

    let arr = [2, 3, 4, 6, 8, 12, 16];
    a = intRandom(12, 100);
    b = arr[intRandom(0, 6)];

    solveHandler();
}

solve();