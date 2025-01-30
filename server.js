const express = require("express");
const { jsPDF } = require("jspdf"); // Importar jsPDF

const app = express();
const port = 3000;

// Datos aleatorios para la receta médica
const nombres = ["Juan Pérez", "María García", "Carlos López", "Ana Martínez"];
const medicamentos = ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Omeprazol"];
const dosis = ["500 mg", "400 mg", "250 mg", "20 mg"];
const frecuencias = ["Cada 8 horas", "Cada 12 horas", "Una vez al día", "Cada 6 horas"];
const duraciones = ["5 días", "7 días", "10 días", "14 días"];

// Función para obtener un elemento aleatorio de un array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Ruta para generar y descargar la receta médica en PDF
app.get("/generar-receta", (req, res) => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Datos aleatorios para la receta
    const nombrePaciente = getRandomElement(nombres);
    const medicamento = getRandomElement(medicamentos);
    const dosisMedicamento = getRandomElement(dosis);
    const frecuencia = getRandomElement(frecuencias);
    const duracion = getRandomElement(duraciones);
    const fecha = new Date().toLocaleDateString();

    // Agregar contenido al PDF (formato de receta médica)
    doc.setFontSize(18);
    doc.text("Receta Médica", 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 10, 30);
    doc.text(`Paciente: ${nombrePaciente}`, 10, 40);
    doc.text(`Medicamento: ${medicamento}`, 10, 50);
    doc.text(`Dosis: ${dosisMedicamento}`, 10, 60);
    doc.text(`Frecuencia: ${frecuencia}`, 10, 70);
    doc.text(`Duración: ${duracion}`, 10, 80);
    doc.text("Firma del médico: ________________________", 10, 100);

    // Convertir el PDF a un buffer
    const pdfBuffer = doc.output("arraybuffer");

    // Configurar la respuesta para descargar el PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="receta_medica.pdf"');
    res.send(Buffer.from(pdfBuffer));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});