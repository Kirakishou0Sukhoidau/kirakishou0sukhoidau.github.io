function tinh() {
      const so = document.getElementById("so").value;
      const phanTram = document.getElementById("phanTram").value;
      const ketQua = (so * phanTram) / 100;
      document.getElementById("ketQuapt").innerHTML = `Là: ${ketQua}`;
    };
  

    function tinhLaiKepTheoThang() {
      const soTienGoct = parseFloat(document.getElementById("soTienGoc_thang").value);
      const laiSuatt = parseFloat(document.getElementById("laiSuat_thang").value) / 100;
      const soThangt = parseInt(document.getElementById("soThang_thang").value);

      let tongTient = soTienGoct;
      for (let i = 1; i <= soThangt; i++) {
        tongTient *= (1 + laiSuatt / 12);
        tongTient += tongTient * laiSuatt / 12; // Cộng lãi vào gốc
      }

      document.getElementById("ketQua_thang").innerHTML = `Tổng số tiền sau ${soThangt} tháng là: ${tongTient.toLocaleString()} VND`;
    }






function giaiPhuongTrinh() {
    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var c = parseFloat(document.getElementById("c").value);
    var delta = b * b - 4 * a * c;
    var x1, x2;
    if (delta > 0) {
        x1 = (-b + Math.sqrt(delta)) / (2 * a);
        x2 = (-b - Math.sqrt(delta)) / (2 * a);
        
        var nghiem1 = x1;
        var nghiem2 = x2;
        var noiDungThayThe = "_";

       var ketQua = "Phương trình có 2 nghiệm phân biệt:<br/>";
for (var i = 1; i <= 2; i++) {
  ketQua += noiDungThayThe + " x" + i + " = " + eval("nghiem" + i) + "<br/>";
}

document.getElementById("ketqua").innerHTML = ketQua; 

        
  //      document.getElementById("ketqua").innerHTML = "Phương trình có hai nghiệm: x1 = " + x1 + ", x2 = " + x2;
        
        
    } else if (delta === 0) {
        x1 = -b / (2 * a);
        document.getElementById("ketqua").innerHTML = "Phương trình có một nghiệm kép: x1 = x2 = " + x1;
    } else {
        document.getElementById("ketqua").innerHTML = "Phương trình vô nghiệm.";
    }
};

function tinhLaiKep() {
  const soTienGoc = parseFloat(document.getElementById("soTienGoc").value);
  const laiSuat = parseFloat(document.getElementById("laiSuat").value) / 100;
  const soNam = parseInt(document.getElementById("soNam").value);

  let tongTien = soTienGoc;
  for (let i = 1; i <= soNam; i++) {
    tongTien *= (1 + laiSuat);
  }

  // Sửa lỗi: Lấy lũy thừa của (1 + laiSuat)
 /* tongTien = tongTien.toFixed(0);*/
  tongTien = tongTien.toLocaleString('vi-VN');
  document.getElementById("Dapso").innerHTML = `Tổng số tiền sau ${soNam} đợt là: ${tongTien.toLocaleString()} VNĐ`;
}


function formatNumber(number) {
  // Chuyển đổi số sang chuỗi
  const strNumber = number.toString();

  // Thêm dấu chấm sau mỗi ba chữ số
  let formattedNumber = '';
  for (let i = strNumber.length - 1; i >= 0; i -= 3) {
    if (i === 0) {
      formattedNumber = strNumber.slice(i) + formattedNumber;
    } else {
      formattedNumber = ',' + strNumber.slice(i, i + 3) + formattedNumber;
    }
  }

  return formattedNumber;
}

const number = 123456789;
const formattedNumber = formatNumber(number);

console.log(formattedNumber); // 123.456.789




const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
    const allInputs = document.querySelectorAll(".gp2 input[type='number']");
    for (const input of allInputs) {
        input.value = "";
    }
});
const resetptButton = document.getElementById("resetpt");

resetptButton.addEventListener("click", () => {
    const allInputspt = document.querySelectorAll(".pt input[type='number']");
    for (const inputpt of allInputspt) {
        inputpt.value = "";
    }
});



const resetlButton = document.getElementById("resetl");

