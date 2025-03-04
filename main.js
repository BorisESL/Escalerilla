// Inicialización de datos con múltiples categorías
let tournamentData = {
    oro: {
        players: [
            { id: 1, name: "Jesus Gonzalez" },
            { id: 2, name: "Pablo Diaz" },
            { id: 3, name: "Lissette Bernales" },
            { id: 4, name: "Harry Triantafilo" },
            { id: 5, name: "Marcelo Henriquez" },
            { id: 6, name: "Claudio Guilardes" }
        ],
        standings: []
    },
    plata: {
        players: [
            { id: 1, name: "Felipe González" },
            { id: 2, name: "Boris Salgado" },
            { id: 3, name: "Andrés Contreras" },
            { id: 4, name: "Iván Alcaíno" },
            { id: 5, name: "Jaime Nuñez" },
            { id: 6, name: "Bryan González" },
            { id: 7, name: "Patricio Padilla" },
            { id: 8, name: "Raúl Reyes" },
            { id: 9, name: "Álvaro Pérez" },
            { id: 10, name: "Álvaro Riquelme" },
            { id: 11, name: "Rafael Montecinos" },
            { id: 12, name: "Claudio Espinoza" },
            { id: 13, name: "César Zapata" },
            { id: 14, name: "Matías Cheuquepan" },
            { id: 15, name: "Manuel Heredia Jr" },
            { id: 16, name: "Ricardo Brain" },
            { id: 17, name: "Vicente Tapia" },
            { id: 18, name: "Vicente Sanders" },
            { id: 19, name: "Rodolfo Tapia" },
            { id: 20, name: "Roberto Vera" },
            { id: 21, name: "Roberto Erices" },
            { id: 22, name: "Rodrigo Sanhueza" },
            { id: 23, name: "Alfredo Saez" }
        ],
        standings: []
    },
    bronce: {
        players: [
            { id: 1, name: "Juan Pérez" },
            { id: 2, name: "Luis Sánchez" },
            { id: 3, name: "Miguel Rodríguez" },
            { id: 4, name: "Diego Vargas" },
            { id: 5, name: "Pablo López" },
            { id: 6, name: "Carlos Ruiz" }
        ],
        standings: []
    }
};

let currentCategory = 'plata'; // Categoría por defecto

// Cargar datos guardados si existen
window.onload = function () {
    const savedTournamentData = localStorage.getItem('tennisTournamentData');

    if (savedTournamentData) {
        tournamentData = JSON.parse(savedTournamentData);
    } else {
        // Inicializar standings para cada categoría
        Object.keys(tournamentData).forEach(category => {
            initializeStandings(category);
        });
    }

    // Configurar selector de categoría
    const categorySelect = document.getElementById('category-select');
    categorySelect.addEventListener('change', function() {
        currentCategory = this.value;
        populatePlayerDropdowns();
        updateStandingsTable();
    });

    populatePlayerDropdowns();
    updateStandingsTable();
};

function initializeStandings(category) {
    tournamentData[category].standings = tournamentData[category].players.map(player => ({
        playerId: player.id,
        name: player.name,
        points: 0,
        matches: 0,
        wins: 0,
        losses: 0,
        setsWon: 0,
        setsLost: 0,
        gamesWon: 0,
        gamesLost: 0
    }));
}

function populatePlayerDropdowns() {
    const player1Select = document.getElementById('player1');
    const player2Select = document.getElementById('player2');

    // Limpiar opciones existentes
    player1Select.innerHTML = '<option value="">-- Seleccionar jugador --</option>';
    player2Select.innerHTML = '<option value="">-- Seleccionar jugador --</option>';

    // Agregar jugadores del categoría actual a los dropdowns
    tournamentData[currentCategory].players.forEach(player => {
        const option1 = document.createElement('option');
        option1.value = player.id;
        option1.textContent = player.name;
        player1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = player.id;
        option2.textContent = player.name;
        player2Select.appendChild(option2);
    });
}

