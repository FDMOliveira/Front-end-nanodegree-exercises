function renderMap () {
    viewModel.renderMap();
}
function mapError() {
    view.renderMapError();
}
let view = {
    hideBar() {
        // If the lateral menu is checked, the bar hide itself before showing the IW
        // This is only valid for smartphones
        if((window.matchMedia("(max-width: 700px)")).matches) {
            if ($('input[type=checkbox]').is(':checked')) {
                $('input[type=checkbox]').trigger('click'); 
            }   
        }
    },
    renderIW(name,img,price,type,address,rating) {
        //Initialize the display property of error message as none.
        $('.error-handling').css('display','none');
        $('.marker-show').css('display','block');

        pubImg = $('.marker-img');
        pubName = $('.marker-title');
        pubRating = $('.marker-rating');
        pubType = $('.bar-type');
        pubPrice = $('.bar-price');
        pubaddress = $('.address');

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
        $('.marker-show').css('display','none');
        $('.error-handling').css('display','block');
        console.log('error: '+error);
    },   
    renderMapError() {
        $('.error-map').css('display','block');
    }
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
    self :this,
    Pubs : function(pub) {
        this.name = ko.observable(pub.name),
        this.latlng = ko.observable(pub.latlng)
    },
    compare(a,b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
    },
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
        const myoverlay = new google.maps.OverlayView();
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
                optimized:false,
                map:model.map
            })
            model.markers.push(marker);
            marker.addListener('click', function () { 
                viewModel.createIW(element, model.markers[index]);
            });
            self.bounds.extend(element.latlng);
            model.map.fitBounds(self.bounds);
            myoverlay.draw = function () {
                this.getPanes().markerLayer.id='markerLayer';
            };
        });
        myoverlay.setMap(model.map);
    },
    createInfoWindow(marker) {  
        pubCompleteInformation =`
        <div class="marker-container">
            <div class="marker-show">
                <div class='marker-img'></div>
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
            </div>
            <div class="error-handling">
                <div class="symbol">
                </div>
                There was an error and we cannot show the card. We are sorry for that 
            </div>
            </div>
        </div>
        <div class="marker-arrow"></div>`;
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
        model.pendentRequest = true;
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
            model.pendentRequest = false;
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
    }
}
let viewModel = {
    renderMap () {
        model.renderMap();
        model.pubsInfo.sort(model.compare);
        model.makeMarkers(model.pubsInfo);
        model.map.addListener('click', 
            model.closeAllInfoWindows);
    },
    populateList () {
        model.pubsInfo.sort(model.compare);
        query = ko.observable("");
        obpubList = ko.observableArray();
        model.pubsInfo.forEach((pub) => {
            obpubList.push(new model.Pubs(pub));
        })

        search = () => {
            let list=[];
            console.log(model.pubsInfo);
            console.log($('#markerLayer'));
            model.pubsInfo.forEach((element,index) => {
                if ((element.name.toLowerCase()).includes(query().toLowerCase())) { 
                    $('#markerLayer > div:nth-child('+index+')').removeClass('remove-marker');
                    name = element.name;
                    latlng = element.latlng;
                    list.push(new model.Pubs({name, latlng}))
                }
                else {
                    let value = ++index;
                    console.log($('#markerLayer'));
                    $('#markerLayer > div:nth-child('+ value +')').addClass('remove-marker');
                }
            })
            obpubList(list);
        }
        pubClicked = (element) => { 
            let name = element.name();
            model.pubsInfo.forEach((pub,index) => {
                if (pub.name === name) {
                    if (model.markers.length > 9) {
                       viewModel.createIW({name: pub.name, latlng:pub.latlng},model.markers[index])
                    }
                }           
            })
        }
    },
    createIW(element, marker) {
        //Hide bar before showing the IW
        view.hideBar();
        
        //Get Assyncronous Data from Yelp Api
        model.getData(element);

        // Close All Info Windows
        model.closeAllInfoWindows();

        // Create Info Window
        model.createInfoWindow(marker);

        // Move Camera to element position 
        model.map.panTo(element.latlng);
    },
    renderIW(name,img,price,type,address,rating) {
        view.renderIW(name,img,price,type,address,rating)
    },
    errorIW(error) {
        view.iwEerror(error);
    }
}
ko.applyBindings(viewModel.populateList());