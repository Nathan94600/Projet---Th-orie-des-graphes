/**
 * Algorithme PP/DFS
 * @param {Record<string, string[]> | Record<number, number[]>} sommets
 * @param {string | number} sommetDepart
 */
function DFS(sommets, sommetDepart) {
  const etat = Object.fromEntries(Object.keys(sommets).map(k => [k, false])); // Permet de garder en memoire les sommets deja visites
  const pere = Object.fromEntries(Object.keys(sommets).map(k => [k, null])); // Permet de garder en memoire le pere de chaque sommet

  function name(sommet) {
    etat[sommet] = true;
  
    const successeurs = sommets[sommet];
    
    // On trie les successeurs pour avoir un ordre de visite cohérent
    for (const successeur of successeurs.sort()) {
      if (etat[successeur] === false) {
        pere[successeur] = sommet
  
        name(successeur)
      }
    }
  }

  name(sommetDepart)

  return pere;
}

/**
 * Algorithme PL/BFS
 * @param {Record<string, string[]> | Record<number, number[]>} sommets
 * @param {string | number} sommetDepart
 */
function BFS(sommets, sommetDepart) {
  const etat = Object.fromEntries(Object.keys(sommets).map(k => [k, false])); // Permet de garder en memoire les sommets deja visites
  const pere = Object.fromEntries(Object.keys(sommets).map(k => [k, null])); // Permet de garder en memoire le pere de chaque sommet
  const niveau = Object.fromEntries(Object.keys(sommets).map(k => [k, null])); // Permet de garder en memoire le niveau de chaque sommet

  niveau[sommetDepart] = 0
  etat[sommetDepart] = true;

  const liste = [sommetDepart]; // Permet de garder en memoire les sommets a visiter

  while (liste.length !== 0) {
    const sommet = liste.shift(); // Retire le premier element de la liste

    const successeurs = sommets[sommet]; // Obtient les successeurs du sommet actuel
  
    // On trie les successeurs pour avoir un ordre de visite cohérent
    for (const successeur of successeurs.sort()) {
      if (etat[successeur] === false) {
        etat[successeur] = true; // Marque le successeur comme visite
        pere[successeur] = sommet;
        niveau[successeur] = niveau[sommet] + 1;
        
        liste.push(successeur); // Ajoute le successeur a la liste
      }
    }
  }

  return {pere, niveau};
}

/**
 * Algorithme Dijkstra
 * @param {Record<string, {sommet: string, poids: number}[]> | Record<number, {sommet: number, poids: number}[]>} sommets
 * @param {string | number} sommetDepart
*/
function dijkstra(sommets, sommetDepart) {
  const liste = Object.fromEntries(Object.keys(sommets).map(k => [k, {pere: null, poids: Infinity}])); // Permet de garder en memoire le pere et le poids de chaque sommet
  const queue = [sommetDepart]; // Permet de garder en memoire les sommets a visiter
  const vu = new Set(); // Permet de garder en memoire les sommets deja visites

  liste[sommetDepart].poids = 0; // Definit le poids du sommet de depart a 0

  while (queue.length !== 0) {
    const sommetName = queue.shift(); // Retire le premier element de la liste
    const sommet = liste[sommetName]; // Obtient les informations du sommet actuel
    const successeurs = sommets[sommetName] // Obtient les successeurs du sommet actuel    

    for (const successeur of successeurs) { // Pour chaque successeur
      const successeurName = successeur.sommet;  
      const successeurListe = liste[successeurName];

      if ((successeur.poids + sommet.poids) < successeurListe.poids) { // Si le poids du successeur est superieur au poids actuel
        successeurListe.poids = successeur.poids + sommet.poids; // Met a jour le poids du successeur
        successeurListe.pere = sommetName; // Met a jour le pere du successeur
      }
    }

    vu.add(sommetName) // Ajoute le sommet actuel a l'ensemble des sommets visites

    const next = successeurs.filter(({sommet}) => !vu.has(sommet)).map(({sommet}) => ({sommet, ...liste[sommet]})).sort((a, b) => a.poids - b.poids)[0]; // Obtient le prochain sommet a visiter

    if (next) queue.push(next.sommet); // Ajoute le prochain sommet a la liste
  }

  return liste;
}

const grapheTest = {
  0: [1, 6, 3],
  1: [4, 6, 0], 
  2: [5],
  3: [0, 6, 8],
  4: [1, 7],
  5: [2, 6, 7],
  6: [0, 1, 3, 5],
  7: [4, 5],
  8: [3],
};

const grapheTestAvecPoids = {
  "S1": [
    {sommet: "S4", poids: 3},
    {sommet: "S2", poids: 1},
    {sommet: "S3", poids: 5},
  ],
  "S4": [
    {sommet: "S5", poids: 1},
    {sommet: "S3", poids: 2},
  ],
  "S2": [
    {sommet: "S4", poids: 1},
    {sommet: "S5", poids: 3},
  ],
  "S5": [],
  "S3": [
    {sommet: "S2", poids: 3},
    {sommet: "S5", poids: 2},
  ],
}

