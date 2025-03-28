// Inicialización de datos con múltiples categorías
let tournamentData = {
    oro: {
        players: [
            { id: 1, name: "Jesus Gonzalez" },
            { id: 2, name: "Pablo Diaz" },
            { id: 3, name: "Lissette Bernales" },
            { id: 4, name: "Harry Triantafilo" },
            { id: 5, name: "Marcelo Henriquez" },
            { id: 6, name: "Claudio Guilardes" },
            { id: 7, name: "Sergio Daza" },
            { id: 8, name: "Derek Brain" },
            { id: 9, name: "Antonio Bustos" },
            { id: 10, name: "Manuel Heredia" },
            { id: 11, name: "Leonardo Garrido" },
            { id: 12, name: "Cesar Bernales" },
            { id: 13, name: "Michael Bernales" },
            { id: 14, name: "Diego leiva" }
        ],
        standings: [],
        matchHistory: [] // Nuevo array para historial de partidos
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
        standings: [],
        matchHistory: [] // Nuevo array para historial de partidos
    },
    bronce: {
        players: [
            { id: 1, name: "Pablo Fuentes" },
            { id: 2, name: "Germán Vidal" },
            { id: 3, name: "Juan Manuel González" },
            { id: 4, name: "Julio Jaramillo" },
            { id: 5, name: "Agustín Salgado" },
            { id: 6, name: "Guillermo Gajardo" },
            { id: 7, name: "Rubén Carvajal" },
            { id: 8, name: "Sebastián Figueroa" },
            { id: 9, name: "Héctor Zurita" },
            { id: 10, name: "Alberto Chandia" },
            { id: 11, name: "Ruy Mendoza" },
            { id: 12, name: "Santiago Mahnke" },
            { id: 13, name: "Ivan Paredes" },
            { id: 14, name: "Arnaldo Olivari" },
            { id: 15, name: "Javier Rodríguez" },
            { id: 16, name: "Tomás Colina" },
            { id: 17, name: "Guillermo Salazar" },
            { id: 18, name: "Manuel Parada" },
            { id: 19, name: "Geovanny Colina" },
            { id: 20, name: "Ramón Aravena" },
            { id: 21, name: "Franco Carvajal" },
            { id: 22, name: "Pedro Castro" },
            { id: 23, name: "David Mendoza" },
            { id: 24, name: "Pedro Acevedo" },
            { id: 25, name: "Juan Ovando" },
            { id: 26, name: "Nicolás Ruiz" },
            { id: 27, name: "Brayan Toledo" },
            { id: 28, name: "Jordan Solar" }
            
        ],
        standings: [],
        matchHistory: [] // Nuevo array para historial de partidos
    }
};

let currentCategory = 'plata'; // Categoría por defecto
let historyCategory = 'plata'; // Categoría para el historial (inicialmente igual a la actual)

