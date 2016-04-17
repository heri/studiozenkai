+++
date = "2016-01-15T12:22:27-04:00"
draft = false
title = "Playbook"

+++

Bonjour!

Nous offrons _une expertise technique pour un résultat de qualité_ dans le développement de plateformes transactionnelles, de financement, de médias:

* Étude et conception fonctionnelle et technique
* Développement de solutions front, middle ou back-office
* Développement d'applications iOS ou Android
* Conduite de projet sur les technologies Ruby, Javascript, Lua, et plateformes mobiles; utilisation de base de données MySQL, Postgresql, ou redis, mongodb, ElasticSearch, Solr
* Audit de code, de qualité et de performance des applications
* Automatisation des tests et recettes
* Intégration et interfaçage
* Mise en production
* Support et maintenance évolutive et corrective

Nous développons de façon _lean_ et rapide, ce qui veut dire que vous obtenez votre produit rapidement et à un coût compétitif, le tout à un standard de qualité élevé.

Développer une plateforme d'excellence démarre par un processus bien conçu. Ce document ou _Playbook_ décrit le processus utilisé pour tous nos projets, que ce soit les meilleurs pratiques, astuces et règles que nous avons établis au fil des années. Nous avons inclus un exemple de projet (DAMAVA) qui vous montre le processus en action. Nous encourageons les clients nouveaux et potentiels à lire ce document pour qu'ils savent à quoi s'attendre en travaillant avec nous. Ceci est un document vivant qui est régulièrement mis à jour par notre équipe à fur et à mesure que nous apprenons à mieux faire les choses, donc attendez-vous à des modifications en tout temps.

# Le premier contact

La plupart de nos clients sont introduits par nos clients existants, qui nous trouvent par notre implication dans la communauté startup, via les publications en ligne ou via Google. Après avoir une recherche rapide, ils entrent en contact en remplissant un formulaire sur le site ou bien en nous envoyant un courriel.

Après avoir reçu la première requête, nous planifions une première discussion pour discuter du projet en détail:

* Est-ce que votre projet cadre avec nos compétences techniques (platforme et développement sur mesure, applications web, applications mobile, recherche et développement, intégration d'APIs externe, design) ?
* Avez-vous un budget suffisant en accord avec l'ambition du projet?
* Et-ce que votre calendrier cadre avec nos disponibilités?

Après avoir confirmé qu'il y a une collaboration possible, nous parlerons plus en détail de notre culture et de notre philosophie sur le développement de technologie. Nous pouvons aussi aller en détail par rapport aux coûts et délais.

Si les deux partis s'entendent, nous signons normalement un accord de non-divilguation (ou NDA) pour vous assurer que votre investissement sera protégé, et nous pouvons alors démarrer le processus de développement et le processus de découverte.

*Exemple: Dans le projet DAMAVA, l'instigateur du projet a été introduit par la responsable économique de la Ville de Montréal, avec qui nous avons eu de bonnes collaborations. Après avoir discuté de plusieurs projets potentiels, nous nous sommes mis d'accord pour développer une nouvelle plateforme mettant en relation des aidants naturels et des personnes agées, à travers le Canada. Les compétences d'aidants naturels, leur calendrier de disponibilité, leur placement géographique, une messagerie par email et SMS, ainsi qu'une plateforme de paiement électronique devront être développés.*

# La phase de découverte

Développer une plateforme sur mesure est en soi complexe. Même les applications "simples" ont des couches de complexité cachées qui doivent être analysées et répertoriées. Cette phase de découverte permet à notre équipe d'investir le temps nécessaire pour comprendre votre application de A à Z, et d'aller à travers chaque fonctionnalité requise, user story, écran, etc. ce qui nous permet en retour d'estimer de manière plus précise le temps requis et le coût.

De manière générale, la phase de découverte inclus:

* la description des différents types d'utilisateur (utilisateur courant, utilisateur secondaire, administrateur, staff, partenaire commercial etc.),
* la description des "user stories" pour les différents types d'utilisateur,
* la description des fonctionnalités majeures de l'application,
* le design de wireframe pour les pages principales de l'application,
* le choix des technologies pour le front-end, le back-end, serveur etc.
* ingénierie de la plateforme, par rapport au traffic planifié, nombre de commandes et besoins utilisateurs,
* le calendrier détaillé de chaque section majeur de l'application et chaque étape du processus de développement de la plateforme,
* l'estimation détaillé de chaque section majeure de l'application et chaque étape du processus.

À la fin du processus de découverte, nous vous fournirons un document détaillé qui décrit tous les éléments ci-dessus.

*Exemple: Après notre première rencontre, nous avons planifié quelques rencontres pour avoir une meilleure compréhension de la plateforme voulue. L'idée semblait très simple, mais nous savions qu'il y avait une complexité cachée que nous devions découvrir durant le processus de découverte. Notamment, notre partenaire avait pensé aux besoins du client, mais n'avait pas pensé à l'interface d'administration nécessaire pour gérer les clients et données ou un interface utilisateur pour ceux qui commandent. D'autres questions sont aussi apparus: que se passe-t-il après une commande? comment sont servis les pages statiques? etc.*

Aperçu de l'analyse écrite après la phase de découverte:
![Conclusion découverte DAMAVA](/images/discovery.png "[Conclusion découverte DAMAVA")

# La phase de design

Les meilleures plateformes ont un design excellent, tant dans la forme que dans le fond.  Personne n'utilisera l'application si elle est _laide_ ou _ardue_ à naviguer. Tous vos efforts seront alors vains même si vous avez le concept le plus extraordinaire du monde.

Nous tenons une importance cruciale dans le succès de votre application et de votre compagnie. Avoir une plateforme populaire est aussi important pour vous que ce l'est pour nous, alors nous plaçons une haute priorité pour avoir le bon design, pour que vous ayez une application belle et fonctionnelle.

Il arrive aussi que nous travaillons avec des partenaires qui ont déjà un design. Dans ce cas, nous l'examinerons en détail et le discuterons avec vous.

Généralement, notre processus de design inclus:

* _Développement de wireframes de chaque page de l'application_ : Les wireframes sont des sketches en noir et blanc qui montrent la mise en page. On peut voir la structure générale des différents écrans et où les boutons et contenu iront. Ils peuvent aussi décrire les interactions utilisateurs, comme drag & drop, clic, swipe, single tap etc.

* _Construction du sitemap_ : Quand tous les wireframes seront terminés, nous faisons un simple sitemap qui vous montre comment les pages et les sections de l'app vont interagir entre eux. Par exemple, cela va montrer quelle page sera chargée quand l'utilisateur clique sur un bouton et quand ils finissent de remplir un formulaire.

* _Interface graphique et Palette de couleurs_ Ensuite nous décidons du look de l'application. Durant cette étape seront choisis la typographie, la palette de couleurs, la librairie d'icônes etc. Tout sera mis ensemble dans un guide de style.

* _Prototype interactif_ : Finalement nous important tous les mockups dans Invision App (ou une application similaire), créant ainsi un prototype interactif qui a le "look & feel" de l'application finale.

*Exemple: Pour DAMAVA, un prototype interactif couvrant les préférences utilisateur, et le processus de commande était disponible. Ce prototype était alors la référence pour tout future discussion sur les travaux à rendre*

Voici le prototype interactif pour DAMAVA:
![Prototype DAMAVA](/images/prototype.png "[Prototype DAMAVA")


# La phase de développement

La programmation est la partie la plus complexe et qui nécessite le plus de temps dans le développement logiciel. Nous commençons seulement à programmer quand la phase de découverte et de design sont finis. Ceci assure que votre budget ne sera pas perdu dans le développement de fonctionnalités et des écrans qui vont nécessiter des révisions majeurs, ou pire, qui devront être effaçés et complètement refaits. C'est mieux de faire ces erreurs dans la phase moins coûteuse de design, quand on peut changer la plateforme rapidement avec juste quelques clics de souris. Comme mentionné ci-dessus, nous ne pouvons prendre un projet sans la phase de découverte et de design (ne pas suivre ces étapes assure l'échec du projet), et nous préférons refuser une collaboration plutôt que de se mettre d'accord sur un processus que nous savons voués à l'échec.

Dans la plupart des projets, la phase de développement inclus:

* _Mettre en place l'environnement de développement_ Nous démarrons en mettant en place un environnement de développement, aussi bien sur nos machines que sur nos serveurs qui vous seront accessible pour voir les progrès. Cela implique l'installation de logiciels et de librairies.