// console.log(
//   "DFS\n",
//   "Départ: 0\n",
//   DFS(
//     grapheTest,
//     0,
//   ),
//   "\nDépart: 6\n",
//   DFS(
//     grapheTest,
//     6,
//   ),
// );

// console.log(
//   "\n\nBFS\n",
//   "Départ: 0\n",
//   BFS(
//     grapheTest,
//     0,
//   ),
//   "\nDépart: 6\n",
//   BFS(
//     grapheTest,
//     6,
//   ),
// )

console.log(
  "\n\nDijkstra\n",
  "Départ: S1\n",
  dijkstra(grapheTestAvecPoids, "S1")
);

// Reponses:
// 1. Modélisation du graphe des villes
const graph = {
  Rennes: [
    {sommet: "Caen", poids: 75},
    {sommet: "Paris", poids: 110},
    {sommet: "Nantes", poids: 45},
    {sommet: "Bordeaux", poids: 130},
  ],
  Caen: [
    {sommet: "Rennes", poids: 75},
    {sommet: "Paris", poids: 50},
    {sommet: "Lille", poids: 65},
  ],
  Nantes: [
    {sommet: "Rennes", poids: 45},
    {sommet: "Paris", poids: 80},
    {sommet: "Bordeaux", poids: 90},
  ],
  Bordeaux: [
    {sommet: "Rennes", poids: 130},
    {sommet: "Nantes", poids: 90},
    {sommet: "Paris", poids: 150},
    {sommet: "Lyon", poids: 100},
  ],
  Paris: [
    {sommet: "Rennes", poids: 110},
    {sommet: "Caen", poids: 50},
    {sommet: "Nantes", poids: 80},
    {sommet: "Bordeaux", poids: 150},
    {sommet: "Lille", poids: 70},
    {sommet: "Dijon", poids: 60},
  ],
  Lille: [
    {sommet: "Caen", poids: 65},
    {sommet: "Paris", poids: 70},
    {sommet: "Dijon", poids: 120},
    {sommet: "Nancy", poids: 100},
  ],
  Dijon: [
    {sommet: "Paris", poids: 60},
    {sommet: "Lille", poids: 120},
    {sommet: "Nancy", poids: 75},
    {sommet: "Lyon", poids: 70},
    {sommet: "Grenoble", poids: 75},
  ],
  Lyon: [
    {sommet: "Bordeaux", poids: 100},
    {sommet: "Dijon", poids: 70},
    {sommet: "Nancy", poids: 90},
    {sommet: "Grenoble", poids: 40},
  ],
  Nancy: [
    {sommet: "Lille", poids: 100},
    {sommet: "Dijon", poids: 75},
    {sommet: "Lyon", poids: 90},
    {sommet: "Grenoble", poids: 80},
  ],
  Grenoble: [
    {sommet: "Dijon", poids: 75},
    {sommet: "Lyon", poids: 40},
    {sommet: "Nancy", poids: 80},
  ],
};

const graphSansPoids = Object.fromEntries(Object.entries(graph).map(([k, v]) => [k, v.map(({sommet}) => sommet)]));

// Verifier les résultats
// console.log("DFS", DFS(graphSansPoids, "Rennes"));
// console.log("BFS", BFS(graphSansPoids, "Rennes"));


// console.log("Dijkstra", dijkstra(graph, "Bordeaux"));


// 2. Tester BFS et DFS avec le graphe des villes
console.log('--- Parcours BFS (en largeur) depuis Rennes ---');
console.log(BFS(graphSansPoids, 'Rennes'));
console.log('--- Parcours DFS (en profondeur) depuis Rennes ---');
console.log(DFS(graphSansPoids, 'Rennes'));

// 3. Tester Dijkstra avec le graphe des villes
console.log('--- Plus courts chemins (Dijkstra) depuis Rennes ---');
console.log(dijkstra(graph, 'Rennes'));

// 4. Un test BFS/DFS avec un autre sommet de départ
console.log('--- Parcours BFS (en largeur) depuis Lyon ---');
console.log(BFS(graphSansPoids, 'Lyon'));
console.log('--- Parcours DFS (en profondeur) depuis Lyon ---');
console.log(DFS(graphSansPoids, 'Lyon'));

// 5. Un test Dijkstra avec un autre sommet de départ 
console.log('--- Plus courts chemins (Dijkstra) depuis Lyon ---');
console.log(dijkstra(graph, 'Lyon'));
console.log('--- Plus courts chemins (Dijkstra) depuis Bordeaux ---');
console.log(dijkstra(graph, 'Bordeaux'));