// Cargar datos guardados si existen
window.onload = function () {
    const savedTournamentData = localStorage.getItem('tennisTournamentData');

    if (savedTournamentData) {
        tournamentData = JSON.parse(savedTournamentData);
        
        // Asegurar que todas las categorías tengan un array de historial
        Object.keys(tournamentData).forEach(category => {
            if (!tournamentData[category].matchHistory) {
                tournamentData[category].matchHistory = [];
            }
        });
    } else {
        // Inicializar standings para cada categoría
        Object.keys(tournamentData).forEach(category => {
            initializeStandings(category);
        });
    }

    // Configurar selector de categoría para el registro
    const categorySelect = document.getElementById('category-select');
    categorySelect.addEventListener('change', function () {
        currentCategory = this.value;
        populatePlayerDropdowns();
        updateStandingsTable();
    });

    // Configurar selector de categoría para el historial
    const historyCategorySelect = document.getElementById('history-category-select');
    historyCategorySelect.addEventListener('change', function () {
        historyCategory = this.value;
        updateMatchHistoryTable();
    });

    populatePlayerDropdowns();
    updateStandingsTable();
    updateMatchHistoryTable();
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
    
    // Inicializar historial de partidos
    tournamentData[category].matchHistory = [];
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

// Actualizar tabla de historial de partidos
function updateMatchHistoryTable() {
    const tableBody = document.querySelector('#match-history-table tbody');
    const noHistoryMessage = document.getElementById('no-history-message');
    
    tableBody.innerHTML = '';
    
    // Obtener historial de la categoría seleccionada
    const history = tournamentData[historyCategory].matchHistory;
    
    // Mostrar mensaje si no hay partidos
    if (history.length === 0) {
        noHistoryMessage.style.display = 'block';
        document.getElementById('match-history-table').style.display = 'none';
    } else {
        noHistoryMessage.style.display = 'none';
        document.getElementById('match-history-table').style.display = 'table';
        
        // Ordenar por fecha (más reciente primero)
        const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedHistory.forEach(match => {
            const row = document.createElement('tr');
            
            // Formatear la fecha
            const matchDate = new Date(match.date);
            const formattedDate = `${matchDate.getDate()}/${matchDate.getMonth() + 1}/${matchDate.getFullYear()} ${matchDate.getHours()}:${String(matchDate.getMinutes()).padStart(2, '0')}`;
            
            // Formatear el resultado
            let resultText = `${match.set1[0]}-${match.set1[1]}, ${match.set2[0]}-${match.set2[1]}`;
            if (match.set3[0] !== null && match.set3[1] !== null) {
                resultText += `, ${match.set3[0]}-${match.set3[1]}`;
            }
            
            // Formatear los puntos
            const pointsText = `${match.winnerPoints}-${match.loserPoints}`;
            
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${match.player1Name}</td>
                <td>${match.player2Name}</td>
                <td>${resultText}</td>
                <td>${match.winnerName}</td>
                <td>${pointsText}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
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

    // Obtener nombres de los jugadores
    const player1Name = tournamentData[currentCategory].players.find(p => p.id === player1Id).name;
    const player2Name = tournamentData[currentCategory].players.find(p => p.id === player2Id).name;
    const winnerName = winner === player1Id ? player1Name : player2Name;

    // Crear objeto de partido para el historial
    const matchRecord = {
        date: new Date().toISOString(),
        player1Id: player1Id,
        player2Id: player2Id,
        player1Name: player1Name,
        player2Name: player2Name,
        set1: [set1Player1, set1Player2],
        set2: [set2Player1, set2Player2],
        set3: [set3Player1, set3Player2],
        winnerId: winner,
        winnerName: winnerName,
        winnerPoints: winnerPoints,
        loserPoints: loserPoints
    };

    // Añadir al historial
    tournamentData[currentCategory].matchHistory.push(matchRecord);

    // Actualizar estadísticas
    updatePlayerStats(player1Id, player2Id, winner, {
        set1: [set1Player1, set1Player2],
        set2: [set2Player1, set2Player2],
        set3: [set3Player1, set3Player2],
        winnerPoints: winnerPoints,
        loserPoints: loserPoints
    });

    // Actualizar tablas y guardar datos
    updateStandingsTable();
    updateMatchHistoryTable();
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

    // Actualizar juegos ganados/perdidos (sets 1 y 2 normalmente)
    player1Stats.gamesWon += matchData.set1[0] + matchData.set2[0];
    player1Stats.gamesLost += matchData.set1[1] + matchData.set2[1];
    player2Stats.gamesWon += matchData.set1[1] + matchData.set2[1];
    player2Stats.gamesLost += matchData.set1[0] + matchData.set2[0];
    
    // Manejar el super tiebreak (set 3) - contar como 1 juego
    if (matchData.set3[0] !== null && matchData.set3[1] !== null) {
        if (matchData.set3[0] > matchData.set3[1]) {
            // Jugador 1 ganó el super tiebreak
            player1Stats.gamesWon += 1;
            player2Stats.gamesLost += 1;
        } else {
            // Jugador 2 ganó el super tiebreak
            player2Stats.gamesWon += 1;
            player1Stats.gamesLost += 1;
        }
    }
}

function saveData() {
    localStorage.setItem('tennisTournamentData', JSON.stringify(tournamentData));
}

// Reiniciar torneo
document.getElementById('reset-btn').addEventListener('click', function () {
    if (confirm('¿Estás seguro de que deseas reiniciar el torneo? Todos los datos serán borrados.')) {
        // Solo reinicia la categoría actual
        initializeStandings(currentCategory);
        updateStandingsTable();
        updateMatchHistoryTable();
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