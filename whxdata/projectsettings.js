// Publish project specific data
(function() {
rh = window.rh;
model = rh.model;
var defaultTopic = "First_Topic.htm";
rh._.exports(defaultTopic);
rh.consts('DEFAULT_TOPIC', encodeURI("First_Topic.htm"));
rh.consts('HOME_FILEPATH', encodeURI('index.htm'));
rh.consts('START_FILEPATH', encodeURI('index.htm'));
rh.consts('HELP_ID', 'd3f78253-a5ee-4d1f-afb1-9fc362be75b0' || 'preview');
rh.consts('LNG_SUBSTR_SEARCH', 0);

model.publish(rh.consts('KEY_LNG_NAME'), "fr");
model.publish(rh.consts('KEY_DIR'), "ltr");
model.publish(rh.consts('KEY_LNG'), {"BreadcrumbStart":"Accueil :","BrsNextButton":"Suivant","BrsPrevButton":"Précédent","CloseFavorites":"Fermer les favoris","ContentsTab":"Contenus","CookiesAcceptText":"Afin d’optimiser votre expérience mais aussi la performance et la lisibilité de l’outil, nous pouvons vous demander d’accepter les cookies. Ils sont utilisés afin de garder en mémoire vos rubriques préférées mais aussi de restaurer la table des matières, l’index et le glossaire lors de toute modification de rubrique. Vous devez configurer ce paramètre une seule fois. Pour le réinitialiser, il vous suffit de supprimer les cookies de votre navigateur.","CookiesAcceptButton":"Accepter","CookiesDenyButton":"Plus tard","EditFavorites":"Modifier les favoris","FavoriteArticle":"Article enregistré","FavoriteArticles":"Articles enregistrés","FullScreenButton":"Plein écran","GlossaryTab":"Glossaire","GlossResultHeaderLabel":"Dictionnaire du glossaire","HideLeftPanelTip":"Masquer le volet de gauche","HideResults":"Masquer les résultats","HomeButton":"Accueil","HomePageLogoTitle":"Logo","HomePageSubtitle":"Comment pouvons-nous vous aider ?","IndexTab":"Index","MCSearchResultShowFullTopic":"En savoir plus...","MiniTOCCaption":"Dans cette rubrique","NoResultsFoundText":"Aucun résultat trouvé","PrintButtonTip":"Imprimer","RemoveFavItem":"Supprimer ","RemoveHighlight":"Supprimer la mise en surbrillance","ResultsFoundText":"%1 résultat(s) trouvé(s) pour %2","SearchPlaceHolder":"Rechercher...","IndexFilterKewords":"Filtrer les mots-clés","GlossaryFilterTerms":"Filtrer les termes","SetAsFavorite":"Définir comme favori","ShowLeftPanelTip":"Afficher le volet de gauche","TOCTileArticlesCount":"Article(s)","ToTopButtonTip":"Retour en haut","UnsetAsFavorite":"Ne plus définir comme favori","TopicHiddenText":"Cette rubrique s’affiche selon les filtres sélectionnés.","ResetFilters":"Réinitialiser les filtres","SkipToMainContent":"Passer au contenu principal","ClearSearchBox":"Effacer la zone de recherche","RemoveFilter":"Supprimer le filtre","SelectedFilters":"Filtres sélectionnés","CloseSidebar":"Fermer la barre latérale","OpenMenu":"Ouvrir le menu","CloseMenu":"Fermer le menu","ViewMore":"Afficher plus","SearchPaginationLabel":"%1 à %2 de %3 résultats","NextSearchResults":"Page de recherche suivante","PrevSearchResults":"Page de recherche précédente"});

model.publish(rh.consts('KEY_HEADER_TITLE'), "FondueChinoise");
model.publish(rh.consts('PDF_FILE_NAME'), "");
model.publish(rh.consts('MAX_SEARCH_RESULTS'), "20");
model.publish(rh.consts('KEY_SKIN_FOLDER_NAME'), "Orange");
model.publish(rh.consts('CHAT_API_SESSION_TOKEN'), "");
model.publish(rh.consts('CHAT_API_PROJ_ID'), "");

model.publish(rh.consts('KEY_SUBSTR_SEARCH'), "");
model.publish(rh.consts('KEY_LOGO_URL'), "");
model.publish(rh.consts('KEY_SPECIAL_CHARS'), "0;1;2;3;4;5;6;7;8;9");
})();
