import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class EditBooksModal extends Component{
    constructor(props){
        super(props);
        this.state={bks:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({bks:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Book',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                BookName:event.target.BookName.value,
                Detail:event.target.Detail.value,
                Author:event.target.Author.value,
                Genre:event.target.Genre.value,
                BookPhoto:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Book/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Book Info
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="BookID">
                        <Form.Label>BookID</Form.Label>
                        <Form.Control type="text" name="BookID" required 
                        placeholder="BookID"
                        disabled
                        defaultValue={this.props.bkid}/>
                    </Form.Group>

                    <Form.Group controlId="BookName">
                        <Form.Label>BookName</Form.Label>
                        <Form.Control type="text" name="BookName" required 
                        defaultValue={this.props.bkname}
                        placeholder="BookName"/>
                    </Form.Group>

                    <Form.Group controlId="Detail">
                        <Form.Label>Detail</Form.Label>
                        <Form.Control type="text" name="Detail" required 
                        defaultValue={this.props.det}
                        placeholder="Detail"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="Author" required 
                        defaultValue={this.props.auth}
                        placeholder="Author"/>
                    </Form.Group>


                    <Form.Group controlId="Genres">
                        <Form.Label>Genres</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.genbk}>
                        {this.state.bks.map(gen=>
                            <option key={gen.GenreID}>{gen.GenreName}</option>)}
                        </Form.Control>
                    </Form.Group>


                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Book Info
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}