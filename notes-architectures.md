## Liste de problèmes identifiés :
- Version Angular 18 : 3 versions majeurs de retard, actuellement Angular 21
- Couche service manquante : la couche component fait directement les appels aux données.
- Absence de typage : plusieurs utilisations du any
- Code "deprecated" : mauvaise utilisation de la libraire rxJS et du subscribe
- Modèle de données non défini : pas d'interface ou class pour définir la structure des données

## Architecture à mettre en oeuvre :
src/app/
|-- components/
|---- line-chart
|------ line-chart.component.html
|------ line-chart.component.scss
|------ line-chart.component.spec.ts
|------ line-chart.component.ts
|---- pie-chart
|------ pie-chart.component.html
|------ pie-chart.component.scss
|------ pie-chart.component.spec.ts
|------ pie-chart.component.ts
|-- pages/
|---- country/
|------ country.component.html
|------ country.component.scss
|------ country.component.spec.ts
|------ country.component.ts
|---- home/
|------ home.component.html
|------ home.component.scss
|------ home.component.spec.ts
|------ home.component.ts
|---- not-found/
|------ not-found.component.html
|------ not-found.component.scss
|------ not-found.component.spec.ts
|------ not-found.component.ts
|-- core/
|---- services/
|------ data.service.ts
|---- models
|------ country.ts
|------ participation.ts

- Architecture en couches appliqués à la structure du projet.
- Utilisation de composants pour la réutilisabilité et la modularité du code.
- L'intégration avec un futur backend est facilité grâce à la couche service. Il n'y aura aucun impact sur les components tant que la structure des données est respectée.