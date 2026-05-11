## Arborescence :
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
|------ data.service.spec.ts
|------ data.service.ts
|---- models
|------ country.model.ts
|------ participation.model.ts

## Composants :

- Line-Chart : permet d'afficher un graphique de type 'ligne'. 
- Pie-Chart : permet d'afficher un graphique de type 'camember'.

## Service : 

- DataService : permet de récupérer les données dans le fichier JSON, de les traiter et de les renvoyer.
- Les models permettent d'utiliser des interfaces clairement définies.

## Avantages :

- Lors de la mise à disposition de l'API Backend, seul le DataService aura besoin d'être modifié.