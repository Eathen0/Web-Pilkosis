const arrayBiasa = [1, 2, 3, 4, 5];

// Menggunakan metode map untuk mengubah array menjadi array objek
const arrayObjek = arrayBiasa.map((elemen) => {
    return {
        nilai: elemen,
        kuadrat: elemen * elemen
    };
});

console.log(arrayObjek);