* _Développer l'architecture et la base de données_ Ceci inclus la structure de la base de données selon les outils choisis, le choix d'authentification utilisateur, création de compte, relations entre données. À cette étape, nous établissons les fondations de la plateforme.

* _Développement des fonctionnalités_ Nous prenons un à un les "user stories" répertoriés surant la phase de découverte et nous mettons dans zenhub, notre système de gestion de projet. Nous assignons ensuite chaque fonctionnalité à un développeur, estimons le temps requis, et rajoutons les informations pour chaque fonctionnalité, ainsi que les tests nécessaires pour la validité. À fur et à mesure que les développeurs réalisent chaque fonctionnalité, nous mettons à jour zenhub, et la fonctionnalité est alors sous la responsabilité de l'assurance qualité.

* _Assurance Qualité_ À fur et à mesure que les fonctionnalités sont réalisés, l'assurance qualité passe en revue le code ainsi que les tests pour voir s'assurer de la qualité et voir s'il y a des bogues. En plus, nous mettons en place un système de tests automatisés qui vous assurent la fonctionnalité de l'application. Nous suivons plusieurs principes qui ensemble, vous assure une couverture qualité des fonctionnalités de haut niveau du système ainsi que la qualité des différents sous-modules, aussi petits soit-ils. Avec un système automatisé, votre compagnie sera capable de développer, optimiser et maintenir le code, sans vous soucier des conséquences innattendus que la mise à jour de code peut entraîner.

* _La livraison_ Fonctionnalité par fonctionnalité, l'application est développé. Vous pouvez vérifiez à tout moment l'avancement du projet en allant sur zenhub ou bien en allant sur les serveurs de développement, jusqu'au jour où l'application sera prête pour être lancé.

*Exemple: Dès que le processus de design et de découverte de DAMAVA a été finalisé, nous étions prêts pour démarrer le développement. Nous avons chargé tous les "user stories" créé durant la phase de découverte et design dans zenhub et nos développeurs étaient prêts. Puisque le projet a été bien défini durant les deux premières phases, la phase de développement s'est bien passé, avec très peu de surprises, et notre équipe a été capable de mettre en ligne la première version de l'application en 2 mois et demie.*

![Nous utilisons DigitalOcean pour héberger des instances flexibles et idéales pour le développement](/images/digitalocean.png "Nous utilisons DigitalOcean pour héberger des instances flexibles et idéales pour le développement")
![Gestion des fonctionnalités à developper avec Zenhub](/images/zenhub.png "Gestion des fonctionnalités à developper avec Zenhub")

# La phase de "Beta Testing"

C'est le temps de voir comment votre application est reçue dans la "vrai vie". La plateforme la mieux programmée aura toujours des bogues, il est donc impératif que votre application soit testée, utilisée, revue par des utilisateurs potentiels avant le lancement officiel. Les beta-testeurs incluent souvent les vrais utilisateurs de la plateforme, qui vont l'utiliser dans les mêmes conditions et la même finalité que la plateforme finale.

Il arrive que le processus de beta soit découpé en un beta privé, où des utilisateurs spécifiques sont invités pour tester l'application, et un beta publique, où n'importe qui peut s'identifier et "jouer" avec une version beta. Ce processus peut indéniablement souligner des bogues, ainsi que mettre en avant des fonctionnalités critiques manquantes qui devront être analysés et travaillés avant le lancement final.

*Exemple: dès qu'une version utilisable a été développé, toute l'équipe a été invité pour essayer la plateforme et essayer d'y trouver les limites. Ceci a mis avant des bogues graphiques, des bogues de logique, des bogues d'exception ainsi qu'un design à travailler pour le navigateur Firefox et Microsoft Edge. Ensuite le client a été invité à tester l'application et nous faire en détail de leur commentaire. Dès la fin de cette étape, des aidants naturels de la région de Montréal ont été invités à tester l'application sur le terrain. Il en est sortie une liste de feedback positifs, les utilisateurs beta ayant trouvé l'application facile à utiliser et naviguer.*

# La phase de lancement

Après de nombreux mois de travail ardu, l'application est lancé! C'est le temps de fêter et de se féliciter! Il y a eu des moments difficiles et longs, mais c'est le but. Comme l'a dit John Kennedy : "Nous avons choisi d'aller sur la lune, non parce que c'était facile, mais parce que c'était difficile"


