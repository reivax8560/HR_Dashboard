# HR Dashboard

Un tableau de bord RH permettant de gérer les employés, les services et les absences, avec graphiques et indicateurs clés.  
Projet conçu dans un cadre **portfolio**, mettant en avant les compétences en React, Vite, data-visualisation et tests unitaires.

---

## 🚀 Démo

👉 **Live demo :** https://hr-dashboard-virid.vercel.app/

---

## 🧰 Stack Technique

- **Frontend :** React.js + Vite
- **Charts :** Recharts
- **Tests :** Vitest / Testing Library / Cypress
- **Styling :** CSS / Responsive Design
- **Déploiement :** Vercel

---

## 📊 Fonctionnalités

### 🔹 Gestion & Données

- Gestion des **employés**, **absences**, **services**
- Filtrage dynamique des données

### 🔹 Dashboard

- **Graphiques interactifs** via Recharts :
  - Bar charts
  - Line charts
- **Indicateurs clés** :
  - Ancienneté moyenne
  - Nombre total d’employés
  - Absences en cours
  - Taux d’absentéisme

### 🔹 Qualité & Tests

- Tests unitaires : Vitest/TL
- Tests d’affichage et de logique métier
- Tests E2E : Cypress

---

## 📦 Installation & Lancement

```bash
# Cloner le repo
git clone <url_du_projet>
cd hr_dashboard

# Installer les dépendances
npm install

# Lancer le serveur dev
npm run dev
```

---

## 🧪 Lancer les tests

```bash
npm run test
```

et pour les test E2E :

```bash
npm run tcypress
```

📝 Les tests couvrent :

- Logique métier (ex. : calcul d’ancienneté)
- Rendu des composants
- Présence des données et indicateurs

---

## 📁 Structure du projet (simplifiée)

```
src/
 ├── components/
 │    └── modal/
 │    └── table/
 ├── datas/
 ├── hooks/
 ├── layout/
 ├── pages/
 │    └── absences/
 │    └── dashboard/
 │    └── employees/
 │    └── services/
 ├── store/
 └── utils/
```

---

## 🎨 UI & Design

- Layout responsive
- Colorimétrie simple, orientée data‑visualisation
- Composants modulaires réutilisables

---

## 🎯 Objectif du projet (Portfolio)

Le but est de démontrer :

- La capacité à concevoir une application front complète
- La gestion de data en temps réel côté client
- L’intégration de graphiques lisibles et performants
- L'écriture de tests unitaires robustes
- Une approche propre et documentée

---

## 📄 Licence

Projet personnel — libre consultation à des fins professionnelles.
