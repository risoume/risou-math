
function soal() {
    const soal = `Konversi bilangan $(\\text{${a}})_{${b}}$ ke dalam basis $10$.`;

    output1.innerHTML = `<b>Soal:</b> ${soal}`;
}

function solusi() {
    let digits = [...a];
    let len = digits.length;
    let str = digits.map((i, index) => `${parseInt(i, b)} (${b}^{${len - index - 1}})`).join('+');
    let str2 = digits.map((i, index) => '' + parseInt(i, b) * (b ** (len - index - 1))).join('+');

    const solusi = `${_b} (\\text{${a}})_{${b}} &= ${str}\\\\
        &= ${str2}\\\\
        &= ${parseInt(a, b)} ${_e}`;

    output2.style.display = 'block';
    output2.innerHTML = `<b>Solusi:</b><br> ${solusi}`;
}

function solve() {
    a = input1.value.toUpperCase();
    b = parseInt(input2.value);
    cond[1] = a.length > 0;
    try {
        cond[2] = a.match(/[a-z0-9]/gi).length === a.length // input user tidak memuat selain abjad dan digit
    }
    catch {}
    cond[3] = !isNaN(b);
    cond[4] = b >= 2 && b <= 36; // basis di antara 2 - 36
    cond[5] = [...a].every(i => !isNaN(parseInt(i, b))); // digit-digit a harus lebih kecil dari b

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
            a di [12, 400]
            b di {2, 3, 4, 6, 8, 12, 16} soal yang sering muncul
    */

    let num = intRandom(12, 400);
    let arr = [2, 3, 4, 6, 8, 12, 16];
    let index = intRandom(0, 6);
    b = arr[index];
    a = num.toString(b).toUpperCase();

    solveHandler();
}

solve();