# Maintenance : Un accompagnement au delà du lancement du produit

Comme tout système complexe, les plateformes requiert une maintenance. Quand vous achetez une nouvelle voiture tout fonctionne parfaitement. Mais avec le temps, si vous ne changez pas l'huile, alors le moteur va à un moment ou un autre se déteriorer et s'arrêter de fonctioner. C'est la même chose pour tout logiciel. Le jour où votre application est 100% complète n'arrivera jamais. Un certain niveau de maintenance est nécessaire, incluant:

* _La surveillance des erreurs et résolution des bogues potentiels_ Tout plateforme doit être suivie pour tout erreur sur une base constante. À fur et à mesure que des utilisateurs différents sont rajoutés sur le système, et que l'application est utilisé de manière différente, plus de bogues ou besoins clients vont être découverts et devront être corrigés. Nous utilisons Airbrake pour la gestion des erreurs, et New Relic pour le suivi de performance.

* _Gestion des librairies_ Les applications mobiles et web modernes sont souvent développées avec des librairies en code ouvert, comme par exemple Ruby on Rails, jQuery, React, Bootstrap, Lapis etc. De plus, des APIs sont souvent intégrés pour utiliser des données externes, solutions de paiement, comptes de médias sociaux etc. Ces dépendances externes vont changer avec le temps : de nouvelles versions vont être publiés, des bogues vont apparaêtre, et les méthodes d'intégration vont changer. Par exemple, si vous utilisez Paypal, il se peut que ce fournisseur annonce une toute nouvelle façon de s'authentifier, qui invalide alors votre processus de paiement actuel. Pour avoir une application fonctionelle, vous aurez besoin de mettre à jour et maintenir ces dépendances sur une base constante.

* _Optimisation de performance_ À fur et à mesure que votre application devient populaire, la performance sera amoindrie. Les temps de chargement vont s'allonger, et la base de données devient moins responsive etc. Cela signifie qu'une optimisation continue devra être effectué.

* _Sécurité_ Les criminels recherchent régulièrement à pirater, soutirer de l'argent, attaquer votre plateforme, ou utiliser votre plateforme pour des fins illégaux. Cela signifie qu'une surveillance continue devra être effectué. Nous offrons différents solutions, selon le type d'application.


*Exemple: Après la livraison d'une application fonctionnelle, un forfait de maintenance incluant l'hébérgement, la résolution de bogues, la maintenance logicielle et l'optimisation a été offert au client, qui peut donc se concentrer sur les besoins d'affaire.*

![Nous utilisons Airbrake pour le suivi des erreurs](/images/airbrake.png "Nous utilisons Airbrake pour le suivi des erreur")


# Développement continuel

Après que les clients utilisent votre plateforme pour des besoins concrets, vous pouvez vous rendre compte qu'ils vous manquent des fonctionnalités. Il se peut aussi que ce soit des fonctionnalités critiques et qui doivent être rajoutés _tout de suite_. Il est donc important d'avoir un budget de développement continuel. Encore une fois, les meilleurs plateformes sont celles qui sont toujours en développement, et ne sont jamais parfaitement finies.


# Un projet et coût maîtrisé

Comme vous l'avez peut-être deviné, la conception d'applications sur mesure est un processus complexe qui requiert une collaboration entre des professionnels différents. C'est courant d'avoir des projets incluant :

* un gestionnaire de produit qui s'assure que la plateforme répond aux besoins clients, interface avec les développeurs, et coordonnne l'assurance qualité
* un designer
* un développeur front-end
* un développeur back-end

Selon la complexité du projet, ce nombre peut être restreint à une équipe de deux personnes, ou à l'inverse peut se rajouter un gestionnaire de projet, des développeurs back-end et mobile supplémentaires, et des personnes en assurance qualité.

Avec notre expérience, nous avons développé le processus de gestion de projet que nous utilisons sur chaque projet. Il est conçu pour augmenter la productivité et maximiser le retour sur votre investissement, et aussi pour vous permettre d'être au courant du projet. Vous pouvez vous attendre à:

