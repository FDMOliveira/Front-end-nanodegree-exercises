function renderMap () {viewModel.renderMap();}
let view = {
    setCustomIW() {      
        // The following variables are getting the div responsible for the content of useful area. 
        const marker = document.body.getElementsByClassName('gm-style-iw')[0];
        const markerContainer = $(marker).parent().children()[0]; 
        const closeButton = $(marker).parent().children()[2];
        const markerBox = $(markerContainer).children()[3];
        const closeBtn = $(marker).parent().children()[3];
        $(closeBtn).addClass('close-btn');
        $(closeButton).addClass('close-btn');
        $(markerBox).addClass('marker-container');
        $(markerBox).html(`<div class='marker-img'></div>
                            <div class='marker-title'></div>
                            <div class='marker-rating'>
                                <div class='rating'></div>
                                <div class='rating'></div>
                                <div class='rating'></div>
                                <div class='rating'></div>
                                <div class='rating'></div>
                            </div>
                            <div class='bar-price'></div>
                            <div class='bar-type'></div>
                            <div class="address"></div>
                            <div class="error-handling">
                                <div class="symbol">
                                </div>
                                There was an error and we cannot show the card. We are sorry for that 
                            </div>
                            </div>`);
        pubImg = $('.marker-img');
        pubName = $('.marker-title');
        pubRating = $('.marker-rating');
        pubType = $('.bar-type');
        pubPrice = $('.bar-price');
        pubaddress = $('.address');

        //Initialize the display property of error message as none.
        $('.error-handling').css('display','none');
    },
    renderIW(name,img,price,type,address,rating) {
        $(pubName).append(name);
        let _img = new Image();
        _img.src = img;
        _img.onload = function() {
            $(pubImg).append(_img);
            $(_img).addClass('img');
        }
        $(pubPrice).html(price);
        $(pubType).append(type);
        for (let i=1;i<=5;i++)
        {
            if (i<rating.green)
                $('.marker-rating .rating:nth-of-type('+i+')').addClass('green');
            else
               $('.marker-rating .rating:nth-of-type('+i+')').addClass('grey');
        }
        $(pubaddress).append(`${address.address}, ${address.location}`);  
    },
    iwEerror(error) {
        $('.error-handling').css('display','block');
        console.log('error: '+error);
    },   
}
let model = {
    map:"" ,
    pubsInfo : [
        {name:'Flor de Lúpulo', latlng:{lat: 38.732699, lng:-9.1339929}},
        {name:'Crafty Corner', latlng:{lat: 38.7068369, lng:-9.1449296}},
        {name:'Procópio', latlng:{lat: 38.721863,  lng:-9.1573557}},
        {name:'Pavilhão Chinês', latlng:{lat: 38.715784, lng:-9.1489077}},
        {name:'A Paródia', latlng:{lat: 38.7134847, lng:-9.1669491}},
        {name:'Foxtrot', latlng:{lat: 38.7139325, lng:-9.1541182}},
        {name:'Red Frog', latlng:{lat: 38.719481, lng:-9.1480967}},
        {name:'Vestigius', latlng:{lat: 38.705129, lng:-9.1467679}},
        {name:'Matiz Pombalina', latlng:{lat: 38.7079038, lng:-9.1589404}},
        {name:'Malt', latlng:{lat: 38.7071127, lng:-9.1452756}}
    ],
    markers:[],
    infowindow:"",
    marker:"",
    PublicID:"",
    self :this,
    prevInput:'',
    renderMap() {
        const initialPosition = {lat:38.7209844, lng:-9.1535356};
        const mapStyle= [
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            },
                            {
                                "hue": "#0023ff"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#000000"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#000000"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#000000"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    }
                ]
        model.map = new google.maps.Map(document.getElementsByClassName('map')[0],{center: initialPosition,
                                        zoom: 14,
                                        styles:mapStyle,
                                        mapTypeControl: false,
                                        disableDefaultUI: true,
                                        gestureHandling: 'greedy'
                                    });     
    },
    makeMarkers (pubsInfo) {
        self.bounds = new google.maps.LatLngBounds();
        // Create icon
        icon = {
            url: "./img/cocktail.svg", // url
            scaledSize: new google.maps.Size(35, 35), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };        
        pubsInfo.forEach((element,index) => {
                marker = new google.maps.Marker({
                position:element.latlng,
                icon: icon,
                map:model.map
            })
            model.markers.push(marker);
            marker.addListener('click', function () { 
                viewModel.createIW(element, model.markers[index]);
            });
            self.bounds.extend(element.latlng);
            model.map.fitBounds(self.bounds);
        });
    },
    createInfoWindow(marker) {  
        pubCompleteInformation =`<div></div>`;
        model.infowindow = new google.maps.InfoWindow({
            content: pubCompleteInformation 
            });
        model.infowindow.open(model.map, marker);
    },
    closeAllInfoWindows() {
        model.markers.forEach((marker) => {
            if (typeof model.infowindow.content !== 'undefined') {
                model.infowindow.setContent('');
                model.infowindow.close(model.map,marker)
            }
        })
    },
    getData(element) {
    //  Abort any open request
/*         const controller = new AbortController();
        const signal = controller.signal
        controller.abort(); */

        const term= element.name;
        const lat = element.latlng.lat;
        const lng = element.latlng.lng;
        const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&latitude=${lat}&longitude=${lng}`;
        const headers = {
            'Authorization': 'Bearer qtfdiU5ar6RRO3Qt8XZ0wUaxB3Sd--XZ6NRj-YJuaFQXrxIl6HNaEGXKPJKM7-A_UgGwwrkMop9EXlSaxDbxkUj1V5KbJqbAYruVk08Kf5-hfkLOaKNKVuKJst8nW3Yx'
        };
        fetch(url, {headers, mode:'cors'})
        .then(response => {
            if (response.ok) 
                return response.json()  
            else
            {
                throw new Error('something went wrong!');
            }
        })
        .then(data => {
            let scoreRating = Math.round(data.businesses[0].rating),
                i=1,
                green=0,
                grey=0;
            while (i<=5) {
                if (i<=scoreRating)
                    green++;
                else
                    grey++;
            i++;
            }
            viewModel.renderIW(data.businesses[0].name,data.businesses[0].image_url,data.businesses[0].price, data.businesses[0].categories[0].title,
                {address: data.businesses[0].location.address1,location:data.businesses[0].location.city},
                {green: green, grey:grey});
        }).catch(error => {
            viewModel.errorIW(error);
        });
    },
    searchResults(input, event) {
        if(input.length>0) {
            if(event.inputType === "deleteContentBackward")
                input = input.substring(0, input.length-1);
             model.pubsInfo.forEach((element, index)=>{
                if ((model.pubsInfo[index].name).includes(input)) {
                     console.log(model.pubsInfo[index].name);
                }
            }) 
        }
    }
}
let viewModel = {
    renderMap () {
        model.renderMap();
        viewModel.populateList();

        model.makeMarkers(model.pubsInfo);
        model.map.addListener('click', 
            model.closeAllInfoWindows);

        viewModel.search();
    },
    populateList () {
        pubList = ko.observableArray(model.pubsInfo);
        pubClicked = (element, index) => viewModel.createIW(element,model.markers[index.handleObj.guid-1]);
        _pubList = model.pubsInfo;
        obpubList = ko.observableArray(_pubList);
    },
    createIW(element, marker) {
        //Get Assyncronous Data from Yelp Api
        model.getData(element);

        // Close All Info Windows
        model.closeAllInfoWindows();

        // Create Info Window
        model.createInfoWindow(marker);
        
        //Set Custom InfoWindow
        view.setCustomIW();

        // Move Camera to element position 
        model.map.panTo(element.latlng);
    },
    renderIW(name,img,price,type,address,rating) {
        view.renderIW(name,img,price,type,address,rating)
    },
    errorIW(error) {
        view.iwEerror(error);
    },   
    search() {
        $('.search-bar').on('input', function() {
            model.searchResults($(this).val(), event);
        });
    }
}
ko.applyBindings(viewModel.populateList());
