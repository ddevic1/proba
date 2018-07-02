import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, Router } from 'react-router-dom';
import history from '../history';
import { Card, Jumbotron, Button, Container, CardTitle, CardText } from 'reactstrap';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MainMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        disableDefaultUI={true}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}

    </GoogleMap>
));

class ShowPost extends Component {
    constructor(props) {
        super(props);
        this.getHeight = this.getHeight.bind(this);

        var height;
        if (this.props.post.Location === null && this.props.post.Image === null)
            height = "50px";
        else
            height = "330px";

        this.state = {
            background: "white",
            location: false,
            image: false,
            height: height
        
        };
        console.log(this.props.post.Sequence);
        this.getHeight();
     
    }
   
    getHeight() {
        if (this.props.post.Location === null && this.props.post.Image === null) {
            this.setState({
                height: "50px"
            });
          
        }
            
    }
    shouldComponentUpdate() {
        console.log("DA")
    }
    componentWillReceiveProps() {
        
        if (this.props.post.Location === null && this.props.post.Image === null) {
            this.setState({
                height: "50px",
                background: "white",
                location: false,
                image: false
            });
        }


        else {
            this.setState({
                height: "330px",
                background: "white",
                location: true,
                image: false
            });
        }
        console.log(this.props.post);
    }
   
   
    render() {
        return (
            <div>
                <Jumbotron id="jumbotronPost" className="post" style={{ height: this.state.height, backgroundColor: this.state.background, marginTop: "30px", borderRadius: "5px" }} onClick={this.handleJumbotronClick} >
                    <Container >
                        {this.state.height !== "330px" &&
                            <div className="col-md-12" style={{ fontSize: "17px" }}>

                            {this.props.post.Name + " " + this.props.post.Surname + " "}
                            {(this.props.post.Sequence.indexOf("feeling") > -1 || this.props.post.Location !== null || this.props.post.Sequence.indexOf("with") > -1) &&
                               
                                <i className="blue lrmargin">  was  </i>}
                            {!(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(1, this.props.post.Sequence.length - 1)}
                            {(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(0, this.props.post.Sequence.indexOf("with")) 
                               }
                            {(this.props.post.Sequence.indexOf("with") > -1) && 
                                < i className="blue lrmargin">  with  </i> 
                              }
                            {(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(this.props.post.Sequence.indexOf("with") + 4, this.props.post.Sequence.length - 1) 
                            }
                            </div>
                        }
                        {this.state.height === "330px" && < div style={{ display: this.state.big, height: "250px" }} className="whiteBcg gray" >
                            <div className="row " style={{ marginTop: "-10px", fontSize: "17px" }}>
                                <div className="col-md-12">

                                    {this.props.post.Name + " " + this.props.post.Surname + " "}
                                    {(this.props.post.Sequence.indexOf("feeling") > -1 || this.props.post.Location !== null || this.props.post.Sequence.indexOf("with") > -1) &&
                                     
                                        <i className="blue lrmargin">  was  </i>}
                                    {!(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(1, this.props.post.Sequence.length - 1)}
                                    {(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(0, this.props.post.Sequence.indexOf("with"))
                                    }
                                    {(this.props.post.Sequence.indexOf("with") > -1) &&
                                        < i className="blue lrmargin">  with  </i>
                                    }
                                    {(this.props.post.Sequence.indexOf("with") > -1) && this.props.post.Sequence.substr(this.props.post.Sequence.indexOf("with") + 4, this.props.post.Sequence.length - 1)
                                    }
                                    {this.props.post.Location !== null &&
                                       
                                        < i className="blue lrmargin">  in  </i> 
                                     
                                    }
                                    {this.props.post.Location !== null &&
                                        <p style={{ wordWrap: "break-word", display: "inline" }}>  {this.props.post.Location} </p>

                                    }
                                </div>

                            </div>
                            <div className="row row33 whiteBcg" style={{ height: "220px", marginTop: "20px" }}>
                                {(this.props.post.Location !== null && this.props.post.Image === null) &&
                                    <MainMapComponent isMarkerShown={true}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFMi8xu6sTPt579TzweGFVX4Dlu2hE4n8&v=3.exp&libraries=geometry,drawing,places"

                                        loadingElement={<div style={{ height: `200px` }} />}
                                        containerElement={<div style={{ height: `200px` }} />}
                                        mapElement={<div style={{ height: `200px` }} />}
                                        lat={this.props.post.Lat}
                                        lng={this.props.post.Lng}
                                    >
                                    </MainMapComponent>
                                }
                                {(this.props.post.Location === null && this.props.post.Image !== null) &&
                                    <div>
                                        <img id="mjestoZaSliku" style={{ height: "220px" }} src={this.props.post.Image} />
                                    </div>
                                }
                            </div>

                        </div>
                        }
                    </Container>
                </Jumbotron>

            </div>
        );
    }

}

export default ShowPost;
