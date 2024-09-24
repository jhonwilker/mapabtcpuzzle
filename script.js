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

        // Adiciona o número do bloco, valor inicial e valor final ao bloco
        block.innerHTML = `
            <div class="block-number">${blockNumber}</div>
            <div class="range">Início: ${startValue.toString(16).toUpperCase()}</div>
            <div class="range">Fim: ${endValue.toString(16).toUpperCase()}</div>
        `;

        // Adiciona um evento de clique para gerar novos blocos a partir deste intervalo
        block.addEventListener('click', () => {
            createBlocks(startValue, endValue, blockNumber); // Gera novos 100 blocos dentro deste intervalo
        });

        // Adiciona o bloco ao grid
        grid.appendChild(block);
    }

    // Adiciona um botão de voltar, caso esteja em um nível mais profundo
    if (level) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Voltar';
        backButton.className = 'back-button';
        backButton.addEventListener('click', () => {
            // Volta para o nível anterior, recriando os blocos principais
            createBlocks(BigInt('0x4000000000000000'), BigInt('0x7ffffffffffffffff'));
        });
        grid.appendChild(backButton);
    }
}

// Executa a função quando a página for carregada
window.onload = () => {
    createBlocks(BigInt('0x4000000000000000'), BigInt('0x7ffffffffffffffff'));
};
