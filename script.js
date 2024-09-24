// Cria uma pilha para armazenar o histórico dos níveis de blocos
let levelHistory = [];

// Função para calcular e criar os blocos
function createBlocks(startHex, endHex, level = '') {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Limpa os blocos existentes

    // Calcula o tamanho total do intervalo
    const totalRange = endHex - startHex + BigInt(1); // +1 para incluir o valor final no intervalo

    // Divide o intervalo em 100 partes
    const blockSize = totalRange / BigInt(100);

    for (let i = 0; i < 100; i++) {
        // Calcula o valor inicial do intervalo de cada bloco
        const startValue = startHex + (blockSize * BigInt(i));
        
        // Calcula o valor final do intervalo de cada bloco
        const endValue = (i === 99) ? endHex : (startValue + blockSize - BigInt(1));

        // Cria um elemento div para o bloco
        const block = document.createElement('div');
        block.className = 'block';
        
        // Número do bloco atualizado com o nível hierárquico
        const blockNumber = level ? `${level}.${i + 1}` : `Bloco ${i + 1}`;

        // Adiciona o número do bloco, valor inicial, valor final e o botão "Dividir" ao bloco
        block.innerHTML = `
            <div class="block-number">${blockNumber}</div>
            <div class="range">Início: ${startValue.toString(16).toUpperCase()}</div>
            <div class="range">Fim: ${endValue.toString(16).toUpperCase()}</div>
            <button class="divide-button">Dividir</button>
        `;

        // Adiciona um evento de clique para o botão "Dividir" para gerar novos blocos
        const divideButton = block.querySelector('.divide-button');
        divideButton.addEventListener('click', () => {
            // Armazena o intervalo atual na pilha de histórico
            levelHistory.push({startHex, endHex, level});
            createBlocks(startValue, endValue, blockNumber); // Gera novos 100 blocos dentro deste intervalo
        });

        // Adiciona o bloco ao grid
        grid.appendChild(block);
    }

    // Adiciona um botão de voltar, caso tenha nível anterior
    if (levelHistory.length > 0) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Voltar';
        backButton.className = 'back-button';
        backButton.addEventListener('click', () => {
            // Pega o último nível do histórico e recria os blocos anteriores
            const previousLevel = levelHistory.pop();
            createBlocks(previousLevel.startHex, previousLevel.endHex, previousLevel.level);
        });
        grid.appendChild(backButton);
    }
}

// Executa a função quando a página for carregada
window.onload = () => {

    createBlocks(BigInt('0x40000000000000000'), 
                 BigInt('0x7ffffffffffffffff'));
};