resetlButton.addEventListener("click", () => {
    const allInputsl = document.querySelectorAll(".gp2 input[.lk type='number']");
    for (const inputl of allInputsl) {
        inputl.value = "";
    }
});







        function giaiPTB3() {
  // Get input values from the form
  const a = parseFloat(document.getElementById("a-ptb3").value);
  const b = parseFloat(document.getElementById("b-ptb3").value);
  const c = parseFloat(document.getElementById("c-ptb3").value);
  const d = parseFloat(document.getElementById("d-ptb3").value);

  // Validate input (optional, but good practice)
  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
    alert("Please enter valid numbers for the coefficients.");
    return;
  }

  // Check if a is zero (not a cubic equation)
  if (a === 0) {
    handleNonCubicCase(b, c, d);
    return;
  }

  // Solve the cubic equation using Cardano's formula (modified for clarity)
  const p = b / (3 * a);
  const q = (c - a * p * p) / (2 * a);

  // Calculate discriminant (helps determine solution type)
  const discriminant = q * q * q + (p * p * p - q * b) / 4;

  // Handle different solution types based on the discriminant
  if (discriminant > 0) {
    solveRealRoots(a, p, q, discriminant);
  } else if (discriminant === 0) {
    solveRepeatedRealRoot(a, p, q);
  } else {
    solveComplexRoot(a, p, q);
  }
}

function handleNonCubicCase(b, c, d) {
  // Handle the case where a is zero (quadratic or linear equation)
  if (b === 0) {
    if (c === 0) {
      // Handle constant equation (d = 0 or d != 0)
      document.getElementById("ketqua-ptb3").innerHTML =
        d === 0 ? "Phương trình vô nghiệm." : "Phương trình vô số nghiệm.";
    } else {
      // Handle linear equation (ax + d = 0)
      const x = -d / c;
      document.getElementById("ketqua-ptb3").innerHTML = `Nghiệm: x = ${x}`;
    }
  } else {
    // Handle quadratic equation (bx^2 + cx + d = 0)
    const delta = c * c - 4 * b * d;
    if (delta > 0) {
      const x1 = (-c + Math.sqrt(delta)) / (2 * b);
      const x2 = (-c - Math.sqrt(delta)) / (2 * b);
      document.getElementById("ketqua-ptb3").innerHTML = `Nghiệm: x1 = ${x1}, x2 = ${x2}`;
    } else if (delta === 0) {
      const x = -c / (2 * b);
      document.getElementById("ketqua-ptb3").innerHTML = `Nghiệm kép: x = ${x}`;
    } else {
      document.getElementById("ketqua-ptb3").innerHTML = "Phương trình vô nghiệm.";
    }
  }
}

function solveRealRoots(a, p, q, discriminant) {
  // Calculate real roots using Cardano's formula adapted for clarity
  const y = Math.cbrt(q + Math.sqrt(discriminant));
  const z = Math.cbrt(q - Math.sqrt(discriminant));
  const x1 = y + z - p;
  const x2 = -y - z + p;
  const x3 = (y - z + p) / 2; // Third root (might be repeated)

  // Display real roots (consider repeated roots)
  let result = "Các nghiệm thực:";
  if (x1 !== x2) {
    result += ` x1 = ${x1}, x2 = ${x2}`;
  } else {
    result += ` x1 = x2 = ${x1}`;
  }
  if (x1 !== x3 && x2 !== x3) {
    result += `, x3 = ${x3}`;
  }
  document.getElementById("ketqua-ptb3").innerHTML = result;
}

function solveRepeatedRealRoot(a, p, q) {
  // Calculate repeated real root and its multiplicity
  const x = -2 * p / 3;
  const multiplicity = 2;

  // Display result
  document.getElementById("ketqua-ptb3").innerHTML = `
    Nghiệm kép: x = ${x} (bội số ${multiplicity})
  `;
}

function solveComplexRoot(a, p, q) {
  // Calculate complex roots using Cardano's formula
  const r = Math.sqrt(-q / 2);
  const theta = Math.acos((p / 3) / r);
  const x1 = 2 * r * Math.cos(theta / 3) - p / 3;
  const x2 = 2 * r * Math.cos((theta + 2 * Math.PI) / 3) - p / 3;
  const x3 = 2 * r * Math.cos((theta + 4 * Math.PI) / 3) - p / 3;

  // Display complex roots
  document.getElementById("ketqua-ptb3").innerHTML = `
    Nghiệm phức:
    - x1 = ${x1} + ${r}i
    - x2 = ${x2} - ${r}i
    - x3 = ${x3} + ${r}i
  `;
}

//dao ham
