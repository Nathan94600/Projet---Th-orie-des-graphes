# Projet — Théorie des Graphes (ALMF51)
**EFREI Paris** — Réseau routier pondéré non orienté (10 villes, 20 routes)

---
![Projet](image.png)
## 1. Comment lancer le projet

Le projet ne nécessite aucune installation de dépendances externes (du JavaScript natif pur).

### A. Exécution en ligne de commande (Terminal)
Pour exécuter l'ensemble des algorithmes et afficher tous les résultats du sujet en console :

```bash
node projet.js
```

### B. Lancement de l'interface graphique (Bonus +2 points)
L'interface interactive permet de visualiser la carte routière et l'exécution des 3 algorithmes :

* **Option 1 (Directe) :** Double-cliquez sur le fichier `graph.html` ou tapez dans le terminal :
  ```bash
  open index.html        # sur macOS
  # ou
  xdg-open index.html    # sur Linux
  # ou
  start index.html       # sur Windows
  ```
* **Option 2 (Via Node.js) :**
  ```bash
  node projet.js --ui
  ```

---

## 📁 2. Structure des fichiers

* **`projet.js`** : Cœur algorithmique du projet (autonome et exécutable avec Node.js).
  - Modélisation du réseau routier sous forme de dictionnaire de listes d'adjacence.
  - Implémentation manuelle sans bibliothèque de **BFS**, **DFS** et **Dijkstra**.
  - Fonction de reconstruction du chemin optimal et du coût kilométrique.
  - Exécution des tests officiels et comparaison théorique.
* **`index.html`** : Interface graphique interactive (Bonus +2 pts).
  - Carte du réseau routier français (canvas 2D).
  - Boutons de scénarios en 1 clic pour toutes les consignes du sujet.
  - Sélection interactive des villes de départ et d'arrivée (clic sur le graphe ou listes déroulantes).
* **`README.md`** : Ce guide d'exécution et de présentation.

---

## 📋 3. Réponses aux consignes du sujet

### 1 — Modélisation du graphe
Le réseau routier de 10 villes françaises et 20 routes pondérées est modélisé sous la forme d'un dictionnaire où chaque sommet pointe vers la liste de ses voisins et les distances associées en kilomètres :
- Les arêtes sont non orientées et symétriques (définies dans les deux sens $u \leftrightarrow v$).
- Une version non pondérée (`graphSansPoids`) est automatiquement générée pour BFS et DFS.

### 2 — BFS et DFS (depuis Rennes)
* **Règle reproductible d'ordre des voisins :** Traitement des successeurs par **ordre alphabétique croissant** (via `.sort()`).
* **Résultat BFS (Largeur) depuis Rennes :**
  - **Ordre de découverte :** Rennes ➔ Bordeaux ➔ Caen ➔ Nantes ➔ Paris ➔ Lyon ➔ Lille ➔ Dijon ➔ Grenoble ➔ Nancy.
  - **Niveau 0 :** Rennes
  - **Niveau 1 :** Bordeaux, Caen, Nantes, Paris
  - **Niveau 2 :** Lyon, Lille, Dijon
  - **Niveau 3 :** Grenoble, Nancy
* **Résultat DFS (Profondeur) depuis Rennes :**
  - **Ordre de découverte :** Rennes ➔ Bordeaux ➔ Lyon ➔ Dijon ➔ Grenoble ➔ Nancy ➔ Lille ➔ Caen ➔ Paris ➔ Nantes.

### 3 — Dijkstra : Bordeaux ➔ Lille
* **Algorithme de Dijkstra** appliqué à partir de Bordeaux.
* **Chemin optimal reconstruit :** `Bordeaux ➔ Paris ➔ Lille`
* **Décomposition kilométrique :** `Bordeaux ➔ Paris (150 km) + Paris ➔ Lille (70 km)`
* **Coût total minimal :** **`220 km`**

### 4 — Tests supplémentaires et Comparaison
* **Test BFS/DFS avec un autre sommet :** Exécuté depuis **Lyon**.
* **Test Dijkstra avec un autre sommet :** Exécuté depuis **Lyon** (vers Nancy : direct 90 km).
* **Comparaison théorique (Différence parcours vs plus court chemin) :**
  1. Les algorithmes de parcours (**BFS, DFS**) explorent la connectivité et la topologie du graphe sans prendre en compte les distances métriques (BFS minimise le nombre d'arêtes traversées, tandis que DFS explore au plus profond de chaque branche avant de rebrousser chemin).
  2. L'algorithme de **Dijkstra** résout un problème d'optimisation métrique : il cumule la somme réelle des pondérations (distances en km) afin de garantir mathématiquement le chemin de coût global minimal dans un graphe à poids positifs.

---

## 4. Fonctionnalités de l'Interface Graphique (Bonus)

- **Accès rapide en 1 clic** aux 4 scénarios obligatoires du sujet via les boutons d'en-tête.
- **Visualisation graphique claire :**
  - Vert pour le sommet de départ.
  - Rouge pour le sommet d'arrivée.
  - Ambre/Or pour le plus court chemin de Dijkstra.
  - Vert émeraude pour l'arbre BFS.
  - Violet pour l'arbre DFS.
- **Interactivité complète :**
  - Clic gauche sur une ville = définir comme départ.
  - Clic droit ou Maj+Clic = définir comme arrivée.