_Un seul point de contact_. La dernière chose que nous voulons est que chaque personne de votre équipe et chaque personne de notre équipe passent leur temps à communiquer et parler de la même chose. Pour rémédier à cela, c'est mieux d'avoir un seul point de contact de votre coté, et un seul de notre coté, à travers lequel toutes les échanges sont faites.

_Une rencontre hebdomadaire_ Vous êtes impatient d'avoir votre application et vous voulez la publier. Tous les jours, vous voulez donc savoir:

* Qu'est ce qui a été fait aujourd'hui?
* Qu'est ce qui a été réalisé hier?
* Que sera fait demain?
* Puis-je voir?
* Quand est-ce que ce sera fini?

Nous comprenons. Nous sommes aussi impatients aussi. Mais voici le bémol. Toutes ces discussions, appels et emails prennent beaucoup de notre temps, distraient l'équipe, diminue votre budget, et aussi rendent les choses plus lentes et non plus rapides.

Nous voulons être respectueux de votre temps et de votre budget et nous voulons nous assurer que vous restez maître du projet. Ainsi, chaque lundi nous aurons des rencontres de vive voix ou en vidéo avec vous et votre équipe, où nous allons en revue ce qui a été réalisée la semaine précédente et ce qui est planifié pour être complété la semaine courante. De cette façon, vous savez toujours ce qui se passe et où en est le projet, et nous vous répondrons sur une base hebdomadaire.

Ceci signifie aussi que les emails, appels téléphoniques, messages textes, et chats devront être évités en dehors des rencontres hebdomadaires du lundi. Bien sûr, il y aura toujours des développement critiques qui engendreront des exceptions à cette règle, mais de façon régulière, nous préférons suivre ce plan pour que le projet avance comme prévu.

_Démonstration_ Dans ces rencontres, une partie du temps sera réservée à vous montrer le travail réalisé jusqu'à présent. Le travail reste disponible sur les serveurs de développement.

_Outils de gestion de projet_. Nous utilisons une panoplie d'outils pour la gestion de projet pour améliorer notre vitesse et qualité. Voici les outils les plus utilisés:

* Zenhub pour le suivi de développement, collaboration
* Skype/Google Hangout pour les rencontres vidéos
* Slack pour chat
* Invision App pour visionner les écrans
* Google Docs pour le travail sur Excel, Word, Powerpoint
* Harvest pour le suivi précis du temps de travail et comptabilité

# Notre philosophie de développement

## Méthodologie Lean et MVP

Nous croyons au principe de développement lean... ce qui signifie tout simplement le développement de la version la plus simple possible d'application, aussi appellé MVP ou Produit Minimum Viable. Le MVP inclut seulement le coeur et les fonctionnalités critiques de votre application, et rien d'autre. Cette approche est la plus rapide et qui vous rapporte le plus en matière de retour sur investissement, pour que vous puissier obtenir du feedback et apprendre des comportements utilisateurs _AVANT_ de rajouter des fonctionnalités secondaires.

Excellent, non? Nous comprenons que nos clients veulent contrôler leur coûts, et en même temps proposer le meilleur produit sur le marché. C'est pour cela que nous collaborons de près avec nos clients pour s'assurer que la vision MVP soit bien consistant auprès de chaque membre de l'équipe. Notre expérience a montré que plus l'offre initiale est "lean", mieux sera le retour sur investissment au long terme.

Pourquoi cela? Parce que vous n'ajouterez pas de fonctionnalités superflues, qui bien que étant une très bonne idée initialement, n'était pas finalement celle que vos utilisateurs voulaient. Pourquoi allez-vous dépenser de l'argent sur des fonctionnalités qui sera envoyé à la poubelle? Nos clients ont trouvé que c'est mieux de démarrer lean et de dépenser de l'argent seulement sur des fonctionnalités sur des _besoins prouvés_.

## 改善 : Faire le meilleur produit possible

Nous tenons à faire le meilleur produit possible chaque jour. Nous améliorons de façon continue nos pratiques, notre efficacité personelle, et tenons à éliminer tout ce qui est superflu. C'est la philosophie 改善 ou Kaizen qui fait de nous des artisans du code passionnés.

# Travaillons ensemble !

Maintenant que vous comprenez notre processus de développement et notre philosophie génerale et approche pour développer des plateformes réussis, discutons ensemble de votre prochain projet.
