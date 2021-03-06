(function () {
    'use strict';
    angular.module('app')
        .controller('CardsBigCtrl', CardsBigCtrl);

    function CardsBigCtrl($scope, Storage, Backend, $stateParams, $ionicPopup, $http, C, $cordovaToast, $ionicLoading, $ionicConfig, $ionicSlideBoxDelegate, $timeout, $rootScope, $ionicSideMenuDelegate, $compile, localStorageService) {
        var data = {}, fn = {};
        var vm = this;
        vm.slider1 = {};
        $scope.data = data;
        $scope.fn = fn;
        $scope.ShowModal = false;
        $scope.cardModal = {};
        $scope.cardModalAnswer = false;
        $scope.ChooseColor = false;
        $scope.MaxSlides = 10;
        $scope.leftShift = 0;
        $scope.index2 = 0;
        $scope.indexes = [];//curent slides indexes to apply
        $scope.indexesinslide = []; // indexes that current added to slide
        $scope.SlidesChangedMark = false;// help to us skip  double sliding
        $scope.LoadInProgress = true;

        $scope.alert = function (data) {
            console.log(data);
        }
        $scope.item = 'test';
        $scope.slider = {};

        $scope.delSlide = function () {
            $scope.slider.removeSlide(0);

        };

        $scope.checkClick = function () {
            console.log('Click');
        };


        $scope.avaliableLanguages = [
            {code: 'Auto', image: 'images/country/automatic-loading.svg', text: 'Auto'},
            {code: 'en', image: 'images/country/united-kingdom.svg', text: 'English'},
            {code: 'de', image: 'images/country/de.svg', text: 'German'},
            {code: 'fr', image: 'images/country/fr.svg', text: 'French'},
            {code: 'it', image: 'images/country/it.svg', text: 'Italian'},
            {code: 'es', image: 'images/country/es.svg', text: 'Spanish'},
            {code: 'ja', image: 'images/country/ja.svg', text: 'Japanese'},

            {code: 'af', image: 'images/country/za.svg', text: 'Afrikaans'},
            {code: 'sq', image: 'images/country/al.svg', text: 'Albanian'},
            {code: 'am', image: 'images/country/et.svg', text: 'Amharic'},
            {code: 'ar', image: 'images/country/Flag_of_the_Arab_League.svg', text: 'Arabic'},
            {code: 'hy', image: 'images/country/am.svg', text: 'Armenian'},
            {code: 'az', image: 'images/country/az.svg', text: 'Azeerbaijani'},
            {code: 'eu', image: 'images/country/Flag_of_the_Basque_Country.svg', text: 'Basque'},
            {code: 'be', image: 'images/country/by.svg', text: 'Belarusian'},
            {code: 'bn', image: 'images/country/Flag_of_Bangladesh.svg', text: 'Bengali'},
            {code: 'bs', image: 'images/country/Flag_of_Bosnia_and_Herzegovina.svg', text: 'Bosnian'},
            {code: 'bg', image: 'images/country/bg.svg', text: 'Bulgarian'},
            {code: 'ca', image: 'images/country/Flag_of_Catalonia.svg', text: 'Catalan'},
            {code: 'ceb', image: 'images/country/Flag_of_the_Philippines.svg', text: 'Cebuano'},
            {code: 'ny', image: 'images/country/zm.svg', text: 'Chichewa'},
            {code: 'zh-CN', image: 'images/country/cn.svg', text: 'Chinese (Simplified)'},
            {code: 'zh-TW', image: 'images/country/Flag_of_the_Republic_of_China.svg', text: 'Chinese (Traditional)'},
            {code: 'co', image: 'images/country/Flag_of_Corsica.svg', text: 'Corsican'},
            {code: 'hr', image: 'images/country/hr.svg', text: 'Croatian'},
            {code: 'cs', image: 'images/country/cz.svg', text: 'Czech'},
            {code: 'da', image: 'images/country/Flag_of_Denmark.svg', text: 'Danish'},
            {code: 'nl', image: 'images/country/nl.svg', text: 'Dutch'},
            {code: 'eo', image: 'images/country/eu.svg', text: 'Esperanto'},
            {code: 'et', image: 'images/country/ee.svg', text: 'Estonian'},
            {code: 'tl', image: 'images/country/Flag_of_the_Philippines.svg', text: 'Filipino'},
            {code: 'fi', image: 'images/country/fi.svg', text: 'Finnish'},
            {code: 'fy', image: 'images/country/Frisian_flag.svg', text: 'Frisian'},
            {code: 'gl', image: 'images/country/Flag_of_Galicia.svg', text: 'Galician'},
            {code: 'ka', image: 'images/country/ge.svg', text: 'Georgian'},
            {code: 'el', image: 'images/country/gr.svg', text: 'Greek'},
            {code: 'gu', image: 'images/country/in.svg', text: 'Gujarati'},
            {code: 'ht', image: 'images/country/ht.svg', text: 'Haitian Creole'},
            {code: 'ha', image: 'images/country/ng-rng.gif', text: 'Hausa'},
            {code: 'hav', image: 'images/country/Flag_of_Hawaii.svg', text: 'Hawaiian'},
            {code: 'iw', image: 'images/country/Flag_of_Israel.svg', text: 'Hebrew'},
            {code: 'hi', image: 'images/country/in.svg', text: 'Hindi'},
            {code: 'hmn', image: 'images/country/Hmong_flag.svg', text: 'Hmong'},
            {code: 'hu', image: 'images/country/hu.svg', text: 'Hungarian'},
            {code: 'is', image: 'images/country/is.svg', text: 'Icelandic'},
            {code: 'ig', image: 'images/country/Flag_of_Biafra.svg', text: 'Igbo'},
            {code: 'id', image: 'images/country/id.svg', text: 'Indonesian'},
            {code: 'ga', image: 'images/country/Flag_of_Ireland.svg', text: 'Irish'},
            {code: 'jm', image: 'images/country/Flag_of_Indonesia.svg', text: 'Javanese'},
            {code: 'kn', image: 'images/country/Flag_of_Karnataka.svg', text: 'Kannada'},
            {code: 'kk', image: 'images/country/kz.svg', text: 'Kazakh'},
            {code: 'km', image: 'images/country/Flag_of_Cambodia.svg', text: 'Khmer'},
            {code: 'ko', image: 'images/country/kr.svg', text: 'Korean'},
            {code: 'ku', image: 'images/country/Flag_of_Kurdistan.svg', text: 'Kurdish'},
            {code: 'ky', image: 'images/country/Flag_of_Kyrgyzstan.svg', text: 'Kyrgyz'},

            {code: 'lo', image: 'images/country/Flag_of_Laos.svg', text: 'Lao'},
            {code: 'la', image: '', text: 'Latin'},
            {code: 'lv', image: 'images/country/lv.svg', text: 'Latvian'},
            {code: 'lt', image: 'images/country/lt.svg', text: 'Lithuanian'},
            {code: 'lb', image: 'images/country/Flag_of_Luxembourg.svg', text: 'Luxembourgish'},
            {code: 'mk', image: 'images/country/mk.svg', text: 'Macedonian'},
            {code: 'mg', image: 'images/country/mg.svg', text: 'Malagasy'},
            {code: 'ms', image: 'images/country/Flag_of_Malaysia.svg', text: 'Malay'},
            {code: 'ml', image: 'images/country/in.svg', text: 'Malayalam'},
            {code: 'mt', image: 'images/country/mt.svg', text: 'Maltese'},
            {
                code: 'mi',
                image: 'images/country/Tino_Rangatiratanga_Maori_sovereignty_movement_flag.svg',
                text: 'Maori'
            },
            {code: 'mr', image: 'images/country/in.svg', text: 'Marathi'},
            {code: 'mn', image: 'images/country/mn.svg', text: 'Mongolian'},
            {code: 'my', image: 'images/country/Flag_of_Myanmar.svg', text: 'Burmese'},
            {code: 'ne', image: 'images/country/Flag_of_Nepal.svg', text: 'Nepali'},
            {code: 'no', image: 'images/country/no.svg', text: 'Norwegian'},
            {code: 'ps', image: 'images/country/Flag_of_Afghanistan.svg', text: 'Pashto'},
            {code: 'fa', image: 'images/country/Flag_of_Iran.svg', text: 'Persian'},
            {code: 'pl', image: 'images/country/pl.svg', text: 'Polish'},
            {code: 'pt', image: 'images/country/pt.svg', text: 'Portuguese'},
            {code: 'ma', image: 'images/country/in.svg', text: 'Punjabi'},
            {code: 'ro', image: 'images/country/ro.svg', text: 'Romanian'},
            {code: 'ru', image: 'images/country/ru.svg', text: 'Russian'},
            {code: 'sm', image: 'images/country/Flag_of_Samoa.svg', text: 'Samoan'},

            {code: 'gd', image: 'images/country/Flag_of_Scotland.svg', text: 'Scots Gaelic'},
            {code: 'sr', image: 'images/country/Flag_of_Serbia.svg', text: 'Serbian'},
            {code: 'st', image: 'images/country/Flag_of_Lesotho.svg', text: 'Sesotho'},
            {code: 'sn', image: 'images/country/Flag_of_Zimbabwe.svg', text: 'Shona'},
            {code: 'sd', image: 'images/country/Flag_of_Sindh.svg', text: 'Sindhi'},
            {code: 'si', image: 'images/country/Flag_of_Sri_Lanka.svg', text: 'Sinhala'},
            {code: 'sk', image: 'images/country/sk.svg', text: 'Slovak'},
            {code: 'sl', image: 'images/country/Flag_of_Slovenia.svg', text: 'Slovenian'},
            {code: 'so', image: 'images/country/so.svg', text: 'Somali'},
            {code: 'su', image: 'images/country/Flag_of_Sudan.svg', text: 'Sundanese'},
            {code: 'sw', image: 'images/country/Flag_of_Swahili.gif', text: 'Swahili'},
            {code: 'sv', image: 'images/country/Flag_of_Sweden.svg', text: 'Swedish'},
            {code: 'tg', image: 'images/country/Flag_of_Tajikistan.svg', text: 'Tajik'},
            {code: 'ta', image: 'images/country/ta.svg', text: 'Tamil'},
            {code: 'te', image: 'images/country/in.svg', text: 'Telugu'},
            {code: 'th', image: 'images/country/th.svg', text: 'Thai'},
            {code: 'tr', image: 'images/country/tr.svg', text: 'Turkish'},
            {code: 'uk', image: 'images/country/ua.svg', text: 'Ukrainian'},
            {code: 'ur', image: 'images/country/in.svg', text: 'Urdu'},
            {code: 'uz', image: 'images/country/uz.svg', text: 'Uzbek'},

            {code: 'vi', image: 'images/country/Flag_of_Vietnam.svg', text: 'Vietnamese'},
            {code: 'cy', image: 'images/country/Flag_of_Wales_2.svg', text: 'Welsh'},
            {code: 'xh', image: 'images/country/za.svg', text: 'Xhosa'},
            {code: 'yi', image: 'images/country/yi.svg', text: 'Yiddish'},
            {code: 'yo', image: 'images/country/Flag_of_Egbe_Omo_Yoruba.svg', text: 'Yoruba'},
            {code: 'zu', image: 'images/country/ICS_Zulu.svg', text: 'Zulu'},


        ];





        $scope.SliderOptions = {
            loop: true,
            //effect: 'slide',
            speed: 500,
            preventClicks: true,
            preventClicksPropagation: true,
            spaceBetween: 50,
            showPager: false,
            onInit: function (slider) {
                console.log('init');
                $scope.slider = slider;
            },
            onSlideChangeEnd: function (slider) {
                slider.update();
                $scope.slider.updateLoop();
            }
        };


        $scope.$on('$ionicView.leave', function () {
            $ionicConfig.views.swipeBackEnabled(true);
            $ionicSideMenuDelegate.canDragContent(true);
        });


        $scope.propertyName = 'translatedText';
        $scope.reverse = false;
        $scope.$on('$ionicView.enter', function () {
            $ionicSideMenuDelegate.canDragContent(false);

            $ionicConfig.views.swipeBackEnabled(false);

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            data.cardId = $stateParams.cardId;
            data.type = $stateParams.type;

            console.log($stateParams);
            console.log('try get');
            $http.get(C.backendUrl + 'card/' + data.cardId)
                .then(function (res) {
                    console.log('cards ok');
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                        $ionicLoading.hide();
                    } else {
                        data.card = res.data.card;

                        if ((!angular.isDefined(data.card.color)) || (data.card.color == '')) {
                            data.card.color = '_blue';
                        }


                        ////fix country images////
                        var keepGoing = true;

                        angular.forEach($scope.avaliableLanguages, function (valueAval, keyAval) {
                            if (keepGoing) {
                                if ((valueAval.code == data.card.translateFrom) && (!angular.isDefined(data.card.FromImage) )) {
                                    data.card.FromImage = valueAval.image;
                                }
                                if ((valueAval.code == data.card.translateTo) && (!angular.isDefined(data.card.ToImage)   )) {
                                    data.card.ToImage = valueAval.image;
                                }
                                if ((angular.isDefined(data.card.FromImage) ) && (angular.isDefined(data.card.ToImage) )) {
                                    keepGoing = false;
                                }
                            }
                        }, data.card)
                        /////end fixes////






                        $scope.getAllCards(data.type);
                    }
                });

        });


        $scope.getAllCards = function (type) {
            $http.get(C.backendUrl + 'cards/' + type)
                .then(function (res) {
                    console.log('cards ok');
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                        $ionicLoading.hide();
                    } else {

                        data.cards = res.data.cards;
                        var index2 = -1;
                        var i = 0;

                        data.AllCardsToShow = [];
                        angular.forEach(data.cards, function (value, key) {
                            if ((!angular.isDefined(value.color)) || (value.color == '')) {
                                value.color = '_blue';
                            }
                            value.fontsize = 2;
                            console.log('index2=' + index2);
                            i++;


                            ////fix country images////
                            var keepGoing = true;

                            angular.forEach($scope.avaliableLanguages, function (valueAval, keyAval) {
                                if (keepGoing) {

                                    if ((valueAval.code == value.translateFrom) && (!angular.isDefined(data.cards[key].FromImage) )) {
                                        data.cards[key].FromImage = valueAval.image;
                                    }
                                    if ((valueAval.code == value.translateTo) && (!angular.isDefined(data.cards[key].ToImage)   )) {
                                        data.cards[key].ToImage = valueAval.image;
                                    }
                                    if ((angular.isDefined(data.cards[key].FromImage) ) && (angular.isDefined(data.cards[key].ToImage) )) {
                                        keepGoing = false;
                                    }
                                }
                            }, value, key)
                            /////end fixes////














                        });

                        setTimeout(function () {
                            $scope.slider.slideTo($rootScope.indexSlide + 1, 0, true);
                            $scope.LoadInProgress = false;
                            $ionicLoading.hide();
                        }, 1000);
                    }
                });
        };

        $scope.SelectColor = function (card) {
            $scope.ChooseColor = true;
            $scope.EditedCard = card;
        };

        $scope.close = function () {
            $scope.ChooseColor = false;
        };

        $scope.setColor = function (color) {
            $scope.EditedCard.color = color;
            $scope.close();
            var data = {'data': $scope.EditedCard};
            $http.post(C.backendUrl + 'card/color/' + $scope.EditedCard.id.id, data)
                .then(function (res) {
                    $ionicLoading.hide();
                    console.log('cards ok');
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                    } else {

                        $scope.EditedCard = {};
                    }
                });
        };

        $scope.DeleteCard = function (card) {
            console.log(card);
            console.log('delete');
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.delete(C.backendUrl + 'card/delete/' + card.id.id)
                .then(function (res) {
                    $ionicLoading.hide();
                    console.log('cards ok');
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                    } else {
                        var index = $scope.data.cards.indexOf(card);
                        if (index != -1) {
                            $scope.data.cards.splice(index, 1);
                        }
                        $rootScope.user.usercards.total--;
                        if (card.status == 'starred') {
                            card.status = 'unstarred';
                            $rootScope.user.usercards.starred--;
                        }
                        if (card.status == 'archived') {
                            card.status = 'unstarred';
                            $rootScope.user.usercards.archived--;
                        }
                        $ionicSlideBoxDelegate.update();

                        localStorageService.set('LoginedUser', $rootScope.user);
                    }
                });
        };

        $scope.ArchiveCard = function (card) {
            console.log('archive');
            console.log(card);
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var data = {'data': card};
            $http.post(C.backendUrl + 'card/archive/' + card.id.id, data)
                .then(function (res) {
                    console.log('cards ok');
                    $ionicLoading.hide();
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                    } else {
                        if (card.status == 'starred') {
                            card.status = 'archived';
                            $rootScope.user.usercards.starred--;
                            $scope.data.cards.splice($scope.data.cards.indexOf(card), 1);
                            $rootScope.user.usercards.archived++;
                            $rootScope.user.usercards.total--;
                        } else if (card.status == 'archived') {
                            $scope.data.cards.splice($scope.data.cards.indexOf(card), 1);
                            $rootScope.user.usercards.archived--;
                            $rootScope.user.usercards.total++;
                        } else {
                            $scope.data.cards.splice($scope.data.cards.indexOf(card), 1);
                            $rootScope.user.usercards.archived++;
                            $rootScope.user.usercards.total--;
                        }
                        $ionicSlideBoxDelegate.update();
                        localStorageService.set('LoginedUser', $rootScope.user);
                    }
                });
        };

        $scope.StarCard = function (card) {
            console.log('show starr');
            if (card.status == 'starred') {
                card.status = 'unstarred'
                $rootScope.user.usercards.starred--;
            } else {
                card.status = 'starred'
                $rootScope.user.usercards.starred++;
            }
            localStorageService.set('LoginedUser', $rootScope.user);
            var data = {'data': card};
            $http.post(C.backendUrl + 'card/starr/' + card.id.id, data)
                .then(function (res) {
                    console.log('cards ok');
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                    } else {
                        card.status = res.data.status;
                    }
                });
        };

        $scope.ShowCard = function (card) {
            $scope.ShowModal = true;
            $scope.cardModal = card;

            var data = {'data': card};
            $http.post(C.backendUrl + 'card/viewed/' + card.id.id, data)
                .then(function (res) {
                    console.log('cards ok');
                });
        };


        $scope.showPopupArchive = function (card) {

            if (card.status == 'archived') {
                $scope.header = 'Unarchive card';
            } else {
                $scope.header = 'Archive card';
            }

            $ionicPopup.show({
                title: $scope.header,
                //   subTitle: 'archiving item',
                template: '<img class="cards__country"     src="' + card.FromImage + '"    alt=""> <span>' + card.enteredText + '</span>',
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel', onTap: function (e) {
                        return false;
                    }
                    },
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            return true;
                        }
                    }
                ]
            }).then(function (res) {
                if (res == true) {
                    $scope.ArchiveCard(card);
                }
                console.log('Tapped!', res);
            }, function (err) {
                console.log('Err:', err);
            }, function (msg) {
                console.log('message:', msg);
            });
        };


        $scope.showPopupDelete = function (card) {
            $ionicPopup.show({
                title: 'Delete card',
                //     subTitle: 'deleting item',
                template: '<img class="cards__country"     src="' + card.FromImage + '"    alt=""> <span>' + card.enteredText + '</span>',
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel', onTap: function (e) {
                        return false;
                    }
                    },
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            return true;
                        }
                    }
                ]
            }).then(function (res) {
                if (res == true) {
                    $scope.DeleteCard(card);
                }
                console.log('Tapped!', res);
            }, function (err) {
                console.log('Err:', err);
            }, function (msg) {
                console.log('message:', msg);
            });
        };

        $scope.showToast = function (message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function (success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        };


        $scope.slideHasChanged = function (index) {


        }


        $scope.swapLanguage = function(card){
            console.log('swap');
            console.log(card);

        var cardswaped= angular.copy(card);
              card.ToImage = cardswaped.FromImage;
            card.FromImage =  cardswaped.ToImage ;

            card.translatedText = cardswaped.enteredText ;
                 card.enteredText =cardswaped.translatedText ;

         card.translateTo  =   cardswaped.translateFrom  ;
          card.translateFrom =  cardswaped.translateTo ;

            var data = {'data': card};

            $http.post(C.backendUrl + 'card/edit/' + card.id.id, data)
                .then(function (res) {

                    console.log('cards ok');
                    console.log(res);

                });






        }
    }
})();
