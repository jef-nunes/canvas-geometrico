"use strict";
class Util {
    static escurecerCor(corHex, porcentagem) {
        // Remove o caractere '#' se estiver presente
        corHex = corHex.replace('#', '');
        // Converte a cor hexadecimal para valores RGB
        let r = parseInt(corHex.substring(0, 2), 16);
        let g = parseInt(corHex.substring(2, 4), 16);
        let b = parseInt(corHex.substring(4, 6), 16);
        // Escurece os valores RGB
        r = Math.floor(r * (1 - porcentagem));
        g = Math.floor(g * (1 - porcentagem));
        b = Math.floor(b * (1 - porcentagem));
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
        // Converte de volta para formato hexadecimal
        const escurecida = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        return escurecida;
    }
}
class FigCanvas {
    constructor() {
        this.figura = {
            lados: 4,
            cor: "#8632C6"
        };
        this.insereLados = document.getElementById("insere-lados");
        this.seletorCores = document.getElementById("seletor-de-cor");
        this.btGerarFigura = document.getElementById("bt-gerar-figura");
        this.canvas = document.getElementById("canvas-figura");
        this.ctx = this.canvas.getContext("2d");
        this.ajustarResolucaoCanvas();
    }
    ajustarResolucaoCanvas() {
        const ratio = window.devicePixelRatio || 1;
        this.canvas.width = 800 * ratio; // Ajusta a largura com base no ratio
        this.canvas.height = 600 * ratio; // Ajusta a altura com base no ratio
        this.canvas.style.width = "800px"; // Define a largura visual do canvas
        this.canvas.style.height = "600px"; // Define a altura visual do canvas
        this.ctx.scale(ratio, ratio); // Aplica a escala para correspondência de pixels
    }
    limparCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    gerarFigura() {
        this.figura.cor = this.seletorCores.value;
        this.figura.lados = Number(this.insereLados.value);
        this.desenharFigura();
    }
    desenharFigura() {
        const escalaX = this.canvas.width / 800;
        const escalaY = this.canvas.height / 600;
        let qntLados = this.figura.lados;
        let cor = this.figura.cor;
        // Reduzindo o raio em 5 vezes
        const raio = Math.min(this.canvas.width / escalaX, this.canvas.height / escalaY) / (3 * 5);
        // Calcular uma posição aleatória
        const posX = Math.random() * (this.canvas.width - 2 * raio) + raio;
        const posY = Math.random() * (this.canvas.height - 2 * raio) + raio;
        if (qntLados < 3) {
            qntLados = 3;
        }
        const angulosRot = [0, 45, 75, 90, 120];
        const rotacao = angulosRot[Math.floor(Math.random() * angulosRot.length)];
        const rotacaoRad = (rotacao * Math.PI) / 180;
        this.ctx.beginPath();
        this.ctx.scale(escalaX, escalaY);
        // Desenhando os vértices da figura
        for (let k = 0; k < qntLados; k++) {
            const angulo = (2 * Math.PI * k) / qntLados + rotacaoRad;
            const novaX = posX + raio * Math.cos(angulo);
            const novaY = posY + raio * Math.sin(angulo);
            if (k === 0) {
                this.ctx.moveTo(novaX, novaY);
            }
            else {
                this.ctx.lineTo(novaX, novaY);
            }
        }
        this.ctx.closePath(); // Fecha o caminho
        // Preenchendo a figura
        this.ctx.fillStyle = cor; // Define a cor de preenchimento
        this.ctx.fill(); // Realiza o preenchimento
        // Desenhando o contorno da figura
        this.ctx.strokeStyle = Util.escurecerCor(cor, 0.5);
        this.ctx.lineWidth = 5; // Espessura do contorno
        this.ctx.stroke(); // Desenha o contorno
        // Restaura a transformação original
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
function principal() {
    const figCanvas = new FigCanvas();
    figCanvas.btGerarFigura.addEventListener("click", () => figCanvas.gerarFigura());
    // Desenho inicial: Um retângulo roxo
    //figCanvas.figura.lados = 4;
    //figCanvas.figura.cor = "#8632C6";
    //figCanvas.desenharFigura();
}
document.addEventListener("DOMContentLoaded", principal);
