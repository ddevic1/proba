﻿import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

const CLOUDINARY_UPLOAD_PRESET = 'n9wsbdne';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dykzjdkwy/upload';

const MainMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        disableDefaultUI={true}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}

    </GoogleMap>
));

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMi8xu6sTPt579TzweGFVX4Dlu2hE4n8&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,

                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    places.map(({ place_id, formatted_address, geometry: { location } }) =>
                        this.props.sendToMap(location.lat(), location.lng()),

                    )
                    this.setState({
                        places: places,
                        boxShadow: `0 0px 0px rgba(0, 0, 0, 0.3)`
                    });
                },
            })
        },
    }),
    withScriptjs
)(props =>
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Find your location"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `22px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: props.boxShadow,
                    fontSize: `15px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    color: `gray`
                }}
            />
        </StandaloneSearchBox>
     
        </div>
    );

class Post extends Component {
    constructor(props) {

        super(props);

        this.handleJumbotronClick = this.handleJumbotronClick.bind(this);
        this.changeSequenceOriginal1 = this.changeSequenceOriginal1.bind(this);
        this.addLocation = this.addLocation.bind(this);
        this.showMap = this.showMap.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.fileUpload = this.fileUpload.bind(this);

        this.state = {
            visina: "15px",
            big: "none",
            small: "block",
            recenica: " ",
            background: "beige",
            encodedWeatherString: "",
            decodedWeatherString: "",
            locationPlace: <div></div>,
            was: <div></div>,
            lat: '',
            lng: '',
            filess: [],
            uploadedFileCloudinaryUrl: '',
            first: true,
            second: false,
            third: false
        }
      
    }

    changeSequenceOriginal1(sequence) {
        var emojis = ["happy", "sad", "in love", "neutral", "bored", "wowed", "angry"];
        var weather = ["sunny", "cloudy", "rainy", "foggy", "snowy"];
        var weatherCode = ["&#x2600;", "&#x2601;", "&#x1F327;", "&#x1F32B;", "&#x1F328;"]
        
        var novaRecenica = this.state.recenica;
   
            this.setState({
                was: <i className="blue lrmargin">  was  </i>
            });
        if (emojis.indexOf(sequence) > -1) {
            if (this.state.recenica.indexOf("feeling") > -1)
                novaRecenica = this.state.recenica.substr(this.state.recenica.indexOf("feeling"), 7) + " " + sequence + "," + this.state.recenica.substr(this.state.recenica.indexOf("feeling") + 7);
            else
                novaRecenica = this.state.recenica + " feeling " + sequence;
            this.setState({
                recenica: novaRecenica
            });
        }
        else if (weather.indexOf(sequence) > -1) {

            var encodedStr = weatherCode[weather.indexOf(sequence)];
            var parser = new DOMParser;
            var dom = parser.parseFromString(
                '<!doctype html><body>' + encodedStr,
                'text/html');
            this.setState(
                {
                    decodedWeatherString: dom.body.textContent
                });
        }
          
       
    }

    handleJumbotronClick(e) {
        if (this.state.visina==="15px")
            this.setState(
                {
                    visina: "-webkit-fill-available",
                    big: "block",
                    small: "none",
                    background: "white"
                    });
        
    }

    addLocation(e) {

        this.setState({
            locationPlace: <form className="inlineflex"> <i className="blue lrmargin">   in   </i> <PlacesWithStandaloneSearchBox sendToMap={this.showMap} /> </form>,
            was: <i className="blue lrmargin">  was  </i>
        });

    }

    showMap(lat, lng) {

        this.setState({
            first: false,
            third: true,
            lat: parseFloat(lat),
            lng: parseFloat(lng)
        });
    }

    onImageUpload() {
   
        this.setState({
            first: true,
            second: false,
            third: false
        });
      
    }

    fileUpload(e) {
        this.setState({
            first: false,
            second: true,
            third: false,
            filess: e.target.files
        });
        var file = e.target.files[0];

        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });

    }

    render() {

        var listaEmoji = [
            { slika: '&#x1F601;', tekst: "happy", id: "1" },
            { slika: "&#x1F641;", tekst: "sad", id: "2" },
            { slika: "&#x1F60D;", tekst: "in love", id: "3" },
            { slika: "&#x1F610;", tekst: "neutral", id: "4" },
            { slika: "&#x1F644;", tekst: "bored", id: "5" },
            { slika: "&#x1F632;", tekst: "wowed", id: "6" },
            { slika: "&#x1F620;", tekst: "angry", id: "7" }
        ];

        var listaWeather = [
            { slika: '&#x2600;', tekst: "sunny", id: "1" },
            { slika: "&#x2601;", tekst: "cloudy", id: "2" },
            { slika: "&#x1F327;", tekst: "rainy", id: "3" },
            { slika: "&#x1F32B;", tekst: "foggy", id: "4" },
            { slika: "&#x1F328;", tekst: "snowy", id: "5" }
        ];
        return (
            <div>
                <Jumbotron id="jumbotronPost" style={{ height: this.state.visina, backgroundColor: this.state.background }} onClick={this.handleJumbotronClick} >
                    <Container >
                        <div className="row" style={{ display: this.state.small }} id="divPost">
                            <div className="col-md-7 gray big">
                                {this.props.text} 
                            </div>
                            <div className="col-md-5 up">

                                <div className="col-md-4">
                                    <Ikona class="gray" name="mood" data={[]} ></Ikona>
                                </div>
                                <div className="col-md-4">
                                    <Ikona class="gray" name="wb_sunny" data={[]} ></Ikona>
                                </div>
                                <div className="col-md-4">
                                    <Ikona class="gray" name="group" data={[]} ></Ikona>
                                </div>

                            </div>
                        </div>

                        <div style={{ display: this.state.big, height: "-webkit-fill-available" }} className="whiteBcg gray full" >
                            <div className="row ">
                                <div className="col-md-11">
                                    <p className="moveUp inlineflex">
                                        {this.props.imeKorisnika}
                                        {this.state.was}
                                        {this.state.locationPlace}
                                        {this.state.recenica}
                                    </p>
                                       
                                </div>
                                <div className="col-md-1">
                                    <p className="moveUp"> {this.state.decodedWeatherString} </p> 
                                </div>
                            </div>
                            <div className="row row33 whiteBcg" style={{ height: "-webkit-fill-available" }}>
                                {this.state.filess.length === 0 && this.state.first && !this.state.second && !this.state.third &&
                                    <ContactForm imageUploaded={this.onImageUpload} filess={this.state.filess}></ContactForm>}

                                {this.state.filess.length !== 0 && !this.state.first && this.state.second && 
                                    <div>
                                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                            <div>
                                                <img id="mjestoZaSliku" style={{ height: "-webkit-fill-available" }} src={this.state.uploadedFileCloudinaryUrl} />
                                            </div>
                                        }
                                    </div>
                                }
                                {!this.state.second && this.state.third &&
                                    <MainMapComponent isMarkerShown={true}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMi8xu6sTPt579TzweGFVX4Dlu2hE4n8&v=3.exp&libraries=geometry,drawing,places"

                                        loadingElement={<div style={{ height: `200px` }} />}
                                        containerElement={<div style={{ height: `200px` }} />}
                                        mapElement={<div style={{ height: `200px` }} />}
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                    >
                                    </MainMapComponent>
                                }
                            </div>
                            <div className="row row33 black" style={{ marginTop: "-10px"}}>


                                <div className="col-md-2">
                                    <Ikona name="place" class="black" data={[]} addLocationFun={this.addLocation}></Ikona>
                                </div>
                                <div className="col-md-2">
                                    <Ikona class="black" name="add_a_photo" data={[]} ></Ikona>
                                </div>
                                <div className="col-md-2">
                                    <label for="file-input" class="input-label">
                                        <Ikona class="black" name="photo_library" data={[]}></Ikona>
                                        <input type="file" id="file-input" onChange={this.fileUpload} />
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <Ikona class="black" name="mood" data={listaEmoji} changeSequenceOriginal={this.changeSequenceOriginal1}></Ikona>
                                </div>
                                <div className="col-md-2">
                                    <Ikona class="black" name="wb_sunny" data={listaWeather} changeSequenceOriginal={this.changeSequenceOriginal1}></Ikona>
                                </div>
                                <div className="col-md-2">
                                    <Ikona class="black" name="group" data={[]}></Ikona>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
             
            </div>
        )
    }

}

class Ikona extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: "none",
        }
        this.handleClick = this.handleClick.bind(this);
        this.changeSequence1 = this.changeSequence1.bind(this);
    }
    handleClick(e) {
        if (this.props.name === "mood" || this.props.name === "wb_sunny") {
            if (this.state.visible === "none")
                this.setState({
                    visible: "block"
                });
            else {
                this.setState({
                    visible: "none"
                });
            }
        }
        else if (this.props.name === "place") {
            this.props.addLocationFun();
        }
        
    }
    changeSequence1(sequence) {
        this.setState({
            visible: "none"
        });
        var newSequence = "";
        this.props.changeSequenceOriginal(sequence);
    }
    render() {
        return (
            <span className={`${this.props.class}`} onClick={this.handleClick} >
                <i className={`material-icons ${this.props.class}`} > {this.props.name}  </i>
                <div id="moodAndweather" style={{ display: this.state.visible }} >
                    <EmojiWeatherList data={this.props.data} changeSequence={this.changeSequence1}></EmojiWeatherList>
                </div>
                
                </span>
        
        );
    }
}

class EmojiWeatherRow extends Component {
    constructor(props) {
        super(props);
        this.handleItemClick1 = this.handleItemClick1.bind(this);

    }
    handleHTMLEntities(str) {
        return String(str).replace('&amp;', '&');
    }
    handleItemClick1(e) {
        this.props.onItemClicked(this.props.tekst);
    }
    render() {
        var encodedStr =  this.props.slika   ;

        var parser = new DOMParser;
        var dom = parser.parseFromString(
            '<!doctype html><body>' + encodedStr,
            'text/html');
        var decodedString = dom.body.textContent;
        return (
            <div className="row emojiMargin" onClick={this.handleItemClick1}>
                <div className="col-md-4">
                    <p> {decodedString} </p> 
                </div>
                <div className="col-md-8 black">
                    <p> {this.props.tekst} </p>
                </div>
            </div>
        );
    }
}

class EmojiWeatherList extends Component {
    constructor(props) {
        super(props);
        this.onItemClicked1 = this.onItemClicked1.bind(this);

    }
    onItemClicked1(text) {
        this.props.changeSequence(text);
    }
    render() {
        var emojiWeatherNodes = this.props.data.map( (element) => {
            return (

                <EmojiWeatherRow slika={element.slika} tekst={element.tekst} key={element.id} onItemClicked={this.onItemClicked1}>

                </EmojiWeatherRow>
            );
        });
        return (
            <div id="emojiDiv">
                {emojiWeatherNodes}
            </div>
            );
    }
}



class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFileCloudinaryUrl: '',
            visibleDrop: "block",
            visibleImg:"none"
        };

    }
    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0],
            visibleDrop: "none",
            visibleImg: "block"
        });
     
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
        this.props.imageUploaded();
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
       
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
       
    }

    render() {
        const dropzoneStyle = {
            borderColor: "rgba(102, 102, 102, 0.18)",
            width: "100 %",
            borderRadius: "25px",
            height: "200px",
            borderWidth: "2px",
            borderStyle: "dashed"
        };
        return (
            <div>
                <div className="FileUpload" style={{ display: this.state.visibleDrop }}>
                    <Dropzone
                       
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop.bind(this)}
                        style={dropzoneStyle}
                       >
                        <p id="dropText">Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                </div>

                <div style={{ display: this.state.visibleImg }}>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <img id="mjestoZaSliku" style={{ height: "-webkit-fill-available"}} src={this.state.uploadedFileCloudinaryUrl} />
                        </div>
                    }
                </div>
            </div>
        );

    }
}


export default Post;