function updateStandingsTable() {
    const tableBody = document.querySelector('#standings-table tbody');
    tableBody.innerHTML = '';

    // Obtener standings de la categoría actual
    const categoryStandings = tournamentData[currentCategory].standings;

    // Ordenar por puntos (descendente), luego por diferencia de sets y luego por diferencia de juegos
    const sortedStandings = [...categoryStandings].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;

        const aSetDiff = a.setsWon - a.setsLost;
        const bSetDiff = b.setsWon - b.setsLost;
        if (bSetDiff !== aSetDiff) return bSetDiff - aSetDiff;

        const aGameDiff = a.gamesWon - a.gamesLost;
        const bGameDiff = b.gamesWon - b.gamesLost;
        return bGameDiff - aGameDiff;
    });

    sortedStandings.forEach((player, index) => {
        const winDiff = player.wins - player.losses;
        const setDiff = player.setsWon - player.setsLost;
        const gameDiff = player.gamesWon - player.gamesLost;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td>${player.points}</td>
            <td>${player.matches}</td>
            <td>${winDiff}</td>
            <td>${setDiff}</td>
            <td>${gameDiff}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Registro de partido
document.getElementById('match-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const player1Id = parseInt(document.getElementById('player1').value);
    const player2Id = parseInt(document.getElementById('player2').value);

    if (player1Id === player2Id) {
        alert('Por favor selecciona dos jugadores diferentes');
        return;
    }

    // Obtener resultados de los sets
    const set1Player1 = parseInt(document.getElementById('set1-player1').value);
    const set1Player2 = parseInt(document.getElementById('set1-player2').value);
    const set2Player1 = parseInt(document.getElementById('set2-player1').value);
    const set2Player2 = parseInt(document.getElementById('set2-player2').value);

    let set3Player1 = document.getElementById('set3-player1').value;
    let set3Player2 = document.getElementById('set3-player2').value;

    // Convertir a números o establecer como null si están vacíos
    set3Player1 = set3Player1 === '' ? null : parseInt(set3Player1);
    set3Player2 = set3Player2 === '' ? null : parseInt(set3Player2);

    // Validar que al menos uno gane 2 sets
    let player1SetsWon = 0;
    let player2SetsWon = 0;

    if (set1Player1 > set1Player2) player1SetsWon++;
    else player2SetsWon++;

    if (set2Player1 > set2Player2) player1SetsWon++;
    else player2SetsWon++;

    if (set3Player1 !== null && set3Player2 !== null) {
        if (set3Player1 > set3Player2) player1SetsWon++;
        else player2SetsWon++;
    }

    // Validar que hay un ganador claro
    if (player1SetsWon === player2SetsWon) {
        alert('Debe haber un ganador claro (al menos 2 sets ganados por un jugador)');
        return;
    }

    // Determinar ganador y perdedor
    const winner = player1SetsWon > player2SetsWon ? player1Id : player2Id;
    const loser = winner === player1Id ? player2Id : player1Id;

    // Calcular puntos según las reglas
    let winnerPoints = 0;
    let loserPoints = 0;

    if ((player1SetsWon === 2 && player2SetsWon === 0) ||
        (player1SetsWon === 0 && player2SetsWon === 2)) {
        // Ganador en 2 sets
        winnerPoints = 3;
        loserPoints = 0;
    } else {
        // Ganador en 3 sets
        winnerPoints = 2;
        loserPoints = 1;
    }

    // Actualizar estadísticas
    updatePlayerStats(player1Id, player2Id, winner, {
        set1: [set1Player1, set1Player2],
        set2: [set2Player1, set2Player2],
        set3: [set3Player1, set3Player2],
        winnerPoints: winnerPoints,
        loserPoints: loserPoints
    });

    // Actualizar tabla y guardar datos
    updateStandingsTable();
    saveData();

    // Limpiar formulario
    this.reset();
    alert('Partido registrado correctamente');
});

function updatePlayerStats(player1Id, player2Id, winnerId, matchData) {
    // Encontrar jugadores en standings de la categoría actual
    const players = tournamentData[currentCategory].standings;
    const player1Stats = players.find(p => p.playerId === player1Id);
    const player2Stats = players.find(p => p.playerId === player2Id);

    // Incrementar partidos jugados
    player1Stats.matches++;
    player2Stats.matches++;

    // Actualizar victorias/derrotas
    if (winnerId === player1Id) {
        player1Stats.wins++;
        player2Stats.losses++;
        player1Stats.points += matchData.winnerPoints;
        player2Stats.points += matchData.loserPoints;
    } else {
        player2Stats.wins++;
        player1Stats.losses++;
        player2Stats.points += matchData.winnerPoints;
        player1Stats.points += matchData.loserPoints;
    }

    // Actualizar sets ganados/perdidos
    let player1SetsWon = 0;
    let player2SetsWon = 0;

    if (matchData.set1[0] > matchData.set1[1]) player1SetsWon++;
    else player2SetsWon++;

    if (matchData.set2[0] > matchData.set2[1]) player1SetsWon++;
    else player2SetsWon++;

    if (matchData.set3[0] !== null && matchData.set3[1] !== null) {
        if (matchData.set3[0] > matchData.set3[1]) player1SetsWon++;
        else player2SetsWon++;
    }

    player1Stats.setsWon += player1SetsWon;
    player1Stats.setsLost += player2SetsWon;
    player2Stats.setsWon += player2SetsWon;
    player2Stats.setsLost += player1SetsWon;

    // Actualizar juegos ganados/perdidos
    player1Stats.gamesWon += matchData.set1[0] + matchData.set2[0] + (matchData.set3[0] > matchData.set3[1] ? 1 : 0);
    player1Stats.gamesLost += matchData.set1[1] + matchData.set2[1] + (matchData.set3[0] < matchData.set3[1] ? 1 : 0);
    player2Stats.gamesWon += matchData.set1[1] + matchData.set2[1] + (matchData.set3[1] > matchData.set3[0] ? 1 : 0);
    player2Stats.gamesLost += matchData.set1[0] + matchData.set2[0] + (matchData.set3[1] < matchData.set3[0] ? 1 : 0);
}

function saveData() {
    localStorage.setItem('tennisTournamentData', JSON.stringify(tournamentData));
}

// Reiniciar torneo
document.getElementById('reset-btn').addEventListener('click', function () {
    if (confirm('¿Estás seguro de que deseas reiniciar el torneo? Todos los datos serán borrados.')) {
        initializeStandings(currentCategory);
        updateStandingsTable();
        saveData();
    }
});

// Añadir jugador nuevo
document.getElementById('new-player-btn').addEventListener('click', function () {
    document.getElementById('new-player-modal').style.display = 'flex';
});

document.getElementById('cancel-new-player').addEventListener('click', function () {
    document.getElementById('new-player-modal').style.display = 'none';
    document.getElementById('new-player-name').value = '';
});

document.getElementById('save-new-player').addEventListener('click', function () {
    const playerName = document.getElementById('new-player-name').value.trim();

    if (playerName === '') {
        alert('Por favor ingresa un nombre para el jugador');
        return;
    }

    const categoryPlayers = tournamentData[currentCategory].players;
    
    // Generar nuevo ID
    const newId = categoryPlayers.length > 0 ? Math.max(...categoryPlayers.map(p => p.id)) + 1 : 1;

    // Añadir nuevo jugador
    const newPlayer = { id: newId, name: playerName };
    categoryPlayers.push(newPlayer);

    // Añadir a standings
    tournamentData[currentCategory].standings.push({
        playerId: newPlayer.id,
        name: newPlayer.name,
        points: 0,
        matches: 0,
        wins: 0,
        losses: 0,
        setsWon: 0,
        setsLost: 0,
        gamesWon: 0,
        gamesLost: 0
    });

    // Actualizar dropdowns y guardar
    populatePlayerDropdowns();
    updateStandingsTable();
    saveData();

    // Cerrar modal
    document.getElementById('new-player-modal').style.display = 'none';
    document.getElementById('new-player-name').value = '';

    alert(`Jugador "${playerName}" añadido correctamente`);
});

// Ordenar tabla al hacer clic en encabezados
document.querySelectorAll('#standings-table th.sortable').forEach(th => {
    th.addEventListener('click', function () {
        const sortBy = this.getAttribute('data-sort');
        sortTable(sortBy);
    });
});

function sortTable(sortBy) {
    let sortFunction;

    switch (sortBy) {
        case 'position':
            // Ya está ordenado por defecto
            return;
        case 'name':
            sortFunction = (a, b) => a.name.localeCompare(b.name);
            break;
        case 'points':
            sortFunction = (a, b) => b.points - a.points;
            break;
        case 'matches':
            sortFunction = (a, b) => b.matches - a.matches;
            break;
        case 'winDiff':
            sortFunction = (a, b) => (b.wins - b.losses) - (a.wins - a.losses);
            break;
        case 'setDiff':
            sortFunction = (a, b) => (b.setsWon - b.setsLost) - (a.setsWon - a.setsLost);
            break;
        case 'gameDiff':
            sortFunction = (a, b) => (b.gamesWon - b.gamesLost) - (a.gamesWon - a.gamesLost);
            break;
        default:
            return;
    }

    // Ordenar standings de la categoría actual
    tournamentData[currentCategory].standings.sort(sortFunction);
    updateStandingsTable();
}