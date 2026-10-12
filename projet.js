/**
 * Algorithme PP/DFS
 * @param {Record<string, string[]> | Record<number, number[]>} sommets
 * @param {string | number} sommetDepart
 */
function DFS(sommets, sommetDepart) {
  const etat = Object.fromEntries(Object.keys(sommets).map(k => [k, false]));
  const pere = Object.fromEntries(Object.keys(sommets).map(k => [k, null]));

  function name(sommet) {
    etat[sommet] = true;
  
    const successeurs = sommets[sommet];
  
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
  const etat = Object.fromEntries(Object.keys(sommets).map(k => [k, false]));
  const pere = Object.fromEntries(Object.keys(sommets).map(k => [k, null]));
  const niveau = Object.fromEntries(Object.keys(sommets).map(k => [k, null]));

  niveau[sommetDepart] = 0
  etat[sommetDepart] = true;

  const liste = [sommetDepart];

  while (liste.length !== 0) {
    const sommet = liste.shift();

    const successeurs = sommets[sommet];
  
    for (const successeur of successeurs.sort()) {
      if (etat[successeur] === false) {
        etat[successeur] = true;
        pere[successeur] = sommet;
        niveau[successeur] = niveau[sommet] + 1;
        
        liste.push(successeur);
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
  const liste = Object.fromEntries(Object.keys(sommets).map(k => [k, {pere: null, poids: Infinity}]));
  const queue = [sommetDepart];
  const vu = new Set();

  liste[sommetDepart].poids = 0;

  while (queue.length !== 0) {
    const sommetName = queue.shift();
    const sommet = liste[sommetName];
    const successeurs = sommets[sommetName]    

    for (const successeur of successeurs) {
      const successeurName = successeur.sommet;  
      const successeurListe = liste[successeurName];

      if ((successeur.poids + sommet.poids) < successeurListe.poids) {
        successeurListe.poids = successeur.poids + sommet.poids;
        successeurListe.pere = sommetName;
      }
    }

    vu.add(sommetName)

    const next = successeurs.filter(({sommet}) => !vu.has(sommet)).map(({sommet}) => ({sommet, ...liste[sommet]})).sort((a, b) => a.poids - b.poids)[0];

    if (next) queue.push(next.sommet);
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
console.log("DFS", DFS(graphSansPoids, "Rennes"));
console.log("BFS", BFS(graphSansPoids, "Rennes"));


console.log("Dijkstra", dijkstra(graph, "Bordeaux"));
